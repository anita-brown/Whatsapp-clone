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
exports.addFriends = exports.getAllFriends = void 0;
const userFriendModel_1 = require("../models/userFriendModel");
const Users_1 = require("../models/Users");
const getAllFriends = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userLogin = req.user.id;
        const friends = yield userFriendModel_1.Friend.find({ users: userLogin });
        return res.status(200).json({
            status: 'success',
            results: friends.length,
            data: {
                friends,
            },
        });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.getAllFriends = getAllFriends;
const addFriends = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        let friendId = '';
        const { email } = req.body;
        const newFriend = yield Users_1.UserAuth.find({ email });
        friendId = newFriend[0]._id;
        if (friendId == userId) {
            return res.status(400).json({
                message: 'user already exist',
            });
        }
        const userFriend = yield userFriendModel_1.Friend.find({ userId, friendId });
        if (userFriend.length <= 0) {
            const friend = yield userFriendModel_1.Friend.create({ userId, friendId });
            res.status(201).json({
                status: 'success',
                data: {
                    friend,
                },
            });
        }
        else {
            res.status(400).json({
                message: 'friend already exist',
            });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.addFriends = addFriends;
