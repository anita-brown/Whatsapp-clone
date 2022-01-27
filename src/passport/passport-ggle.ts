import passport from 'passport';

export const setupGoogle = () => {
  const GoogleStrategy = require('passport-google-oauth20').Strategy;
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
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
};

passport.serializeUser(function (user, done) {
  return done(null, user);
});

passport.deserializeUser(function (user: Express.User, done) {
  return done(null, user);
});
