import { Queue } from "bullmq";
import { redisConnection } from "../../redis/redis.connection";

export const reserveStockQueue = new Queue ("reserve-stock", {
    connection: redisConnection,
});



export const releaseStockQueue = new Queue ("release-stock", {
    connection: redisConnection,
});