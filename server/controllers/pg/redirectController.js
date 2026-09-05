const Redirect = require('../../models/pg/Redirect');

exports.getRedirects = async (req, res) => {
  try {
    const redirects = await Redirect.findAll({ order: [['created_at', 'DESC']] });
    res.json(redirects);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createRedirect = async (req, res) => {
  try {
    const redirect = await Redirect.create(req.body);
    res.status(201).json(redirect);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateRedirect = async (req, res) => {
  try {
    const redirect = await Redirect.findByPk(req.params.id);
    if (!redirect) return res.status(404).json({ message: 'Not found' });
    await redirect.update(req.body);
    res.json(redirect);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.deleteRedirect = async (req, res) => {
  try {
    await Redirect.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Redirect deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
