const Redirect = require('../models/Redirect');

exports.getRedirects = async (req, res) => {
    try {
        const redirects = await Redirect.find().sort({ createdAt: -1 });
        res.json(redirects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createRedirect = async (req, res) => {
    try {
        const redirect = new Redirect(req.body);
        await redirect.save();
        res.status(201).json(redirect);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateRedirect = async (req, res) => {
    try {
        const redirect = await Redirect.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
        res.json(redirect);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteRedirect = async (req, res) => {
    try {
        await Redirect.findByIdAndDelete(req.params.id);
        res.json({ message: 'Redirect deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
