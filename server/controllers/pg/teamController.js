const TeamMember = require('../../models/pg/TeamMember');

exports.getTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.findAll({ order: [['order', 'ASC'], ['created_at', 'DESC']] });
    res.json(members);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json(member);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ message: 'Not found' });
    await member.update(req.body);
    res.json(member);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteTeamMember = async (req, res) => {
  try {
    await TeamMember.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Team member deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.reorderTeamMembers = async (req, res) => {
  try {
    const { orderedIds } = req.body;
    await Promise.all(orderedIds.map((id, index) =>
      TeamMember.update({ order: index }, { where: { id } })
    ));
    res.json({ message: 'Order updated' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
