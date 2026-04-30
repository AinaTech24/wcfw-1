import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaClock, FaCheckCircle, FaChartLine, FaBriefcase, FaUserTie, FaLightbulb, FaLayerGroup, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useMetaTags from '../../hooks/useMetaTags';

import mainImg from "../../assets/images/services/stocks.png";

const DirectEquitiesWealth = () => {
    useMetaTags(
        "Direct Equities Investment for Wealth Growth | We Care Freedom Wealth",
        "Explore how Direct Equities help investors build wealth, earn higher returns, and create a strong long-term portfolio with expert guidance from We Care Freedom Wealth."
    );

    return (
        <article className="bg-white min-h-screen">
            {/* Simple Progress Bar */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="fixed top-0 left-0 right-0 h-1 bg-orange-600 origin-left z-[1000]"
            />

            {/* Post Header */}
            <header className="pt-32 pb-16 bg-slate-50 border-b border-slate-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-8"
                    >
                        Equities
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.2] mb-12 uppercase tracking-tight"
                    >
                        Direct Equities: <br />
                        <span className="text-orange-600">A Powerful Way to Build Long-Term Wealth</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap justify-center items-center gap-8 text-slate-400 text-[10px] font-black uppercase tracking-widest"
                    >
                        <span className="flex items-center"><FaUser className="mr-2 text-orange-600" /> We Care Team</span>
                        <span className="flex items-center"><FaCalendarAlt className="mr-2 text-orange-600" /> Feb 12, 2026</span>
                        <span className="flex items-center"><FaClock className="mr-2 text-orange-600" /> 7 min read</span>
                    </motion.div>
                </div>
            </header>

            {/* Featured Image */}
            <div className="max-w-6xl mx-auto px-4 -mt-12 mb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-[3rem] overflow-hidden shadow-2xl relative aspect-[21/9]"
                >
                    <img src={mainImg} alt="Direct Equities Guide" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                </motion.div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 pb-24">
                <div className="prose prose-lg prose-slate max-w-none">
                    <div className="space-y-12">
                        {/* Introduction */}
                        <section>
                            <p className="text-xl text-slate-600 leading-relaxed font-medium first-letter:text-7xl first-letter:font-black first-letter:text-orange-600 first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]">
                                In today’s financial world, investors are constantly searching for smarter ways to grow their wealth. While mutual funds and fixed-income instruments provide stability, many investors also look for opportunities that offer higher returns and long-term capital appreciation. This is where Direct Equities become a powerful investment option.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed mt-6">
                                At We Care Freedom Wealth, we help investors make informed decisions with structured strategies and expert insights, ensuring that equity investments are aligned with long-term financial planning and wealth creation goals.
                            </p>
                        </section>

                        <hr className="border-slate-100" />

                        {/* What Are */}
                        <section>
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">What Are Direct Equities?</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                Direct Equities refer to investments where an individual purchases shares of a company directly through the stock market. Unlike mutual funds, where money is pooled and managed by a fund manager, direct equity investors have full control over which stocks they buy and sell.
                            </p>
                            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100 italic font-medium text-slate-700">
                                "When you invest in direct equities, you become a partial owner of that company. As the company grows and performs well, the value of your shares can increase, leading to capital gains."
                            </div>
                        </section>

                        {/* Why Consider */}
                        <section>
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">Why Should You Consider Direct Equities?</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {[
                                    { title: "Higher Growth Potential", desc: "Equities have historically delivered better returns over the long term compared to FDs." },
                                    { title: "Ownership & Transparency", desc: "Full visibility into where the money is invested and ownership of shares." },
                                    { title: "Portfolio Customization", desc: "Build portfolios based on sectors, growth stocks, or long-term blue-chips." },
                                    { title: "Liquidity Advantage", desc: "Stocks can be bought and sold easily, providing flexibility and access to funds." }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                        <FaCheckCircle className="text-orange-600 mb-4" />
                                        <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                                        <p className="text-slate-500 text-sm">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Who Should Invest */}
                        <section>
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">Who Should Invest in Direct Equities?</h2>
                            <div className="bg-slate-900 rounded-[3rem] p-12 text-white">
                                <ul className="space-y-4 font-bold text-slate-300">
                                    <li className="flex items-center space-x-4"><div className="w-2 h-2 bg-orange-500 rounded-full" /><span>Working professionals seeking long-term wealth creation</span></li>
                                    <li className="flex items-center space-x-4"><div className="w-2 h-2 bg-orange-500 rounded-full" /><span>Business owners looking to diversify investments</span></li>
                                    <li className="flex items-center space-x-4"><div className="w-2 h-2 bg-orange-500 rounded-full" /><span>Investors with medium-to-high risk tolerance</span></li>
                                    <li className="flex items-center space-x-4"><div className="w-2 h-2 bg-orange-500 rounded-full" /><span>Individuals planning long-term goals like retirement</span></li>
                                </ul>
                            </div>
                        </section>

                        {/* Building Portfolio */}
                        <section>
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">How to Build a Smart Portfolio</h2>
                            <div className="space-y-8">
                                {[
                                    { title: "Define Investment Goals", desc: "Before selecting stocks, define goals such as wealth creation or retirement planning.", icon: FaBriefcase },
                                    { title: "Understand Risk Tolerance", desc: "Design portfolio based on risk capacity and time horizon.", icon: FaUserTie },
                                    { title: "Diversify Across Sectors", desc: "Invest in multiple sectors like banking, IT, pharma, and FMCG.", icon: FaLayerGroup },
                                    { title: "Focus on Fundamentals", desc: "Select stocks based on company performance, earnings, and financial stability.", icon: FaLightbulb },
                                    { title: "Invest with a Long-Term View", desc: "Stay invested for years rather than reacting to short-term movements.", icon: FaChartLine }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                                            <item.icon className="text-orange-600 text-xl" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-900 mb-2 uppercase tracking-tight">{item.title}</h4>
                                            <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Common Mistakes */}
                        <section className="bg-red-50 rounded-[3rem] p-12 border border-red-100">
                            <h2 className="text-2xl font-black text-red-900 uppercase tracking-tight mb-8">Mistakes to Avoid</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    "Investing without research",
                                    "Overtrading and reacting emotionally",
                                    "Lack of diversification",
                                    "Following market tips and rumors",
                                    "Ignoring portfolio reviews"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center space-x-3 text-red-700 font-bold text-sm">
                                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* How We Help */}
                        <section>
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">How We Care Freedom Wealth Helps</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    "Stock selection based on research",
                                    "Customized portfolio building",
                                    "Risk management planning",
                                    "Regular monitoring",
                                    "Strategic long-term guidance"
                                ].map((item, i) => (
                                    <div key={i} className="bg-slate-50 p-6 rounded-2xl text-slate-700 font-bold text-sm text-center border border-slate-100 hover:border-orange-200 transition-colors">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Conclusion */}
                        <section className="text-center pt-12">
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">Conclusion</h2>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12">
                                Direct equity investing is one of the most powerful tools for long-term wealth creation. With the right strategy, disciplined investing, and professional guidance, investors can achieve strong financial growth.
                            </p>
                            <div className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest shadow-xl">
                                Build Your Equity Roadmap
                            </div>
                        </section>

                        {/* Contact CTA */}
                        <section className="mt-4">
                            <div className="relative bg-slate-900 rounded-[3rem] p-12 overflow-hidden text-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent" />
                                <div className="relative z-10">
                                    <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Start Your Journey</p>
                                    <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-6">
                                        Talk to an Equity Specialist
                                    </h3>
                                    <p className="text-slate-400 font-medium leading-relaxed max-w-xl mx-auto mb-10">
                                        Let We Care Freedom Wealth help you build a disciplined, research-backed direct equity portfolio aligned with your long-term wealth goals.
                                    </p>
                                    <Link
                                        to="/contact"
                                        className="inline-flex items-center bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest text-sm px-10 py-5 rounded-2xl transition-all shadow-xl hover:shadow-orange-500/30 group"
                                    >
                                        Contact Us Today
                                        <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default DirectEquitiesWealth;
