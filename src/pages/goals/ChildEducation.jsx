import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaCheckCircle,
  FaArrowRight,
  FaCalculator,
  FaChartLine,
  FaShieldAlt,
  FaUniversity,
  FaBookReader,
  FaGem,
  FaHistory,
  FaGlobeAmericas,
} from "react-icons/fa";
import SliderInput from "../../components/SliderInput";

const ChildEducation = () => {
  const [childAge, setChildAge] = useState(5);
  const [educationAge, setEducationAge] = useState(18);
  const [currentCost, setCurrentCost] = useState(2500000);
  const [existingSavings, setExistingSavings] = useState(500000);

  const yearsToGoal = educationAge - childAge;
  const educationInflation = 0.1; // 10% education inflation
  const returnRate = 0.12;
  const monthlyRate = returnRate / 12;
  const months = yearsToGoal * 12;

  // Calculate future education cost
  const futureEducationCost =
    currentCost * Math.pow(1 + educationInflation, yearsToGoal);

  // Future value of existing savings
  const futureValueExisting =
    existingSavings * Math.pow(1 + returnRate, yearsToGoal);

  // Additional amount needed
  const additionalAmount = Math.max(
    0,
    futureEducationCost - futureValueExisting,
  );

  // Monthly SIP needed
  const monthlySIP =
    additionalAmount > 0 && months > 0
      ? (additionalAmount * monthlyRate) /
        (Math.pow(1 + monthlyRate, months) - 1)
      : 0;

  const benefits = [
    "Uncompromised access to elite global institutions",
    "Inflation-shielded educational corpus",
    "Strategic reduction in loan dependency",
    "Structural tax optimization (Sec 80C)",
    "Early-mover compounding advantages",
    "Psychological security for the next generation",
  ];

  const steps = [
    {
      step: "01",
      title: "Institution Auditing",
      description:
        "Research target global costs with 10% inflation adjustment.",
    },
    {
      step: "02",
      title: "Timeline Calibration",
      description:
        "Define exact capital deployment windows for undergraduate and masters.",
    },
    {
      step: "03",
      title: "Capital Deployment",
      description:
        "Execute systematic long-term growth SIPs in high-conviction vehicles.",
    },
    {
      step: "04",
      title: "Portfolio Optimization",
      description:
        "Annual rebalancing based on educational trends and proximity to goal.",
    },
  ];

  const investmentOptions = [
    {
      title: "Global Equity Funds",
      description:
        "Capture international growth for overseas education requirements.",
      returns: "12-15% p.a.",
      icon: FaGlobeAmericas,
      color: "from-blue-600 to-indigo-700",
    },
    {
      title: "Concentrated Growth",
      description:
        "High-conviction equity portfolios for aggressive compounding.",
      returns: "15-18% p.a.",
      icon: FaChartLine,
      color: "from-orange-500 to-red-600",
    },
    {
      title: "Hybrid Protection",
      description:
        "Balanced growth with lower volatility as you approach the goal.",
      returns: "10-12% p.a.",
      icon: FaShieldAlt,
      color: "from-slate-700 to-slate-900",
    },
  ];

  const educationMilestones = [
    {
      title: "Primary Academic",
      age: "6-10 years",
      estimatedCost: "₹5-12 Lakhs",
      icon: FaBookReader,
    },
    {
      title: "Secondary Foundation",
      age: "11-18 years",
      estimatedCost: "₹15-30 Lakhs",
      icon: FaUniversity,
    },
    {
      title: "Undergraduate Ivy",
      age: "18-22 years",
      estimatedCost: "₹50-1.5 Cr",
      icon: FaGraduationCap,
    },
    {
      title: "Specialized Masters",
      age: "22-25 years",
      estimatedCost: "₹1.5-3.5 Cr",
      icon: FaGem,
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
                <FaGraduationCap className="text-sm text-orange-600" />
                <span className="text-orange-900 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em]">
                  Gen-Alpha Readiness
                </span>
              </motion.div>

              <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] text-slate-900 sm:text-6xl lg:text-7xl">
                Education <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                  Futures.
                </span>
              </h1>

              <p className="max-w-2xl mx-auto mb-8 text-base font-medium leading-relaxed lg:mx-0 sm:text-lg lg:text-xl text-slate-700 sm:mb-10">
                Architecting intellectual legacies. We engineer high-growth
                educational funds that ensure your child's aspirations are never
                constrained by capital.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-5 lg:justify-start sm:gap-8">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900 sm:text-3xl">
                    10%
                  </span>
                  <span className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                    Edu Inflation
                  </span>
                </div>

                <div className="hidden w-px h-12 sm:block bg-slate-200"></div>

                <div className="flex flex-col">
                  <span className="text-2xl font-black text-orange-600 sm:text-3xl">
                    ₹{(futureEducationCost / 10000000).toFixed(1)}Cr
                  </span>
                  <span className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                    Future Cost
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
                  Fund Architecture
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
                        Horizon
                      </div>
                      <div className="text-lg font-black text-center text-slate-900">
                        {yearsToGoal} Years
                      </div>
                    </div>

                    <div className="p-4 bg-white border rounded-2xl border-slate-100">
                      <div className="mb-1 text-[10px] font-bold tracking-widest text-center uppercase text-slate-400">
                        Multiplier
                      </div>
                      <div className="text-lg font-black text-center text-slate-900">
                        {(futureEducationCost / currentCost).toFixed(1)}x
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
                  Education Goal Calibration
                </h2>

                <div className="grid gap-12 md:grid-cols-2">
                  <div className="space-y-10">
                    <SliderInput
                      label="Child's Current Age"
                      value={childAge}
                      min={0}
                      max={educationAge - 1}
                      onChange={setChildAge}
                      suffix=" Yrs"
                    />
                    <SliderInput
                      label="Target Start Age"
                      value={educationAge}
                      min={15}
                      max={25}
                      onChange={setEducationAge}
                      suffix=" Yrs"
                    />
                    <SliderInput
                      label="Current Course Cost"
                      value={currentCost}
                      min={500000}
                      max={20000000}
                      step={500000}
                      onChange={setCurrentCost}
                      prefix="₹"
                    />
                    <SliderInput
                      label="Current Allocation"
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

            {/* Sidebar: Milestones */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#0f172a] rounded-[2.5rem] p-10 text-white h-fit sticky top-24"
              >
                <h3 className="flex items-center mb-10 text-2xl font-bold">
                  <FaHistory className="mr-3 text-orange-500" />
                  Career Milestones
                </h3>
                <div className="relative space-y-10">
                  <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-800"></div>
                  {educationMilestones.map((m, i) => (
                    <div key={i} className="relative pl-10">
                      <div className="absolute left-0 top-1.5 w-4 h-4 bg-orange-600 rounded-full border-4 border-[#0f172a] z-10"></div>
                      <div className="mb-1 text-xs font-bold tracking-widest uppercase text-slate-500">
                        {m.age}
                      </div>
                      <h5 className="mb-1 text-lg font-bold text-white">
                        {m.title}
                      </h5>
                      <div className="font-black text-orange-500">
                        {m.estimatedCost}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 overflow-hidden text-white bg-slate-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <h2 className="mb-4 text-4xl font-extrabold">
              The Excellence Protocol
            </h2>
            <p className="text-lg font-medium text-slate-400">
              A systematic framework for academic sovereignty.
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
                Don't Let Inflation <br /> Limit Their Potential.
              </h2>
              <p className="max-w-2xl mx-auto mb-12 text-xl font-medium text-white/80">
                Start engineering a world-class educational corpus today. Every
                month deferred increases the capital required exponentially.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-12 py-5 font-black text-orange-600 transition-all transform bg-white shadow-xl rounded-2xl hover:bg-slate-50 hover:scale-105 group"
              >
                Secure Their Legacy
                <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ChildEducation;
