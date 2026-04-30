import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaInfoCircle,
  FaLightbulb,
  FaCalculator,
  FaArrowRight,
  FaBalanceScale,
  FaShieldAlt,
  FaTrophy,
  FaCheckCircle,
} from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import SliderInput from "../../components/SliderInput";
import StickyResultBar from "../../components/StickyResultBar";
import ResultCard from "../../components/ResultCard";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const TaxCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [deductions, setDeductions] = useState(150000);
  const [regime, setRegime] = useState("old");
  const [currency] = useState("INR");
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

  const calculateTax = () => {
    const taxableIncome = annualIncome - (regime === "old" ? deductions : 0);
    let tax = 0;

    if (regime === "old") {
      if (taxableIncome <= 250000) tax = 0;
      else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
      else if (taxableIncome <= 1000000)
        tax = 12500 + (taxableIncome - 500000) * 0.2;
      else tax = 112500 + (taxableIncome - 1000000) * 0.3;
    } else {
      if (taxableIncome <= 300000) tax = 0;
      else if (taxableIncome <= 600000) tax = (taxableIncome - 300000) * 0.05;
      else if (taxableIncome <= 900000)
        tax = 15000 + (taxableIncome - 600000) * 0.1;
      else if (taxableIncome <= 1200000)
        tax = 45000 + (taxableIncome - 900000) * 0.15;
      else if (taxableIncome <= 1500000)
        tax = 90000 + (taxableIncome - 1200000) * 0.2;
      else tax = 150000 + (taxableIncome - 1500000) * 0.3;
    }

    const cess = tax * 0.04;
    const totalTax = tax + cess;
    const netIncome = annualIncome - totalTax;
    const effectiveRate = (totalTax / annualIncome) * 100;

    return {
      taxableIncome: Math.round(taxableIncome),
      tax: Math.round(tax),
      cess: Math.round(cess),
      totalTax: Math.round(totalTax),
      netIncome: Math.round(netIncome),
      effectiveRate: effectiveRate.toFixed(2),
    };
  };

  const results = calculateTax();

  const doughnutData = {
    labels: ["Net Liquidity", "Tax Exposure"],
    datasets: [
      {
        data: [results.netIncome, results.totalTax],
        backgroundColor: ["#0f172a", "#f97316"],
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
              <FaBalanceScale className="text-orange-600 text-[10px] sm:text-xs" />
              <span className="text-orange-900 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em]">
                Fiscal Optimization
              </span>
            </motion.div>
            <h1 className="text-4xl sm:text-7xl font-black text-slate-900 leading-[1.1] mb-6 sm:mb-8 uppercase tracking-tighter">
              Fiscal <br />
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Architecture.
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base font-medium leading-relaxed sm:text-xl text-slate-700">
              Deconstruct your tax liability with clinical precision using
              advanced regime comparative modeling and surrender-value
              optimization.
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
          Fiscal Inputs
        </h2>

        {/* Regime */}
        <div>
          <p className="mb-3 text-[10px] font-black tracking-widest uppercase text-slate-400 lg:text-right">
            Tax Regime
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setRegime("old")}
              className={`px-4 h-12 rounded-2xl text-xs font-black transition-all ${
                regime === "old"
                  ? "bg-slate-900 text-white shadow-lg"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              OLD
            </button>

            <button
              onClick={() => setRegime("new")}
              className={`px-4 h-12 rounded-2xl text-xs font-black transition-all ${
                regime === "new"
                  ? "bg-slate-900 text-white shadow-lg"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              NEW
            </button>
          </div>
        </div>
      </div>

      {/* Top Grid */}
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,auto)]">
        {/* Inputs */}
        <div className="grid min-w-0 gap-6 md:grid-cols-2">
          <SliderInput
            label="Annual Income"
            value={annualIncome}
            min={300000}
            max={10000000}
            step={50000}
            onChange={setAnnualIncome}
            prefix={currencySymbols[currency]}
          />

          {regime === "old" && (
            <SliderInput
              label="Deductions"
              value={deductions}
              min={0}
              max={500000}
              step={5000}
              onChange={setDeductions}
              prefix={currencySymbols[currency]}
            />
          )}
        </div>

        {/* Cards */}
        <div className="order-3 w-full max-w-full min-w-0 space-y-4 xl:order-2 xl:max-w-max">
          <ResultCard
            icon={FaShieldAlt}
            label="Taxable Income"
            value={`${currencySymbols[currency]}${(
              results.taxableIncome / 100000
            ).toFixed(1)}L`}
            subtext="Assessable Base"
          />

          <ResultCard
            icon={FaCalculator}
            label="Total Tax"
            value={`${currencySymbols[currency]}${(
              results.totalTax / 100000
            ).toFixed(2)}L`}
            subtext="Tax + Cess"
            color="text-orange-600"
          />

          <ResultCard
            icon={FaTrophy}
            label="Net Income"
            value={`${currencySymbols[currency]}${(
              results.netIncome / 100000
            ).toFixed(1)}L`}
            subtext="Retained Capital"
            featured
          />
        </div>
      </div>

      {/* Insight */}
      <div className="mt-8 bg-orange-50 rounded-[2rem] p-5 border border-orange-100">
        <div className="flex gap-3">
          <FaLightbulb className="mt-1 text-orange-500" />

          <p className="text-sm leading-relaxed text-slate-600">
            Compare regimes yearly. High deductions often favor Old Regime,
            lower paperwork may favor New Regime.
          </p>
        </div>
      </div>
    </div>

    {/* Second Grid */}
    <div className="grid gap-8 mt-8 lg:grid-cols-12">
      {/* Ledger */}
      <div className="lg:col-span-8 bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 text-center text-white bg-slate-900">
          <h3 className="text-lg font-black tracking-widest uppercase">
            Fiscal Ledger
          </h3>
        </div>

        <div className="p-6 space-y-3 sm:p-8">
          <LedgerRow
            label="Gross Income"
            value={annualIncome}
            symbol={currencySymbols[currency]}
          />

          {regime === "old" && (
            <LedgerRow
              label="Deductions"
              value={deductions}
              symbol={currencySymbols[currency]}
              negative
            />
          )}

          <LedgerRow
            label="Taxable Base"
            value={results.taxableIncome}
            symbol={currencySymbols[currency]}
            highlight
          />

          <LedgerRow
            label="Income Tax"
            value={results.tax}
            symbol={currencySymbols[currency]}
            borderTop
          />

          <LedgerRow
            label="Cess 4%"
            value={results.cess}
            symbol={currencySymbols[currency]}
          />

          <LedgerRow
            label="Net Income"
            value={results.netIncome}
            symbol={currencySymbols[currency]}
            featured
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="space-y-8 lg:col-span-4">
        {/* Doughnut */}
        <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 p-8 text-center">
          <h3 className="mb-8 text-lg font-black tracking-tight uppercase text-slate-900">
            Income Split
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
                Effective Rate
              </span>

              <span className="text-2xl font-black text-orange-600">
                {results.effectiveRate}%
              </span>
            </div>
          </div>
        </div>

        {/* Strategy */}
        <div className="bg-slate-900 rounded-[3rem] shadow-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-orange-600/20 blur-3xl"></div>

          <h4 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-8">
            Tax Protocol
          </h4>

          <div className="space-y-5">
            <BenefitItem text="Regime Comparison" />
            <BenefitItem text="Deduction Planning" />
            <BenefitItem text="Post-Tax Growth" />
          </div>

          <Link
            to="/contact"
            className="flex items-center justify-center py-4 mt-10 text-xs font-black tracking-widest uppercase transition-all bg-orange-600 hover:bg-white hover:text-orange-600 rounded-2xl"
          >
            Consult Tax Advisor
            <FaArrowRight className="ml-3" />
          </Link>
        </div>
      </div>
    </div>

    {/* Bottom Insight */}
    <div className="mt-8 bg-white rounded-[3rem] shadow-xl border border-slate-100 p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-100 shrink-0">
          <FaInfoCircle className="text-orange-600" />
        </div>

        <div>
          <h3 className="mb-4 text-xl font-black tracking-tight uppercase text-slate-900">
            Optimization Directives
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-5 rounded-2xl bg-slate-50">
              <p className="text-[10px] font-black tracking-widest uppercase text-orange-600 mb-2">
                Section 80C
              </p>
              <p className="text-sm text-slate-600">
                Use ELSS, PPF or EPF efficiently to reduce taxable income.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50">
              <p className="text-[10px] font-black tracking-widest uppercase text-orange-600 mb-2">
                Section 80D
              </p>
              <p className="text-sm text-slate-600">
                Health insurance premiums can lower taxes while reducing risk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      <StickyResultBar
        label="Total Tax"
        value={(results.totalTax / 100000).toFixed(2) + "L"}
        subLabel="Net Income"
        subValue={(results.netIncome / 100000).toFixed(1) + "L"}
        currencySymbol={currencySymbols[currency]}
        isVisible={showSticky}
      />
    </div>
  );
};

const BenefitItem = ({ text }) => (
  <div className="flex items-center space-x-3">
    <FaCheckCircle className="text-sm text-orange-500" />
    <span className="text-xs font-black uppercase tracking-widest text-slate-300\">
      {text}
    </span>
  </div>
);

const LedgerRow = ({
  label,
  value,
  symbol,
  negative,
  highlight,
  featured,
  borderTop,
}) => (
  <div
    className={`flex justify-between items-center py-4 ${borderTop ? "border-t border-slate-100" : ""} ${highlight ? "bg-slate-50 px-6 rounded-xl" : ""}`}
  >
    <span
      className={`text-xs font-black uppercase tracking-widest ${featured ? "text-slate-900 text-sm" : "text-slate-500"}`}
    >
      {label}
    </span>
    <span
      className={`text-lg font-black ${negative ? "text-orange-600" : featured ? "text-orange-600 text-xl" : "text-slate-900"} ${highlight ? "text-blue-600" : ""}`}
    >
      {negative ? "-" : ""}
      {symbol}
      {value.toLocaleString()}
    </span>
  </div>
);

export default TaxCalculator;
