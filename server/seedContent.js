const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, './.env') });

const PageContent = require('./models/PageContent');

const pages = [
    {
        name: 'home',
        sections: [
            { name: 'hero', content: { keyword: 'Financial Freedom', title: 'Starts With Clarity', description: 'Live life with confidence, not confusion. We help you invest with clear goals, disciplined strategies, and long-term focus.', buttonText: 'Get Started', buttonLink: '/contact' } },
            { name: 'services-section', content: { title: 'Our Services & Products', description: "Experience Bespoke Financial Solutions with WCFW's 35-Year Legacy of Trust" } },
            { name: 'video-section', content: { title: 'Watch & Learn', badge: 'Latest Financial Insights', description: 'Latest wealth creation strategies from Nikhil Thakkar.' } },
            { name: 'goals-section', content: { title: "Let's Start to Solution Your Goals", description: 'Investing and savings get direction when mapped with your short-term, medium-term, and long-term financial goals' } },
            { name: 'seo-settings', content: {}, seoSettings: { metaTitle: 'Home | We Care Freedom Wealth', metaDescription: 'Expert financial solutions and wealth management.', robotsTag: 'index, follow' } }
        ]
    },
    {
        name: 'about',
        sections: [
            { name: 'legacy-section', content: { title: 'Our Legacy.', badge: 'Established 1989', description: "For over 35 years, we've helped families navigate the complex world of finance." } },
            { name: 'story-section', content: { title: 'From Vision to Institutional Reality', badge: 'The Human Protocol', p1: 'In 1989, Shri Vasudev Thakker founded WeCare...', p2: 'Today, that vision has transformed...' } },
            { name: 'mission-vision', content: { missionTitle: 'Our Mission', missionText: 'To cultivate absolute financial literacy...', visionTitle: 'Our Vision', visionText: 'To empower 1,000,000 lives...' } },
            { name: 'seo-settings', content: {}, seoSettings: { metaTitle: 'About Us | We Care Freedom Wealth', metaDescription: 'Learn about our 35-year legacy.', robotsTag: 'index, follow' } }
        ]
    },
    {
        name: 'contact',
        sections: [
            { name: 'hero', content: { title: "Let's Talk Strategy.", badge: 'Command Center', description: 'Connect with our advisory teams across India.' } },
            { name: 'form-section', content: { title: 'Secure Advisory Channel', badge: 'Advisory Request Protocol' } },
            { name: 'seo-settings', content: {}, seoSettings: { metaTitle: 'Contact Us | We Care Freedom Wealth', metaDescription: 'Get in touch with our financial advisors.', robotsTag: 'index, follow' } }
        ]
    },
    {
        name: 'services',
        sections: [
            { name: 'hero', content: { title: 'Precision Advisory.', badge: 'Our Methodology', description: "We don't just sell products; we engineer outcomes." } },
            { name: 'edge-section', content: { title: 'The WCFW Edge', description: 'Beyond numbers, we manage the behavior that determines wealth.' } },
            { name: 'seo-settings', content: {}, seoSettings: { metaTitle: 'Services | We Care Freedom Wealth', metaDescription: 'Comprehensive financial services for wealth creation.', robotsTag: 'index, follow' } }
        ]
    },
    {
        name: 'blog',
        sections: [
            { name: 'hero', content: { title: 'Financial Intelligence.', badge: 'The Knowledge Vault', description: 'Expert insights on wealth architecture, market dynamics, and systematic growth.' } },
            { name: 'seo-settings', content: {}, seoSettings: { metaTitle: 'Blog | We Care Freedom Wealth', metaDescription: 'Read the latest financial insights and articles.', robotsTag: 'index, follow' } }
        ]
    },
    {
        name: 'videos',
        sections: [
            { name: 'hero', content: { title: 'Visual Wealth.', badge: 'The Media Lab', description: 'Strategic insights, market deep-dives, and financial wisdom decoded in high-definition.' } },
            { name: 'seo-settings', content: {}, seoSettings: { metaTitle: 'Videos | We Care Freedom Wealth', metaDescription: 'Watch insightful videos on financial planning.', robotsTag: 'index, follow' } }
        ]
    },
    {
        name: 'calculators',
        sections: [
            { name: 'hero', content: { title: 'Financial Engineering.', badge: 'Precision Matrix', description: 'Simulate your wealth trajectory with our institutional-grade financial simulators.' } },
            { name: 'seo-settings', content: {}, seoSettings: { metaTitle: 'Financial Calculators | We Care Freedom Wealth', metaDescription: 'Use our SIP, Lumpsum, and Retirement calculators.', robotsTag: 'index, follow' } }
        ]
    },
    {
        name: 'financial-freedom',
        sections: [
            { name: 'hero', content: { title: 'Absolute Independence.', badge: 'The Freedom Protocol', description: 'Redefining the relationship between time and capital.' } },
            { name: 'seo-settings', content: {}, seoSettings: { metaTitle: 'Financial Freedom | We Care Freedom Wealth', metaDescription: 'Achieve financial independence with our expert guidance.', robotsTag: 'index, follow' } }
        ]
    },
    {
        name: 'asset-allocation',
        sections: [
            { name: 'hero', content: { title: 'Strategic Balance.', badge: 'The Allocation Matrix', description: 'Optimizing your portfolio across multiple asset classes for risk-adjusted growth.' } },
            { name: 'seo-settings', content: {}, seoSettings: { metaTitle: 'Asset Allocation | We Care Freedom Wealth', metaDescription: 'Optimize your portfolio for risk and return.', robotsTag: 'index, follow' } }
        ]
    },
    {
        name: 'newsletter',
        sections: [
            { name: 'hero', content: { title: 'Intelligence Uplink.', badge: 'The Intelligence Brief', description: 'Weekly strategic insights delivered directly to your private terminal.' } },
            { name: 'seo-settings', content: {}, seoSettings: { metaTitle: 'Newsletter | We Care Freedom Wealth', metaDescription: 'Subscribe to our weekly financial insights.', robotsTag: 'index, follow' } }
        ]
    },
    {
        name: 'privacy-policy',
        sections: [
            { name: 'hero', content: { title: 'Data Privacy.', badge: 'Institutional Data Governance', description: 'Transparency is the cornerstone of institutional trust.' } },
            { name: 'content', content: { text: "This privacy directive establishes the architecture for how The Happyness Culture manages and safeguards sovereign data..." } },
            { name: 'seo-settings', content: {}, seoSettings: { metaTitle: 'Privacy Policy | We Care Freedom Wealth', metaDescription: 'Our commitment to protecting your data.', robotsTag: 'index, nofollow' } }
        ]
    }
];

