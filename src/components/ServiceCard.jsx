import React from "react";
import { motion } from "framer-motion";
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
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative h-[400px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Floating Icon */}
      <div className="absolute z-20 top-4 sm:top-6 right-4 sm:right-6">
        <motion.div
          whileHover={{ scale: 1.08, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-xl border border-white/20`}
        >
          <Icon className="text-2xl text-white sm:text-3xl" />
        </motion.div>
      </div>

      {/* Content Card */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6">
        <motion.div
          initial="rest"
          whileHover="hover"
          animate="rest"
          variants={{
            rest: { height: 210, y: 0 },
            hover: {
              height: 305,
              y: -10,
              transition: { duration: 0.45, ease: "easeInOut" },
            },
          }}
          className="px-5 pt-5 pb-5 overflow-hidden border shadow-2xl rounded-3xl border-white/20 bg-white/10 backdrop-blur-xl sm:px-6 sm:pt-6"
        >
          {/* Title */}
          <h3 className="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-orange-300">
            {title}
          </h3>

          {/* Description */}
          <p className="mb-4 text-sm leading-relaxed sm:text-base text-white/85">
            {description}
          </p>

          {/* Features */}
          {features && (
            <motion.div
              variants={{
                rest: { opacity: 0, height: 0 },
                hover: {
                  opacity: 1,
                  height: "auto",
                  transition: {
                    duration: 0.35,
                    staggerChildren: 0.08,
                    delayChildren: 0.05,
                  },
                },
              }}
              className="mb-4 overflow-hidden"
            >
              {features.slice(0, 3).map((feature, index) => (
                <motion.div
                  key={index}
                  variants={{
                    rest: { opacity: 0, x: -12 },
                    hover: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center mb-2 text-xs font-medium sm:text-sm text-white/90"
                >
                  <FaCheckCircle className="flex-shrink-0 mr-2 text-orange-400" />
                  {feature}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* CTA */}
<Link
  to={buttonLink}
  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white transition-all duration-500 ease-in-out shadow-lg rounded-2xl bg-gradient-to-r from-yellow-400/80 to-orange-500/80 hover:from-yellow-400 hover:to-orange-500 hover:scale-105 hover:shadow-xl"
>
  {buttonText}
  <FaArrowRight className="text-xs transition-transform duration-500 ease-in-out" />
</Link>
        </motion.div>
      </div>

      {/* Glow Border */}
      <div className="absolute inset-0 transition-all duration-500 border pointer-events-none border-orange-400/20 rounded-3xl group-hover:border-orange-400/50" />
    </motion.div>
  );
};

export default ServiceCard;
