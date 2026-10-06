const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const sequelize = require('../config/postgres');
const User = require('../models/pg/User');

const targetEmail = process.argv[2] || 'admin@wcfw.com';
const newPassword = process.argv[3] || 'admin_password_123';

const resetAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('🐘 Connected to PostgreSQL');

    let user = await User.findOne({ where: { email: targetEmail } });

    if (!user) {
      console.log(`⚠️ User ${targetEmail} not found in PostgreSQL. Creating new admin user...`);
      user = await User.create({
        email: targetEmail,
        password: newPassword,
        role: 'admin',
      });
      console.log(`✅ Admin user created: ${targetEmail}`);
    } else {
      user.password = newPassword;
      await user.save();
      console.log(`✅ Admin password for ${targetEmail} reset successfully.`);
    }

    console.log(`📧 Email: ${targetEmail}`);
    console.log(`🔑 Password: ${newPassword}`);

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Reset Error:', error.message);
    process.exit(1);
  }
};

resetAdmin();
