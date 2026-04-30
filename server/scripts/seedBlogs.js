const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Blog = require('../models/Blog');

const blogs = [
    {
        title: "Goal-Based Financial Planning: A Smart Way to Secure Your Financial Future",
        slug: "goal-based-planning-wealth",
        summary: "In an era of rising living costs, market volatility, and changing lifestyles, managing money without a clear direction can create long-term uncertainty. A structured and well-thought-out financial approach helps bring clarity, confidence, and control over personal finances.",
        content: `In an era of rising living costs, market volatility, and changing lifestyles, managing money without a clear direction can create long-term uncertainty. Many individuals invest regularly but still feel unsure about whether their financial decisions truly support their future needs. A structured and well-thought-out financial approach helps bring clarity, confidence, and control over personal finances.

At We Care Freedom Wealth, financial planning focuses on aligning investments with real-life objectives such as family security, lifestyle goals, and long-term financial stability. A purpose-driven approach ensures that money is not just invested, but invested wisely.

What Is Goal-Based Financial Planning?
Goal-Based Financial Planning is a strategic approach where financial decisions are made based on clearly defined life goals rather than short-term market trends or random investment choices.

Each financial goal is planned by considering three essential elements:
1. The amount required
2. The time frame to achieve it
3. The individual’s risk tolerance

Why Is Goal-Based Financial Planning Important?
A structured financial plan provides direction and reduces uncertainty. Goal-Based Financial Planning helps individuals remain disciplined, even during market fluctuations, by keeping the focus on long-term outcomes rather than short-term volatility.

How to Set Financial Goals Effectively:
1. Identify Personal and Family Objectives: Creating an emergency fund, planning for children’s education, purchasing a home, or building a retirement corpus.
2. Categorize Goals Based on Time Horizon:
   - Short-term: Up to 3 years
   - Medium-term: 3 to 7 years
   - Long-term: More than 7 years
3. Estimate Goal Cost and Consider Inflation: Accurate estimation is essential. Inflation must be factored in.

Investment Options for Goal-Based Financial Planning:
- Mutual Funds and SIPs: Offer diversification and professional management.
- Equity and Stock Investments: Suitable for individuals with a higher risk appetite.
- Insurance and Tax Planning: Safeguards goals against unforeseen risks.

How to Monitor and Review Your Financial Plan:
Financial planning is not a one-time activity. Regular monitoring ensures that investments remain aligned with changing goals and market conditions. through professional Wealth Management Services, portfolios can be reviewed and adjusted.`,
        author: "We Care Team",
        image: "/uploads/blogs/goal-based-investing.png",
        tags: ["Financial Planning", "Wealth"],
        isPublished: true,
        metaTitle: "Goal-Based Financial Planning for Long-Term Wealth | We Care Finance",
        metaDescription: "Learn how goal-based financial planning helps you invest wisely, manage risk, and achieve long-term wealth with expert guidance from We Care.",
        faq: [
            { question: "What is goal-based financial planning?", answer: "Goal-Based Financial Planning is a method where investments are aligned with specific life goals, defined timelines, and suitable risk levels." },
            { question: "Who should consider goal-based financial planning?", answer: "Working professionals, business owners, families, and retirees can all benefit from structured financial planning." }
        ]
    },
    {
        title: "Mutual Fund: A Smart Investment Option to Grow Your Wealth",
        slug: "mutual-fund-guide",
        summary: "Investing your money wisely is crucial to secure financial growth and achieve your life goals. One of the most effective and popular investment options available today is a Mutual Fund.",
        content: `Investing your money wisely is crucial to secure financial growth and achieve your life goals. One of the most effective and popular investment options available today is a Mutual Fund. Unlike traditional savings, a Mutual Fund pools money from multiple investors and invests it in diversified assets such as stocks, bonds, and other securities.

At We Care Freedom Wealth, we help investors choose the right Mutual Fund schemes that match their risk appetite, investment horizon, and financial goals, ensuring disciplined and goal-oriented wealth creation.

What Is a Mutual Fund?
A Mutual Fund is an investment vehicle managed by professional fund managers, where money from multiple investors is combined and invested in a diversified portfolio of assets. Investors receive units proportional to their investment, and returns depend on the performance of the underlying assets.

Why Should You Invest in a Mutual Fund?
1. Diversification: Reduces risk by spreading investments across multiple assets.
2. Professional Management: Experienced fund managers make investment decisions.
3. Flexibility: Various schemes for different risk profiles.
4. Accessibility: Small investors can participate in large financial markets.

Types of Mutual Funds:
- Equity Mutual Funds: Invest primarily in stocks for long-term growth.
- Debt Mutual Funds: Invest in fixed-income securities for stable returns.
- Hybrid Mutual Funds: Combine equity and debt for balanced risk/reward.
- Index and Sector Funds: Track a specific market index or sector.

How to Choose the Right Mutual Fund:
1. Assess Your Financial Goals.
2. Determine Your Risk Appetite.
3. Evaluate Fund Performance.
4. Review Costs and Fees (Expense Ratios).

Conclusion:
Mutual Fund investments are a convenient, professional, and flexible way to build long-term wealth. By aligning the right Mutual Fund schemes with your financial goals, you can achieve financial stability.`,
        author: "We Care Team",
        image: "/uploads/blogs/mutual-funds.png",
        tags: ["Investing", "Mutual Funds"],
        isPublished: true,
        metaTitle: "Mutual Fund Investment for Long-Term Wealth | We Care Finance",
        metaDescription: "Discover how investing in Mutual Funds helps you diversify, manage risk, and grow wealth with expert guidance from We Care.",
        faq: [
            { question: "What is a Mutual Fund?", answer: "A Mutual Fund is an investment vehicle where money from multiple investors is pooled and invested in a diversified portfolio managed by professional fund managers." },
            { question: "What are the different types of Mutual Funds?", answer: "Equity, Debt, Hybrid, Index, and Sector funds cater to different risk profiles." }
        ]
    },
    {
        title: "Direct Equities: A Powerful Way to Build Long-Term Wealth",
        slug: "direct-equities-wealth",
        summary: "In today’s financial world, investors are constantly searching for smarter ways to grow their wealth. Direct Equities become a powerful investment option for those seeking higher returns.",
        content: `In today’s financial world, investors are constantly searching for smarter ways to grow their wealth. While mutual funds and fixed-income instruments provide stability, many investors also look for opportunities that offer higher returns and long-term capital appreciation. This is where Direct Equities become a powerful investment option.

What Are Direct Equities?
Direct Equities refer to investments where an individual purchases shares of a company directly through the stock market. Unlike mutual funds, where money is pooled and managed by a fund manager, direct equity investors have full control over which stocks they buy and sell. When you invest in direct equities, you become a partial owner of that company.

Why Should You Consider Direct Equities?
- Higher Growth Potential: Historically delivered better returns over the long term.
- Ownership & Transparency: Full visibility into where the money is invested.
- Portfolio Customization: Build portfolios based on sectors or growth stocks.
- Liquidity Advantage: Stocks can be bought and sold easily.

Who Should Invest in Direct Equities?
- Working professionals seeking long-term wealth creation.
- Business owners looking to diversify.
- Investors with medium-to-high risk tolerance.
- Individuals planning for retirement.

How to Build a Smart Portfolio:
1. Define Investment Goals.
2. Understand Risk Tolerance.
3. Diversify Across Sectors (Banking, IT, Pharma, FMCG).
4. Focus on Fundamentals (Company performance, earnings).
5. Invest with a Long-Term View.

Mistakes to Avoid:
- Investing without research.
- Overtrading and reacting emotionally.
- Lack of diversification.
- Following market tips and rumors.

Conclusion:
Direct equity investing is one of the most powerful tools for long-term wealth creation. With the right strategy, disciplined investing, and professional guidance, investors can achieve strong financial growth.`,
        author: "We Care Team",
        image: "/uploads/blogs/stocks.png",
        tags: ["Equities", "Stocks"],
        isPublished: true,
        metaTitle: "Direct Equities Investment for Wealth Growth | We Care Freedom Wealth",
        metaDescription: "Explore how Direct Equities help investors build wealth, earn higher returns, and create a strong long-term portfolio.",
        faq: [
            { question: "What are Direct Equities?", answer: "Direct Equities refer to investments where an individual purchases shares of a company directly through the stock market." }
        ]
    }
];

const seedBlogs = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for Blog Seeding');

        for (const blog of blogs) {
            await Blog.findOneAndUpdate(
                { slug: blog.slug },
                blog,
                { upsert: true, new: true }
            );
            console.log(`Seeded Blog: ${blog.title}`);
        }

        console.log('✅ Blogs Seeding complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Blogs Seeding failed:', err);
        process.exit(1);
    }
};

seedBlogs();
