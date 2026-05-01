/// components/ResultCard.jsx

import React from "react";
import { motion } from "framer-motion";

const ResultCard = ({
  icon: Icon,
  label,
  value,
  subtext,
  featured = false,
  color = "text-slate-900",
  className = "",
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`
        w-full
        rounded-[2rem]
        px-5 py-4
        ${featured ? "bg-slate-900 text-white shadow-xl" : "bg-white shadow-md"}
        ${className}
      `}
    >
      {/* INLINE COMPACT LAYOUT */}
      <div className="flex items-center gap-4">
        {/* ICON */}
        <div
          className={`
            w-11 h-11 shrink-0
            rounded-2xl
            flex items-center justify-center
            ${featured ? "bg-orange-500" : "bg-orange-50"}
          `}
        >
          {Icon && (
            <Icon
              className={`text-sm ${
                featured ? "text-white" : "text-orange-500"
              }`}
            />
          )}
        </div>

        {/* TEXT */}
        <div className="min-w-0 leading-none">
          <p
            className={`text-[11px] font-black uppercase tracking-wide ${
              featured ? "text-slate-300" : "text-slate-400"
            }`}
          >
            {label}
          </p>

          <p
            className={`mt-1 text-[2rem] sm:text-[2.15rem] font-black leading-none ${
              featured ? "text-white" : color
            }`}
          >
            {value}
          </p>

          {subtext && (
            <p
              className={`mt-2 text-sm leading-none ${
                featured ? "text-orange-300" : "text-slate-500"
              }`}
            >
              {subtext}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
