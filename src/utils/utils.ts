import mongoose from "mongoose"



export interface users extends mongoose.Document {
    firstName: string,
    lastName: string,
    DOB: Date,
    email: string,
    phoneNumber: number,
    password: string,
    
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
export interface reqUser extends Request {
    user?: string
}