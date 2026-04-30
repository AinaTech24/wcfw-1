import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle, FaUserShield, FaArrowRight, FaLock, FaGlobe, FaChevronRight } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Login = () => {
    const [id, setId] = useState('');
    const [isHovered, setIsHovered] = useState(null);

    const handleRedirect = (type) => {
        if (type === 'client') {
            window.location.href = 'https://pms.wcfw.in/';
        } else {
            window.location.href = 'https://login.wcfw.in/';
        }
    };

    const handleEntry = (e) => {
        e.preventDefault();
        // Since we don't have real validation, we just simulate a redirect based on ID or simple selection
        // In a real scenario, this would call an API
        if (id.toLowerCase().startsWith('p')) {
            handleRedirect('partner');
        } else {
            handleRedirect('client');
        }
    };

    return (
        <div className="min-h-screen pt-[140px] pb-24 px-4 overflow-hidden relative font-primary"
            style={{ backgroundImage: 'linear-gradient(135deg, #ffe5bd 0%, #fffdf7 35%, #c7f1ff 100%)' }}>

            {/* Cinematic Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_100%)]"></div>

                {/* Animated Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 right-[15%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.15, 0.1],
                        x: [0, -40, 0],
                        y: [0, 40, 0]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 left-[10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Branding & Context */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center space-x-3 bg-orange-500/10 backdrop-blur-md border border-orange-500/20 px-4 py-2 rounded-full mb-8">
                            <FaLock className="text-orange-600 text-sm" />
                            <span className="text-orange-900 font-bold text-[10px] uppercase tracking-[0.3em]">Institutional Access Control</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-8">
                            Unified <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                                Gateway.
                            </span>
                        </h1>

                        <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed max-w-xl mb-12">
                            Securely enter the We Care Freedom Wealth digital ecosystem. Our bespoke portals provide the transparency and performance tracking essential for sovereign wealth management.
                        </p>

                        <div className="space-y-6">
                            {[
                                { icon: FaGlobe, text: "Global Security Compliance Protocol" },
                                { icon: FaUserShield, text: "Multi-Factor Authentication Ready" },
                                { icon: FaLock, text: "End-to-End Encryption Mandate" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/50 border border-white/80 shadow-sm flex items-center justify-center text-orange-500">
                                        <item.icon />
                                    </div>
                                    <span className="text-slate-500 font-bold text-sm tracking-wide">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Interactive Login Portal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="bg-white/40 backdrop-blur-2xl border border-white p-8 md:p-14 rounded-[4rem] shadow-2xl relative overflow-hidden group">
                            {/* Decorative line */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-transparent opacity-50"></div>

                            <img src={logo} alt="WCFW Logo" className="h-10 mx-auto mb-10 object-contain brightness-110" />

                            <h2 className="text-3xl font-black text-slate-900 mb-10 text-center uppercase tracking-tight">Portal Decryption</h2>

                            {/* Gateway Options */}
                            <div className="grid grid-cols-1 gap-6 mb-12">
                                <PortalCard
                                    icon={FaUserCircle}
                                    title="Client Wealth Portal"
                                    desc="Portfolio performance & asset tracking"
                                    onClick={() => handleRedirect('client')}
                                    color="orange"
                                    isHovered={isHovered === 'client'}
                                    onHover={() => setIsHovered('client')}
                                    onLeave={() => setIsHovered(null)}
                                />

                                <PortalCard
                                    icon={FaUserShield}
                                    title="Partner Network Desk"
                                    desc="Institutional mandate management"
                                    onClick={() => handleRedirect('partner')}
                                    color="slate"
                                    isHovered={isHovered === 'partner'}
                                    onHover={() => setIsHovered('partner')}
                                    onLeave={() => setIsHovered(null)}
                                />
                            </div>

                            <form onSubmit={handleEntry} className="relative z-10">
                                <div className="text-center mb-8">
                                    <span className="px-4 py-2 bg-slate-100 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        Or Secure ID Entry
                                    </span>
                                </div>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                        placeholder="Enter Protocol ID (e.g. C-12345)"
                                        className="w-full bg-white/80 border border-slate-200 p-6 pr-16 rounded-[2rem] text-slate-900 font-black focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all placeholder:text-slate-300"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-3 top-3 bottom-3 w-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-orange-600 transition-all hover:scale-105 active:scale-95"
                                    >
                                        <FaArrowRight />
                                    </button>
                                </div>
                                <p className="mt-6 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                    Support Desk: <span className="text-orange-600">help@wcfw.in</span>
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const PortalCard = ({ icon: Icon, title, desc, onClick, color, isHovered, onHover, onLeave }) => {
    const isOrange = color === 'orange';

    return (
        <div
            onClick={onClick}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className={`flex items-center p-6 rounded-[2.5rem] border ${isHovered ? 'bg-white shadow-xl translate-x-3' : 'bg-white/50 border-slate-100'} transition-all duration-500 cursor-pointer group`}
        >
            <div className={`w-16 h-16 ${isOrange ? 'bg-gradient-to-br from-orange-500 to-orange-600' : 'bg-gradient-to-br from-slate-800 to-slate-900'} rounded-2xl flex items-center justify-center text-white mr-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
            </div>
            <div className="flex-1">
                <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">{title}</h4>
                <p className="text-slate-500 text-xs font-medium">{desc}</p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isHovered ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-300'}`}>
                <FaChevronRight className={isHovered ? 'translate-x-0.5' : 'translate-x-0'} />
            </div>
        </div>
    );
};

export default Login;
