const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgres');

const Video = sequelize.define('Video', {
  id:          { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title:       { type: DataTypes.STRING, allowNull: false },
  youtubeUrl:  { type: DataTypes.STRING, allowNull: false },
  thumbnail:   { type: DataTypes.STRING, defaultValue: '' },
  description: { type: DataTypes.TEXT,   defaultValue: '' },
  category:    { type: DataTypes.STRING, defaultValue: 'General' },
  order:       { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive:    { type: DataTypes.BOOLEAN, defaultValue: true },
  seo:         { type: DataTypes.JSONB,  defaultValue: {} },
  faqs:        { type: DataTypes.JSONB,  defaultValue: [] },
}, { 
  tableName: 'videos', 
  underscored: true,
  getterMethods: {
    _id() { return this.id; }
  }
});

module.exports = Video;
