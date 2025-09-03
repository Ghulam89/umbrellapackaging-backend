import redis from 'redis';
import express from 'express';
import { Brands } from '../model/Brand.js';
import { MidCategory } from '../model/MidCategory.js';

// Redis client with optimized settings
const redisClient = redis.createClient({
    socket: {
        host: "31.97.14.21",
        port: 6379,
        connectTimeout: 1000,
        noDelay: true,
        reconnectStrategy: (retries) => {
            const delay = Math.min(retries * 50, 1000);
            return delay;
        }
    },
    username: "umbrella",
    password: "umbrella123",
});

redisClient.on('error', (err) => {
    console.error('Redis Error:', err.message);
});

redisClient.connect()
    .then(() => console.log('Redis connected!'))
    .catch(err => console.error("Redis connection error:", err.message));

const generateCacheKey = (req) => {
    const { page = 1, limit = 4, search = '', all = false } = req.query;
    return `brands:${page}:${limit}:${search}:${all}`;
};

const REDIS = express.Router();

// Cache for frequently accessed data with search patterns
const searchPatternCache = new Map();
const CACHE_TTL = 180; // 3 minutes

// Pre-warm cache with common queries
const preWarmCache = async () => {
    const commonQueries = [
        { page: 1, limit: 4, search: '', all: false },
        { page: 1, limit: 10, search: '', all: false },
        { page: 1, limit: 4, search: '', all: true }
    ];
    
    for (const query of commonQueries) {
        const cacheKey = `brands:${query.page}:${query.limit}:${query.search}:${query.all}`;
        try {
            const data = await fetchBrandsFromDB(query);
            await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(data));
        } catch (error) {
            console.error('Pre-warm cache error:', error.message);
        }
    }
};

// Call pre-warm after connection
setTimeout(preWarmCache, 5000);

// Simplified pipeline without $lookup for initial response
const getBasePipeline = (search) => {
    if (!search) {
        return [
            {
                $project: {
                    name: 1,
                    createdAt: 1,
                    slug: 1,
                    status: 1,
                },
            }
        ];
    }
    
    return [
        {
            $match: {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { slug: { $regex: search, $options: 'i' } }
                ],
            },
        },
        {
            $project: {
                name: 1,
                createdAt: 1,
                slug: 1,
                status: 1,
            },
        }
    ];
};

// Separate function to get midcategories
const getMidcategories = async (brandIds) => {
    if (!brandIds.length) return {};
    
    const midcategories = await Brands.aggregate([
        {
            $match: { _id: { $in: brandIds } }
        },
        {
            $lookup: {
                from: "midcategories",
                localField: "_id",
                foreignField: "brandId",
                as: "midcategories",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            title: 1,
                            slug: 1,
                            icon: 1,
                            image: 1,
                            brandId: 1
                        }
                    }
                ]
            }
        },
        {
            $project: {
                _id: 1,
                midcategories: 1
            }
        }
    ]).option({ maxTimeMS: 10000 });
    
    // Convert to map for easy access
    const midcategoriesMap = {};
    midcategories.forEach(brand => {
        midcategoriesMap[brand._id.toString()] = brand.midcategories;
    });
    
    return midcategoriesMap;
};

// Fetch brands from DB with optimized queries
const fetchBrandsFromDB = async (queryParams) => {
    const { page = 1, limit = 4, search = '', all = false } = queryParams;
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    
    if (all === 'true') {
        // For all data - simplified query first
        const brands = await Brands.aggregate(getBasePipeline(search))
            .option({ maxTimeMS: 8000 });
        
        // Get midcategories in parallel if needed
        if (brands.length > 0) {
            const brandIds = brands.map(brand => brand._id);
            const midcategoriesMap = await getMidcategories(brandIds);
            
            // Enhance brands with midcategories
            brands.forEach(brand => {
                brand.midcategories = midcategoriesMap[brand._id.toString()] || [];
            });
        }
        
        return {
            status: "success",
            data: brands,
            totalBrands: brands.length,
        };
    } else {
        // For paginated results
        const skip = (parsedPage - 1) * parsedLimit;
        
        // Get total count first
        const countFilter = search ? {
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { slug: { $regex: search, $options: 'i' } }
            ]
        } : {};
        
        const [totalBrands, brands] = await Promise.all([
            Brands.countDocuments(countFilter).maxTimeMS(5000),
            Brands.aggregate([
                ...getBasePipeline(search),
                { $skip: skip },
                { $limit: parsedLimit }
            ]).option({ maxTimeMS: 8000 })
        ]);
        
        // Get midcategories in parallel if needed
        if (brands.length > 0) {
            const brandIds = brands.map(brand => brand._id);
            const midcategoriesMap = await getMidcategories(brandIds);
            
            // Enhance brands with midcategories
            brands.forEach(brand => {
                brand.midcategories = midcategoriesMap[brand._id.toString()] || [];
            });
        }
        
        return {
            status: "success",
            data: brands,
            totalBrands,
            pagination: {
                total: totalBrands,
                page: parsedPage,
                limit: parsedLimit,
                totalPages: Math.ceil(totalBrands / parsedLimit),
            },
        };
    }
};

