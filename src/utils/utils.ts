import mongoose from "mongoose"



export interface IUser extends mongoose.Document {
    firstName: string,
    lastName: string,
    // DOB: Date,
    email: string,
    // phoneNumber: number,
    password: string,
}

export interface IFriends extends mongoose.Document {
    userId: any,
    friendId: any,
}

export interface login {
    email: string;
    password: string;
}
export interface sign {
    firstName: string,
    lastName: string,
    DOB: Date,
    email: string,
    phoneNo: number,
    password: string,
}