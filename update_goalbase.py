import re

with open('src/pages/services/GoalBaseInvesting.jsx', 'r') as f:
    content = f.read()

# 1. Imports
content = content.replace("import useMetaTags from '../../hooks/useMetaTags';", 
"""import useMetaTags from '../../hooks/useMetaTags';
import useCMSContent from '../../hooks/useCMSContent';""")

# 2. Add CMS hook and update arrays
content = content.replace("""const GoalBaseInvesting = () => {
    useMetaTags(
        "Smart Goal-Based Investing | We Care Freedom Wealth",
        "Smart goal-based investing solutions to help you plan, invest, and achieve life goals with clarity, discipline, and long-term financial security."
    );

    const goals = [
        {
            icon: FaHome,
            title: "Dream Home Acquisition",
            description: "Capital deployment strategies tailored for high-value real estate acquisition and legacy building.",
            timeline: "5-10 Years",
            color: "from-orange-500 to-red-500",
            link: "/goals/dream-home"
        },
        {
            icon: FaGraduationCap,
            title: "Global Education Provision",
            description: "Ensuring unrestricted access to world-class education through inflation-adjusted corpus building.",
            timeline: "10-15 Years",
            color: "from-blue-500 to-indigo-600",
            link: "/goals/child-education"
        },
        {
            icon: FaRing,
            title: "Legacy Celebrations",
            description: "Strategic wealth accumulation for significant life milestones and multi-generational celebrations.",
            timeline: "15-20 Years",
            color: "from-purple-500 to-pink-500",
            link: "/goals/child-wedding"
        },
        {
            icon: FaUmbrella,
            title: "Financial Independence",
            description: "Advanced retirement architectures designed for absolute freedom and perpetual cash flow.",
            timeline: "20+ Years",
            color: "from-emerald-500 to-teal-600",
            link: "/goals/retirement"
        },
        {
            icon: FaShieldAlt,
            title: "Liquidity Reserve",
            description: "Institutional-grade emergency reserves providing absolute security against market volatility.",
            timeline: "Immediate",
            color: "from-amber-400 to-orange-500",
            link: "/goals/emergency-fund"
        },
        {
            icon: FaChartLine,
            title: "Alpha Wealth Creation",
            description: "Aggressive wealth compounding strategies focused on high-conviction growth opportunities.",
            timeline: "15+ Years",
            color: "from-slate-700 to-slate-900",
            link: "/goals/wealth-creation"
        }
    ];

    const benefits = [
        {
            title: "Precision Targeting",
            text: "Move beyond generic benchmarks to achieve specific, quantifiable life milestones."
        },
        {
            title: "Dynamic Allocation",
            text: "Asset allocation that evolves based on your proximity to the target goal date."
        },
        {
            title: "Tax Optimization",
            text: "Structuring investments to maximize post-tax returns across different goal horizons."
        },
        {
            title: "Behavioral Alpha",
            text: "Maintaining discipline during market stress by tethering investments to tangible goals."
        }
    ];

    const process = [
        {
            step: "01",
            title: "Vision Clarification",
            description: "Deep-dive analysis to quantify your aspirations into actionable financial targets."
        },
        {
            step: "02",
            title: "Gap Stratification",
            description: "Computational assessment of current assets against future liabilities and requirements."
        },
        {
            step: "03",
            title: "Architecture Design",
            description: "Bespoke investment blueprinting using advanced asset correlation models."
        },
        {
            step: "04",
            title: "Execution & Flow",
            description: "Systematic capital deployment into optimized vehicles with automated rebalancing."
        },
        {
            step: "05",
            title: "Performance Audit",
            description: "Continuous monitoring and strategic pivots to ensure 100% goal attainment probability."
        }
    ];""", 
"""const GoalBaseInvesting = () => {
    const { cmsContent } = useCMSContent('goal-base-investing');

    useMetaTags(cmsContent['_seo'] || {
        title: "Smart Goal-Based Investing | We Care Freedom Wealth",
        description: "Smart goal-based investing solutions to help you plan, invest, and achieve life goals with clarity, discipline, and long-term financial security.",
        robotsTag: "index, follow"
    });

    const hardcodedGoals = [
        { icon: FaHome, color: "from-orange-500 to-red-500", link: "/goals/dream-home" },
        { icon: FaGraduationCap, color: "from-blue-500 to-indigo-600", link: "/goals/child-education" },
        { icon: FaRing, color: "from-purple-500 to-pink-500", link: "/goals/child-wedding" },
        { icon: FaUmbrella, color: "from-emerald-500 to-teal-600", link: "/goals/retirement" },
        { icon: FaShieldAlt, color: "from-amber-400 to-orange-500", link: "/goals/emergency-fund" },
        { icon: FaChartLine, color: "from-slate-700 to-slate-900", link: "/goals/wealth-creation" }
    ];

    const cmsGoals = cmsContent['goals-matrix']?.list || [
        { title: "Dream Home Acquisition", description: "Capital deployment strategies tailored for high-value real estate acquisition and legacy building.", timeline: "5-10 Years" },
        { title: "Global Education Provision", description: "Ensuring unrestricted access to world-class education through inflation-adjusted corpus building.", timeline: "10-15 Years" },
        { title: "Legacy Celebrations", description: "Strategic wealth accumulation for significant life milestones and multi-generational celebrations.", timeline: "15-20 Years" },
        { title: "Financial Independence", description: "Advanced retirement architectures designed for absolute freedom and perpetual cash flow.", timeline: "20+ Years" },
        { title: "Liquidity Reserve", description: "Institutional-grade emergency reserves providing absolute security against market volatility.", timeline: "Immediate" },
        { title: "Alpha Wealth Creation", description: "Aggressive wealth compounding strategies focused on high-conviction growth opportunities.", timeline: "15+ Years" }
    ];

    const goals = cmsGoals.map((goal, index) => ({
        ...goal,
        icon: hardcodedGoals[index]?.icon || FaChartLine,
        color: hardcodedGoals[index]?.color || "from-slate-700 to-slate-900",
        link: hardcodedGoals[index]?.link || "/contact"
    }));

    const benefits = cmsContent['philosophy']?.benefits || [
        { title: "Precision Targeting", text: "Move beyond generic benchmarks to achieve specific, quantifiable life milestones." },
        { title: "Dynamic Allocation", text: "Asset allocation that evolves based on your proximity to the target goal date." },
        { title: "Tax Optimization", text: "Structuring investments to maximize post-tax returns across different goal horizons." },
        { title: "Behavioral Alpha", text: "Maintaining discipline during market stress by tethering investments to tangible goals." }
    ];

    const process = cmsContent['framework']?.steps || [
        { step: "01", title: "Vision Clarification", description: "Deep-dive analysis to quantify your aspirations into actionable financial targets." },
        { step: "02", title: "Gap Stratification", description: "Computational assessment of current assets against future liabilities and requirements." },
        { step: "03", title: "Architecture Design", description: "Bespoke investment blueprinting using advanced asset correlation models." },
        { step: "04", title: "Execution & Flow", description: "Systematic capital deployment into optimized vehicles with automated rebalancing." },
        { step: "05", title: "Performance Audit", description: "Continuous monitoring and strategic pivots to ensure 100% goal attainment probability." }
    ];""")

