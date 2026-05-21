// src/components/Footer.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaArrowUp,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";
import useCMSContent from "../hooks/useCMSContent";

import logo from "../assets/footerlogo.png";

const Footer = () => {
  // Scroll To Top State
  const [isClicked, setIsClicked] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");

      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setShowScrollTop(window.scrollY > heroBottom - 100);
      } else {
        setShowScrollTop(window.scrollY > 400);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { cmsContent: footerContent } = useCMSContent("footer");

  // Office Locations from the CMS or default
  const offices = footerContent?.["offices"]?.list || [
    {
      title: "Anand - Headquarters",
      address:
        "312 - 316, 3rd Floor, Krishna Shrey Complex, Nr. Sanket Sales, Raj Marg, Anand - 388001",
      phone: "+91 98201 35296 , +91 93772 77703",
      email: "info@wcfw.in",
    },
    {
      title: "Vadodara Branch",
      address:
        "The Park, 304-306, Old Padra Rd, Akshar Chowk, Madhav Nagar, Akota, Vadodara, Gujarat 390012",
      phone: "+91 98241 43812 , +91 93772 77703",
      email: "tushar@wcfw.in, vadodara@wcfw.in",
    },
    {
      title: "Ahmedabad Branch",
      address:
        "Dinesh Hall, AWFIS, 6th Floor, World Center, Besides, Ashram Rd, Ahmedabad, Gujarat 380009",
      phone: "+91 78430 47366 , +91 93772 77703",
      email: "ahmedabad@wcfw.in, info@wcfw.in",
    },
    {
      title: "Delhi Branch",
      address:
        "505, 5th Floor, Mansarover Building, Nehru Place, New Delhi-110019",
      phone: "+91 98100 31561 , +91 84870 68946",
      email: "pravin@wcfw.in, info@wcfw.in",
    },
  ];

  const cmsSocialLinks = footerContent?.["social-links"]?.list;
  const socialIconsMap = {
    Facebook: FaFacebook,
    Twitter: FaTwitter,
    LinkedIn: FaLinkedin,
    Instagram: FaInstagram,
    YouTube: FaYoutube,
  };

  const socialLinks = cmsSocialLinks
    ? cmsSocialLinks.map((link) => ({
      icon: socialIconsMap[link.name] || FaFacebook,
      href: link.href,
      color:
        link.name === "Instagram"
          ? "hover:text-pink-400"
          : link.name === "YouTube"
            ? "hover:text-red-400"
            : "hover:text-blue-400",
    }))
    : [
      {
        icon: FaFacebook,
        href: "https://www.facebook.com/wecarefreedom",
        color: "hover:text-blue-400",
      },
      {
        icon: FaTwitter,
        href: "https://x.com/we_care_invest",
        color: "hover:text-blue-300",
      },
      {
        icon: FaLinkedin,
        href: "https://www.linkedin.com/company/we-care-freedom/",
        color: "hover:text-blue-400",
      },
      {
        icon: FaInstagram,
        href: "https://www.instagram.com/wecarefreedomwealth/",
        color: "hover:text-pink-400",
      },
      {
        icon: FaYoutube,
        href: "https://www.youtube.com/@wecarefreedomwealth",
        color: "hover:text-red-400",
      },
    ];

  const marketIndices = footerContent?.["market-indices"]?.list || [
    { name: "NSE", link: "https://www.nseindia.com/" },
    { name: "BSE", link: "https://www.bseindia.com/" },
    { name: "SEBI", link: "https://www.sebi.gov.in/" },
    { name: "RBI", link: "https://www.rbi.org.in/" },
    { name: "CDSL", link: "https://www.cdslindia.com/" },
    { name: "NCDEX", link: "https://www.ncdex.com/" },
    { name: "MCX", link: "https://www.mcxindia.com/" },
  ];

  const legalInfo = footerContent?.["legal-info"] || {};
  const bottomBar = footerContent?.["bottom-bar"] || {};
  const companyInfo = footerContent?.["company-info"] || {};
  const quickLinks = footerContent?.["quick-links"]?.list || [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "Knowledge Hub", path: "/blog" },
    { name: "Videos", path: "/videos" },
    { name: "Calculators", path: "/calculators" },
    { name: "Contact Us", path: "/contact" },
    { name: "Login", path: "/login" },
  ];
  const toolsData = footerContent?.["tools"] || {
    list: [
      { name: "SIP Calculator", path: "/calculator/sip" },
      { name: "Lumpsum Calculator", path: "/calculator/lumpsum" },
      { name: "Retirement Calculator", path: "/calculator/retirement" },
      { name: "Tax Calculator", path: "/calculator/tax" },
    ],
    exploreMoreText: "All Calculators",
    exploreMorePath: "/calculators",
  };
  const footerServices = footerContent?.["footer-services"]?.list || [
    { name: "Mutual Funds", path: "/services/mutual-fund" },
    { name: "Life Insurance", path: "/services/life-insurance" },
    { name: "Goal-Based Investing", path: "/services/goal-base-investing" },
    { name: "Tax Solution", path: "/services/tax-solution" },
    { name: "Stocks & Equity", path: "/services/stocks" },
    { name: "Fixed Deposits", path: "/services/fixed-deposit" },
  ];

  return (
    <footer className="relative overflow-hidden text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-bg opacity-10"></div>

      {/* Decorative Orange Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600"></div>

      {/* Main Footer Content */}
      <div className="relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 md:col-span-2"
          >
            <div className="flex justify-center mb-6 md:justify-start">
              <img
                src={logo}
                alt={companyInfo.logoAlt || "WeCare Freedom Wealth"}
                className="object-contain h-20 sm:h-28"
              />
            </div>
            <p className="mb-6 text-sm leading-relaxed text-center text-gray-400 md:text-left sm:text-base">
              {companyInfo.description ||
                "Your trusted partner in financial growth. We help you build wealth through smart investment strategies and personalized financial solution."}
            </p>

            {/* Social Links */}
            <div className="flex justify-center space-x-4 md:justify-start">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.95 }}
                  className={`w-11 h-11 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-full flex items-center justify-center ${social.color} transition-all duration-300 hover:bg-gradient-to-br hover:from-orange-500/40 hover:to-yellow-500/40 border border-orange-500/30 outline-none`}
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </motion.div>
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="mb-6 text-lg font-bold text-gradient-warm">
              Quick Links
            </h3>
            <ul className="flex flex-col items-center space-y-3 md:items-start">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="relative inline-flex items-center text-gray-400 transition-colors duration-300 outline-none group hover:text-orange-400"
                  >
                    <span className="relative">
                      {link.name}

                      {/* underline hover animation */}
                      <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-orange-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="mb-6 text-lg font-bold text-gradient-warm">Tools</h3>
            <ul className="flex flex-col items-center space-y-3 md:items-start">
              {toolsData.list.map((tool, index) => (
                <li key={index}>
                  <Link
                    to={tool.path}
                    className="relative inline-flex items-center text-gray-400 transition-colors duration-300 outline-none group hover:text-orange-400"
                  >
                    <span className="relative">
                      {tool.name}

                      <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-orange-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to={toolsData.exploreMorePath || "/calculators"}
                  className="flex items-center text-sm font-bold text-orange-400 transition-colors duration-200 outline-none hover:text-orange-300 group"
                >
                  {toolsData.exploreMoreText || "Explore More Calculators"}
                  <FaArrowUp className="ml-2 rotate-90 text-[10px] group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="mb-6 text-lg font-bold text-gradient-warm">
              Our Services
            </h3>
            <ul className="flex flex-col items-center space-y-3 md:items-start">
              {footerServices.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.path}
                    className="relative inline-flex items-center text-gray-400 transition-colors duration-300 outline-none group hover:text-orange-400"
                  >
                    <span className="relative">
                      {service.name}

                      <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-orange-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Office Locations - 4 Offices Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="pt-12 mt-16 border-t border-white/10"
        >
          <h3 className="mb-8 text-2xl font-bold text-center text-gradient-warm">
            Our Offices
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {offices.map((office, index) => (
              <div
                key={index}
                className="p-6 transition-all duration-300 border bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border-orange-500/20 backdrop-blur-sm hover:border-orange-500/50 hover:shadow-warm"
              >
                <h4 className="flex items-start mb-4 text-base font-bold text-orange-400 sm:text-lg">
                  <FaMapMarkerAlt className="flex-shrink-0 mt-1 mr-2" />
                  <span>{office.title}</span>
                </h4>

                <div className="space-y-3 text-xs sm:text-sm">
                  <p className="leading-relaxed text-gray-300 break-words">
                    {office.address}
                  </p>

                  <div className="flex items-start text-gray-400">
                    <FaPhone className="flex-shrink-0 mt-1 mr-2 text-orange-400" />
                    <span className="break-words">{office.phone}</span>
                  </div>

                  <div className="flex items-start text-gray-400">
                    <FaEnvelope className="flex-shrink-0 mt-1 mr-2 text-orange-400" />
                    <a
                      href={`mailto:${office.email.split(",")[0]}`}
                      className="break-words transition-colors duration-300 outline-none hover:text-orange-400"
                    >
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Market Indices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="pt-8 mt-12 border-t border-white/10"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
            {marketIndices.map((index, idx) => (
              <React.Fragment key={idx}>
                <a
                  href={index.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 outline-none hover:text-orange-400"
                >
                  {index.name}
                </a>
                {idx < marketIndices.length - 1 && (
                  <span className="text-orange-500">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Regulatory & Risk Disclosure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
          className="p-6 mt-8 space-y-4 text-xs leading-relaxed text-gray-400 border bg-black/40 backdrop-blur-sm rounded-xl border-orange-500/20"
        >
          <p>
            <strong className="text-orange-400">Risk Factors –</strong>{" "}
            {legalInfo.riskFactors ||
              "Investments in Mutual Funds are subject to Market Risks. Read all scheme related documents carefully before investing. Mutual Fund Schemes do not assure or guarantee any returns. Past performances of any Mutual Fund Scheme may or may not be sustained in future. There is no guarantee that the investment objective of any suggested scheme shall be achieved. All existing and prospective investors are advised to check and evaluate the Exit loads and other exit structure and TER applicable at the time of making the investment before finalizing on any investment decision for Mutual Funds schemes. We deal in Regular Solutions only for Mutual Fund Schemes and earn a Trailing Commission on client investments. Disclosure For Commission earnings is made to clients at the time of investments. Option of Direct Solution for every Mutual Fund Scheme is available to investors offering advantage of lower expense ratio. We are not entitled to earn any commission on Direct Solutions. Hence we do not deal in Direct Solutions."}
          </p>

          <p>
            <strong className="text-orange-400">
              AMFI Registered Mutual Fund Distributor
            </strong>{" "}
            |{" "}
            {legalInfo.amfiInfo ||
              "ARN: 249212 | Date of Registration: 26/07/2025 | Current Validity: 25/05/2028"}
          </p>

          <p>
            {legalInfo.copyrightText ||
              "© Copyright 2020. All Rights Reserved."}{" "}
            |
            <Link
              to="/commission-disclosure"
              className="ml-1 text-orange-400 transition-colors outline-none hover:text-orange-300"
            >
              Commission Disclosure
            </Link>{" "}
            |
            <Link
              to="/sid-sai-kim"
              className="ml-1 text-orange-400 transition-colors outline-none hover:text-orange-300"
            >
              SID/SAI/KIM
            </Link>{" "}
            |
            <Link
              to="/privacy-policy"
              className="ml-1 text-orange-400 transition-colors outline-none hover:text-orange-300"
            >
              Privacy Policy
            </Link>{" "}
            |
            <a
              href="/AMFI_Code-of-Conduct.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-orange-400 transition-colors outline-none hover:text-orange-300"
            >
              Code of Conduct
            </a>
          </p>

          <p>
            {legalInfo.grievanceInfo ||
              "For any Grievance do contact on Mobile Number and Email id of We Care Customer care: Hetal Maheta: 93772 77703 and 9824129366 mail is info@wcfw.in"}
          </p>

          <p className="text-center">
            Copyright &copy; {new Date().getFullYear()} We Care Freedom Wealth
          </p>
        </motion.div>

        {/* Bottom Bar */}
        <div className="relative mt-8 border-t border-white/10">
          <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <p className="mb-4 text-xs text-gray-500 md:mb-0">
                {bottomBar.copyright ||
                  "© 2025 We Care Freedom Wealth. All Rights Reserved"}{" "}
                | Designed by{" "}
                <a
                  href={bottomBar.designedByUrl || "https://ainatech.in"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-orange-400 transition-colors outline-none hover:text-orange-300"
                  aria-label="AinaTech website"
                >
                  {bottomBar.designedBy || "AinaTech Services LLP"}
                </a>
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-xs">
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 transition-colors outline-none hover:text-orange-400"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms-of-service"
                  className="text-gray-400 transition-colors outline-none hover:text-orange-400"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/disclaimer"
                  className="text-gray-400 transition-colors outline-none hover:text-orange-400"
                >
                  Disclaimer
                </Link>
                <Link
                  to="/commission-disclosure"
                  className="text-gray-400 transition-colors outline-none hover:text-orange-400"
                >
                  Commission Disclosure
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileTap={{ scale: 0.95 }}
        className={`group fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-[99999] flex items-center justify-center overflow-hidden h-14 w-14 hover:w-36 rounded-full hover:rounded-[40px] bg-gradient-to-r from-yellow-400 to-orange-500 shadow-[0_0_0_4px_rgba(251,191,36,0.25)] transition-all duration-300 ease-in-out cursor-pointer outline-none 
        ${isClicked ? "outline-none" : ""}
        ${showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        aria-label="Scroll to top"
      >
        {/* Icon */}
        <FaArrowUp className="text-white text-lg transition-all duration-300 group-hover:-translate-y-[200%]" />

        {/* Text */}
        <span className="absolute text-sm font-medium text-white transition-all duration-300 translate-y-5 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 whitespace-nowrap">
          Back to Top
        </span>
      </motion.button>
    </footer>
  );
};

export default Footer;
