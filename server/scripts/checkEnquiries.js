const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Enquiry = require('../models/Enquiry');

const checkEnquiries = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const count = await Enquiry.countDocuments();
        const latest = await Enquiry.find().sort({ createdAt: -1 }).limit(5);
        console.log(`Total Enquiries: ${count}`);
        console.log('Latest Enquiries:', JSON.stringify(latest, null, 2));
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkEnquiries();
