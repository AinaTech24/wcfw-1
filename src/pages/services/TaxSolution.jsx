import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaArrowRight,
  FaLightbulb,
  FaShieldAlt,
} from "react-icons/fa";

import useMetaTags from "../../hooks/useMetaTags";
import useCMSContent from "../../hooks/useCMSContent";

const TaxSolution = () => {
  const { cmsContent } = useCMSContent("tax-solution");

  useMetaTags(
    cmsContent["_seo"] || {
      title:
        "Tax Saving & Financial Planning Solutions | We Care Freedom Wealth",
      description:
        "Optimize your tax liabilities and maximize savings with expert tax-saving solutions and strategic financial planning from We Care Freedom Wealth.",
      robotsTag: "index, follow",
    },
  );

  const hardcodedOptions = [
    { color: "from-blue-600 to-blue-800" },
    { color: "from-orange-500 to-orange-700" },
    { color: "from-slate-600 to-slate-800" },
    { color: "from-red-600 to-red-800" },
  ];

  const cmsTaxInstruments = cmsContent["tax-instruments"]?.list || [
    {
      title: "Section 80C Protocols",
      description: "Deduction optimization up to ₹1.5 Lakh.",
      lockin: "3-15 Years",
      returns: "Market/Fixed",
    },
    {
      title: "Section 80D Health Shield",
      description: "Medical premium fiscal deductions.",
      lockin: "Annual",
      returns: "Tax Shield",
    },
    {
      title: "NPS Alpha (80CCD)",
      description: "Additional ₹50,000 retail deduction.",
      lockin: "Till Age 60",
      returns: "Market Linked",
    },
    {
      title: "Section 24(b) Leverage",
      description: "Home loan interest fiscal shields.",
      lockin: "Tenure",
      returns: "Tax Shield",
    },
  ];

  const taxSavingOptions = cmsTaxInstruments.map((opt, i) => ({
    ...opt,
    color: hardcodedOptions[i]?.color || "from-blue-600 to-blue-800",
  }));

  const benefits = cmsContent["value-section"]?.benefits || [
    "Systemic reduction of gross tax outflow",
    "Maximization of net investible take-home capital",
    "Seamless integration with wealth creation cycles",
    "Deterministic solution for high-value fiscal goals",
    "Optimized asset-location strategies",
    "Rigorous adherence to legislative frameworks",
  ];

  const services = cmsContent["optimization-process"]?.steps || [
    {
      step: "01",
      title: "Assurance & Filing",
      description:
        "Institutional-grade ITR audit and multi-source documentation.",
    },
    {
      step: "02",
      title: "Fiscal Optimization",
      description:
        "Strategic modelling to identify every possible deduction path.",
    },
    {
      step: "03",
      title: "Yield Architecture",
      description: "Aligning tax saves with high-CAGR growth vehicles.",
    },
    {
      step: "04",
      title: "Entity Compliance",
      description: "Ensuring end-to-end alignment with CBDT regulations.",
    },
  ];

  return (
    <div className="bg-white">
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
                    __html:
                      cmsContent["hero"]?.badge ||
                      "Fiscal Resource Optimization",
                  }}
                />
              </div>

              <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl text-slate-900">
                {cmsContent["hero"]?.title ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: cmsContent["hero"].title.replace(
                        /Sovereignty\./g,
                        '<span class="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-800">Sovereignty.</span>',
                      ),
                    }}
                  />
                ) : (
                  <>
                    Tax <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-800">
                      Sovereignty.
                    </span>
                  </>
                )}
              </h1>

              <div
                className="max-w-2xl mx-auto text-base font-medium leading-relaxed lg:mx-0 sm:text-lg text-slate-600 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["hero"]?.description ||
                    "Retain your wealth. We engineer strategic tax-saving mandates that legally minimize liabilities while accelerating your long-term capital accumulation.",
                }}
              />

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-5 mt-8 sm:mt-12 lg:justify-start sm:gap-8">
                {(
                  cmsContent["hero"]?.stats || [
                    { val: "₹1.5L+", label: "Base Deductions" },
                    { val: "30%", label: "Potential Tax Save" },
                    { val: "Tier-A", label: "Compliance Grade" },
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
                  icon: FaFileInvoiceDollar,
                  value: "₹1.5L+",
                  label: "80C Scope",
                },
                {
                  icon: FaShieldAlt,
                  value: "100%",
                  label: "Legal Framework",
                },
                {
                  icon: FaCheckCircle,
                  value: "Optimized",
                  label: "Tax Planning",
                },
                {
                  icon: FaLightbulb,
                  value: "Smart",
                  label: "Wealth Structuring",
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
                        /Fiscal Engineering/g,
                        '<span class="text-orange-600">Fiscal Engineering</span>',
                      ),
                    }}
                  />
                ) : (
                  <>
                    Professional{" "}
                    <span className="text-orange-600">Fiscal Engineering</span>
                  </>
                )}
              </h2>
              <div
                className="mb-6 text-base font-medium leading-relaxed sm:text-lg text-slate-600 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["value-section"]?.description ||
                    "Tax solution is the architectural analysis of your financial structure to ensure maximum fiscal efficiency. It is the legal pathway to minimizing liabilities and redeploying that capital into growth engines.",
                }}
              />
              <div
                className="mb-8 text-base font-medium leading-relaxed sm:text-lg text-slate-600 sm:mb-10 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["value-section"]?.secondary_text ||
                    "Our mandates focus on utilizing every available provision of the Income Tax Act to shield your earnings and maximize your net generational wealth.",
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
                      "Effective tax solution should initiate in April, not March. Strategic asset-location over 12 months improves IRR by up to 2.5%.",
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
                Fiscal Benefits
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

      <section className="py-24 bg-slate-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h3 className="mb-4 text-xs font-extrabold tracking-widest text-orange-600 uppercase">
              Deduction Spectrum
            </h3>
            <div
              className="text-4xl font-black text-slate-900 cms-content"
              dangerouslySetInnerHTML={{
                __html:
                  cmsContent["tax-instruments"]?.title ||
                  "Fiscal Shield Framework",
              }}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {taxSavingOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2.5rem] p-10 shadow-lg border border-slate-100 hover:shadow-2xl transition-all group"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <FaShieldAlt className="text-2xl text-white" />
                </div>
                <h3 className="mb-2 text-2xl font-black text-slate-900">
                  {option.title}
                </h3>
                <p className="mb-6 text-sm text-slate-600">
                  {option.description}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center p-3 space-x-3 border bg-slate-50 rounded-xl border-slate-100">
                    <FaCheckCircle className="text-xs text-orange-500 shrink-0" />
                    <p className="text-xs font-bold text-slate-600">
                      Lock-in: {option.lockin}
                    </p>
                  </div>
                  <div className="flex items-center p-3 space-x-3 border bg-slate-50 rounded-xl border-slate-100">
                    <FaCheckCircle className="text-xs text-orange-500 shrink-0" />
                    <p className="text-xs font-bold text-slate-600">
                      Returns: {option.returns}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h3 className="mb-4 text-xs font-extrabold tracking-widest text-orange-600 uppercase">
              Engagement Model
            </h3>
            <div
              className="text-4xl font-black text-slate-900 cms-content"
              dangerouslySetInnerHTML={{
                __html:
                  cmsContent["optimization-process"]?.title ||
                  "Tax Advisory Pillars",
              }}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-[2rem] p-8 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 text-center"
              >
                <h3 className="mb-4 text-lg font-black text-slate-900">
                  {service.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-slate-500">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white sm:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-[2rem] sm:rounded-[3rem] p-10 sm:p-20 text-white text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full w-96 h-96 bg-white/10 blur-3xl"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <FaFileInvoiceDollar className="mx-auto mb-6 text-4xl sm:text-6xl sm:mb-8 text-white/90" />
              <div
                className="mb-6 text-3xl font-black leading-tight sm:text-5xl sm:mb-8 cms-content"
                dangerouslySetInnerHTML={{
                  __html: cmsContent["cta"]?.title || "Initiate Fiscal Audit",
                }}
              />
              <div
                className="max-w-2xl mx-auto mb-8 text-base font-medium sm:text-xl sm:mb-12 text-white/90 cms-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["cta"]?.description ||
                    "Optimize your tax exposure. Schedule a consultation with our fiscal advisory desk.",
                }}
              />
              <Link
                to={cmsContent["cta"]?.ctaLink || "/contact"}
                className="inline-flex items-center px-8 py-4 text-sm font-black text-orange-600 transition-all transform bg-white shadow-2xl sm:py-5 sm:px-12 rounded-xl sm:rounded-2xl hover:bg-slate-50 hover:scale-105 sm:text-base"
              >
                <span
                  className="inline-block cms-content"
                  dangerouslySetInnerHTML={{
                    __html: cmsContent["cta"]?.ctaText || "Contact Tax Desk",
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

export default TaxSolution;
