import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaCheckCircle,
  FaArrowRight,
  FaCalculator,
  FaShieldAlt,
  FaPiggyBank,
  FaUniversity,
  FaCoins,
  FaGem,
  FaHistory,
  FaLightbulb,
  FaMoneyBillWave,
  FaPercentage,
  FaTrophy,
} from "react-icons/fa";
import { Line, Doughnut } from "react-chartjs-2";
import SliderInput from "../../components/SliderInput";
import ResultCard from "../../components/ResultCard";
import StickyResultBar from "../../components/StickyResultBar";
import useCMSContent from "../../hooks/useCMSContent";
import useMetaTags from "../../hooks/useMetaTags";

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

const WealthCreation = () => {
  const { cmsContent } = useCMSContent("wealth-creation");
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [timePeriod, setTimePeriod] = useState(20);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [existingCorpus, setExistingCorpus] = useState(1000000);
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

  const monthlyRate = expectedReturn / 12 / 100;
  const months = timePeriod * 12;

  // Calculate wealth projection with step-up
  const calculateProjection = () => {
    let totalValue = existingCorpus;
    let totalInvested = existingCorpus;
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
    const wealthMultiplier = totalValue / totalInvested;

    return {
      futureValue: Math.round(totalValue),
      totalInvestment: Math.round(totalInvested),
      estimatedReturns: Math.round(estimatedReturns),
      returnPercentage:
        totalInvested > 0
          ? ((estimatedReturns / totalInvested) * 100).toFixed(2)
          : "0",
      wealthMultiplier: wealthMultiplier.toFixed(2),
      yearWiseBreakdown,
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

  // SEO Hook
  useMetaTags(
    cmsContent["_seo"] || {
      title: "Wealth Accumulation | We Care Freedom Wealth",
      description:
        "Systematic approach to long-term capital growth and disciplined investment strategies.",
      robotsTag: "index, follow",
    },
  );

  const defaultBenefits = [
    "Long-term financial security framework",
    "Inflation hedging through disciplined investing",
    "Multi-generational asset building",
    "Diversified income streams",
    "Retirement readiness approach",
    "Institutional-grade portfolio structure",
  ];

  const benefits = cmsContent["analysis"]?.benefits || defaultBenefits;

  const defaultSteps = [
    {
      step: "01",
      title: "Goal Assessment",
      description: "Define specific accumulation targets and time horizons.",
    },
    {
      step: "02",
      title: "Systematic Deployment",
      description: "Leverage compounding through regular contributions.",
    },
    {
      step: "03",
      title: "Asset Distribution",
      description: "Spread capital across multiple asset categories.",
    },
    {
      step: "04",
      title: "Periodic Review",
      description: "Regular portfolio assessment and rebalancing.",
    },
  ];

  const steps = cmsContent["protocol"]?.steps || defaultSteps;

  const defaultOptions = [
    {
      title: "Growth Equities",
      description: "Long-term capital appreciation opportunities.",
      returns: "12-15% p.a.",
      icon: FaChartLine,
      color: "from-blue-600 to-indigo-700",
    },
    {
      title: "Focused Portfolios",
      description: "Concentrated holdings with active oversight.",
      returns: "15-20% p.a.",
      icon: FaGem,
      color: "from-orange-500 to-red-600",
    },
    {
      title: "Real Estate Assets",
      description:
        "Tangible assets with potential yield and inflation protection.",
      returns: "8-12% p.a.",
      icon: FaUniversity,
      color: "from-slate-700 to-slate-900",
    },
    {
      title: "Private Markets",
      description: "Access to opportunities beyond public exchanges.",
      returns: "18-22% p.a.",
      icon: FaCoins,
      color: "from-amber-400 to-orange-600",
    },
  ];

  const iconMap = {
    FaChartLine,
    FaGem,
    FaUniversity,
    FaCoins,
    FaShieldAlt,
    FaPiggyBank,
    FaHistory,
  };

  const investmentOptions = (
    cmsContent["options"]?.items || defaultOptions
  ).map((opt) => ({
    ...opt,
    icon: iconMap[opt.icon] || FaChartLine,
  }));

  return (
    <div className="calculator-container bg-[#f8fafc]">
      {/* Hero Section */}
      <section
        className="relative min-h-[min(55vh,480px)] flex items-center overflow-hidden py-12"
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
              <FaChartLine className="text-xs text-orange-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-900">
                LONG-TERM ACCUMULATION
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[1.05] text-slate-900">
              Wealth <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Accumulation.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto mt-6 text-base font-medium leading-relaxed text-slate-700 sm:text-xl">
              Systematic approach to long-term capital growth through
              disciplined investment strategies and compound acceleration.
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
                  label="Monthly Investment"
                  value={monthlyInvestment}
                  min={500}
                  max={500000}
                  step={500}
                  onChange={setMonthlyInvestment}
                  prefix={currencySymbols[currency]}
                />

                <SliderInput
                  label="Expected Return"
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
                  label="Initial Capital"
                  value={existingCorpus}
                  min={0}
                  max={10000000}
                  step={100000}
                  onChange={setExistingCorpus}
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
                  label="Total Invested"
                  value={`${currencySymbols[currency]}${(results.totalInvestment / 100000).toFixed(1)}L`}
                  subtext="Capital Deployed"
                />

                <ResultCard
                  className="w-full sm:w-full xl:w-auto"
                  icon={FaPercentage}
                  label="Wealth Gain"
                  value={`${currencySymbols[currency]}${(results.estimatedReturns / 100000).toFixed(1)}L`}
                  subtext="Growth Component"
                  color="text-orange-600"
                />

                <ResultCard
                  className="w-full sm:w-full xl:w-auto"
                  icon={FaTrophy}
                  label="Future Corpus"
                  value={`${currencySymbols[currency]}${(results.futureValue / 100000).toFixed(1)}L`}
                  subtext={`${results.wealthMultiplier}x Multiplier`}
                  featured
                />
              </div>
            </div>

            {/* Insight Bar */}
            <div className="mt-8 bg-orange-50 rounded-[2rem] p-5 border border-orange-100">
              <div className="flex gap-3">
                <FaLightbulb className="mt-1 text-orange-500" />
                <p className="text-sm leading-relaxed text-slate-600">
                  Historical data suggests that increasing contributions
                  annually and maintaining a longer time horizon may enhance
                  corpus growth. Past performance does not guarantee future
                  results. All investments carry market risks.
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
                        Monthly Investment
                      </th>
                      <th className="px-8 py-4 text-right text-[10px] uppercase tracking-widest text-slate-400">
                        Portfolio Value
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
                  Portfolio Breakdown
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

              {/* Protocol */}
              <div className="bg-slate-900 rounded-[3rem] shadow-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-orange-600/20 blur-3xl"></div>
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-8">
                  Accumulation Framework
                </h4>
                <div className="space-y-5">
                  <BenefitItem text="Rupee Cost Averaging" />
                  <BenefitItem text="Step-up Acceleration" />
                  <BenefitItem text="Long-term Horizon" />
                  <BenefitItem text="Systematic Approach" />
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

          {/* Benefits Section */}
          <div className="mt-8">
            <div className="grid gap-6 md:grid-cols-2">
              {benefits.slice(0, 6).map((benefit, i) => (
                <motion.div
                  key={i}
                  className="flex items-center p-5 space-x-4 border bg-slate-50 rounded-2xl border-slate-100"
                >
                  <FaCheckCircle className="text-xl text-orange-500 shrink-0" />
                  <span className="text-sm font-bold leading-tight text-slate-700">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Asset Class Options */}
          <div className="mt-16 text-center">
            <h3 className="mb-4 text-xs font-extrabold tracking-widest text-orange-600 uppercase">
              Asset Class Options
            </h3>
            <h2 className="text-4xl font-extrabold text-slate-900">
              Capital Deployment Vehicles
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-4">
            {investmentOptions.map((option, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-lg hover:shadow-2xl transition-all group"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <option.icon className="text-2xl text-white" />
                </div>
                <h3 className="mb-3 text-xl font-extrabold text-slate-900">
                  {option.title}
                </h3>
                <p className="mb-6 text-sm font-medium leading-relaxed text-slate-500">
                  {option.description}
                </p>
                <div className="pt-6 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-slate-400">Historical Range</span>
                  <span className="text-orange-600">{option.returns}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Protocol Section */}
          <div className="relative mt-16 overflow-hidden bg-slate-900 rounded-[3rem] p-10 sm:p-20 text-white">
            <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full w-96 h-96 bg-orange-600/10 blur-3xl"></div>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-extrabold">
                Systematic Accumulation Framework
              </h2>
              <p className="font-medium text-slate-400">
                Four phased approach to long-term capital growth
              </p>
            </div>
            <div className="relative z-10 grid gap-12 text-center sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <div key={i}>
                  <div className="mb-4 text-6xl font-black text-orange-500 opacity-10">
                    {step.step}
                  </div>
                  <h4 className="mb-2 text-xl font-bold">{step.title}</h4>
                  <p className="text-sm font-medium text-slate-500">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-500 to-orange-600 p-16 rounded-[4rem] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <div className="relative z-10 text-center">
                <h2 className="mb-8 text-4xl font-black leading-tight text-white md:text-5xl">
                  Start Your Accumulation Journey
                </h2>
                <p className="max-w-2xl mx-auto mb-12 text-xl font-medium text-white/80">
                  Every day of delay represents a potential opportunity cost.
                  Begin your systematic investment approach today.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-12 py-5 font-black text-orange-600 transition-all transform bg-white shadow-xl rounded-2xl hover:bg-slate-50 hover:scale-105 group"
                >
                  Discuss Your Requirements
                  <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky Bar */}
      <StickyResultBar
        label="Future Corpus"
        value={(results.futureValue / 100000).toFixed(2) + "L"}
        subLabel="Monthly Investment"
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

export default WealthCreation;
