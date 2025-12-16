import axios from 'axios';
import { BaseUrl } from './BaseUrl';

// Create a centralized axios instance with optimized configuration
const axiosInstance = axios.create({
  baseURL: BaseUrl,
  timeout: 6000, // 6 second timeout for faster failure detection
  headers: {
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate, br', // Enable compression
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
  (error) => {
    // Handle timeout errors specifically
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.error(`Request timeout: ${error.config?.url}`);
    }
    
    // Handle network errors
    if (error.code === 'ERR_NETWORK' || !error.response) {
      console.error(`Network error: ${error.config?.url}`);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;

