const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, './.env') });

const PageContent = require('./models/PageContent');

async function checkContent() {
    try {
        console.log('Connecting to:', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        const count = await PageContent.countDocuments();
        console.log(`Total PageContent documents: ${count}`);
        
        const allItems = await PageContent.find({});
        console.log('All IDs, Pages, and Sections:');
        allItems.forEach(item => {
            console.log(`- ID: ${item._id}, Page: ${item.page}, Section: ${item.section}`);
        });
        
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkContent();
