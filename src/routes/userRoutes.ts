

import express, { NextFunction, Request, Response } from 'express';

import { getAllUser, signUp } from '../controllers/userController';
import { getAllFriends, addFriends } from '../controllers/userFriendController'

const router = express.Router();



// /* GET users listing. */
router.get("/", getAllUser);
router.post("/signup", signUp);
// router.post("/login", logIn);

router.get("/friends", getAllFriends)
router.post("/friends", addFriends)




export default router;
