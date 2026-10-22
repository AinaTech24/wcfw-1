import React from "react";
import { motion } from "framer-motion";
import { FaGavel, FaHandshake, FaArrowRight } from "react-icons/fa";
import useCMSContent from '../hooks/useCMSContent';
import useMetaTags from '../hooks/useMetaTags';

const TermsOfService = () => {
  const { cmsContent, sectionOrder } = useCMSContent('terms-of-service');

  useMetaTags(cmsContent['_seo'] || {
    title: "Terms of Service | We Care Freedom Wealth",
    description: "Establishing the professional standards and legal architecture governing our institutional relationship.",
    robotsTag: "index, follow"
  });

  return (
    <div className="bg-[#f8fafc]">
      {/* Cinematic Light Header */}
      <section
        className="relative min-h-[min(55vh,480px)] flex items-center overflow-hidden pt-16 pb-8"
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
              <FaHandshake className="text-orange-600 text-xs" />
              <div className="text-orange-900 font-bold text-[10px] uppercase tracking-[0.2em]" dangerouslySetInnerHTML={{ __html: cmsContent['hero']?.badge || 'Contractual Framework' }} />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 uppercase tracking-tighter">
              {cmsContent['hero']?.title ? (
                <span dangerouslySetInnerHTML={{ __html: cmsContent['hero'].title.replace(/Service\./g, '<span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 font-black">Service.</span>') }} />
              ) : <>Terms of <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 font-black">Service.</span></>}
            </h1>

            <div className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto font-medium" dangerouslySetInnerHTML={{ __html: cmsContent['hero']?.description || "Establishing the professional standards and legal architecture governing our institutional relationship and advisory terminal." }} />
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 -mt-20 relative z-20">

        {/* Terms Intro Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] shadow-xl p-10 sm:p-20 border border-slate-100 mb-16 relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>

          <div className="flex items-center space-x-4 mb-10 text-slate-400 font-black uppercase tracking-widest text-[10px]">
            <span className="bg-slate-100 px-3 py-1 rounded-full">{cmsContent['policy-intro']?.version || 'Protocol V1.9'}</span>
            <span className="h-1 w-1 bg-slate-200 rounded-full"></span>
            <span>{cmsContent['policy-intro']?.date || 'Effective: Sep 1, 2025'}</span>
          </div>

          <div className="prose prose-slate prose-lg max-w-none">
            <div className="text-slate-600 leading-relaxed text-xl font-medium cms-content">
              {cmsContent['policy-intro']?.text
                ? <div dangerouslySetInnerHTML={{ __html: cmsContent['policy-intro'].text }} />
                : <p>By accessing the <span className="text-slate-900 font-black underline decoration-orange-500/30">The Happyness Culture</span> infrastructure, you agree to comply with these Terms of Service. These parameters govern your engagement with our advisory architecture.</p>
              }
            </div>
          </div>
        </motion.div>

        {/* Terms Sections */}
        <div className="grid gap-12 sm:gap-16">
          {(() => {
            const sectionMap = {
              'section-1': {
                title: cmsContent['section-1']?.title || "Acceptance of Protocols",
                content: cmsContent['section-1']?.text || "By interacting with our platform, you acknowledge total adherence to these legal protocols. In the absence of consensus, all interaction with our advisory services must be terminated immediately."
              },
              'section-2': {
                title: cmsContent['section-2']?.title || "Regulatory Architecture",
                content: cmsContent['section-2']?.text || "The Happyness Culture operates as an AMFI-Registered Mutual Fund Distributor (ARN: 119542). We specialize in Regular Solutions and derive institutional trail commissions. We do not provide fixed guarantees; all capital deployment is subject to market variables."
              },
              'section-3': {
                title: cmsContent['section-3']?.title || "Intellectual Sovereignty",
                content: cmsContent['section-3']?.text || "All proprietary algorithms, logos, and visual nodes on this terminal are the exclusive property of The Happyness Culture. Unauthorized clinical extraction or redistribution of intellectual assets is strictly prohibited."
              },
              'section-4': {
                title: cmsContent['section-4']?.title || "Liability Limitation",
                content: cmsContent['section-4']?.text || "We are not liable for consequential variances resulting from terminal use, including market sensitivity, technical latency, or external infrastructure interruptions beyond our direct governance."
              },
              'section-5': {
                title: cmsContent['section-5']?.title || "Jurisdictional Decree",
                content: cmsContent['section-5']?.text || "These protocols are governed by the federal statutes of India. Legal disputes are subject to the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra."
              }
            };

            const defaultOrder = ['section-1', 'section-2', 'section-3', 'section-4', 'section-5'];
            const orderToUse =
              sectionOrder && sectionOrder.length > 0
                ? sectionOrder.filter((k) => sectionMap[k])
                : defaultOrder;

            return orderToUse.map((k, idx) => (
              <TermsSection
                key={k}
                number={String(idx + 1).padStart(2, '0')}
                title={sectionMap[k].title}
                content={sectionMap[k].content}
              />
            ));
          })()}
        </div>

        {/* Contact Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 p-16 bg-slate-900 rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl shadow-slate-900/40"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
          <FaGavel className="text-orange-500 text-6xl mx-auto mb-10" />
          <h3 className="text-4xl font-black mb-6 uppercase tracking-tighter">Legal Compliance</h3>
          <p className="text-slate-400 mb-12 max-w-lg mx-auto font-medium text-lg leading-relaxed">
            For clinical clarification on our contractual terms or regulatory documentation, initiate a query with our legal desk.
          </p>
          <a
            href="mailto:info@wcfw.in"
            className="inline-flex items-center px-12 py-5 bg-orange-600 text-white font-black rounded-2xl hover:bg-white hover:text-orange-600 transition-all uppercase tracking-widest text-xs"
          >
            info@wcfw.in <FaArrowRight className="ml-3" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

const TermsSection = ({ number, title, content }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative pl-24 group"
  >
    <span className="absolute left-0 top-0 text-8xl font-black text-slate-100/50 group-hover:text-orange-500/10 transition-colors leading-[0.8] select-none tracking-tighter">{number}</span>
    <div className="relative z-10">
      <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight"
        dangerouslySetInnerHTML={typeof title === 'string' ? { __html: title } : undefined}
      >{typeof title === 'string' ? undefined : title}</h2>
      <div className="text-slate-500 leading-relaxed text-lg font-medium cms-content">
        {typeof content === 'string'
          ? <div dangerouslySetInnerHTML={{ __html: content }} />
          : content}
      </div>
    </div>
  </motion.div>
);

export default TermsOfService;
