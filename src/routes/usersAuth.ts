import express from "express";
import { signup } from "../controller/userAuthController";

const router = express.Router()

router.post("/signup", signup);

router.post("/verifyemail",);

export default router;