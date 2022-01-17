import express, { Application } from 'express';
import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import createError from 'http-errors';
const cookieParser = require('cookie-parser');
const logger = require('morgan');

import { mongoDBConnect, mongoMockConnect } from './database/database';
import UserRouter from './routes/userRoute';

const app: Application = express();

// Express body parser
app.use(express.json());

// To log our requests using morgan, but only during developement
if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
}

// To connect databse from databsefile. Test environment is for jest
if (process.env.NODE_ENV === 'test') {
  mongoMockConnect();
} else {
  mongoDBConnect();
}

// Routers upon which applications will run. To be connected to the routes files.
app.use('/api/v1/users');
app.use('/', UserRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
