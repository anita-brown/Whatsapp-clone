import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName:{
    type:String,
    require:true
  },
  lastName:{
    type:String,
    require:true
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
