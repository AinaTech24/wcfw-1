const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const sequelize = require('../config/postgres');
const User = require('../models/pg/User');
const bcrypt = require('bcryptjs');

const targetEmail = process.argv[2] || 'admin@wcfw.com';
const testPass = process.argv[3] || 'admin_password_123';

const verifyAuth = async () => {
  try {
    await sequelize.authenticate();
    console.log('🐘 Connected to PostgreSQL');

    const user = await User.findOne({ where: { email: targetEmail } });
    if (!user) {
      console.log(`❌ User ${targetEmail} not found in PostgreSQL`);
      process.exit(1);
    }

    const isMatch = await bcrypt.compare(testPass, user.password);
    console.log(`📧 Email: ${user.email}`);
    console.log(`🔐 Password in DB (hash): ${user.password}`);
    console.log(`🧪 Testing with: ${testPass}`);
    console.log(`✅ Match Result: ${isMatch}`);

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

verifyAuth();
