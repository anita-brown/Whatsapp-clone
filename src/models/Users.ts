import mongoose from 'mongoose';
import validator from 'validator';

const Schema = mongoose.Schema;

export interface userAuth extends mongoose.Document {
  user: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  isVerified: Boolean;
  status: string;
  confirmCode: string;
  avatar: string;
  avatarId: string;
}

const userAuthSchema = new Schema(
  {
    username: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    avatarId: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: validator.isEmail,
        message: 'please enter a valid email',
      },
    },
    phoneNumber: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    facebookId: {
      type: String,
    },
    googleId: {
      type: String,
    },
    confirmCode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Active'],
      default: 'Pending',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const UserAuth = mongoose.model<userAuth>('UserAuth', userAuthSchema);
