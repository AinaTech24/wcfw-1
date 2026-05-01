import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const StickyResultBar = ({
  label,
  value,
  subLabel,
  subValue,
  currencySymbol,
  isVisible,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t border-slate-200 p-4 pb-8 z-50 lg:hidden shadow-[0_-15px_35px_-5px_rgba(0,0,0,0.15)] rounded-t-[2.5rem]"
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto px-6">
            <div className="flex-1">
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mb-1">
                {label}
              </p>
              <p className="text-2xl font-black text-slate-900 tracking-tighter">
                {currencySymbol}
                {value}
              </p>
            </div>
            {subLabel && (
              <div className="text-right flex-1 border-l border-slate-100 ml-6 pl-6">
                <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mb-1">
                  {subLabel}
                </p>
                <div className="flex items-center justify-end">
                  <span className="text-base font-black text-orange-600 tracking-tight">
                    {currencySymbol}
                    {subValue}
                  </span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyResultBar;
