"use strict";
// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// // define the storage for the images
// const storage = multer.diskStorage({
//   // destination for the files
//   destination: function (
//     req: Request,
//     file: any,
//     cb: (error: Error | null, destination: string) => void
//   ) {
//     cb(null, './public/uploads/images');
//   },
//   // filename for the files
//   filename: function (
//     req: Request,
//     file: any,
//     cb: (error: Error | null, fileName: string) => void
//   ) {
//     cb(null, Date.now() + file.originalname);
//   },
// });
// // upload parameters for multer
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
// });
const multer = require("multer");
const path = require("path");
// multer config
module.exports = multer({
    storage: multer.diskStorage({}),
    // filter file just incase users try to upload other files
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
            return cb(new Error("Only images are allowed"), false);
        }
        cb(null, true);
    }
});
