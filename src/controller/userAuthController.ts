import express, { NextFunction, Request, Response } from 'express';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

import { UserAuth } from '../models/Users';

import { userRegisterInput } from '../validation/signup';

export const signup = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { errors, isValid } = userRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    await UserAuth.findOne({
      email: req.body.email,
    }).then(async (user) => {
      if (user) {
        errors.email = 'Email and phoneNumber already exists';
        return res.status(400).json({
          email: errors,
        });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '400', //Size
          r: 'pg', // rating
          d: 'mm', // default
        });

        console.log(process.env.CONFIRM_TOKEN);

        const token = jwt.sign(
          { email: req.body.email },
          process.env.CONFIRM_TOKEN as string,
          {
            expiresIn: '10m',
          }
        );

        const newUser = new UserAuth({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          password2: req.body.password2,
          phoneNumber: req.body.phoneNumber,
          profilePicture: avatar,
          confirmCode: token,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
          });
        });

        
        const output = `
           <h1>Hello</h1>

             <p>Thanks for registering on our site.
               Please click on the link below to verify your email
             </p>


         <a href="http://${req.headers.host}/verify-email?pass=${newUser.confirmCode}" target="_blank">VERIFY YOUR ACCOUNT</a>

        
        `;

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.AUTH_EMAIL as string,
            pass: process.env.AUTH_PASS as string,
          },
        });

        const mailOptions = {
          from: 'mavidmuchi@gmail.com>', //sender address
          to: newUser.email, //list of receivers
          subject: 'Thank you registering', //Subject line
          html: output, //body of the mail
        };

        transporter.sendMail(mailOptions, (err: any, info: any) => {
          if (err) throw err;

          console.log('Message sent: %s', info.messageId);
        });

        newUser
          .save()
          .then((user) =>
            res.status(201).json({
              message: 'User registered successfully',
              success: true,
              user,
            })
          )
          .catch((err) =>
            res.status(400).json({ message: 'Unable to save user' })
          );
      }
    }).catch((err) => res.status(400).json({ success : false, message: "Unsuccessful"}))
  } catch (error) {
    console.log(error);
  }
};
