import React from "react";
import { motion } from "framer-motion";
import { FaLock, FaShieldAlt, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import useCMSContent from '../hooks/useCMSContent';
import useMetaTags from '../hooks/useMetaTags';

const PrivacyPolicy = () => {
  const { cmsContent, sectionOrder } = useCMSContent('privacy-policy');

  // SEO Hook
  useMetaTags(cmsContent['_seo'] || {
    title: "Privacy Policy | We Care Freedom Wealth",
    description: "Our institutional commitment to data governance.",
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
              <FaLock className="text-orange-600 text-xs" />
              <div className="text-orange-900 font-bold text-[10px] uppercase tracking-[0.2em]" dangerouslySetInnerHTML={{ __html: cmsContent['hero']?.badge || 'Institutional Data Governance' }} />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 uppercase tracking-tighter">
              {cmsContent['hero']?.title ? (
                 <span dangerouslySetInnerHTML={{ __html: cmsContent['hero'].title.replace(/Policy\./g, '<span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 font-black">Policy.</span>') }} />
              ) : <>Privacy <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 font-black">Policy.</span></>}
            </h1>

            <div className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto font-medium" dangerouslySetInnerHTML={{ __html: cmsContent['hero']?.description || "Transparency is the cornerstone of institutional trust. We protect your binary coordinates with military-grade encryption protocols." }} />
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 -mt-20 relative z-20">

        {/* Policy Intro Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] shadow-xl p-10 sm:p-20 border border-slate-100 mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>

          <div className="flex items-center space-x-4 mb-10 text-slate-400 font-black uppercase tracking-widest text-[10px]">
            <span className="bg-slate-100 px-3 py-1 rounded-full">{cmsContent['policy-intro']?.version || 'Protocol V2.4'}</span>
            <span className="h-1 w-1 bg-slate-200 rounded-full"></span>
            <span>{cmsContent['policy-intro']?.date || 'Active Deployment: Oct 3, 2025'}</span>
          </div>

          <div className="prose prose-slate prose-lg max-w-none cms-content">
            <p className="text-slate-600 leading-relaxed text-xl font-medium">
              {cmsContent['policy-intro']?.text ? (
                <span dangerouslySetInnerHTML={{ __html: cmsContent['policy-intro'].text }} />
              ) : <>This privacy directive establishes the architecture for how <span className="text-slate-900 font-black underline decoration-orange-500/30">We Care Freedom Wealth</span> manages and safeguards sovereign data shared via our digital terminal. We are committed to maintaining clinical confidentiality.</>}
            </p>
          </div>
        </motion.div>

        {/* Policy Sections */}
        <div className="grid gap-12 sm:gap-16">
          {(() => {
            const sectionMap = {
              'section-1': {
                title: cmsContent['section-1']?.title || "Institutional Commitment",
                content: cmsContent['section-1']?.text || "Our relationship is anchored in structural trust. In the course of executing financial directives, we access sovereign data. We utilize redundant security layers and managerial safeguards to ensure peak protection."
              },
              'section-2': {
                title: cmsContent['section-2']?.title || "Data Capture Topology",
                content: (
                  <ul className="grid sm:grid-cols-2 gap-6 mt-6">
                    <li className="flex items-start bg-slate-50 p-6 rounded-2xl border border-slate-100 group hover:border-orange-500/20 transition-colors">
                      <FaCheckCircle className="text-orange-500 mt-1 mr-4 shrink-0 text-lg" />
                      <span className="text-slate-600 font-bold text-sm">Legal coordinates and contact nodes.</span>
                    </li>
                    <li className="flex items-start bg-slate-50 p-6 rounded-2xl border border-slate-100 group hover:border-orange-500/20 transition-colors">
                      <FaCheckCircle className="text-orange-500 mt-1 mr-4 shrink-0 text-lg" />
                      <span className="text-slate-600 font-bold text-sm">Consultation directives and registries.</span>
                    </li>
                    <li className="flex items-start bg-slate-50 p-6 rounded-2xl border border-slate-100 group hover:border-orange-500/20 transition-colors">
                      <FaCheckCircle className="text-orange-500 mt-1 mr-4 shrink-0 text-lg" />
                      <span className="text-slate-600 font-bold text-sm">Binary telemetry and browser profiles.</span>
                    </li>
                  </ul>
                )
              },
              'section-3': {
                title: cmsContent['section-3']?.title || "Encryption Architecture",
                content: cmsContent['section-3']?.text || "To prevent terminal compromise, we implement 256-bit institutional encryption and secure hosting clusters with real-time backups. No client data is transmitted to third-party nodes without hyper-explicit consent."
              },
              'section-4': {
                title: cmsContent['section-4']?.title || "Visual & GEO Telemetry",
                content: cmsContent['section-4']?.text || "With your authorization, our terminal may interface with optics/gallery for Video KYC and document verification. GEO coordinates may be utilized for jurisdiction-specific regulatory authentication."
              }
            };
            const defaultOrder = ['section-1', 'section-2', 'section-3', 'section-4'];
            const orderToUse =
              sectionOrder && sectionOrder.length > 0
                ? sectionOrder.filter((k) => sectionMap[k])
                : defaultOrder;

            return orderToUse.map((k, idx) => (
              <PolicySection
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
          <FaShieldAlt className="text-orange-500 text-6xl mx-auto mb-10" />
          <h3 className="text-4xl font-black mb-6 uppercase tracking-tighter">Grievance Terminal</h3>
          <p className="text-slate-400 mb-12 max-w-lg mx-auto font-medium text-lg leading-relaxed">
            If you identify data variances or integrity issues, initiate an uplink with our compliance desk.
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

const PolicySection = ({ number, title, content }) => (
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

export default PrivacyPolicy;
