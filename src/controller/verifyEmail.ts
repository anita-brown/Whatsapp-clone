import express, { Request, Response, NextFunction } from 'express';
import { UserAuth } from '../models/Users';
import { validateLogin } from '../utils/validatorUtils';
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import { CustomRequest } from '../utils/custom';

//This function handles verification of email, a route with confirmation code is sent to user email on signup
export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserAuth.findOne({
      confirmationCode: req.params.confirmationCode,
    });
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    user.status = 'Active';
    await user.save((err: any) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    });
    res.redirect('/login');
  } catch (err: any) {
    console.log('error', err);
  }
};

//This function handles login, after emails are verified users are redirected to login
export const loginUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    try {
      const findUser = await UserAuth.findOne({ email: req.body.email }).select(
        '+password'
      );

      if (!findUser)
        return res
          .status(400)
          .json({ message: 'user does not exist, kindly signup' });
      const match = await bcrypt.compare(req.body.password, findUser.password!);
      if (!match) return res.status(400).json({ message: 'invalid password' });
      if (findUser.status === 'Pending')
        return res.status(403).json({
          message: `kindly verify your account via the email sent to you`,
        });
      const user = { email: req.params.email };
      console.log(findUser);

      const accessToken = jwt.sign(
        {id: findUser.id},
        process.env.ACCESS_TOKEN_SECRET as Secret
      );
      req.user! = findUser;
      return res.status(201).json({ message: 'login successful', accessToken });
    } catch (error: any) {
      console.log(error);
      res.status(403).json({ error });
    }
  }
};

export const protect = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token;
  // 1) Getting token and check if its there
  console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'You are not logged in!, Please log in to get access.',
    });
  }
  // validate token
  const decoded: any = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as Secret
  );
  console.log(decoded);
  // check if user still exists
  const freshUser = await UserAuth.findById(decoded.id);
  if (!freshUser) {
    return res.status(401).json({
      status: 'fail',
      message: 'The user belonging to this token no longer exist.',
    });
  }
  // check if user changed password after token was issued
  req.user = freshUser;
  next();
};
