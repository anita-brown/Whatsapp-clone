import { UserAuth } from '../models/Users';
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();
const User = require('../models/userSchema');
const upload = require('../multer');
const cloudinary = require('../cloudinary');

interface MulterFile {
  key: string; // Available using `S3`.
  path: string; // Available using `DiskStorage`.
  mimetype: string;
  originalname: string;
  size: number;
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    // res.send('heelo');
    const result = await cloudinary.uploader.upload(req.file!.path);
    // replace the old image with the new one and add it to the request body
    req.body.avatar = result.url;
    req.body.avatarId = result.public_id;
    const updatedUser = await User.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      message: 'success',
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
  }
};
