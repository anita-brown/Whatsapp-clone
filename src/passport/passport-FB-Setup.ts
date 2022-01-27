import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import UserFB from '../models/userModel';
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
      },
      function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        // Check if user already Exist
        UserFB.findOne({ facebookId: profile.id }).then((currentUser) => {
          if (currentUser) {
            // Already have user
            console.log(`User is, ${currentUser}`);
            done(null, currentUser);
          } else {
            // Create User
            const details = {
              fullname: profile.displayName,
              facebookId: profile.id,
            };
            new UserFB(details).save().then((newUser: any) => {
              console.log(`New User Created ${newUser}`);
              done(null, newUser);
            });
          }
        });
      }
    )
  );
};

export default setupFB;
