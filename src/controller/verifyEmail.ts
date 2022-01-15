import express, { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs';
import User from '../model/mockUser.model';
// import jwt, { Secret } from 'jsonwebtoken'



export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({ confirmationCode: req.params.confirmationCode })
        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }
        user.status = "Active";
        await user.save((err: any) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        })
        res.redirect('/login')
    } catch (err: any) {
        console.log("error", err)
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const {error} = validateLogin(req.body)
    try {
        
    } catch (error: any) {
        
    }
}

