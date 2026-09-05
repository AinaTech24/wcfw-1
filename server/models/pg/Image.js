const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgres');

const Image = sequelize.define('Image', {
  id:          { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  _id:         { type: DataTypes.VIRTUAL, get() { return this.getDataValue('id'); } },
  data:        { type: DataTypes.BLOB('long'), allowNull: false },
  contentType: { type: DataTypes.STRING, allowNull: false },
  filename:    { type: DataTypes.STRING },
  size:        { type: DataTypes.INTEGER },
}, { tableName: 'images', underscored: true });

module.exports = Image;
