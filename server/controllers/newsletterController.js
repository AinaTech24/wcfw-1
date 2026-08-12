const Newsletter = require('../models/Newsletter');

exports.getSubscribers = async (req, res) => {
    try {
        const subscribers = await Newsletter.find().sort({ createdAt: -1 });
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.subscribe = async (req, res) => {
    try {
        const { email, name } = req.body;
        const existing = await Newsletter.findOne({ email });
        if (existing) {
            if (!existing.isActive) {
                existing.isActive = true;
                await existing.save();
                return res.json({ message: 'Re-subscribed successfully' });
            }
            return res.status(400).json({ message: 'Already subscribed' });
        }
        const subscriber = await Newsletter.create({ email, name });
        res.status(201).json(subscriber);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.unsubscribe = async (req, res) => {
    try {
        const subscriber = await Newsletter.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { returnDocument: 'after' }
        );
        res.json(subscriber);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteSubscriber = async (req, res) => {
    try {
        await Newsletter.findByIdAndDelete(req.params.id);
        res.json({ message: 'Subscriber deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
