import express from 'express';
import passport from 'passport';
import {
  redirect,
  login,
  logout,
  protect,
  profile,
} from '../controllers/authController';
import setupFB from '../passport/passport-FB-Setup';

const router = express.Router();

setupFB();

router.get('/login', login);

// router.get('/facebook', passport.authenticate('facebook'));

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['profile'],
  })
);

// callback route to redirect
router.get('/facebook/redirect', passport.authenticate('facebook'), redirect);

router.get('/logout', logout);

router.get('/profile', protect, profile);

export default router;
