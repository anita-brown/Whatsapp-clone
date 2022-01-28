"use strict";
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
        Users_1.UserAuth.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                return cb(null, profile);
            }
            else {
                new Users_1.UserAuth(user)
                    .save()
                    .then((newUser) => {
                    return cb(null, profile);
                })
                    .catch((err) => {
                    console.log(err);
                });
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
