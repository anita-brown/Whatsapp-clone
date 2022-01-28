"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegisterInput = void 0;
const validator_1 = __importDefault(require("validator"));
const is_empty_1 = require("./is-empty");
const userRegisterInput = (data) => {
    let errors = {};
    data.firstName = !(0, is_empty_1.isEmpty)(data.firstName) ? data.firstName : '';
    data.email = !(0, is_empty_1.isEmpty)(data.email) ? data.email : '';
    data.lastName = !(0, is_empty_1.isEmpty)(data.lastName) ? data.lastName : '';
    data.password = !(0, is_empty_1.isEmpty)(data.password) ? data.password : '';
    data.password2 = !(0, is_empty_1.isEmpty)(data.password2) ? data.password2 : '';
    data.phoneNumber = !(0, is_empty_1.isEmpty)(data.phoneNumber) ? data.phoneNumber : '';
    data.avatar = !(0, is_empty_1.isEmpty)(data.avatar)
        ? data.avatar
        : '';
    if (!validator_1.default.isLength(data.password, { min: 6 })) {
        errors.password = 'Password should be more than 6 characters';
    }
    if (validator_1.default.isEmpty(data.firstName)) {
        errors.firstName = 'First Name is required';
    }
    if (validator_1.default.isEmpty(data.lastName)) {
        errors.lastName = 'Last Name is required';
    }
    if (!validator_1.default.isEmail(data.email)) {
        errors.email = 'The email provided is invalid';
    }
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    if (!validator_1.default.equals(data.password, data.password2)) {
        errors.password = 'Password provided does not match';
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    if (validator_1.default.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required';
    }
    return {
        errors,
        isValid: (0, is_empty_1.isEmpty)(errors),
    };
};
exports.userRegisterInput = userRegisterInput;
