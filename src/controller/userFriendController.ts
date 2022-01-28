import { Request, Response, NextFunction } from 'express';
import { Friend } from '../models/userFriendModel';
import { UserAuth } from '../models/Users';
import { CustomRequest } from '../utils/custom';
import { ReqUser } from '../utils/customReq';

type sand = Request;

export const getAllFriends = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // req.user!.id = "61e6b1b5297bef3564732c7b"
    const userLogin = req.user!.id;
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
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // const userId = '61f41308c8b7de8620126a76';
    const userId = req.user!.id;
    let friendId = '';

    const { email } = req.body;

    const newFriend = await UserAuth.find({ email });
    friendId = newFriend[0]._id;
    if (friendId == userId) {
      return res.status(400).json({
        message: 'user already exist',
      });
    }

    const userFriend = await Friend.find({ userId, friendId });

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
