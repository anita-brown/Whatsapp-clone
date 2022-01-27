"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const authController_1 = require("../controllers/authController");
const authController_2 = require("../controllers/authController");
const router = express_1.default.Router();
router.get('/signup', authController_2.signupGoogle);
router.get('/auth/google', passport_1.default.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/auth/failure', authController_2.failedGoogleSignup);
router.get('/auth/protected', authController_1.isLoggedIn, authController_2.protectedPage);
router.get('/logout', authController_2.logout);
router.get('/google/callback2', passport_1.default.authenticate('google', {
    successRedirect: '/auth/protected',
    failureRedirect: '/auth/failure',
}));
exports.default = router;
