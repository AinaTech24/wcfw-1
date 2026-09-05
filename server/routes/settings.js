const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/pg/settingsController');
const auth = require('../middleware/auth');

// Public route (frontend needs settings)
router.get('/', settingsController.getSettings);

// Protected route
router.put('/', auth, settingsController.updateSettings);

module.exports = router;
