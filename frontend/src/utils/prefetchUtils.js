import axios from 'axios';
import { BaseUrl } from './BaseUrl';

// In-memory cache for prefetched product data - increased size for better caching
const productCache = new Map();
const pendingRequests = new Map();
const CACHE_SIZE = 100; // Increased from 50 to 100

/**
 * Prefetch product data by slug - optimized for speed
 * @param {string} slug - Product slug
 * @param {boolean} priority - If true, fetch immediately without delay
 * @returns {Promise} - Promise that resolves with product data
 */
export const prefetchProduct = async (slug, priority = false) => {
  if (!slug) return null;

  // Return cached data if available (instant return)
  if (productCache.has(slug)) {
    return productCache.get(slug);
  }

  // Return pending request if already in progress (avoid duplicate calls)
  if (pendingRequests.has(slug)) {
    return pendingRequests.get(slug);
  }

  // Create new request with optimized timeout
  const requestPromise = axios
    .get(`${BaseUrl}/products/get?slug=${slug}`, {
      timeout: 10000, // 10 second timeout
      ...(priority && { priority: true }) // Browser hint for priority
    })
    .then((response) => {
      const productData = response?.data?.data || null;
      if (productData) {
        // Cache the data (keep last 100 products)
        productCache.set(slug, productData);
        
        // Limit cache size to prevent memory issues
        if (productCache.size > CACHE_SIZE) {
          // Remove oldest entry (LRU-like behavior)
          const firstKey = productCache.keys().next().value;
          productCache.delete(firstKey);
        }
      }
      
      // Remove from pending requests
      pendingRequests.delete(slug);
      
      return productData;
    })
    .catch((error) => {
      // Remove from pending requests on error
      pendingRequests.delete(slug);
      // Silently fail for prefetch - don't spam console
      if (error.code !== 'ECONNABORTED') {
        console.error('Prefetch error:', error.message);
      }
      return null;
    });

  // Store pending request
  pendingRequests.set(slug, requestPromise);

  return requestPromise;
};

/**
 * Prefetch multiple products in parallel for faster loading
 * @param {string[]} slugs - Array of product slugs
 * @param {boolean} priority - If true, fetch immediately without delay
 */
export const prefetchProducts = async (slugs = [], priority = false) => {
  if (!slugs || slugs.length === 0) return;

  // Filter out already cached or pending
  const slugsToFetch = slugs.filter(slug => {
    return slug && !productCache.has(slug) && !pendingRequests.has(slug);
  });

  if (slugsToFetch.length === 0) return;

  // Prefetch all in parallel for maximum speed
  Promise.all(
    slugsToFetch.map((slug) => prefetchProduct(slug, priority))
  ).catch(() => {
    // Silently handle errors in batch prefetch
  });
};

/**
 * Get cached product data
 * @param {string} slug - Product slug
 * @returns {Object|null} - Cached product data or null
 */
export const getCachedProduct = (slug) => {
  return productCache.get(slug) || null;
};

/**
 * Clear product cache (optional utility)
 */
export const clearProductCache = () => {
  productCache.clear();
  pendingRequests.clear();
};

/**
 * Prefetch products in optimized batches for faster loading
 * @param {Array} products - Array of products with slug property
 * @param {Object} options - Options for prefetching
 */
export const prefetchProductsBatch = async (products = [], options = {}) => {
  if (!products || products.length === 0) return;

  const {
    batchSize = 5, // Increased from 3 to 5 for faster prefetching
    delayBetweenBatches = 50, // Reduced from 100ms to 50ms for faster loading
    priority = false
  } = options;

  // Filter products with slugs and not already cached
  const productsToPrefetch = products
    .filter((product) => product?.slug && !productCache.has(product.slug))
    .map((product) => product.slug);

  if (productsToPrefetch.length === 0) return;

  // Prefetch first batch immediately (no delay)
  const firstBatch = productsToPrefetch.slice(0, batchSize);
  prefetchProducts(firstBatch, true); // Priority for first batch

  // Prefetch remaining batches with minimal delay
  for (let i = batchSize; i < productsToPrefetch.length; i += batchSize) {
    const batch = productsToPrefetch.slice(i, i + batchSize);
    
    // Use setTimeout for non-blocking delay
    setTimeout(() => {
      prefetchProducts(batch, priority);
    }, delayBetweenBatches * Math.floor(i / batchSize));
  }
};

