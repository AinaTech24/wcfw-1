const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgres');

const Redirect = sequelize.define('Redirect', {
  id:         { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  fromPath:   { type: DataTypes.STRING, allowNull: false, unique: true },
  toPath:     { type: DataTypes.STRING, allowNull: false },
  statusCode: { type: DataTypes.INTEGER, defaultValue: 301, validate: { isIn: [[301, 302]] } },
  isActive:   { type: DataTypes.BOOLEAN, defaultValue: true },
}, { 
  tableName: 'redirects', 
  underscored: true,
  getterMethods: {
    _id() { return this.id; }
  }
});

module.exports = Redirect;
