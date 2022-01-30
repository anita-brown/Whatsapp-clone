import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IGroup extends mongoose.Document {
  createdBy:string;
  members:string[];
  groupName:string;
  groupDescription:string;
  groupImage:string;
  groupImageId:string;
  groupAdmin:string;
  slug:string;
  createdAt: Date;
}

const GroupSchema = new Schema({
  createdBy: {
    type: String,
    required: [true, 'createdBy is required'],
  },
  members: {
    type: [String],
    required: [true, 'members is required'],
  },
  groupName: {
    type: String,
    required: [true, 'groupName is required'],
  },
  groupDescription: {
    type: String,
  },
  groupImage: {
    type: String,
  },
  groupImageId: {
    type: String,
  },
  groupAdmin: {
    type: String,
    required: [true, 'groupAdmin is required'],
  },
  slug: {
    type: String,
    required: [true, 'slug is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

export const Group = mongoose.model<IGroup>('Group', GroupSchema);
