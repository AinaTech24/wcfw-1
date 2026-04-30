const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const PageContent = require('../models/PageContent');

const contentData = [
    // HOME PAGE
    {
        page: 'home',
        section: 'hero',
        content: {
            keyword: 'Financial Freedom',
            title: 'Starts With Clarity',
            description: 'Live life with confidence, not confusion. We help you invest with clear goals, disciplined strategies, and long-term focus.',
            buttonText: 'Get Started',
            buttonLink: '/contact'
        }
    },
    {
        page: 'home',
        section: 'services-intro',
        content: {
            title: 'Our Services & Products',
            subtitle: "Experience Bespoke Financial Solutions with WCFW's 35-Year Legacy of Trust"
        }
    },
    {
        page: 'home',
        section: 'goals-intro',
        content: {
            title: "Let's Start to Solution Your Goals",
            subtitle: 'Investing and savings get direction when mapped with your short-term, medium-term, and long-term financial goals'
        }
    },
    {
        page: 'home',
        section: 'reviews-intro',
        content: {
            title: 'What Our Clients Say',
            subtitle: 'Trusted by thousands of satisfied clients across India',
            rating: '4.7',
            reviews_count: '373+'
        }
    },
    {
        page: 'home',
        section: 'offices-intro',
        content: {
            title: 'Our Offices',
            subtitle: 'Transparency and Trust are the cornerstones of our financial advisory legacy since 1990.'
        }
    },

    // ABOUT PAGE
    {
        page: 'about',
        section: 'hero',
        content: {
            title: 'Our Legacy.',
            description: "For over 35 years, we've helped families navigate the complex world of finance."
        }
    },
    {
        page: 'about',
        section: 'legacy-section',
        content: {
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
        content: {
            title: 'From Vision to Institutional Reality',
            content: 'In 1989, Shri Vasudev Thakker founded WeCare with a singular vision. Today, that vision has transformed into an institution of trust.',
            highlight_title: 'The Gold Standard',
            highlight_label: 'Quality Driven Advisory',
            img_badge: 'The Architecture of Trust',
            img_title: 'Elite Team WCFW'
        }
    },

    // CONTACT PAGE
    {
        page: 'contact',
        section: 'hero',
        content: {
            badge: 'COMMAND CENTER',
            title: "Let's Talk Strategy.",
            description: 'Connect with our advisory teams across India.',
            stat1_val: '60m',
            stat1_label: 'SLA RESPONSE',
            stat2_val: '4+',
            stat2_label: 'GLOBAL HUBS',
            cta_title: 'INSTANT TRANSMISSION',
            cta_val: '+91 93772 77703'
        }
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        for (const item of contentData) {
            await PageContent.findOneAndUpdate(
                { page: item.page, section: item.section },
                { $set: { content: item.content } },
                { upsert: true, new: true }
            );
            console.log(`Seeded: ${item.page} / ${item.section}`);
        }

        console.log('✅ Synchronized seeding complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
}

seed();
