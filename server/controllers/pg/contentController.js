const { Op } = require('sequelize');
const PageContent = require('../../models/pg/PageContent');
const sequelize = require('../../config/postgres');

exports.getContent = async (req, res) => {
  try {
    const { page, section } = req.query;
    const where = {};
    if (page) where.page = page;
    if (section) where.section = section;
    const content = await PageContent.findAll({ where });
    res.json(content);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateContent = async (req, res) => {
  try {
    const { page, section, content, seoSettings } = req.body;
    const [record] = await PageContent.upsert({ page, section, content, seoSettings }, { returning: true });
    // re-fetch to get full instance with virtuals
    const fresh = await PageContent.findOne({ where: { page, section } });
    res.json(fresh);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.bulkUpdateContent = async (req, res) => {
  try {
    const updates = req.body;
    await Promise.all(updates.map(u =>
      PageContent.upsert({ page: u.page, section: u.section, content: u.content, seoSettings: u.seoSettings })
    ));
    res.json({ message: 'Bulk update successful' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteSection = async (req, res) => {
  try {
    await PageContent.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Section deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deletePage = async (req, res) => {
  try {
    await PageContent.destroy({ where: { page: req.params.pageName } });
    res.json({ message: `All sections of page "${req.params.pageName}" deleted` });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
