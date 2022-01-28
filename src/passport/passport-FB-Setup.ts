import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
// import { UserAuth as UserFB } from '../models/Users';
import { UserFr as UserFB } from '../models/userModel';
import dotenv from 'dotenv';
dotenv.config();
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((id, done) => {
  UserFB.findById(id).then((user) => {
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
      function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        // Check if user already Exist
        UserFB.findOne({ facebookId: profile.id })
          .then((currentUser) => {
            if (currentUser) {
              // Already have user
              // console.log(`User is, ${currentUser}`);
              return done(null, currentUser);
            } else {
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
              new UserFB(details)
                .save()
                .then((newUser: any) => {
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
      }
    )
  );
};
export default setupFB;
