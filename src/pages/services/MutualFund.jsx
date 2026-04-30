import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaChartPie,
  FaChartLine,
  FaHandHoldingUsd,
  FaCheckCircle,
  FaShieldAlt,
  FaCoins,
  FaArrowRight,
  FaGem,
  FaUserShield,
} from "react-icons/fa";

import useMetaTags from "../../hooks/useMetaTags";
import useCMSContent from "../../hooks/useCMSContent";

const MutualFund = () => {
  const { cmsContent } = useCMSContent("mutual-fund");

  // SEO Hook
  useMetaTags(
    cmsContent["_seo"] || {
      title: "Mutual Fund Advisory Services | We Care Freedom Wealth",
      description:
        "Expert mutual fund advisory services to help you invest smartly, manage risk, and achieve long-term financial goals with We Care Freedom Wealth.",
      robotsTag: "index, follow",
    },
  );

  const fundTypes = [
    {
      icon: FaChartLine,
      title: "Equity Growth Funds",
      description:
        "High-alpha strategies for aggressive long-term wealth expansion.",
      risk: "High",
      returns: "12-15% p.a.",
      color: "from-blue-600 to-blue-800",
    },
    {
      icon: FaShieldAlt,
      title: "Debt & Income Funds",
      description:
        "Fixed-income securities focusing on capital preservation and yield.",
      risk: "Low to Medium",
      returns: "6-8% p.a.",
      color: "from-slate-600 to-slate-800",
    },
    {
      icon: FaCoins,
      title: "Hybrid Alpha Funds",
      description:
        "Optimized allocation across asset classes for superior risk-adjusted returns.",
      risk: "Medium",
      returns: "9-12% p.a.",
      color: "from-orange-500 to-orange-700",
    },
  ];

  const benefits = [
    "Professional institutional fund management",
    "Deep cross-sector asset diversification",
    "Liquid redemption cycles with high transparency",
    "Tax-advantaged structures (ELSS & Indexation)",
    "Systematic compounding through SIP protocols",
    "Strict regulatory oversight and audit trails",
  ];

  const sipBenefits = [
    {
      title: "Rupee Averaging",
      description: "Automated cost optimization across market cycles.",
    },
    {
      title: "Compounding Alpha",
      description: "Exponetial growth on reinvested yields over time.",
    },
    {
      title: "Disciplined Flow",
      description: "Automated monthly capital deployment.",
    },
    {
      title: "Low Barrier",
      description: "Institutional access starting at ₹500/month.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "KYC Onboarding",
      description:
        "Institutional-grade identity verification and risk assessment.",
    },
    {
      step: "02",
      title: "Strategic Selection",
      description: "Curating funds aligned with your specific goal horizon.",
    },
    {
      step: "03",
      title: "Protocol Execution",
      description: "Initiating the systematic investment flow.",
    },
    {
      step: "04",
      title: "Active Oversight",
      description: "Quarterly rebalancing and portfolio optimization.",
    },
  ];

  void fundTypes;
  void sipBenefits;
  void process;

  return (
    <div className="bg-white">
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
                <FaChartPie className="text-orange-600 text-[10px] sm:text-sm" />

                <div
                  className="text-orange-900 font-bold text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em]"
                  dangerouslySetInnerHTML={{
                    __html:
                      cmsContent["hero"]?.badge ||
                      "Institutional Wealth Management",
                  }}
                />
              </motion.div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                {cmsContent["hero"]?.title ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: cmsContent["hero"].title.replace(
                        /Fund Alpha\./g,
                        '<span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Fund Alpha.</span>',
                      ),
                    }}
                  />
                ) : (
                  <>
                    Mutual <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                      Fund Alpha.
                    </span>
                  </>
                )}
              </h1>

              <div
                className="max-w-xl mx-auto mb-8 text-base font-medium leading-relaxed sm:text-lg md:text-xl text-slate-700 lg:mx-0 sm:mb-10 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["hero"]?.description ||
                    "Engineered for growth. We provide access to diversified, professional management strategies that transform capital into sustainable long-term wealth.",
                }}
              />

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-5 lg:justify-start sm:gap-8">
                {(
                  cmsContent["hero"]?.stats || [
                    { val: "1000+", label: "Asset Vehicles" },
                    { val: "12-15%", label: "Target CAGR" },
                    { val: "₹500", label: "Entry Protocol" },
                  ]
                ).map((stat, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-slate-900 sm:text-3xl">
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

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="w-full"
            >
              <div className="bg-white/70 backdrop-blur-xl border border-white/40 p-6 sm:p-8 lg:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-2xl shadow-orange-900/5 text-center">
                <FaHandHoldingUsd className="mx-auto mb-5 text-5xl text-orange-500 sm:text-6xl sm:mb-6" />

                <h3 className="mb-4 text-xl font-bold sm:text-2xl text-slate-900">
                  Capital Compounding
                </h3>

                <p className="mb-8 text-sm font-medium leading-relaxed text-slate-500 sm:text-base">
                  Harness the relentless power of systematic compounding through
                  institutionally curated fund baskets.
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="p-4 bg-white border rounded-2xl border-slate-100">
                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                      Standard
                    </div>
                    <div className="text-lg font-black text-slate-900">
                      SEBI Reg.
                    </div>
                  </div>

                  <div className="p-4 bg-white border rounded-2xl border-slate-100">
                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                      Liquidity
                    </div>
                    <div className="text-lg font-black text-slate-900">
                      Direct
                    </div>
                  </div>
                </div>
              </div>
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
                        /Wealth Aggregation/g,
                        '<span class="text-orange-600">Wealth Aggregation</span>',
                      ),
                    }}
                  />
                ) : (
                  <>
                    Professional{" "}
                    <span className="text-orange-600">Wealth Aggregation</span>
                  </>
                )}
              </h2>
              <div
                className="mb-6 text-base font-medium leading-relaxed sm:text-lg text-slate-600 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["value-section"]?.description ||
                    "Mutual funds pool institutional capital to access high-grade diversified portfolios. Managed by tenure-tracked fund managers, these vehicles provide retail investors with elite-level asset management.",
                }}
              />
              <div
                className="mb-8 text-base font-medium leading-relaxed sm:text-lg text-slate-600 sm:mb-10 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["value-section"]?.secondary_text ||
                    "Our mandates focus on risk mitigation and alpha generation, ensuring your capital is deployed where it has the highest probability of fulfillment.",
                }}
              />
              <div className="p-6 border-l-4 border-orange-500 shadow-sm bg-slate-50 sm:p-8 rounded-r-2xl sm:rounded-r-3xl">
                <h4 className="flex items-center mb-3 font-bold text-slate-900">
                  <FaGem className="mr-2 text-orange-500" />{" "}
                  {cmsContent["value-section"]?.insight_title ||
                    "Strategic Insight"}
                </h4>
                <div
                  className="text-sm font-medium leading-relaxed text-slate-500 cms-content"
                  dangerouslySetInnerHTML={{
                    __html:
                      cmsContent["value-section"]?.insight_text ||
                      "A systematic SIP of ₹10,000/month for 15 years can potentially build a corpus of over ₹50 Lakhs, harnessing the relentless power of compounding.",
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
                The WCFW Mandate
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {(cmsContent["value-section"]?.benefits || benefits).map(
                  (benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <FaCheckCircle className="mt-1 text-lg text-orange-500 sm:text-xl shrink-0" />
                      <p className="text-xs font-bold leading-relaxed text-slate-300 sm:text-sm">
                        {benefit}
                      </p>
                    </div>
                  ),
                )}
              </div>
              <div className="p-4 mt-8 border sm:mt-12 sm:p-6 bg-white/5 rounded-xl sm:rounded-2xl border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-orange-600 rounded-lg sm:w-12 sm:h-12 sm:rounded-xl">
                    <FaUserShield className="text-lg text-white sm:text-xl" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Security Standard
                    </p>
                    <p className="text-xs font-bold sm:text-sm">
                      SEBI Regulated Framework
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
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
              <FaChartPie className="mx-auto mb-6 text-4xl sm:text-6xl sm:mb-8 text-white/90" />
              <div
                className="mb-6 text-3xl font-black leading-tight sm:text-5xl sm:mb-8 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["cta-section"]?.title ||
                    "Initiate Capital Compounding",
                }}
              />
              <div
                className="max-w-2xl mx-auto mb-8 text-base font-medium sm:text-xl sm:mb-12 text-white/90 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["cta-section"]?.description ||
                    "Secure your future wealth with institutional fund strategies. Minimum entry from ₹500/month.",
                }}
              />
              <Link
                to={cmsContent["cta-section"]?.ctaLink || "/contact"}
                className="inline-flex items-center px-8 py-4 text-sm font-black text-orange-600 transition-all transform bg-white shadow-2xl sm:py-5 sm:px-12 rounded-xl sm:rounded-2xl hover:bg-slate-50 hover:scale-105 sm:text-base"
              >
                <span
                  className="inline-block cms-content"
                  dangerouslySetInnerHTML={{
                    __html:
                      cmsContent["cta-section"]?.ctaText ||
                      "Contact Portfolio Desk",
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

export default MutualFund;
