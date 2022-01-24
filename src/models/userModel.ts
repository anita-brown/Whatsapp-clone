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
    // friend:
},
    {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
    }
);

// userSchema.pre("save", async function () {
//     this.password = await bcrypt.hash(this.password, 10);
// })

export const UserFr = mongoose.model('UserFr', userSchema)




// export const userFriendSchema = new mongoose.Schema({


//     friend: [{ type: Schema.Types.ObjectId, ref: 'UserFr' }],




// },
//     { timestamps: true }

// )

// userSchema.pre("save", async function () {
//     this.password = await bcrypt.hash(this.password, 10);
// })

// export const UserFriend = mongoose.model('UserFriend', userFriendSchema)


export default UserFr


