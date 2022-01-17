import express, { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import User from '../models/userModel';
import dotenv from 'dotenv';
import sendEmail from '../utils/email';
import crypto from 'crypto';
// import {resetToken, passwordResetExpires,passwordResetToken} from '../models/userModel';
// import { token } from 'morgan';

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
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/resetPassword/${resetToken}`;
  const message = `Forgot your Password? kindly access this link and enter a new Password to ${resetURL}.\n If you did't forget your
  Password, Please ignore this email `;

  try {
    await sendEmail({
      email: user.email,
      subject: `Your Password reset token(valid for 10 min)`,
      message,
    });
    res.status(200).json({
      status: 'Suceess',
      message: 'Token sent to email',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      message: 'There was an error sending this email. Try again later! ',
    });
  }
};

//here, we actually set the new password for the user
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //1.get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { get: Date.now() },
  });
  //2.accept new password only when token has not expired
  if (!user) {
    return res
      .status(400)
      .json({ messsage: 'Token is invalid or has expired' });
  }
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //3.update changedPassword property for user
  //4.log the user in, send jwt

  const token = signToken(user._id);

  res.status(200).json({
    status: 'Success',
    token,
  });
};
