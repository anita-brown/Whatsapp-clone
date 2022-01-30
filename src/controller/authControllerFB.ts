import express, { Request, Response, Application, NextFunction } from 'express';
import { CustomRequest } from '../utils/custom';

export const redirect = (req: Request, res: Response, next: NextFunction) => {
  // Login with facebook
  res.redirect('/api/v1/users/profile');
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.redirect('/api/v1/users/login');
  } else {
    next();
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout();
  res.redirect('/api/v1/users/login');
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('User can now log in from this route');
};

export const profile = async (req: CustomRequest, res: Response) => {

  res.send('You are logged in, Welcome ... ' + req.user!.fullname);
};
