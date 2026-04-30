const mongoose = require('mongoose');
require('dotenv').config({ path: './server/.env' });
const PageContent = require('../models/PageContent');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wcfw';

const servicesData = [
  {
    page: 'goal-base-investing',
    sections: [
      {
        section: '_seo',
        content: {
          title: "Smart Goal-Based Investing | We Care Freedom Wealth",
          description: "Smart goal-based investing solutions to help you plan, invest, and achieve life goals with clarity, discipline, and long-term financial security.",
          robotsTag: "index, follow"
        }
      },
      {
        section: 'hero',
        content: {
          badge: "Strategy First",
          title: "Goal-Based Architecture",
          description: "Transcend generic investing. We architect bespoke financial frameworks designed to deliver absolute certainty for your life's most ambitious milestones.",
          ctaText: "Start Architecting",
          ctaLink: "/contact"
        }
      },
      {
        section: 'philosophy',
        content: {
          title: "The Philosophy of Intentional Wealth",
          description: "Traditional investing focuses on market benchmarks—we focus on your life metrics. Goal-based investing is the science of aligning capital deployment with temporal needs, ensuring your money is exactly where it needs to be, right when you need it.",
          benefits: [
            { title: "Precision Targeting", text: "Move beyond generic benchmarks to achieve specific, quantifiable life milestones." },
            { title: "Dynamic Allocation", text: "Asset allocation that evolves based on your proximity to the target goal date." },
            { title: "Tax Optimization", text: "Structuring investments to maximize post-tax returns across different goal horizons." },
            { title: "Behavioral Alpha", text: "Maintaining discipline during market stress by tethering investments to tangible goals." }
          ]
        }
      },
      {
        section: 'goals-matrix',
        content: {
          title: "Strategic Milestones",
          subtitle: "Tailored architectures for every phase of your financial evolution.",
          list: [
            { title: "Dream Home Acquisition", description: "Capital deployment strategies tailored for high-value real estate acquisition and legacy building.", timeline: "5-10 Years" },
            { title: "Global Education Provision", description: "Ensuring unrestricted access to world-class education through inflation-adjusted corpus building.", timeline: "10-15 Years" },
            { title: "Legacy Celebrations", description: "Strategic wealth accumulation for significant life milestones and multi-generational celebrations.", timeline: "15-20 Years" },
            { title: "Financial Independence", description: "Advanced retirement architectures designed for absolute freedom and perpetual cash flow.", timeline: "20+ Years" },
            { title: "Liquidity Reserve", description: "Institutional-grade emergency reserves providing absolute security against market volatility.", timeline: "Immediate" },
            { title: "Alpha Wealth Creation", description: "Aggressive wealth compounding strategies focused on high-conviction growth opportunities.", timeline: "15+ Years" }
          ]
        }
      },
      {
        section: 'framework',
        content: {
          title: "The Implementation Framework",
          subtitle: "A rigorous process designed for absolute goal attainment.",
          steps: [
            { step: "01", title: "Vision Clarification", description: "Deep-dive analysis to quantify your aspirations into actionable financial targets." },
            { step: "02", title: "Gap Stratification", description: "Computational assessment of current assets against future liabilities and requirements." },
            { step: "03", title: "Architecture Design", description: "Bespoke investment blueprinting using advanced asset correlation models." },
            { step: "04", title: "Execution & Flow", description: "Systematic capital deployment into optimized vehicles with automated rebalancing." },
            { step: "05", title: "Performance Audit", description: "Continuous monitoring and strategic pivots to ensure 100% goal attainment probability." }
          ]
        }
      },
      {
        section: 'cta',
        content: {
          title: "Ready to Architect Your Financial Future?",
          description: "Join the elite group of investors who prioritize certainty over speculation. Start your goal-based journey today.",
          ctaText: "Secure My Future",
          ctaLink: "/contact"
        }
      }
    ]
  },
  {
    page: 'mutual-fund',
    sections: [
      {
        section: '_seo',
        content: {
          title: "Mutual Fund Advisory Services | We Care Freedom Wealth",
          description: "Expert mutual fund advisory services to help you invest smartly, manage risk, and achieve long-term financial goals with We Care Freedom Wealth.",
          robotsTag: "index, follow"
        }
      },
      {
        section: 'hero',
        content: {
          badge: "Institutional Wealth Management",
          title: "Mutual Fund Alpha.",
          description: "Engineered for growth. We provide access to diversified, professional management strategies that transform capital into sustainable long-term wealth.",
          stats: [
            { val: "1000+", label: "Asset Vehicles" },
            { val: "12-15%", label: "Target CAGR" },
            { val: "₹500", label: "Entry Protocol" }
          ]
        }
      },
      {
        section: 'value-section',
        content: {
          title: "Professional Wealth Aggregation",
          description: "Mutual funds pool institutional capital to access high-grade diversified portfolios. Managed by tenure-tracked fund managers, these vehicles provide retail investors with elite-level asset management.",
          secondary_text: "Our mandates focus on risk mitigation and alpha generation, ensuring your capital is deployed where it has the highest probability of fulfillment.",
          insight_title: "Strategic Insight",
          insight_text: "A systematic SIP of ₹10,000/month for 15 years can potentially build a corpus of over ₹50 Lakhs, harnessing the relentless power of compounding.",
          benefits: [
            "Professional institutional fund management",
            "Deep cross-sector asset diversification",
            "Liquid redemption cycles with high transparency",
            "Tax-advantaged structures (ELSS & Indexation)",
            "Systematic compounding through SIP protocols",
            "Strict regulatory oversight and audit trails"
          ]
        }
      },
      {
        section: 'cta-section',
        content: {
          title: "Initiate Capital Compounding",
          description: "Secure your future wealth with institutional fund strategies. Minimum entry from ₹500/month.",
          ctaText: "Contact Portfolio Desk",
          ctaLink: "/contact"
        }
      }
    ]
  },
  {
    page: 'stocks',
    sections: [
      {
        section: '_seo',
        content: {
          title: "Strategic Equity Investments | We Care Freedom Wealth",
          description: "Strategic equity investments designed for long-term wealth creation with expert research, disciplined strategies, and risk-aware planning.",
          robotsTag: "index, follow"
        }
      },
      {
        section: 'hero',
        content: {
          badge: "Equity Supremacy",
          title: "Strategic Equities.",
          description: "Own the future. We provide research-backed, high-conviction stock strategies designed to outperform benchmarks and build generational wealth.",
          stats: [
            { val: "5000+", label: "Active Listings" },
            { val: "20%+", label: "Target Alpha" },
            { val: "Expert", label: "Portfolio Desk" }
          ]
        }
      },
      {
        section: 'value-section',
        content: {
          title: "Harnessing Business Growth",
          description: "Direct equity investing is the most powerful engine for long-term wealth creation. By owning shares in high-performing companies, you participate directly in their profit and growth trajectories.",
          secondary_text: "Our institutional-grade research identifies value before the market, ensuring your portfolio is positioned in the tomorrow's leaders today.",
          insight_text: "Time in the market beats timing the market. Our philosophy prioritizes fundamental strength over transitory volatility.",
          benefits: [
            "Superior long-term capital appreciation",
            "Direct ownership in high-growth enterprises",
            "Consistent dividend-based passive income",
            "T+2 liquidity with deep market depth",
            "Strategic hedge against systemic inflation",
            "Agile portfolio diversification opportunities"
          ]
        }
      },
      {
        section: 'market-segmentation',
        content: {
          title: "Market Infrastructure",
          list: [
            { title: "Large Cap Bluechips", description: "Industry titans with market cap exceeding ₹20,000 Cr. Peak stability and dividend yield.", risk: "Low to Medium", returns: "10-12% p.a." },
            { title: "Mid Cap Growth", description: "High-potential companies with market cap ₹5,000-20,000 Cr. The engines of wealth creation.", risk: "Medium to High", returns: "12-15% p.a." },
            { title: "Small Cap Alpha", description: "Emerging niche leaders with market cap < ₹5,000 Cr. Maximum growth potential for aggressive portfolios.", risk: "High", returns: "15-20% p.a." }
          ]
        }
      },
      {
        section: 'approach',
        content: {
          title: "Portfolio Execution",
          steps: [
            { step: "01", title: "Fundamental Audit", description: "Bottom-up analysis of financial health, Moat, and management tenure." },
            { step: "02", title: "Technical Sizing", description: "Optimizing entry and exit windows using price-action and trend analytics." },
            { step: "03", title: "Sector Rotation", description: "Strategic allocation across high-alpha sectors and market caps." },
            { step: "04", title: "Patience Protocol", description: "Long-term compounding focus to override transitory market noise." }
          ]
        }
      },
      {
        section: 'risk-mandate',
        content: {
          title: "Risk Mandate",
          risks: [
            "Inherent market volatility and cyclicality",
            "Company-specific operational and fiscal risks",
            "Macro-economic and geopolitical shifts",
            "Requirement for active monitoring and research",
            "Potential for short-term capital drawdown"
          ],
          regulatory: "Stock market investments are subject to market risks. Past performance is not indicative of future returns."
        }
      },
      {
        section: 'cta',
        content: {
          title: "Access Quant Research",
          description: "Schedule a technical audit of your existing portfolio or initiate a research-backed mandate.",
          ctaText: "Contact Equity Desk",
          ctaLink: "/contact"
        }
      }
    ]
  },
  {
    page: 'life-insurance',
    sections: [
        {
          section: '_seo',
          content: {
            title: "Life Insurance Services in India | We Care Freedom Wealth",
            description: "Secure your family’s future with expert life insurance services in India. We Care Freedom Wealth offers trusted guidance for complete financial protection.",
            robotsTag: "index, follow"
          }
        },
        {
          section: 'hero',
          content: {
            badge: "Risk Management Protocol",
            title: "Legacy Protection.",
            description: "Engineering resilience. We architect comprehensive insurance frameworks designed to safeguard your family's financial sovereignty against life's unpredictable volatilities.",
            stats: [
              { val: "₹1Cr+", label: "Base Sum Assured" },
              { val: "20+", label: "Solution Architectures" },
              { val: "100%", label: "Settlement Focus" }
            ]
          }
        },
        {
          section: 'value-section',
          content: {
            title: "Safeguarding Generational Assets",
            description: "Life insurance is the primary pillar of a robust wealth mandate. It ensures that your architectural goals for your family remain intact, regardless of personal absence.",
            secondary_text: "We utilize high-alpha protection strategies that maximize coverage-to-premium ratios, ensuring your capital is efficiently deployed for both safety and growth.",
            insight_text: "Adequate term protection should represent at least 15-20x of your annual burn rate to ensure true income replacement.",
            benefits: [
              "Sovereign-grade financial security for beneficiaries",
              "Optimized tax shields under Section 80C & 10(10D)",
              "Psychological sovereignty through crisis readiness",
              "Institutional-grade premiums for elite-level coverage",
              "Integrated critical illness and accidental riders",
              "Maturity-based capital recovery in specific mandates"
            ]
          }
        },
        {
          section: 'insurance-matrix',
          content: {
            title: "Insurance Architecture",
            list: [
              { title: "Term Life Protection", description: "Pure institutional protection offering high-sum assured at minimal cost.", coverage: "₹1 Crore - ₹10 Crore+" },
              { title: "Critical Illness Shield", description: "Comprehensive medical coverage for high-burn life events and surgeries.", coverage: "₹5 Lakh - ₹1 Crore" },
              { title: "Hybrid Wealth Solutions", description: "Dynamic capital growth coupled with sovereign-grade life protection.", coverage: "Customizable" }
            ]
          }
        },
        {
          section: 'rationale',
          content: {
            title: "The Protection Rationale",
            list: [
              { title: "Income Recovery", description: "Ensures systemic stability during primary earner transitions." },
              { title: "Debt Liquidation", description: "Proactive shielding against outstanding fiscal liabilities." },
              { title: "Legacy Preservation", description: "Achieving multi-generational goal fulfillment protocols." },
              { title: "Retirement Yield", description: "Structured pension-equivalent benefits in later cycles." }
            ]
          }
        },
        {
          section: 'cta',
          content: {
            title: "Execute Protection Mandate",
            description: "Secure your family's future with institutional-grade coverage. Our desks will audit your current protection gap.",
            ctaText: "Contact Protection Desk",
            ctaLink: "/contact"
          }
        }
      ]
  },
  {
    page: 'fixed-deposit',
    sections: [
      {
        section: '_seo',
        content: {
          title: "Fixed Deposit Investment Services | We Care Freedom Wealth",
          description: "Secure your savings with fixed deposit investment services from We Care Freedom Wealth, offering safe returns, stability, and expert financial guidance.",
          robotsTag: "index, follow"
        }
      },
      {
        section: 'hero',
        content: {
          badge: "Capital Preservation",
          title: "Fixed Deposits.",
          description: "Fortress safety. We curate the highest-yielding fixed-income instruments to provide guaranteed returns with absolute capital security.",
          stats: [
            { val: "7-9%", label: "Yield Range" },
            { val: "100%", label: "Capital Shield" },
            { val: "T+0", label: "Access Grade" }
          ]
        }
      },
      {
        section: 'value-section',
        content: {
          title: "Sovereign Grade Asset Shield",
          description: "Fixed Deposits remain the bedrock of a conservative wealth strategy. By locking in predetermined yields, you eliminate market volatility from your core capital reserves.",
          secondary_text: "We aggregate multiple institutional offerings to ensure your cash-flow laddering is optimized for both liquidity and maximum compounded growth.",
          insight_text: "Senior citizens typically qualify for a 50bps yield modifier, significantly enhancing the real rate of return on long-tenure instruments.",
          benefits: [
            "Sovereign-grade capital protection protocols",
            "Deterministic yield with zero market volatility",
            "Granular tenure flexibility for cash-flow matching",
            "Structured liquidity through interest payout options",
            "Collateralized loan facility availability",
            "Enhanced yield modifiers for senior citizens"
          ]
        }
      },
      {
        section: 'deposit-architecture',
        content: {
          title: "Deposit Architecture",
          list: [
            { title: "Tier-1 Bank Deposits", description: "Traditional FDs with highest safety ratings and guaranteed capital protection.", tenure: "7 days to 10 years", returns: "5-8% p.a." },
            { title: "Corporate FD Strips", description: "High-yield deposits from top-rated corporates offering superior alpha.", tenure: "1 to 5 years", returns: "7-9% p.a." },
            { title: "Tax-Shielded Deposits", description: "5-year lock-in instruments eligible for Section 80C fiscal benefits.", tenure: "5 years", returns: "6-8% p.a." }
          ],
          features: [
            { title: "Asset Security", description: "Bank deposits insured up to ₹5 Lakh via DICGC frameworks." },
            { title: "On-Demand Liquidity", description: "Premature withdrawal options for emergency capital needs." },
            { title: "Strategic Compounding", description: "Choose between cumulative growth or regular income." }
          ]
        }
      },
      {
        section: 'risk-matrix',
        content: {
          title: "Risk Matrix Audit",
          considerations: [
            "Interest accruals are subject to marginal tax slab rates",
            "Yield profiles may trail active inflation benchmarks",
            "Premature liquidation typically incurs a minimal penalty",
            "Concentration risk in corporate instruments requires audit",
            "TDS thresholds apply beyond specific interest milestones"
          ]
        }
      },
      {
        section: 'cta',
        content: {
          title: "Compare Yield Spreads",
          description: "Optimize your cash reserves. Compare real-time FD rates across leading institutional partners.",
          ctaText: "Initiate FD Audit",
          ctaLink: "/contact"
        }
      }
    ]
  },
  {
    page: 'tax-solution',
    sections: [
      {
        section: '_seo',
        content: {
          title: "Tax Saving & Financial Planning Solutions | We Care Freedom Wealth",
          description: "Optimize your tax liabilities and maximize savings with expert tax-saving solutions and strategic financial planning from We Care Freedom Wealth.",
          robotsTag: "index, follow"
        }
      },
      {
        section: 'hero',
        content: {
          badge: "Fiscal Resource Optimization",
          title: "Tax Sovereignty.",
          description: "Retain your wealth. We engineer strategic tax-saving mandates that legally minimize liabilities while accelerating your long-term capital accumulation.",
          stats: [
            { val: "₹1.5L+", label: "Base Deductions" },
            { val: "30%", label: "Potential Tax Save" },
            { val: "Tier-A", label: "Compliance Grade" }
          ]
        }
      },
      {
        section: 'value-section',
        content: {
          title: "Professional Fiscal Engineering",
          description: "Tax solution is the architectural analysis of your financial structure to ensure maximum fiscal efficiency. It is the legal pathway to minimizing liabilities and redeploying that capital into growth engines.",
          secondary_text: "Our mandates focus on utilizing every available provision of the Income Tax Act to shield your earnings and maximize your net generational wealth.",
          insight_text: "Effective tax solution should initiate in April, not March. Strategic asset-location over 12 months improves IRR by up to 2.5%.",
          benefits: [
            "Systemic reduction of gross tax outflow",
            "Maximization of net investible take-home capital",
            "Seamless integration with wealth creation cycles",
            "Deterministic solution for high-value fiscal goals",
            "Optimized asset-location strategies",
            "Rigorous adherence to legislative frameworks"
          ]
        }
      },
      {
        section: 'fiscal-shield',
        content: {
          title: "Fiscal Shield Framework",
          list: [
            { title: "Section 80C Protocols", description: "Deduction optimization up to ₹1.5 Lakh.", instruments: ["ELSS (Tax-Saving Equities)", "PPF & EPF Multipliers", "Life Insurance Premiums", "Sovereign NSC Strips"] },
            { title: "Section 80D Health Shield", description: "Medical premium fiscal deductions.", instruments: ["Up to ₹25,000 for self/family", "Up to ₹50,000 for senior citizens", "Preventive check-up modifiers"] },
            { title: "NPS Alpha (80CCD)", description: "Additional ₹50,000 retail deduction.", instruments: ["National Pension System (Tier 1)", "Exclusive over-and-above 80C", "Market-linked growth engines"] },
            { title: "Section 24(b) Leverage", description: "Home loan interest fiscal shields.", instruments: ["Up to ₹2 Lakh for self-occupied", "Interest deduction on acquisition", "Principal recovery via 80C"] }
          ]
        }
      },
      {
        section: 'advisory-pillars',
        content: {
          title: "Tax Advisory Pillars",
          list: [
            { title: "Assurance & Filing", description: "Institutional-grade ITR audit and multi-source documentation." },
            { title: "Fiscal Optimization", description: "Strategic modelling to identify every possible deduction path." },
            { title: "Yield Architecture", description: "Aligning tax saves with high-CAGR growth vehicles." },
            { title: "Entity Compliance", description: "Ensuring end-to-end alignment with CBDT regulations." }
          ]
        }
      },
      {
        section: 'cta',
        content: {
          title: "Initiate Fiscal Audit",
          description: "Optimize your tax exposure. Schedule a consultation with our fiscal advisory desk.",
          ctaText: "Contact Tax Desk",
          ctaLink: "/contact"
        }
      }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const service of servicesData) {
      console.log(`Seeding page: ${service.page}`);
      for (const section of service.sections) {
        await PageContent.findOneAndUpdate(
          { page: service.page, section: section.section },
          { content: section.content },
          { upsert: true, new: true }
        );
      }
    }

    console.log('Service detailed content seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
