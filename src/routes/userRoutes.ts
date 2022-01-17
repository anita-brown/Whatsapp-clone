import express from 'express';
import { forgotPassword, resetPassword } from '../controllers/authController';

const router = express.Router();

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword:token ', resetPassword);
