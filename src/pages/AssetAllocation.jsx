import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaBalanceScale,
    FaChartPie,
    FaShieldAlt,
    FaCoins,
    FaChartLine,
    FaHome,
    FaArrowRight,
    FaLightbulb,
    FaAward,
    FaCubes
} from 'react-icons/fa';
import useCMSContent from '../hooks/useCMSContent';
import useMetaTags from '../hooks/useMetaTags';

const AssetAllocation = () => {
    const { cmsContent } = useCMSContent('asset-allocation');

    // SEO Hook
    useMetaTags(cmsContent['_seo'] || {
        title: "Asset Allocation | We Care Freedom Wealth",
        description: "The science of balancing risk and reward through strategic asset allocation.",
        robotsTag: "index, follow"
    });

    const assetClasses = [
        {
            icon: FaChartLine,
            title: "Growth Equity",
            description: "Stocks and equity mutual funds for aggressive capital accumulation over long horizons.",
            riskLevel: "High",
            returns: "12-15% p.a.",
            color: "from-blue-600 to-indigo-700"
        },
        {
            icon: FaShieldAlt,
            title: "Fixed Income",
            description: "Institutional bonds, FDs, and debt vehicles for capital preservation and steady yield.",
            riskLevel: "Low",
            returns: "6-8% p.a.",
            color: "from-slate-700 to-slate-900"
        },
        {
            icon: FaCoins,
            title: "Strategic Gold",
            description: "Sovereign Gold Bonds and ETFs serving as a resilient hedge against market volatility.",
            riskLevel: "Medium",
            returns: "8-10% p.a.",
            color: "from-amber-400 to-orange-600"
        },
        {
            icon: FaHome,
            title: "Real Assets",
            description: "Physical property and REITs providing tangible yield and inflation protection.",
            riskLevel: "Medium",
            returns: "10-12% p.a.",
            color: "from-orange-600 to-red-700"
        }
    ];

    const allocationStrategies = [
        {
            age: "20-30 Years",
            equity: "75%",
            debt: "15%",
            gold: "10%",
            description: "Aggressive accumulation strategy for young legacy builders."
        },
        {
            age: "30-45 Years",
            equity: "65%",
            debt: "25%",
            gold: "10%",
            description: "Balanced approach optimizing between growth and stability."
        },
        {
            age: "45-55 Years",
            equity: "50%",
            debt: "40%",
            gold: "10%",
            description: "Strategic consolidation as financial milestones approach."
        },
        {
            age: "55+ Years",
            equity: "35%",
            debt: "55%",
            gold: "10%",
            description: "Capital preservation protocol for lifetime income security."
        }
    ];

    return (
        <div className="bg-[#f8fafc]">
            {/* Cinematic Light Header */}
            <section
                className="relative h-[65vh] flex items-center overflow-hidden pt-16"
                style={{
                    backgroundImage: 'linear-gradient(135deg, #ffe5bd 0%, #fffdf7 35%, #c7f1ff 100%)'
                }}
            >
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_100%)]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center space-x-3 bg-orange-500/10 backdrop-blur-md border border-orange-500/20 px-4 py-2 rounded-full mb-8"
                            >
                                <FaCubes className="text-orange-600 text-sm" />
                                <div className="text-orange-900 font-bold text-xs uppercase tracking-[0.2em]" dangerouslySetInnerHTML={{ __html: cmsContent['hero']?.badge || 'Financial Engineering' }} />
                            </motion.div>

                            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
                                {cmsContent['hero']?.title ? (
                                    <span dangerouslySetInnerHTML={{ __html: cmsContent['hero'].title.replace(/Allocation\./g, '<span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Allocation.</span>') }} />
                                ) : <>Asset <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Allocation.</span></>}
                            </h1>

                            <div className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-xl mb-12 font-medium" dangerouslySetInnerHTML={{ __html: cmsContent['hero']?.description || "The science of balancing risk and reward. We engineer resilient portfolios that weather market volatility while capturing elite growth opportunities." }} />

                            <div className="flex flex-wrap gap-10">
                                <div className="flex flex-col">
                                    <span className="text-slate-900 text-3xl font-black">90%+</span>
                                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Return impact</span>
                                </div>
                                <div className="w-px h-12 bg-slate-200"></div>
                                <div className="flex flex-col">
                                    <span className="text-orange-600 text-3xl font-black">∞</span>
                                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Diversification Alpha</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="hidden lg:block"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-orange-500/10 blur-[100px] rounded-full"></div>
                                <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-12 rounded-[4rem] shadow-2xl relative z-10 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                                        <FaChartPie className="text-orange-500 mr-3" />
                                        Portfolio Mix
                                    </h3>
                                    <div className="space-y-4">
                                        <MixBar label="Equity" value="70%" color="bg-blue-600" />
                                        <MixBar label="Debt" value="20%" color="bg-slate-800" />
                                        <MixBar label="Gold" value="10%" color="bg-orange-500" />
                                    </div>
                                    <div className="mt-10 p-5 bg-slate-900 rounded-[2rem] text-center border border-white/10">
                                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Optimized Status</p>
                                        <p className="text-white font-black text-lg">Institutional Equilibrium</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 -mt-16 relative z-20">

                {/* Impact Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] p-8 sm:p-20 border border-slate-100 mb-24"
                >
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8 leading-tight">
                                {cmsContent['impact-section']?.title ? (
                                    <span dangerouslySetInnerHTML={{ __html: cmsContent['impact-section'].title.replace(/Allocation/g, '<span class="text-orange-600">Allocation</span>') }} />
                                ) : <>Why <span className="text-orange-600">Allocation</span> Matters?</>}
                            </h2>
                            <p className="text-slate-600 text-xl mb-8 leading-relaxed">
                                {cmsContent['impact-section']?.description ? (
                                    <span dangerouslySetInnerHTML={{ __html: cmsContent['impact-section'].description }} />
                                ) : <>Empirical studies demonstrate that asset allocation accounts for more than <span className="font-black text-slate-900 underline decoration-orange-500 decoration-4">90% of total portfolio variance</span> over time. It is the single most critical architecting decision in wealth building.</>}
                            </p>
                            <div className="flex items-start space-x-6 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                <FaLightbulb className="text-orange-500 text-4xl shrink-0 mt-1" />
                                <p className="text-slate-700 font-bold italic text-lg leading-relaxed">
                                    {cmsContent['impact-section']?.quote || '"Diversification is the only \'free lunch\' in investing. We help you serve it with clinical precision."'}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {assetClasses.map((asset, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-lg group transition-all"
                                >
                                    <div className={`w-12 h-12 bg-gradient-to-br ${asset.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                                        <asset.icon className="text-white" />
                                    </div>
                                    <h4 className="text-slate-900 font-bold text-sm mb-2">{asset.title}</h4>
                                    <p className="text-orange-600 font-black text-xs uppercase tracking-widest">{asset.returns}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Agebenchmarks Section */}
                <div className="text-center mb-16">
                    <h3 className="text-orange-600 font-extrabold uppercase tracking-[0.3em] text-xs mb-4">{cmsContent['milestone-section']?.badge || 'Milestone Benchmarks'}</h3>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">{cmsContent['milestone-section']?.title || 'Lifespan Protocol'}</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                    {allocationStrategies.map((strategy, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-black text-slate-900">{strategy.age}</h3>
                                <FaAward className="text-orange-500 text-xl" />
                            </div>
                            <div className="space-y-6 mb-8">
                                <StrategyPill label="Equity" value={strategy.equity} color="text-blue-600" />
                                <StrategyPill label="Debt" value={strategy.debt} color="text-slate-700" />
                                <StrategyPill label="Gold" value={strategy.gold} color="text-orange-500" />
                            </div>
                            <p className="text-slate-400 text-xs font-medium leading-relaxed italic border-t border-slate-50 pt-6">
                                {strategy.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Final CTA */}
                <section className="py-12">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-[#0f172a] p-16 sm:p-24 rounded-[4rem] relative overflow-hidden text-white shadow-2xl shadow-slate-900/40"
                        >
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
                            <div className="relative z-10">
                                <div className="w-24 h-24 bg-white/5 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-white/10">
                                    <FaBalanceScale className="text-orange-500 text-4xl" />
                                </div>
                                <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-tight">
                                    {cmsContent['cta-section']?.title ? (
                                        <span dangerouslySetInnerHTML={{ __html: cmsContent['cta-section'].title.replace(/Portfolio Today\./g, 'Portfolio Today.') }} />
                                    ) : <>Engineer Your <br /> Portfolio Today.</>}
                                </h2>
                                <div className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: cmsContent['cta-section']?.description || 'Architecture defines longevity. Let our elite advisors build your strategic asset mix for an institutional-grade financial future.' }} />
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center px-12 py-6 bg-orange-600 text-white font-black rounded-2xl hover:bg-orange-500 transition-all transform hover:scale-105 shadow-xl group"
                                >
                                    Activate Advisory
                                    <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>
    );
};

const MixBar = ({ label, value, color }) => (
    <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
            <span className="text-slate-500">{label}</span>
            <span className="text-slate-900">{value}</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: value }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full ${color}`}
            />
        </div>
    </div>
);

const StrategyPill = ({ label, value, color }) => (
    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">{label}</span>
        <span className={`font-black text-lg ${color}`}>{value}</span>
    </div>
);

export default AssetAllocation;
