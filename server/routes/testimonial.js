const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/pg/testimonialController');
const auth = require('../middleware/auth');

// Public route
router.get('/', testimonialController.getTestimonials);

// Protected routes
router.post('/', auth, testimonialController.createTestimonial);
router.put('/:id', auth, testimonialController.updateTestimonial);
router.delete('/:id', auth, testimonialController.deleteTestimonial);

module.exports = router;
