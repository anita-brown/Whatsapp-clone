import express, { Application } from 'express';
import morgan from 'morgan';
import { mongoDBConnect, mongoMockConnect } from './database/database';

const app: Application = express();

// Express body parser
app.use(express.json());

// To log our requests using morgan, but only during developement
if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}

// Cookie session middleware
app.use(cookieSession({}));

// To connect databse from databsefile. Test environment is for jest
if (process.env.NODE_ENV === 'test') {
  mongoMockConnect();
} else {
  mongoDBConnect();
}

// Routers upon which applications will run. To be connected to the routes files.
app.use('/api/v1/users', userSignupRoutes);

export default app;
