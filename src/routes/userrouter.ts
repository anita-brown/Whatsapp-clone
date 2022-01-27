import { Router, Request, Response, NextFunction } from 'express';
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const router = Router();
const User = require('../models/userSchema');

// define the storage for the images
const storage = multer.diskStorage({
  // destination for the files
  destination:function(req:Request,file:any,cb:(error:Error|null,destination:string)=>void){
    cb(null,'./public/uploads/images');
  },
  // filename for the files
  filename:function(req:Request,file:any,cb:(error:Error|null,fileName:string)=>void){
    cb(null,Date.now() + file.originalname);
  },

})
// upload parameters for multer
const upload = multer({
  storage:storage,
  limits:{
    fileSize:1024 * 1024 * 5
  }
})
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
      console.log(req.body)
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
