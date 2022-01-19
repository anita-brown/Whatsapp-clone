import passport from "passport";
import express,{Request, Response, NextFunction  } from "express";


const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: '688307161293-313f5u95phglnbfvr0gt5sitdlc0qsau.apps.googleusercontent.com',
      // clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.CALLBACK_URL as string,
      passReqToCallback: true,
    },
    function (
      request: Request,
      accessToken: any,
      refreshToken: any,
      profile: any,
      cb: Function
    ) {
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  return done(null, user);
});

passport.deserializeUser(function (user: Express.User, done) {
  return done(null, user);
});
