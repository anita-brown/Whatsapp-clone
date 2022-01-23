import express, { NextFunction } from 'express';
import { CustomUserReq } from '../models/custom';
import { protect } from '../controllers/authController';

const router = express.Router();

router.get('/', protect, (req: CustomUserReq, res) => {
  res.send('You are logged in, Welcome ... ' + req.user!.fullname);
});

export default router;
