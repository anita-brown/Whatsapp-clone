"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const authControllerFB_1 = require("../controllers/authControllerFB");
const passport_FB_Setup_1 = __importDefault(require("../passport/passport-FB-Setup"));
const router = express_1.default.Router();
(0, passport_FB_Setup_1.default)();
router.get('/login', authControllerFB_1.login);
router.get('/facebook', passport_1.default.authenticate('facebook'));
// callback route to redirect
router.get('/facebook/redirect', passport_1.default.authenticate('facebook', { failureRedirect: '/api/v1/users/login' }), authControllerFB_1.redirect);
router.get('/logout', authControllerFB_1.logout);
router.get('/profile', authControllerFB_1.protect, authControllerFB_1.profile);
exports.default = router;
