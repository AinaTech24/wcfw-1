const Video = require('../../models/pg/Video');

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({ order: [['order', 'ASC'], ['created_at', 'DESC']] });
    res.json(videos);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createVideo = async (req, res) => {
  try {
    const video = await Video.create(req.body);
    res.status(201).json(video);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateVideo = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) return res.status(404).json({ message: 'Not found' });
    await video.update(req.body);
    res.json(video);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteVideo = async (req, res) => {
  try {
    await Video.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Video deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
