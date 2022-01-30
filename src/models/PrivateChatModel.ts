import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IChat extends mongoose.Document {
  members: string[];
  firstMesssageAt: Date;
  lastMessageAt: Date;
}

const PrivateChatSchema = new Schema({
  members: {
    type: [String],
    required: [true, 'members is required'],
  },
  firstMesssageAt: {
    type: Date,
  },
  lastMessageAt: {
    type: Date,
  },
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

export const PrivateChat = mongoose.model<IChat>(
  'PrivateChat',
  PrivateChatSchema
);
