import express, { Application } from 'express';
import morgan from 'morgan';
import passport from 'passport';
import cookieSession from 'cookie-session';
import { mongoDBConnect, mongoMockConnect } from './database/database';
import authRoute from './routes/authRoute';

const app: Application = express();

// Express body parser
app.use(express.json());

// To log our requests using morgan, but only during developement
if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}

// Cookie session middleware to help remember user sessions.
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY!],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// To connect databse from databsefile. Test environment is for jest
if (process.env.NODE_ENV === 'test') {
  mongoMockConnect();
} else {
  mongoDBConnect();
}

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routers upon which applications will run. To be connected to the routes files.
app.use('/api/v1/users', authRoute);

export default app;

// Routers upon which applications will run. To be connected to the routes files.
// app.use('/profile', profileRoute);
// app.use('/api/v1/auth', authRoute);
