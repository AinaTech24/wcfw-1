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
    const handleScrollClose = () => {
      closeAllDesktopDropdowns();
    };

    window.addEventListener("scroll", handleScrollClose);

    return () => {
      window.removeEventListener("scroll", handleScrollClose);
    };
  }, []);

  useEffect(() => {
    closeAllDesktopDropdowns();
  }, [location.pathname]);

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
      desc: "Built on decades of financial wisdom",
      color: "text-orange-600",
    },
    {
      name: "Our Story",
      path: "/about#our-story",
      icon: FaBookOpen,
      desc: "The evolution of wealth advisory",
      color: "text-blue-600",
    },
    {
      name: "Mission & Vision",
      path: "/about#mission-vision",
      icon: FaLightbulb,
      desc: "Architecting the future of independence",
      color: "text-purple-600",
    },
    {
      name: "Our Team",
      path: "/about#our-team",
      icon: FaUsers,
      desc: "Meet the minds behind your wealth",
      color: "text-green-600",
    },
  ];

  const serviceSections = [
    {
      name: "Goal Based Investing",
      path: "/services/goal-base-investing",
      icon: FaBullseye,
      desc: "Scientific mapping of life milestones",
      color: "text-orange-600",
    },
    {
      name: "Mutual Funds",
      path: "/services/mutual-fund",
      icon: FaChartLine,
      desc: "Alpha-seeking curated portfolios",
      color: "text-blue-600",
    },
    {
      name: "Direct Equities",
      path: "/services/stocks",
      icon: FaChartPie,
      desc: "Advisor-guided equity exposure",
      color: "text-green-600",
    },
    {
      name: "Life Insurance",
      path: "/services/life-insurance",
      icon: FaUmbrella,
      desc: "Human Life Value protection tranches",
      color: "text-red-600",
    },
    {
      name: "Fixed Income",
      path: "/services/fixed-deposit",
      icon: FaLandmark,
      desc: "Strategic capital preservation models",
      color: "text-amber-600",
    },
    {
      name: "Tax Solution",
      path: "/services/tax-solution",
      icon: FaFileInvoiceDollar,
      desc: "Optimization of net-take-home income",
      color: "text-purple-600",
    },
  ];

  const knowledgeSections = [
    {
      name: "Newsletter",
      path: "/newsletter",
      icon: FaBookOpen,
      desc: "Institutional Analysis & Daily Pulse",
    },
    {
      name: "Blog",
      path: "/blog",
      icon: FaLightbulb,
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
          <div className="items-center hidden space-x-1 desktop-nav-wrap lg:flex">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div
                  onClick={() => {
                    if (item.name === "About Us") {
                      setShowAboutDropdown((prev) => !prev);
                      setShowServicesDropdown(false);
                      setShowKnowledgeDropdown(false);
                    }

                    if (item.name === "Services") {
                      setShowServicesDropdown((prev) => !prev);
                      setShowAboutDropdown(false);
                      setShowKnowledgeDropdown(false);
                    }

                    if (item.name === "Knowledge Hub") {
                      setShowKnowledgeDropdown((prev) => !prev);
                      setShowAboutDropdown(false);
                      setShowServicesDropdown(false);
                    }
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

                {/* Dropdown Menu for About Us */}
                <AnimatePresence mode="wait">
                  {item.name === "About Us" && showAboutDropdown && (
                    <motion.div
                      variants={megaMenuAnimation}
                      onMouseEnter={() => {}}
                      onMouseLeave={(e) => {
                        const relatedTarget = e.relatedTarget;

                        if (
                          !relatedTarget ||
                          !(relatedTarget instanceof Node) ||
                          !e.currentTarget.contains(relatedTarget)
                        ) {
                          closeAllDesktopDropdowns();
                        }
                      }}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      style={{ transformOrigin: "top center" }}
                      className="absolute top-full -left-32 mt-4 w-[300px] bg-white rounded-2xl border border-slate-200 shadow-xl z-[1001] p-4"
                    >
                      <div className="space-y-1">
                        {aboutSections.map((section, idx) => (
                          <Link
                            key={idx}
                            to={section.path}
                            onClick={() => {
                              setShowAboutDropdown(false);

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
                            className="block px-4 py-3 rounded-xl transition-all duration-200 hover:bg-slate-50"
                          >
                            <div className="space-y-1">
                              <h4 className="text-sm font-bold text-slate-900">
                                {section.name}
                              </h4>

                              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                                {section.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
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
                      onMouseLeave={(e) => {
                        const relatedTarget = e.relatedTarget;

                        if (
                          !relatedTarget ||
                          !(relatedTarget instanceof Node) ||
                          !e.currentTarget.contains(relatedTarget)
                        ) {
                          closeAllDesktopDropdowns();
                        }
                      }}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      style={{ transformOrigin: "top center" }}
                      className="absolute top-full -left-32 mt-4 w-[300px] bg-white rounded-2xl border border-slate-200 shadow-xl z-[1001] p-4"
                    >
                      <div className="space-y-1">
                        {serviceSections.map((section, idx) => (
                          <Link
                            key={idx}
                            to={section.path}
                            onClick={() => setShowServicesDropdown(false)}
                            className="block px-4 py-3 rounded-xl transition-all duration-200 hover:bg-slate-50"
                          >
                            <div className="space-y-1">
                              <h4 className="text-sm font-bold text-slate-900">
                                {section.name}
                              </h4>

                              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                                {section.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
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
                      onMouseLeave={(e) => {
                        const relatedTarget = e.relatedTarget;

                        if (
                          !relatedTarget ||
                          !(relatedTarget instanceof Node) ||
                          !e.currentTarget.contains(relatedTarget)
                        ) {
                          closeAllDesktopDropdowns();
                        }
                      }}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      style={{ transformOrigin: "top center" }}
                      className="absolute top-full -left-32 mt-4 w-[300px] bg-white rounded-2xl border border-slate-200 shadow-xl z-[1001] p-4"
                    >
                      <div className="space-y-1">
                        {knowledgeSections.map((section, idx) => (
                          <Link
                            key={idx}
                            to={section.path}
                            onClick={() => setShowKnowledgeDropdown(false)}
                            className="block px-4 py-3 rounded-xl transition-all duration-200 hover:bg-slate-50"
                          >
                            <div className="space-y-1">
                              <h4 className="text-sm font-bold text-slate-900">
                                {section.name}
                              </h4>

                              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                                {section.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
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
