import express, { Request, Response, Application, NextFunction } from 'express';
import UserFB from '../models/userModel';

export const redirect = (req: Request, res: Response, next: NextFunction) => {
  // Login with facebook
  // req.user;
  res.redirect('/profile/');
  // res.send(req.user);
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.redirect('api/v1/auth/login');
  } else {
    // if logged in
    next();
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout();
  res.redirect('/api/v1/auth/login');
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('User can now log in from this route');
};
