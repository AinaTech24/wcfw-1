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
      className="fixed z-[99999] bottom-5 left-5 md:bottom-6 md:left-6"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366]"
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaWhatsapp className="text-white text-3xl" />
      </motion.div>
    </motion.a>
  );
};

export default WhatsAppFloat;
