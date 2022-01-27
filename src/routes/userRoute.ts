import express from 'express';
import {
  forgotPassword,
  resetPassword,
  changePassword,
} from '../controllers/userController';
import { signup } from '../controller/userAuthController';
import { getAllFriends, addFriends } from '../controllers/userFriendController';

const router = express.Router();
//reset

router.post('/signup', signup);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:hashedToken', resetPassword);
router.patch('/changePassword/:userId', changePassword);
router.get('/friends', getAllFriends);
router.post('/friends', addFriends);

export default router;
