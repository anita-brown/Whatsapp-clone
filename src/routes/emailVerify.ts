import express from 'express';
import { verifyEmail, loginUser } from '../controllers/verifyEmail';
import { addFriends, getAllFriends } from '../controllers/userFriendController';

const router = express.Router();

router.get('/user/:confirmationCode', verifyEmail);
router.post('/login', loginUser);

export default router;
