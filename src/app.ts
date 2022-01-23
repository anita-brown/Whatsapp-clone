import mongoose from 'mongoose';
import express, { Application } from 'express';
const logger = require('morgan');
require('dotenv').config();
import { mongoDBConnect, mongoMockConnect } from './database/database';

import UserRouter from './routes/userRoute';

const app = express();

// To log our requests using morgan, but only during developement
if ((process.env.NODE_ENV = 'development')) {
  app.use(logger('dev'));
  app.use(express.json());
}

// To connect databse from databsefile. Test environment is for jest
if (process.env.NODE_ENV === 'test') {
  mongoMockConnect();
} else {
  mongoDBConnect();
}

// Routers upon which applications will run. To be connected to the routes files.
app.use('/api/v1/users', UserRouter);

export default app;
