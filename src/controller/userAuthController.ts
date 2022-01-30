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
    })
      .then(async (user) => {
        if (user) {
          errors.email = 'Email already exists';
          return res.status(400).json({
            email: errors,
          });
        } else {
          const avatar = gravatar.url(req.body.email, {
            s: '400', //Size
            r: 'pg', // rating
            d: 'mm', // default
          });

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
            phoneNumber: req.body.phoneNumber,
            avatar,
            confirmCode: token,
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password!, salt, (err, hash) => {
              if (err) throw err;

              newUser.password = hash;

              const output = `<div style="background-color:#fbfbfb; width:90%; height: 90%;">
            <div style="background-color:white; width:60%; margin: 0 auto; padding: 20px">

           <h1>👋🏻 Hi ${newUser.firstName}</h1>


            <hr/>
             <p>We are happy you signed up on whatsapp.
               To start exploring our App and chat with your
               friends please confirm your email address.
             </p>
            <br/>


         <a href="http://${req.headers.host}/api/v1/users/verify-email?pass=${newUser.confirmCode}" target="_blank" style="text-decoration:none; background-color:#25D366; color:white; padding: 15px; border-radius: 5px; width: 100px; margin-bottom: 5px;">Verify now!</a>
         <br/>

            <p style="margin-top:10px">💚 Welcome to Whatsapp!</p>
            <p style="color:grey; font-size: 10px;">WhatsApp Awesome Team B </p>
            </div>
            </div>
        `;

              const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.AUTH_EMAIL as string,
                  pass: process.env.AUTH_PASS as string,
                },
              });

              const mailOptions = {
                from: '"WhatsApp-Team" <mavidmuchi@gmail.com>', //sender address
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
                .then((user: any) =>
                  res.status(201).json({
                    message: 'User registered successfully',
                    success: true,
                    user,
                  })
                )
                .catch((err: Error) => {
                  console.log(err);
                  return res
                    .status(400)
                    .json({ message: 'Unable to save user' });
                });
            });
          });
        }
      })
      .catch((err) =>
        res.status(400).json({
          success: false,
          message: 'Your Registration was unsuccessful',
        })
      );
  } catch (error) {
    console.log(error);

    res.status(401).json({ message: 'Unable to sign up user' });
  }
};
