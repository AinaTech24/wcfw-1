const { Op } = require('sequelize');
const PageContent = require('../../models/pg/PageContent');
const sequelize = require('../../config/postgres');

exports.getContent = async (req, res) => {
  try {
    const { page, section } = req.query;
    const where = {};
    if (page) where.page = page;
    if (section) where.section = section;
    const content = await PageContent.findAll({
      where,
      order: [
        ['order', 'ASC'],
        ['created_at', 'ASC'],
      ],
    });
    res.json(content);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateContent = async (req, res) => {
  try {
    const { page, section, content, seoSettings, order } = req.body;
    const existing = await PageContent.findOne({ where: { page, section } });

    let recordOrder = order;
    if (recordOrder === undefined || recordOrder === null) {
      if (existing) {
        recordOrder = existing.order;
      } else {
        const maxSection = await PageContent.findOne({
          where: { page },
          order: [['order', 'DESC']],
        });
        recordOrder = maxSection && maxSection.order !== undefined ? maxSection.order + 1 : 0;
      }
    }

    await PageContent.upsert(
      { page, section, content, seoSettings, order: recordOrder },
      { returning: true }
    );
    const fresh = await PageContent.findOne({ where: { page, section } });
    res.json(fresh);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.reorderSections = async (req, res) => {
  try {
    const { page, orderedIds } = req.body;
    if (!page || !Array.isArray(orderedIds)) {
      return res.status(400).json({ message: 'Page and orderedIds array are required' });
    }

    await sequelize.transaction(async (t) => {
      for (let i = 0; i < orderedIds.length; i++) {
        await PageContent.update(
          { order: i },
          { where: { id: orderedIds[i], page }, transaction: t }
        );
      }
    });

    const updated = await PageContent.findAll({
      where: { page },
      order: [
        ['order', 'ASC'],
        ['created_at', 'ASC'],
      ],
    });
    res.json({ message: 'Sections reordered successfully', data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
