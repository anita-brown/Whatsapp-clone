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
module.exports = router;
