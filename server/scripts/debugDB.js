const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

const debugDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const count = await User.countDocuments();
        console.log(`User count: ${count}`);
        
        const all = await User.find({});
        console.log('All users JSON:', JSON.stringify(all, null, 2));
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

debugDB();
