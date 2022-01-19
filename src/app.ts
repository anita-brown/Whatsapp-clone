import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import './auth';
import passport from 'passport';
import session from 'express-session';
import { mongoDBConnect, mongoMockConnect } from './database/database';

dotenv.config();

const app: Application = express();
app.use(express.json());

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  req.user ? next() : res.sendStatus(401);
}

// Express body parser
app.use(session({ secret: process.env.SESSION_SECRET as string }));
app.use(passport.initialize());
app.use(passport.session());

// Google-auth
const googleLogin = (req: Request, res: Response, next: NextFunction) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
}

const authenticate  = (passport.authenticate('google', { scope: ['email', 'profile'] }))

const redirectR = (passport.authenticate('google', {
  successRedirect: '/auth/protected',
  failureRedirect: '/auth/failure',
}))

const failRoute = (req: Request, res: Response) => {
  res.send('something went wrong...');
}

const protectedR = (req: Request, res: Response) => {
  console.log(req.user);
  const user: any = req.user;
  res.send(`Hello ${user.displayName}`);
}

const logout = (req: Request, res: Response) => {
  req.logOut()
  req.session.destroy(() => {
    console.log('hi');
  });
  res.send('Goodbye');
}

app.get('/', googleLogin)
app.get('/auth/google', authenticate)
app.get('/google/callback2', redirectR)
app.get('/auth/failure',failRoute)
app.get('/auth/protected', isLoggedIn,protectedR)
app.get('/logout',logout)



// To log our requests using morgan, but only during developement
if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}

// To connect databse from databsefile. Test environment is for jest
// if (process.env.NODE_ENV === 'test') {
//   mongoMockConnect();
// } else {
//   mongoDBConnect();
// }

// Routers upon which applications will run. To be connected to the routes files.
// app.use('/api/v1/users');

export default app;
