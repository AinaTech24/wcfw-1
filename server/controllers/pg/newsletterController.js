const Newsletter = require('../../models/pg/Newsletter');

exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.findAll({ order: [['created_at', 'DESC']] });
    res.json(subscribers);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.subscribe = async (req, res) => {
  try {
    const { email, name } = req.body;
    const existing = await Newsletter.findOne({ where: { email } });
    if (existing) {
      if (!existing.isActive) {
        await existing.update({ isActive: true });
        return res.json({ message: 'Re-subscribed successfully' });
      }
      return res.status(400).json({ message: 'Already subscribed' });
    }
    const subscriber = await Newsletter.create({ email, name });
    res.status(201).json(subscriber);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.unsubscribe = async (req, res) => {
  try {
    const sub = await Newsletter.findByPk(req.params.id);
    if (!sub) return res.status(404).json({ message: 'Subscriber not found' });
    await sub.update({ isActive: false });
    res.json(sub);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteSubscriber = async (req, res) => {
  try {
    await Newsletter.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Subscriber deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
