"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupFB = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
// import { UserAuth as UserFB } from '../models/Users';
const Users_1 = require("../models/Users");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((id, done) => {
    Users_1.UserAuth.findById(id).then((user) => {
        done(null, user);
    });
});
///
const setupFB = () => {
    passport_1.default.use(new passport_facebook_1.default.Strategy({
        clientID: process.env.CLIENT_ID_FB,
        clientSecret: process.env.CLIENT_SECRET_FB,
        callbackURL: 'http://localhost:3050/api/v1/users/facebook/redirect',
        profileFields: ['id', 'emails'],
    }, function (accessToken, refreshToken, profile, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = {
                    fullname: profile.displayName,
                    facebookId: profile.id,
                };
                // const user = {
                //   firstName: profile.displayName,
                //   lastName: profile.displayName,
                //   email: profile._json.email,
                //   facebookId: profile.id,
                //   isVerified: true,
                //   status: 'Active',
                //   password: 'FACEBOOK',
                //   // phoneNumber: profile
                // };
                const currentUser = (yield Users_1.UserAuth.findOne({
                    facebookId: profile.id,
                })) || (yield Users_1.UserAuth.findOne({ email: profile._json.email }));
                if (currentUser) {
                    return done(null, currentUser);
                }
                const newUser = yield Users_1.UserAuth.create(user);
                return done(null, newUser);
            }
            catch (error) {
                console.log(error);
            }
        });
    }));
};
exports.setupFB = setupFB;
exports.default = exports.setupFB;
