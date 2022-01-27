import session from 'express-session';
import { setupGoogle } from './passport/passport-ggle';
import authRoutes from './routes/authRouteGgle';
import passport from 'passport';
import cookieSession from 'cookie-session';
import authRouteFB from './routes/authRoute';
import emailRoutes from './routes/emailVerify';
import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import { mongoDBConnect, mongoMockConnect } from './database/database';
import UserRouter from './routes/userRoute';

dotenv.config();

const app = express();

app.use(express.json());

setupGoogle();

app.use(session({ secret: process.env.SESSION_SECRET as string }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);
// Cookie session middleware to help remember user sessions.
app.use(
  cookieSession({
    // name: 'session',
    keys: [process.env.COOKIE_KEY!],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//MongoDB connection
if (process.env.NODE_ENV === 'test') {
  mongoMockConnect();
} else {
  mongoDBConnect();
}

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routers upon which applications will run. To be connected to the routes files.
app.use('/api/v1/users', authRouteFB);

// Routers upon which applications will run. To be connected to the routes files.
app.use('/api/v1/users', UserRouter);
//User auth routes
app.use('/api/v1/users', emailRoutes);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: err.message,
  });
});

export default app;
