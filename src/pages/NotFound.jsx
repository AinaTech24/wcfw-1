import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaSearch, FaArrowLeft, FaCompass } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 overflow-hidden relative"
            style={{
                backgroundImage: 'linear-gradient(135deg, #ffe5bd 0%, #fffdf7 35%, #c7f1ff 100%)'
            }}
        >
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_100%)]"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="max-w-4xl w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/60 backdrop-blur-3xl border border-white/40 p-12 sm:p-24 rounded-[5rem] shadow-2xl relative overflow-hidden"
                >
                    {/* Decorative Background Icon */}
                    <div className="absolute -top-24 -right-24 opacity-5 rotate-12">
                        <FaCompass className="text-slate-900 text-[20rem]" />
                    </div>

                    <div className="relative z-10">
                        {/* 404 Display */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mb-8"
                        >
                            <h1 className="text-[10rem] sm:text-[15rem] font-black leading-none tracking-tighter text-slate-900/10 select-none">
                                404
                            </h1>
                            <div className="mt-[-4rem] sm:mt-[-6rem]">
                                <span className="text-4xl sm:text-6xl font-black text-slate-900 uppercase tracking-tighter">
                                    Navigation <br className="sm:hidden" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                                        Lost.
                                    </span>
                                </span>
                            </div>
                        </motion.div>

                        <p className="text-lg sm:text-xl text-slate-600 mb-12 max-w-lg mx-auto font-medium leading-relaxed">
                            The institutional node you are attempting to reach does not exist within our current architecture. It may have been decommissioned or relocated.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                            <Link
                                to="/"
                                className="group inline-flex items-center justify-center bg-slate-900 text-white font-black py-5 px-10 rounded-2xl transition-all duration-300 hover:bg-orange-600 shadow-xl uppercase tracking-widest text-xs w-full sm:w-auto"
                            >
                                <FaHome className="mr-3 group-hover:scale-110 transition-transform" />
                                Return to Terminal
                            </Link>

                            <button
                                onClick={() => window.history.back()}
                                className="inline-flex items-center justify-center bg-white border border-slate-200 text-slate-900 font-black py-5 px-10 rounded-2xl transition-all duration-300 hover:border-orange-500 shadow-lg uppercase tracking-widest text-xs w-full sm:w-auto"
                            >
                                <FaArrowLeft className="mr-3" />
                                Previous Node
                            </button>
                        </div>

                        {/* Helpful Links Node */}
                        <div className="pt-12 border-t border-slate-900/10">
                            <p className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Critical Hubs</p>
                            <nav className="flex flex-wrap justify-center gap-6 sm:gap-12">
                                {['Services', 'Calculators', 'Contact', 'Blog'].map((item) => (
                                    <Link
                                        key={item}
                                        to={`/${item.toLowerCase()}`}
                                        className="text-slate-900 font-black uppercase tracking-widest text-[10px] hover:text-orange-600 transition-colors relative group"
                                    >
                                        {item}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 opacity-10 hidden lg:block">
                <FaCompass className="text-orange-500 text-6xl animate-pulse" />
            </div>
            <div className="absolute bottom-1/4 right-1/4 opacity-10 rotate-12 hidden lg:block">
                <FaSearch className="text-orange-500 text-6xl" />
            </div>
        </div>
    );
};

export default NotFound;
