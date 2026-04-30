import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaChartLine,
  FaLightbulb,
  FaCheckCircle,
  FaArrowRight,
  FaExclamationTriangle,
} from "react-icons/fa";

import useMetaTags from "../../hooks/useMetaTags";
import useCMSContent from "../../hooks/useCMSContent";

const Stocks = () => {
  const { cmsContent } = useCMSContent("stocks");

  useMetaTags(
    cmsContent["_seo"] || {
      title: "Strategic Equity Investments | We Care Freedom Wealth",
      description:
        "Strategic equity investments designed for long-term wealth creation with expert research, disciplined strategies, and risk-aware planning.",
      robotsTag: "index, follow",
    },
  );

  const hardcodedStockTypes = [
    {
      title: "Large Cap Bluechips",
      description:
        "Industry titans with market cap exceeding ₹20,000 Cr. Peak stability and dividend yield.",
      risk: "Low to Medium",
      returns: "10-12% p.a.",
      color: "from-blue-600 to-blue-800",
    },
    {
      title: "Mid Cap Growth",
      description:
        "High-potential companies with market cap ₹5,000-20,000 Cr. The engines of wealth creation.",
      risk: "Medium to High",
      returns: "12-15% p.a.",
      color: "from-orange-500 to-orange-700",
    },
    {
      title: "Small Cap Alpha",
      description:
        "Emerging niche leaders with market cap < ₹5,000 Cr. Maximum growth potential for aggressive portfolios.",
      risk: "High",
      returns: "15-20% p.a.",
      color: "from-slate-600 to-slate-800",
    },
  ];

  const cmsMarketSegmentation = cmsContent["market-segmentation"]?.list || [
    {
      title: "Large Cap Bluechips",
      description:
        "Industry titans with market cap exceeding ₹20,000 Cr. Peak stability and dividend yield.",
      risk: "Low to Medium",
      returns: "10-12% p.a.",
    },
    {
      title: "Mid Cap Growth",
      description:
        "High-potential companies with market cap ₹5,000-20,000 Cr. The engines of wealth creation.",
      risk: "Medium to High",
      returns: "12-15% p.a.",
    },
    {
      title: "Small Cap Alpha",
      description:
        "Emerging niche leaders with market cap < ₹5,000 Cr. Maximum growth potential for aggressive portfolios.",
      risk: "High",
      returns: "15-20% p.a.",
    },
  ];

  const stockTypes = cmsMarketSegmentation.map((type, index) => ({
    ...type,
    color: hardcodedStockTypes[index]?.color || "from-slate-600 to-slate-800",
  }));

  const benefits = cmsContent["value-section"]?.benefits || [
    "Superior long-term capital appreciation",
    "Direct ownership in high-growth enterprises",
    "Consistent dividend-based passive income",
    "T+2 liquidity with deep market depth",
    "Strategic hedge against systemic inflation",
    "Agile portfolio diversification opportunities",
  ];

  const risks = [
    "Inherent market volatility and cyclicality",
    "Company-specific operational and fiscal risks",
    "Macro-economic and geopolitical shifts",
    "Requirement for active monitoring and research",
    "Potential for short-term capital drawdown",
  ];

  const investmentApproach = cmsContent["approach"]?.steps || [
    {
      step: "01",
      title: "Fundamental Audit",
      description:
        "Bottom-up analysis of financial health, Moat, and management tenure.",
    },
    {
      step: "02",
      title: "Technical Sizing",
      description:
        "Optimizing entry and exit windows using price-action and trend analytics.",
    },
    {
      step: "03",
      title: "Sector Rotation",
      description:
        "Strategic allocation across high-alpha sectors and market caps.",
    },
    {
      step: "04",
      title: "Patience Protocol",
      description:
        "Long-term compounding focus to override transitory market noise.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Light Cinematic Header with Requested Gradient */}
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
              <div className="flex items-center justify-center mb-4 space-x-3 lg:justify-start sm:space-x-4 sm:mb-6">
                <span className="w-8 h-px bg-orange-500 sm:w-10"></span>

                <div
                  className="text-orange-600 font-bold uppercase tracking-[0.22em] sm:tracking-[0.3em] text-[10px] sm:text-xs"
                  dangerouslySetInnerHTML={{
                    __html: cmsContent["hero"]?.badge || "Equity Supremacy",
                  }}
                />
              </div>

              <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl text-slate-900">
                {cmsContent["hero"]?.title ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: cmsContent["hero"].title.replace(
                        /Equities\./g,
                        '<span class="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-800">Equities.</span>',
                      ),
                    }}
                  />
                ) : (
                  <>
                    Strategic <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-800">
                      Equities.
                    </span>
                  </>
                )}
              </h1>

              <div
                className="max-w-2xl mx-auto text-base font-medium leading-relaxed sm:text-lg text-slate-600 lg:mx-0 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["hero"]?.description ||
                    "Own the future. We provide research-backed, high-conviction stock strategies designed to outperform benchmarks and build generational wealth.",
                }}
              />

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-5 mt-8 sm:mt-12 lg:justify-start sm:gap-8">
                {(
                  cmsContent["hero"]?.stats || [
                    { val: "5000+", label: "Active Listings" },
                    { val: "20%+", label: "Target Alpha" },
                    { val: "Expert", label: "Portfolio Desk" },
                  ]
                ).map((stat, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-orange-600 sm:text-3xl">
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
                  title: "Bluechip Stability",
                  value: "Large Cap",
                },
                {
                  title: "Growth Potential",
                  value: "Mid Cap",
                },
                {
                  title: "Alpha Focus",
                  value: "Small Cap",
                },
                {
                  title: "Research Desk",
                  value: "Expert",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-white/70 backdrop-blur-xl border border-white/40 p-5 sm:p-6 rounded-[1.75rem] sm:rounded-[2rem] shadow-xl"
                >
                  <FaChartLine className="mb-3 text-xl text-orange-500 sm:text-2xl" />

                  <div className="mb-1 text-lg font-black sm:text-xl text-slate-900">
                    {item.value}
                  </div>

                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">
                    {item.title}
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
                        /Business Growth/g,
                        '<span class="text-orange-600">Business Growth</span>',
                      ),
                    }}
                  />
                ) : (
                  <>
                    Harnessing{" "}
                    <span className="text-orange-600">Business Growth</span>
                  </>
                )}
              </h2>
              <div
                className="mb-6 text-base font-medium leading-relaxed sm:text-lg text-slate-600 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["value-section"]?.description ||
                    "Direct equity investing is the most powerful engine for long-term wealth creation. By owning shares in high-performing companies, you participate directly in their profit and growth trajectories.",
                }}
              />
              <div
                className="mb-8 text-base font-medium leading-relaxed sm:text-lg text-slate-600 sm:mb-10 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["value-section"]?.secondary_text ||
                    "Our institutional-grade research identifies value before the market, ensuring your portfolio is positioned in the tomorrow's leaders today.",
                }}
              />
              <div className="p-6 border-l-4 border-orange-500 shadow-sm bg-orange-50 sm:p-8 rounded-r-2xl sm:rounded-r-3xl">
                <h4 className="flex items-center mb-3 font-bold text-slate-900">
                  <FaLightbulb className="mr-2 text-orange-600" /> Strategic
                  Insight
                </h4>
                <div
                  className="text-sm font-medium leading-relaxed text-slate-500 cms-content"
                  dangerouslySetInnerHTML={{
                    __html:
                      cmsContent["value-section"]?.insight_text ||
                      '"Time in the market beats timing the market." Our philosophy prioritizes fundamental strength over transitory volatility.',
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
                The Equity Advantage
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

      {/* Market Segmentation */}
      <section className="py-24 bg-slate-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h3 className="mb-4 text-xs font-extrabold tracking-widest text-orange-600 uppercase">
              Capital Allocation
            </h3>
            <div
              className="text-4xl font-black text-slate-900 cms-content"
              dangerouslySetInnerHTML={{
                __html:
                  cmsContent["market-segmentation"]?.title ||
                  "Market Infrastructure",
              }}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {stockTypes.map((type, index) => (
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
                  <FaChartLine className="text-2xl text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-black text-slate-900">
                  {type.title}
                </h3>
                <p className="mb-8 font-medium leading-relaxed text-slate-500">
                  {type.description}
                </p>
                <div className="pt-8 space-y-4 border-t border-slate-50">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-400">Risk Profile</span>
                    <span className="font-black text-slate-900">
                      {type.risk}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-400">Performance Target</span>
                    <span className="font-black text-orange-600">
                      {type.returns}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach and Risk Matrix */}
      <section className="py-12 bg-white sm:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 sm:gap-12">
            {/* Approach */}
            <div>
              <div className="mb-8 sm:mb-12">
                <h3 className="text-orange-600 font-extrabold uppercase tracking-widest text-[10px] sm:text-xs mb-4">
                  Selection Methodology
                </h3>
                <h2 className="text-3xl font-black sm:text-4xl text-slate-900">
                  {cmsContent["approach"]?.title || "Portfolio Execution"}
                </h2>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {investmentApproach.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 sm:space-x-6"
                  >
                    <div className="flex items-center justify-center w-10 h-10 text-sm font-black text-orange-500 shadow-lg sm:w-12 sm:h-12 bg-slate-900 rounded-xl sm:rounded-2xl shrink-0 sm:text-base">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold sm:text-xl text-slate-900">
                        {step.title}
                      </h3>
                      <p className="text-xs font-medium leading-relaxed text-slate-500 sm:text-sm">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Risk Matrix */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-red-50 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 border border-red-100 shadow-xl"
            >
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="flex items-center justify-center w-10 h-10 mr-3 text-white bg-red-600 shadow-lg sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl sm:mr-4">
                  <FaExclamationTriangle className="text-lg sm:text-xl" />
                </div>
                <h3 className="text-xl font-black sm:text-2xl text-slate-900">
                  {cmsContent["risk-mandate"]?.title || "Risk Mandate"}
                </h3>
              </div>
              <div className="mb-8 space-y-4 sm:space-y-6 sm:mb-10">
                {(cmsContent["risk-mandate"]?.risks || risks).map(
                  (risk, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 sm:space-x-4"
                    >
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full shrink-0 mt-1.5"></span>
                      <p className="text-xs font-bold leading-tight text-slate-700 sm:text-sm">
                        {risk}
                      </p>
                    </div>
                  ),
                )}
              </div>
              <div className="p-4 italic bg-white border border-red-100 sm:p-6 rounded-xl sm:rounded-2xl">
                <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed">
                  <strong>Regulatory Standard:</strong>{" "}
                  {cmsContent["risk-mandate"]?.regulatory ||
                    "Stock market investments are subject to market risks. Past performance is not indicative of future returns."}
                </p>
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
              <FaChartLine className="mx-auto mb-6 text-4xl sm:text-6xl sm:mb-8 text-white/90" />
              <div
                className="mb-6 text-3xl font-black leading-tight sm:text-5xl sm:mb-8 cms-content"
                dangerouslySetInnerHTML={{
                  __html: cmsContent["cta"]?.title || "Access Quant Research",
                }}
              />
              <div
                className="max-w-2xl mx-auto mb-8 text-base font-medium sm:text-xl sm:mb-12 text-white/90 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["cta"]?.description ||
                    "Schedule a technical audit of your existing portfolio or initiate a research-backed mandate.",
                }}
              />
              <Link
                to={cmsContent["cta"]?.ctaLink || "/contact"}
                className="inline-flex items-center px-8 py-4 text-sm font-black text-orange-600 transition-all transform bg-white shadow-2xl sm:py-5 sm:px-12 rounded-xl sm:rounded-2xl hover:bg-slate-50 hover:scale-105 sm:text-base"
              >
                <span
                  className="inline-block cms-content"
                  dangerouslySetInnerHTML={{
                    __html: cmsContent["cta"]?.ctaText || "Contact Equity Desk",
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

export default Stocks;
