import React from "react";
import { Link } from "react-router-dom";

const CTAButton = ({
  to = "/",
  text = "Get Started",
  icon,
  variant = "primary",
  className = "",
}) => {
  const isPrimary = variant === "primary";

  return (
    <Link
      to={to}
      className={`group relative inline-flex w-fit items-center h-12 pl-3 pr-8 rounded-2xl font-bold overflow-hidden whitespace-nowrap transition-all duration-500 outline-none
      ${
        isPrimary
          ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:shadow-[0_14px_30px_-10px_rgba(249,115,22,.55)]"
          : "border-2 border-slate-300 bg-white text-slate-800 hover:border-orange-500 hover:shadow-[0_14px_30px_-10px_rgba(249,115,22,.25)]"
      }
      ${className}`}
    >
      {/* Expanding Pill */}
      <span
        className={`absolute left-2 top-1/2 h-9 w-9 -translate-y-1/2 rounded-xl transition-all duration-500 ease-in-out group-hover:w-[calc(100%-16px)]
        ${isPrimary ? "bg-white/80" : "bg-orange-500"}`}
      />

      {/* Icon */}
      <span className="absolute z-10 flex items-center justify-center -translate-y-1/2 w-9 h-9 left-2 top-1/2">
        {icon &&
          React.cloneElement(icon, {
            className: `text-sm transition-transform duration-500 group-hover:translate-x-1 ${
              isPrimary ? "text-orange-500" : "text-white group-hover:rotate-12"
            }`,
          })}
      </span>

      {/* Hover Text */}
      <span
        className={`absolute left-14 right-5 top-1/2 z-10 -translate-y-1/2 whitespace-nowrap text-sm font-bold opacity-0 transition-all duration-300 delay-150 group-hover:opacity-100
        ${isPrimary ? "text-orange-500" : "text-white"}`}
      >
        {text}
      </span>

      {/* Default Text */}
      <span className="relative z-10 ml-12 transition-all duration-300 whitespace-nowrap group-hover:translate-x-3 group-hover:opacity-0">
        {text}
      </span>
    </Link>
  );
};

export default CTAButton;
