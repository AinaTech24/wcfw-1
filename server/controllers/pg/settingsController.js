const SiteSetting = require('../../models/pg/SiteSetting');

exports.getSettings = async (req, res) => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) settings = await SiteSetting.create({});
    res.json(settings);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateSettings = async (req, res) => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create(req.body);
    } else {
      await settings.update(req.body);
    }
    res.json(settings);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
