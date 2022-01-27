import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import userSignUpRoutes from "./routes/usersAuth";
import { connectDB, connectDBTest } from "./database/databaseConnection";

dotenv.config();

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//User auth routes

app.use('/api/v1/auth', userSignUpRoutes);



//MongoDB connection

// console.log(process.env.NODE_ENVIRONMENT);

if (process.env.NODE_ENV === "test") {
  connectDBTest();
} else {
  connectDB();
}


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
  res.render('error');
});

export default app;
