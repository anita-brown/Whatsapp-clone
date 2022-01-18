import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { IUser } from '../middlewares/interface';
import UserTesting from '../models/userSchema';
import { validateSignUp } from '../middlewares/auth';
//import {sendEmail} from "../utilis/sendEmail";
import _, { min } from 'lodash';
import PasswordResetToken, {
  passwordModel,
} from '../models/passwordResetSchema';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import router from '../routes/userRoute';
require('dotenv').config();

// user: 'hademath1@gmail.com',
// pass: process.env.PASS as string,

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
    if (user) return res.status(400).json('User exists'); //this shows user account alreadey exists...Otherwise create new user
    const newUser = await UserTesting.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: await bcrypt.hash(password, 10),
      if(newUser: any) {
        return res
          .status(200)
          .json('Welcome! You have successfully registered');
      },
    });
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
  // console.log('yessss');
  res.status(200).json({ msg: 'You have successfully registered!' });
};

//Implementing route-handler for forgotPassword
export async function forgotPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //res.json(" you just test this")
  try {
    //First step: Get user based on POSTED email
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    const user = UserTesting.findOne(
      { email: req.body.email },
      async (err: any, user: any) => {
        if (!user) {
          return res.status(404).json("User with given email doesn't exist");
        }

        //2nd Step: Generate Random Reset token
        let token = await PasswordResetToken.findOne({ userId: user._id });
        if (!token) {
          token = await new PasswordResetToken({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex'),
          }).save();
        }
        //the token above is created is a reset token sent to the user to use in reseting his password
        //just like passwords , we should never store plain reset tokens in our database

        const link = `${process.env.BASE_URL as string}/reset_password/${
          user._id
        }/${token}`;

        //3rd Step: Send back to user's email
        //While using nodemailer(to send emails),
        //a.we first create a transporter
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'mavidmuchi@gmail.com',
            pass: 'mavidmuchi1234',
          },
        });

        //b.define the email options
        const mailOptions = {
          from: 'mavidmuchi1234@gmail.com',
          to: user.email,
          subject: 'Reset Password Link',
          text: 'text',
          html: `<h1> Forgot your password? \n
          Please click on the link below to reset your password!! 👧 <h1>
              <h3> The link sent will expire in 10 minutes <h3>
              <h3> If you didn't forget your password, please ignore this email <h3>

          <p style="color:red; font-size:26px;"><a href="${link}"><i class="fas fa-window-restore"></i>Reset Password </a></p1>`,
        };

        //c.we then actually send the mail
        await transporter.sendMail(mailOptions, (err: any, info: any) => {
          if (err) throw err;
          console.log('Message sent: %s', info.messageId);
        });
        res
          .status(200)
          .json({ status: 'success', message: 'Token sent to the email' });
      }
    );
  } catch (error) {
    res.status(500).json('An error occured');
    // console.log(error);
    console.log('There was an error sending the email. Try again later!');
  }
}

//This route-handler resets the user's password
export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //validating user inputs. steps:
    //1.we first get user based on given token
    //2.if token hasn't expired, set the new password
    //3.update changed password's property for the user
    //Log the user in, send jwt
    const schema = Joi.object({ password: Joi.string().min(6).required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await UserTesting.findById(req.params.userId);
    if (!user) return res.status(400).json('invalid link or expired');
    const token = await PasswordResetToken.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).json('Invalid link or expired token');
    const salt = await bcrypt.genSalt(10);
    password: await bcrypt.hash(req.body.password, salt),
      // user.password = bcrypt.hash(req.body.password, salt);
      (user.password = req.body.password);
    await user.save();
    await token.delete(); //this delets the token after set time.
    res.send('password reset sucessfully.');
  } catch (error) {
    res.send('An error occured');
    console.log(error);
  }
}

interface customRequest extends Request {
  user: passwordModel;
}

export async function changePassword(
  req: customRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const schema = Joi.object({ password: Joi.string().min(6).required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const passwordFields = {
      password: '',
    };
    UserTesting.findOne({ user: req.body.user.id }, (err: any, user: any) => {
      // console.log(user.user_id);

      if (req.body.password) passwordFields.password = req.body.password;

      UserTesting.findOneAndUpdate(
        { user: req.user!._id },
        { $set: passwordFields },
        { new: true }
      )
        .then((user) =>
          res
            .status(200)
            .json({ success: true, message: 'Password changed successfully' })
        )
        .catch((err) =>
          res.status(400).json({
            success: false,
            message: 'Unsuccessful \n Try again later',
          })
        );

      res
        .status(200)
        .json({ success: true, message: 'Password changed successfully.' });
    });
  } catch (error) {
    console.error(error);
  }
}
