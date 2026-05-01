// components/CustomSelect.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const CustomSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "Select Option",
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const selected = options.find((item) => item.value === value);

  const handleSelect = (item) => {
    onChange(item.value);
    setOpen(false);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full p-5 font-bold text-left transition-all border outline-none bg-slate-50 border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 text-slate-800 hover:bg-white"
      >
        <span>{selected ? selected.label : placeholder}</span>

        <FaChevronDown
          className={`text-sm text-slate-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 z-50 w-full mt-3 overflow-hidden bg-white border shadow-2xl top-full border-slate-100 rounded-2xl"
          >
            <div className="p-2">
              {options.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={`w-full px-5 py-4 text-left rounded-xl font-bold transition-all text-sm outline-none ${
                    value === item.value
                      ? "bg-orange-50 text-orange-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;
