const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

const seedAdmin = async () => {
    try {
        console.log('🔗 Connecting to:', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('📦 Connected to MongoDB');

        const adminExists = await User.findOne({ email: 'admin@wcfw.com' });
        if (adminExists) {
            console.log('⚠️ Admin user already exists');
            process.exit(0);
        }

        const admin = new User({
            email: 'admin@wcfw.com',
            password: 'admin_password_123', // User should change this immediately
            role: 'admin'
        });

        await admin.save();
        console.log('✅ Admin user created successfully');
        console.log('Email: admin@wcfw.com');
        console.log('Password: admin_password_123');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding Error:', error);
        process.exit(1);
    }
};

seedAdmin();
