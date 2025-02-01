import {Redis} from "ioredis";

const { REDIS_URL } = process.env;

const redisClient=new Redis(REDIS_URL);

export {redisClient}