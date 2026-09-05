const Enquiry = require('../../models/pg/Enquiry');

exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create({
      ...req.body,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });
    res.status(201).json(enquiry);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({ order: [['created_at', 'DESC']] });
    res.json(enquiries);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateEnquiryStatus = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByPk(req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    await enquiry.update({ status: req.body.status });
    res.json(enquiry);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteEnquiry = async (req, res) => {
  try {
    await Enquiry.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Enquiry deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
