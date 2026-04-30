import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaTrophy,
  FaLightbulb,
  FaCalculator,
  FaArrowRight,
  FaCheckCircle,
  FaCoins,
  FaPiggyBank,
} from "react-icons/fa";
import { Line, Doughnut } from "react-chartjs-2";
import SliderInput from "../../components/SliderInput";
import StickyResultBar from "../../components/StickyResultBar";
import { useEffect } from "react";
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

import ResultCard from "../../components/ResultCard";

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

const LumpsumCalculator = () => {
  const [investment, setInvestment] = useState(100000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [currency, setCurrency] = useState("INR");
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) setShowSticky(true);
      else setShowSticky(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currencySymbols = {
    INR: "₹",
    USD: "$",
    EUR: "€",
  };

  // Calculate Lumpsum returns
  const calculateLumpsum = () => {
    const rate = expectedReturn / 100;
    const futureValue = investment * Math.pow(1 + rate, timePeriod);
    const estimatedReturns = futureValue - investment;

    return {
      futureValue: Math.round(futureValue),
      totalInvestment: investment,
      estimatedReturns: Math.round(estimatedReturns),
      returnPercentage: ((estimatedReturns / investment) * 100).toFixed(2),
      cagrRate: expectedReturn,
    };
  };

  const results = calculateLumpsum();

  // Growth Chart Data
  const growthChartData = {
    labels: Array.from({ length: timePeriod + 1 }, (_, i) => `Year ${i}`),
    datasets: [
      {
        label: "Terminal Value",
        data: Array.from({ length: timePeriod + 1 }, (_, i) => {
          const rate = expectedReturn / 100;
          return Math.round(investment * Math.pow(1 + rate, i));
        }),
        borderColor: "rgb(249, 115, 22)",
        backgroundColor: "rgba(249, 115, 22, 0.05)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgb(249, 115, 22)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const growthChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f172a",
        padding: 12,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        callbacks: {
          label: (context) =>
            `Value: ${currencySymbols[currency]}${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        grid: { color: "rgba(0,0,0,0.05)" },
        ticks: {
          callback: (value) =>
            `${currencySymbols[currency]}${(value / 100000).toFixed(1)}L`,
          font: { size: 11, weight: "600" },
        },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 11, weight: "600" } },
      },
    },
  };

  // const doughnutChartOptions = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   plugins: {
  //     legend: {
  //       position: "bottom",
  //       labels: {
  //         font: { size: 12, weight: "bold" },
  //         padding: 20,
  //         color: "#1e293b",
  //       },
  //     },
  //     tooltip: {
  //       backgroundColor: "#0f172a",
  //       padding: 12,
  //       titleFont: { size: 14, weight: "bold" },
  //       bodyFont: { size: 13 },
  //       callbacks: {
  //         label: (context) =>
  //           ` ${context.label}: ${currencySymbols[currency]}${context.parsed.toLocaleString()}`,
  //       },
  //     },
  //   },
  //   cutout: "70%",
  //   borderWidth: 0,
  // };

  const doughnutChartData = {
    labels: ["Capital Deployment", "Wealth Accrual"],
    datasets: [
      {
        data: [results.totalInvestment, results.estimatedReturns],
        backgroundColor: ["#0f172a", "#f97316"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 4,
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className="calculator-container bg-[#f8fafc]">
      {/* Hero Section*/}
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
              <FaPiggyBank className="text-xs text-orange-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-900">
                Institutional Lumpsum
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[1.05] text-slate-900">
              Capital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Multiplier.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto mt-6 text-base font-medium leading-relaxed text-slate-700 sm:text-xl">
              Calculate future value of one-time capital deployment with
              precision forecasting and compounding intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-20 py-12 -mt-10 sm:py-24">
        <div className="px-4 mx-auto max-w-7xl">
          {/* Top Wrapper */}
          <div className="bg-white border border-slate-100 shadow-xl rounded-[3rem] p-5 sm:p-8">
            {/* Header */}
            <div className="flex flex-col gap-5 mb-8 lg:flex-row lg:items-start lg:justify-between">
              <h2 className="text-2xl font-black text-slate-900">
                <FaCalculator className="inline-block mr-3 text-orange-500" />
                Investment Inputs
              </h2>

              {/* Currency */}
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
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.75fr)_minmax(300px,0.85fr)] items-start">
              {/* LEFT : INPUTS */}
              <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
                <SliderInput
                  label="Initial Deployment"
                  value={investment}
                  onChange={setInvestment}
                  min={10000}
                  max={10000000}
                  step={10000}
                  prefix={currencySymbols[currency]}
                />

                <SliderInput
                  label="Expected Yield (%)"
                  value={expectedReturn}
                  onChange={setExpectedReturn}
                  min={1}
                  max={30}
                  step={0.5}
                  suffix="%"
                />

                <SliderInput
                  label="Time Horizon"
                  value={timePeriod}
                  onChange={setTimePeriod}
                  min={1}
                  max={40}
                  step={1}
                  suffix=" Years"
                />
              </div>

              {/* RIGHT : RESULT CARDS */}
              <div className="flex flex-col w-full min-w-0 gap-4">
                <ResultCard
                  className="w-full"
                  icon={FaCoins}
                  label="Capital Deployed"
                  value={`${currencySymbols[currency]}${(
                    results.totalInvestment / 100000
                  ).toFixed(2)}L`}
                  subtext="Initial Liquidity"
                />

                <ResultCard
                  className="w-full"
                  icon={FaChartLine}
                  label="Accrued Yield"
                  value={`${currencySymbols[currency]}${(
                    results.estimatedReturns / 100000
                  ).toFixed(2)}L`}
                  subtext="Net Wealth Creation"
                  color="text-orange-600"
                />

                <ResultCard
                  className="w-full"
                  icon={FaTrophy}
                  label="Terminal Corpus"
                  value={`${currencySymbols[currency]}${(
                    results.futureValue / 100000
                  ).toFixed(2)}L`}
                  subtext="Projected Value"
                  featured
                />
              </div>
            </div>

            {/* INSIGHT */}
            <div className="mt-8 bg-orange-50 rounded-[2rem] p-5 border border-orange-100">
              <div className="flex gap-3">
                <FaLightbulb className="mt-1 text-orange-500" />
                <p className="text-sm leading-relaxed text-slate-600">
                  Lumpsum strategies benefit from time in market. Early
                  deployment can dramatically improve terminal corpus.
                </p>
              </div>
            </div>
          </div>

          {/* SECOND ROW */}
          <div className="grid gap-8 mt-8 lg:grid-cols-12">
            {/* LEFT - CHART */}
            <div className="lg:col-span-8 bg-white rounded-[3rem] shadow-xl border border-slate-100 p-6 sm:p-8">
              <h3 className="mb-8 text-xl font-black tracking-tight uppercase text-slate-900">
                Growth Projection
              </h3>

              <div className="h-[380px] sm:h-[520px]">
                <Line data={growthChartData} options={growthChartOptions} />
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-8 lg:col-span-4">
              {/* Doughnut */}
              <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 p-8 text-center">
                <h3 className="mb-8 text-lg font-black tracking-tight uppercase text-slate-900">
                  Yield Breakdown
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
                      Growth Factor
                    </span>

                    <span className="text-2xl font-black text-orange-600">
                      {Number(results.returnPercentage).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* PROTOCOL */}
              <div className="bg-slate-900 rounded-[3rem] shadow-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-orange-600/20 blur-3xl"></div>

                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-8">
                  Wealth Protocol
                </h4>

                <div className="space-y-5">
                  <BenefitItem text="Compounding Velocity" />
                  <BenefitItem text="Inflation Hedge" />
                  <BenefitItem text="Portfolio Recalibration" />
                </div>

                <Link
                  to="/contact"
                  className="flex items-center justify-center py-4 mt-10 text-xs font-black tracking-widest uppercase transition-all bg-orange-600 hover:bg-white hover:text-orange-600 rounded-2xl"
                >
                  Consult Architect
                  <FaArrowRight className="ml-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY */}
      <StickyResultBar
        label="Terminal Value"
        value={(results.futureValue / 100000).toFixed(2) + "L"}
        subLabel="Returns"
        subValue={(results.estimatedReturns / 100000).toFixed(2) + "L"}
        currencySymbol={currencySymbols[currency]}
        isVisible={showSticky}
      />
    </div>
  );
};

const BenefitItem = ({ text }) => (
  <div className="flex items-center space-x-3">
    <FaCheckCircle className="text-sm text-orange-500" />
    <span className="text-xs font-black tracking-widest uppercase text-slate-300">
      {text}
    </span>
  </div>
);

export default LumpsumCalculator;
