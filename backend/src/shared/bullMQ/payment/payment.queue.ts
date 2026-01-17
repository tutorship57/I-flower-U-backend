import { Queue } from "bullmq";
import { redisConnection } from "../../redis/redis.connection";

export const paymentQueue = new Queue ("payment-check", {
    connection: redisConnection,
});




