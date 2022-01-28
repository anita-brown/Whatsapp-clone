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
const express_1 = require("express");
const router = (0, express_1.Router)();
const User = require('../models/userSchema');
const upload = require('../multer');
const cloudinary = require('../cloudinary');
router
    .route('/')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        res.status(200).json({
            message: 'Success',
            dataLength: users.length,
            data: users,
        });
    }
    catch (error) {
        console.log(error);
    }
}))
    .post(upload.single('avatar'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary.uploader.upload(req.file.path);
        res.json(result);
    }
    catch (err) {
        console.log(err);
    }
}));
router
    .route('/:id')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.params.id);
        res.status(200).json({
            message: 'success',
            data: user,
        });
    }
    catch (error) {
        console.log(error);
    }
}))
    .patch(upload.single('avatar'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        // res.send('heelo');
        const result = yield cloudinary.uploader.upload(req.file.path);
        // replace the old image with the new one and add it to the request body
        req.body.avatar = result.url;
        req.body.avatarId = result.public_id;
        const updatedUser = yield User.findOneAndUpdate(req.params.id, req.body, {
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
    }
}));
module.exports = router;
