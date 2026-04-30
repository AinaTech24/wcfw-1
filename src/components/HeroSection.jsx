import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { HiCheckCircle } from "react-icons/hi";
import { FaArrowRight, FaRegCompass } from "react-icons/fa";

import heroNikhil from "../assets/hero_nikhil.png";
import heroCoins from "../assets/hero_coins.jpg";
import heroPrepared from "../assets/hero_prepared.png";

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
    primaryBtn: "Book Free Consultation",
    primaryLink: "/contact",
    // secondaryBtn: "Explore Services",
    // secondaryLink: "/services",

    /* Dynamic Floating Cards */
    floatingCards: [
      {
        title: "Smart Planning",
        value: "Clear Goals",
        position: "top-8 -left-10",
      },
      {
        title: "Future Ready",
        value: "Long Term Focus",
        position: "bottom-12 -right-10",
      },
      {
        title: "Wealth Path",
        value: "On Track",
        position: "top-1/2 -right-14",
      },
    ],
  },

  {
    id: 2,
    keyword: "Grow Wealth",
    title: "With Smart Investing",
    description:
      "Create long-term wealth through SIPs, diversified portfolios, tax-efficient planning, and disciplined investing.",
    disclaimer:
      "Past performance does not guarantee future returns. Please assess risk appetite before investing.",
    primaryBtn: "Start Investing",
    primaryLink: "/goals/wealth-creation",
    // secondaryBtn: "View Wealth Plans",
    // secondaryLink: "/services",

    floatingCards: [
      {
        title: "Monthly SIP",
        value: "Consistent Growth",
        position: "top-8 -left-10",
      },
      {
        title: "Returns Focused",
        value: "Long Term",
        position: "bottom-12 -right-10",
      },
      {
        title: "Smart Assets",
        value: "Diversified",
        position: "top-1/2 -right-14",
      },
    ],
  },

  {
    id: 3,
    keyword: "Stay Ready",
    title: "For Every Life Goal",
    description:
      "From child education to retirement and emergency funds, stay financially prepared with regular portfolio reviews.",
    disclaimer:
      "Mutual Fund investments are subject to market risks. Read all scheme related documents carefully.",
    primaryBtn: "Plan My Future",
    primaryLink: "/services",
    // secondaryBtn: "Talk to Advisor",
    // secondaryLink: "/contact",

    floatingCards: [
      {
        title: "Emergency Fund",
        value: "Secure",
        position: "top-8 -left-10",
      },
      {
        title: "Retirement",
        value: "Prepared",
        position: "bottom-12 -right-10",
      },
      {
        title: "Family Goals",
        value: "Covered",
        position: "top-1/2 -right-14",
      },
    ],
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
  }, [paused, currentSlide, displaySlides.length]);

  const changeSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? 40 : -40,
      opacity: 0,
    }),
  };

  const activeSlide = displaySlides[currentSlide];

  return (
    <section
      className="relative overflow-hidden min-h-[90vh] flex items-center bg-gradient-to-br from-[#fff7ea] via-white to-[#eaf7ff]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative background */}
      <div className="absolute top-0 left-0 rounded-full w-72 h-72 bg-orange-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 rounded-full w-80 h-80 bg-sky-200/30 blur-3xl" />

      <div className="relative z-10 w-full px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45 }}
              >
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 mb-5 text-sm font-semibold text-orange-700 bg-orange-100 rounded-full">
                  Trusted Financial Guidance
                </div>

                {/* Heading */}
                <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl text-slate-900">
                  <span className="text-orange-500">{activeSlide.keyword}</span>
                  <br />
                  {activeSlide.title}
                </h1>

                {/* Description */}
                <p className="max-w-xl mt-6 text-lg leading-relaxed sm:text-xl text-slate-600">
                  {activeSlide.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-row flex-wrap gap-4 mt-8">
                  <CTAButton
                    to={activeSlide.primaryLink}
                    text={activeSlide.primaryBtn}
                    icon={<FaArrowRight />}
                    variant="primary"
                  />

                  {/* <CTAButton
                    to={activeSlide.secondaryLink}
                    text={activeSlide.secondaryBtn}
                    icon={<FaRegCompass />}
                    variant="secondary"
                  /> */}
                </div>

                {/* Disclaimer */}
                <p className="max-w-xl mt-6 text-xs italic text-slate-400">
                  {activeSlide.disclaimer}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="flex gap-3 mt-8">
              {displaySlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => changeSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-8 bg-orange-500"
                      : "w-3 bg-slate-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* ✅ Reduced overall image wrapper size */}
                <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[480px] xl:w-[540px] xl:h-[540px]">
                  {/* Glow */}
                  <div className="absolute inset-0 scale-90 bg-orange-100 rounded-full blur-3xl" />

                  {/* Main Circle Image */}
                  <div className="absolute inset-0 rounded-full overflow-hidden border-[8px] lg:border-[14px] border-white shadow-2xl bg-white">
                    <img
                      src={
                        currentSlide === 0
                          ? heroNikhil
                          : currentSlide === 1
                            ? heroCoins
                            : heroPrepared
                      }
                      alt="Financial Advisory"
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Floating Cards */}
                  {activeSlide.floatingCards.map((card, index) => (
                    <div
                      key={index}
                      className={`absolute hidden lg:flex flex-col px-4 py-3 bg-white shadow-xl rounded-2xl ${card.position}`}
                    >
                      <span className="text-xs text-slate-500">
                        {card.title}
                      </span>

                      <span className="text-lg font-bold text-orange-500">
                        {card.value}
                      </span>
                    </div>
                  ))}
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
