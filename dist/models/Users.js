"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuth = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const Schema = mongoose_1.default.Schema;
const userAuthSchema = new Schema({
    username: {
        type: String,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    avatarId: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: validator_1.default.isEmail,
            message: 'please enter a valid email',
        },
    },
    phoneNumber: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: true,
    },
    password: {
        type: String,
        required: true,
    },
    facebookId: {
        type: String,
    },
    googleId: {
        type: String,
    },
    confirmCode: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending',
    },
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
exports.UserAuth = mongoose_1.default.model('UserAuth', userAuthSchema);
