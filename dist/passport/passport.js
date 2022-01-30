"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGoogle = void 0;
const passport_1 = __importDefault(require("passport"));
const setupGoogle = () => {
    const GoogleStrategy = require('passport-google-oauth20').Strategy;
    passport_1.default.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        passReqToCallback: true,
    }, function (request, accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }));
};
exports.setupGoogle = setupGoogle;
passport_1.default.serializeUser(function (user, done) {
    return done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    return done(null, user);
});
