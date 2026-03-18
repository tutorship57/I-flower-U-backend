import { Queue } from "bullmq";
import { redisConnection } from "../../redis/redis.connection";

export const recommendationQueue = new Queue ("recommendation",{
    connection: redisConnection
})

