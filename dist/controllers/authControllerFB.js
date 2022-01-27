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
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.login = exports.logout = exports.protect = exports.redirect = void 0;
const redirect = (req, res, next) => {
    // Login with facebook
    res.redirect('/api/v1/users/profile');
};
exports.redirect = redirect;
const protect = (req, res, next) => {
    if (!req.user) {
        res.redirect('/api/v1/users/login');
    }
    else {
        next();
    }
};
exports.protect = protect;
const logout = (req, res, next) => {
    req.logout();
    res.redirect('/api/v1/users/login');
};
exports.logout = logout;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('User can now log in from this route');
});
exports.login = login;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user);
    res.send('You are logged in, Welcome ... ' + req.user.fullname);
});
exports.profile = profile;
