import express from 'express';
import {
  forgotPassword,
  resetPassword,
  changePassword,
} from '../controllers/userController';
import { signup } from "../controller/userAuthController";

const router = express.Router();
//reset

router.post("/signup", signup);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:hashedToken', resetPassword);
router.patch('/changePassword/:userId', changePassword);

export default router;
