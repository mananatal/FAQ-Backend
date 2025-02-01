import {Redis} from "ioredis";

const { REDIS_URL } = process.env;
//If you are running server on your local system then delete REDIS_URL to avoid any errors

const redisClient=new Redis(REDIS_URL);

export {redisClient}