import mongoose from 'mongoose';
import validator from 'validator';
import crypto from 'crypto';
import { any, number, string } from 'joi';

export interface IUser extends Document {
  name: string;
  email: string;
  photo: string;
  password: string;
  // passwordConfirm: string;
  passwordChangedAt: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  active: boolean;
  createPasswordResetToken: () => string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  // passwordConfirm: {
  //   type: String,
  //   required: [true, 'Please confirm your password'],
  //   validate: {
  //     // This only works on CREATE and SAVE!!!
  //     validator: function (el: string): boolean {
  //       return el === this.password;
  //     },
  //     message: 'Passwords are not the same!',
  //   },
  // },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.method('createPasswordResetToken', function (): string {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha356')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
});

export default mongoose.model<IUser>('User', userSchema);