REDIS.get("/brand/getAll", async (req, res, next) => {
    const startTime = Date.now();
    
    try {
        const cacheKey = generateCacheKey(req);
        
        let cachedData = null;
        try {
            cachedData = await Promise.race([
                redisClient.get(cacheKey),
                new Promise(resolve => setTimeout(() => resolve(null), 3))
            ]);
        } catch (e) {
           
        }
        
        if (cachedData) {
            console.log(`Cache hit - ${Date.now() - startTime}ms`);
            return res.status(200).json(JSON.parse(cachedData));
        }

        const { search = '' } = req.query;
        let memoryCachedResult = null;
        
        if (search && searchPatternCache.has(search.toLowerCase())) {
            memoryCachedResult = searchPatternCache.get(search.toLowerCase());
            console.log(`Memory cache hit for pattern: ${search}`);
        }
        
        let result = memoryCachedResult;
        
        if (!result) {
         
            result = await fetchBrandsFromDB(req.query);
            
            if (search) {
                searchPatternCache.set(search.toLowerCase(), result);
                
              
                if (searchPatternCache.size > 100) {
                    const firstKey = searchPatternCache.keys().next().value;
                    searchPatternCache.delete(firstKey);
                }
            }
        }

        redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(result))
            .catch(err => console.error('Cache set error:', err.message));

        console.log(`Total response - ${Date.now() - startTime}ms`);
        res.status(200).json(result);
    } catch (error) {
        console.error(`Error after ${Date.now() - startTime}ms:`, error.message);
        
        res.status(200).json({
            status: "success",
            data: [],
            totalBrands: 0,
            pagination: {
                total: 0,
                page: parseInt(req.query.page || 1, 10),
                limit: parseInt(req.query.limit || 4, 10),
                totalPages: 0,
            },
        });
    }
});

