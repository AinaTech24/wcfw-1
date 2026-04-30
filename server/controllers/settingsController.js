const SiteSetting = require('../models/SiteSetting');

exports.getSettings = async (req, res) => {
    try {
        let settings = await SiteSetting.findOne();
        if (!settings) {
            settings = await SiteSetting.create({});
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        let settings = await SiteSetting.findOne();
        if (!settings) {
            settings = await SiteSetting.create(req.body);
        } else {
            Object.assign(settings, req.body);
            await settings.save();
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
