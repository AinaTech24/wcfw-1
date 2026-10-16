import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/919377277703"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed z-[99999] bottom-5 left-5 md:bottom-6 md:left-6 transition-transform duration-300 hover:scale-110 active:scale-95 shadow-2xl rounded-full"
    >
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg">
        <FaWhatsapp className="text-white text-3xl" />
      </div>
    </a>
  );
};

export default WhatsAppFloat;
