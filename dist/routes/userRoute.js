"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const userAuthController_1 = require("../controller/userAuthController");
const userFriendController_1 = require("../controller/userFriendController");
const updateUserController_1 = require("../controller/updateUserController");
const upload = require('../multer');
const router = express_1.default.Router();
//reset
router.get('/friends', userFriendController_1.getAllFriends);
router.post('/signup', userAuthController_1.signup);
router.post('/friends', userFriendController_1.addFriends);
router.post('/forgotPassword', userController_1.forgotPassword);
router.post('/resetPassword/:hashedToken', userController_1.resetPassword);
router.patch('/changePassword/:userId', userController_1.changePassword);
router.patch('/updateUser', upload.single('avatar'), updateUserController_1.updateUser);
exports.default = router;
