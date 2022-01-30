import { UserAuth } from '../models/Users';
import { Router, Request, Response, NextFunction } from 'express';


const cloudinary = require('../cloudinary');
import { CustomRequest } from '../utils/custom';
interface MulterFile {
  key: string; // Available using `S3`.
  path: string; // Available using `DiskStorage`.
  mimetype: string;
  originalname: string;
  size: number;
}

export const updateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await cloudinary.uploader.upload(req.file!.path);

    // replace the old image with the new one and add it to the request body
    req.body.avatar = result.url;
    req.body.avatarId = result.public_id;
    let updateData = {
      firstName: req.body.firstName ? req.body.firstName : req.user!.firstName,
      lastName: req.body.lastName ? req.body.lastName : req.user!.lastName,
      avatar: req.body.avatar ? req.body.avatar : req.user!.avatar,
      avatarId: req.body.avatarId ? req.body.avatarId : req.user!.avatarId,
      email: req.body.email ? req.body.email : req.user!.email,
      phoneNumber: req.body.phoneNumber
        ? req.body.phoneNumber
        : req.user!.phoneNumber,
    };
    const updatedUser = await UserAuth.findByIdAndUpdate(
      req.user!.id,
      updateData,
      {
        new: true,
        // runValidators: true,
      }
    );
    res.status(200).json({
      message: 'success',
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error unable to update user',
    });
  }
};

export const getUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserAuth.findById(req.user!.id);
    res.status(200).json({
      message: 'success',
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error unable to get user',
    });
  }
};
