

import express, { NextFunction, Request, Response } from 'express';

import { getAllUser, signUp } from '../controllers/userController';

const router = express.Router();



// /* GET users listing. */
router.get("/", getAllUser);
router.post("/signup", signUp);
// router.post("/login", logIn);






export default router;
