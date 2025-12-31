import axios from 'axios';
import { BaseUrl } from './BaseUrl';

// Detect mobile device for better timeout handling
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (window.innerWidth <= 768);
};

// Create a centralized axios instance with optimized configuration
const axiosInstance = axios.create({
  baseURL: BaseUrl,
  timeout: 15000, // Default timeout (will be adjusted per request for mobile)
  headers: {
    'Accept': 'application/json',
    // Removed Accept-Encoding as browser handles this automatically and can cause issues on some mobile browsers
    'Connection': 'keep-alive', // HTTP/1.1 keep-alive for connection reuse
  },
  // Max redirects
  maxRedirects: 5,
  // Validate status
  validateStatus: (status) => status >= 200 && status < 300,
  // Browser automatically handles HTTP/2 multiplexing
});

// Request interceptor for logging and optimization
axiosInstance.interceptors.request.use(
  (config) => {
    // Add timestamp for performance tracking
    config.metadata = { startTime: Date.now() };
    
    // Set timeout dynamically based on device type (if not already set)
    if (!config.timeout) {
      config.timeout = isMobileDevice() ? 15000 : 10000;
    }
    
    // Set Content-Type for JSON requests (but not for FormData)
    if (!config.headers['Content-Type'] && !(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    
    // Set priority hint for critical requests (browser will handle this)
    if (config.priority) {
      // Browser will handle priority hints automatically
      delete config.priority; // Remove custom property before sending
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and performance tracking
axiosInstance.interceptors.response.use(
  (response) => {
    // Log slow requests in development
    if (process.env.NODE_ENV === 'development' && response.config.metadata) {
      const duration = Date.now() - response.config.metadata.startTime;
      if (duration > 3000) {
        console.warn(`Slow request: ${response.config.url} took ${duration}ms`);
      }
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle timeout errors specifically
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.error(`Request timeout: ${error.config?.url}`);
      
      // Retry logic for timeout errors (only once, and only if not already retried)
      if (!originalRequest._retry && originalRequest.method === 'get') {
        originalRequest._retry = true;
        // Increase timeout for retry
        originalRequest.timeout = isMobileDevice() ? 20000 : 15000;
        return axiosInstance(originalRequest);
      }
    }
    
    // Handle network errors (no internet connection, CORS issues, etc.)
    if (error.code === 'ERR_NETWORK' || !error.response) {
      console.error(`Network error: ${error.config?.url}`);
      
      // Retry logic for network errors (only once, and only if not already retried)
      if (!originalRequest._retry && originalRequest.method === 'get') {
        originalRequest._retry = true;
        // Wait a bit before retrying on mobile
        await new Promise(resolve => setTimeout(resolve, isMobileDevice() ? 1000 : 500));
        return axiosInstance(originalRequest);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;

