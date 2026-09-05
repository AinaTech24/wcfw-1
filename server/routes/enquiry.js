const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/pg/enquiryController');
const auth = require('../middleware/auth');

// Public route to submit enquiry
router.post('/', enquiryController.createEnquiry);

// Protected routes to manage enquiries
router.get('/', auth, enquiryController.getEnquiries);
router.patch('/:id/status', auth, enquiryController.updateEnquiryStatus);
router.delete('/:id', auth, enquiryController.deleteEnquiry);

module.exports = router;
