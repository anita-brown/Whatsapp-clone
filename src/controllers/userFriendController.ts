import { Request, Response, NextFunction } from 'express';
import { Friend } from '../models/userFriendModel';
import UserFr from '../models/userModel';
import { ReqUser, CustomUserReq } from '../models/custom';

type sand = Request;

export const getAllFriends = async (
  req: CustomUserReq,
  res: Response,
  next: NextFunction
) => {
  try {
    // req.user!.id = "61e6b1b5297bef3564732c7b"
    const userLogin = '61e6b1b5297bef3564732c7b';
    console.log(userLogin);

    const friends = await Friend.find({ users: userLogin });

    return res.status(200).json({
      status: 'success',
      results: friends.length,
      data: {
        friends,
      },
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const addFriends = async (
  req: CustomUserReq,
  res: Response,
  next: NextFunction
) => {
  try {
    // req.user!.id = "61e6b1b5297bef3564732c7b"
    // const userId = req.user!.id
    const userId = '61e6b1b5297bef3564732c7b';
    let friendId = '';

    const { email } = req.body;
    console.log(req.body);

    const newFriend = await UserFr.find({ email });
    friendId = newFriend[0]._id;
    if (friendId == userId) {
      return res.status(400).json({
        message: 'user already exist',
      });
    }
    console.log(newFriend);

    const userFriend = await Friend.find({ userId, friendId });
    console.log(userFriend);
    if (userFriend.length <= 0) {
      const friend = await Friend.create({ userId, friendId });

      res.status(201).json({
        status: 'success',
        data: {
          friend,
        },
      });
    } else {
      res.status(400).json({
        message: 'friend already exist',
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
