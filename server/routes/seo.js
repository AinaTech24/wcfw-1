const express = require("express");
const router = express.Router();
const seoController = require("../controllers/seoController");
const auth = require("../middleware/auth");

router.get("/", auth, seoController.getSeo);
router.put("/", auth, seoController.updateSeo);
router.get("/default-robots", auth, seoController.defaultRobots);

module.exports = router;
