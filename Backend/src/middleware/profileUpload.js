const fs = require("fs");
const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const env=require('dotenv');
env.config({path:'./.env'})

const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
console.log(process.env.cloud_name,"reqq")
cloudinary.config({
  cloud_name: process.env.cloud_name,
  
  
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const profileUpload = (req, res, next) => {
  console.log("Starting image upload process...");
  
  upload.single("profilePic")(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err.message);
      return res.status(400).json({ message: err.message });
    }

    console.log("File uploaded:", req.file);
    if (!req.file) {
      console.log("No file uploaded.");
      return next(); 
    }

    try {
     
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Product-IMG",
      });

      console.log("Cloudinary upload result:", result);

     
      req.body.profilePic = result.secure_url;

      
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting local file:", unlinkErr);
        } else {
          console.log("Local file deleted successfully.");
        }
      });

      next(); 
    } catch (uploadErr) {
      console.error("Cloudinary upload error:", uploadErr);
      res.status(500).json({
        status: "fail",
        message: "Error uploading file to Cloudinary",
      });
    }
  });
};

module.exports = profileUpload ;
