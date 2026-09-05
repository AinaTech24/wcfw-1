const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgres');

const Newsletter = sequelize.define('Newsletter', {
  id:           { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  _id:          { type: DataTypes.VIRTUAL, get() { return this.getDataValue('id'); } },
  email:        { type: DataTypes.STRING, allowNull: false, unique: true },
  name:         { type: DataTypes.STRING, defaultValue: '' },
  isActive:     { type: DataTypes.BOOLEAN, defaultValue: true },
  subscribedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'newsletters', underscored: true });

module.exports = Newsletter;
