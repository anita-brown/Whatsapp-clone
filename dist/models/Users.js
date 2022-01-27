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
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: validator_1.default.isEmail,
            message: 'please enter a valid email'
        }
    },
    phoneNumber: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: true
    },
    friends: {
        type: Schema.Types.ObjectId,
        ref: "Friends",
    },
    confirmCode: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Active"],
        default: "Pending"
    }
}, { timestamps: true });
exports.UserAuth = mongoose_1.default.model('UserAuth', userAuthSchema);
