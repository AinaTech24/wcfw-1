import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaArrowRight,
  FaCalculator,
  FaChartLine,
  FaShieldAlt,
  FaGem,
  FaGlassCheers,
  FaHistory,
  FaHeart,
} from "react-icons/fa";
import SliderInput from "../../components/SliderInput";

const ChildWedding = () => {
  const [childAge, setChildAge] = useState(10);
  const [weddingAge, setWeddingAge] = useState(28);
  const [currentCost, setCurrentCost] = useState(5000000);
  const [existingSavings, setExistingSavings] = useState(1000000);

  const yearsToGoal = weddingAge - childAge;
  const inflationRate = 0.08;
  const returnRate = 0.12;
  const monthlyRate = returnRate / 12;
  const months = yearsToGoal * 12;

  const futureWeddingCost =
    currentCost * Math.pow(1 + inflationRate, yearsToGoal);
  const futureValueExisting =
    existingSavings * Math.pow(1 + returnRate, yearsToGoal);
  const additionalAmount = Math.max(0, futureWeddingCost - futureValueExisting);
  const monthlySIP =
    additionalAmount > 0 && months > 0
      ? (additionalAmount * monthlyRate) /
        (Math.pow(1 + monthlyRate, months) - 1)
      : 0;

  const benefits = [
    "Uncompromised grand celebrations",
    "Inflation-proof capital reserves",
    "Reduction in debt-based lifestyle choices",
    "Strategic asset allocation for stability",
    "Peace of mind for the family unit",
    "Creation of memorable life events",
  ];

  const steps = [
    {
      step: "01",
      title: "Celebration Audit",
      description:
        "Define the exact scale and scope of the target multi-day event.",
    },
    {
      step: "02",
      title: "Inflation Mapping",
      description:
        "Calculate future venue and catering costs with an 8% multiplier.",
    },
    {
      step: "03",
      title: "SIP Execution",
      description:
        "Deploy capital into aggressive growth engines for maximum compounding.",
    },
    {
      step: "04",
      title: "Capital Transition",
      description:
        "Strategically migrate to liquidity reserves 2 years prior to the event.",
    },
  ];

  const investmentOptions = [
    {
      title: "Alpha Equity",
      description:
        "Maximizing corpus expansion for timelines exceeding 10 years.",
      returns: "14-16% p.a.",
      icon: FaChartLine,
      color: "from-blue-600 to-indigo-700",
    },
    {
      title: "Precious Metals",
      description:
        "Strategic gold allocation for long-term value preservation.",
      returns: "9-11% p.a.",
      icon: FaGem,
      color: "from-amber-400 to-orange-600",
    },
    {
      title: "Secured Hybrid",
      description:
        "Balanced structures to safeguard gains during the final window.",
      returns: "8-10% p.a.",
      icon: FaShieldAlt,
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
                <FaHeart className="text-sm text-orange-600" />
                <span className="text-orange-900 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em]">
                  Legacy Celebrations
                </span>
              </motion.div>

              <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] text-slate-900 sm:text-6xl lg:text-7xl">
                Heritage <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                  Weddings.
                </span>
              </h1>

              <p className="max-w-2xl mx-auto mb-8 text-base font-medium leading-relaxed lg:mx-0 sm:text-lg lg:text-xl text-slate-700 sm:mb-10">
                Securing joyful milestones. We architect dedicated investment
                strategies that ensure your child's special day is defined by
                joy, not constraints.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-5 lg:justify-start sm:gap-8">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900 sm:text-3xl">
                    {yearsToGoal} Yrs
                  </span>
                  <span className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                    Solution Horizon
                  </span>
                </div>

                <div className="hidden w-px h-12 sm:block bg-slate-200"></div>

                <div className="flex flex-col">
                  <span className="text-2xl font-black text-orange-600 sm:text-3xl">
                    ₹{(futureWeddingCost / 10000000).toFixed(1)}Cr
                  </span>
                  <span className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                    Projected Cost
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
                  Wedding Fund Architect
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
                        Inflation
                      </div>
                      <div className="text-lg font-black text-center text-slate-900">
                        8% p.a.
                      </div>
                    </div>

                    <div className="p-4 bg-white border rounded-2xl border-slate-100">
                      <div className="mb-1 text-[10px] font-bold tracking-widest text-center uppercase text-slate-400">
                        Terminal Gap
                      </div>
                      <div className="text-lg font-black text-center text-slate-900">
                        ₹{(additionalAmount / 100000).toFixed(0)}L
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
                  Milestone Calibration
                </h2>

                <div className="grid gap-12 md:grid-cols-2">
                  <div className="space-y-10">
                    <SliderInput
                      label="Child's Age"
                      value={childAge}
                      min={0}
                      max={weddingAge - 1}
                      onChange={setChildAge}
                      suffix=" Yrs"
                    />
                    <SliderInput
                      label="Target Event Age"
                      value={weddingAge}
                      min={21}
                      max={35}
                      onChange={setWeddingAge}
                      suffix=" Yrs"
                    />
                    <SliderInput
                      label="Current Celebration Cost"
                      value={currentCost}
                      min={1000000}
                      max={25000000}
                      step={500000}
                      onChange={setCurrentCost}
                      prefix="₹"
                    />
                    <SliderInput
                      label="Existing Seed Capital"
                      value={existingSavings}
                      min={0}
                      max={10000000}
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
                <div className="absolute top-0 right-0 p-8 transition-transform duration-700 opacity-5 group-hover:scale-110">
                  <FaGlassCheers className="text-[10rem]" />
                </div>
                <h3 className="flex items-center mb-8 text-2xl font-bold">
                  <FaHistory className="mr-3 text-orange-500" />
                  Legacy Solution
                </h3>
                <p className="mb-10 text-sm font-medium leading-relaxed text-slate-400">
                  Curating bespoke wealth strategies to ensure your family's
                  most significant celebrations are executed with absolute
                  elegance and zero compromise.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 transition-colors border bg-white/5 rounded-2xl border-white/10 hover:bg-white/10">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      Entry SIP
                    </span>
                    <span className="font-black text-white">₹10,000</span>
                  </div>
                  <div className="flex items-center justify-between p-5 transition-colors border bg-white/5 rounded-2xl border-white/10 hover:bg-white/10">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      Asset Lock
                    </span>
                    <span className="font-black text-white">Flexible</span>
                  </div>
                  <div className="flex items-center justify-between p-5 transition-colors border bg-white/5 rounded-2xl border-white/10 hover:bg-white/10">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      Transparency
                    </span>
                    <span className="font-black text-white">Real-time</span>
                  </div>
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
              The Celebration Protocol
            </h2>
            <p className="text-lg font-medium text-slate-400">
              A systematic framework for event sovereignty.
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
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-16 rounded-[4rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10 capitalize">
              <h2 className="mb-8 text-4xl font-black leading-tight text-white md:text-5xl">
                Design the Future <br /> of Your Family Legacy.
              </h2>
              <p className="max-w-2xl mx-auto mb-12 text-xl font-medium text-slate-400">
                Start engineering an elite wedding fund today. Secure the
                capital needed for an uncompromised multi-generational
                celebration.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-12 py-5 font-black text-white transition-all transform bg-orange-500 shadow-2xl rounded-2xl hover:bg-orange-400 hover:scale-105 shadow-orange-500/20 group"
              >
                Secure the Milestone
                <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ChildWedding;
