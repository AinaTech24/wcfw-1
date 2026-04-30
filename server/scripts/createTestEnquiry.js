const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Enquiry = require('../models/Enquiry');

const createTest = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const test = await Enquiry.create({
            name: 'Antigravity Support',
            email: 'support@antigravity.ai',
            phone: '1234567890',
            message: 'This is a verified test enquiry to fix the display issue.',
            status: 'new'
        });
        console.log('Test enquiry created:', test._id);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createTest();
