import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
// import { UserAuth as UserFB } from '../models/Users';
import { UserAuth as Users } from '../models/Users';
import dotenv from 'dotenv';
dotenv.config();
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((id, done) => {
  Users.findById(id).then((user) => {
    done(null, user);
  });
});
///
export const setupFB = () => {
  passport.use(
    new FacebookStrategy.Strategy(
      {
        clientID: process.env.CLIENT_ID_FB!,
        clientSecret: process.env.CLIENT_SECRET_FB!,
        callbackURL: 'http://localhost:3050/api/v1/users/facebook/redirect',
        profileFields: ['id', 'emails'],
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const user = {
            fullname: profile.displayName,
            facebookId: profile.id,
          };
          // const user = {
          //   firstName: profile.displayName,
          //   lastName: profile.displayName,
          //   email: profile._json.email,
          //   facebookId: profile.id,
          //   isVerified: true,
          //   status: 'Active',
          //   password: 'FACEBOOK',
          //   // phoneNumber: profile
          // };

          const currentUser =
            (await Users.findOne({
              facebookId: profile.id!,
            })) || (await Users.findOne({ email: profile._json.email! }));
          if (currentUser) {
            return done(null, currentUser);
          }
          const newUser = await Users.create(user);
          return done(null, newUser);
        } catch (error) {
          console.log(error);
        }
      }
    )
  );
};

export default setupFB;
