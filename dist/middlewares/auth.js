"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignUp = void 0;
const joi_1 = __importDefault(require("joi"));
//user joi validation
function validateSignUp(user) {
    const schema = joi_1.default.object({
        firstName: joi_1.default.string().min(3).max(20).required(),
        lastName: joi_1.default.string().min(3).max(20).required(),
        email: joi_1.default.string().email().max(50).required(),
        phoneNumber: joi_1.default.string().length(11).required(),
        password: joi_1.default.string().min(5).max(200).required(),
        password2: joi_1.default.ref('password'),
    });
    return schema.validate(user);
}
exports.validateSignUp = validateSignUp;
