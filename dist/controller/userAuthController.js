"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const gravatar_1 = __importDefault(require("gravatar"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = require("../models/Users");
const signup_1 = require("../validation/signup");
const signup = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { errors, isValid } = (0, signup_1.userRegisterInput)(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        yield Users_1.UserAuth.findOne({
            email: req.body.email,
        }).then((user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user) {
                errors.email = 'Email and phoneNumber already exists';
                return res.status(400).json({
                    email: errors,
                });
            }
            else {
                const avatar = gravatar_1.default.url(req.body.email, {
                    s: '400',
                    r: 'pg',
                    d: 'mm', // default
                });
                console.log(process.env.CONFIRM_TOKEN);
                const token = jsonwebtoken_1.default.sign({ email: req.body.email }, process.env.CONFIRM_TOKEN, {
                    expiresIn: '10m',
                });
                const newUser = new Users_1.UserAuth({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    password2: req.body.password2,
                    phoneNumber: req.body.phoneNumber,
                    profilePicture: avatar,
                    confirmCode: token,
                });
                bcryptjs_1.default.genSalt(10, (err, salt) => {
                    bcryptjs_1.default.hash(newUser.password, salt, (err, hash) => {
                        if (err)
                            throw err;
                        newUser.password = hash;
                    });
                });
                const output = `<div style="background-color:#fbfbfb; width:90%; height: 90%;">
            <div style="background-color:white; width:60%; margin: 0 auto; padding: 20px">
            
           <h1>👋🏻 Hi ${newUser.firstName}</h1>
           
          
            <hr/>
             <p>We are happy you signed up on whatsapp.
               To start exploring our App and chat with your
               friends please confirm your email address.
             </p>
            <br/>
           
           
         <a href="http://${req.headers.host}/api/v1/auth/verify-email?pass=${newUser.confirmCode}" target="_blank" style="text-decoration:none; background-color:#25D366; color:white; padding: 15px; border-radius: 5px; width: 100px; margin-bottom: 5px;">Verify now!</a>
         <br/>

            <p style="margin-top:10px">💚 Welcome to Whatsapp!</p>
            <p style="color:grey; font-size: 10px;">WhatsApp Awesome Team B </p>
            </div>
            </div>
        `;
                const transporter = nodemailer_1.default.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.AUTH_EMAIL,
                        pass: process.env.AUTH_PASS,
                    },
                });
                const mailOptions = {
                    from: '"WhatsApp-Team" <mavidmuchi@gmail.com>',
                    to: newUser.email,
                    subject: 'Thank you registering',
                    html: output, //body of the mail
                };
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err)
                        throw err;
                    console.log('Message sent: %s', info.messageId);
                });
                newUser
                    .save()
                    .then((user) => res.status(201).json({
                    message: 'User registered successfully',
                    success: true,
                    user,
                }))
                    .catch((err) => res.status(400).json({ message: 'Unable to save user' }));
            }
        })).catch((err) => res.status(400).json({ success: false, message: "Unsuccessful" }));
    }
    catch (error) {
        console.log(error);
    }
});
exports.signup = signup;
