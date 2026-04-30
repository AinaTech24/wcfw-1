import React, { useEffect } from "react";
import { FaFileAlt, FaSpinner, FaLock, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const CodeOfConduct = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/AMFI_Code-of-Conduct.pdf";
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 max-w-md w-full"
      >
        <div className="bg-white/60 backdrop-blur-2xl border border-white/40 p-12 rounded-[4rem] shadow-2xl text-center">
          <div className="mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl relative">
              <FaFileAlt className="text-white text-4xl" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 border-2 border-orange-500/20 rounded-[3rem] border-t-orange-500"
              ></motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="inline-flex items-center space-x-2 bg-orange-600/10 border border-orange-600/20 px-4 py-1.5 rounded-full mb-6 text-orange-900 font-bold uppercase tracking-widest text-[10px]">
                <FaLock className="text-[8px]" />
                <span>Secure Protocol</span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Initializing Access</h1>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">
                Connecting to the AMFI Institutional Code of Conduct repository. Establishing secure terminal.
              </p>
            </motion.div>
          </div>

          <div className="relative h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mb-8">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent w-1/2"
            ></motion.div>
          </div>

          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center justify-center"
          >
            <FaSpinner className="animate-spin mr-2" />
            Synchronizing Regulatory Node
          </motion.p>

          <div className="mt-16 pt-8 border-t border-slate-900/10">
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tight">
              Self-activation in progress. <br />
              <a href="/AMFI_Code-of-Conduct.pdf" className="text-orange-600 font-black hover:underline mt-2 inline-block">Manual Bypass</a>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 opacity-10">
        <FaShieldAlt className="text-orange-500 text-6xl" />
      </div>
      <div className="absolute bottom-1/4 right-1/4 opacity-10 rotate-12">
        <FaLock className="text-orange-500 text-6xl" />
      </div>
    </div>
  );
};

export default CodeOfConduct;
