"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// validate user details for updatedUser
const validateUserUpdate = (user) => {
    const schema = {
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        phoneNumber: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
        image: joi_1.default.string().required(),
    };
    // return joi.validate(user, schema);
};
