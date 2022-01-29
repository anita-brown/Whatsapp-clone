"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passwordController_1 = require("../controller/passwordController");
const userAuthController_1 = require("../controller/userAuthController");
const userFriendController_1 = require("../controller/userFriendController");
const updateUserController_1 = require("../controller/updateUserController");
const verifyEmail_1 = require("../controller/verifyEmail");
const upload = require('../multer');
const router = express_1.default.Router();
//reset
router.get('/friends', verifyEmail_1.protect, userFriendController_1.getAllFriends);
router.post('/signup', userAuthController_1.signup);
router.post('/friends', verifyEmail_1.protect, userFriendController_1.addFriends);
router.post('/forgotPassword', passwordController_1.forgotPassword);
router.post('/resetPassword/:hashedToken', passwordController_1.resetPassword);
router.patch('/changePassword', verifyEmail_1.protect, passwordController_1.changePassword);
router.get('/:id', updateUserController_1.getUser);
router.patch('/updateUser', verifyEmail_1.protect, upload.single('avatar'), updateUserController_1.updateUser);
exports.default = router;
