import express, { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import User from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get user based on POSTed email
  const { email } = req.body;
  const user = await User.findOne({ email }, async (err: any, user: any) => {
    if (err || !user) {
      return res.status(404).json({ error: 'Email address does not exist' });
    }

    //generate the random reset token
    // const token = jwt.sign({ _id: user._id }, process.env.JWT_ACC_ACTIVATE as Secret, {
    //   expiresIn: '10m',
    // });

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
  });

  //send back to user's email
  //
};
export const resetPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
