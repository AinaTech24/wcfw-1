const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Enquiry = require('../models/Enquiry');

const cleanup = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const withoutName = await Enquiry.deleteMany({ name: { $exists: false } });
        console.log(`Deleted ${withoutName.deletedCount} enquiries without a name.`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

cleanup();
