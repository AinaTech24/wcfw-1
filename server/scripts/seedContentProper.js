const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const PageContent = require('../models/PageContent');

const contentData = [
    // --- HOME PAGE ---
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
        section: 'services-section',
        content: {
            title: 'Our Services & Products',
            description: "Experience Bespoke Financial Solutions with WCFW's 35-Year Legacy of Trust"
        }
    },
    {
        page: 'home',
        section: 'video-section',
        content: {
            badge: 'Latest Financial Insights',
            title: 'Watch & Learn',
            description: "Latest wealth creation strategies from Nikhil Thakkar. New videos highlight automatically."
        }
    },
    {
        page: 'home',
        section: 'goals-section',
        content: {
            title: "Let's Start to Solution Your Goals",
            description: 'Investing and savings get direction when mapped with your short-term, medium-term, and long-term financial goals'
        }
    },

    // --- ABOUT PAGE ---
    {
        page: 'about',
        section: 'legacy-section',
        content: {
            badge: 'Established 1989',
            title: 'Our Legacy.',
            description: "For over 35 years, we've helped families navigate the complex world of finance with institutional precision and human-centric care.",
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
            badge: 'The Human Protocol',
            title: 'From Vision to Institutional Reality',
            p1: 'In 1989, <span class="text-slate-900 font-black">Shri Vasudev Thakker</span> founded WeCare with a singular mission: to dismantle the barriers to financial literacy. He believed wealth wasn\'t an end state, but a vehicle for absolute independence.',
            p2: 'Today, that vision has transformed into an institutional powerhouse, guiding over <span class="text-orange-600 font-black underline decoration-orange-500 decoration-4 underline-offset-4">10,000+ elite families</span> and managing a combined legacy of trust spanning generations.',
            highlight_title: 'The Gold Standard',
            highlight_label: 'Quality Driven Advisory',
            img_badge: 'The Architecture of Trust',
            img_title: 'Elite Team WCFW'
        }
    },
    {
        page: 'about',
        section: 'mission-vision',
        content: {
            missionTitle: 'Our Mission',
            missionText: 'To cultivate <span class="text-white">absolute financial literacy</span> across the sub-continent, enabling families to secure a stress-free existence through scientific capital engineering and disciplined deployment.',
            visionTitle: 'Our Vision',
            visionText: 'To empower <span class="text-white">1,000,000 individual lives</span> with sophisticated financial wisdom by 2025, architecting a sustainable roadmap for generational prosperity.'
        }
    },
    {
        page: 'about',
        section: 'cta-section',
        content: {
            title: '"Building Legacies, Together."',
            description: "Ready to architect your own financial legacy? Let's build a future where your capital works for your vision.",
            btnText: 'Schedule a Vision Meeting'
        }
    },

    // --- CONTACT PAGE ---
    {
        page: 'contact',
        section: 'hero',
        content: {
            badge: 'Command Center',
            title: "Let's Talk Strategy.",
            description: "Connect with our advisory teams across India. Whether it's a portfolio audit or legacy solution, we're ready to architect your vision.",
            stat1_val: '60m',
            stat1_label: 'SLA Response',
            stat2_val: '4+',
            stat2_label: 'Global Hubs',
            cta_title: 'Instant Transmission',
            cta_val: '+91 93772 77703'
        }
    },
    {
        page: 'contact',
        section: 'form-section',
        content: {
            badge: 'Advisory Request Protocol',
            title: 'Secure Advisory Channel'
        }
    },
    {
        page: 'contact',
        section: 'info-section',
        content: {
            wa_title: 'Vanguard Support',
            wa_badge: 'SLA: 60 MIN PROTOCOL',
            wa_num: '+91 93772 77703',
            email_title: 'Global Registry',
            email_time: 'Mon-Sat | 10:00 - 18:00 IST',
            email_val: 'info@wcfw.in',
            security_badge: 'Institutional Grade Security',
            security_text: 'All transmission telemetry is encrypted and handled under strict confidentiality protocol.'
        }
    },

    // --- SERVICES PAGE ---
    {
        page: 'services',
        section: 'hero',
        content: {
            badge: 'Our Methodology',
            title: 'Precision Advisory.',
            description: "We don't just sell products; we engineer outcomes. Our services are the components of your financial freedom architecture."
        }
    },
    {
        page: 'services',
        section: 'edge-section',
        content: {
            title: 'The WCFW Edge',
            description: 'Beyond numbers, we manage the behavior that determines wealth.'
        }
    },
    {
        page: 'services',
        section: 'faq-section',
        content: {
            title: 'Clarifying Complexities'
        }
    },
    {
        page: 'services',
        section: 'cta-section',
        content: {
            title: 'Start Your Elite Journey',
            description: 'Unlock institutional-grade wealth management starting today. Your future self will thank you.'
        }
    },

    // --- PRIVACY POLICY ---
    {
        page: 'privacy-policy',
        section: 'hero',
        content: {
            badge: 'Institutional Data Governance',
            title: 'Privacy Policy.',
            description: "Transparency is the cornerstone of institutional trust. We protect your binary coordinates with military-grade encryption protocols."
        }
    },
    {
        page: 'privacy-policy',
        section: 'policy-intro',
        content: {
            version: 'Protocol V2.4',
            date: 'Active Deployment: Oct 3, 2025',
            text: 'This privacy directive establishes the architecture for how <span class="text-slate-900 font-black underline decoration-orange-500/30">We Care Freedom Wealth</span> manages and safeguards sovereign data shared via our digital terminal. We are committed to maintaining clinical confidentiality.'
        }
    },
    {
        page: 'privacy-policy',
        section: 'section-1',
        content: {
            title: 'Institutional Commitment',
            text: "Our relationship is anchored in structural trust. In the course of executing financial directives, we access sovereign data. We utilize redundant security layers and managerial safeguards to ensure peak protection."
        }
    },
    {
        page: 'privacy-policy',
        section: 'section-2',
        content: {
            title: 'Data Capture Topology',
            text: 'We capture legal coordinates, consultation directives, and binary telemetry to optimize your wealth journey.'
        }
    },
    {
        page: 'privacy-policy',
        section: 'section-3',
        content: {
            title: 'Encryption Architecture',
            text: "To prevent terminal compromise, we implement 256-bit institutional encryption and secure hosting clusters with real-time backups. No client data is transmitted to third-party nodes without hyper-explicit consent."
        }
    },
    {
        page: 'privacy-policy',
        section: 'section-4',
        content: {
            title: 'Visual & GEO Telemetry',
            text: "With your authorization, our terminal may interface with optics/gallery for Video KYC and document verification. GEO coordinates may be utilized for jurisdiction-specific regulatory authentication."
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

        console.log('✅ Synchronized proper data entry complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
}

seed();
