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
exports.setupGoogle = void 0;
const Users_1 = require("../models/Users");
const passport_1 = __importDefault(require("passport"));
const setupGoogle = () => {
    const GoogleStrategy = require('passport-google-oauth20').Strategy;
    passport_1.default.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        passReqToCallback: true,
    }, function (request, accessToken, refreshToken, profile, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = {
                    firstName: profile._json.given_name,
                    lastName: profile._json.family_name,
                    email: profile._json.email,
                    googleId: profile.id,
                    isVerified: profile._json.email_verified,
                    status: 'Active',
                    password: 'GOOGLE',
                    // phoneNumber: profile
                };
                const currentUser = (yield Users_1.UserAuth.findOne({
                    googleId: profile.id,
                })) || (yield Users_1.UserAuth.findOne({ email: profile._json.email }));
                if (currentUser) {
                    return cb(null, profile);
                }
                yield Users_1.UserAuth.create(user);
                return cb(null, profile);
            }
            catch (error) {
                console.log(error);
            }
        });
    }));
};
exports.setupGoogle = setupGoogle;
passport_1.default.serializeUser(function (user, done) {
    return done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    return done(null, user);
});