// Add legal pages with same structure
['terms-of-service', 'disclaimer', 'commission-disclosure'].forEach(pg => {
    pages.push({
        name: pg,
        sections: [
            { name: 'hero', content: { title: pg.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '), badge: 'Institutional Protocols', description: 'Governance and transparency guidelines.' } },
            { name: 'content', content: { text: "Legal documentation text goes here..." } },
            { name: 'seo-settings', content: {}, seoSettings: { metaTitle: `${pg.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')} | We Care Freedom Wealth`, metaDescription: 'Official legal documentation.', robotsTag: 'index, nofollow' } }
        ]
    });
});

// Add service pages
['goal-base-investing', 'stocks', 'fixed-deposit', 'tax-solution', 'life-insurance', 'mutual-fund'].forEach(pg => {
    pages.push({
        name: pg,
        sections: [
            { name: 'hero', content: { title: pg.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '), badge: 'Specialized Solution', description: 'Expert advisory for your specific financial needs.' } },
            { name: 'details', content: { title: 'Deep Dive', description: 'Comprehensive details about this service.' } },
            { name: 'seo-settings', content: {}, seoSettings: { metaTitle: `${pg.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')} | We Care Freedom Wealth`, metaDescription: `Expert advisory on ${pg.replace(/-/g, ' ')}.`, robotsTag: 'index, follow' } }
        ]
    });
});

// Add goal pages
['retirement', 'dream-home', 'child-education', 'child-wedding', 'emergency-fund', 'wealth-creation'].forEach(pg => {
    pages.push({
        name: pg,
        sections: [
            { name: 'hero', content: { title: pg.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '), badge: 'Milestone Architecture', description: 'Build a roadmap for your biggest life achievements.' } },
            { name: 'roadmap', content: { title: 'Goal Roadmap', description: 'Step-by-step solution for your success.' } },
            { name: 'seo-settings', content: {}, seoSettings: { metaTitle: `${pg.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')} | We Care Freedom Wealth`, metaDescription: `Plan for your ${pg.replace(/-/g, ' ')}.`, robotsTag: 'index, follow' } }
        ]
    });
});

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        for (const page of pages) {
            for (const section of page.sections) {
                await PageContent.findOneAndUpdate(
                    { page: page.name, section: section.name },
                    { ...section, page: page.name },
                    { upsert: true, new: true }
                );
            }
            console.log(`Seeded: ${page.name}`);
        }

        console.log('✅ All Pages Seeding complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
}

seed();
