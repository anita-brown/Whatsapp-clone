import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { isLoggedIn } from '../controller/authControllerGgle';
import {
  signupGoogle,
  failedGoogleSignup,
  protectedPage,
  logout,
} from '../controller/authControllerGgle';

const router = express.Router();

router.get('/signup/google', signupGoogle);

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/auth/failure', failedGoogleSignup);

router.get('/auth/protected', isLoggedIn, protectedPage);

router.get('/logout', logout);

router.get(
  '/google/callback2',
  passport.authenticate('google', {
    successRedirect: '/auth/protected',
    failureRedirect: '/auth/failure',
  })
);

export default router;
