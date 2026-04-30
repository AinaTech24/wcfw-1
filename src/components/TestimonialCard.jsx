import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const TestimonialCard = ({ 
  name, 
  designation, 
  company, 
  testimonial, 
  rating = 5, 
  avatar, 
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="relative bg-white p-8 rounded-2xl shadow-warm border-2 border-orange-100 hover:border-orange-300 hover:shadow-warm-lg transition-all duration-300"
    >
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 rounded-t-2xl"></div>

      {/* Quote Icon */}
      <div className="absolute -top-4 left-6">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-warm">
          <FaQuoteLeft className="text-white text-sm" />
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center mb-4 pt-4">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`text-lg ${
              index < rating ? 'text-orange-400' : 'text-gray-300'
            } transition-colors duration-200`}
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-700 mb-6 leading-relaxed italic text-base">
        "{testimonial}"
      </p>

      {/* Author Info */}
      <div className="flex items-center">
        <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 shadow-md">
          {avatar || name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-lg">{name}</h4>
          <p className="text-sm text-gray-600 font-medium">
            {designation}{company ? ` at ${company}` : ''}
          </p>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-50 to-transparent rounded-tl-full opacity-50 pointer-events-none"></div>
    </motion.div>
  );
};

export default TestimonialCard;
