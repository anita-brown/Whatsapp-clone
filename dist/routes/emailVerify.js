"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyEmail_1 = require("../controller/verifyEmail");
const router = express_1.default.Router();
router.get('/user/:confirmationCode', verifyEmail_1.verifyEmail);
router.post('/login', verifyEmail_1.loginUser);
exports.default = router;
