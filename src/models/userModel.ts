import mongoose from 'mongoose';
import passport from 'passport';

const userSchema = new mongoose.Schema({
  fullname: String,
  facebookId: String,
});

// userSchema.plugin(passportLobalMongoose);
// userSchema.plugin(findOrCreate);

const UserFB = mongoose.model('UserFB', userSchema);

export default UserFB;
