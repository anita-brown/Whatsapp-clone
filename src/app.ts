import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';

import { setupGoogle } from './passport/passport-ggle';
import authRoutes from './routes/authRouteGgle';

dotenv.config();

const app = express();

app.use(express.json());

setupGoogle();

app.use(session({ secret: process.env.SESSION_SECRET as string }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);

export default app;
