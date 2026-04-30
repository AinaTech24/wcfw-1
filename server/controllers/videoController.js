const Video = require('../models/Video');

exports.getVideos = async (req, res) => {
    try {
        const videos = await Video.find().sort({ order: 1, createdAt: -1 });
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createVideo = async (req, res) => {
    try {
        const video = await Video.create(req.body);
        res.status(201).json(video);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(video);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteVideo = async (req, res) => {
    try {
        await Video.findByIdAndDelete(req.params.id);
        res.json({ message: 'Video deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
