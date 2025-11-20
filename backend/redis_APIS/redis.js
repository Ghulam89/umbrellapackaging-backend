import redis from 'redis';
import express from 'express';
import mongoose from 'mongoose';
import { Brands } from '../model/Brand.js';
import { Products } from '../model/Product.js';
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
    // console.error('Redis Error:', err.message);
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

// Trigger cache pre-warm only after Mongo connection is ready
let preWarmScheduled = false;
const schedulePreWarm = () => {
    if (preWarmScheduled) return;
    preWarmScheduled = true;
    // slight delay to ensure indexes are ready
    setTimeout(() => {
        preWarmCache().catch(err => console.error('Pre-warm cache error:', err.message));
    }, 1000);
};

if (mongoose.connection.readyState === 1) {
    schedulePreWarm();
} else {
    mongoose.connection.once('connected', schedulePreWarm);
}

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



// Add Redis caching to getProductsById function
REDIS.get("/product/get", async (req, res, next) => {
  const { id, slug } = req.query;
  const startTime = Date.now();

  if (!id && !slug) {
    return res.status(400).json({
      status: "fail",
      error: "Please provide either ID or Slug",
    });
  }

  try {
    // Generate cache key based on query parameters
    const cacheKey = `product:${id || ''}:${slug || ''}`;
    
    // Try to get data from Redis cache first
    let cachedData = null;
    try {
      cachedData = await Promise.race([
        redisClient.get(cacheKey),
        new Promise(resolve => setTimeout(() => resolve(null), 3))
      ]);
    } catch (e) {
      console.error('Redis get error:', e.message);
    }
    
    if (cachedData) {
      console.log(`Product cache hit - ${Date.now() - startTime}ms`);
      return res.status(200).json(JSON.parse(cachedData));
    }

    let query;
    if (id) {
      query = Products.findById(id); 
    } else if (slug) {
      query = Products.findOne({ slug }); 
    }

    // Always populate categoryId and brandId
    query = query.populate("categoryId","_id title slug").populate("brandId","_id name slug");

    const data = await query.exec();

    if (!data) {
      return res.status(404).json({
        status: "fail",
        error: "Product not found",
      });
    }

    const response = {
      status: "success",
      data: data,
    };

    // Cache the response in Redis with a TTL of 5 minutes (300 seconds)
    redisClient.setEx(cacheKey, 300, JSON.stringify(response))
      .catch(err => console.error('Product cache set error:', err.message));

    console.log(`Product response - ${Date.now() - startTime}ms`);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
    });
  }
});

