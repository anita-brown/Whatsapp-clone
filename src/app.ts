import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import './auth';
import passport from 'passport';
import session from 'express-session';
import { mongoDBConnect, mongoMockConnect } from './database/database';

dotenv.config();

const app: Application = express();
// Express body parser
app.use(express.json());

// Google-auth
const googleLogin = (req: Request, res: Response, next: NextFunction) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
}

const protectedR = (passport.authenticate('google', { scope: ['email', 'profile'] }))

app.get('/', googleLogin)
app.get('/auth/google', protectedR)

// To log our requests using morgan, but only during developement
if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}

// To connect databse from databsefile. Test environment is for jest
if (process.env.NODE_ENV === 'test') {
  mongoMockConnect();
} else {
  mongoDBConnect();
}

// Routers upon which applications will run. To be connected to the routes files.
app.use('/api/v1/users');

export default app;
