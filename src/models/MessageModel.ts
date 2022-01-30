import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IMessage extends mongoose.Document {
  senderId: string;
  chatId: string;
  chatType: string;
  text: string;
  mediaType: string;
  media: {
    type: string;
    url: string;
  };
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema({
  senderId: {
    type: String,
    required: [true, 'senderId is required'],
  },
  chatId: {
    type: String,
    refPath: 'chatType',
    required: [true, 'chatId is required'],
  },
  chatType: {
    type: String,
    enum: {
      values: ['Group', 'PrivateChat'],
      message: 'chatType must be either group or private',
    },
    required: [true, 'chatType is required'],
  },
  text: {
    type: String,
    required: [true, 'text is required'],
  },
  mediaType: {
    type: String,
    required: [true, 'mediaType is required'],
    enum: {
      values: ['image', 'video', 'audio', 'document'],
      message: 'mediaType must be either image, video,document or audio',
    },
  },
  media: {
    type: {
      type: String,
      url: String,
    },
  },
  deletedAt: {
    type: Date,
  },
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

export const Message = mongoose.model<IMessage>('Message', MessageSchema);
