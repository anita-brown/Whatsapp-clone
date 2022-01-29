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
const cloudinary = require('../cloudinary');
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary.uploader.upload(req.file.path);
        // replace the old image with the new one and add it to the request body
        req.body.avatar = result.url;
        req.body.avatarId = result.public_id;
        let updateData = {
            firstName: req.body.firstName ? req.body.firstName : req.user.firstName,
            lastName: req.body.lastName ? req.body.lastName : req.user.lastName,
            avatar: req.body.avatar ? req.body.avatar : req.user.avatar,
            avatarId: req.body.avatarId ? req.body.avatarId : req.user.avatarId,
            email: req.body.email ? req.body.email : req.user.email,
            phoneNumber: req.body.phoneNumber
                ? req.body.phoneNumber
                : req.user.phoneNumber,
        };
        const updatedUser = yield Users_1.UserAuth.findByIdAndUpdate(req.user.id, updateData, {
            new: true,
            // runValidators: true,
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
        const user = yield Users_1.UserAuth.findById(req.user.id);
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
