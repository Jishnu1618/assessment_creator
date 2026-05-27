import { Redis } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisConfig = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null, // Critical requirement for BullMQ
};

export const redisConnection = new Redis(redisConfig);

redisConnection.on('connect', () => {
  console.log('Redis connected successfully.');
});

redisConnection.on('error', (err: any) => {
  console.error('Redis connection error:', err);
});
