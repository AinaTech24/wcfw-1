const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../../config/postgres');

const User = sequelize.define('User', {
  id:        { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  _id:       { type: DataTypes.VIRTUAL, get() { return this.getDataValue('id'); } },
  email:     { type: DataTypes.STRING, allowNull: false, unique: true },
  password:  { type: DataTypes.STRING, allowNull: false },
  role:      { type: DataTypes.STRING, defaultValue: 'admin' },
  lastLogin: { type: DataTypes.DATE },
}, { tableName: 'users', underscored: true });

// Hash password before create/update
User.beforeCreate(async (user) => {
  if (user.password) user.password = await bcrypt.hash(user.password, 10);
});
User.beforeUpdate(async (user) => {
  if (user.changed('password')) user.password = await bcrypt.hash(user.password, 10);
});

// Instance method
User.prototype.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = User;
