"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userAuthController_1 = require("../controller/userAuthController");
const userFriendController_1 = require("../controllers/userFriendController");
const router = express_1.default.Router();
//reset
router.post('/signup', userAuthController_1.signup);
router.post('/forgotPassword', userController_1.forgotPassword);
router.post('/resetPassword/:hashedToken', userController_1.resetPassword);
router.patch('/changePassword/:userId', userController_1.changePassword);
router.get('/friends', userFriendController_1.getAllFriends);
router.post('/friends', userFriendController_1.addFriends);
exports.default = router;
