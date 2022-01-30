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
exports.protect = exports.loginUser = exports.verifyEmail = void 0;
const Users_1 = require("../models/Users");
const validatorUtils_1 = require("../utils/validatorUtils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//This function handles verification of email, a route with confirmation code is sent to user email on signup
const verifyEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Users_1.UserAuth.findOne({
            confirmationCode: req.params.confirmationCode,
        });
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        user.status = 'Active';
        yield user.save((err) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        });
        res.redirect('/login');
    }
    catch (err) {
        console.log('error', err);
    }
});
exports.verifyEmail = verifyEmail;
//This function handles login, after emails are verified users are redirected to login
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, validatorUtils_1.validateLogin)(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    else {
        try {
            const findUser = yield Users_1.UserAuth.findOne({ email: req.body.email }).select('+password');
            if (!findUser)
                return res
                    .status(400)
                    .json({ message: 'user does not exist, kindly signup' });
            const match = yield bcryptjs_1.default.compare(req.body.password, findUser.password);
            if (!match)
                return res.status(400).json({ message: 'invalid password' });
            if (findUser.status === 'Pending')
                return res.status(403).json({
                    message: `kindly verify your account via the email sent to you`,
                });
            const user = { email: req.params.email };
            const accessToken = jsonwebtoken_1.default.sign({ id: findUser.id }, process.env.ACCESS_TOKEN_SECRET);
            req.user = findUser;
            return res.status(201).json({ message: 'login successful', accessToken });
        }
        catch (error) {
            console.log(error);
            res.status(403).json({ error });
        }
    }
});
exports.loginUser = loginUser;
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    // 1) Getting token and check if its there
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'You are not logged in!, Please log in to get access.',
        });
    }
    // validate token
    const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // check if user still exists
    const freshUser = yield Users_1.UserAuth.findById(decoded.id);
    if (!freshUser) {
        return res.status(401).json({
            status: 'fail',
            message: 'The user belonging to this token no longer exist.',
        });
    }
    // check if user changed password after token was issued
    req.user = freshUser;
    next();
});
exports.protect = protect;
