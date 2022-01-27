"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
//Build a User Schema
const UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'Please enter you firstname'],
        min: 3,
        max: 20,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Please enter you firstname'],
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        max: 50,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
        unique: true,
    },
    phoneNumber: {
        type: String,
        match: [
            /((^090)([23589]))|((^070)([1-9]))|((^080)([2-9]))|((^081)([0-9]))(\d{7})/,
            'Please enter 11 digit Nigerian mobile number',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        min: 5,
        max: 200,
    },
    // isVerified: { type: Boolean, default: false },
}, {
    timestamps: true,
});
//Build a User Model
let UserTesting = mongoose_1.default.model('UserTesting', UserSchema);
//User is used to start testing
exports.default = UserTesting;
