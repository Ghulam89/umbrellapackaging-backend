import { createClient } from "redis";

let redisClient;

try {
  redisClient = createClient({
    socket: {
      // Use IPv4 address to avoid IPv6 issues
      host: '127.0.0.1',
      port: 6379,
      connectTimeout: 5000,
      reconnectStrategy: (retries) => {
        if (retries > 3) {
          console.log('Too many retries on Redis. Connection terminated');
          return new Error('Too many retries');
        }
        return Math.min(retries * 100, 3000);
      }
    }
  });

  redisClient.on('error', (err) => {
    console.log('Redis Client Error:', err);
  });

  redisClient.on('connect', () => {
    console.log('Redis Client Connected');
  });

  redisClient.on('ready', () => {
    console.log('Redis Client Ready');
  });

  // Connect to Redis
  await redisClient.connect();
  
} catch (error) {
  console.log('Redis connection failed, continuing without cache:', error.message);
  // Fallback: create a mock redis client that doesn't break the application
  redisClient = {
    get: async () => null,
    setEx: async () => {},
    del: async () => {},
    keys: async () => [],
    isConnected: false
  };
}

export default redisClient;