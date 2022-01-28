import express from 'express';
import {
  forgotPassword,
  resetPassword,
  changePassword,
} from '../controller/userController';
import { signup } from '../controller/userAuthController';
import { getAllFriends, addFriends } from '../controller/userFriendController';
import { updateUser } from '../controller/updateUserController';
const upload = require('../multer');
const router = express.Router();
//reset

router.get('/friends', getAllFriends);

router.post('/signup', signup);
router.post('/friends', addFriends);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:hashedToken', resetPassword);

router.patch('/changePassword/:userId', changePassword);

router.patch('/updateUser', upload.single('avatar'), updateUser);

export default router;