# 3. Update Hero JSX
content = content.replace("""<span className="text-orange-900 font-bold text-[10px] uppercase tracking-[0.2em]">Strategy First</span>""", """<span className="text-orange-900 font-bold text-[10px] uppercase tracking-[0.2em]">{cmsContent['hero']?.badge || 'Strategy First'}</span>""")

content = content.replace("""<h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                                Goal-Based <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                                    Architecture
                                </span>
                            </h1>""", """<h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                                {cmsContent['hero']?.title ? (
                                    <span dangerouslySetInnerHTML={{ __html: cmsContent['hero'].title.replace(/Architecture/g, '<span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Architecture</span>') }} />
                                ) : <>Goal-Based <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Architecture</span></>}
                            </h1>""")

content = content.replace("""<p className="text-base md:text-xl text-slate-700 leading-relaxed max-w-xl mb-8 sm:mb-10 font-medium">
                                Transcend generic investing. We architect bespoke financial frameworks designed to deliver absolute certainty for your life's most ambitious milestones.
                            </p>""", """<p className="text-base md:text-xl text-slate-700 leading-relaxed max-w-xl mb-8 sm:mb-10 font-medium">
                                {cmsContent['hero']?.description || "Transcend generic investing. We architect bespoke financial frameworks designed to deliver absolute certainty for your life's most ambitious milestones."}
                            </p>""")

content = content.replace("""<Link
                                    to="/contact"
                                    className="bg-slate-900 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center group text-sm sm:text-base"
                                >
                                    Start Architecting""", """<Link
                                    to={cmsContent['hero']?.ctaLink || "/contact"}
                                    className="bg-slate-900 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center group text-sm sm:text-base"
                                >
                                    {cmsContent['hero']?.ctaText || "Start Architecting"}""")

