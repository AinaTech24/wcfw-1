import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaLightbulb,
  FaCalculator,
  FaArrowRight,
  FaCheckCircle,
  FaMoneyBillWave,
  FaPercentage,
  FaTrophy,
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

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [stepUp, setStepUp] = useState(10);
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

  /* SIP Calculation */

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;

    let totalValue = 0;
    let totalInvested = 0;
    let currentMonthlySIP = monthlyInvestment;

    const yearWiseBreakdown = [];

    for (let year = 1; year <= timePeriod; year++) {
      let yearlyInvestment = 0;

      for (let month = 1; month <= 12; month++) {
        totalValue = (totalValue + currentMonthlySIP) * (1 + monthlyRate);
        yearlyInvestment += currentMonthlySIP;
      }

      totalInvested += yearlyInvestment;

      yearWiseBreakdown.push({
        year,
        monthlySIP: Math.round(currentMonthlySIP),
        yearlyInvestment: Math.round(yearlyInvestment),
        totalAccumulated: Math.round(totalValue),
      });

      currentMonthlySIP = currentMonthlySIP * (1 + stepUp / 100);
    }

    const estimatedReturns = totalValue - totalInvested;

    return {
      futureValue: Math.round(totalValue),
      totalInvestment: Math.round(totalInvested),
      estimatedReturns: Math.round(estimatedReturns),
      returnPercentage: ((estimatedReturns / totalInvested) * 100).toFixed(2),
      yearWiseBreakdown,
    };
  };

  const results = calculateSIP();

  /* Line Chart */

  const growthChartData = {
    labels: Array.from({ length: timePeriod + 1 }, (_, i) => `Year ${i}`),

    datasets: [
      {
        label: "Future Value",
        data: [
          0,
          ...results.yearWiseBreakdown.map((item) => item.totalAccumulated),
        ],
        borderColor: "#f97316",
        backgroundColor: "rgba(249,115,22,0.10)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#f97316",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },

      {
        label: "Investment",
        data: [
          0,
          ...results.yearWiseBreakdown.reduce((acc, curr) => {
            const prev = acc.length > 0 ? acc[acc.length - 1] : 0;

            acc.push(prev + curr.yearlyInvestment);
            return acc;
          }, []),
        ],
        borderColor: "#0f172a",
        backgroundColor: "rgba(15,23,42,0.03)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#0f172a",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const growthChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: "700",
          },
        },
      },

      tooltip: {
        backgroundColor: "#0f172a",
        padding: 14,
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${
              currencySymbols[currency]
            }${(context.parsed.y / 100000).toFixed(2)}L`,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        grid: {
          color: "rgba(0,0,0,0.05)",
        },

        ticks: {
          callback: (value) =>
            `${currencySymbols[currency]}${(value / 100000).toFixed(1)}L`,
        },
      },

      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  /* Doughnut Chart */

  const doughnutChartData = {
    labels: ["Invested Capital", "Returns"],

    datasets: [
      {
        data: [results.totalInvestment, results.estimatedReturns],

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
              <FaCalculator className="text-xs text-orange-600" />

              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-900">
                Institutional SIP
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[1.05] text-slate-900">
              SIP <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Wealth Engine.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto mt-6 text-base font-medium leading-relaxed text-slate-700 sm:text-xl">
              Engineer long-term wealth through disciplined capital deployment
              and compound acceleration.
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
            <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,auto)]">
              {/* All Inputs */}
              <div className="grid min-w-0 gap-6 md:grid-cols-2">
                <SliderInput
                  label="Monthly SIP"
                  value={monthlyInvestment}
                  min={500}
                  max={200000}
                  step={500}
                  onChange={setMonthlyInvestment}
                  prefix={currencySymbols[currency]}
                />

                <SliderInput
                  label="Expected Return (%)"
                  value={expectedReturn}
                  min={1}
                  max={30}
                  step={0.5}
                  onChange={setExpectedReturn}
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
                  label="Annual Step-up (%)"
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
                  label="Total Invested"
                  value={`${currencySymbols[currency]}${(
                    results.totalInvestment / 100000
                  ).toFixed(1)}L`}
                  subtext="Capital Deployed"
                />

                <ResultCard
                  className="w-full sm:w-full xl:w-auto"
                  icon={FaPercentage}
                  label="Wealth Gain"
                  value={`${currencySymbols[currency]}${(
                    results.estimatedReturns / 100000
                  ).toFixed(1)}L`}
                  subtext="Compounding Growth"
                  color="text-orange-600"
                />

                <ResultCard
                  className="w-full sm:w-full xl:w-auto"
                  icon={FaTrophy}
                  label="Future Corpus"
                  value={`${currencySymbols[currency]}${(
                    results.futureValue / 100000
                  ).toFixed(1)}L`}
                  subtext="Terminal Value"
                  featured
                />
              </div>
            </div>

            {/* Insight Bar */}
            <div className="mt-8 bg-orange-50 rounded-[2rem] p-5 border border-orange-100">
              <div className="flex gap-3">
                <FaLightbulb className="mt-1 text-orange-500" />

                <p className="text-sm leading-relaxed text-slate-600">
                  Increase SIP every year to offset inflation and accelerate
                  long-term corpus growth.
                </p>
              </div>
            </div>
          </div>

          {/* Step-up Ledger Container */}
          <div className="grid gap-8 mt-8 lg:grid-cols-12">
            {/* Step-up Ledger */}
            <div className="lg:col-span-8 bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
              <div className="px-8 py-6 text-center text-white bg-slate-900">
                <h3 className="text-lg font-black tracking-widest uppercase">
                  Step-up Ledger
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
                        Monthly SIP
                      </th>

                      <th className="px-8 py-4 text-right text-[10px] uppercase tracking-widest text-slate-400">
                        Corpus
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
                          {row.monthlySIP.toLocaleString("en-IN")}
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
                      Return Ratio
                    </span>

                    <span className="text-2xl font-black text-orange-600">
                      {(
                        (results.estimatedReturns / results.futureValue) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                </div>
              </div>

              {/* Protocol */}
              <div className="bg-slate-900 rounded-[3rem] shadow-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-orange-600/20 blur-3xl"></div>

                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-8">
                  Wealth Protocol
                </h4>

                <div className="space-y-5">
                  <BenefitItem text="Rupee Cost Averaging" />
                  <BenefitItem text="Step-up Acceleration" />
                  <BenefitItem text="Long Horizon Dominance" />
                </div>

                <Link
                  to="/contact"
                  className="flex items-center justify-center py-4 mt-10 text-xs font-black tracking-widest uppercase transition-all bg-orange-600 hover:bg-white hover:text-orange-600 rounded-2xl"
                >
                  Speak to Wealth Architect
                  <FaArrowRight className="ml-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="mt-8 bg-white rounded-[3rem] shadow-xl border border-slate-100 p-6 sm:p-8">
            <h3 className="mb-8 text-xl font-black tracking-tight uppercase text-slate-900">
              Compound Growth Curve
            </h3>

            <div className="h-[380px] sm:h-[520px]">
              <Line data={growthChartData} options={growthChartOptions} />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky */}

      <StickyResultBar
        label="Future Corpus"
        value={(results.futureValue / 100000).toFixed(2) + "L"}
        subLabel="Monthly SIP"
        subValue={monthlyInvestment.toLocaleString("en-IN")}
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

export default SIPCalculator;
