import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPiggyBank,
  FaChartLine,
  FaTrophy,
  FaLightbulb,
  FaMoneyBillWave,
  FaCalculator,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { Line, Doughnut } from "react-chartjs-2";
import SliderInput from "../../components/SliderInput";
import StickyResultBar from "../../components/StickyResultBar";
import ResultCard from "../../components/ResultCard";
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

const SWPCalculator = () => {
  const [totalInvestment, setTotalInvestment] = useState(1000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(10000);
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

  // Calculate SWP
  const calculateSWP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = timePeriod * 12;
    let balance = totalInvestment;
    let totalWithdrawn = 0;
    let totalReturns = 0;

    for (let i = 0; i < months; i++) {
      const returns = balance * monthlyRate;
      totalReturns += returns;
      balance = balance + returns - monthlyWithdrawal;
      totalWithdrawn += monthlyWithdrawal;

      if (balance <= 0) break;
    }

    return {
      finalValue: Math.max(0, Math.round(balance)),
      totalWithdrawn: Math.round(totalWithdrawn),
      totalReturns: Math.round(totalReturns),
      initialInvestment: totalInvestment,
    };
  };

  const results = calculateSWP();

  // Generate year-wise data
  const generateYearWiseData = () => {
    const data = [];
    const monthlyRate = expectedReturn / 12 / 100;
    let balance = totalInvestment;

    for (let year = 1; year <= timePeriod; year++) {
      let yearlyWithdrawal = 0;
      let yearlyReturns = 0;

      for (let month = 1; month <= 12; month++) {
        const returns = balance * monthlyRate;
        yearlyReturns += returns;
        balance = balance + returns - monthlyWithdrawal;
        yearlyWithdrawal += monthlyWithdrawal;

        if (balance <= 0) {
          balance = 0;
          break;
        }
      }

      data.push({
        year,
        withdrawn: Math.round(yearlyWithdrawal),
        returns: Math.round(yearlyReturns),
        balance: Math.round(Math.max(0, balance)),
      });

      if (balance <= 0) break;
    }
    return data;
  };

  const yearWiseData = generateYearWiseData();

  // Chart Data
  const lineChartData = {
    labels: Array.from({ length: timePeriod + 1 }, (_, i) => `Year ${i}`),
    datasets: [
      {
        label: "Portfolio Valuation",
        data: [totalInvestment, ...yearWiseData.map((d) => d.balance)],
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

  const lineChartOptions = {
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
            `Valuation: ${currencySymbols[currency]}${(context.parsed.y / 100000).toFixed(2)}L`,
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
    labels: ["Base Capital", "Yield Accrual", "Liquidity Outflow"],
    datasets: [
      {
        data: [
          results.initialInvestment,
          results.totalReturns,
          results.totalWithdrawn,
        ],
        backgroundColor: ["#0f172a", "#10b981", "#f97316"],
        borderColor: ["#fff", "#fff", "#fff"],
        borderWidth: 4,
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className="calculator-container bg-[#f8fafc]">
      {/* Hero */}
      <section
        className="relative min-h-[55vh] flex items-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(135deg,#ffe5bd 0%,#fffdf7 35%,#c7f1ff 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_100%)]" />
        </div>

        <div className="relative z-10 w-full px-4 py-12 mx-auto text-center max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 border rounded-full bg-white/60 border-white/40 backdrop-blur-md">
              <FaMoneyBillWave className="text-xs text-orange-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-900">
                Liquidity Architecture
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[1.05] text-slate-900">
              Income <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Terminal.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto mt-6 text-base font-medium leading-relaxed text-slate-700 sm:text-xl">
              Engineer your systematic cash flow with actuarial precision and
              capital preservation intelligence.
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

            {/* Main Grid */}
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.75fr)_minmax(300px,0.9fr)] items-start">
              {/* Inputs */}
              <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
                <SliderInput
                  label="Available Corpus"
                  value={totalInvestment}
                  onChange={setTotalInvestment}
                  min={100000}
                  max={10000000}
                  step={100000}
                  prefix={currencySymbols[currency]}
                />

                <SliderInput
                  label="Monthly Outflow"
                  value={monthlyWithdrawal}
                  onChange={setMonthlyWithdrawal}
                  min={5000}
                  max={200000}
                  step={5000}
                  prefix={currencySymbols[currency]}
                />

                <SliderInput
                  label="Expected Yield (%)"
                  value={expectedReturn}
                  onChange={setExpectedReturn}
                  min={1}
                  max={20}
                  step={0.5}
                  suffix="%"
                />

                <SliderInput
                  label="Time Horizon"
                  value={timePeriod}
                  onChange={setTimePeriod}
                  min={1}
                  max={30}
                  step={1}
                  suffix=" Years"
                />
              </div>

              {/* Result Cards */}
              <div className="flex flex-col gap-4 min-w-0 w-full xl:min-w-[300px]">
                <ResultCard
                  className="w-full"
                  icon={FaPiggyBank}
                  label="Base Capital"
                  value={`${currencySymbols[currency]}${(
                    results.initialInvestment / 100000
                  ).toFixed(2)}L`}
                  subtext="Initial Deployment"
                />

                <ResultCard
                  className="w-full"
                  icon={FaChartLine}
                  label="Yield Accrual"
                  value={`${currencySymbols[currency]}${(
                    results.totalReturns / 100000
                  ).toFixed(2)}L`}
                  subtext="Growth Generated"
                  color="text-orange-600"
                />

                <ResultCard
                  className="w-full"
                  icon={FaTrophy}
                  label="Residual Value"
                  value={`${currencySymbols[currency]}${(
                    results.finalValue / 100000
                  ).toFixed(2)}L`}
                  subtext="Terminal Portfolio"
                  featured
                />
              </div>
            </div>

            {/* Insight */}
            <div className="mt-8 bg-orange-50 rounded-[2rem] p-5 border border-orange-100">
              <div className="flex gap-3">
                <FaLightbulb className="mt-1 text-orange-500" />
                <p className="text-sm leading-relaxed text-slate-600">
                  To sustain capital indefinitely, withdrawal rate should remain
                  below long-term portfolio yield.
                </p>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid gap-8 mt-8 lg:grid-cols-12">
            {/* Table */}
            <div className="lg:col-span-8 bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
              <div className="px-8 py-6 text-center text-white bg-slate-900">
                <h3 className="text-lg font-black tracking-widest uppercase">
                  Yearly Amortization
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
                        Balance
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
                          {(row.balance / 100000).toFixed(2)}L
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Right */}
            <div className="space-y-8 lg:col-span-4">
              {/* Doughnut */}
              <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 p-8 text-center">
                <h3 className="mb-8 text-lg font-black tracking-tight uppercase text-slate-900">
                  Capital Anatomy
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
                      Outflow Ratio
                    </span>

                    <span className="text-2xl font-black text-orange-600">
                      {(
                        (results.totalWithdrawn /
                          (results.initialInvestment + results.totalReturns)) *
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
                  Institutional Strategy
                </h4>

                <div className="space-y-5">
                  <BenefitItem text="Tax Efficient Extraction" />
                  <BenefitItem text="Periodic Rebalancing" />
                  <BenefitItem text="Liquidity Optimization" />
                </div>

                <Link
                  to="/contact"
                  className="flex items-center justify-center py-4 mt-10 text-xs font-black tracking-widest uppercase transition-all bg-orange-600 hover:bg-white hover:text-orange-600 rounded-2xl"
                >
                  Speak to Advisor
                  <FaArrowRight className="ml-3" />
                </Link>
              </div>
            </div>

            {/* Chart */}
            <div className="lg:col-span-12 bg-white rounded-[3rem] shadow-xl border border-slate-100 p-6 sm:p-8">
              <h3 className="mb-8 text-xl font-black tracking-tight uppercase text-slate-900">
                Financial Trajectory
              </h3>

              <div className="h-[380px] sm:h-[520px]">
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky */}
      <StickyResultBar
        label="Residual Value"
        value={(results.finalValue / 100000).toFixed(2) + "L"}
        subLabel="Monthly Outflow"
        subValue={monthlyWithdrawal.toLocaleString("en-IN")}
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

export default SWPCalculator;
