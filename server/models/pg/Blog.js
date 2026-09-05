const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgres');

const Blog = sequelize.define('Blog', {
  id:              { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  _id:             { type: DataTypes.VIRTUAL, get() { return this.getDataValue('id'); } },
  title:           { type: DataTypes.STRING, allowNull: false },
  slug:            { type: DataTypes.STRING, allowNull: false, unique: true },
  content:         { type: DataTypes.TEXT, allowNull: false },
  summary:         { type: DataTypes.TEXT, allowNull: false },
  author:          { type: DataTypes.STRING, defaultValue: 'Nikhil Thakkar' },
  image:           { type: DataTypes.STRING },
  tags:            { type: DataTypes.JSONB, defaultValue: [] },
  isPublished:     { type: DataTypes.BOOLEAN, defaultValue: true },
  views:           { type: DataTypes.INTEGER, defaultValue: 0 },
  metaTitle:       { type: DataTypes.STRING },
  metaDescription: { type: DataTypes.TEXT },
  metaKeywords:    { type: DataTypes.TEXT },
  canonicalUrl:    { type: DataTypes.STRING },
  ogImage:         { type: DataTypes.STRING },
  robotsTag:       { type: DataTypes.STRING, defaultValue: 'index, follow' },
  faq:             { type: DataTypes.JSONB, defaultValue: [] },
}, { tableName: 'blogs', underscored: true });

module.exports = Blog;
