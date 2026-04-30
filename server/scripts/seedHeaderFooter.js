const mongoose = require('mongoose');
require('dotenv').config();

const PageContent = mongoose.model('PageContent', new mongoose.Schema({
    page: String,
    section: String,
    content: mongoose.Schema.Types.Mixed
}));

const headerFooterData = [
    // Header Content
    {
        page: 'header',
        section: 'main',
        content: {
            logoAlt: 'WCFW Logo',
            loginUrl: 'https://login.wcfw.in/',
            loginText: 'Login',
            tagline: 'Serving families since 1989'
        }
    },
    // Footer Content
    {
        page: 'footer',
        section: 'company-info',
        content: {
            logoAlt: 'WeCare Freedom Wealth',
            description: 'Your trusted partner in financial growth. We help you build wealth through smart investment strategies and personalized financial solution.'
        }
    },
    {
        page: 'footer',
        section: 'offices',
        content: {
            list: [
                {
                    title: "Anand Office",
                    address: "312 - 316, 3rd Floor, Krishna Shrey Complex, Nr. Sanket Sales, Raj Marg, Anand - 388001",
                    phone: "+91 98201 35296 , +91 93772 77703",
                    email: "info@wcfw.in"
                },
                {
                    title: "Vadodara Office",
                    address: "304-305-306, The Park, Above Nexa Car Showroom, Opp. Blue Lagoon Restaurant, Akshar Chowk, Old Padra Road, Vadodara - 390 020",
                    phone: "+91 98241 43812 , +91 93772 77703",
                    email: "tushar@wcfw.in, vadodara@wcfw.in"
                },
                {
                    title: "Ahmedabad Branch Office",
                    address: "301, 3rd floor, Avani 1, Besides JMC House, Nr Panmal Garden, Off C.G Road, Ahmedabad - 380 006",
                    phone: "+91 78430 47366 , +91 93772 77703",
                    email: "ahmedabad@wcfw.in, info@wcfw.in"
                },
                {
                    title: "Delhi Branch Office",
                    address: "505, 5th Floor, Mansarover Building, Nehru Place, New Delhi-110019",
                    phone: "+91 98100 31561 , +91 84870 68946",
                    email: "pravin@wcfw.in, info@wcfw.in"
                }
            ]
        }
    },
    {
        page: 'footer',
        section: 'quick-links',
        content: {
            list: [
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Our Services", path: "/services" },
                { name: "Knowledge Hub", path: "/blog" },
                { name: "Videos", path: "/videos" },
                { name: "Calculators", path: "/calculators" },
                { name: "Contact Us", path: "/contact" },
                { name: "Login", path: "/login" }
            ]
        }
    },
    {
        page: 'footer',
        section: 'tools',
        content: {
            list: [
                { name: "SIP Calculator", path: "/calculator/sip" },
                { name: "Lumpsum Calculator", path: "/calculator/lumpsum" },
                { name: "Retirement Calculator", path: "/calculator/retirement" },
                { name: "Tax Calculator", path: "/calculator/tax" }
            ],
            exploreMoreText: "Explore More Calculators",
            exploreMorePath: "/calculators"
        }
    },
    {
        page: 'footer',
        section: 'footer-services',
        content: {
            list: [
                { name: "Mutual Funds", path: "/services/mutual-fund" },
                { name: "Life Insurance", path: "/services/life-insurance" },
                { name: "Goal-Based Investing", path: "/services/goal-base-investing" },
                { name: "Tax Solution", path: "/services/tax-solution" },
                { name: "Stocks & Equity", path: "/services/stocks" },
                { name: "Fixed Deposits", path: "/services/fixed-deposit" }
            ]
        }
    },
    {
        page: 'footer',
        section: 'social-links',
        content: {
            list: [
                { name: 'Facebook', href: 'https://www.facebook.com/wecarefreedom' },
                { name: 'Twitter', href: 'https://x.com/we_care_invest' },
                { name: 'LinkedIn', href: 'https://www.linkedin.com/company/we-care-freedom/' },
                { name: 'Instagram', href: 'https://www.instagram.com/wecarefreedomwealth/' },
                { name: 'YouTube', href: 'https://www.youtube.com/@wecarefreedomwealth' }
            ]
        }
    },
    {
        page: 'footer',
        section: 'market-indices',
        content: {
            list: [
                { name: 'NSE', link: 'https://www.nseindia.com/' },
                { name: 'BSE', link: 'https://www.bseindia.com/' },
                { name: 'SEBI', link: 'https://www.sebi.gov.in/' },
                { name: 'RBI', link: 'https://www.rbi.org.in/' },
                { name: 'CDSL', link: 'https://www.cdslindia.com/' },
                { name: 'NCDEX', link: 'https://www.ncdex.com/' },
                { name: 'MCX', link: 'https://www.mcxindia.com/' }
            ]
        }
    },
    {
        page: 'footer',
        section: 'legal-info',
        content: {
            riskFactors: 'Investments in Mutual Funds are subject to Market Risks. Read all scheme related documents carefully before investing. Mutual Fund Schemes do not assure or guarantee any returns. Past performances of any Mutual Fund Scheme may or may not be sustained in future. There is no guarantee that the investment objective of any suggested scheme shall be achieved. All existing and prospective investors are advised to check and evaluate the Exit loads and other exit structure and TER applicable at the time of making the investment before finalizing on any investment decision for Mutual Funds schemes. We deal in Regular Solutions only for Mutual Fund Schemes and earn a Trailing Commission on client investments. Disclosure For Commission earnings is made to clients at the time of investments. Option of Direct Solution for every Mutual Fund Scheme is available to investors offering advantage of lower expense ratio. We are not entitled to earn any commission on Direct Solutions. Hence we do not deal in Direct Solutions.',
            amfiInfo: 'AMFI Registered Mutual Fund Distributor | ARN: 249212 | Date of Registration: 26/07/2025 | Current Validity: 25/05/2028',
            copyrightText: '© Copyright 2020. All Rights Reserved.',
            grievanceInfo: 'For any Grievance do contact on Mobile Number and Email id of We Care Customer care: Hetal Maheta: 93772 77703 and 9824129366 mail is info@wcfw.in'
        }
    },
    {
        page: 'footer',
        section: 'bottom-bar',
        content: {
            copyright: '© 2025 We Care Freedom Wealth. All Rights Reserved',
            designedBy: 'Designed by AinaTech Services LLP',
            designedByUrl: 'https://ainatech.in'
        }
    }
];

async function seedHeaderFooter() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        for (const data of headerFooterData) {
            await PageContent.findOneAndUpdate(
                { page: data.page, section: data.section },
                data,
                { upsert: true, new: true }
            );
            console.log(`Seeded: ${data.page} / ${data.section}`);
        }

        console.log('✅ Header and Footer seeding complete!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seedHeaderFooter();