REDIS.delete("/clear-brands-cache", async (req, res) => {
    try {
       
        searchPatternCache.clear();
        
        let cursor = 0;
        let deletedCount = 0;
        
        do {
            const reply = await redisClient.scan(cursor, { 
                MATCH: 'brands:*', 
                COUNT: 100
            });
            
            cursor = reply.cursor;
            
            if (reply.keys.length > 0) {
               
                await redisClient.unlink(reply.keys);
                deletedCount += reply.keys.length;
            }
        } while (cursor !== 0);
        
     
        setTimeout(preWarmCache, 1000);
        
        res.json({ 
            status: "OK", 
            message: `Cleared ${deletedCount} brand cache entries` 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Generate cache key for categories
const generateCategoryCacheKey = (req) => {
  const { 
    page = 1, 
    perPage = 18, 
    search = '', 
    categories = '',
    sortBy = 'createdAt'
  } = req.query;
  
  return `categories:${page}:${perPage}:${search}:${categories}:${sortBy}`;
};

// Pre-warm cache for common category queries
const preWarmCategoryCache = async () => {
  const commonQueries = [
    { page: 1, perPage: 18, search: '', categories: '', sortBy: 'createdAt' },
    { page: 1, perPage: 36, search: '', categories: '', sortBy: 'createdAt' },
    { page: 1, perPage: 18, search: '', categories: '', sortBy: 'title' }
  ];
  
  for (const query of commonQueries) {
    const cacheKey = `categories:${query.page}:${query.perPage}:${query.search}:${query.categories}:${query.sortBy}`;
    try {
      const data = await fetchCategoriesFromDB(query);
      await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(data));
    } catch (error) {
      console.error('Pre-warm category cache error:', error.message);
    }
  }
};

// Add to existing pre-warm call
setTimeout(() => {
  preWarmCache();
  preWarmCategoryCache();
}, 5000);

// Fetch categories from DB
const fetchCategoriesFromDB = async (queryParams) => {
  const { 
    page = 1, 
    perPage = 18, 
    search = '', 
    categories = '',
    sortBy = 'createdAt'
  } = queryParams;
  
  const parsedPage = parseInt(page, 10);
  const parsedPerPage = parseInt(perPage, 10);
  const skip = (parsedPage - 1) * parsedPerPage;
  const requestedCategories = categories.split(',').filter(cat => cat);
  
  try {
    // Handle specific categories request
    if (requestedCategories.length > 0) {
      const categoriesData = await MidCategory.find({
        title: { $in: requestedCategories } 
      })
      .populate({
        path: "brandId",
        select: "name slug"
      })
      .sort({ title: 1 })
      .select("slug title icon image metaTitle metaDescription keywords")
      .maxTimeMS(5000);

      return {
        status: "success",
        data: categoriesData,
      };
    }

    // Handle search and pagination
    const filter = search
      ? { 
          $or: [
            { title: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const [count, categoriesData] = await Promise.all([
      MidCategory.countDocuments(filter).maxTimeMS(3000),
      MidCategory.find(filter)
        .populate({
          path: "brandId",
          select: "name slug"
        })
        .sort(sortBy === 'title' ? { title: 1 } : { createdAt: -1 })
        .skip(skip)
        .limit(parsedPerPage)
        .maxTimeMS(5000)
    ]);

    const totalPages = Math.ceil(count / parsedPerPage);

    return {
      status: "success",
      data: categoriesData,
      totalItems: count,
      pagination: {
        currentPage: parsedPage,
        itemsPerPage: parsedPerPage,
        totalPages,
      },
      sort: sortBy
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Redis-optimized category endpoint
REDIS.get("/category/getAll", async (req, res, next) => {
  const startTime = Date.now();
  
  try {
    const cacheKey = generateCategoryCacheKey(req);
    
    let cachedData = null;
    try {
      cachedData = await Promise.race([
        redisClient.get(cacheKey),
        new Promise(resolve => setTimeout(() => resolve(null), 5))
      ]);
    } catch (e) {
      // Silently handle cache errors
    }
    
    if (cachedData) {
      console.log(`Category cache hit - ${Date.now() - startTime}ms`);
      return res.status(200).json(JSON.parse(cachedData));
    }

    // If not in cache, fetch from database
    const result = await fetchCategoriesFromDB(req.query);
    
    // Cache the result for future requests
    redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(result))
      .catch(err => console.error('Category cache set error:', err.message));

    console.log(`Category response - ${Date.now() - startTime}ms`);
    res.status(200).json(result);
  } catch (error) {
    console.error(`Category error after ${Date.now() - startTime}ms:`, error.message);
    
    // Return empty response on error to maintain API consistency
    res.status(200).json({
      status: "success",
      data: [],
      totalItems: 0,
      pagination: {
        currentPage: parseInt(req.query.page || 1, 10),
        itemsPerPage: parseInt(req.query.perPage || 18, 10),
        totalPages: 0,
      },
    });
  }
});

// Add cache clearing endpoint for categories
REDIS.delete("/clear-categories-cache", async (req, res) => {
  try {
    let cursor = 0;
    let deletedCount = 0;
    
    do {
      const reply = await redisClient.scan(cursor, { 
        MATCH: 'categories:*', 
        COUNT: 100
      });
      
      cursor = reply.cursor;
      
      if (reply.keys.length > 0) {
        await redisClient.unlink(reply.keys);
        deletedCount += reply.keys.length;
      }
    } while (cursor !== 0);
    
    // Pre-warm category cache again
    setTimeout(preWarmCategoryCache, 1000);
    
    res.json({ 
      status: "OK", 
      message: `Cleared ${deletedCount} category cache entries` 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { REDIS, redisClient };