# 4. Update Philosophy JSX
content = content.replace("""<h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 sm:mb-8 leading-tight">
                                    The Philosophy of <br />
                                    <span className="text-orange-600">Intentional Wealth</span>
                                </h2>""", """<h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 sm:mb-8 leading-tight">
                                    {cmsContent['philosophy']?.title ? (
                                        <span dangerouslySetInnerHTML={{ __html: cmsContent['philosophy'].title.replace(/Intentional Wealth/g, '<span class="text-orange-600">Intentional Wealth</span>') }} />
                                    ) : <>The Philosophy of <br /> <span className="text-orange-600">Intentional Wealth</span></>}
                                </h2>""")

content = content.replace("""<p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 font-medium">
                                    Traditional investing focuses on market benchmarks—we focus on your life metrics. Goal-based investing is the science of aligning capital deployment with temporal needs, ensuring your money is exactly where it needs to be, right when you need it.
                                </p>""", """<p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 font-medium">
                                    {cmsContent['philosophy']?.description || "Traditional investing focuses on market benchmarks—we focus on your life metrics. Goal-based investing is the science of aligning capital deployment with temporal needs, ensuring your money is exactly where it needs to be, right when you need it."}
                                </p>""")

# 5. Update Goals Matrix JSX
content = content.replace("""<h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                            Strategic <span className="text-orange-500">Milestones</span>
                        </h2>""", """<h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                            {cmsContent['goals-matrix']?.title ? (
                                <span dangerouslySetInnerHTML={{ __html: cmsContent['goals-matrix'].title.replace(/Milestones/g, '<span class="text-orange-500">Milestones</span>') }} />
                            ) : <>Strategic <span className="text-orange-500">Milestones</span></>}
                        </h2>""")

content = content.replace("""<p className="text-slate-400 text-base sm:text-xl max-w-2xl mx-auto font-medium">
                            Tailored architectures for every phase of your financial evolution.
                        </p>""", """<p className="text-slate-400 text-base sm:text-xl max-w-2xl mx-auto font-medium">
                            {cmsContent['goals-matrix']?.subtitle || "Tailored architectures for every phase of your financial evolution."}
                        </p>""")

# 6. Update Framework JSX
content = content.replace("""<h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 font-primary">
                            The Implementation <span className="text-orange-600">Framework</span>
                        </h2>""", """<h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 font-primary">
                            {cmsContent['framework']?.title ? (
                                <span dangerouslySetInnerHTML={{ __html: cmsContent['framework'].title.replace(/Framework/g, '<span class="text-orange-600">Framework</span>') }} />
                            ) : <>The Implementation <span className="text-orange-600">Framework</span></>}
                        </h2>""")

content = content.replace("""<p className="text-slate-500 text-base sm:text-xl max-w-2xl mx-auto font-medium">
                            A rigorous process designed for absolute goal attainment.
                        </p>""", """<p className="text-slate-500 text-base sm:text-xl max-w-2xl mx-auto font-medium">
                            {cmsContent['framework']?.subtitle || "A rigorous process designed for absolute goal attainment."}
                        </p>""")

# 7. Update CTA JSX
content = content.replace("""<h2 className="text-3xl sm:text-5xl font-black text-white mb-6 sm:mb-8 leading-tight">
                                Ready to Architect <br /> Your Financial Future?
                            </h2>""", """<h2 className="text-3xl sm:text-5xl font-black text-white mb-6 sm:mb-8 leading-tight">
                                {cmsContent['cta']?.title || "Ready to Architect Your Financial Future?"}
                            </h2>""")

content = content.replace("""<p className="text-slate-400 text-base sm:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto font-medium">
                                Join the elite group of investors who prioritize certainty over speculation. Start your goal-based journey today.
                            </p>""", """<p className="text-slate-400 text-base sm:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto font-medium">
                                {cmsContent['cta']?.description || "Join the elite group of investors who prioritize certainty over speculation. Start your goal-based journey today."}
                            </p>""")

content = content.replace("""<Link
                                to="/contact"
                                className="bg-orange-500 text-white font-black py-4 px-8 sm:py-5 sm:px-12 rounded-xl sm:rounded-2xl hover:bg-orange-400 transition-all transform hover:scale-105 inline-flex items-center shadow-2xl shadow-orange-500/20 group text-sm sm:text-base"
                            >
                                Secure My Future""", """<Link
                                to={cmsContent['cta']?.ctaLink || "/contact"}
                                className="bg-orange-500 text-white font-black py-4 px-8 sm:py-5 sm:px-12 rounded-xl sm:rounded-2xl hover:bg-orange-400 transition-all transform hover:scale-105 inline-flex items-center shadow-2xl shadow-orange-500/20 group text-sm sm:text-base"
                            >
                                {cmsContent['cta']?.ctaText || "Secure My Future"}""")

with open('src/pages/services/GoalBaseInvesting.jsx', 'w') as f:
    f.write(content)

