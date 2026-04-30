const express = require('express');
const router = express.Router();
const redirectController = require('../controllers/redirectController');
const auth = require('../middleware/auth');

router.get('/', auth, redirectController.getRedirects);
router.post('/', auth, redirectController.createRedirect);
router.put('/:id', auth, redirectController.updateRedirect);
router.delete('/:id', auth, redirectController.deleteRedirect);

module.exports = router;
