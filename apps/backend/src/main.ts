import express, { NextFunction, Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';

import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import accountRouter from './routes/account';
import apiRouter from './routes/api';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME as string}:${
    process.env.MONGODB_PASSWORD as string
  }@sublet.5ykrrfm.mongodb.net/?retryWrites=true&w=majority`,
);

const corsOptions: CorsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(
  cookieSession({
    name: 'session',
    secret: 'temp-secret-key',
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
  }),
);

app.use('/account', accountRouter);
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
