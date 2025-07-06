import { createClient } from 'redis';
import dotenv from "dotenv";

dotenv.config();

export const redisClient = createClient(
    {
        username: 'default',
        password: process.env.Redis_url,
        socket: {
            host: process.env.Redis_host,
            port: 13234
        }
    }
);


redisClient.on('error', (err) => console.error('Redis Error:', err));

async function connectRedis() {
    try {
        await redisClient.connect();
        console.log('✅ Connected to Redis');
    } catch (error) {
        console.error('❌ Redis Connection Failed:', error);
    }
}


export default connectRedis
