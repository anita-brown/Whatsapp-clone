import express from 'express';
import {
  signup,
  forgotPassword,
  resetPassword,
  changePassword,
} from '../controllers/userController';

const router = express.Router();

router.route('/signup').post(signup);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword:token ', resetPassword);
router.patch('/changePassword:token ', changePassword);

export default router;
