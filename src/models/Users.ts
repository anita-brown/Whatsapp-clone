import mongoose from 'mongoose';
import validator from 'validator';

const Schema = mongoose.Schema;

interface userAuthModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  isVerified: Boolean;
  status: string;
  confirmCode: string;
}

const userAuthSchema = new Schema({
  firstName: {
    type: String,
    required : true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: 'please enter a valid email'
    }
  },

  phoneNumber: {
    type: String,
    required: true
  },

  isVerified: {
    type: Boolean,
    default: true
  },

  password: {
    type: String,
    required: true
  },


  friends: {
    type: Schema.Types.ObjectId,
    ref: "Friends",
  },

  confirmCode: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending"
  }
}, { timestamps: true});

export const UserAuth = mongoose.model<userAuthModel>(
  'UserAuth',
  userAuthSchema
);
