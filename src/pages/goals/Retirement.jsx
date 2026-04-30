import React, { useState } from "react";
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
} from "react-icons/fa";
import SliderInput from "../../components/SliderInput";

const Retirement = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState(100000);
  const [existingSavings, setExistingSavings] = useState(2500000);

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
    <div className="bg-[#f8fafc]">
      {/* Cinematic Light Header */}
      <section
        className="relative min-h-screen sm:min-h-[80vh] lg:min-h-[90vh] flex items-center overflow-hidden pt-28 pb-14 sm:pt-24 sm:pb-20 lg:pt-16"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #ffe5bd 0%, #fffdf7 35%, #c7f1ff 100%)",
        }}
      >
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_100%)]"></div>

          <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-orange-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10 w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 sm:gap-14 lg:gap-16">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 mb-6 space-x-2 border rounded-full bg-orange-500/10 backdrop-blur-md border-orange-500/20"
              >
                <FaUmbrella className="text-sm text-orange-600" />
                <span className="text-orange-900 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em]">
                  Retirement MasterSolution
                </span>
              </motion.div>

              <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] text-slate-900 sm:text-6xl lg:text-7xl">
                Legacy <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                  Freedom.
                </span>
              </h1>

              <p className="max-w-2xl mx-auto mb-8 text-base font-medium leading-relaxed lg:mx-0 sm:text-lg lg:text-xl text-slate-700 sm:mb-10">
                Engineering a future where work is optional. We build robust,
                inflation-proof portfolios that ensure your golden years are
                lived with absolute sovereignty.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-5 lg:justify-start sm:gap-8">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900 sm:text-3xl">
                    {yearsToRetirement} Yrs
                  </span>
                  <span className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                    Accumulation
                  </span>
                </div>

                <div className="hidden w-px h-12 sm:block bg-slate-200"></div>

                <div className="flex flex-col">
                  <span className="text-2xl font-black text-orange-600 sm:text-3xl">
                    ₹{(corpusNeeded / 10000000).toFixed(1)}Cr
                  </span>
                  <span className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                    Target Corpus
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="hidden lg:block"
            >
              <div className="bg-white/70 backdrop-blur-xl border border-white/40 p-8 xl:p-10 rounded-[3rem] shadow-2xl shadow-orange-900/5">
                <h3 className="flex items-center mb-8 text-2xl font-bold text-slate-900">
                  <FaCalculator className="mr-3 text-orange-500" />
                  Wealth Architecture
                </h3>

                <div className="space-y-6">
                  <div className="p-6 text-center text-white rounded-3xl bg-slate-900">
                    <p className="mb-2 text-xs font-bold tracking-widest uppercase text-slate-400">
                      Monthly Commitment
                    </p>

                    <div className="text-4xl font-black text-orange-500">
                      ₹
                      {monthlySIP.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white border rounded-2xl border-slate-100">
                      <div className="mb-1 text-[10px] font-bold tracking-widest text-center uppercase text-slate-400">
                        Future Cost
                      </div>
                      <div className="text-lg font-black text-center text-slate-900">
                        ₹{(futureMonthlyExpenses / 100000).toFixed(1)}L/mo
                      </div>
                    </div>

                    <div className="p-4 bg-white border rounded-2xl border-slate-100">
                      <div className="mb-1 text-[10px] font-bold tracking-widest text-center uppercase text-slate-400">
                        Horizon
                      </div>
                      <div className="text-lg font-black text-center text-slate-900">
                        {yearsToRetirement} Yrs
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section className="relative z-20 py-24 -mt-12">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Interactive Projections */}
            <div className="space-y-12 lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] p-8 sm:p-14 border border-slate-100"
              >
                <h2 className="flex items-center mb-10 text-3xl font-extrabold text-slate-900">
                  <span className="w-2 h-10 mr-4 bg-orange-500 rounded-full"></span>
                  Sustainability Calibration
                </h2>

                <div className="grid gap-12 md:grid-cols-2">
                  <div className="space-y-10">
                    <SliderInput
                      label="Current Age"
                      value={currentAge}
                      min={20}
                      max={retirementAge - 1}
                      onChange={setCurrentAge}
                      suffix=" Yrs"
                    />
                    <SliderInput
                      label="Target Retirement"
                      value={retirementAge}
                      min={retirementAge}
                      max={70}
                      onChange={setRetirementAge}
                      suffix=" Yrs"
                    />
                    <SliderInput
                      label="Monthly Expenses"
                      value={monthlyExpenses}
                      min={20000}
                      max={1000000}
                      step={5000}
                      onChange={setMonthlyExpenses}
                      prefix="₹"
                    />
                    <SliderInput
                      label="Current Corpus"
                      value={existingSavings}
                      min={0}
                      max={25000000}
                      step={100000}
                      onChange={setExistingSavings}
                      prefix="₹"
                    />
                  </div>

                  <div className="lg:hidden">
                    <div className="bg-slate-900 rounded-[2rem] p-8 text-white text-center">
                      <p className="mb-2 text-xs font-bold tracking-widest uppercase text-slate-400">
                        Required SIP
                      </p>
                      <h3 className="text-4xl font-black text-orange-500">
                        ₹
                        {monthlySIP.toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="mb-4 text-lg font-bold text-slate-900">
                      Strategic Insights
                    </h4>
                    {benefits.slice(0, 4).map((benefit, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <FaCheckCircle className="mt-1 text-orange-500 shrink-0" />
                        <span className="text-sm font-medium text-slate-600">
                          {benefit}
                        </span>
                      </div>
                    ))}
                    <Link
                      to="/contact"
                      className="flex items-center justify-center w-full py-5 mt-8 font-bold text-center text-white transition-all bg-slate-900 rounded-2xl hover:bg-slate-800 group"
                    >
                      Consult an Architect{" "}
                      <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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

            {/* Sidebar: Premium Trust */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#0f172a] rounded-[2.5rem] p-10 text-white h-fit sticky top-24 overflow-hidden group"
              >
                <h3 className="flex items-center mb-8 text-2xl font-bold">
                  <FaHistory className="mr-3 text-orange-500" />
                  Security Protocols
                </h3>
                <div className="space-y-8">
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
                <div className="mt-12 p-8 bg-orange-500 rounded-[2.5rem] text-center shadow-lg shadow-orange-500/20">
                  <h4 className="mb-2 text-3xl font-black text-slate-900">
                    Alpha Solution
                  </h4>
                  <p className="text-xs font-bold tracking-widest uppercase text-orange-950">
                    Institutional Yield Strategy
                  </p>
                </div>
              </motion.div>
            </div>
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
            <div className="relative z-10 capitalize">
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
    </div>
  );
};

const ProtocolItem = ({ icon: Icon, title, desc }) => (
  <div className="flex items-start space-x-4">
    <div className="flex items-center justify-center w-12 h-12 border bg-white/5 rounded-2xl shrink-0 border-white/10">
      <Icon className="text-xl text-orange-500" />
    </div>
    <div>
      <h4 className="mb-1 text-base font-bold text-white">{title}</h4>
      <p className="text-xs font-medium leading-relaxed text-slate-500">
        {desc}
      </p>
    </div>
  </div>
);

export default Retirement;
