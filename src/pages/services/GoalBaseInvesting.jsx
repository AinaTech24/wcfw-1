import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBullseye,
  FaHome,
  FaGraduationCap,
  FaRing,
  FaUmbrella,
  FaChartLine,
  FaCheckCircle,
  FaArrowRight,
  FaRocket,
  FaHistory,
  FaChess,
  FaShieldAlt,
  FaBalanceScale,
} from "react-icons/fa";

import useMetaTags from "../../hooks/useMetaTags";
import useCMSContent from "../../hooks/useCMSContent";

const GoalBaseInvesting = () => {
  const { cmsContent } = useCMSContent("goal-base-investing");

  useMetaTags(
    cmsContent["_seo"] || {
      title: "Smart Goal-Based Investing | We Care Freedom Wealth",
      description:
        "Smart goal-based investing solutions to help you plan, invest, and achieve life goals with clarity, discipline, and long-term financial security.",
      robotsTag: "index, follow",
    },
  );

  const hardcodedGoals = [
    {
      icon: FaHome,
      color: "from-orange-500 to-red-500",
      link: "/goals/dream-home",
    },
    {
      icon: FaGraduationCap,
      color: "from-blue-500 to-indigo-600",
      link: "/goals/child-education",
    },
    {
      icon: FaRing,
      color: "from-purple-500 to-pink-500",
      link: "/goals/child-wedding",
    },
    {
      icon: FaUmbrella,
      color: "from-emerald-500 to-teal-600",
      link: "/goals/retirement",
    },
    {
      icon: FaShieldAlt,
      color: "from-amber-400 to-orange-500",
      link: "/goals/emergency-fund",
    },
    {
      icon: FaChartLine,
      color: "from-slate-700 to-slate-900",
      link: "/goals/wealth-creation",
    },
  ];

  const cmsGoals = cmsContent["goals-matrix"]?.list || [
    {
      title: "Dream Home Acquisition",
      description:
        "Capital deployment strategies tailored for high-value real estate acquisition and legacy building.",
      timeline: "5-10 Years",
    },
    {
      title: "Global Education Provision",
      description:
        "Ensuring unrestricted access to world-class education through inflation-adjusted corpus building.",
      timeline: "10-15 Years",
    },
    {
      title: "Legacy Celebrations",
      description:
        "Strategic wealth accumulation for significant life milestones and multi-generational celebrations.",
      timeline: "15-20 Years",
    },
    {
      title: "Financial Independence",
      description:
        "Advanced retirement architectures designed for absolute freedom and perpetual cash flow.",
      timeline: "20+ Years",
    },
    {
      title: "Liquidity Reserve",
      description:
        "Institutional-grade emergency reserves providing absolute security against market volatility.",
      timeline: "Immediate",
    },
    {
      title: "Alpha Wealth Creation",
      description:
        "Aggressive wealth compounding strategies focused on high-conviction growth opportunities.",
      timeline: "15+ Years",
    },
  ];

  const goals = cmsGoals.map((goal, index) => ({
    ...goal,
    icon: hardcodedGoals[index]?.icon || FaChartLine,
    color: hardcodedGoals[index]?.color || "from-slate-700 to-slate-900",
    link: hardcodedGoals[index]?.link || "/contact",
  }));

  const benefits = cmsContent["philosophy"]?.benefits || [
    {
      title: "Precision Targeting",
      text: "Move beyond generic benchmarks to achieve specific, quantifiable life milestones.",
    },
    {
      title: "Dynamic Allocation",
      text: "Asset allocation that evolves based on your proximity to the target goal date.",
    },
    {
      title: "Tax Optimization",
      text: "Structuring investments to maximize post-tax returns across different goal horizons.",
    },
    {
      title: "Behavioral Alpha",
      text: "Maintaining discipline during market stress by tethering investments to tangible goals.",
    },
  ];

  const process = cmsContent["framework"]?.steps || [
    {
      step: "01",
      title: "Vision Clarification",
      description:
        "Deep-dive analysis to quantify your aspirations into actionable financial targets.",
    },
    {
      step: "02",
      title: "Gap Stratification",
      description:
        "Computational assessment of current assets against future liabilities and requirements.",
    },
    {
      step: "03",
      title: "Architecture Design",
      description:
        "Bespoke investment blueprinting using advanced asset correlation models.",
    },
    {
      step: "04",
      title: "Execution & Flow",
      description:
        "Systematic capital deployment into optimized vehicles with automated rebalancing.",
    },
    {
      step: "05",
      title: "Performance Audit",
      description:
        "Continuous monitoring and strategic pivots to ensure 100% goal attainment probability.",
    },
  ];

  return (
    <div className="bg-[#f8fafc]">
      {/* Cinematic Light Header */}
      <section
        className="relative min-h-screen sm:min-h-[75vh] lg:min-h-[90vh] flex items-center overflow-hidden pt-28 pb-14 sm:pt-24 sm:pb-20 lg:pt-16"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #ffe5bd 0%, #fffdf7 35%, #c7f1ff 100%)",
        }}
      >
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_100%)]"></div>
        </div>

        <div className="relative z-10 w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 sm:gap-14 lg:gap-12">
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
                className="inline-flex items-center space-x-2 bg-orange-500/10 backdrop-blur-md border border-orange-500/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-6"
              >
                <FaBullseye className="text-orange-600 text-[10px] sm:text-sm" />

                <div
                  className="text-orange-900 font-bold text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em]"
                  dangerouslySetInnerHTML={{
                    __html: cmsContent["hero"]?.badge || "Strategy First",
                  }}
                />
              </motion.div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                {cmsContent["hero"]?.title ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: cmsContent["hero"].title.replace(
                        /Architecture/g,
                        '<span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Architecture</span>',
                      ),
                    }}
                  />
                ) : (
                  <>
                    Goal-Based <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                      Architecture
                    </span>
                  </>
                )}
              </h1>

              <div
                className="max-w-xl mx-auto mb-8 text-base font-medium leading-relaxed sm:text-lg md:text-xl text-slate-700 lg:mx-0 sm:mb-10 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["hero"]?.description ||
                    "Transcend generic investing. We architect bespoke financial frameworks designed to deliver absolute certainty for your life's most ambitious milestones.",
                }}
              />

              <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                <Link
                  to={cmsContent["hero"]?.ctaLink || "/contact"}
                  className="flex items-center px-6 py-3 text-sm font-bold text-white transition-all shadow-xl bg-slate-900 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-slate-800 shadow-slate-900/10 group sm:text-base"
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        cmsContent["hero"]?.ctaText || "Start Architecting",
                    }}
                  />
                  <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* Right Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
            >
              {[
                {
                  label: "Success Probability",
                  val: "99.4%",
                  icon: FaChess,
                },
                {
                  label: "Strategic Clarity",
                  val: "100%",
                  icon: FaBullseye,
                },
                {
                  label: "Wealth Compounding",
                  val: "Alpha",
                  icon: FaRocket,
                },
                {
                  label: "Risk Mitigation",
                  val: "Tier-1",
                  icon: FaShieldAlt,
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="bg-white/70 backdrop-blur-xl border border-white/40 p-5 sm:p-6 rounded-[1.75rem] sm:rounded-[2rem] shadow-xl shadow-orange-900/5"
                >
                  <stat.icon className="mb-3 text-xl text-orange-500 sm:text-2xl" />

                  <div className="text-xl font-black sm:text-2xl text-slate-900">
                    {stat.val}
                  </div>

                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Philosophy */}
      <section className="relative py-12 overflow-hidden sm:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-slate-100 p-6 sm:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none bg-gradient-to-l from-orange-50/50 to-transparent"></div>

            <div className="grid items-center gap-10 lg:grid-cols-2 sm:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-6 text-3xl font-extrabold leading-tight sm:text-4xl text-slate-900 sm:mb-8">
                  {cmsContent["philosophy"]?.title ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: cmsContent["philosophy"].title.replace(
                          /Intentional Wealth/g,
                          '<span class="text-orange-600">Intentional Wealth</span>',
                        ),
                      }}
                    />
                  ) : (
                    <>
                      The Philosophy of <br />{" "}
                      <span className="text-orange-600">
                        Intentional Wealth
                      </span>
                    </>
                  )}
                </h2>
                <div
                  className="mb-8 text-base font-medium leading-relaxed sm:text-lg text-slate-600 cms-content"
                  dangerouslySetInnerHTML={{
                    __html:
                      cmsContent["philosophy"]?.description ||
                      "Traditional investing focuses on market benchmarks—we focus on your life metrics. Goal-based investing is the science of aligning capital deployment with temporal needs, ensuring your money is exactly where it needs to be, right when you need it.",
                  }}
                />
                <div className="space-y-6">
                  {benefits.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-4">
                      <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 bg-orange-100 rounded-full">
                        <FaCheckCircle className="text-sm text-orange-600" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 sm:text-lg">
                          {item.title}
                        </h4>
                        <p className="text-sm sm:text-base text-slate-500">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative bg-slate-900 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 text-white overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 transition-transform duration-700 opacity-10 group-hover:scale-110">
                  <FaBalanceScale className="text-[10rem] sm:text-[15rem]" />
                </div>
                <div className="relative z-10">
                  <h3 className="flex items-center mb-6 text-xl font-bold sm:text-2xl">
                    <span className="flex items-center justify-center w-8 h-8 mr-3 bg-orange-500 rounded-lg sm:w-10 sm:h-10 sm:mr-4">
                      <FaHistory className="text-sm text-white sm:text-base" />
                    </span>
                    Temporal Efficiency
                  </h3>
                  <p className="mb-8 text-base font-medium leading-relaxed text-slate-300 sm:text-lg">
                    We divide your wealth into tactical buckets, each optimized
                    for its specific time horizon and risk tolerance. This
                    eliminates the "anxiety of the unknown" and replaces it with
                    the "certainty of a Solution."
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="p-4 border bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border-white/10">
                      <div className="mb-1 text-sm font-bold text-orange-400 sm:text-base">
                        Short-Term
                      </div>
                      <div className="text-xs sm:text-sm text-slate-400">
                        Capital Preservation & Liquidity
                      </div>
                    </div>
                    <div className="p-4 border bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border-white/10">
                      <div className="mb-1 text-sm font-bold text-orange-400 sm:text-base">
                        Long-Term
                      </div>
                      <div className="text-xs sm:text-sm text-slate-400">
                        Compounding & Growth Alpha
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Matrix */}
      <section className="relative py-12 overflow-hidden sm:py-24 bg-slate-900">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>

        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center sm:mb-20"
          >
            <h2 className="mb-6 text-3xl font-black text-white md:text-5xl">
              {cmsContent["goals-matrix"]?.title ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: cmsContent["goals-matrix"].title.replace(
                      /Milestones/g,
                      '<span class="text-orange-500">Milestones</span>',
                    ),
                  }}
                />
              ) : (
                <>
                  Strategic <span className="text-orange-500">Milestones</span>
                </>
              )}
            </h2>
            <div
              className="max-w-2xl mx-auto text-base font-medium text-slate-400 sm:text-xl cms-content"
              dangerouslySetInnerHTML={{
                __html:
                  cmsContent["goals-matrix"]?.subtitle ||
                  "Tailored architectures for every phase of your financial evolution.",
              }}
            />
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-8">
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link
                  to={goal.link}
                  className="block bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] h-full hover:bg-slate-800 hover:border-orange-500/50 transition-all duration-500 group-hover:-translate-y-2"
                >
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${goal.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <goal.icon className="text-2xl text-white sm:text-3xl" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white sm:text-2xl sm:mb-4">
                    {goal.title}
                  </h3>
                  <p className="mb-6 text-sm font-medium leading-relaxed sm:text-base text-slate-400 sm:mb-8">
                    {goal.description}
                  </p>
                  <div className="flex items-center justify-between pt-6 mt-auto border-t border-slate-700/50">
                    <div className="flex items-center text-xs font-bold tracking-widest text-orange-500 uppercase sm:text-sm">
                      <FaHistory className="mr-2" />
                      {goal.timeline}
                    </div>
                    <FaArrowRight className="transition-all text-slate-500 group-hover:text-orange-500 group-hover:translate-x-2" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Framework */}
      <section className="py-12 overflow-hidden bg-white sm:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center sm:mb-20"
          >
            <h2 className="mb-6 text-3xl font-extrabold sm:text-4xl text-slate-900 font-primary">
              {cmsContent["framework"]?.title ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: cmsContent["framework"].title.replace(
                      /Framework/g,
                      '<span class="text-orange-600">Framework</span>',
                    ),
                  }}
                />
              ) : (
                <>
                  The Implementation{" "}
                  <span className="text-orange-600">Framework</span>
                </>
              )}
            </h2>
            <div
              className="max-w-2xl mx-auto text-base font-medium text-slate-500 sm:text-xl cms-content"
              dangerouslySetInnerHTML={{
                __html:
                  cmsContent["framework"]?.subtitle ||
                  "A rigorous process designed for absolute goal attainment.",
              }}
            />
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-0 hidden w-px h-full left-8 md:left-1/2 bg-slate-100 md:block"></div>

            <div className="space-y-8 sm:space-y-12">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center gap-6 sm:gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="flex-1 hidden md:block"></div>

                  <div className="relative z-10 flex items-center justify-center w-12 h-12 text-xl font-black text-orange-500 border-4 border-white shadow-xl sm:w-16 sm:h-16 bg-slate-900 rounded-xl sm:rounded-2xl sm:text-2xl shadow-slate-900/10 shrink-0">
                    {step.step}
                  </div>

                  <div className="flex-1 bg-slate-50 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-100 hover:border-orange-200 transition-colors">
                    <h3 className="mb-2 text-lg font-bold sm:text-xl text-slate-900 sm:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm font-medium leading-relaxed sm:text-base text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 overflow-hidden sm:py-24">
        <div className="relative z-10 max-w-5xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-20 rounded-[2.5rem] sm:rounded-[4rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            <div className="relative z-10 capitalize">
              <FaRocket className="mx-auto mb-6 text-4xl text-orange-500 sm:text-6xl sm:mb-10 animate-bounce" />
              <div
                className="mb-6 text-3xl font-black leading-tight text-white sm:text-5xl sm:mb-8 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["cta"]?.title ||
                    "Ready to Architect Your Financial Future?",
                }}
              />
              <div
                className="max-w-2xl mx-auto mb-8 text-base font-medium text-slate-400 sm:text-xl sm:mb-12 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["cta"]?.description ||
                    "Join the elite group of investors who prioritize certainty over speculation. Start your goal-based journey today.",
                }}
              />
              <Link
                to={cmsContent["cta"]?.ctaLink || "/contact"}
                className="inline-flex items-center px-8 py-4 text-sm font-black text-white transition-all transform bg-orange-500 shadow-2xl sm:py-5 sm:px-12 rounded-xl sm:rounded-2xl hover:bg-orange-400 hover:scale-105 shadow-orange-500/20 group sm:text-base"
              >
                <span
                  className="inline-block cms-content"
                  dangerouslySetInnerHTML={{
                    __html: cmsContent["cta"]?.ctaText || "Secure My Future",
                  }}
                />
                <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GoalBaseInvesting;
