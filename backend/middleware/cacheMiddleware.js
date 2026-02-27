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
    return parseInt(process.env.CATEGORY_CACHE_TTL || '1', 10);
  }
  if (p.startsWith('/blog/get') || p.startsWith('/blog/getAll')) {
    return parseInt(process.env.BLOG_CACHE_TTL || '1', 10);
  }
  if (p.startsWith('/products/get') || p.startsWith('/products/categoryProducts')) {
    return parseInt(process.env.PRODUCT_CACHE_TTL || '1', 10);
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
