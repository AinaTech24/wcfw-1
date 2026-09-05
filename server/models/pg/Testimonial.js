const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgres');

const Testimonial = sequelize.define('Testimonial', {
  id:          { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  _id:         { type: DataTypes.VIRTUAL, get() { return this.getDataValue('id'); } },
  name:        { type: DataTypes.STRING, allowNull: false },
  designation: { type: DataTypes.STRING, defaultValue: '' },
  content:     { type: DataTypes.TEXT,   allowNull: false },
  rating:      { type: DataTypes.INTEGER, defaultValue: 5, validate: { min: 1, max: 5 } },
  image:       { type: DataTypes.STRING, defaultValue: '' },
  isActive:    { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'testimonials', underscored: true });

module.exports = Testimonial;
