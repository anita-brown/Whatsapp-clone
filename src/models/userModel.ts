import mongoose, { Schema } from "mongoose"
import { IUser } from "../utils/utils";

// import bcrypt from "bcrypt";

export const userSchema: Schema<IUser> = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        // required: [true, 'A user must have a valid email'],
        lowercase: true,
        // unique: true
    },
    password: {
        type: String,
        // required: [true, 'Put in strong password'],
        select: false
    },
},
    {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
    }
);


export const UserFr = mongoose.model('UserFr', userSchema)



export default UserFr


