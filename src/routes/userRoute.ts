import express from 'express';
import {
  forgotPassword,
  resetPassword,
  changePassword,
} from '../controller/passwordController';
import { signup } from '../controller/userAuthController';
import { getAllFriends, addFriends } from '../controller/userFriendController';
import { updateUser, getUser } from '../controller/updateUserController';
import { protect } from '../controller/verifyEmail';

const upload = require('../multer');
const router = express.Router();
//reset

router.get('/friends', protect, getAllFriends);

router.post('/signup', signup);
router.post('/friends', protect, addFriends);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:hashedToken', resetPassword);

router.patch('/changePassword', protect, changePassword);
router.get('/:id', getUser);
router.patch('/updateUser', protect, upload.single('avatar'), updateUser);

export default router;
