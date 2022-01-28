import express from "express";
import { verifyEmail, loginUser } from "../controller/verifyEmail";
import { addFriends,getAllFriends } from "../controller/userFriendController";



const router = express.Router()


router.get('/user/:confirmationCode',  verifyEmail)
router.post('/login', loginUser)
router.post('/friends', addFriends)
router.get('/friends', getAllFriends)


export default router;