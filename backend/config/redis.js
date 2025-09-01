import { createClient } from "redis";

let redisClient;

const createRedisClient = async () => {
  try {
    const client = createClient({
      socket: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
        connectTimeout: 5000,
        reconnectStrategy: (retries) => {
          console.log(`Redis connection attempt ${retries + 1}`);
          if (retries > 2) {
            console.log('Redis connection failed, using mock client');
            return false;
          }
          return Math.min(retries * 200, 1000);
        }
      }
    });

    client.on('error', (err) => {
      if (err.code !== 'ECONNREFUSED') {
        console.log('Redis Client Error:', err.message);
      }
    });

    client.on('connect', () => {
      console.log('Redis Client Connected');
    });

    client.on('ready', () => {
      console.log('Redis Client Ready');
    });

    await client.connect();
    return client;
  } catch (error) {
    console.log('Redis connection failed, using mock client');
    return createMockRedisClient();
  }
};

const createMockRedisClient = () => {
  console.log('Using mock Redis client - application will work without caching');
  return {
    get: async () => null,
    setEx: async () => {},
    del: async () => {},
    keys: async () => [],
    isConnected: false,
    connect: async () => {},
    disconnect: async () => {},
    quit: async () => {}
  };
};

// Initialize Redis client
try {
  redisClient = await createRedisClient();
} catch (error) {
  console.log('Failed to initialize Redis client:', error.message);
  redisClient = createMockRedisClient();
}

export default redisClient;