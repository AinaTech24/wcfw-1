import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUmbrella,
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
  FaHeart,
  FaGem,
  FaUserShield,
} from "react-icons/fa";

import useMetaTags from "../../hooks/useMetaTags";
import useCMSContent from "../../hooks/useCMSContent";

const LifeInsurance = () => {
  const { cmsContent } = useCMSContent("life-insurance");

  useMetaTags(
    cmsContent["_seo"] || {
      metaTitle:
        "Life Insurance Services in India | We Care Freedom Wealth",
      metaDescription:
        "Secure your family’s future with expert life insurance services in India. We Care Freedom Wealth offers trusted guidance for complete financial protection.",
      canonicalUrl:
        "https://www.wcfw.in/services/life-insurance",
      robotsTag: "index, follow",
    }
  );

  const hardcodedInsuranceTypes = [
    {
      icon: FaShieldAlt,
      title: "Term Life Protection",
      description:
        "Pure institutional protection offering high-sum assured at minimal cost.",
      coverage: "₹1 Crore - ₹10 Crore+",
      color: "from-blue-600 to-blue-800",
    },
    {
      icon: FaHeart,
      title: "Critical Illness Shield",
      description:
        "Comprehensive medical coverage for high-burn life events and surgeries.",
      coverage: "₹5 Lakh - ₹1 Crore",
      color: "from-orange-500 to-orange-700",
    },
    {
      icon: FaGem,
      title: "Hybrid Wealth Solutions",
      description:
        "Dynamic capital growth coupled with sovereign-grade life protection.",
      coverage: "Customizable",
      color: "from-slate-600 to-slate-800",
    },
  ];

  const cmsInsuranceMatrix = cmsContent["insurance-matrix"]?.list || [
    {
      title: "Term Life Protection",
      description:
        "Pure institutional protection offering high-sum assured at minimal cost.",
      coverage: "₹1 Crore - ₹10 Crore+",
    },
    {
      title: "Critical Illness Shield",
      description:
        "Comprehensive medical coverage for high-burn life events and surgeries.",
      coverage: "₹5 Lakh - ₹1 Crore",
    },
    {
      title: "Hybrid Wealth Solutions",
      description:
        "Dynamic capital growth coupled with sovereign-grade life protection.",
      coverage: "Customizable",
    },
  ];

  const insuranceTypes = cmsInsuranceMatrix.map((type, index) => ({
    ...type,
    icon: hardcodedInsuranceTypes[index]?.icon || FaShieldAlt,
    color: hardcodedInsuranceTypes[index]?.color || "from-blue-600 to-blue-800",
  }));

  const benefits = cmsContent["value-section"]?.benefits || [
    "Sovereign-grade financial security for beneficiaries",
    "Optimized tax shields under Section 80C & 10(10D)",
    "Psychological sovereignty through crisis readiness",
    "Institutional-grade premiums for elite-level coverage",
    "Integrated critical illness and accidental riders",
    "Maturity-based capital recovery in specific mandates",
  ];

  const whyImportant = cmsContent["rationale"]?.list || [
    {
      title: "Income Recovery",
      description:
        "Ensures systemic stability during primary earner transitions.",
    },
    {
      title: "Debt Liquidation",
      description:
        "Proactive shielding against outstanding fiscal liabilities.",
    },
    {
      title: "Legacy Preservation",
      description: "Achieving multi-generational goal fulfillment protocols.",
    },
    {
      title: "Retirement Yield",
      description: "Structured pension-equivalent benefits in later cycles.",
    },
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
                    __html:
                      cmsContent["hero"]?.badge || "Risk Management Protocol",
                  }}
                />
              </div>

              <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl text-slate-900">
                {cmsContent["hero"]?.title ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: cmsContent["hero"].title.replace(
                        /Protection\./g,
                        '<span class="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-800">Protection.</span>',
                      ),
                    }}
                  />
                ) : (
                  <>
                    Legacy <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-800">
                      Protection.
                    </span>
                  </>
                )}
              </h1>

              <div
                className="max-w-2xl mx-auto text-base font-medium leading-relaxed lg:mx-0 sm:text-lg text-slate-600 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["hero"]?.description ||
                    "Engineering resilience. We architect comprehensive insurance frameworks designed to safeguard your family's financial sovereignty against life's unpredictable volatilities.",
                }}
              />

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-5 mt-8 lg:justify-start sm:gap-8 sm:mt-12">
                {(
                  cmsContent["hero"]?.stats || [
                    { val: "₹1Cr+", label: "Base Sum Assured" },
                    { val: "20+", label: "Solution Architectures" },
                    { val: "100%", label: "Settlement Focus" },
                  ]
                ).map((stat, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col">
                      <span
                        className={`${i % 2 === 0 ? "text-orange-600" : "text-slate-900"
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
                  value: "₹1Cr+",
                  label: "Protection Cover",
                },
                {
                  icon: FaHeart,
                  value: "Health+",
                  label: "Critical Shield",
                },
                {
                  icon: FaGem,
                  value: "Custom",
                  label: "Wealth Plans",
                },
                {
                  icon: FaUserShield,
                  value: "Trusted",
                  label: "Claim Guidance",
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
                        /Generational Assets/g,
                        '<span class="text-orange-600">Generational Assets</span>',
                      ),
                    }}
                  />
                ) : (
                  <>
                    Safeguarding{" "}
                    <span className="text-orange-600">Generational Assets</span>
                  </>
                )}
              </h2>
              <div
                className="mb-6 text-base font-medium leading-relaxed sm:text-lg text-slate-600 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["value-section"]?.description ||
                    "Life insurance is the primary pillar of a robust wealth mandate. It ensures that your architectural goals for your family remain intact, regardless of personal absence.",
                }}
              />
              <div
                className="mb-8 text-base font-medium leading-relaxed sm:text-lg text-slate-600 sm:mb-10 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["value-section"]?.secondary_text ||
                    "We utilize high-alpha protection strategies that maximize coverage-to-premium ratios, ensuring your capital is efficiently deployed for both safety and growth.",
                }}
              />
              <div className="p-6 border-l-4 border-orange-500 shadow-sm bg-orange-50 sm:p-8 rounded-r-2xl sm:rounded-r-3xl">
                <h4 className="flex items-center mb-3 font-bold text-slate-900">
                  <FaUserShield className="mr-2 text-orange-600" /> Strategic
                  Insight
                </h4>
                <div
                  className="text-sm font-medium leading-relaxed text-slate-500 cms-content"
                  dangerouslySetInnerHTML={{
                    __html:
                      cmsContent["value-section"]?.insight_text ||
                      "Adequate term protection should represent at least 15-20x of your annual burn rate to ensure true income replacement.",
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
                Risk Mandates
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Spectrum */}
      <section className="py-24 bg-slate-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h3 className="mb-4 text-xs font-extrabold tracking-widest text-orange-600 uppercase">
              Protection Matrix
            </h3>
            <div
              className="text-4xl font-black text-slate-900 cms-content"
              dangerouslySetInnerHTML={{
                __html:
                  cmsContent["insurance-matrix"]?.title ||
                  "Insurance Architecture",
              }}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {insuranceTypes.map((type, index) => (
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
                  <type.icon className="text-2xl text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-black text-slate-900">
                  {type.title}
                </h3>
                <p className="mb-8 font-medium leading-relaxed text-slate-500">
                  {type.description}
                </p>
                <div className="pt-8 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-slate-400">Sum Assured Target</span>
                  <span className="font-black text-orange-600">
                    {type.coverage}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Logical Rationale */}
      <section className="py-24 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h3 className="mb-4 text-xs font-extrabold tracking-widest text-orange-600 uppercase">
              Systemic Value
            </h3>
            <div
              className="text-4xl font-black text-slate-900 cms-content"
              dangerouslySetInnerHTML={{
                __html:
                  cmsContent["rationale"]?.title || "The Protection Rationale",
              }}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyImportant.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-[2rem] p-8 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 text-center"
              >
                <h3 className="mb-4 text-lg font-black text-slate-900">
                  {reason.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-slate-500">
                  {reason.description}
                </p>
              </motion.div>
            ))}
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
              <FaUmbrella className="mx-auto mb-6 text-4xl sm:text-6xl sm:mb-8 text-white/90" />
              <div
                className="mb-6 text-3xl font-black leading-tight sm:text-5xl sm:mb-8 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["cta"]?.title || "Execute Protection Mandate",
                }}
              />
              <div
                className="max-w-2xl mx-auto mb-8 text-base font-medium sm:text-xl sm:mb-12 text-white/90 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["cta"]?.description ||
                    "Secure your family's future with institutional-grade coverage. Our desks will audit your current protection gap.",
                }}
              />
              <Link
                to={cmsContent["cta"]?.ctaLink || "/contact"}
                className="inline-flex items-center px-8 py-4 text-sm font-black text-orange-600 transition-all transform bg-white shadow-2xl sm:py-5 sm:px-12 rounded-xl sm:rounded-2xl hover:bg-slate-50 hover:scale-105 sm:text-base"
              >
                <span
                  className="inline-block cms-content"
                  dangerouslySetInnerHTML={{
                    __html:
                      cmsContent["cta"]?.ctaText || "Contact Protection Desk",
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

export default LifeInsurance;
