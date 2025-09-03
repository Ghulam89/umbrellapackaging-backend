// import fs from 'fs';
import redis from 'redis';
import express from 'express';
const redisClient = redis.createClient({
    socket: {
    host: "31.97.14.21",
    port: 6379,
  },
  username: "umbrella",
  password: "umbrella123",

});

redisClient.connect().then(res=>console.log('redis connect successfuly!')).catch(err => console.error("Redis connection error:", err));

const REDIS = express.Router();

// Get all events
REDIS.get("/get-events", async (req, res) => {
    
});


module.exports = {
    REDIS,
    redisClient
};