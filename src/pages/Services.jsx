import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChartPie,
  FaChartLine,
  FaUmbrella,
  FaBullseye,
  FaLandmark,
  FaArrowRight,
  FaCogs,
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaLightbulb,
  FaSearch,
  FaClipboardList,
  FaUserTie,
  FaRocket,
  FaQuestionCircle,
  FaChevronDown,
} from "react-icons/fa";

import goalBasedImg from "../assets/images/services/goal-based-investing.png";
import mutualFundsImg from "../assets/images/services/mutual-funds.png";
import stocksImg from "../assets/images/services/stocks.png";
import fixedDepositsImg from "../assets/images/services/fixed-deposits.png";
import taxSolutionImg from "../assets/images/services/tax-solution.png";
import lifeInsuranceImg from "../assets/images/services/life-insurance.png";

import useCMSContent from "../hooks/useCMSContent";
import useMetaTags from "../hooks/useMetaTags";

const Services = () => {
  const { cmsContent } = useCMSContent("services");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  // SEO Hook
  useMetaTags(
    cmsContent["_seo"] || {
      title: "Our Services | We Care Freedom Wealth",
      description:
        "Explore our range of financial services including Mutual Funds, Stocks, and Insurance.",
      robotsTag: "index, follow",
    },
  );

  const categories = ["All", "Growth", "Protection", "Stability", "Tax"];

  const services = [
    {
      title: "Goal Based Investing",
      category: "Stability",
      icon: FaBullseye,
      image: goalBasedImg,
      description:
        "Align your investments with your financial goals and time horizon through suitable mutual fund options.",
      howWeHelp:
        "We help you align investments with financial goals such as education, retirement, and other needs through disciplined investing.",
      gradient: "from-orange-500 to-red-600",
      link: "/services/goal-base-investing",
      features: [
        "Goal Mapping",
        "Timeline Alignment",
        "Progress Tracking",
        "Rebalancing",
      ],
    },
    {
      title: "Mutual Funds",
      category: "Growth",
      icon: FaChartLine,
      image: mutualFundsImg,
      description:
        "Long-term investing through disciplined systematic investment plans and diversified mutual fund options.",
      howWeHelp:
        "With over 35 years of experience, we select mutual fund schemes based on defined parameters and consistency. We ensure you stay disciplined during market volatility.",
      gradient: "from-blue-500 to-indigo-600",
      link: "/services/mutual-fund",
      features: [
        "Scheme Selection",
        "SIP Strategies",
        "Tax Efficiency",
        "Diversification",
      ],
    },
    {
      title: "Direct Equities",
      category: "Growth",
      icon: FaChartPie,
      image: stocksImg,
      description:
        "Direct equity investments based on market information and research insights.",
      howWeHelp:
        "We facilitate access to equity investments based on available market data. Our focus is on fundamentally strong companies and emerging sectors, helping you build a direct ownership stake in the Indian growth story.",
      gradient: "from-green-500 to-emerald-600",
      link: "/services/stocks",
      features: [
        "Fundamental Analysis",
        "Sector Focus",
        "Risk Control",
        "Growth Play",
      ],
    },
    {
      title: "Life Insurance",
      category: "Protection",
      icon: FaUmbrella,
      image: lifeInsuranceImg,
      description:
        "Protecting what matters most. Comprehensive risk coverage solutions for family security.",
      howWeHelp:
        "Insurance is a foundation, not just an investment. We assess coverage needs based on financial responsibilities, ensuring you're protected without over-paying.",
      gradient: "from-red-500 to-rose-600",
      link: "/services/life-insurance",
      features: [
        "Coverage Need Assessment",
        "Term Insurance Options",
        "Family Security",
        "Optimal Cover",
      ],
    },
    {
      title: "Fixed Income",
      category: "Stability",
      icon: FaLandmark,
      image: fixedDepositsImg,
      description:
        "Fixed income options for capital stability based on issuer terms and conditions.",
      howWeHelp:
        "We select AAA-rated deposits that offer fixed returns as per issuer terms, subject to associated conditions. Ideal for short-term targets or emergency corpus.",
      gradient: "from-yellow-400 to-orange-500",
      link: "/services/fixed-deposit",
      features: [
        "Issuer Rating Based",
        "Capital Safety",
        "Fixed Returns",
        "High Liquidity",
      ],
    },
    {
      title: "Tax Solution",
      category: "Tax",
      icon: FaFileInvoiceDollar,
      image: taxSolutionImg,
      description: "Tax-saving options available under applicable laws.",
      howWeHelp:
        "Tax-saving investments can support overall financial goals. We identify ELSS, insurance, and other 80C/80D opportunities that help in tax saving while aligning with financial goals.",
      gradient: "from-purple-500 to-violet-600",
      link: "/services/tax-solution",
      features: [
        "Tax Saving Options",
        "Tax-Loss Harvesting",
        "Efficiency Audits",
        "Tax Options",
      ],
    },
  ];

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      activeCategory === "All" || service.category === activeCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const faqs = [
    {
      question: "How do you select the suitable investment schemes?",
      answer:
        "We use a defined internal selection process that analyzes rolling returns, downside capture, and fund manager pedigree across 2,500+ schemes.",
    },
    {
      question: "Is there a minimum investment to start?",
      answer:
        "We cater to all spectrums. Whether you are starting with a ₹5,000 SIP or a ₹5 Crore portfolio, we have specialized tranches designed for your specific scale.",
    },
    {
      question: "How often do you review my portfolio?",
      answer:
        "We conduct tactical reviews every quarter and semi-annual strategic audits. However, our investments are periodically reviewed for trigger events.",
    },
  ];

  const workflow = [
    {
      icon: FaSearch,
      title: "Deep Discovery",
      desc: "We understand your financial situation and risk preference.",
    },
    {
      icon: FaClipboardList,
      title: "Strategic Audit",
      desc: "Review of your financial goals and current investments.",
    },
    {
      icon: FaUserTie,
      title: "Elite Execution",
      desc: "Execution through available investment platforms.",
    },
    {
      icon: FaRocket,
      title: "Velocity Check",
      desc: "Periodic review and updates based on investment performance.",
    },
  ];

  return (
    <div className="bg-[#f8fafc]">
      {/* Cinematic Header */}
      <section
        className="relative min-h-[min(60vh,540px)] flex items-center overflow-hidden pt-24 pb-12 sm:pt-20 sm:pb-32"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #ffe5bd 0%, #fffdf7 35%, #c7f1ff 100%)",
        }}
      >
        <div className="relative z-10 w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 mb-8 space-x-3 border rounded-full bg-orange-500/10 backdrop-blur-md border-orange-500/20">
                <FaCogs className="text-sm text-orange-600" />
                <div
                  className="text-orange-900 font-bold text-xs uppercase tracking-[0.2em]"
                  dangerouslySetInnerHTML={{
                    __html: cmsContent["hero"]?.badge || "Our Methodology",
                  }}
                />
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
                {cmsContent["hero"]?.title ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: cmsContent["hero"].title.replace(
                        /Services\./g,
                        '<span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Services.</span>',
                      ),
                    }}
                  />
                ) : (
                  <>
                    Precision <br />{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                      Services.
                    </span>
                  </>
                )}
              </h1>
              <div
                className="max-w-xl mb-12 text-lg font-medium leading-relaxed md:text-xl text-slate-700"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["hero"]?.description ||
                    "We offer investment-related services and solutions to support your financial goals through suitable options.",
                }}
              />

              {/* Search Implementation */}
              <div className="relative max-w-md">
                <FaSearch className="absolute -translate-y-1/2 left-5 top-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 pr-6 font-medium transition-all border shadow-xl outline-none pl-14 bg-white/80 backdrop-blur-md border-slate-200 rounded-3xl focus:ring-2 ring-orange-500/20 text-slate-800"
                />
              </div>
            </motion.div>

            <div className="hidden grid-cols-2 gap-6 lg:grid">
              {workflow.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="bg-white/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/40 shadow-xl hover:shadow-2xl hover:bg-white transition-all group"
                >
                  <div className="flex items-center justify-center w-12 h-12 mb-6 text-orange-500 transition-transform bg-slate-900 rounded-2xl group-hover:scale-110">
                    <item.icon />
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-xs font-semibold leading-relaxed text-slate-500">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Services Section */}
      <section className="relative z-20 py-24 -mt-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Category Filter - Mobile Scrollable */}
          <div className="flex justify-center px-4 py-4 mb-16 overflow-x-auto no-scrollbar">
            <div className="flex items-center p-2 space-x-1 border rounded-full shadow-2xl bg-white/80 backdrop-blur-md border-slate-200 sm:space-x-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all uppercase tracking-widest ${
                    activeCategory === cat
                      ? "bg-slate-900 text-white shadow-xl"
                      : "text-slate-500 hover:text-orange-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid with AnimatePresence */}
          <motion.div
            layout
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => (
                <motion.div
                  layout
                  key={service.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60"></div>
                    <div
                      className={`absolute top-6 right-6 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all`}
                    >
                      <service.icon
                        className={`text-2xl bg-gradient-to-br ${service.gradient} bg-clip-text text-transparent`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-10">
                    <div className="flex items-center mb-4 space-x-2">
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">
                        {service.category}
                      </span>
                    </div>
                    <h3 className="mb-4 text-2xl font-black leading-tight tracking-tight uppercase text-slate-900">
                      {service.title}
                    </h3>
                    <p className="flex-1 mb-8 text-sm italic font-medium leading-relaxed text-slate-500 line-clamp-3">
                      "{service.description}"
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-10">
                      {service.features.map((f, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <FaCheckCircle className="text-green-500 text-[10px] shrink-0" />
                          <span className="text-[10px] font-bold text-slate-700 uppercase tracking-tight">
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={service.link}
                      className={`w-full py-5 rounded-2xl bg-gradient-to-r ${service.gradient} text-white font-black text-center text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all flex items-center justify-center group/btn`}
                    >
                      View Details
                      <FaArrowRight className="ml-3 transition-transform group-hover/btn:translate-x-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredServices.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[3rem] shadow-xl border-2 border-dashed border-slate-200">
              <FaSearch className="mx-auto mb-6 text-6xl text-slate-200" />
              <h3 className="text-xl font-bold text-slate-400">
                No matching solutions found...
              </h3>
            </div>
          )}
        </div>
      </section>

      {/* New Section: Why We Are Different */}
      <section className="relative py-24 overflow-hidden bg-slate-900">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-4xl font-black tracking-tighter text-white uppercase sm:text-6xl">
              {cmsContent["edge-section"]?.title || (
                <>
                  The WCFW <span className="text-orange-500">Edge</span>
                </>
              )}
            </h2>
            <div
              className="max-w-2xl mx-auto text-xl text-slate-400"
              dangerouslySetInnerHTML={{
                __html:
                  cmsContent["edge-section"]?.description ||
                  "Beyond numbers, we focus on disciplined investing behavior.",
              }}
            />
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            {[
              {
                title: "Institutional DNA",
                desc: "We deploy the same analytical rigor used by sovereign wealth funds for your investment portfolio.",
              },
              {
                title: "Behavioral Coaching",
                desc: "Investing is 20% math and 80% behavior. We support disciplined investing during market fluctuations.",
              },
              {
                title: "Multi-Generational",
                desc: "We support long-term investing across different life stages. Our strategies bridge decades of wealth transfer.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-10 bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-1 mb-8 transition-all bg-orange-500 rounded-full red group-hover:w-24"></div>
                <h4 className="mb-4 text-2xl font-black tracking-tight text-white uppercase">
                  {item.title}
                </h4>
                <p className="font-medium leading-relaxed text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <FaQuestionCircle className="mx-auto mb-6 text-4xl text-orange-600" />
            <h2 className="text-3xl font-black tracking-tighter uppercase sm:text-5xl text-slate-900">
              {cmsContent["faq-section"]?.title || (
                <>
                  Clarifying{" "}
                  <span className="text-orange-600">Complexities</span>
                </>
              )}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="overflow-hidden bg-white border shadow-lg rounded-3xl border-slate-100"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full px-8 py-6 text-left group"
                >
                  <span className="text-lg font-black tracking-tight uppercase transition-colors text-slate-900 group-hover:text-orange-600">
                    {faq.question}
                  </span>
                  <FaChevronDown
                    className={`text-slate-400 transition-transform duration-300 ${openFaq === i ? "rotate-180 text-orange-600" : ""}`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === i ? "auto" : 0,
                    opacity: openFaq === i ? 1 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <p className="px-8 pt-6 pb-8 font-medium leading-relaxed border-t text-slate-500 border-slate-50">
                    {faq.answer}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating CTA */}
      <section className="px-4 py-24 sm:px-0">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[4rem] p-12 sm:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,0.15),_transparent_70%)]"></div>
          <div className="relative z-10">
            <FaLightbulb className="mx-auto mb-10 text-6xl text-orange-500" />
            <h2 className="mb-8 text-4xl font-black leading-tight tracking-tighter uppercase sm:text-6xl">
              {cmsContent["cta-section"]?.title || (
                <>
                  Start Your <span className="text-orange-500">Investment</span>{" "}
                  Journey
                </>
              )}
            </h2>
            <div
              className="max-w-2xl mx-auto mb-12 text-xl leading-relaxed text-slate-400"
              dangerouslySetInnerHTML={{
                __html:
                  cmsContent["cta-section"]?.description ||
                  "Start investing with suitable options aligned to your financial goals.",
              }}
            />
            <Link
              to="/contact"
              className="inline-flex items-center px-12 py-6 text-sm font-black tracking-widest text-white uppercase transition-all transform bg-orange-600 shadow-2xl rounded-3xl hover:bg-orange-500 hover:scale-105 group"
            >
              Get Started
              <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
