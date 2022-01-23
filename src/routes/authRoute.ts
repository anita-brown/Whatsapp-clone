import express from 'express';
import passport from 'passport';
import { redirect, login, logout } from '../controllers/authController';
import setupFB from '../passport/passport-FB-Setup';

const router = express.Router();

setupFB();

router.get('/login', login);

router.get('/facebook', passport.authenticate('facebook'));

// router.get(
//   '/facebook',
//   passport.authenticate('facebook', {
//     scope: ['email'],
//   })
// );

// callback route to redirect
router.get('/facebook/redirect', passport.authenticate('facebook'), redirect);

router.get('/logout', logout);

export default router;
