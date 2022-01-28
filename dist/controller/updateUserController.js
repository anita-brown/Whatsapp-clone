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
exports.getUser = exports.updateUser = void 0;
const Users_1 = require("../models/Users");
const express_1 = require("express");
const router = (0, express_1.Router)();
const upload = require('../multer');
const cloudinary = require('../cloudinary');
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        // res.send('heelo');
        const result = yield cloudinary.uploader.upload(req.file.path);
        // replace the old image with the new one and add it to the request body
        req.body.avatar = result.url;
        req.body.avatarId = result.public_id;
        const updatedUser = yield Users_1.UserAuth.findOneAndUpdate({ _id: req.params.id }, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            message: 'success',
            data: updatedUser,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal Server Error unable to update user',
        });
    }
});
exports.updateUser = updateUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Users_1.UserAuth.findById(req.params.id);
        res.status(200).json({
            message: 'success',
            data: user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal Server Error unable to get user',
        });
    }
});
exports.getUser = getUser;
