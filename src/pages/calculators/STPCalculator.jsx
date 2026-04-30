import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPiggyBank,
  FaChartLine,
  FaTrophy,
  FaLightbulb,
  FaExchangeAlt,
  FaCalculator,
  FaArrowRight,
  FaCheckCircle,
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

const STPCalculator = () => {
  const [totalInvestment, setTotalInvestment] = useState(1000000);
  const [monthlyTransfer, setMonthlyTransfer] = useState(10000);
  const [sourceReturn, setSourceReturn] = useState(6);
  const [targetReturn, setTargetReturn] = useState(12);
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

  const currencySymbols = { INR: "₹", USD: "$", EUR: "€" };

  const calculateSTP = () => {
    const sourceMonthlyRate = sourceReturn / 12 / 100;
    const targetMonthlyRate = targetReturn / 12 / 100;
    const months = timePeriod * 12;
    let sourceBalance = totalInvestment;
    let targetBalance = 0;
    let totalTransferred = 0;

    for (let i = 0; i < months; i++) {
      const sourceReturns = sourceBalance * sourceMonthlyRate;
      sourceBalance = sourceBalance + sourceReturns - monthlyTransfer;

      const targetReturns = targetBalance * targetMonthlyRate;
      targetBalance = targetBalance + targetReturns + monthlyTransfer;
      totalTransferred += monthlyTransfer;

      if (sourceBalance <= 0) break;
    }

    return {
      finalSourceValue: Math.max(0, Math.round(sourceBalance)),
      finalTargetValue: Math.round(targetBalance),
      totalTransferred: Math.round(totalTransferred),
      totalValue: Math.round(Math.max(0, sourceBalance) + targetBalance),
    };
  };

  const results = calculateSTP();

  const generateYearWiseData = () => {
    const data = [];
    const sourceMonthlyRate = sourceReturn / 12 / 100;
    const targetMonthlyRate = targetReturn / 12 / 100;
    let sourceBalance = totalInvestment;
    let targetBalance = 0;

    for (let year = 1; year <= timePeriod; year++) {
      let yearlyTransfer = 0;
      for (let month = 1; month <= 12; month++) {
        const sourceReturns = sourceBalance * sourceMonthlyRate;
        sourceBalance = sourceBalance + sourceReturns - monthlyTransfer;

        const targetReturns = targetBalance * targetMonthlyRate;
        targetBalance = targetBalance + targetReturns + monthlyTransfer;
        yearlyTransfer += monthlyTransfer;

        if (sourceBalance <= 0) {
          sourceBalance = 0;
          break;
        }
      }
      data.push({
        year,
        transferred: Math.round(yearlyTransfer),
        sourceBalance: Math.round(Math.max(0, sourceBalance)),
        targetBalance: Math.round(targetBalance),
      });
      if (sourceBalance <= 0) break;
    }
    return data;
  };

  const yearWiseData = generateYearWiseData();

  const lineChartData = {
    labels: Array.from({ length: timePeriod + 1 }, (_, i) => `Year ${i}`),
    datasets: [
      {
        label: "Source Fund",
        data: [totalInvestment, ...yearWiseData.map((d) => d.sourceBalance)],
        borderColor: "rgb(234, 179, 8)",
        backgroundColor: "rgba(234, 179, 8, 0.05)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgb(234, 179, 8)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
      {
        label: "Target Fund",
        data: [0, ...yearWiseData.map((d) => d.targetBalance)],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.05)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgb(34, 197, 94)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",
        labels: { usePointStyle: true, font: { size: 10, weight: "black" } },
      },
      tooltip: {
        backgroundColor: "#0f172a",
        padding: 12,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${currencySymbols[currency]}${context.parsed.y.toLocaleString()}`,
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

  const doughnutData = {
    labels: ["Liquid Reserve", "Target Equity"],
    datasets: [
      {
        data: [results.finalSourceValue, results.finalTargetValue],
        backgroundColor: ["#fbbf24", "#10b981"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 4,
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className="bg-[#f8fafc]">
      {/* Cinematic Light Header */}
      <section
        className="relative min-h-[50vh] lg:h-[55vh] flex items-center overflow-hidden sm:pt-10"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #ffe5bd 0%, #fffdf7 35%, #c7f1ff 100%)",
        }}
      >
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_100%)]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10 w-full px-4 py-12 mx-auto text-center max-w-7xl sm:px-6 lg:px-8 sm:py-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center px-4 py-2 mb-8 space-x-3 border rounded-full bg-white/60 backdrop-blur-md border-white/40"
            >
              <FaExchangeAlt className="text-orange-600 text-[10px] sm:text-xs" />
              <span className="text-orange-900 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em]">
                Liquid Allocation
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-7xl font-black text-slate-900 leading-[1.1] mb-6 sm:mb-8 uppercase tracking-tighter">
              Transfer <br />
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Velocity.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-base font-medium leading-relaxed sm:text-xl text-slate-700">
              Optimize your systematic transition from debt to equity with
              clinical Rupee-cost averaging models.
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
              <h2 className="flex items-center text-2xl font-black text-slate-900">
                <FaCalculator className="mr-3 text-orange-500 shrink-0" />
                Investment Inputs
              </h2>

              <div className="w-full lg:w-auto">
                <p className="mb-3 text-[10px] font-black tracking-widest uppercase text-slate-400 lg:text-right">
                  Currency
                </p>

                <div className="flex gap-2 lg:justify-end">
                  {["INR", "USD", "EUR"].map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      className={`h-12 min-w-[48px] px-3 rounded-2xl text-sm font-black transition-all ${
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
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.75fr)_320px] items-start">
              {/* Inputs */}
              <div className="grid min-w-0 gap-6 sm:grid-cols-2">
                <SliderInput
                  label="Initial Corpus"
                  value={totalInvestment}
                  onChange={setTotalInvestment}
                  min={100000}
                  max={10000000}
                  step={100000}
                  prefix={currencySymbols[currency]}
                />

                <SliderInput
                  label="Monthly Transition"
                  value={monthlyTransfer}
                  onChange={setMonthlyTransfer}
                  min={5000}
                  max={200000}
                  step={5000}
                  prefix={currencySymbols[currency]}
                />

                <SliderInput
                  label="Source Yield (%)"
                  value={sourceReturn}
                  onChange={setSourceReturn}
                  min={1}
                  max={15}
                  step={0.5}
                  suffix="%"
                />

                <SliderInput
                  label="Target Yield (%)"
                  value={targetReturn}
                  onChange={setTargetReturn}
                  min={1}
                  max={20}
                  step={0.5}
                  suffix="%"
                />

                <div className="sm:col-span-2">
                  <SliderInput
                    label="Horizon (Years)"
                    value={timePeriod}
                    onChange={setTimePeriod}
                    min={1}
                    max={30}
                    step={1}
                    suffix=" Years"
                  />
                </div>
              </div>

              {/* Result Cards */}
              <div className="flex flex-col gap-4 w-full min-w-0 xl:w-[320px] xl:flex-shrink-0">
                <ResultCard
                  className="w-full"
                  icon={FaPiggyBank}
                  label="Residual Source"
                  value={`${currencySymbols[currency]}${(
                    results.finalSourceValue / 100000
                  ).toFixed(2)}L`}
                  subtext="Remaining Liquid"
                />

                <ResultCard
                  className="w-full"
                  icon={FaChartLine}
                  label="Accumulated Target"
                  value={`${currencySymbols[currency]}${(
                    results.finalTargetValue / 100000
                  ).toFixed(2)}L`}
                  subtext="Total Equity Exposure"
                  color="text-orange-600"
                />

                <ResultCard
                  className="w-full"
                  icon={FaTrophy}
                  label="Aggregate Value"
                  value={`${currencySymbols[currency]}${(
                    results.totalValue / 100000
                  ).toFixed(2)}L`}
                  subtext="Portfolio Terminal"
                  featured
                />
              </div>
            </div>

            {/* Insight */}
            <div className="mt-8 bg-orange-50 rounded-[2rem] p-5 border border-orange-100">
              <div className="flex gap-3">
                <FaLightbulb className="mt-1 text-orange-500 shrink-0" />
                <p className="text-sm leading-relaxed text-slate-600">
                  STP captures rupee-cost averaging while keeping idle capital
                  productive in liquid instruments.
                </p>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid gap-8 mt-8 lg:grid-cols-12">
            {/* Left Table */}
            <div className="lg:col-span-8 bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
              <div className="px-8 py-6 text-center text-white bg-slate-900">
                <h3 className="text-lg font-black tracking-widest uppercase">
                  Transition Schedule
                </h3>
              </div>

              <div className="h-[420px] sm:h-[500px] lg:h-[560px] overflow-y-auto custom-scrollbar">
                <table className="w-full">
                  <thead className="sticky top-0 z-10 bg-slate-50">
                    <tr>
                      <th className="px-8 py-4 text-left text-[10px] uppercase tracking-widest text-slate-400">
                        Year
                      </th>

                      <th className="px-8 py-4 text-right text-[10px] uppercase tracking-widest text-slate-400">
                        Target Value
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {yearWiseData.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-50">
                        <td className="px-8 py-4 text-xs font-black text-slate-600">
                          Y{row.year}
                        </td>

                        <td className="px-8 py-4 text-xs font-bold text-right text-orange-600">
                          {currencySymbols[currency]}
                          {(row.targetBalance / 100000).toFixed(2)}L
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
                  Asset Dispersion
                </h3>

                <div className="relative h-64">
                  <Doughnut
                    data={doughnutData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                    }}
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Equity Weight
                    </span>

                    <span className="text-2xl font-black text-orange-600">
                      {(
                        (results.finalTargetValue / results.totalValue) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                </div>
              </div>

              {/* PROTOCOL */}
              <div className="bg-slate-900 rounded-[3rem] shadow-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-orange-600/20 blur-3xl"></div>

                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-8">
                  Systematic Architecture
                </h4>

                <div className="space-y-5">
                  <BenefitItem text="Averaging Verified" />
                  <BenefitItem text="Liquid Yield Protected" />
                  <BenefitItem text="Volatility Mitigated" />
                </div>

                <Link
                  to="/contact"
                  className="flex items-center justify-center py-4 mt-10 text-xs font-black tracking-widest uppercase transition-all bg-orange-600 hover:bg-white hover:text-orange-600 rounded-2xl"
                >
                  Speak to Architect
                  <FaArrowRight className="ml-3" />
                </Link>
              </div>
            </div>

            {/* Chart */}
            <div className="lg:col-span-12 bg-white rounded-[3rem] shadow-xl border border-slate-100 p-6 sm:p-8">
              <h3 className="mb-8 text-xl font-black tracking-tight uppercase text-slate-900">
                Portfolio Rebalancing
              </h3>

              <div className="h-[380px] sm:h-[520px]">
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <StickyResultBar
        label="Aggregate Value"
        value={(results.totalValue / 100000).toFixed(2) + "L"}
        subLabel="Monthly Transfer"
        subValue={monthlyTransfer.toLocaleString("en-IN")}
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

export default STPCalculator;
