import mongoose, { Document } from "mongoose";
import bcrypt from 'bcryptjs'
import validator from 'validator'

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    DOB: string;
    email: string;
    phoneNumber: string;
    password: string;


}

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: 'please enter a valid email',
        },
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    confirmationCode: {
        type: String,
        unique: true
    }
},
    { timestamps: true }
)

UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
});

UserSchema.methods.comparePassword = async function (canditatePassword: string) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
};





export default mongoose.model('Users', UserSchema)