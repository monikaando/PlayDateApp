const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: "playdateapp",
  api_key: "722442328974466",
  api_secret: "X6dAU8IOZ_XSo7hunq5oRJQeIrY"
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'profile_pic', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.filename); 
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;