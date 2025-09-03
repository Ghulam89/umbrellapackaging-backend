import redis from 'redis';
import express from 'express';
import { Brands } from '../model/Brand.js';

const redisClient = redis.createClient({
    socket: {
        host: "31.97.14.21",
        port: 6379,
        reconnectStrategy: (retries) => {
            const delay = Math.min(retries * 100, 3000);
            return delay;
        }
    },
    username: "umbrella",
    password: "umbrella123",
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
    console.log('Redis Client Connected');
});

redisClient.on('ready', () => {
    console.log('Redis Client Ready');
});

redisClient.on('reconnecting', () => {
    console.log('Redis Client Reconnecting...');
});

redisClient.connect()
    .then(() => console.log('Redis connected successfully!'))
    .catch(err => console.error("Redis connection error:", err));
const generateCacheKey = (req) => {
  const { page = 1, limit = 4, search = '', all = false } = req.query;
  return `brands:${page}:${limit}:${search}:${all}`;
};
const REDIS = express.Router();

REDIS.get("/brand/getAll"), async (req, res, next) => {
  try {
    const cacheKey = generateCacheKey(req);
    
    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log('Serving from Redis cache');
        return res.status(200).json(JSON.parse(cachedData));
      }
    } catch (redisError) {
      console.error('Redis cache read error:', redisError);
      // Continue with database query if Redis fails
    }

    const { page = 1, limit = 4, search = '', all = false } = req.query;
    
    const basePipeline = [
      {
        $match: {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { slug: { $regex: search, $options: 'i' } }
          ],
        },
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
                image: 1
              }
            }
          ]
        },
      },
      {
        $project: {
          name: 1,
          createdAt: 1,
          slug: 1,
          status: 1,
          midcategories: 1,
        },
      }
    ];

    let result;

    if (all === 'true') {
      const brands = await Brands.aggregate(basePipeline);
      
      result = {
        status: "success",
        data: brands,
        totalBrands: brands.length,
      };
    } else {
      // For paginated results
      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const paginationPipeline = [
        ...basePipeline,
        { $skip: skip },
        { $limit: parseInt(limit, 10) }
      ];

      const [brands, totalBrands] = await Promise.all([
        Brands.aggregate(paginationPipeline),
        Brands.countDocuments({
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { slug: { $regex: search, $options: 'i' } }
          ]
        })
      ]);

      result = {
        status: "success",
        data: brands,
        totalBrands,
        pagination: {
          total: totalBrands,
          page: parseInt(page, 10),
          limit: parseInt(limit, 10),
          totalPages: Math.ceil(totalBrands / parseInt(limit, 10)),
        },
      };
    }

    // Cache the result in Redis with a TTL of 1 hour (3600 seconds)
    try {
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(result));
      console.log('Data cached in Redis');
    } catch (redisError) {
      console.error('Redis cache write error:', redisError);
      // Continue even if caching fails
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


REDIS.delete("/clear-brands-cache", async (req, res) => {
  try {
    let cursor = 0;
    let keys = [];
    
    do {
      const reply = await redisClient.scan(cursor, { MATCH: 'brands:*', COUNT: 100 });
      cursor = reply.cursor;
      keys = keys.concat(reply.keys);
    } while (cursor !== 0);
    
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
    
    res.json({ 
      status: "OK", 
      message: `Cleared ${keys.length} brand cache entries` 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default { REDIS, redisClient };