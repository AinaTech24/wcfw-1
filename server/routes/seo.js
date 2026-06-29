const express = require("express");
const router = express.Router();
const seoController = require("../controllers/seoController");
const auth = require("../middleware/auth");

// Admin: read current SEO settings (used to populate the editor).
router.get("/", auth, seoController.getSeo);

// Admin: save SEO settings (robots.txt body, sitemap options, custom URLs).
router.put("/", auth, seoController.updateSeo);

// Admin: recommended starter content for the "reset" buttons.
router.get("/default-robots", auth, seoController.defaultRobots);
router.get("/default-sitemap", auth, seoController.defaultSitemap);

// Admin: published blog URLs for the "Insert all current blog URLs" button.
router.get("/blog-urls", auth, seoController.blogUrls);

module.exports = router;
