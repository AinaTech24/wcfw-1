import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaMoneyBillWave,
    FaChartLine,
    FaArrowRight,
    FaRocket,
    FaShieldAlt,
    FaCalendarAlt,
    FaGem,
    FaCompass,
    FaLayerGroup
} from 'react-icons/fa';
import useCMSContent from '../hooks/useCMSContent';
import useMetaTags from '../hooks/useMetaTags';

const FinancialFreedom = () => {
    const { cmsContent } = useCMSContent('financial-freedom');

    // SEO Hook
    useMetaTags(cmsContent['_seo'] || {
        title: "Financial Freedom | We Care Freedom Wealth",
        description: "Independence is the ability to live life on your terms. Plan your financial freedom with us.",
        robotsTag: "index, follow"
    });

    const freedomPillars = [
        {
            icon: FaMoneyBillWave,
            title: "Passive Income Streams",
            description: "Build robust sources of cash flow that work tirelessly for you, even while you sleep."
        },
        {
            icon: FaShieldAlt,
            title: "Emergency Reserves",
            description: "Create a bulletproof safety net protecting your lifestyle against life's unpredictability."
        },
        {
            icon: FaChartLine,
            title: "Strategic Portfolio",
            description: "Institutional-grade investments engineered for long-term compounding and capital growth."
        },
        {
            icon: FaCalendarAlt,
            title: "Lifespan Solution",
            description: "Forward-looking roadmaps designed to secure your independence through every stage of life."
        }
    ];

    const steps = [
        {
            step: "01",
            title: "Institutional Audit",
            description: "A comprehensive assessment of your clinical financial health to establish a precise baseline."
        },
        {
            step: "02",
            title: "Vision Mapping",
            description: "Defining your unique version of freedom and setting measurable, time-bound targets."
        },
        {
            step: "03",
            title: "Structural Design",
            description: "Developing passive income vehicles through diversified investments and smart solution."
        },
        {
            step: "04",
            title: "Disciplined Execution",
            description: "Consistent capital deployment to harness the unstoppable power of compound growth."
        },
        {
            step: "05",
            title: "Active Governance",
            description: "Rigorous monitoring and semi-annual rebalancing to ensure your trajectory remains optimal."
        }
    ];

    return (
        <div className="bg-[#f8fafc]">
            {/* Cinematic Light Header */}
            <section
                className="relative min-h-[min(65vh,520px)] flex items-center overflow-hidden pt-16 pb-8"
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
                                <FaCompass className="text-orange-600 text-sm" />
                                <div className="text-orange-900 font-bold text-xs uppercase tracking-[0.2em]" dangerouslySetInnerHTML={{ __html: cmsContent['hero']?.badge || 'The Ultimate Protocol' }} />
                            </motion.div>

                            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
                                {cmsContent['hero']?.title ? (
                                    <span dangerouslySetInnerHTML={{ __html: cmsContent['hero'].title.replace(/Freedom\./g, '<span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Freedom.</span>') }} />
                                ) : <>Financial <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Freedom.</span></>}
                            </h1>

                            <div className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-xl mb-12 font-medium" dangerouslySetInnerHTML={{ __html: cmsContent['hero']?.description || "Independence is the ability to live life on your terms. We provide the roadmap, the tools, and the discipline to turn that vision into institutional reality." }} />

                            <div className="flex flex-wrap gap-10">
                                <div className="flex flex-col">
                                    <span className="text-slate-900 text-3xl font-black">100%</span>
                                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Sovereignty Target</span>
                                </div>
                                <div className="w-px h-12 bg-slate-200"></div>
                                <div className="flex flex-col">
                                    <span className="text-orange-600 text-3xl font-black">∞</span>
                                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Time Equity</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="hidden lg:block relative"
                        >
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
                            <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-12 rounded-[4rem] shadow-2xl relative z-10">
                                <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                                    <FaLayerGroup className="text-orange-500 mr-3" />
                                    The Independence Metric
                                </h3>
                                <div className="space-y-6">
                                    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-center">
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Goal Reached When</p>
                                        <div className="text-3xl font-black text-white">
                                            Passive Yield <br />
                                            <span className="text-orange-500">&gt;</span> <br />
                                            Lifestyle Cost
                                        </div>
                                    </div>
                                    <div className="text-center p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                                        <p className="text-orange-900 font-bold text-sm">Status: Pre-Independent</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 -mt-16 relative z-20">

                {/* Concept Block */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] p-8 sm:p-20 border border-slate-100 mb-24"
                >
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8 leading-tight">
                                {cmsContent['essence-section']?.title ? (
                                    <span dangerouslySetInnerHTML={{ __html: cmsContent['essence-section'].title.replace(/Institutional Independence/g, '<span class="text-orange-600">Institutional Independence</span>') }} />
                                ) : <>The Essence of <br /> <span className="text-orange-600">Institutional Independence</span></>}
                            </h2>
                            <p className="text-slate-600 text-xl mb-8 leading-relaxed italic border-l-4 border-orange-500 pl-6">
                                {cmsContent['essence-section']?.quote ? (
                                    <span dangerouslySetInnerHTML={{ __html: cmsContent['essence-section'].quote }} />
                                ) : <>"Financial freedom isn't about having a specific digit in your bank account; it's about having total control over your most valuable asset: <span className="text-slate-900 font-bold not-italic underline decoration-orange-500 decoration-4">Your Time.</span>"</>}
                            </p>
                            <div className="text-slate-500 font-medium mb-12 text-lg" dangerouslySetInnerHTML={{ __html: cmsContent['essence-section']?.description || 'When your passive income streams exceed your lifestyle requirements, you are free. Free to pursue passions, free to prioritize family, and free to work because you want to—not because you have to.' }} />
                            <div className="flex items-center space-child-5">
                                <div className="p-5 bg-orange-600 text-white rounded-[1.5rem] shadow-xl shadow-orange-600/20">
                                    <FaRocket className="text-2xl" />
                                </div>
                                <div>
                                    <p className="text-slate-900 font-black text-xl">Ascend to Independence</p>
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Start your protocol today</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {freedomPillars.map((pillar, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group transition-all"
                                >
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:bg-orange-600 transition-colors">
                                        <pillar.icon className="text-orange-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <h4 className="text-slate-900 font-bold text-sm mb-2">{pillar.title}</h4>
                                    <p className="text-slate-400 text-[11px] leading-relaxed font-medium">{pillar.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Ascent Protocol */}
                <div className="text-center mb-16">
                    <h3 className="text-orange-600 font-extrabold uppercase tracking-[0.3em] text-xs mb-4">{cmsContent['protocol-section']?.badge || 'The Framework'}</h3>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">{cmsContent['protocol-section']?.title || 'The Ascent Protocol'}</h2>
                </div>

                <div className="relative mb-32">
                    <div className="absolute top-0 bottom-0 left-[2.25rem] w-0.5 bg-slate-100 hidden lg:block"></div>
                    <div className="space-y-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative flex flex-col lg:flex-row items-start lg:items-center p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-xl transition-all group"
                            >
                                <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-xl font-black mb-6 lg:mb-0 lg:mr-10 relative z-10 shrink-0 group-hover:bg-orange-600 transition-colors">
                                    {step.step}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{step.title}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed max-w-4xl">{step.description}</p>
                                </div>
                                <div className="hidden lg:block">
                                    <FaArrowRight className="text-slate-200 text-3xl group-hover:text-orange-500 group-hover:translate-x-3 transition-all" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Final CTA */}
                <section className="py-12">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-[#0f172a] p-16 sm:p-24 rounded-[4rem] relative overflow-hidden text-white"
                        >
                            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-orange-600/20">
                                    <FaGem className="text-white text-3xl" />
                                </div>
                                <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-tight">
                                    {cmsContent['cta-section']?.title ? (
                                        <span dangerouslySetInnerHTML={{ __html: cmsContent['cta-section'].title }} />
                                    ) : <>Build Your Legacy <br /> of Freedom.</>}
                                </h2>
                                <div className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: cmsContent['cta-section']?.description || 'Architecture defines longevity. Let our elite advisors build your strategic roadmap to total financial independence.' }} />
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center px-12 py-6 bg-orange-600 text-white font-black rounded-2xl hover:bg-orange-500 transition-all transform hover:scale-105 shadow-xl group"
                                >
                                    Activate Protocol
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

export default FinancialFreedom;
