import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalculator,
  FaChartLine,
  FaPiggyBank,
  FaGraduationCap,
  FaRing,
  FaUmbrella,
  FaHome,
  FaCar,
  FaPlane,
  FaExchangeAlt,
  FaFileInvoiceDollar,
  FaClock,
  FaSearch,
  FaStar,
  FaShieldAlt,
  FaArrowRight,
  FaToolbox,
} from "react-icons/fa";

const Calculators = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const calculators = [
    {
      name: "SIP Calculator",
      path: "/calculator/sip",
      icon: FaChartLine,
      description:
        "Estimate potential returns for SIP investments based on assumed rates of return.",
      color: "from-orange-500 to-yellow-500",
      category: "Investment",
      popular: true,
    },
    {
      name: "Lumpsum Calculator",
      path: "/calculator/lumpsum",
      icon: FaPiggyBank,
      description:
        "Estimate potential returns on one-time investments based on assumed returns.",
      color: "from-green-500 to-emerald-500",
      category: "Investment",
      popular: true,
    },
    {
      name: "SWP Calculator",
      path: "/calculator/swp",
      icon: FaExchangeAlt,
      description:
        "Systematic Withdrawal Plan calculator for estimating withdrawals",
      color: "from-blue-500 to-indigo-500",
      category: "Investment",
    },
    {
      name: "STP Calculator",
      path: "/calculator/stp",
      icon: FaExchangeAlt,
      description: "Systematic Transfer Plan calculator for fund transfers",
      color: "from-purple-500 to-pink-500",
      category: "Investment",
    },
    {
      name: "Retirement Calculator",
      path: "/calculator/retirement",
      icon: FaPiggyBank,
      description: "Estimate retirement corpus based on assumptions and inputs",
      color: "from-red-500 to-orange-500",
      category: "Solution",
      popular: true,
    },
    {
      name: "Delay Calculator",
      path: "/calculator/delay",
      icon: FaClock,
      description: "See the impact of delaying your investments",
      color: "from-gray-600 to-gray-800",
      category: "Investment",
    },
    {
      name: "Insurance Calculator",
      path: "/calculator/insurance",
      icon: FaUmbrella,
      description: "Estimate life insurance coverage requirements",
      color: "from-teal-500 to-cyan-500",
      category: "Solution",
    },
    {
      name: "EMI Calculator",
      path: "/calculator/emi",
      icon: FaCalculator,
      description:
        "Estimate your income tax liability based on applicable rules",
      color: "from-indigo-500 to-purple-500",
      category: "Loan",
      popular: true,
    },
    {
      name: "Tax Calculator",
      path: "/calculator/tax",
      icon: FaFileInvoiceDollar,
      description:
        "Estimate your income tax liability based on applicable rules",
      color: "from-green-600 to-teal-600",
      category: "Tax",
    },
    {
      name: "Marriage Calculator",
      path: "/calculator/marriage",
      icon: FaRing,
      description: "Estimate expenses and savings required for your wedding",
      color: "from-pink-500 to-rose-500",
      category: "Solution",
    },
    {
      name: "Education Calculator",
      path: "/calculator/education",
      icon: FaGraduationCap,
      description: "Estimate education expenses and required savings",
      color: "from-blue-600 to-cyan-600",
      category: "Solution",
    },
    {
      name: "Home Loan Calculator",
      path: "/calculator/home-loan",
      icon: FaHome,
      description: "Calculate home loan EMI and interest",
      color: "from-orange-600 to-red-600",
      category: "Loan",
    },
    {
      name: "Car Loan Calculator",
      path: "/calculator/car-loan",
      icon: FaCar,
      description: "Calculate car loan EMI and total cost",
      color: "from-slate-600 to-slate-800",
      category: "Loan",
    },
    {
      name: "Vacation Calculator",
      path: "/calculator/vacation",
      icon: FaPlane,
      description: "Estimate savings required for your vacation",
      color: "from-sky-400 to-blue-500",
      category: "Solution",
    },
  ];

  const categories = ["All", "Investment", "Solution", "Loan", "Tax"];
  const filteredCalculators = calculators.filter((calc) => {
    const matchesSearch =
      calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || calc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#f8fafc]">
      {/* Cinematic Light Header */}
      <section
        className="relative min-h-[50vh] lg:min-h-[90vh] flex items-center overflow-hidden pt-24 sm:pt-32 pb-12 sm:pb-20 mb-8 sm:mb-12"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #ffe5bd 0%, #fffdf7 35%, #c7f1ff 100%)",
        }}
      >
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_100%)]"></div>
        </div>

        <div className="relative z-10 w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 mb-8 space-x-3 border rounded-full bg-orange-500/10 backdrop-blur-md border-orange-500/20"
              >
                <FaToolbox className="text-sm text-orange-600" />
                <span className="text-orange-900 font-bold text-xs uppercase tracking-[0.2em]">
                  Precision Instruments
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 sm:mb-8">
                Financial <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                  Calculators.
                </span>
              </h1>

              <p className="max-w-xl mb-12 text-lg font-medium leading-relaxed md:text-xl text-slate-700">
                Tools to help you estimate and understand financial outcomes.
                Plan and review your financial goals with informed calculations.
              </p>

              <div className="flex flex-wrap gap-10">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-slate-900">
                    Estimation Tools
                  </span>
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    For Illustration
                  </span>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-orange-600">
                    14+
                  </span>
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    Specialized Tools
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="absolute w-64 h-64 rounded-full -top-10 -right-10 bg-orange-500/10 blur-3xl"></div>
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-12 rounded-[4rem] shadow-2xl relative z-10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-900 rounded-[2rem] text-center">
                    <FaChartLine className="mx-auto mb-4 text-3xl text-orange-500" />
                    <p className="font-black text-white">SIP</p>
                  </div>
                  <div className="p-6 bg-white/40 rounded-[2rem] text-center border border-white">
                    <FaPiggyBank className="mx-auto mb-4 text-3xl text-blue-600" />
                    <p className="font-black text-slate-900">Lumpsum</p>
                  </div>
                  <div className="p-6 bg-white/40 rounded-[2rem] text-center border border-white">
                    <FaShieldAlt className="mx-auto mb-4 text-3xl text-emerald-600" />
                    <p className="font-black text-slate-900">Retire</p>
                  </div>
                  <div className="p-6 bg-orange-600 rounded-[2rem] text-center shadow-lg shadow-orange-600/20">
                    <FaCalculator className="mx-auto mb-4 text-3xl text-white" />
                    <p className="font-black text-white">EMI</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative z-20 px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-20 lg:-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] p-6 sm:p-12 border border-slate-100 mb-12 sm:mb-20"
        >
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="text-center lg:col-span-3 lg:text-left">
              <h3 className="mb-1 text-xl font-black sm:text-2xl text-slate-900">
                Refine Search
              </h3>
              <p className="text-slate-500 text-[10px] sm:text-sm font-medium uppercase tracking-wider italic">
                Find a Calculator
              </p>
            </div>
            <div className="flex flex-col w-full gap-4 lg:col-span-9 sm:gap-6">
              {/* Desktop Row */}
              <div className="hidden w-full gap-6 sm:flex sm:flex-row md:flex-col lg:flex-row">
                {/* Search */}
                <div className="relative flex-1 group">
                  <FaSearch className="absolute transition-colors -translate-y-1/2 left-5 top-1/2 text-slate-400 group-hover:text-orange-500" />

                  <input
                    type="text"
                    placeholder="Identify calculator..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-[1.5rem] p-5 pl-14 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all font-bold text-slate-800 outline-none text-base"
                  />
                </div>

                {/* Categories */}
                <div className="flex bg-slate-50 p-2 rounded-[1.5rem] border border-slate-100 gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-8 py-3 rounded-2xl text-[10px] uppercase tracking-widest font-black whitespace-nowrap transition-all outline-none ${
                        activeCategory === cat
                          ? "bg-white text-orange-600 shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="flex flex-col w-full gap-4 sm:hidden">
                {/* Search */}
                <div className="relative w-full group">
                  <FaSearch className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-slate-400" />

                  <input
                    type="text"
                    placeholder="Identify calculator..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-4 text-sm font-bold border outline-none bg-slate-50 border-slate-100 rounded-2xl pl-11 text-slate-800"
                  />
                </div>

                {/* Wrapped Tabs */}
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full py-3 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all ${
                        activeCategory === cat
                          ? "bg-orange-500 text-white shadow-sm"
                          : "bg-slate-50 border border-slate-100 text-slate-500"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {filteredCalculators.map((calc, idx) => (
              <motion.div
                layout
                key={calc.path}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={calc.path}
                  className="group block bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 border border-slate-100 shadow-lg hover:shadow-2xl transition-all h-full relative overflow-hidden outline-none"
                >
                  {calc.popular && (
                    <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-black px-4 py-2 rounded-bl-3xl shadow-sm flex items-center">
                      <FaStar className="mr-2" /> CORE TOOL
                    </div>
                  )}

                  {/* Full card column layout */}
                  <div className="flex flex-col h-full">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${calc.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}
                    >
                      <calc.icon className="text-2xl text-white" />
                    </div>

                    <h3 className="mb-3 text-xl font-black tracking-tight uppercase transition-colors text-slate-900 group-hover:text-orange-600 min-h-[64px]">
                      {calc.name}
                    </h3>

                    <p className="text-xs font-medium leading-relaxed text-slate-500 mb-8 flex-grow min-h-[72px]">
                      {calc.description}
                    </p>

                    {/* Always pushed to bottom */}
                    <div className="flex items-center justify-between pt-6 mt-auto border-t border-slate-50">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        {calc.category}
                      </span>

                      <span className="flex items-center justify-center w-10 h-10 transition-all transform rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-orange-600 group-hover:text-white group-hover:translate-x-1">
                        <FaArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Calculators;
