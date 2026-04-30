// src/components/Calculator.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";

// ✅ Correct path - components se pages tak jana padega
import SIPCalculator from "../pages/calculators/SIPCalculator";
import LumpsumCalculator from "../pages/calculators/LumpsumCalculator";
import SWPCalculator from "../pages/calculators/SWPCalculator";
import STPCalculator from "../pages/calculators/STPCalculator";
import RetirementCalculator from "../pages/calculators/RetirementCalculator";
import DelayCalculator from "../pages/calculators/DelayCalculator";
import EMICalculator from "../pages/calculators/EMICalculator";
import InsuranceCalculator from "../pages/calculators/InsuranceCalculator";
import TaxCalculator from "../pages/calculators/TaxCalculator";
import MarriageCalculator from "../pages/calculators/MarriageCalculator";
import EducationCalculator from "../pages/calculators/EducationCalculator";
import HomeLoanCalculator from "../pages/calculators/HomeLoanCalculator";
import CarLoanCalculator from "../pages/calculators/CarLoanCalculator";
import VacationCalculator from "../pages/calculators/VacationCalculator";
import { FaCalculator, FaChartLine, FaLightbulb, FaRocket } from "react-icons/fa";

const calculators = {
  sip: { label: "SIP Calculator", component: <SIPCalculator />, icon: FaChartLine },
  lumpsum: { label: "Lumpsum Calculator", component: <LumpsumCalculator />, icon: FaChartLine },
  swp: { label: "SWP Calculator", component: <SWPCalculator />, icon: FaChartLine },
  stp: { label: "STP Calculator", component: <STPCalculator />, icon: FaChartLine },
  retirement: { label: "Retirement Calculator", component: <RetirementCalculator />, icon: FaRocket },
  delay: { label: "Delay Calculator", component: <DelayCalculator />, icon: FaLightbulb },
  emi: { label: "EMI Calculator", component: <EMICalculator />, icon: FaCalculator },
  insurance: { label: "Insurance Calculator", component: <InsuranceCalculator />, icon: FaCalculator },
  tax: { label: "Tax Calculator", component: <TaxCalculator />, icon: FaCalculator },
  marriage: { label: "Marriage Calculator", component: <MarriageCalculator />, icon: FaRocket },
  education: { label: "Education Calculator", component: <EducationCalculator />, icon: FaRocket },
  "home-loan": { label: "Home Loan Calculator", component: <HomeLoanCalculator />, icon: FaCalculator },
  "car-loan": { label: "Car Loan Calculator", component: <CarLoanCalculator />, icon: FaCalculator },
  vacation: { label: "Vacation Calculator", component: <VacationCalculator />, icon: FaRocket },
};

const Calculator = () => {
  const [selected, setSelected] = useState("sip");

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Hero Header Section - Mobile Optimized */}
      <section className="relative h-[300px] sm:h-[350px] lg:h-[400px] bg-gradient-to-br from-slate-600 via-slate-700 to-gray-700 overflow-hidden">
        {/* Subtle circular outlines - responsive sizing */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Left circle - hidden on mobile */}
          <div className="hidden md:block absolute left-10 lg:left-20 top-1/2 -translate-y-1/2 w-48 lg:w-64 h-48 lg:h-64 border border-white/10 rounded-full"></div>
          {/* Right circle - hidden on mobile */}
          <div className="hidden md:block absolute right-10 lg:right-20 top-1/2 -translate-y-1/2 w-64 lg:w-80 h-64 lg:h-80 border border-white/10 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="max-w-7xl mx-auto w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-block mb-4 sm:mb-6"
              >
                <div className="bg-orange-600/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-4 py-1.5 sm:px-5 sm:py-2">
                  <span className="text-orange-400 font-semibold text-[10px] sm:text-xs uppercase tracking-widest">Since 1989</span>
                </div>
              </motion.div>

              {/* Title - Responsive text sizes */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 px-4">
                Financial <span className="text-orange-500">Calculators</span>
              </h1>

              {/* Subtitle - Better mobile readability */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 lg:mb-10 px-4">
                Empowering families with financial wisdom and building lasting relationships for over three decades
              </p>

              {/* Stats Row - Mobile optimized */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 text-white px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex flex-col items-center"
                >
                  <div className="flex items-center space-x-1.5 sm:space-x-2 mb-1">
                    <FaCalculator className="text-lg sm:text-xl lg:text-2xl text-orange-500" />
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">14+</span>
                  </div>
                  <span className="text-gray-400 text-xs sm:text-sm font-medium">Calculators</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex flex-col items-center"
                >
                  <div className="flex items-center space-x-1.5 sm:space-x-2 mb-1">
                    <FaChartLine className="text-lg sm:text-xl lg:text-2xl text-orange-500" />
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">100%</span>
                  </div>
                  <span className="text-gray-400 text-xs sm:text-sm font-medium">Accurate</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex flex-col items-center"
                >
                  <div className="flex items-center space-x-1.5 sm:space-x-2 mb-1">
                    <FaRocket className="text-lg sm:text-xl lg:text-2xl text-orange-500" />
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">Free</span>
                  </div>
                  <span className="text-gray-400 text-xs sm:text-sm font-medium">Always</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-white" style={{
          clipPath: 'ellipse(100% 100% at 50% 100%)',
          transform: 'translateY(50%)'
        }}></div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Calculator Grid Selection - Mobile First Responsive */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center px-4">
            Choose Your <span className="text-orange-600">Calculator</span>
          </h2>

          {/* Responsive Grid: 2 cols mobile → 3 cols tablet → 7 cols desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 sm:gap-4">
            {Object.entries(calculators).map(([key, { label, icon: Icon }]) => (
              <motion.button
                key={key}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelected(key)}
                className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${selected === key
                  ? 'bg-orange-500 border-orange-500 text-white shadow-lg'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-orange-300 hover:shadow-md'
                  }`}
              >
                <Icon className={`text-xl sm:text-2xl mx-auto mb-1.5 sm:mb-2 ${selected === key ? 'text-white' : 'text-orange-500'}`} />
                <p className={`text-[10px] sm:text-xs font-semibold text-center leading-tight ${selected === key ? 'text-white' : 'text-gray-700'}`}>
                  {label.replace(' Calculator', '')}
                </p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Active Calculator - Mobile optimized padding */}
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 border-2 border-gray-100"
        >
          {/* Calculator Title Bar */}
          <div className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b-2 border-orange-100">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
                <span className="w-1.5 sm:w-2 h-8 sm:h-10 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-3 sm:mr-4"></span>
                {calculators[selected].label}
              </h2>
              <div className="block">
                <div className="bg-orange-100 text-orange-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                  Free Tool
                </div>
              </div>
            </div>
          </div>

          {/* Calculator Component */}
          <div className="calculator-content">
            {calculators[selected].component}
          </div>
        </motion.div>

        {/* Info Cards - Mobile First Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mt-10 sm:mt-12 lg:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-50 to-white p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
              <span className="text-white text-xl sm:text-2xl font-bold">✓</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Accurate Results</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Get precise calculations based on current market standards and regulations.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-50 to-white p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
              <span className="text-white text-xl sm:text-2xl font-bold">⚡</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Instant Calculations</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Real-time results to help you make quick and informed financial decisions.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-50 to-white p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 sm:col-span-2 lg:col-span-1"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
              <span className="text-white text-xl sm:text-2xl font-bold">📊</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Visual Insights</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Easy-to-understand charts and graphs for better financial solution.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
