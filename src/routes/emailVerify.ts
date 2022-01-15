import express from "express";
import { verifyEmail } from "../controller/verifyEmail";



const router = express.Router()


router.get('/user/:confirmationCode',  verifyEmail)