import express from 'express';
import {
  forgotPassword,
  resetPassword,
  changePassword,
} from '../controllers/passwordController';
import { signup } from '../controllers/userAuthController';
import { getAllFriends, addFriends } from '../controllers/userFriendController';
import { updateUser, getUser } from '../controllers/updateUserController';
import { protect } from '../controllers/verifyEmail';

const upload = require('../multer');
const router = express.Router();
//reset

router.get('/friends', protect, getAllFriends);

router.post('/signup', signup);
router.post('/friends', protect, addFriends);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:hashedToken', resetPassword);

router.patch('/changePassword', protect, changePassword);
router.get('/', protect, getUser);
router.patch('/updateUser', protect, upload.single('avatar'), updateUser);

export default router;
