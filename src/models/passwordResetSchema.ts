import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface passwordModel extends Document {
  user: string;
  _id: string;
}
const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1000, //check the expiry timing
  },
});
const PasswordResetToken = mongoose.model<passwordModel>(
  'PasswordResetToken',
  tokenSchema
);
export default PasswordResetToken;
