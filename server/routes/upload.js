const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");

const BASE_URL = process.env.BASE_URL || "http://localhost:5001";

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`);
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|webp/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Only images (jpeg, jpg, png, webp) are allowed!");
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB Limit
  fileFilter,
});

// @route   POST /api/upload
// @desc    Upload an image
// @access  Protected
router.post("/", auth, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Construct the URL (adjust based on your server setup)
  // Here we use relative path from the server root
  const imageUrl = `${BASE_URL}/uploads/${req.file.filename}`;

  res.json({
    message: "Image uploaded successfully",
    url: imageUrl,
    filename: req.file.filename,
  });
});

module.exports = router;
