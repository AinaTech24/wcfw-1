import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const WhatsAppFloat = () => {
  return (
    <motion.a
      href="https://wa.me/919377277703"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed z-[99999]
                 bottom-4 left-4
                 sm:bottom-5 sm:left-5
                 md:bottom-6 md:left-6"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.6,
        duration: 0.5,
        type: "spring",
        stiffness: 180,
        damping: 16,
      }}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Capsule Button */}
      <div
        className="
          relative overflow-hidden rounded-full
          w-auto max-w-[calc(100vw-2rem)]
          sm:max-w-[320px]
          md:max-w-[340px]
          px-3 py-2.5
          sm:px-4 sm:py-3
          border border-white/20
          bg-[#25D366]/95
          backdrop-blur-sm
          shadow-[0_10px_30px_rgba(37,211,102,0.22)]
          transition-all duration-300
        "
      >
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#03C03C] via-[#25D366] to-[#4CBB17] bg-[length:200%_200%]"
          animate={{
            backgroundPosition: [
              "0% 50%",
              "100% 50%",
              "0% 50%",
            ],
          }}
          transition={{
            duration: 4,
            ease: "linear",
            repeat: Infinity,
          }}
        />

        {/* Content */}
        <div className="relative flex items-center gap-3">
          {/* Icon */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 sm:w-11 sm:h-11 bg-white/20">
            <FaWhatsapp className="text-xl text-white sm:text-2xl" />
          </div>

          {/* Text */}
          <div className="min-w-0 leading-tight text-white">
            <p className="text-[11px] sm:text-xs font-medium opacity-85">
              Need Help?
            </p>
            <p className="text-sm font-semibold truncate sm:text-base">
              Chat with us
            </p>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default WhatsAppFloat;