import express, { Router } from 'express';
import {
  signUp,
  forgotPassword,
  resetPassword,
  changePassword,
} from '../controllers/userController';

const router = express.Router();
router.post('/signup', signUp);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword:token ', resetPassword);
router.patch('/changePassword:token ', changePassword);

export default Router;
