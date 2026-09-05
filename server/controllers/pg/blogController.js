const Blog = require('../../models/pg/Blog');

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({ order: [['created_at', 'DESC']] });
    res.json(blogs);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ where: { slug: req.params.slug } });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    await blog.update(req.body);
    res.json(blog);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Blog deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
