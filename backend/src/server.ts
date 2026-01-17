import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { errorHandler } from './shared/middleware/errorHandler.Middleware';
import { sessionMiddleware } from './shared/middleware/session.Middleware';
import { corsMiddleware } from './shared/middleware/cors.Middleware';
import { stripeRouter } from './modules/webhook/route/stripe.route';
import apiRouter from './routes/api';
import cors from 'cors';

const app = express();
  

app.use(cookieParser());
app.use(corsMiddleware)
app.use(helmet());
app.use(morgan('dev'));
// app.use(corsMiddleware);
//webhook route

// The express.raw middleware keeps the request body unparsed;
// this is necessary for the signature verification process

app.use('/api/stripe', stripeRouter);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

// routes
app.use('/api',apiRouter)


// error handling middleware must be the last middleware
app.use(errorHandler);


export default app;