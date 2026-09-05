const Testimonial = require('../../models/pg/Testimonial');

exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({ order: [['created_at', 'DESC']] });
    res.json(testimonials);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json(testimonial);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const t = await Testimonial.findByPk(req.params.id);
    if (!t) return res.status(404).json({ message: 'Not found' });
    await t.update(req.body);
    res.json(t);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Testimonial deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
