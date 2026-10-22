import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
  FaCalculator,
  FaChartLine,
  FaPiggyBank,
  FaUniversity,
  FaLock,
  FaUserShield,
  FaLightbulb,
  FaTrophy,
  FaPercentage,
  FaMoneyBillWave,
} from "react-icons/fa";
import SliderInput from "../../components/SliderInput";
import StickyResultBar from "../../components/StickyResultBar";
import ResultCard from "../../components/ResultCard";

const EmergencyFund = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [months, setMonths] = useState(6);
  const [existingSavings, setExistingSavings] = useState(100000);
  const [timeframe, setTimeframe] = useState(12);
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

  const targetCorpus = monthlyExpenses * months;
  const additionalAmount = Math.max(0, targetCorpus - existingSavings);
  const monthlySavings = additionalAmount / timeframe;

  // Generate month-wise breakdown for ledger
  const generateMonthWiseBreakdown = () => {
    const breakdown = [];
    let accumulatedValue = existingSavings;
    let totalSaved = existingSavings;
    const monthlyTarget = monthlySavings;

    for (let month = 1; month <= Math.min(timeframe, 24); month++) {
      totalSaved += monthlyTarget;
      accumulatedValue = totalSaved; // For emergency fund, no compounding assumed (liquid funds)

      if (month % 3 === 0 || month === timeframe) {
        breakdown.push({
          month,
          totalSaved: Math.round(totalSaved),
          accumulatedValue: Math.round(accumulatedValue),
          isMilestone: month === timeframe,
        });
      }
    }

    return breakdown;
  };

  const monthWiseBreakdown = generateMonthWiseBreakdown();
  const percentComplete = Math.min(100, (existingSavings / targetCorpus) * 100);

  const benefits = [
    "Uninterrupted lifestyle during income volatility",
    "Sovereign-grade medical contingency reserves",
    "Shielding long-term assets from liquidation",
    "Elimination of predatory high-interest debt",
    "Psychological sovereignty and crisis resilience",
    "Immediate liquidity for rapid response",
  ];

  const steps = [
    {
      step: "01",
      title: "Burn Rate Audit",
      description: "Define the absolute essential monthly outflow",
    },
    {
      step: "02",
      title: "Liquidity Selection",
      description: "Select high-safety, T+1 withdrawal instruments",
    },
    {
      step: "03",
      title: "Phased Accumulation",
      description: "Deploy capital systematically over 12-24 months",
    },
    {
      step: "04",
      title: "Protocol Locking",
      description: "Ensure funds are ring-fenced for true crises only",
    },
  ];

  const investmentOptions = [
    {
      title: "Liquid Institutional Funds",
      description: "Lower volatility than equity with T+1 liquidity",
      returns: "6-7% p.a.",
      icon: FaChartLine,
      color: "from-blue-600 to-indigo-700",
    },
    {
      title: "Corporate FD Strips",
      description: "High-grade fixed returns with sweep-in facility",
      returns: "7-8% p.a.",
      icon: FaPiggyBank,
      color: "from-orange-500 to-amber-600",
    },
    {
      title: "Sovereign Savings",
      description: "Absolute safety for base-level survival cash",
      returns: "3-4% p.a.",
      icon: FaUniversity,
      color: "from-slate-700 to-slate-900",
    },
  ];

  const emergencyTypes = [
    {
      title: "Medical Volatility",
      description: "Contingency for non-insured healthcare events",
      icon: FaUserShield,
    },
    {
      title: "Income Disruption",
      description: "Sustaining burn rate during career transitions",
      icon: FaLock,
    },
    {
      title: "Asset Failure",
      description: "Urgent primary residency or vehicle repairs",
      icon: FaShieldAlt,
    },
    {
      title: "Market Shocks",
      description: "Buffer against broad economic instability",
      icon: FaChartLine,
    },
  ];

  return (
    <div className="calculator-container bg-[#f8fafc]">
      {/* Hero Section */}
      <section
        className="relative min-h-[min(55vh,480px)] flex items-center overflow-hidden py-12"
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
              <FaShieldAlt className="text-xs text-orange-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-900">
                Risk Mitigation Protocol
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[1.05] text-slate-900">
              Fortress <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Liquidity.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto mt-6 text-base font-medium leading-relaxed text-slate-700 sm:text-xl">
              Engineering financial resilience. We architect ultra-liquid
              contingency pools that serve as your first line of defense against
              life's unpredictable volatilities.
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
                Fortress Architect
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
                  label="Monthly Burn Rate"
                  value={monthlyExpenses}
                  min={20000}
                  max={500000}
                  step={5000}
                  onChange={setMonthlyExpenses}
                  prefix={currencySymbols[currency]}
                />
                <SliderInput
                  label="Months of Solvency"
                  value={months}
                  min={3}
                  max={12}
                  step={1}
                  onChange={setMonths}
                  suffix=" Months"
                />
                <SliderInput
                  label="Existing Liquid Seed"
                  value={existingSavings}
                  min={0}
                  max={2000000}
                  step={10000}
                  onChange={setExistingSavings}
                  prefix={currencySymbols[currency]}
                />
                <SliderInput
                  label="Build Horizon"
                  value={timeframe}
                  min={6}
                  max={24}
                  step={1}
                  onChange={setTimeframe}
                  suffix=" Months"
                />
              </div>

              {/* Result Cards */}
              <div className="order-3 w-full max-w-full min-w-0 space-y-4 xl:order-2 xl:max-w-max">
                <ResultCard
                  icon={FaMoneyBillWave}
                  label="Target Corpus"
                  value={`${currencySymbols[currency]}${(targetCorpus / 100000).toFixed(1)}L`}
                  subtext="Total Reserve Goal"
                />
                <ResultCard
                  icon={FaPercentage}
                  label="Monthly Build-up"
                  value={`${currencySymbols[currency]}${monthlySavings.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 0,
                    },
                  )}`}
                  subtext="Required Monthly Saving"
                  color="text-orange-600"
                />
                <ResultCard
                  icon={FaTrophy}
                  label="Coverage Complete"
                  value={`${percentComplete.toFixed(0)}%`}
                  subtext="Current Progress"
                  featured
                />
              </div>
            </div>

            {/* Insight Bar */}
            <div className="mt-8 bg-orange-50 rounded-[2rem] p-5 border border-orange-100">
              <div className="flex gap-3">
                <FaLightbulb className="mt-1 text-orange-500" />
                <p className="text-sm leading-relaxed text-slate-600">
                  A 6-month emergency fund is the gold standard. It protects
                  your long-term investments from premature liquidation during
                  market downturns or income disruption.
                </p>
              </div>
            </div>
          </div>

          {/* Month-wise Ledger */}
          <div className="mt-8 bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
            <div className="px-8 py-6 text-center text-white bg-slate-900">
              <h3 className="text-lg font-black tracking-widest uppercase">
                Liquidity Accumulation Ledger
              </h3>
            </div>

            <div className="max-h-[620px] overflow-y-auto custom-scrollbar">
              <table className="w-full">
                <thead className="sticky top-0 z-10 bg-slate-50">
                  <tr>
                    <th className="px-8 py-4 text-left text-[10px] uppercase tracking-widest text-slate-400">
                      Month
                    </th>
                    <th className="px-8 py-4 text-right text-[10px] uppercase tracking-widest text-slate-400">
                      Total Saved
                    </th>
                    <th className="px-8 py-4 text-right text-[10px] uppercase tracking-widest text-slate-400">
                      Reserve Value
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
                  {monthWiseBreakdown.map((row) => (
                    <tr
                      key={row.month}
                      className={`hover:bg-slate-50 ${row.isMilestone ? "bg-orange-50" : ""}`}
                    >
                      <td className="px-8 py-4 text-xs font-black text-slate-600">
                        Month {row.month}
                        {row.isMilestone && (
                          <span className="ml-2 text-[8px] font-black text-orange-600 uppercase">
                            Target Achieved
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-4 text-xs font-bold text-right text-slate-600">
                        {currencySymbols[currency]}
                        {(row.totalSaved / 100000).toFixed(2)}L
                      </td>
                      <td className="px-8 py-4 text-xs font-black text-right text-orange-600">
                        {currencySymbols[currency]}
                        {(row.accumulatedValue / 100000).toFixed(2)}L
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategic Insights & Crisis Matrix Grid */}
          <div className="grid gap-8 mt-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="bg-slate-900 rounded-[3rem] shadow-2xl p-8 text-white relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-orange-600/20 blur-3xl"></div>
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-8">
                  Strategic Insights
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {benefits.map((benefit, i) => (
                    <BenefitItem key={i} text={benefit} />
                  ))}
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

            <div className="lg:col-span-5">
              <div className="bg-[#0f172a] rounded-[3rem] p-8 text-white h-full">
                <h3 className="flex items-center mb-6 text-xl font-bold">
                  <span className="w-2 h-2 mr-3 bg-orange-500 rounded-full"></span>
                  Crisis Matrix
                </h3>
                <div className="space-y-4">
                  {emergencyTypes.map((type, i) => (
                    <div
                      key={i}
                      className="p-5 transition-colors border bg-white/5 rounded-2xl border-white/10 hover:border-orange-500/30 group"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center justify-center w-10 h-10 transition-transform bg-orange-600/20 rounded-xl group-hover:scale-110">
                          <type.icon className="text-orange-500" />
                        </div>
                        <h4 className="text-sm font-bold text-white">
                          {type.title}
                        </h4>
                      </div>
                      <p className="text-slate-400 text-xs font-medium leading-relaxed pl-14">
                        {type.description}
                      </p>
                    </div>
                  ))}
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
              The Safety Protocol
            </h2>
            <p className="text-lg font-medium text-slate-400">
              Four systematic phases to financial solvency
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
                Don't Let Uncertainty <br /> Define Your Future.
              </h2>
              <p className="max-w-2xl mx-auto mb-12 text-xl font-medium text-white/80">
                Start building your fortress liquidity today. Financial
                resilience isn't built overnight — but every month brings you
                closer to absolute security.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-12 py-5 font-black text-orange-600 transition-all transform bg-white shadow-xl rounded-2xl hover:bg-slate-50 hover:scale-105 group"
              >
                Build Your Fortress
                <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Result Bar */}
      <StickyResultBar
        label="Target Corpus"
        value={`${(targetCorpus / 100000).toFixed(1)}L`}
        subLabel="Monthly Build-up"
        subValue={monthlySavings.toLocaleString("en-IN", {
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

export default EmergencyFund;
