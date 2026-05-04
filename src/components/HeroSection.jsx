import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import heroNikhil from "../assets/image1.png";
import heroCoins from "../assets/image2.png";
import heroPrepared from "../assets/image3.png";
import CTAButton from "./CTAButton";

const slides = [
  {
    id: 1,
    keyword: "Financial Freedom",
    title: "Starts With Clarity",
    description:
      "Build wealth with a goal-based investment strategy tailored to your income, family priorities, and future plans.",
    disclaimer:
      "Mutual Fund investments are subject to market risks. Read all scheme related documents carefully.",
    primaryBtn: "Schedule Now",
    primaryLink: "/contact",
  },
  {
    id: 2,
    keyword: "Grow Wealth",
    title: "With Smart Investing",
    description:
      "Create long-term wealth through SIPs, diversified portfolios, tax-efficient planning, and disciplined investing.",
    disclaimer:
      "Past performance does not guarantee future returns. Please assess risk appetite before investing.",
    primaryBtn: "Invest Now",
    primaryLink: "/goals/wealth-creation",
  },
  {
    id: 3,
    keyword: "Stay Ready",
    title: "For Every Life Goal",
    description:
      "From child education to retirement and emergency funds, stay financially prepared with regular portfolio reviews.",
    disclaimer:
      "Mutual Fund investments are subject to market risks. Read all scheme related documents carefully.",
    primaryBtn: "Start Planning",
    primaryLink: "/services",
  },
];

const HeroSection = ({ content }) => {
  const displaySlides = useMemo(() => {
    if (content && Object.keys(content).length > 0) {
      return slides.map((slide, index) =>
        index === 0
          ? {
              ...slide,
              keyword: content.keyword || slide.keyword,
              title: content.title || slide.title,
              description: content.description || slide.description,
            }
          : slide,
      );
    }
    return slides;
  }, [content]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused, displaySlides.length]);

  const changeSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 20 : -20, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? -20 : 20, opacity: 0 }),
  };

  const activeSlide = displaySlides[currentSlide];

  return (
    <section
      className="relative min-h-[80vh] flex items-center bg-gray-50 py-6 sm:py-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* LEFT CONTENT */}
          <div>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {/* Badge */}
                <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-orange-700 bg-orange-100 rounded-full">
                  Trusted Financial Guidance
                </span>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  <span className="text-orange-600">{activeSlide.keyword}</span>
                  <br />
                  {activeSlide.title}
                </h1>

                {/* Description */}
                <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-lg">
                  {activeSlide.description}
                </p>

                {/* CTA Button */}
                <div className="mt-6">
                  <CTAButton
                    to={activeSlide.primaryLink}
                    text={activeSlide.primaryBtn}
                    icon={<FaArrowRight className="text-xs" />}
                    variant="primary"
                  />
                </div>

                {/* Disclaimer */}
                <p className="mt-4 text-xs text-gray-400 italic max-w-lg">
                  {activeSlide.disclaimer}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="flex gap-2 mt-6">
              {displaySlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => changeSlide(index)}
                  className={`h-2 rounded-full transition-all duration-200 outline-none ${
                    currentSlide === index
                      ? "w-6 bg-orange-600"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[36vw] lg:h-[36vw] lg:mb-[-6rem]">
                  {/* Main Image Circle */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <img
                      src={
                        currentSlide === 0
                          ? heroNikhil
                          : currentSlide === 1
                            ? heroCoins
                            : heroPrepared
                      }
                      loading="lazy"
                      alt="Financial Advisory"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
