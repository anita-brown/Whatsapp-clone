import { UserAuth as Users } from '../models/Users';
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
      async function (
        request: Request,
        accessToken: any,
        refreshToken: any,
        profile: any,
        cb: Function
      ) {
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

          const currentUser =
            (await Users.findOne({
              googleId: profile.id!,
            })) || (await Users.findOne({ email: profile._json.email! }));
          if (currentUser) {
            return cb(null, profile);
          }

          await Users.create(user);
          return cb(null, profile);
        } catch (error) {
          console.log(error);
        }
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
