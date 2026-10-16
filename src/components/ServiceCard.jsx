import React from "react";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  features,
  buttonText = "Explore More",
  buttonLink = "#",
  image,
  gradient = "from-orange-500 to-yellow-500",
}) => {
  return (
    <div className="group relative h-[400px] sm:h-[450px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl bg-white border border-gray-100 transition-all duration-300 hover:-translate-y-2">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
      </div>

      {/* Floating Icon */}
      <div className="absolute z-20 top-4 sm:top-6 right-4 sm:right-6">
        <div
          className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-xl border border-white/20 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3`}
        >
          <Icon className="text-2xl text-white sm:text-3xl" />
        </div>
      </div>

      {/* Content Card */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6">
        <div className="px-5 pt-5 pb-5 overflow-hidden border shadow-2xl rounded-3xl border-white/20 bg-white/10 backdrop-blur-xl sm:px-6 sm:pt-6 transition-all duration-300">
          {/* Title */}
          <h3 className="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-orange-300">
            {title}
          </h3>

          {/* Description */}
          <p className="mb-4 text-sm leading-relaxed sm:text-base text-white/90">
            {description}
          </p>

          {/* Features */}
          {features && (
            <div className="mb-4 space-y-1.5">
              {features.slice(0, 3).map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center text-xs font-medium sm:text-sm text-white/95"
                >
                  <FaCheckCircle className="flex-shrink-0 mr-2 text-orange-400 text-xs sm:text-sm" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <Link
            to={buttonLink}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-r from-yellow-400/90 to-orange-500/90 hover:from-yellow-400 hover:to-orange-500 hover:scale-105 hover:shadow-xl"
          >
            <span>{buttonText}</span>
            <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Glow Border */}
      <div className="absolute inset-0 transition-all duration-300 border pointer-events-none border-orange-400/20 rounded-3xl group-hover:border-orange-400/50" />
    </div>
  );
};

export default ServiceCard;
