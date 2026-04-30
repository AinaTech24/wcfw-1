const PageContent = require('../models/PageContent');

exports.getContent = async (req, res) => {
    try {
        const { page, section } = req.query;
        let query = {};
        if (page) query.page = page;
        if (section) query.section = section;

        const content = await PageContent.find(query);
        res.json(content);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateContent = async (req, res) => {
    try {
        const { page, section, content, seoSettings } = req.body;
        
        const updatedContent = await PageContent.findOneAndUpdate(
            { page, section },
            { content, seoSettings },
            { new: true, upsert: true }
        );

        res.json(updatedContent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.bulkUpdateContent = async (req, res) => {
    try {
        const updates = req.body; // Array of { page, section, content }
        
        const operations = updates.map(update => ({
            updateOne: {
                filter: { page: update.page, section: update.section },
                update: { content: update.content },
                upsert: true
            }
        }));

        await PageContent.bulkWrite(operations);
        res.json({ message: 'Bulk update successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteSection = async (req, res) => {
    try {
        await PageContent.findByIdAndDelete(req.params.id);
        res.json({ message: 'Section deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deletePage = async (req, res) => {
    try {
        const { pageName } = req.params;
        await PageContent.deleteMany({ page: pageName });
        res.json({ message: `All sections of page "${pageName}" deleted` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
