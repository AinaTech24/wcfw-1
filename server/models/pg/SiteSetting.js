const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgres');

const SiteSetting = sequelize.define('SiteSetting', {
  id:             { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  _id:            { type: DataTypes.VIRTUAL, get() { return this.getDataValue('id'); } },
  companyName:    { type: DataTypes.STRING, defaultValue: 'We Care Freedom Wealth' },
  companyEmail:   { type: DataTypes.STRING, defaultValue: '' },
  companyPhone:   { type: DataTypes.STRING, defaultValue: '' },
  companyAddress: { type: DataTypes.TEXT,   defaultValue: '' },
  whatsappNumber: { type: DataTypes.STRING, defaultValue: '' },
  socialLinks:    { type: DataTypes.JSONB,  defaultValue: {} },
  seo:            { type: DataTypes.JSONB,  defaultValue: {} },
  footerText:     { type: DataTypes.TEXT,   defaultValue: '' },
  heroTagline:    { type: DataTypes.STRING, defaultValue: '' },
  heroSubtitle:   { type: DataTypes.STRING, defaultValue: '' },
}, { tableName: 'site_settings', underscored: true });

module.exports = SiteSetting;
