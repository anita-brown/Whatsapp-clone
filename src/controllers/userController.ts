import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { IUser } from '../middlewares/interface';
import UserTesting from '../models/userSchema';
import { validateSignUp } from '../middlewares/auth';
//import {sendEmail} from "../utilis/sendEmail";
import _, { min } from 'lodash';
import PasswordResetToken from '../models/passwordResetSchema';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import router from '../routes/userRoute';
require('dotenv').config();

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  auth: {
    user: 'process.env.USER',
    pass: process.env.PASSWORD as string,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const signup = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  //console.log('hbdbjjdkcd');
  const { error } = validateSignUp(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  try {
    let user = await UserTesting.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (user) return res.status(400).json('User exists');
    const newUser = await UserTesting.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: await bcrypt.hash(password, 10),
      if(newUser: any) {
        return res.status(200).json('You have successfully registered');
      },
    });
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
  // console.log('yessss');
  res.status(200).json({ msg: 'you have successfully registered' });
};

export async function forgotPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //res.json(" you just test this")
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    const user = UserTesting.findOne(
      { email: req.body.email },
      async (err: any, user: any) => {
        if (!user) {
          return res.status(400).json("user with given email doesn't exist");
        }
        let token = await PasswordResetToken.findOne({ userId: user._id });
        if (!token) {
          token = await new PasswordResetToken({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex'),
          }).save();
        }
        const link = `${process.env.BASE_URL}/reset_password/${user._id}/${token.token}`;
        const mailOptions = {
          from: 'Viktor',
          to: user.email,
          subject: 'RESET PASSWORD LINK',
          text: 'text',
          html: `<h1> please click on the url below to reset your password </h1>
              <h3> The link sent will expire in 30 minute </3>
          <p style="color:red; font-size:26px;"><a href="${link}"><i class="fas fa-window-restore"></i>Reset Password </a></p1>`,
        };

        transporter.sendMail(mailOptions, (err: any, info: any) => {
          if (err) {
            res.status(400).json(err.message);
          } else {
            //console.log(link)
            res
              .status(200)
              .json(
                'Please check your Email for the link to reset your password'
              );
          }
        });
      }
    );
  } catch (error) {
    res.json('An error occured');
    console.log(error);
  }
}

export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const schema = Joi.object({ password: Joi.string().min(6).required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await UserTesting.findById(req.params.userId);
    if (!user) return res.status(400).json('invalid link or expired');
    const token = await PasswordResetToken.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).json('Invalid link or expired');
    const salt = await bcrypt.genSalt(10);
    // password: await bcrypt.hash(req.body.password, salt),
    // user.password = bcrypt.hash(req.body.password, salt);
    user.password = req.body.password;
    await user.save();
    await token.delete();
    res.send('password reset sucessfully.');
  } catch (error) {
    res.send('An error occured');
    console.log(error);
  }
}

export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const schema = Joi.object({ password: Joi.string().min(6).required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    UserTesting.findOne({ user: req.body.user.id }, (err: any, user: any) => {
      if (user) {
        console.log(user.user_id);
      } else {
        console.log('Invalid Password');
      }
    });
  } catch (error) {
    console.error(error);
  }
}
