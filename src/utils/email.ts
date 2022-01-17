import { options } from 'joi';
// import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');

const sendEmail = async (options: any) => {
  //create a transporter using nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: { user: process.env.USER, pass: process.env.PASSWORD },
  });

  //define the email options
  const mailOptions = {
    from: 'Sender name <from@example.net>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //actually send the temail
  await transporter.sendEmail(mailOptions);
};

export default sendEmail;
