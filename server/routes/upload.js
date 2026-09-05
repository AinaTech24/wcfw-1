const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");
const Image = require("../models/pg/Image");

// Store file in memory → persist to PostgreSQL (BYTEA)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const ok = /jpeg|jpg|png|webp/.test(path.extname(file.originalname).toLowerCase());
    ok ? cb(null, true) : cb(new Error("Only jpeg/jpg/png/webp allowed"));
  },
});

// POST /api/upload — protected
router.post("/", auth, upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  try {
    const image = await Image.create({
      data: req.file.buffer,
      contentType: req.file.mimetype,
      filename: req.file.originalname,
      size: req.file.size,
    });
    const protocol = req.headers["x-forwarded-proto"] || req.protocol;
    const host = req.headers["x-forwarded-host"] || req.get("host");
    const url = `${protocol}://${host}/api/images/${image.id}`;
    res.json({ message: "Image uploaded successfully", url });
  } catch (err) {
    res.status(500).json({ message: "Failed to save image", error: err.message });
  }
});

module.exports = router;
