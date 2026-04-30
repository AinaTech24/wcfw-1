import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaCheckCircle,
  FaArrowRight,
  FaCalculator,
  FaChartLine,
  FaShieldAlt,
  FaGem,
  FaLandmark,
} from "react-icons/fa";
import SliderInput from "../../components/SliderInput";

const DreamHome = () => {
  const [homeValue, setHomeValue] = useState(5000000);
  const [downPayment, setDownPayment] = useState(20);
  const [yearsToGoal, setYearsToGoal] = useState(5);
  const [existingSavings, setExistingSavings] = useState(500000);

  const downPaymentAmount = (homeValue * downPayment) / 100;
  const returnRate = 0.12;
  const monthlyRate = returnRate / 12;
  const months = yearsToGoal * 12;

  // Future value of existing savings
  const futureValueExisting =
    existingSavings * Math.pow(1 + returnRate, yearsToGoal);

  // Additional amount needed
  const additionalAmount = Math.max(0, downPaymentAmount - futureValueExisting);

  // Monthly SIP needed
  const monthlySIP =
    additionalAmount > 0 && months > 0
      ? (additionalAmount * monthlyRate) /
        (Math.pow(1 + monthlyRate, months) - 1)
      : 0;

  const benefits = [
    "Strategic capital for prime real estate",
    "Equity building with reduced debt leverage",
    "Optimized tax benefits on interest components",
    "Stability-first wealth diversification",
    "Sustained asset appreciation over decades",
    "Freedom of architectural customization",
  ];

  const steps = [
    {
      step: "01",
      title: "Market Auditing",
      description: "Assess location value and future appreciation",
    },
    {
      step: "02",
      title: "Capital Calibration",
      description: "Aim for a 30% seed to minimize long-term interest",
    },
    {
      step: "03",
      title: "SIP Deployment",
      description: "Aggressive growth for the down payment corpus",
    },
    {
      step: "04",
      title: "Institutional Leverage",
      description: "Secure pre-approved credit for prime negotiation",
    },
  ];

  const investmentOptions = [
    {
      title: "Market Growth Equities",
      description: "High-yield engines for timelines exceeding 5 years",
      returns: "12-15% p.a.",
      icon: FaChartLine,
      color: "from-blue-600 to-blue-800",
    },
    {
      title: "Index Infrastructure",
      description: "Stable, broad-market growth for seed capital",
      returns: "11-13% p.a.",
      icon: FaGem,
      color: "from-orange-500 to-orange-700",
    },
    {
      title: "Dynamic Debt Strips",
      description: "Volatility protection as the goal horizon nears",
      returns: "7-9% p.a.",
      icon: FaShieldAlt,
      color: "from-slate-600 to-slate-800",
    },
  ];

  return (
    <div className="bg-white">
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
                <FaHome className="text-sm text-orange-600" />
                <span className="text-orange-900 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em]">
                  Asset Class Mastery
                </span>
              </motion.div>

              <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] text-slate-900 sm:text-6xl lg:text-7xl">
                Heritage <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                  Residency.
                </span>
              </h1>

              <p className="max-w-2xl mx-auto mb-8 text-base font-medium leading-relaxed lg:mx-0 sm:text-lg lg:text-xl text-slate-700 sm:mb-10">
                Architecture for ownership. We engineer systematic accumulation
                strategies that transform real estate aspirations into tangible,
                high-equity assets.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-5 lg:justify-start sm:gap-8">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900 sm:text-3xl">
                    {yearsToGoal} Yrs
                  </span>
                  <span className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                    Savings Horizon
                  </span>
                </div>

                <div className="hidden w-px h-12 sm:block bg-slate-200"></div>

                <div className="flex flex-col">
                  <span className="text-2xl font-black text-orange-600 sm:text-3xl">
                    ₹{(downPaymentAmount / 100000).toFixed(1)}L
                  </span>
                  <span className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                    Down Payment Goal
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
                  Home Fund Architect
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
                        Seed Gap
                      </div>
                      <div className="text-lg font-black text-center text-slate-900">
                        ₹{(additionalAmount / 100000).toFixed(1)}L
                      </div>
                    </div>

                    <div className="p-4 bg-white border rounded-2xl border-slate-100">
                      <div className="mb-1 text-[10px] font-bold tracking-widest text-center uppercase text-slate-400">
                        Protocol
                      </div>
                      <div className="text-lg font-black text-center text-slate-900">
                        Tier-1
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="relative z-20 px-4 py-24 mx-auto -mt-16 max-w-7xl sm:px-6 lg:px-8">
        <div className="grid gap-12 mb-24 lg:grid-cols-12">
          {/* Interactive Projections */}
          <div className="space-y-8 lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] p-8 sm:p-14 border border-slate-100"
            >
              <h2 className="mb-8 text-3xl font-extrabold text-slate-900">
                Home <span className="text-orange-600">Fund Architecture</span>
              </h2>

              <div className="grid gap-12 md:grid-cols-2">
                <div className="space-y-8">
                  <SliderInput
                    label="Target Property Value"
                    value={homeValue}
                    min={2000000}
                    max={50000000}
                    step={500000}
                    onChange={setHomeValue}
                    prefix="₹"
                  />
                  <SliderInput
                    label="Down Payment Share"
                    value={downPayment}
                    min={10}
                    max={50}
                    step={5}
                    onChange={setDownPayment}
                    suffix="%"
                  />
                  <SliderInput
                    label="Years to Acquisition"
                    value={yearsToGoal}
                    min={1}
                    max={15}
                    onChange={setYearsToGoal}
                    suffix=" Yrs"
                  />
                  <SliderInput
                    label="Current Seed Capital"
                    value={existingSavings}
                    min={0}
                    max={10000000}
                    step={100000}
                    onChange={setExistingSavings}
                    prefix="₹"
                  />
                </div>

                <div className="bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-orange-600/10 blur-2xl"></div>
                  <div>
                    <p className="mb-2 text-xs font-bold tracking-widest uppercase text-slate-400">
                      Required Monthly SIP
                    </p>
                    <h3 className="mb-6 text-4xl font-black text-orange-500 sm:text-5xl">
                      ₹
                      {monthlySIP.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </h3>

                    <div className="space-y-4">
                      <div className="flex justify-between pb-2 border-b border-white/10">
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                          Down Payment Sum
                        </span>
                        <span className="font-bold text-slate-200">
                          ₹{(downPaymentAmount / 100000).toFixed(1)} Lakhs
                        </span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-white/10">
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                          Compounding Yield
                        </span>
                        <span className="font-bold text-orange-400">
                          12% Expected p.a.
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/contact"
                    className="flex items-center justify-center py-4 mt-8 font-bold text-center text-white transition-all bg-orange-600 rounded-2xl hover:bg-orange-500 group"
                  >
                    Initiate Acquisition{" "}
                    <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-2" />
                  </Link>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {benefits.map((benefit, i) => (
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

          {/* Sidebar: Property Trust */}
          <div className="space-y-6 lg:col-span-4">
            <div className="bg-[#0f172a] rounded-[2rem] p-10 text-white text-center flex flex-col items-center shadow-2xl">
              <div className="flex items-center justify-center w-16 h-16 mb-6 bg-white/5 rounded-2xl">
                <FaLandmark className="text-3xl text-orange-500" />
              </div>
              <h4 className="mb-4 text-lg font-bold">Capital Leverage</h4>
              <p className="mb-8 text-sm font-medium leading-relaxed text-slate-500">
                Strategic savings reduce loan duration and total interest
                outflow by up to 40%.
              </p>
              <div className="w-full h-[2px] bg-white/5 mb-8"></div>
              <div className="w-full space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    Yield Alpha
                  </span>
                  <span className="font-black text-orange-500">12-15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    Down Payment
                  </span>
                  <span className="font-black text-white">20-30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Engines */}
        <div className="mb-16 text-center">
          <h3 className="mb-4 text-xs font-extrabold tracking-widest text-orange-600 uppercase">
            Capital Vehicles
          </h3>
          <h2 className="text-4xl font-extrabold text-slate-900">
            Residency Growth Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-24 md:grid-cols-3">
          {investmentOptions.map((option, index) => (
            <motion.div
              key={index}
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
                <span className="text-slate-400">Target Range</span>
                <span className="text-orange-600">{option.returns}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final Protocols */}
        <div className="bg-slate-900 rounded-[3rem] p-10 sm:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full w-96 h-96 bg-orange-600/10 blur-3xl"></div>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-extrabold">
              The Acquisition Protocol
            </h2>
            <p className="font-medium text-slate-400">
              Four systematic phases to residential sovereignty
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
      </div>
    </div>
  );
};

export default DreamHome;
