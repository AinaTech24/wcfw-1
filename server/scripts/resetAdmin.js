const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

const resetAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('📦 Connected to MongoDB');

        const user = await User.findOne({ email: 'admin@wcfw.com' });
        if (!user) {
            console.log('❌ Admin user not found');
            process.exit(1);
        }

        user.password = 'admin_password_123';
        await user.save();
        
        console.log('✅ Admin password reset to: admin_password_123');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

resetAdmin();
