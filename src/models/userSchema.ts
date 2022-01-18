import mongoose, { Schema, model, Document, Types } from 'mongoose';
import jwt from 'jsonwebtoken';
require('dotenv').config();

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}
//Build a User Schema
const UserSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'Please enter you firstname'],
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Please enter you firstname'],
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      max: 50,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
      unique: true,
    },
    phoneNumber: {
      type: String,
      match: [
        /((^090)([23589]))|((^070)([1-9]))|((^080)([2-9]))|((^081)([0-9]))(\d{7})/,
        'Please enter 11 digit Nigerian mobile number',
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      min: 5,
      max: 200,
    },
  },
  {
    timestamps: true,
  }
);

// UserSchema.pre('save', function (next) {
//   if (this.password) {
//     this.password = hashPassword(this.password);
//   }
//   next();
// });

//Build a User Model
let UserTesting = mongoose.model<IUser>('UserTesting', UserSchema);
//User is used to start testing
export default UserTesting;
