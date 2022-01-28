import express from 'express';
import passport from 'passport';
import {
  redirect,
  login,
  logout,
  protect,
  profile,
} from '../controller/authControllerFB';
import setupFB from '../passport/passport-FB-Setup';

const router = express.Router();

setupFB();

router.get('/login', login);

router.get(
  '/facebook',
  passport.authenticate('facebook')
);

// callback route to redirect
router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', { failureRedirect: '/api/v1/users/login' }),
  redirect
);

router.get('/logout', logout);

router.get('/profile', protect, profile);

export default router;
