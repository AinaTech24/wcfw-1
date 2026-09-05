const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgres');

const TeamMember = sequelize.define('TeamMember', {
  id:          { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  _id:         { type: DataTypes.VIRTUAL, get() { return this.getDataValue('id'); } },
  name:        { type: DataTypes.STRING, allowNull: false },
  designation: { type: DataTypes.STRING, allowNull: false },
  image:       { type: DataTypes.STRING, defaultValue: '' },
  bio:         { type: DataTypes.TEXT,   defaultValue: '' },
  order:       { type: DataTypes.INTEGER, defaultValue: 0 },
  category:    { type: DataTypes.STRING, defaultValue: 'rm' },
  isActive:    { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'team_members', underscored: true });

module.exports = TeamMember;
