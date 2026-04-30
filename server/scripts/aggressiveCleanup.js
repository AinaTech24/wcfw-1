const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Enquiry = require('../models/Enquiry');

const aggressiveCleanup = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const all = await Enquiry.find({});
        let deleted = 0;
        for (const doc of all) {
            if (!doc.name || typeof doc.name !== 'string') {
                await Enquiry.findByIdAndDelete(doc._id);
                deleted++;
            }
        }
        console.log(`Aggressively deleted ${deleted} invalid enquiries.`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

aggressiveCleanup();
