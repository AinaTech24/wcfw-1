import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPiggyBank,
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
  FaUniversity,
  FaPercent,
  FaGem,
  FaLock,
} from "react-icons/fa";

import useMetaTags from "../../hooks/useMetaTags";
import useCMSContent from "../../hooks/useCMSContent";

const FixedDeposit = () => {
  const { cmsContent } = useCMSContent("fixed-deposit");

  useMetaTags(
    cmsContent["_seo"] || {
      title: "Fixed Deposit Investment Services | We Care Freedom Wealth",
      description:
        "Secure your savings with fixed deposit investment services from We Care Freedom Wealth, offering safe returns, stability, and expert financial guidance.",
      robotsTag: "index, follow",
    },
  );

  const hardcodedFdTypes = [
    { color: "from-blue-600 to-blue-800" },
    { color: "from-orange-500 to-orange-700" },
    { color: "from-slate-600 to-slate-800" },
  ];

  const cmsDepositArchitecture = cmsContent["deposit-architecture"]?.list || [
    {
      title: "Tier-1 Bank Deposits",
      description:
        "Traditional FDs with highest safety ratings and guaranteed capital protection.",
      tenure: "7 days to 10 years",
      returns: "5-8% p.a.",
    },
    {
      title: "Corporate FD Strips",
      description:
        "High-yield deposits from top-rated corporates offering superior alpha.",
      tenure: "1 to 5 years",
      returns: "7-9% p.a.",
    },
    {
      title: "Tax-Shielded Deposits",
      description:
        "5-year lock-in instruments eligible for Section 80C fiscal benefits.",
      tenure: "5 years",
      returns: "6-8% p.a.",
    },
  ];

  const fdTypes = cmsDepositArchitecture.map((type, index) => ({
    ...type,
    color: hardcodedFdTypes[index]?.color || "from-blue-600 to-blue-800",
  }));

  const benefits = cmsContent["value-section"]?.benefits || [
    "Sovereign-grade capital protection protocols",
    "Deterministic yield with zero market volatility",
    "Granular tenure flexibility for cash-flow matching",
    "Structured liquidity through interest payout options",
    "Collateralized loan facility availability",
    "Enhanced yield modifiers for senior citizens",
  ];

  const hardcodedFeatures = [
    { icon: FaShieldAlt },
    { icon: FaLock },
    { icon: FaUniversity },
  ];

  const cmsFeatures = cmsContent["deposit-architecture"]?.features || [
    {
      title: "Asset Security",
      description: "Bank deposits insured up to ₹5 Lakh via DICGC frameworks.",
    },
    {
      title: "On-Demand Liquidity",
      description: "Premature withdrawal options for emergency capital needs.",
    },
    {
      title: "Strategic Compounding",
      description: "Choose between cumulative growth or regular income.",
    },
  ];

  const features = cmsFeatures.map((feature, index) => ({
    ...feature,
    icon: hardcodedFeatures[index]?.icon || FaShieldAlt,
  }));

  const considerations = cmsContent["risk-matrix"]?.considerations || [
    "Interest accruals are subject to marginal tax slab rates",
    "Yield profiles may trail active inflation benchmarks",
    "Premature liquidation typically incurs a minimal penalty",
    "Concentration risk in corporate instruments requires audit",
    "TDS thresholds apply beyond specific interest milestones",
  ];

  return (
    <div className="bg-white">
      {/* Light Cinematic Header with Requested Gradient */}
      <section
        className="relative min-h-[min(100vh,720px)] sm:min-h-[min(75vh,640px)] lg:min-h-[min(90vh,760px)] flex items-center overflow-hidden pt-28 pb-14 sm:pt-24 sm:pb-20 lg:pt-16"
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
              <div className="flex items-center justify-center mb-4 space-x-3 lg:justify-start sm:mb-6 sm:space-x-4">
                <span className="w-8 h-px bg-orange-500 sm:w-10"></span>

                <div
                  className="text-orange-600 font-bold uppercase tracking-[0.22em] sm:tracking-[0.3em] text-[10px] sm:text-xs"
                  dangerouslySetInnerHTML={{
                    __html: cmsContent["hero"]?.badge || "Capital Preservation",
                  }}
                />
              </div>

              <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl text-slate-900">
                {cmsContent["hero"]?.title ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: cmsContent["hero"].title.replace(
                        /Deposits\./g,
                        '<span class="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-800">Deposits.</span>',
                      ),
                    }}
                  />
                ) : (
                  <>
                    Fixed <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-800">
                      Deposits.
                    </span>
                  </>
                )}
              </h1>

              <div
                className="max-w-2xl mx-auto text-base font-medium leading-relaxed lg:mx-0 sm:text-lg text-slate-600 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["hero"]?.description ||
                    "Fortress safety. We curate the highest-yielding fixed-income instruments to provide guaranteed returns with absolute capital security.",
                }}
              />

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-5 mt-8 lg:justify-start sm:gap-8 sm:mt-12">
                {(
                  cmsContent["hero"]?.stats || [
                    { val: "7-9%", label: "Yield Range" },
                    { val: "100%", label: "Capital Shield" },
                    { val: "T+0", label: "Access Grade" },
                  ]
                ).map((stat, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col">
                      <span
                        className={`${
                          i % 2 === 0 ? "text-orange-600" : "text-slate-900"
                        } text-2xl sm:text-3xl font-black`}
                      >
                        {stat.val}
                      </span>

                      <span className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                        {stat.label}
                      </span>
                    </div>

                    {i < 2 && (
                      <div className="hidden w-px h-12 sm:block bg-slate-200"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {/* Right Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
            >
              {[
                {
                  icon: FaShieldAlt,
                  value: "100%",
                  label: "Capital Safety",
                },
                {
                  icon: FaUniversity,
                  value: "Top Rated",
                  label: "Bank Partners",
                },
                {
                  icon: FaLock,
                  value: "Secure",
                  label: "Guaranteed Return",
                },
                {
                  icon: FaGem,
                  value: "7-9%",
                  label: "Yield Focus",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-white/70 backdrop-blur-xl border border-white/40 p-5 sm:p-6 rounded-[1.75rem] sm:rounded-[2rem] shadow-xl"
                >
                  <item.icon className="mb-3 text-xl text-orange-500 sm:text-2xl" />

                  <div className="mb-1 text-lg font-black sm:text-xl text-slate-900">
                    {item.value}
                  </div>

                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Value Proposition */}
      <section className="py-12 bg-white sm:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 sm:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl font-extrabold leading-tight sm:text-4xl text-slate-900 sm:mb-8">
                {cmsContent["value-section"]?.title ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: cmsContent["value-section"].title.replace(
                        /Asset Shield/g,
                        '<span class="text-orange-600">Asset Shield</span>',
                      ),
                    }}
                  />
                ) : (
                  <>
                    Sovereign Grade{" "}
                    <span className="text-orange-600">Asset Shield</span>
                  </>
                )}
              </h2>
              <div
                className="mb-6 text-base font-medium leading-relaxed sm:text-lg text-slate-600 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["value-section"]?.description ||
                    "Fixed Deposits remain the bedrock of a conservative wealth strategy. By locking in predetermined yields, you eliminate market volatility from your core capital reserves.",
                }}
              />
              <div
                className="mb-8 text-base font-medium leading-relaxed sm:text-lg text-slate-600 sm:mb-10 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["value-section"]?.secondary_text ||
                    "We aggregate multiple institutional offerings to ensure your cash-flow laddering is optimized for both liquidity and maximum compounded growth.",
                }}
              />
              <div className="p-6 border-l-4 border-orange-500 shadow-sm bg-orange-50 sm:p-8 rounded-r-2xl sm:rounded-r-3xl">
                <h4 className="flex items-center mb-3 font-bold text-slate-900">
                  <FaGem className="mr-2 text-orange-500" /> Strategic Insight
                </h4>
                <div
                  className="text-sm font-medium leading-relaxed text-slate-500 cms-content"
                  dangerouslySetInnerHTML={{
                    __html:
                      cmsContent["value-section"]?.insight_text ||
                      "Senior citizens typically qualify for a 50bps yield modifier, significantly enhancing the real rate of return on long-tenure instruments.",
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-[#0f172a] rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-[80px]"></div>
              <h3 className="mb-6 text-xl font-black sm:text-2xl sm:mb-8">
                Asset Protocols
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <FaCheckCircle className="mt-1 text-lg text-orange-500 sm:text-xl shrink-0" />
                    <p className="text-xs font-bold leading-relaxed text-slate-300 sm:text-sm">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Segmentation */}
      <section className="py-24 bg-slate-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h3 className="mb-4 text-xs font-extrabold tracking-widest text-orange-600 uppercase">
              Instrument Matrix
            </h3>
            <div
              className="text-4xl font-black text-slate-900 cms-content"
              dangerouslySetInnerHTML={{
                __html:
                  cmsContent["deposit-architecture"]?.title ||
                  "Deposit Architecture",
              }}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-3">
            {fdTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2.5rem] p-10 shadow-lg border border-slate-100 hover:shadow-2xl transition-all group"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <FaPiggyBank className="text-2xl text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-black text-slate-900">
                  {type.title}
                </h3>
                <p className="mb-8 font-medium leading-relaxed text-slate-500">
                  {type.description}
                </p>
                <div className="pt-8 space-y-4 border-t border-slate-50">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-400">Horizon</span>
                    <span className="font-black text-slate-900">
                      {type.tenure}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-400">Target Yield</span>
                    <span className="font-black text-orange-600">
                      {type.returns}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] p-8 text-center shadow-md border border-slate-100"
              >
                <div className="flex items-center justify-center mx-auto mb-6 w-14 h-14 bg-orange-50 rounded-2xl">
                  <feature.icon className="text-xl text-orange-600" />
                </div>
                <h4 className="mb-3 text-lg font-bold text-slate-900">
                  {feature.title}
                </h4>
                <p className="text-sm font-medium leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Considerations */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[3rem] p-12 text-white border border-white/5 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-64 h-64 bg-orange-600/5 rounded-full blur-[100px]"></div>
            <h3 className="flex items-center mb-8 text-2xl font-black">
              <span className="w-2 h-2 mr-3 bg-orange-500 rounded-full"></span>
              {cmsContent["risk-matrix"]?.title || "Risk Matrix Audit"}
            </h3>
            <div className="space-y-6">
              {considerations.map((point, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <FaPercent className="text-orange-500 text-xs mt-1.5 shrink-0" />
                  <p className="text-sm font-bold leading-relaxed text-slate-400">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Strategic CTA */}
      <section className="py-12 bg-white sm:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-[2rem] sm:rounded-[3rem] p-10 sm:p-20 text-white text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full w-96 h-96 bg-white/10 blur-3xl"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <FaShieldAlt className="mx-auto mb-6 text-4xl sm:text-6xl sm:mb-8 text-white/90" />
              <div
                className="mb-6 text-3xl font-black leading-tight sm:text-5xl sm:mb-8 cms-content"
                dangerouslySetInnerHTML={{
                  __html: cmsContent["cta"]?.title || "Compare Yield Spreads",
                }}
              />
              <div
                className="max-w-2xl mx-auto mb-8 text-base font-medium sm:text-xl sm:mb-12 text-white/90 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["cta"]?.description ||
                    "Optimize your cash reserves. Compare real-time FD rates across leading institutional partners.",
                }}
              />
              <Link
                to={cmsContent["cta"]?.ctaLink || "/contact"}
                className="inline-flex items-center px-8 py-4 text-sm font-black text-orange-600 transition-all transform bg-white shadow-2xl sm:py-5 sm:px-12 rounded-xl sm:rounded-2xl hover:bg-slate-50 hover:scale-105 sm:text-base"
              >
                <span
                  className="inline-block cms-content"
                  dangerouslySetInnerHTML={{
                    __html: cmsContent["cta"]?.ctaText || "Initiate FD Audit",
                  }}
                />{" "}
                <FaArrowRight className="ml-3" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FixedDeposit;
