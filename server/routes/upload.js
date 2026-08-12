const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const auth = require("../middleware/auth");

// ── Storage: Cloudinary (production) or local disk (dev fallback) ──────────
let upload;

if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  // Cloudinary – images are stored permanently in the cloud
  const { storage } = require("../config/cloudinary");
  upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const ok = /jpeg|jpg|png|webp/.test(
        path.extname(file.originalname).toLowerCase()
      );
      ok ? cb(null, true) : cb(new Error("Only jpeg/jpg/png/webp allowed"));
    },
  });
} else {
  // Local disk – development only (files will be lost on Render restart)
  const uploadsDir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => cb(null, uploadsDir),
      filename: (req, file, cb) =>
        cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`),
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const ok = /jpeg|jpg|png|webp/.test(
        path.extname(file.originalname).toLowerCase()
      );
      ok ? cb(null, true) : cb(new Error("Only jpeg/jpg/png/webp allowed"));
    },
  });
}

// @route   POST /api/upload
// @access  Protected
router.post("/", auth, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  // Cloudinary puts the URL in req.file.path; local disk needs it built manually
  const url =
    req.file.path ||
    (() => {
      const protocol = req.headers["x-forwarded-proto"] || req.protocol;
      const host = req.headers["x-forwarded-host"] || req.get("host");
      return `${protocol}://${host}/uploads/${req.file.filename}`;
    })();

  res.json({ message: "Image uploaded successfully", url, filename: req.file.filename || req.file.public_id });
});

module.exports = router;
