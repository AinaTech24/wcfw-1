import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaHeartbeat,
  FaArrowRight,
  FaCheckCircle,
  FaUmbrella,
  FaLightbulb,
} from "react-icons/fa";
import { Doughnut, Bar } from "react-chartjs-2";
import SliderInput from "../../components/SliderInput";
import StickyResultBar from "../../components/StickyResultBar";
import ResultCard from "../../components/ResultCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
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
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const InsuranceCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [annualExpenses, setAnnualExpenses] = useState(400000); // Personal expenses to deduct
  const [yearsToRetire, setYearsToRetire] = useState(25);
  const inflationRate = 6;
  const expectedReturn = 8;
  const [existingCover, setExistingCover] = useState(2000000);
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

  const calculateHLV = () => {
    // Basic HLV using Income Replacement Method
    const netAnnualContribution = annualIncome - annualExpenses;
    const realRate = (1 + expectedReturn / 100) / (1 + inflationRate / 100) - 1;

    // PV of growing annuity
    let hlv = 0;
    if (realRate === 0) {
      hlv = netAnnualContribution * yearsToRetire;
    } else {
      hlv =
        (netAnnualContribution * (1 - Math.pow(1 + realRate, -yearsToRetire))) /
        realRate;
    }

    const coverageGap = Math.max(0, hlv - existingCover);

    return {
      hlv: Math.round(hlv),
      coverageGap: Math.round(coverageGap),
      existingCover,
      netAnnualContribution,
    };
  };

  const results = calculateHLV();

  const chartData = {
    labels: ["Life Value (HLV)", "Existing Protection", "Shield Deficit"],
    datasets: [
      {
        label: "Capital Architecture",
        data: [results.hlv, results.existingCover, results.coverageGap],
        backgroundColor: ["#0f172a", "#10b981", "#f97316"],
        borderRadius: 12,
        borderWidth: 0,
        barThickness: 40,
      },
    ],
  };

  const doughnutData = {
    labels: ["Protected Asset", "Unhedged Risk"],
    datasets: [
      {
        data: [results.existingCover, results.coverageGap],
        backgroundColor: ["#10b981", "#f97316"],
        borderColor: "#fff",
        borderWidth: 4,
        hoverOffset: 12,
      },
    ],
  };

  return (
    <div className="calculator-container bg-[#f8fafc]">
      {/* Cinematic Header */}
      <section
        className="relative min-h-[50vh] calculator-header-height lg:h-[55vh] flex items-center overflow-hidden pt-20 sm:pt-16"
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
              <FaShieldAlt className="text-orange-600 text-[10px] sm:text-xs" />
              <span className="text-orange-900 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em]">
                Risk Neutralization
              </span>
            </motion.div>
            <h1 className="text-4xl sm:text-7xl font-black text-slate-900 leading-[1.1] mb-6 sm:mb-8 uppercase tracking-tighter">
              Capital <br />
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Fortress.
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base font-medium leading-relaxed sm:text-xl text-slate-700">
              Quantify your Human Life Value (HLV) with actuarial precision and
              architect a comprehensive protection protocol for your legacy.
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
                Actuarial Inputs
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
              {/* Inputs */}
              <div className="grid min-w-0 gap-6 md:grid-cols-2">
                <SliderInput
                  label="Gross Annual Income"
                  value={annualIncome}
                  min={300000}
                  max={20000000}
                  step={100000}
                  onChange={setAnnualIncome}
                  prefix={currencySymbols[currency]}
                />

                <SliderInput
                  label="Personal Consumption"
                  value={annualExpenses}
                  min={50000}
                  max={5000000}
                  step={50000}
                  onChange={setAnnualExpenses}
                  prefix={currencySymbols[currency]}
                />

                <SliderInput
                  label="Protection Horizon"
                  value={yearsToRetire}
                  min={1}
                  max={50}
                  step={1}
                  onChange={setYearsToRetire}
                  suffix=" Years"
                />

                <SliderInput
                  label="Existing Cover"
                  value={existingCover}
                  min={0}
                  max={50000000}
                  step={500000}
                  onChange={setExistingCover}
                  prefix={currencySymbols[currency]}
                />
              </div>

              {/* Result Cards */}
              <div className="order-3 w-full max-w-full min-w-0 space-y-4 xl:order-2 xl:max-w-max">
                <ResultCard
                  icon={FaHeartbeat}
                  label="Intrinsic HLV"
                  value={`${currencySymbols[currency]}${(
                    results.hlv / 10000000
                  ).toFixed(1)}Cr`}
                  subtext="Human Life Value"
                />

                <ResultCard
                  icon={FaUmbrella}
                  label="Existing Shield"
                  value={`${currencySymbols[currency]}${(
                    results.existingCover / 100000
                  ).toFixed(0)}L`}
                  subtext="Current Protection"
                  color="text-emerald-600"
                />

                <ResultCard
                  icon={FaShieldAlt}
                  label="Coverage Gap"
                  value={`${currencySymbols[currency]}${(
                    results.coverageGap / 100000
                  ).toFixed(0)}L`}
                  subtext="Required Cover"
                  featured
                />
              </div>
            </div>

            {/* Insight */}
            <div className="mt-8 bg-orange-50 rounded-[2rem] p-5 border border-orange-100">
              <div className="flex gap-3">
                <FaLightbulb className="mt-1 text-orange-500" />

                <p className="text-sm leading-relaxed text-slate-600">
                  Human Life Value is the present value of future income your
                  family depends on. Any deficit is an unhedged financial risk.
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
                  Protection Ledger
                </h3>
              </div>

              <div className="max-h-[620px] overflow-y-auto custom-scrollbar">
                <table className="w-full">
                  <thead className="sticky top-0 z-10 bg-slate-50">
                    <tr>
                      <th className="px-8 py-4 text-left text-[10px] uppercase tracking-widest text-slate-400">
                        Metric
                      </th>

                      <th className="px-8 py-4 text-right text-[10px] uppercase tracking-widest text-slate-400">
                        Value
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="px-8 py-4 text-xs font-black text-slate-600">
                        Human Life Value
                      </td>
                      <td className="px-8 py-4 text-xs font-black text-right text-orange-600">
                        {currencySymbols[currency]}
                        {(results.hlv / 10000000).toFixed(2)}Cr
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50">
                      <td className="px-8 py-4 text-xs font-black text-slate-600">
                        Existing Cover
                      </td>
                      <td className="px-8 py-4 text-xs font-bold text-right text-emerald-600">
                        {currencySymbols[currency]}
                        {(results.existingCover / 100000).toFixed(0)}L
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50">
                      <td className="px-8 py-4 text-xs font-black text-slate-600">
                        Protection Gap
                      </td>
                      <td className="px-8 py-4 text-xs font-black text-right text-red-500">
                        {currencySymbols[currency]}
                        {(results.coverageGap / 100000).toFixed(0)}L
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50">
                      <td className="px-8 py-4 text-xs font-black text-slate-600">
                        Net Contribution / Year
                      </td>
                      <td className="px-8 py-4 text-xs font-bold text-right text-slate-700">
                        {currencySymbols[currency]}
                        {(results.netAnnualContribution / 100000).toFixed(2)}L
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Side */}
            <div className="space-y-8 lg:col-span-4">
              {/* Doughnut */}
              <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 p-8 text-center">
                <h3 className="mb-8 text-lg font-black tracking-tight uppercase text-slate-900">
                  Hedge Efficiency
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
                      Covered
                    </span>

                    <span className="text-2xl font-black text-emerald-600">
                      {results.hlv > 0
                        ? ((results.existingCover / results.hlv) * 100).toFixed(
                            0,
                          )
                        : 100}
                      %
                    </span>
                  </div>
                </div>
              </div>

              {/* Protocol */}
              <div className="bg-slate-900 rounded-[3rem] shadow-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-orange-600/20 blur-3xl"></div>

                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-8">
                  Security Protocol
                </h4>

                <div className="space-y-5">
                  <BenefitItem text="Income Replacement" />
                  <BenefitItem text="Family Continuity" />
                  <BenefitItem text="Legacy Preservation" />
                </div>

                <Link
                  to="/contact"
                  className="flex items-center justify-center py-4 mt-10 text-xs font-black tracking-widest uppercase transition-all bg-orange-600 hover:bg-white hover:text-orange-600 rounded-2xl"
                >
                  Speak to Risk Architect
                  <FaArrowRight className="ml-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Chart */}
          <div className="mt-8 bg-white rounded-[3rem] shadow-xl border border-slate-100 p-6 sm:p-8">
            <h3 className="mb-8 text-xl font-black tracking-tight uppercase text-slate-900">
              Vulnerability Analysis
            </h3>

            <div className="h-[380px] sm:h-[520px]">
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: {
                      ticks: {
                        callback: (v) =>
                          `${currencySymbols[currency]}${(v / 100000).toFixed(0)}L`,
                      },
                      grid: { color: "rgba(0,0,0,0.05)" },
                    },
                    x: {
                      grid: { display: false },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <StickyResultBar
        label="Shield Deficit"
        value={(results.coverageGap / 100000).toFixed(0) + "L"}
        subLabel="Intrinsic HLV"
        subValue={(results.hlv / 10000000).toFixed(1) + "Cr"}
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

export default InsuranceCalculator;
