import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaClock, FaCheckCircle, FaChartPie, FaShieldAlt, FaChartLine, FaLayerGroup, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useMetaTags from '../../hooks/useMetaTags';

import mainImg from "../../assets/images/services/mutual-funds.png";

const MutualFundGuide = () => {
    useMetaTags(
        "Mutual Fund Investment for Long-Term Wealth | We Care Finance",
        "Discover how investing in Mutual Funds helps you diversify, manage risk, and grow wealth with expert guidance from We Care."
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
                        Investing
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.2] mb-12 uppercase tracking-tight"
                    >
                        Mutual Fund: <br />
                        <span className="text-orange-600">A Smart Investment Option to Grow Your Wealth</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap justify-center items-center gap-8 text-slate-400 text-[10px] font-black uppercase tracking-widest"
                    >
                        <span className="flex items-center"><FaUser className="mr-2 text-orange-600" /> We Care Team</span>
                        <span className="flex items-center"><FaCalendarAlt className="mr-2 text-orange-600" /> Feb 15, 2026</span>
                        <span className="flex items-center"><FaClock className="mr-2 text-orange-600" /> 5 min read</span>
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
                    <img src={mainImg} alt="Mutual Funds Guide" className="w-full h-full object-cover" />
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
                                Investing your money wisely is crucial to secure financial growth and achieve your life goals. One of the most effective and popular investment options available today is a Mutual Fund. Unlike traditional savings, a Mutual Fund pools money from multiple investors and invests it in diversified assets such as stocks, bonds, and other securities.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed mt-6">
                                At We Care Freedom Wealth, we help investors choose the right Mutual Fund schemes that match their risk appetite, investment horizon, and financial goals, ensuring disciplined and goal-oriented wealth creation.
                            </p>
                        </section>

                        <hr className="border-slate-100" />

                        {/* What Is */}
                        <section>
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">What Is a Mutual Fund?</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                A Mutual Fund is an investment vehicle managed by professional fund managers, where money from multiple investors is combined and invested in a diversified portfolio of assets.
                            </p>
                            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100">
                                <p className="text-slate-700 leading-relaxed">
                                    Investors receive units proportional to their investment, and returns depend on the performance of the underlying assets. This allows even small investors to access professional management and portfolio diversification that would be difficult individually.
                                </p>
                            </div>
                        </section>

                        {/* Why Invest */}
                        <section>
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">Why Should You Invest in a Mutual Fund?</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-10">
                                Investing in a Mutual Fund provides several advantages over traditional investment methods:
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { title: "Diversification", desc: "Reduces risk by spreading investments across multiple assets" },
                                    { title: "Professional Management", desc: "Experienced fund managers make investment decisions" },
                                    { title: "Flexibility", desc: "Various schemes for different risk profiles and financial goals" },
                                    { title: "Accessibility", desc: "Small investors can participate in large financial markets" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start space-x-4">
                                        <FaCheckCircle className="text-orange-600 mt-1" />
                                        <div>
                                            <div className="text-slate-900 font-bold">{item.title}</div>
                                            <div className="text-slate-500 text-sm">{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-lg text-slate-600 leading-relaxed mt-10">
                                With guidance from <strong>Financial Planning Services in India</strong>, investors can create customized strategies that adapt to different life stages while ensuring financial stability and growth.
                            </p>
                        </section>

                        {/* Types of Funds */}
                        <section>
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">Types of Mutual Funds</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
                                    <FaChartLine className="text-blue-600 text-3xl mb-6" />
                                    <h4 className="text-xl font-bold text-slate-900 mb-4">Equity Mutual Funds</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">Invest primarily in stocks and are ideal for long-term wealth growth. They carry higher risk but have the potential for higher returns over time.</p>
                                </div>
                                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                                    <FaShieldAlt className="text-slate-600 text-3xl mb-6" />
                                    <h4 className="text-xl font-bold text-slate-900 mb-4">Debt Mutual Funds</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">Invest in fixed-income securities like bonds and government instruments. They are suitable for conservative investors seeking stable returns.</p>
                                </div>
                                <div className="bg-orange-50 rounded-3xl p-8 border border-orange-100">
                                    <FaChartPie className="text-orange-600 text-3xl mb-6" />
                                    <h4 className="text-xl font-bold text-slate-900 mb-4">Hybrid Mutual Funds</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">Combine equity and debt investments, offering a balance of risk and reward for moderate-risk investors.</p>
                                </div>
                                <div className="bg-purple-50 rounded-3xl p-8 border border-purple-100">
                                    <FaLayerGroup className="text-purple-600 text-3xl mb-6" />
                                    <h4 className="text-xl font-bold text-slate-900 mb-4">Index and Sector Funds</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">These funds track a specific market index or invest in a specific sector, offering targeted investment options for experienced investors.</p>
                                </div>
                            </div>
                        </section>

                        {/* How to Choose */}
                        <section>
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">How to Choose the Right Mutual Fund</h2>
                            <div className="space-y-6">
                                {[
                                    { title: "Assess Your Financial Goals", desc: "Define what you want to achieve: retirement, children’s education, wealth creation, or short-term financial needs." },
                                    { title: "Determine Your Risk Appetite", desc: "Invest according to your risk tolerance. Equity-heavy funds suit high-risk investors, while debt funds are safer for conservative investors." },
                                    { title: "Evaluate Fund Performance", desc: "Check the fund’s historical performance, fund manager experience, and ratings from credible agencies." },
                                    { title: "Review Costs and Fees", desc: "Consider expense ratios, entry/exit loads, and other charges that may affect net returns." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="text-2xl font-black text-orange-200">0{i + 1}</div>
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-lg text-slate-600 leading-relaxed mt-10">
                                Professional <strong>Wealth Management Services</strong> like We Care Freedom Wealth provide personalized advice to choose suitable Mutual Fund schemes aligned with financial goals.
                            </p>
                        </section>

                        {/* Monitor & Review */}
                        <section>
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">How to Monitor and Review</h2>
                            <div className="bg-slate-900 rounded-[3rem] p-12 text-white">
                                <ul className="space-y-6">
                                    <li className="flex items-center space-x-4">
                                        <FaCheckCircle className="text-orange-500" />
                                        <span className="font-bold">Review portfolio performance at least once a year</span>
                                    </li>
                                    <li className="flex items-center space-x-4">
                                        <FaCheckCircle className="text-orange-500" />
                                        <span className="font-bold">Rebalance allocations based on market conditions</span>
                                    </li>
                                    <li className="flex items-center space-x-4">
                                        <FaCheckCircle className="text-orange-500" />
                                        <span className="font-bold">Switch schemes if performance or risk tolerance requires</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Common Mistakes */}
                        <section>
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">Common Mistakes to Avoid</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    "Investing without clear goals",
                                    "Ignoring risk tolerance",
                                    "Frequently switching funds due to short-term market movements",
                                    "Failing to monitor and review the portfolio regularly"
                                ].map((item, i) => (
                                    <div key={i} className="bg-red-50 text-red-700 px-6 py-4 rounded-2xl border border-red-100 font-bold text-sm">
                                        ✕ {item}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Conclusion */}
                        <section className="text-center bg-orange-50 rounded-[3rem] p-16 border border-orange-100">
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">Conclusion</h2>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
                                Mutual Fund investments are a convenient, professional, and flexible way to build long-term wealth. By aligning the right Mutual Fund schemes with your financial goals, you can achieve financial stability.
                            </p>
                            <p className="text-xl font-black text-slate-900">
                                With expert guidance from <span className="text-orange-600">We Care Freedom Wealth</span>
                            </p>
                        </section>

                        {/* FAQ Section */}
                        <section className="px-4">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-10">Frequently Asked Questions</h2>
                            <div className="space-y-8">
                                {[
                                    { q: "What is a Mutual Fund?", a: "A Mutual Fund is an investment vehicle where money from multiple investors is pooled and invested in a diversified portfolio managed by professional fund managers." },
                                    { q: "Who should invest in a Mutual Fund?", a: "Anyone looking to grow wealth over time, from beginners to experienced investors, can benefit from Mutual Fund investments." },
                                    { q: "What are the different types of Mutual Funds?", a: "Equity, Debt, Hybrid, Index, and Sector funds cater to different risk profiles and financial goals." },
                                    { q: "How often should I review my Mutual Fund portfolio?", a: "It is recommended to review your Mutual Fund portfolio at least once a year or after major life changes." }
                                ].map((faq, i) => (
                                    <div key={i} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                                        <h4 className="text-slate-900 font-black mb-3">{faq.q}</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Contact CTA */}
                        <section className="mt-4">
                            <div className="relative bg-slate-900 rounded-[3rem] p-12 overflow-hidden text-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent" />
                                <div className="relative z-10">
                                    <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Ready to Invest?</p>
                                    <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-6">
                                        Talk to a Mutual Fund Expert
                                    </h3>
                                    <p className="text-slate-400 font-medium leading-relaxed max-w-xl mx-auto mb-10">
                                        Let We Care Freedom Wealth guide you to the right Mutual Fund schemes aligned with your risk profile and financial goals.
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

export default MutualFundGuide;
