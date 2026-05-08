import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUmbrella,
  FaCheckCircle,
  FaArrowRight,
  FaCalculator,
  FaChartLine,
  FaShieldAlt,
  FaPiggyBank,
  FaUserShield,
  FaHistory,
  FaHandHoldingHeart,
  FaLightbulb,
  FaTrophy,
  FaPercentage,
  FaMoneyBillWave,
} from "react-icons/fa";
import SliderInput from "../../components/SliderInput";
import StickyResultBar from "../../components/StickyResultBar";
import ResultCard from "../../components/ResultCard";

const Retirement = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState(100000);
  const [existingSavings, setExistingSavings] = useState(2500000);
  const [showSticky, setShowSticky] = useState(false);
  const [currency, setCurrency] = useState("INR");

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

  const yearsToRetirement = retirementAge - currentAge;
  const inflationRate = 0.06;
  const returnRate = 0.12;
  const retirementYears = 25;

  // Calculate future monthly expenses
  const futureMonthlyExpenses =
    monthlyExpenses * Math.pow(1 + inflationRate, yearsToRetirement);
  const annualExpenses = futureMonthlyExpenses * 12;

  // Calculate corpus needed
  const corpusNeeded = annualExpenses * retirementYears;

  // Calculate future value of existing savings
  const futureValueExisting =
    existingSavings * Math.pow(1 + returnRate, yearsToRetirement);

  // Calculate additional corpus needed
  const additionalCorpus = Math.max(0, corpusNeeded - futureValueExisting);

  // Calculate monthly SIP needed
  const monthlyRate = returnRate / 12;
  const months = yearsToRetirement * 12;
  const monthlySIP =
    additionalCorpus > 0 && months > 0
      ? (additionalCorpus * monthlyRate) /
        (Math.pow(1 + monthlyRate, months) - 1)
      : 0;

  // Generate year-wise breakdown for ledger
  const generateYearWiseBreakdown = () => {
    const breakdown = [];
    let accumulatedValue = existingSavings;
    let totalInvested = existingSavings;

    for (let year = 1; year <= Math.min(yearsToRetirement, 30); year++) {
      let yearlyInvestment = monthlySIP * 12;
      totalInvested += yearlyInvestment;

      // Simple annual compounding for visualization
      accumulatedValue =
        (accumulatedValue + yearlyInvestment) * (1 + returnRate);

      breakdown.push({
        year,
        totalAccumulated: Math.round(accumulatedValue),
        totalInvested: Math.round(totalInvested),
      });
    }

    return breakdown;
  };

  const yearWiseBreakdown = generateYearWiseBreakdown();

  const benefits = [
    "Sustained lifestyle independence",
    "Inflation-adjusted monthly cashflow",
    "Institutional medical contingency funds",
    "Legacy preservation for successors",
    "Dignity-first wealth management",
    "Freedom from active labor obligations",
  ];

  const steps = [
    {
      step: "01",
      title: "Lifestyle Audit",
      description:
        "Assess current burn rates and mathematically project future needs.",
    },
    {
      step: "02",
      title: "Horizon Mapping",
      description:
        "Define the exact transition window and lifestyle expectations.",
    },
    {
      step: "03",
      title: "Corpus Engineering",
      description:
        "Derive the terminal sum required to sustain 25+ years of yield.",
    },
    {
      step: "04",
      title: "Active Accumulation",
      description:
        "Deploy capital into high-alpha growth assets for maximum compounding.",
    },
  ];

  const investmentOptions = [
    {
      title: "High-Conviction Equity",
      description: "Aggressive growth engine for long-term corpus expansion.",
      returns: "12-15% p.a.",
      icon: FaChartLine,
      color: "from-blue-600 to-indigo-700",
    },
    {
      title: "NPS & Tax Pillars",
      description:
        "Tax-efficient stable yield vehicles with sovereign oversight.",
      returns: "9-12% p.a.",
      icon: FaShieldAlt,
      color: "from-orange-500 to-amber-600",
    },
    {
      title: "Strategic Debt",
      description: "Preserving base security and providing liquidity buffers.",
      returns: "7-9% p.a.",
      icon: FaPiggyBank,
      color: "from-slate-700 to-slate-900",
    },
  ];

  return (
    <div className="calculator-container bg-[#f8fafc]">
      {/* Hero Section - Cinematic Light Header */}
      <section
        className="relative min-h-[55vh] flex items-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #ffe5bd 0%, #fffdf7 35%, #c7f1ff 100%)",
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
              <FaUmbrella className="text-xs text-orange-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-900">
                Retirement MasterSolution
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[1.05] text-slate-900">
              Legacy <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Freedom.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto mt-6 text-base font-medium leading-relaxed text-slate-700 sm:text-xl">
              Engineering a future where work is optional. We build robust,
              inflation-proof portfolios that ensure your golden years are lived
              with absolute sovereignty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative z-20 py-12 -mt-10 sm:py-24">
        <div className="px-4 mx-auto max-w-7xl">
          {/* Main Wrapper */}
          <div className="bg-white border border-slate-100 shadow-xl rounded-[3rem] p-5 sm:p-8">
            {/* Header */}
            <div className="flex flex-col gap-5 mb-8 lg:flex-row lg:items-start lg:justify-between">
              <h2 className="text-2xl font-black text-slate-900">
                Sustainability Calibration
              </h2>

              {/* Currency Selector */}
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
                  label="Current Age"
                  value={currentAge}
                  min={20}
                  max={retirementAge - 1}
                  onChange={setCurrentAge}
                  suffix=" Years"
                />
                <SliderInput
                  label="Target Retirement"
                  value={retirementAge}
                  min={currentAge + 1}
                  max={70}
                  onChange={setRetirementAge}
                  suffix=" Years"
                />
                <SliderInput
                  label="Monthly Expenses"
                  value={monthlyExpenses}
                  min={20000}
                  max={1000000}
                  step={5000}
                  onChange={setMonthlyExpenses}
                  prefix={currencySymbols[currency]}
                />
                <SliderInput
                  label="Existing Corpus"
                  value={existingSavings}
                  min={0}
                  max={25000000}
                  step={100000}
                  onChange={setExistingSavings}
                  prefix={currencySymbols[currency]}
                />
              </div>

              {/* Result Cards */}
              <div className="order-3 w-full max-w-full min-w-0 space-y-4 xl:order-2 xl:max-w-max">
                <ResultCard
                  icon={FaMoneyBillWave}
                  label="Target Corpus"
                  value={`${currencySymbols[currency]}${(corpusNeeded / 10000000).toFixed(2)}Cr`}
                  subtext="Required Terminal Value"
                />
                <ResultCard
                  icon={FaPercentage}
                  label="Monthly Commitment"
                  value={`${currencySymbols[currency]}${monthlySIP.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 0,
                    },
                  )}`}
                  subtext="Required SIP"
                  color="text-orange-600"
                />
                <ResultCard
                  icon={FaTrophy}
                  label="Future Monthly Cost"
                  value={`${currencySymbols[currency]}${(futureMonthlyExpenses / 100000).toFixed(1)}L`}
                  subtext="Inflation Adjusted"
                  featured
                />
              </div>
            </div>

            {/* Insight Bar */}
            <div className="mt-8 bg-orange-50 rounded-[2rem] p-5 border border-orange-100">
              <div className="flex gap-3">
                <FaLightbulb className="mt-1 text-orange-500" />
                <p className="text-sm leading-relaxed text-slate-600">
                  Starting early reduces monthly commitment significantly. Every
                  year of delay increases required SIP by approximately 15-20%.
                </p>
              </div>
            </div>
          </div>

          {/* Year-wise Ledger - Full Width */}
          <div className="mt-8 bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
            <div className="px-8 py-6 text-center text-white bg-slate-900">
              <h3 className="text-lg font-black tracking-widest uppercase">
                Wealth Accumulation Ledger
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
                      Total Invested
                    </th>
                    <th className="px-8 py-4 text-right text-[10px] uppercase tracking-widest text-slate-400">
                      Corpus Value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-8 py-4 text-xs font-black text-slate-600">
                      Start
                    </td>
                    <td className="px-8 py-4 text-xs font-bold text-right text-slate-600">
                      {currencySymbols[currency]}
                      {(existingSavings / 100000).toFixed(1)}L
                    </td>
                    <td className="px-8 py-4 text-xs font-black text-right text-orange-600">
                      {currencySymbols[currency]}
                      {(existingSavings / 100000).toFixed(1)}L
                    </td>
                  </tr>
                  {yearWiseBreakdown.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50">
                      <td className="px-8 py-4 text-xs font-black text-slate-600">
                        Y{row.year}
                      </td>
                      <td className="px-8 py-4 text-xs font-bold text-right text-slate-600">
                        {currencySymbols[currency]}
                        {(row.totalInvested / 100000).toFixed(2)}L
                      </td>
                      <td className="px-8 py-4 text-xs font-black text-right text-orange-600">
                        {currencySymbols[currency]}
                        {(row.totalAccumulated / 10000000).toFixed(2)}Cr
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategic Insights Section */}
          <div className="grid gap-8 mt-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="bg-slate-900 rounded-[3rem] shadow-2xl p-8 text-white relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-orange-600/20 blur-3xl"></div>
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-8">
                  Strategic Insights
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {benefits.map((benefit, i) => (
                    <BenefitItem key={i} text={benefit} />
                  ))}
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

            <div className="lg:col-span-5">
              <div className="bg-[#0f172a] rounded-[3rem] p-8 text-white h-full">
                <h3 className="flex items-center mb-6 text-xl font-bold">
                  <FaHistory className="mr-3 text-orange-500" />
                  Security Protocols
                </h3>
                <div className="space-y-6">
                  <ProtocolItem
                    icon={FaUserShield}
                    title="Survival Reserve"
                    desc="Shielding terminal corpus from market volatility."
                  />
                  <ProtocolItem
                    icon={FaChartLine}
                    title="Alpha Growth"
                    desc="Ensuring yields consistently outperform 6% inflation."
                  />
                  <ProtocolItem
                    icon={FaHandHoldingHeart}
                    title="Legacy Transfer"
                    desc="Structured succession for uncompromised wealth transfer."
                  />
                </div>
                <div className="mt-8 p-6 bg-orange-500 rounded-[2rem] text-center shadow-lg shadow-orange-500/20">
                  <h4 className="mb-2 text-2xl font-black text-slate-900">
                    Alpha Solution
                  </h4>
                  <p className="text-xs font-bold tracking-widest uppercase text-orange-950">
                    Institutional Yield Strategy
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Options */}
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
            {investmentOptions.map((option, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-2xl transition-all group"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <option.icon className="text-2xl text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">
                  {option.title}
                </h3>
                <p className="mb-4 text-xs font-bold tracking-widest uppercase text-slate-500">
                  {option.returns}
                </p>
                <p className="text-sm leading-relaxed text-slate-500">
                  {option.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol Section */}
      <section className="py-24 overflow-hidden text-white bg-slate-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <h2 className="mb-4 text-4xl font-extrabold">
              The Transition Protocol
            </h2>
            <p className="text-lg font-medium text-slate-400">
              Systematic phases towards absolute financial sovereignty.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors"
              >
                <div className="mb-6 text-5xl font-black text-orange-500 opacity-20">
                  {step.step}
                </div>
                <h4 className="mb-4 text-xl font-bold">{step.title}</h4>
                <p className="text-sm leading-relaxed text-slate-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-500 to-orange-600 p-16 rounded-[4rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="mb-8 text-4xl font-black leading-tight text-white md:text-5xl">
                Make Labor Optional <br /> for the Rest of Your Life.
              </h2>
              <p className="max-w-2xl mx-auto mb-12 text-xl font-medium text-white/80">
                Start engineering your retirement masterSolution today. The cost
                of delay is the erosion of your future independence.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-12 py-5 font-black text-orange-600 transition-all transform bg-white shadow-xl rounded-2xl hover:bg-slate-50 hover:scale-105 group"
              >
                Secure Your Sovereignty
                <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Result Bar */}
      <StickyResultBar
        label="Target Corpus"
        value={`${(corpusNeeded / 10000000).toFixed(2)}Cr`}
        subLabel="Monthly SIP"
        subValue={monthlySIP.toLocaleString("en-IN", {
          maximumFractionDigits: 0,
        })}
        currencySymbol={currencySymbols[currency]}
        isVisible={showSticky}
      />
    </div>
  );
};

const BenefitItem = ({ text }) => (
  <div className="flex items-center gap-3">
    <FaCheckCircle className="text-orange-500 shrink-0" />
    <span className="text-xs font-black tracking-widest uppercase text-slate-300">
      {text}
    </span>
  </div>
);

const ProtocolItem = ({ icon: Icon, title, desc }) => (
  <div className="flex items-start space-x-4">
    <div className="flex items-center justify-center w-12 h-12 border bg-white/5 rounded-2xl shrink-0 border-white/10">
      <Icon className="text-xl text-orange-500" />
    </div>
    <div>
      <h4 className="mb-1 text-base font-bold text-white">{title}</h4>
      <p className="text-xs font-medium leading-relaxed text-slate-400">
        {desc}
      </p>
    </div>
  </div>
);

export default Retirement;
