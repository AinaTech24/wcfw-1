import React from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaShieldAlt, FaLink } from "react-icons/fa";
import useCMSContent from '../hooks/useCMSContent';
import useMetaTags from '../hooks/useMetaTags';

const DEFAULT_SECTIONS = [
  {
    title: "Market Volatility & Performance Protocols",
    content: "Mutual fund investments are subject to inherent market risks. Asset values fluctuate based on systemic economic and financial variables. Historical data is not an indicator of terminal outcomes. Investors must perform clinical review of scheme-related documentation prior to capital deployment."
  },
  {
    title: "Yield Payout Variable",
    content: "Dividend options do not guarantee liquidity events. Payouts are strictly contingent upon realized fund surpluses. In the absence of distributable alpha, no dividends shall be initialized."
  },
  {
    title: "Identity & Profile Integrity",
    content: "Stakeholders must maintain absolute accuracy of their institutional records. Any derivation in personal coordinates, legal identity, or banking directives must be transmitted immediately to avoid synchronization failures in transaction execution."
  },
  {
    title: "Succession & Joint Stewardship",
    content: "In events of joint holder transitions, records must be calibrated promptly to ensure uncompromised wealth transfer. Institutional proof of transition and identity verification are mandatory for registry updates."
  },
  {
    title: "Strategic Portfolio Auditing",
    content: "We mandate annual strategic reviews to track portfolio velocity and realign asset allocation with terminal objectives. Markets evolve; periodic auditing is essential for maintaining alpha targets."
  },
  {
    title: "Valuation Metrics & NAV Latency",
    content: "NAV and valuation metrics reflect historical closing data and may not represent real-time absolute values. Execution outcomes are governed by regulatory cutoff protocols. Reports serve as analytical references only."
  },
  {
    title: "Locked liquidity & Exit Loads",
    content: "<ul class='list-disc pl-5 space-y-2'><li>Retirement &amp; Child-Centric Hedges: 5-year cyclical lock-in per installment.</li><li>ELSS Tax Hedges: 3-year clinical lock-in per deployment.</li><li>Exit Load Protocols: Applied independently to each systematic tranche based on scheme-specific holding horizons.</li></ul>"
  },
  {
    title: "Taxation & TDS Directives",
    content: "Tax liabilities are governed by asset classification, holding duration, and redemption timestamps. NRIs (NRE/NRO) are subject to regulatory TDS protocols. Fiduciary tax consultation is mandatory for optimal strategizing."
  },
  {
    title: "Revenue & Advisory Transparency",
    content: "We facilitate regular mutual fund Solutions and derive trail commissions from Asset Management Companies. We do not distribute direct Solutions and do not levy direct advisory fees on private capital."
  },
  {
    title: "Redemption Lifecycle",
    content: "Stakeholders must synchronize with exit loads and lock-in protocols prior to liquidation. Credit cycles typically follow T+1 or T+2 protocols depending on the scheme's settlement architecture."
  },
  {
    title: "Data Sovereignty & Encryption",
    content: "We implement institutional-grade data protection. PAN, Aadhaar, and primary banking coordinates are not stored within our web terminal. All processing occurs through secured AMC/RTA/Exchange gateways."
  },
  {
    title: "Integrity of Information",
    content: "While we aim for clinical precision, occasional data variances may occur. Stakeholders are responsible for verifying transaction coordinates. We do not provide guarantees on capital preservation or fixed yields. Beware of non-institutional promises."
  }
];

const Disclaimer = () => {
  const { cmsContent } = useCMSContent('disclaimer');

  useMetaTags(cmsContent['_seo'] || {
    title: "Disclaimer | We Care Freedom Wealth",
    description: "Transparent disclosure of market risks, operational protocols, and statutory obligations.",
    robotsTag: "index, follow"
  });

  // Build sections array from CMS content if available, otherwise use defaults
  const disclaimerSections = cmsContent['sections']?.items?.length
    ? cmsContent['sections'].items
    : DEFAULT_SECTIONS;

  return (
    <div className="bg-[#f8fafc]">
      {/* Cinematic Light Header */}
      <section
        className="relative h-[65vh] flex items-center overflow-hidden pt-16"
        style={{
          backgroundImage: 'linear-gradient(135deg, #ffe5bd 0%, #fffdf7 35%, #c7f1ff 100%)'
        }}
      >
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_100%)]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-md border border-white/40 px-4 py-2 rounded-full mb-8"
            >
              <FaExclamationTriangle className="text-orange-600 text-xs" />
              <div className="text-orange-900 font-bold text-[10px] uppercase tracking-[0.2em]" dangerouslySetInnerHTML={{ __html: cmsContent['hero']?.badge || 'Compliance Protocol' }} />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 uppercase tracking-tighter">
              {cmsContent['hero']?.title ? (
                <span dangerouslySetInnerHTML={{ __html: cmsContent['hero'].title.replace(/Disclaimer\./g, '<span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 font-black">Disclaimer.</span>') }} />
              ) : <>Regulatory <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 font-black">Disclaimer.</span></>}
            </h1>

            <div className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto font-medium cms-content" dangerouslySetInnerHTML={{ __html: cmsContent['hero']?.description || "Transparent disclosure of market risks, operational protocols, and statutory obligations for every WCFW stakeholder." }} />
          </motion.div>
        </div>
      </section>

      {/* Content Section - Redesigned Grid */}
      <section className="py-24 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {disclaimerSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100 hover:border-orange-500/20 transition-all group"
              >
                <div className="flex items-start">
                  <div className="w-1.5 h-12 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-8 mt-1 group-hover:scale-y-110 transition-transform origin-top shrink-0"></div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight"
                      dangerouslySetInnerHTML={typeof section.title === 'string' ? { __html: section.title } : undefined}
                    >{typeof section.title === 'string' ? undefined : section.title}</h2>
                    {section.content && (
                      <div className="text-slate-500 text-sm font-medium leading-relaxed cms-content">
                        <div dangerouslySetInnerHTML={{ __html: section.content }} />
                      </div>
                    )}
                    {section.items && (
                      <ul className="space-y-4 mt-6">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="flex items-start text-sm text-slate-500 font-medium">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-4 mt-1.5 flex-shrink-0"></span>
                            <span className="cms-content inline-block" dangerouslySetInnerHTML={{ __html: item }} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Critical Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-slate-900 rounded-[4rem] p-12 sm:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-slate-900/40"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
            <div className="relative z-10">
              <FaShieldAlt className="text-orange-500 text-6xl mx-auto mb-10" />
              <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter leading-tight">Institutional Awareness</h2>
              <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto italic font-medium leading-relaxed">
                "By interacting with our advisory terminal, you acknowledge the market risks and institutional parameters outlined here. Your financial security is our primary objective."
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="px-12 py-5 bg-orange-600 text-white font-black rounded-2xl hover:bg-white hover:text-orange-600 transition-all shadow-xl uppercase tracking-widest text-xs">
                  Acknowledge Protocol
                </button>
                <button className="px-12 py-5 bg-white/5 text-white border border-white/10 font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs flex items-center justify-center">
                  <FaLink className="mr-3" /> Compliance Repository
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Disclaimer;
