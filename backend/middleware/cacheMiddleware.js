import NodeCache from 'node-cache';

const ttl = parseInt(process.env.API_CACHE_TTL || '180', 10);
const cache = new NodeCache({
  stdTTL: ttl,
  checkperiod: Math.max(60, Math.floor(ttl / 2))
});

const shouldSkip = () => false;

const routeTtl = (req) => {
  const p = req.path || req.originalUrl || '';
  if (p.startsWith('/category/get')) {
    return parseInt(process.env.CATEGORY_CACHE_TTL || '300', 10);
  }
  if (p.startsWith('/blog/get') || p.startsWith('/blog/getAll')) {
    return parseInt(process.env.BLOG_CACHE_TTL || '1', 10);
  }
  if (p.startsWith('/products/get') || p.startsWith('/products/categoryProducts') || p.startsWith('/products/getAll')) {
    return parseInt(process.env.PRODUCT_CACHE_TTL || '120', 10);
  }
  if (p.startsWith('/brands/get') || p.startsWith('/brands/getAll')) {
    return parseInt(process.env.BRAND_CACHE_TTL || '5', 10);
  }
  if (p.startsWith('/faq/get') || p.startsWith('/faq/getAll')) {
    return parseInt(process.env.FAQ_CACHE_TTL || '300', 10);
  }
  if (p.startsWith('/banner/get') || p.startsWith('/banner/getAll')) {
    return parseInt(process.env.BANNER_CACHE_TTL || '600', 10);
  }
  if (p.startsWith('/rating/get') || p.startsWith('/rating/getAll') || p.startsWith('/rating/getOverall')) {
    return parseInt(process.env.RATING_CACHE_TTL || '120', 10);
  }
  if (p.startsWith('/subcategory/get') || p.startsWith('/subcategory/getAll')) {
    return parseInt(process.env.SUBCATEGORY_CACHE_TTL || '300', 10);
  }
  if (p.startsWith('/products/search')) {
    return parseInt(process.env.SEARCH_CACHE_TTL || '30', 10);
  }
  return ttl;
};

export const apiCacheMiddleware = (req, res, next) => {
  if (req.method !== 'GET' || shouldSkip(req)) return next();

  const key = req.originalUrl;
  const ttlForThis = routeTtl(req);
  const cached = cache.get(key);
  if (cached) {
    res.setHeader('Cache-Control', `public, max-age=${ttlForThis}`);
    res.setHeader('X-API-Cache', 'HIT');
    res.setHeader('X-API-Cache-TTL', String(ttlForThis));
    return res.status(200).json(cached);
  }

  const originalJson = res.json.bind(res);
  res.json = (body) => {
    try {
      cache.set(key, body, ttlForThis);
    } catch (_) {}
    res.setHeader('Cache-Control', `public, max-age=${ttlForThis}`);
    res.setHeader('X-API-Cache', 'MISS');
    res.setHeader('X-API-Cache-TTL', String(ttlForThis));
    return originalJson(body);
  };

  next();
};

export default apiCacheMiddleware;
