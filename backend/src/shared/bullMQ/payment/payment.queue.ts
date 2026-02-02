import { Queue } from "bullmq";
import { redisConnection } from "../../redis/redis.connection";

export const stripePaymentQueue = new Queue ("stripe-payment", {
    connection: redisConnection,
}); 

