const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgres');

const PageContent = sequelize.define('PageContent', {
  id:          { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  page:        { type: DataTypes.STRING, allowNull: false },
  section:     { type: DataTypes.STRING, allowNull: false },
  content:     { type: DataTypes.JSONB,  allowNull: false },
  seoSettings: { type: DataTypes.JSONB },
  order:       { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
}, {
  tableName: 'page_contents',
  underscored: true,
  getterMethods: {
    _id() { return this.id; }
  },
  indexes: [{ unique: true, fields: ['page', 'section'] }],
});

module.exports = PageContent;
