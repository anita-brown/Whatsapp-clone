import express from 'express';
import {
  signup,
  forgotPassword,
  resetPassword,
  changePassword,
} from '../controllers/userController';

const router = express.Router();
//reset
router.route('/signup').post(signup);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:hashedToken', resetPassword);
// router.post('/updatePassword/:token', updatePassword);
router.patch('/changePassword/:userId', changePassword);

export default router;
