const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const uploadImage = (req, res, next) => {
  console.log("success");
  
  upload.single("blog_image")(req, res, async (err) => {
    console.log(req.file,'fjdj')
    if (err) {
      return res.status(400).json({ message: err.message });
    } 
    
    // Check if req.file exists
    if (!req.file) { 
      console.log("No file uploaded");
      return next(); // Pass control to the next middleware or route handler
    }

    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Product-IMG",
      });
      req.body.blog_image = result.secure_url;
      fs.unlink(req.file.path, (unlink) => {
        if (unlink) {
          console.log("Error deleting local file", unlink);
        }
      });
      next();
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: "Error uploading file to Cloudinary",
      });
    }
  });  
};

module.exports = uploadImage; 