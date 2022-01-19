"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.GOOGLE_CLIENT_SECRET, '*****');
console.log(process.env.GOOGLE_CLIENT_ID, '*****');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport_1.default.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    passReqToCallback: true,
}, function (request, accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
}));
passport_1.default.serializeUser(function (user, done) {
    return done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    return done(null, user);
});
