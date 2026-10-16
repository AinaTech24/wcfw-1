const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgres');

const Enquiry = sequelize.define('Enquiry', {
  id:        { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name:      { type: DataTypes.STRING, allowNull: false },
  email:     { type: DataTypes.STRING, allowNull: false },
  phone:     { type: DataTypes.STRING, allowNull: false },
  subject:   { type: DataTypes.STRING },
  message:   { type: DataTypes.TEXT, allowNull: false },
  status:    { 
    type: DataTypes.STRING, 
    defaultValue: 'new',
    validate: {
      isIn: [['new', 'read', 'replied', 'closed']]
    }
  },
  userAgent: { type: DataTypes.TEXT },
  ip:        { type: DataTypes.STRING },
}, { 
  tableName: 'enquiries', 
  underscored: true,
  getterMethods: {
    _id() { return this.id; }
  }
});

module.exports = Enquiry;
