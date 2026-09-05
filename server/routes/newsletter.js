const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/pg/newsletterController');
const auth = require('../middleware/auth');

// Public route to subscribe
router.post('/subscribe', newsletterController.subscribe);

// Protected routes for admin
router.get('/', auth, newsletterController.getSubscribers);
router.patch('/:id/unsubscribe', auth, newsletterController.unsubscribe);
router.delete('/:id', auth, newsletterController.deleteSubscriber);

module.exports = router;