// Add a cache clearing endpoint for products
REDIS.delete("/clear-product-cache", async (req, res) => {
  try {
    const { id, slug } = req.query;
    
    if (id || slug) {
      // Clear specific product cache
      const cacheKey = `product:${id || ''}:${slug || ''}`;
      await redisClient.unlink(cacheKey);
      res.json({ 
        status: "OK", 
        message: `Cleared cache for product: ${id || slug}` 
      });
    } else {
      // Clear all product cache
      let cursor = 0;
      let deletedCount = 0;
      
      do {
        const reply = await redisClient.scan(cursor, { 
          MATCH: 'product:*', 
          COUNT: 100
        });
        
        cursor = reply.cursor;
        
        if (reply.keys.length > 0) {
          await redisClient.unlink(reply.keys);
          deletedCount += reply.keys.length;
        }
      } while (cursor !== 0);
      
      res.json({ 
        status: "OK", 
        message: `Cleared ${deletedCount} product cache entries` 
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

REDIS.get("/category/get", async (req, res, next) => {
    const { id, slug, title, details, ...otherFields } = req.query;
    const startTime = Date.now();

    if (!id && !slug) {
        return res.status(400).json({
            status: "fail",
            error: "Please provide either ID or Slug",
        });
    }

    try {
        const fieldsPart = (() => {
            const flags = [];
            if (title === 'true') flags.push('title');
            if (details === 'true') flags.push('details');
            if (otherFields) {
                Object.keys(otherFields).forEach(field => {
                    if (otherFields[field] === 'true') flags.push(field);
                });
            }
            return flags.sort().join(',');
        })();

        const cacheKey = `category:${id || ''}:${slug || ''}:${fieldsPart}`;

        let cachedData = null;
        try {
            cachedData = await Promise.race([
                redisClient.get(cacheKey),
                new Promise(resolve => setTimeout(() => resolve(null), 3))
            ]);
        } catch (e) {
        }

        if (cachedData) {
            console.log(`Category cache hit - ${Date.now() - startTime}ms`);
            return res.status(200).json(JSON.parse(cachedData));
        }

        let query;
        if (id) {
            query = MidCategory.findById(id);
        } else if (slug) {
            query = MidCategory.findOne({ slug });
        }

        query = query.populate('brandId');

        const selectFields = [];
        if (title === 'true') selectFields.push('title');
        if (details === 'true') selectFields.push('details');
        if (otherFields) {
            Object.keys(otherFields).forEach(field => {
                if (otherFields[field] === 'true') selectFields.push(field);
            });
        }

        if (selectFields.length > 0) {
            query = query.select(selectFields.join(' '));
        }

        const data = await query.exec();

        if (!data) {
            return res.status(404).json({
                status: "fail",
                error: "Category not found",
            });
        }

        const response = {
            status: "success",
            data: data,
        };

        redisClient.setEx(cacheKey, 300, JSON.stringify(response))
            .catch(err => console.error('Category cache set error:', err.message));

        console.log(`Category response - ${Date.now() - startTime}ms`);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "fail",
            error: "Internal Server Error",
        });
    }
});


// Redis-cached: Get all categories with pagination/search
REDIS.get("/category/getAll", async (req, res) => {
    const startTime = Date.now();
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const perPage = parseInt(req.query.perPage, 10) || 18;
        const searchQuery = req.query.search || '';
        const requestedCategories = req.query.categories ? req.query.categories.split(',') : [];
        const sortBy = req.query.sortBy || 'createdAt';

        const cacheKey = `categories:list:${page}:${perPage}:${searchQuery}:${requestedCategories.join('|')}:${sortBy}`;

        let cachedData = null;
        try {
            cachedData = await Promise.race([
                redisClient.get(cacheKey),
                new Promise(resolve => setTimeout(() => resolve(null), 3))
            ]);
        } catch (e) {}

        if (cachedData) {
            console.log(`Category list cache hit - ${Date.now() - startTime}ms`);
            return res.status(200).json(JSON.parse(cachedData));
        }

        if (requestedCategories.length > 0) {
            const categories = await MidCategory.find({
                title: { $in: requestedCategories }
            })
            .populate({
                path: "brandId",
                select: "name slug"
            })
            .sort({ title: 1 })
            .select("slug title icon image metaTitle metaDescription keywords imageAltText iconAltText");

            const response = {
                status: "success",
                data: categories,
            };

            redisClient.setEx(cacheKey, 180, JSON.stringify(response))
                .catch(err => console.error('Category list cache set error:', err.message));

            console.log(`Category list response - ${Date.now() - startTime}ms`);
            return res.status(200).json(response);
        }

        const filter = searchQuery
            ? {
                $or: [
                    { title: { $regex: searchQuery, $options: 'i' } },
                ],
            }
            : {};

        const count = await MidCategory.countDocuments(filter);

        let sortOption = { createdAt: -1 };
        if (searchQuery || sortBy === 'title') {
            sortOption = { title: 1 };
        }

        const skip = (page - 1) * perPage;

        const categories = await MidCategory.find(filter)
            .populate({
                path: "brandId",
                select: "name slug"
            })
            .sort(sortOption)
            .skip(skip)
            .limit(perPage);

        const totalPages = Math.ceil(count / perPage);

        const response = {
            status: "success",
            data: categories,
            totalItems: count,
            pagination: {
                currentPage: page,
                itemsPerPage: perPage,
                totalPages,
            },
            sort: sortOption,
        };

        redisClient.setEx(cacheKey, 180, JSON.stringify(response))
            .catch(err => console.error('Category list cache set error:', err.message));

        console.log(`Category list response - ${Date.now() - startTime}ms`);
        res.status(200).json(response);
    } catch (error) {
        console.error('Category list error:', error);
        res.status(500).json({
            status: "fail",
            error: "Internal Server Error",
        });
    }
});

// Clear cache for category list
REDIS.delete("/clear-category-list-cache", async (req, res) => {
    try {
        let cursor = 0;
        let deletedCount = 0;

        do {
            const reply = await redisClient.scan(cursor, {
                MATCH: 'categories:list:*',
                COUNT: 100
            });

            cursor = reply.cursor;

            if (reply.keys.length > 0) {
                await redisClient.unlink(reply.keys);
                deletedCount += reply.keys.length;
            }
        } while (cursor !== 0);

        res.json({
            status: "OK",
            message: `Cleared ${deletedCount} category list cache entries`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



export { REDIS, redisClient };