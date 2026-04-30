const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const PageContent = require('../models/PageContent');

const patches = [
    {
        page: 'contact',
        section: 'hero',
        fields: {
            stat1_val: '60m',
            stat1_label: 'SLA Response',
            stat2_val: '4+',
            stat2_label: 'Global Hubs',
            cta_title: 'Instant Transmission',
            cta_val: '+91 93772 77703'
        }
    },
    {
        page: 'about',
        section: 'legacy-section',
        fields: {
            stat1_val: '35+',
            stat1_label: 'Years of Trust',
            stat2_val: '10k+',
            stat2_label: 'Families Protected',
            quote: '"Our Word is our Bond."',
            quote_author: '- WCFW Fundamental Protocol'
        }
    },
    {
        page: 'about',
        section: 'story-section',
        fields: {
            highlight_title: 'The Gold Standard',
            highlight_label: 'Quality Driven Advisory',
            img_badge: 'The Architecture of Trust',
            img_title: 'Elite Team WCFW'
        }
    }
];

async function patch() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        for (const p of patches) {
            const doc = await PageContent.findOne({ page: p.page, section: p.section });
            if (doc) {
                const updatedContent = { ...doc.content, ...p.fields };
                await PageContent.updateOne(
                    { _id: doc._id },
                    { $set: { content: updatedContent } }
                );
                console.log(`Updated: ${p.page} / ${p.section}`);
            } else {
                console.log(`Not found: ${p.page} / ${p.section} - creating with default fields`);
                await PageContent.create({
                    page: p.page,
                    section: p.section,
                    content: p.fields
                });
            }
        }

        console.log('✅ Patching complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Patching failed:', err);
        process.exit(1);
    }
}

patch();
