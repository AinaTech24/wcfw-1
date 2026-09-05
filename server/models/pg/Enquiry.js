const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgres');

const Enquiry = sequelize.define('Enquiry', {
  id:        { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  _id:       { type: DataTypes.VIRTUAL, get() { return this.getDataValue('id'); } },
  name:      { type: DataTypes.STRING, allowNull: false },
  email:     { type: DataTypes.STRING, allowNull: false },
  phone:     { type: DataTypes.STRING, allowNull: false },
  subject:   { type: DataTypes.STRING },
  message:   { type: DataTypes.TEXT, allowNull: false },
  status:    { type: DataTypes.ENUM('new','read','replied','closed'), defaultValue: 'new' },
  userAgent: { type: DataTypes.TEXT },
  ip:        { type: DataTypes.STRING },
}, { tableName: 'enquiries', underscored: true });

module.exports = Enquiry;
