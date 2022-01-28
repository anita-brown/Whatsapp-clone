"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupFB = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
// import { UserAuth as UserFB } from '../models/Users';
const userModel_1 = require("../models/userModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((id, done) => {
    userModel_1.UserFr.findById(id).then((user) => {
        done(null, user);
    });
});
///
const setupFB = () => {
    passport_1.default.use(new passport_facebook_1.default.Strategy({
        clientID: process.env.CLIENT_ID_FB,
        clientSecret: process.env.CLIENT_SECRET_FB,
        callbackURL: 'http://localhost:3050/api/v1/users/facebook/redirect',
        profileFields: ['id', 'emails'],
    }, function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        // Check if user already Exist
        userModel_1.UserFr.findOne({ facebookId: profile.id })
            .then((currentUser) => {
            if (currentUser) {
                // Already have user
                // console.log(`User is, ${currentUser}`);
                return done(null, currentUser);
            }
            else {
                // Create User
                const details = {
                    fullname: profile.displayName,
                    facebookId: profile.id,
                };
                // const details = {
                //   firstName: profile.displayName,
                //   lastName: profile.displayName,
                //   email: profile._json.email,
                //   facebookId: profile.id,
                //   isVerified: true,
                //   status: 'Active',
                //   password: 'FACEBOOK',
                //   // phoneNumber: profile
                // };
                new userModel_1.UserFr(details)
                    .save()
                    .then((newUser) => {
                    // console.log(`New User Created ${newUser}`);
                    return done(null, newUser);
                })
                    .catch((err) => {
                    console.log(err);
                });
            }
        })
            .catch((err) => {
            console.log(err);
        });
    }));
};
exports.setupFB = setupFB;
exports.default = exports.setupFB;
