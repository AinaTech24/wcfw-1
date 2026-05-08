import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaCalculator,
  FaArrowRight,
  FaCheckCircle,
  FaMoneyBillWave,
  FaPercentage,
  FaTrophy,
  FaChartLine,
  FaShieldAlt,
  FaGem,
  FaLightbulb,
} from "react-icons/fa";

import { Line, Doughnut } from "react-chartjs-2";
import SliderInput from "../../components/SliderInput";
import StickyResultBar from "../../components/StickyResultBar";
import ResultCard from "../../components/ResultCard";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const DreamHome = () => {
  const [homeValue, setHomeValue] = useState(5000000);
  const [downPayment, setDownPayment] = useState(20);
  const [timePeriod, setTimePeriod] = useState(5);
  const [existingSavings, setExistingSavings] = useState(500000);
  const [stepUp, setStepUp] = useState(5);
  const [currency, setCurrency] = useState("INR");
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currencySymbols = {
    INR: "₹",
    USD: "$",
    EUR: "€",
  };

  const downPaymentAmount = (homeValue * downPayment) / 100;
  const expectedReturn = 12; // 12% expected return
  const monthlyRate = expectedReturn / 12 / 100;
  const months = timePeriod * 12;

  // Calculate required monthly contribution
  const calculateRequiredMonthly = () => {
    const targetAmount = downPaymentAmount;
    const existingFutureValue =
      existingSavings * Math.pow(1 + expectedReturn / 100, timePeriod);
    const additionalNeeded = Math.max(0, targetAmount - existingFutureValue);

    if (additionalNeeded <= 0 || months === 0) return 0;

    const monthlyRateCalc = expectedReturn / 12 / 100;
    const monthlyContribution =
      (additionalNeeded * monthlyRateCalc) /
      (Math.pow(1 + monthlyRateCalc, months) - 1);

    return monthlyContribution;
  };

  const baseMonthlyContribution = calculateRequiredMonthly();

  // Calculate full projection with step-up
  const calculateProjection = () => {
    let totalValue = existingSavings;
    let totalInvested = existingSavings;
    let currentMonthlyContribution = baseMonthlyContribution;
    const yearWiseBreakdown = [];

    for (let year = 1; year <= timePeriod; year++) {
      let yearlyInvestment = 0;

      for (let month = 1; month <= 12; month++) {
        totalValue =
          (totalValue + currentMonthlyContribution) * (1 + monthlyRate);
        yearlyInvestment += currentMonthlyContribution;
      }

      totalInvested += yearlyInvestment;

      yearWiseBreakdown.push({
        year,
        monthlyContribution: Math.round(currentMonthlyContribution),
        yearlyInvestment: Math.round(yearlyInvestment),
        totalAccumulated: Math.round(totalValue),
        downPaymentTarget: downPaymentAmount,
      });

      currentMonthlyContribution =
        currentMonthlyContribution * (1 + stepUp / 100);
    }

    const estimatedReturns = totalValue - totalInvested;

    return {
      futureValue: Math.round(totalValue),
      totalInvestment: Math.round(totalInvested),
      estimatedReturns: Math.round(estimatedReturns),
      returnPercentage:
        totalInvested > 0
          ? ((estimatedReturns / totalInvested) * 100).toFixed(2)
          : "0",
      yearWiseBreakdown,
      targetAmount: downPaymentAmount,
      isTargetAchieved: totalValue >= downPaymentAmount,
      gapAmount: Math.max(0, downPaymentAmount - totalValue),
    };
  };

  const results = calculateProjection();

  // Doughnut Chart Data
  const doughnutChartData = {
    labels: ["Total Contributions", "Market Growth"],
    datasets: [
      {
        data: [results.totalInvestment, Math.max(0, results.estimatedReturns)],
        backgroundColor: ["#0f172a", "#f97316"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 4,
        hoverOffset: 15,
      },
    ],
  };

  return (
    <div className="calculator-container bg-[#f8fafc]">
      {/* Hero Section */}
      <section
        className="relative min-h-[55vh] flex items-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(135deg,#ffe5bd 0%,#fffdf7 35%,#c7f1ff 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_100%)]"></div>
        </div>

        <div className="relative z-10 w-full px-4 py-12 mx-auto text-center max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 border rounded-full bg-white/60 border-white/40 backdrop-blur-md">
              <FaHome className="text-xs text-orange-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-900">
                HOME ACCUMULATION FRAMEWORK
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[1.05] text-slate-900">
              Heritage <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Residency.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto mt-6 text-base font-medium leading-relaxed text-slate-700 sm:text-xl">
              Systematic capital deployment for real estate ownership through
              disciplined accumulation and compound growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-20 py-12 -mt-10 sm:py-24">
        <div className="px-4 mx-auto max-w-7xl">
          {/* Main Wrapper */}
          <div className="bg-white border border-slate-100 shadow-xl rounded-[3rem] p-5 sm:p-8">
            {/* Header */}
            <div className="flex flex-col gap-5 mb-8 lg:flex-row lg:items-start lg:justify-between">
              <h2 className="text-2xl font-black text-slate-900">
                Investment Inputs
              </h2>

              <div>
                <p className="mb-3 text-[10px] font-black tracking-widest uppercase text-slate-400 lg:text-right">
                  Currency
                </p>
                <div className="flex gap-2">
                  {["INR", "USD", "EUR"].map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      className={`w-12 h-12 rounded-2xl text-sm font-black transition-all ${
                        currency === curr
                          ? "bg-slate-900 text-white shadow-lg"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Grid */}
            <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,auto)]">
              {/* All Inputs */}
              <div className="grid min-w-0 gap-6 md:grid-cols-2">
                <SliderInput
                  label="Target Property Value"
                  value={homeValue}
                  min={2000000}
                  max={50000000}
                  step={500000}
                  onChange={setHomeValue}
                  prefix={currencySymbols[currency]}
                />

                <SliderInput
                  label="Down Payment Share"
                  value={downPayment}
                  min={10}
                  max={50}
                  step={5}
                  onChange={setDownPayment}
                  suffix="%"
                />

                <SliderInput
                  label="Time Horizon"
                  value={timePeriod}
                  min={1}
                  max={40}
                  onChange={setTimePeriod}
                  suffix=" Years"
                />

                <SliderInput
                  label="Existing Capital"
                  value={existingSavings}
                  min={0}
                  max={10000000}
                  step={100000}
                  onChange={setExistingSavings}
                  prefix={currencySymbols[currency]}
                />

                <SliderInput
                  label="Annual Step-up"
                  value={stepUp}
                  min={0}
                  max={50}
                  step={1}
                  onChange={setStepUp}
                  suffix="%"
                />
              </div>

              {/* Result Cards */}
              <div className="order-3 w-full max-w-full min-w-0 space-y-4 xl:order-2 xl:max-w-max">
                <ResultCard
                  className="w-full sm:w-full xl:w-auto"
                  icon={FaMoneyBillWave}
                  label="Target Down Payment"
                  value={`${currencySymbols[currency]}${(downPaymentAmount / 100000).toFixed(1)}L`}
                  subtext="Required Capital"
                />

                <ResultCard
                  className="w-full sm:w-full xl:w-auto"
                  icon={FaPercentage}
                  label="Monthly Contribution"
                  value={`${currencySymbols[currency]}${baseMonthlyContribution.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 0,
                    },
                  )}`}
                  subtext="Base Systematic Transfer"
                  color="text-orange-600"
                />

                <ResultCard
                  className="w-full sm:w-full xl:w-auto"
                  icon={FaTrophy}
                  label="Projected Corpus"
                  value={`${currencySymbols[currency]}${(results.futureValue / 100000).toFixed(1)}L`}
                  subtext={
                    results.isTargetAchieved
                      ? "Target Achievable ✓"
                      : `Gap: ${currencySymbols[currency]}${(results.gapAmount / 100000).toFixed(1)}L`
                  }
                  featured={results.isTargetAchieved}
                />
              </div>
            </div>

            {/* Insight Bar */}
            <div className="mt-8 bg-orange-50 rounded-[2rem] p-5 border border-orange-100">
              <div className="flex gap-3">
                <FaLightbulb className="mt-1 text-orange-500" />
                <p className="text-sm leading-relaxed text-slate-600">
                  Increasing contributions annually may help offset inflation
                  and accelerate corpus growth. Historical market data suggests
                  longer time horizons may reduce required monthly commitments.
                  Past performance does not guarantee future results.
                </p>
              </div>
            </div>
          </div>

          {/* Accumulation Ledger Container */}
          <div className="grid gap-8 mt-8 lg:grid-cols-12">
            {/* Accumulation Ledger */}
            <div className="lg:col-span-8 bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
              <div className="px-8 py-6 text-center text-white bg-slate-900">
                <h3 className="text-lg font-black tracking-widest uppercase">
                  Accumulation Ledger
                </h3>
              </div>

              <div className="max-h-[620px] overflow-y-auto custom-scrollbar">
                <table className="w-full">
                  <thead className="sticky top-0 z-10 bg-slate-50">
                    <tr>
                      <th className="px-8 py-4 text-left text-[10px] uppercase tracking-widest text-slate-400">
                        Year
                      </th>
                      <th className="px-8 py-4 text-right text-[10px] uppercase tracking-widest text-slate-400">
                        Monthly Transfer
                      </th>
                      <th className="px-8 py-4 text-right text-[10px] uppercase tracking-widest text-slate-400">
                        Accumulated Corpus
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {results.yearWiseBreakdown.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-50">
                        <td className="px-8 py-4 text-xs font-black text-slate-600">
                          Y{row.year}
                        </td>
                        <td className="px-8 py-4 text-xs font-bold text-right text-slate-600">
                          {currencySymbols[currency]}
                          {row.monthlyContribution.toLocaleString("en-IN")}
                        </td>
                        <td className="px-8 py-4 text-xs font-black text-right text-orange-600">
                          {currencySymbols[currency]}
                          {(row.totalAccumulated / 100000).toFixed(2)}L
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Side */}
            <div className="space-y-8 lg:col-span-4">
              {/* Doughnut */}
              <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 p-8 text-center">
                <h3 className="mb-8 text-lg font-black tracking-tight uppercase text-slate-900">
                  Corpus Breakdown
                </h3>
                <div className="relative h-64">
                  <Doughnut
                    data={doughnutChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Growth Share
                    </span>
                    <span className="text-2xl font-black text-orange-600">
                      {results.returnPercentage}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Framework */}
              <div className="bg-slate-900 rounded-[3rem] shadow-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-orange-600/20 blur-3xl"></div>
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-8">
                  Accumulation Framework
                </h4>
                <div className="space-y-5">
                  <BenefitItem text="Rupee Cost Averaging" />
                  <BenefitItem text="Step-up Acceleration" />
                  <BenefitItem text="Long-term Asset Building" />
                  <BenefitItem text="Reduced Borrowing Needs" />
                </div>
                <Link
                  to="/contact"
                  className="flex items-center justify-center py-4 mt-10 text-xs font-black tracking-widest uppercase transition-all bg-orange-600 hover:bg-white hover:text-orange-600 rounded-2xl"
                >
                  Discuss Your Requirements
                  <FaArrowRight className="ml-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Chart */}
          {/* Asset Class Options */}
          <div className="mt-16 text-center">
            <h3 className="mb-4 text-xs font-extrabold tracking-widest text-orange-600 uppercase">
              Asset Class Options
            </h3>
            <h2 className="text-4xl font-extrabold text-slate-900">
              Capital Deployment Vehicles
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-3">
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-lg hover:shadow-2xl transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <FaChartLine className="text-2xl text-white" />
              </div>
              <h3 className="mb-3 text-xl font-extrabold text-slate-900">
                Equity Market Exposure
              </h3>
              <p className="mb-6 text-sm font-medium leading-relaxed text-slate-500">
                Historical growth opportunities for longer time horizons
              </p>
              <div className="pt-6 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                <span className="text-slate-400">Historical Range</span>
                <span className="text-orange-600">12-15% p.a.</span>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-lg hover:shadow-2xl transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <FaGem className="text-2xl text-white" />
              </div>
              <h3 className="mb-3 text-xl font-extrabold text-slate-900">
                Index-based Allocation
              </h3>
              <p className="mb-6 text-sm font-medium leading-relaxed text-slate-500">
                Broad market participation for capital accumulation
              </p>
              <div className="pt-6 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                <span className="text-slate-400">Historical Range</span>
                <span className="text-orange-600">11-13% p.a.</span>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-lg hover:shadow-2xl transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <FaShieldAlt className="text-2xl text-white" />
              </div>
              <h3 className="mb-3 text-xl font-extrabold text-slate-900">
                Fixed Income Instruments
              </h3>
              <p className="mb-6 text-sm font-medium leading-relaxed text-slate-500">
                Capital preservation as target date approaches
              </p>
              <div className="pt-6 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                <span className="text-slate-400">Historical Range</span>
                <span className="text-orange-600">7-9% p.a.</span>
              </div>
            </div>
          </div>

          {/* Phased Approach */}
          <div className="relative mt-16 overflow-hidden bg-slate-900 rounded-[3rem] p-10 sm:p-20 text-white">
            <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full w-96 h-96 bg-orange-600/10 blur-3xl"></div>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-extrabold">
                Systematic Acquisition Framework
              </h2>
              <p className="font-medium text-slate-400">
                Four phased approach to real estate capital accumulation
              </p>
            </div>
            <div className="relative z-10 grid gap-12 text-center sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="mb-4 text-6xl font-black text-orange-500 opacity-90">
                  01
                </div>
                <h4 className="mb-2 text-xl font-bold">Market Assessment</h4>
                <p className="text-sm font-medium text-slate-500">
                  Evaluate location value and historical patterns
                </p>
              </div>
              <div>
                <div className="mb-4 text-6xl font-black text-orange-500 opacity-90">
                  02
                </div>
                <h4 className="mb-2 text-xl font-bold">Capital Calibration</h4>
                <p className="text-sm font-medium text-slate-500">
                  Target 30% initial contribution structure
                </p>
              </div>
              <div>
                <div className="mb-4 text-6xl font-black text-orange-500 opacity-90">
                  03
                </div>
                <h4 className="mb-2 text-xl font-bold">
                  Systematic Deployment
                </h4>
                <p className="text-sm font-medium text-slate-500">
                  Regular contributions toward target corpus
                </p>
              </div>
              <div>
                <div className="mb-4 text-6xl font-black text-orange-500 opacity-90">
                  04
                </div>
                <h4 className="mb-2 text-xl font-bold">Credit Positioning</h4>
                <p className="text-sm font-medium text-slate-500">
                  Establish borrowing eligibility through disciplined savings
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bar */}
      <StickyResultBar
        label="Projected Corpus"
        value={(results.futureValue / 100000).toFixed(2) + "L"}
        subLabel="Monthly Transfer"
        subValue={baseMonthlyContribution.toLocaleString("en-IN")}
        currencySymbol={currencySymbols[currency]}
        isVisible={showSticky}
      />
    </div>
  );
};

const BenefitItem = ({ text }) => (
  <div className="flex items-center gap-3">
    <FaCheckCircle className="text-orange-500" />
    <span className="text-xs font-black tracking-widest uppercase text-slate-300">
      {text}
    </span>
  </div>
);

export default DreamHome;
