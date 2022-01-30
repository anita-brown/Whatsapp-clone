"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFr = exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// import bcrypt from "bcrypt";
exports.userSchema = new mongoose_1.default.Schema({
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
        select: false,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.UserFr = mongoose_1.default.model('UserFr', exports.userSchema);
exports.default = exports.UserFr;
