import fs from 'fs';
import redis from 'redis';
import express from 'express';
const redisClient = redis.createClient({
    socket: {
        host: '31.97.14.21',
        port: 6379
    },
    password: 'TalhA#123591'
});

redisClient.connect().then().catch(err => console.error("Redis connection error:", err));

const REDIS = express.Router();

// Get all events
REDIS.get("/get-events", async (req, res) => {
    try {
        const events = await redisClient.keys('event:*');
        const eventsData = [];
        
        for (const key of events) {
            const eventData = await redisClient.hGetAll(key);
            eventsData.push({
                id: key.split(':')[1],
                ...eventData
            });
        }
        
        res.json({ success: true, events: eventsData });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get specific event by ID
REDIS.get("/get-event/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const eventData = await redisClient.hGetAll(`event:${id}`);
        
        if (Object.keys(eventData).length === 0) {
            return res.status(404).json({ success: false, error: "Event not found" });
        }
        
        res.json({ success: true, event: { id, ...eventData } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create new event
REDIS.post("/create-event", async (req, res) => {
    try {
        const { title, description, date, location } = req.body;
        const eventId = Date.now().toString(); // Generate unique ID
        
        await redisClient.hSet(`event:${eventId}`, {
            title,
            description,
            date,
            location,
            createdAt: new Date().toISOString()
        });
        
        // Set expiration if needed (e.g., 30 days)
        await redisClient.expire(`event:${eventId}`, 30 * 24 * 60 * 60);
        
        res.json({ success: true, id: eventId, message: "Event created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update event
REDIS.put("/update-event/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, location } = req.body;
        
        const exists = await redisClient.exists(`event:${id}`);
        if (!exists) {
            return res.status(404).json({ success: false, error: "Event not found" });
        }
        
        await redisClient.hSet(`event:${id}`, {
            title,
            description,
            date,
            location,
            updatedAt: new Date().toISOString()
        });
        
        res.json({ success: true, message: "Event updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete event
REDIS.delete("/delete-event/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await redisClient.del(`event:${id}`);
        
        if (deleted === 0) {
            return res.status(404).json({ success: false, error: "Event not found" });
        }
        
        res.json({ success: true, message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Search events by title
REDIS.get("/search-events", async (req, res) => {
    try {
        const { query } = req.query;
        const events = await redisClient.keys('event:*');
        const results = [];
        
        for (const key of events) {
            const eventData = await redisClient.hGetAll(key);
            if (eventData.title && eventData.title.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    id: key.split(':')[1],
                    ...eventData
                });
            }
        }
        
        res.json({ success: true, results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = {
    REDIS,
    redisClient
};