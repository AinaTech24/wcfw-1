const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const verifyAuth = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const user = await User.findOne({ email: 'admin@wcfw.com' });
        if (!user) {
            console.log('User not found');
            process.exit(1);
        }

        const testPass = 'admin_password_123';
        const isMatch = await bcrypt.compare(testPass, user.password);
        console.log(`Email: ${user.email}`);
        console.log(`Password in DB (hash): ${user.password}`);
        console.log(`Testing with: ${testPass}`);
        console.log(`Match Result: ${isMatch}`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

verifyAuth();
