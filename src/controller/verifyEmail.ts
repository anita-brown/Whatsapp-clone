import express, {Request, Response, NextFunction} from "express";
import bcrypt from 'bcryptjs';
import User from '../model/mockUser.model';
// import jwt, { Secret } from 'jsonwebtoken'



export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({})
}