const express = require('express');
const router = express.Router();
const contentController = require('../controllers/pg/contentController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public route to get content
router.get('/', contentController.getContent);

// Protected routes to update content
router.post('/update', auth, contentController.updateContent);
router.post('/reorder', auth, contentController.reorderSections);
router.post('/bulk-update', auth, contentController.bulkUpdateContent);
router.delete('/page/:pageName', auth, contentController.deletePage);
router.delete('/:id', auth, contentController.deleteSection);

// Protected route to upload files
router.post('/upload', auth, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

module.exports = router;
