import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullname: String,
  facebookId: String,
});

const UserFB = mongoose.model('UserFB', userSchema);

export default UserFB;
