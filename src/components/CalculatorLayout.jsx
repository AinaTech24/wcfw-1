import React, { useState } from "react";
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
import { FaCalculator } from "react-icons/fa";

const calculators = {
  sip: { label: "SIP Calculator", component: <SIPCalculator /> },
  lumpsum: { label: "Lumpsum Calculator", component: <LumpsumCalculator /> },
  swp: { label: "SWP Calculator", component: <SWPCalculator /> },
  stp: { label: "STP Calculator", component: <STPCalculator /> },
  retirement: { label: "Retirement Calculator", component: <RetirementCalculator /> },
  delay: { label: "Delay Calculator", component: <DelayCalculator /> },
  emi: { label: "EMI Calculator", component: <EMICalculator /> },
  insurance: { label: "Insurance Calculator", component: <InsuranceCalculator /> },
  tax: { label: "Tax Calculator", component: <TaxCalculator /> },
  marriage: { label: "Marriage Calculator", component: <MarriageCalculator /> },
  education: { label: "Education Calculator", component: <EducationCalculator /> },
  "home-loan": { label: "Home Loan Calculator", component: <HomeLoanCalculator /> },
  "car-loan": { label: "Car Loan Calculator", component: <CarLoanCalculator /> },
  vacation: { label: "Vacation Calculator", component: <VacationCalculator /> },
};

const Calculator = () => {
  const [selected, setSelected] = useState("sip");

  return (
    <div className="pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-16 bg-gradient-to-br from-orange-50 via-white to-yellow-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-10">
          {/* Icon Badge - Responsive sizing */}
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-warm">
            <FaCalculator className="text-white text-xl sm:text-2xl" />
          </div>

          {/* Title - Responsive text */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 px-4">
            Financial <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">Calculators</span>
          </h1>

          {/* Subtitle - Better mobile readability */}
          <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
            Solution your financial future with our comprehensive suite of calculators.
            Make informed investment decisions today.
          </p>

          {/* Decorative Line - Responsive sizing */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="h-0.5 sm:h-1 w-12 sm:w-20 bg-gradient-to-r from-transparent to-orange-500 rounded"></div>
            <div className="h-0.5 sm:h-1 w-12 sm:w-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded mx-2"></div>
            <div className="h-0.5 sm:h-1 w-12 sm:w-20 bg-gradient-to-r from-yellow-500 to-transparent rounded"></div>
          </div>

          {/* Dropdown - Mobile-friendly with larger touch target */}
          <div className="relative inline-block w-full max-w-md px-4 sm:px-0">
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full px-6 sm:px-8 py-3 sm:py-4 pr-10 sm:pr-12 border-2 border-orange-300 rounded-lg sm:rounded-xl text-gray-800 font-semibold shadow-warm bg-white hover:border-orange-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 cursor-pointer appearance-none text-sm sm:text-base touch-manipulation"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23f97316'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.25rem'
              }}
            >
              {Object.entries(calculators).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Calculator - Mobile optimized */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-warm-lg p-4 sm:p-6 md:p-8 border-2 border-orange-100 hover:border-orange-200 transition-all duration-300">
          {/* Calculator Title Bar - Responsive */}
          <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 border-orange-100">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
              <span className="w-1.5 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full mr-2 sm:mr-3"></span>
              <span className="leading-tight">{calculators[selected].label}</span>
            </h2>
          </div>

          {/* Calculator Component */}
          <div className="calculator-content">
            {calculators[selected].component}
          </div>
        </div>

        {/* Info Cards - Mobile First Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-8 sm:mt-10 lg:mt-12">
          <div className="bg-gradient-to-br from-orange-50 to-white p-5 sm:p-6 rounded-xl border-2 border-orange-200 shadow-warm hover:shadow-warm-lg transition-all duration-300 touch-manipulation">
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mb-3 sm:mb-4 shadow-md">
              <span className="text-white text-lg sm:text-xl font-bold">✓</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2 text-base sm:text-lg">Accurate Results</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Get precise calculations based on current market standards and regulations.</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-white p-5 sm:p-6 rounded-xl border-2 border-orange-200 shadow-warm hover:shadow-warm-lg transition-all duration-300 touch-manipulation">
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-3 sm:mb-4 shadow-md">
              <span className="text-white text-lg sm:text-xl font-bold">⚡</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2 text-base sm:text-lg">Instant Calculations</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Real-time results to help you make quick and informed financial decisions.</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-white p-5 sm:p-6 rounded-xl border-2 border-orange-200 shadow-warm hover:shadow-warm-lg transition-all duration-300 touch-manipulation sm:col-span-2 lg:col-span-1">
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mb-3 sm:mb-4 shadow-md">
              <span className="text-white text-lg sm:text-xl font-bold">📊</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2 text-base sm:text-lg">Visual Insights</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Easy-to-understand charts and graphs for better financial solution.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
