import { createClient } from "redis";

export const redis = createClient({ url: process.env.REDIS_URL || "redis://localhost:6379" });  

redis.on("error", (err) => console.log("Redis Client Error", err));


(async () => {
  try {
    await redis.connect();
    console.log("Redis connected");
  } catch (err) {
    console.error("Redis connect error:", err);
  }
})();


