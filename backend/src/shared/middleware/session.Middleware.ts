import { RedisStore } from "connect-redis";
import { redis } from "../redis/redis.service";
import session from "express-session";

const sessionOptions = {
  store: new RedisStore ({ client: redis}),
  name: 'sid',
  secret: process.env.JWT_SECRET_KEY || 'default_secret',
  resave: false,
  saveUninitialized: false,
  cookie:{
    httpOnly:true,
    maxAge:1000*60*60*24, //1 day
  }
};

export const sessionMiddleware = session(sessionOptions);
//   cookie: {
//     secure: process.env.SESSION_SECURE === 'production',
//     httpOnly: true,
//     maxAge: 1000 * 60 * 60 * 24, // 1 day
//   },