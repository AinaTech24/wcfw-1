import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaUserAlt,
  FaChevronDown,
  FaBullseye,
  FaChartLine,
  FaChartPie,
  FaUmbrella,
  FaLandmark,
  FaFileInvoiceDollar,
  FaHistory,
  FaBookOpen,
  FaLightbulb,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
import useCMSContent from "../hooks/useCMSContent";
import logo from "../assets/logo.png";

// Import About Images
import legacyImg from "../assets/images/about/legacy.png";
import storyImg from "../assets/images/about/story.png";
import missionImg from "../assets/images/about/mission.png";
import teamImg from "../assets/images/about/team.jpg";

// Import Service Images for Mega Menu
import goalBasedImg from "../assets/images/services/goal-based-investing.png";
import mutualFundsImg from "../assets/images/services/mutual-funds.png";
import stocksImg from "../assets/images/services/stocks.png";
import fixedDepositsImg from "../assets/images/services/fixed-deposits.png";
import taxSolutionImg from "../assets/images/services/tax-solution.png";
import lifeInsuranceImg from "../assets/images/services/life-insurance.png";

// Import CTA Button Component
import CTAButton from "./CTAButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showKnowledgeDropdown, setShowKnowledgeDropdown] = useState(false);
  const [showMobileAboutDropdown, setShowMobileAboutDropdown] = useState(false);
  const [showMobileServicesDropdown, setShowMobileServicesDropdown] =
    useState(false);
  const [showMobileKnowledgeDropdown, setShowMobileKnowledgeDropdown] =
    useState(false);
  const location = useLocation();

  const closeAllDesktopDropdowns = () => {
    setShowAboutDropdown(false);
    setShowServicesDropdown(false);
    setShowKnowledgeDropdown(false);
  };

  const openDropdown = (menu) => {
    if (menu === "about") {
      setShowAboutDropdown(true);
      setShowServicesDropdown(false);
      setShowKnowledgeDropdown(false);
    }

    if (menu === "services") {
      setShowAboutDropdown(false);
      setShowServicesDropdown(true);
      setShowKnowledgeDropdown(false);
    }

    if (menu === "knowledge") {
      setShowAboutDropdown(false);
      setShowServicesDropdown(false);
      setShowKnowledgeDropdown(true);
    }
  };

  const megaMenuAnimation = {
    initial: {
      opacity: 0,
      y: 10,
      scale: 0.985,
    },

    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.34,
        ease: [0.16, 1, 0.3, 1],
      },
    },

    exit: {
      opacity: 0,
      y: 8,
      scale: 0.985,
      transition: {
        duration: 0.24,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const mobileDropdownAnimation = {
    initial: { opacity: 0, height: 0, y: -8 },
    animate: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        height: { duration: 0.28 },
        opacity: { duration: 0.2 },
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -8,
      transition: {
        height: { duration: 0.22 },
        opacity: { duration: 0.18 },
      },
    },
  };

  const { cmsContent: headerContent } = useCMSContent("header");
  const mainHeader = headerContent?.["main"] || {};

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isAnyOpen =
      showAboutDropdown || showServicesDropdown || showKnowledgeDropdown;

    if (!isAnyOpen) return;

    let closeTimer;

    const handleOutside = (e) => {
      if (!e.target.closest(".desktop-nav-wrap")) {
        closeTimer = setTimeout(closeAllDesktopDropdowns, 120);
      }
    };

    const handleWheel = (e) => {
      if (!e.target.closest(".desktop-nav-wrap")) {
        closeTimer = setTimeout(closeAllDesktopDropdowns, 120);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      clearTimeout(closeTimer);
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("wheel", handleWheel);
    };
  }, [showAboutDropdown, showServicesDropdown, showKnowledgeDropdown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about", hasDropdown: true },
    { name: "Services", path: "/services", hasDropdown: true },
    { name: "Calculators", path: "/calculators" },
    { name: "Knowledge Hub", path: "/knowledge-hub", hasDropdown: true },
    { name: "Contact Us", path: "/contact" },
  ];

  // About Us dropdown sections - redesigned for premium feel
  const aboutSections = [
    {
      name: "Our Legacy",
      path: "/about#our-legacy",
      icon: FaHistory,
      image: legacyImg,
      desc: "Built on decades of financial wisdom",
      color: "text-orange-600",
    },
    {
      name: "Our Story",
      path: "/about#our-story",
      icon: FaBookOpen,
      image: storyImg,
      desc: "The evolution of wealth advisory",
      color: "text-blue-600",
    },
    {
      name: "Mission & Vision",
      path: "/about#mission-vision",
      icon: FaLightbulb,
      image: missionImg,
      desc: "Architecting the future of independence",
      color: "text-purple-600",
    },
    {
      name: "Our Team",
      path: "/about#our-team",
      icon: FaUsers,
      image: teamImg,
      desc: "Meet the minds behind your wealth",
      color: "text-green-600",
    },
  ];

  const serviceSections = [
    {
      name: "Goal Based Investing",
      path: "/services/goal-base-investing",
      icon: FaBullseye,
      image: goalBasedImg,
      desc: "Scientific mapping of life milestones",
      metric: "Target Success Solution",
      color: "text-orange-600",
    },
    {
      name: "Mutual Funds",
      path: "/services/mutual-fund",
      icon: FaChartLine,
      image: mutualFundsImg,
      desc: "Alpha-seeking curated portfolios",
      metric: "Top 5% Schemes",
      color: "text-blue-600",
    },
    {
      name: "Direct Equities",
      path: "/services/stocks",
      icon: FaChartPie,
      image: stocksImg,
      desc: "Advisor-guided equity exposure",
      metric: "Research Backed",
      color: "text-green-600",
    },
    {
      name: "Life Insurance",
      path: "/services/life-insurance",
      icon: FaUmbrella,
      image: lifeInsuranceImg,
      desc: "Human Life Value protection tranches",
      metric: "Maximum HLV",
      color: "text-red-600",
    },
    {
      name: "Fixed Income",
      path: "/services/fixed-deposit",
      icon: FaLandmark,
      image: fixedDepositsImg,
      desc: "Strategic capital preservation models",
      metric: "AAA Insured",
      color: "text-amber-600",
    },
    {
      name: "Tax Solution",
      path: "/services/tax-solution",
      icon: FaFileInvoiceDollar,
      image: taxSolutionImg,
      desc: "Optimization of net-take-home income",
      metric: "Efficiency Audit",
      color: "text-purple-600",
    },
  ];

  const knowledgeSections = [
    {
      name: "Newsletter",
      path: "/newsletter",
      icon: FaBookOpen,
      image: legacyImg,
      desc: "Institutional Analysis & Daily Pulse",
    },
    {
      name: "Insights Blog",
      path: "/blog",
      icon: FaLightbulb,
      image: storyImg,
      desc: "Strategic Research & Wisdom",
    },
  ];

  const Logo = () => (
    <Link
      to="/"
      className="flex items-center outline-none group"
      onClick={(e) => {
        if (location.pathname === "/") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    >
      <div className="relative overflow-hidden">
        <img
          src={logo}
          alt={mainHeader.logoAlt || "WCFW Logo"}
          className="object-contain w-40 h-10 transition-transform duration-500 sm:w-56 sm:h-14"
        />
      </div>
    </Link>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1) py-2"
          : "bg-white py-3 sm:py-4"
      }`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Nav */}
          <div
            className="items-center hidden space-x-1 desktop-nav-wrap lg:flex"
            onMouseLeave={() => {
              setTimeout(closeAllDesktopDropdowns, 120);
            }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div
                  onMouseEnter={() => {
                    if (item.name === "About Us") openDropdown("about");
                    if (item.name === "Services") openDropdown("services");
                    if (item.name === "Knowledge Hub")
                      openDropdown("knowledge");
                  }}
                  className={`relative px-4 py-2 text-sm font-bold tracking-tight transition-all duration-300 group flex items-center cursor-pointer ${
                    location.pathname === item.path ||
                    (item.name === "Calculators" &&
                      location.pathname.startsWith("/calculator")) ||
                    (item.name === "Knowledge Hub" &&
                      (location.pathname === "/blog" ||
                        location.pathname === "/newsletter"))
                      ? "text-orange-600"
                      : "text-slate-700 hover:text-orange-500"
                  }`}
                >
                  {item.hasDropdown ? (
                    <span className="flex items-center">
                      {item.name}
                      <FaChevronDown
                        className={`ml-1 text-xs transition-transform duration-300 ${(item.name === "About Us" && showAboutDropdown) || (item.name === "Services" && showServicesDropdown) || (item.name === "Knowledge Hub" && showKnowledgeDropdown) ? "rotate-180" : ""}`}
                      />
                    </span>
                  ) : (
                    <Link to={item.path} className="outline-none">
                      {item.name}
                    </Link>
                  )}
                  {/* Underline Animation */}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-0.5 bg-orange-500 transform origin-left transition-transform duration-300 ${
                      location.pathname === item.path ||
                      (item.name === "Calculators" &&
                        location.pathname.startsWith("/calculator")) ||
                      (item.name === "Knowledge Hub" &&
                        (location.pathname === "/blog" ||
                          location.pathname.startsWith("/blog/") ||
                          location.pathname === "/newsletter"))
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </div>

                {/* Overlay for closing dropdowns when clicking outside */}
                {(showAboutDropdown ||
                  showServicesDropdown ||
                  showKnowledgeDropdown) && (
                  <div
                    className="fixed inset-0 z-[-1] cursor-default bg-orange-100/5 backdrop-blur-sm transition-opacity"
                    onClick={() => {
                      setShowAboutDropdown(false);
                      setShowServicesDropdown(false);
                      setShowKnowledgeDropdown(false);
                    }}
                  />
                )}

                {/* Dropdown Menu for About Us */}
                <AnimatePresence mode="wait">
                  {item.name === "About Us" && showAboutDropdown && (
                    <motion.div
                      variants={megaMenuAnimation}
                      onMouseEnter={() => {}}
                      onMouseLeave={() => closeAllDesktopDropdowns()}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      style={{ transformOrigin: "top center" }}
                      className="fixed top-28 left-0 right-0 mx-auto w-[95vw] max-w-7xl bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden z-[1001] p-10"
                    >
                      <div className="flex items-center justify-between px-4 mb-10">
                        <div className="flex items-center space-x-4">
                          <div className="w-1.5 h-8 bg-orange-500 rounded-full" />
                          <h3 className="text-2xl font-black tracking-tighter uppercase text-slate-900">
                            Corporate Identity
                          </h3>
                        </div>
                        <button
                          onClick={() => setShowAboutDropdown(false)}
                          className="p-2 transition-colors rounded-full hover:bg-slate-100 text-slate-400"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="grid grid-cols-6 gap-6">
                        {/* Empty space to center 4 items in a 6-column grid */}
                        <div className="hidden lg:block"></div>
                        {aboutSections.map((section, idx) => (
                          <Link
                            key={idx}
                            to={section.path}
                            onClick={() => {
                              setShowAboutDropdown(false);
                              // Scroll to section after navigation
                              setTimeout(() => {
                                const id = section.path.split("#")[1];
                                const element = document.getElementById(id);
                                if (element) {
                                  const offset = 120;
                                  const elementPosition =
                                    element.getBoundingClientRect().top;
                                  const offsetPosition =
                                    elementPosition +
                                    window.pageYOffset -
                                    offset;
                                  window.scrollTo({
                                    top: offsetPosition,
                                    behavior: "smooth",
                                  });
                                }
                              }, 100);
                            }}
                            className={`${idx === 0 ? "lg:col-start-2" : ""} group/item relative aspect-square rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-sm transition-all hover:shadow-2xl hover:border-orange-200 outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white`}
                          >
                            {/* Image */}
                            <img
                              src={section.image}
                              alt={section.name}
                              loading="lazy"
                              decoding="async"
                              className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 group-hover/item:scale-110"
                            />

                            {/* Rich Gradient Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

                            {/* Label */}
                            <div className="absolute inset-x-0 bottom-0 p-6 text-center transition-transform transform group-hover/item:-translate-y-1">
                              <div className="flex justify-center mb-3 transition-opacity opacity-80 group-hover/item:opacity-100">
                                <section.icon className="text-2xl text-white" />
                              </div>
                              <p className="font-black text-white text-[10px] uppercase tracking-widest leading-tight">
                                {section.name}
                              </p>
                            </div>

                            {/* Interactive Border Effect */}
                            <div className="absolute inset-0 border-4 border-orange-500/0 group-hover/item:border-orange-500/20 rounded-[2.5rem] transition-all" />
                          </Link>
                        ))}
                      </div>

                      <div className="flex items-center justify-between px-4 pt-8 mt-10 border-t border-slate-100">
                        <div className="flex items-center space-x-8">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                            We Care Freedom Wealth Pvt Ltd
                          </p>
                          <div className="w-px h-4 bg-slate-200" />
                          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center">
                            <span className="w-2 h-2 mr-2 bg-green-500 rounded-full animate-pulse" />
                            Institutional Integrity Verified
                          </p>
                        </div>
                        <Link
                          to="/about"
                          onClick={() => setShowAboutDropdown(false)}
                          className="text-[10px] flex items-center gap-1 font-black text-orange-600 uppercase tracking-widest hover:text-orange-700 transition-colors"
                        >
                          Explore Corporate Profile <FaArrowRight />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mega Menu for Services */}
                <AnimatePresence mode="wait">
                  {item.name === "Services" && showServicesDropdown && (
                    <motion.div
                      variants={megaMenuAnimation}
                      onMouseEnter={() => {}}
                      onMouseLeave={() => closeAllDesktopDropdowns()}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      style={{ transformOrigin: "top center" }}
                      className="fixed top-28 left-0 right-0 mx-auto w-[95vw] max-w-7xl bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden z-[1001] p-10"
                    >
                      <div className="flex items-center justify-between px-4 mb-10">
                        <div className="flex items-center space-x-4">
                          <div className="w-1.5 h-8 bg-orange-500 rounded-full" />
                          <h3 className="text-2xl font-black tracking-tighter uppercase text-slate-900">
                            Portfolio Tranches
                          </h3>
                        </div>
                        <button
                          onClick={() => setShowServicesDropdown(false)}
                          className="p-2 transition-colors rounded-full hover:bg-slate-100 text-slate-400"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="grid grid-cols-6 gap-6">
                        {serviceSections.map((section, idx) => (
                          <Link
                            key={idx}
                            to={section.path}
                            onClick={() => setShowServicesDropdown(false)}
                            className="group/item relative aspect-square rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-sm transition-all hover:shadow-2xl hover:border-orange-200 outline-none"
                          >
                            {/* Service Image */}
                            <img
                              src={section.image}
                              alt={section.name}
                              loading="lazy"
                              decoding="async"
                              className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 group-hover/item:scale-110"
                            />

                            {/* Rich Gradient Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

                            {/* Service Label */}
                            <div className="absolute inset-x-0 bottom-0 p-6 text-center transition-transform transform group-hover/item:-translate-y-1">
                              <div className="flex justify-center mb-3 transition-opacity opacity-80 group-hover/item:opacity-100">
                                <section.icon className="text-2xl text-white" />
                              </div>
                              <p className="font-black text-white text-[10px] uppercase tracking-widest leading-tight">
                                {section.name}
                              </p>
                            </div>

                            {/* Interactive Border Effect */}
                            <div className="absolute inset-0 border-4 border-orange-500/0 group-hover/item:border-orange-500/20 rounded-[2.5rem] transition-all" />
                          </Link>
                        ))}
                      </div>

                      <div className="flex items-center justify-between px-4 pt-8 mt-10 border-t border-slate-100">
                        <div className="flex items-center space-x-8">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                            We Care Freedom Wealth Pvt Ltd
                          </p>
                          <div className="w-px h-4 bg-slate-200" />
                          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center">
                            <span className="w-2 h-2 mr-2 bg-green-500 rounded-full animate-pulse" />
                            Secure Advisory Connectivity
                          </p>
                        </div>
                        <Link
                          to="/contact"
                          onClick={() => setShowServicesDropdown(false)}
                          className="text-[10px] flex items-center gap-1 font-black text-orange-600 uppercase tracking-widest hover:text-orange-700 transition-colors outline-none"
                        >
                          Initialize Consultation <FaArrowRight />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mega Menu for Knowledge Hub */}
                <AnimatePresence mode="wait">
                  {item.name === "Knowledge Hub" && showKnowledgeDropdown && (
                    <motion.div
                      variants={megaMenuAnimation}
                      onMouseEnter={() => {}}
                      onMouseLeave={() => closeAllDesktopDropdowns()}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      style={{ transformOrigin: "top center" }}
                      className="fixed top-28 left-0 right-0 mx-auto w-[95vw] max-w-7xl bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden z-[1001] p-10"
                    >
                      <div className="flex items-center justify-between px-4 mb-10">
                        <div className="flex items-center space-x-4">
                          <div className="w-1.5 h-8 bg-orange-500 rounded-full" />
                          <h3 className="text-2xl font-black tracking-tighter uppercase text-slate-900">
                            Knowledge Repository
                          </h3>
                        </div>
                        <button
                          onClick={() => setShowKnowledgeDropdown(false)}
                          className="p-2 transition-colors rounded-full hover:bg-slate-100 text-slate-400"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="grid grid-cols-6 gap-6">
                        {/* Empty space to center 2 items in a 6-column grid */}
                        <div className="lg:col-span-2"></div>

                        {knowledgeSections.map((section, idx) => (
                          <Link
                            key={idx}
                            to={section.path}
                            onClick={() => setShowKnowledgeDropdown(false)}
                            className="group/item relative aspect-square rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-sm transition-all hover:shadow-2xl hover:border-orange-200 outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white"
                          >
                            {/* Image */}
                            <img
                              src={section.image}
                              alt={section.name}
                              loading="lazy"
                              decoding="async"
                              className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 group-hover/item:scale-110"
                            />

                            {/* Rich Gradient Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

                            {/* Label */}
                            <div className="absolute inset-x-0 bottom-0 p-6 text-center transition-transform transform group-hover/item:-translate-y-1">
                              <div className="flex justify-center mb-3 transition-opacity opacity-80 group-hover/item:opacity-100">
                                <section.icon className="text-2xl text-white" />
                              </div>
                              <p className="font-black text-white text-[10px] uppercase tracking-widest leading-tight mb-1">
                                {section.name}
                              </p>
                              <p className="text-[8px] text-slate-300 font-bold uppercase tracking-wider opacity-0 group-hover/item:opacity-100 transition-opacity">
                                {section.desc}
                              </p>
                            </div>

                            {/* Interactive Border Effect */}
                            <div className="absolute inset-0 border-4 border-orange-500/0 group-hover/item:border-orange-500/20 rounded-[2.5rem] transition-all" />
                          </Link>
                        ))}
                      </div>

                      <div className="flex items-center justify-between px-4 pt-8 mt-10 border-t border-slate-100">
                        <div className="flex items-center space-x-8">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                            Intelligence Hub
                          </p>
                          <div className="w-px h-4 bg-slate-200" />
                          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center">
                            <span className="w-2 h-2 mr-2 bg-orange-500 rounded-full animate-pulse" />
                            Institutional Analysis
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="items-center hidden space-x-4 lg:flex">
            <CTAButton
              to={mainHeader.loginUrl || "https://login.wcfw.in/"}
              text={mainHeader.loginText || "Login"}
              icon={<FaUserAlt />}
              variant="primary"
              external
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 transition-all duration-300 lg:hidden rounded-xl text-slate-700 hover:text-orange-600 hover:bg-orange-50"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] lg:hidden"
            />
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 h-screen w-[280px] bg-white shadow-2xl z-[1001] flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <img
                  src={logo}
                  alt="WCFW Logo"
                  className="object-contain h-8"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-orange-500"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="flex-1 px-6 py-8 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={() => {
                            if (item.name === "About Us")
                              setShowMobileAboutDropdown(
                                !showMobileAboutDropdown,
                              );
                            if (item.name === "Services")
                              setShowMobileServicesDropdown(
                                !showMobileServicesDropdown,
                              );
                            if (item.name === "Knowledge Hub")
                              setShowMobileKnowledgeDropdown(
                                !showMobileKnowledgeDropdown,
                              );
                          }}
                          className={`w-full flex items-center justify-between py-3 px-4 rounded-xl text-lg font-bold transition-all ${
                            location.pathname === item.path ||
                            (item.name === "Calculators" &&
                              location.pathname.startsWith("/calculator")) ||
                            (item.name === "Knowledge Hub" &&
                              (location.pathname === "/blog" ||
                                location.pathname === "/newsletter"))
                              ? "bg-orange-50 text-orange-600"
                              : "text-slate-700 hover:bg-gray-50 hover:text-orange-500"
                          }`}
                        >
                          <span>{item.name}</span>
                          <FaChevronDown
                            className={`text-sm transition-transform duration-300 ${(item.name === "About Us" && showMobileAboutDropdown) || (item.name === "Services" && showMobileServicesDropdown) || (item.name === "Knowledge Hub" && showMobileKnowledgeDropdown) ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {item.name === "About Us" &&
                            showMobileAboutDropdown && (
                              <motion.div
                                variants={mobileDropdownAnimation}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="overflow-hidden"
                              >
                                <div className="mt-2 space-y-1">
                                  {aboutSections.map((section, idx) => (
                                    <Link
                                      key={idx}
                                      to={section.path}
                                      onClick={() => {
                                        setIsOpen(false);
                                        setShowMobileAboutDropdown(false);

                                        setTimeout(() => {
                                          const id = section.path.split("#")[1];
                                          const element =
                                            document.getElementById(id);

                                          if (element) {
                                            const offset = 120;
                                            const elementPosition =
                                              element.getBoundingClientRect()
                                                .top;
                                            const offsetPosition =
                                              elementPosition +
                                              window.pageYOffset -
                                              offset;

                                            window.scrollTo({
                                              top: offsetPosition,
                                              behavior: "smooth",
                                            });
                                          }
                                        }, 100);
                                      }}
                                      className="flex items-center px-4 py-3 ml-4 space-x-3 text-sm font-semibold transition-all rounded-lg text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                                    >
                                      <div
                                        className={`w-8 h-8 ${section.color} bg-slate-100 rounded-lg flex items-center justify-center shrink-0`}
                                      >
                                        <section.icon className="text-sm" />
                                      </div>

                                      <span>{section.name}</span>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                        </AnimatePresence>
                        <AnimatePresence initial={false}>
                          {item.name === "Services" &&
                            showMobileServicesDropdown && (
                              <motion.div
                                variants={mobileDropdownAnimation}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="overflow-hidden"
                              >
                                <div className="mt-2 space-y-1">
                                  {serviceSections.map((section, idx) => (
                                    <Link
                                      key={idx}
                                      to={section.path}
                                      onClick={() => {
                                        setIsOpen(false);
                                        setShowMobileServicesDropdown(false);
                                      }}
                                      className="flex items-center px-4 py-3 ml-4 space-x-3 text-sm font-semibold transition-all rounded-lg text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                                    >
                                      <div
                                        className={`w-8 h-8 ${section.color} bg-slate-100 rounded-lg flex items-center justify-center shrink-0`}
                                      >
                                        <section.icon className="text-sm" />
                                      </div>

                                      <span>{section.name}</span>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                        </AnimatePresence>
                        <AnimatePresence initial={false}>
                          {item.name === "Knowledge Hub" &&
                            showMobileKnowledgeDropdown && (
                              <motion.div
                                variants={mobileDropdownAnimation}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="overflow-hidden"
                              >
                                <div className="mt-2 space-y-1">
                                  <Link
                                    to="/newsletter"
                                    onClick={() => {
                                      setIsOpen(false);
                                      setShowMobileKnowledgeDropdown(false);
                                    }}
                                    className="flex items-center px-4 py-3 ml-4 space-x-3 text-sm font-semibold transition-all rounded-lg text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                                  >
                                    <div className="flex items-center justify-center w-8 h-8 text-orange-600 rounded-lg bg-slate-100 shrink-0">
                                      <FaBookOpen className="text-sm" />
                                    </div>

                                    <span>Newsletter</span>
                                  </Link>

                                  <Link
                                    to="/blog"
                                    onClick={() => {
                                      setIsOpen(false);
                                      setShowMobileKnowledgeDropdown(false);
                                    }}
                                    className="flex items-center px-4 py-3 ml-4 space-x-3 text-sm font-semibold transition-all rounded-lg text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                                  >
                                    <div className="flex items-center justify-center w-8 h-8 text-blue-600 rounded-lg bg-slate-100 shrink-0">
                                      <FaLightbulb className="text-sm" />
                                    </div>

                                    <span>Blog</span>
                                  </Link>
                                </div>
                              </motion.div>
                            )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block py-3 px-4 rounded-xl text-lg font-bold transition-all ${
                          location.pathname === item.path ||
                          (item.name === "Calculators" &&
                            location.pathname.startsWith("/calculator"))
                            ? "bg-orange-50 text-orange-600"
                            : "text-slate-700 hover:bg-gray-50 hover:text-orange-500"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-8 space-y-4 border-t border-gray-100">
                <CTAButton
                  href={mainHeader.loginUrl || "https://login.wcfw.in/"}
                  text={mainHeader.loginText || "Login"}
                  icon={<FaUserAlt />}
                  variant="primary"
                  external
                  fullWidth
                  className="w-full"
                />

                <p className="text-xs font-medium text-center text-slate-400">
                  {mainHeader.tagline || "Serving families since 1989"}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
