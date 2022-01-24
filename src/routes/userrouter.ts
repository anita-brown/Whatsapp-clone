import { Router, Request, Response, NextFunction } from 'express';

const router = Router();
const User = require('../models/userSchema');

router.route('/').get(async (req: Request, res: Response) => {
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
  .patch(async (req: Request, res: Response) => {
    try {
      const updatedUser = User.findAndUpdate(req.params.id, req.body, {
        new: true,
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
