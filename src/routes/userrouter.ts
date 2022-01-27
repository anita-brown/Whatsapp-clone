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
// extend the interface to include the new fields
// interface Request extends MulterFile {
//   userId: string
// }

router
  .route('/')
  .get(async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.status(200).json({
        message: 'Success',
        dataLength: users.length,
        data: users,
      });
    } catch (error) {
      console.log(error);
    }
  })
  .post(upload.single('avatar'), async (req: Request, res: Response) => {
    try {
      const result = await cloudinary.uploader.upload(req.file!.path);
      res.json(result);
    } catch (err) {
      console.log(err);
    }
  });

router
  .route('/:id')
  .get(async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json({
        message: 'success',
        data: user,
      });
    } catch (error) {
      console.log(error);
    }
  })
  .patch(upload.single('avatar'), async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      // res.send('heelo');
      const result = await cloudinary.uploader.upload(req.file!.path);
      // replace the old image with the new one and add it to the request body
      req.body.avatar = result.url;
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
  });
module.exports = router;
