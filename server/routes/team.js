const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const auth = require('../middleware/auth');

// Public route
router.get('/', teamController.getTeamMembers);

// Protected routes
router.post('/', auth, teamController.createTeamMember);
router.put('/:id', auth, teamController.updateTeamMember);
router.delete('/:id', auth, teamController.deleteTeamMember);
router.post('/reorder', auth, teamController.reorderTeamMembers);

module.exports = router;
