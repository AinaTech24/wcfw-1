import React from "react";
import { motion } from "framer-motion";
import { FaChartBar, FaInfoCircle, FaArrowRight, FaTable } from "react-icons/fa";
import useCMSContent from '../hooks/useCMSContent';
import useMetaTags from '../hooks/useMetaTags';

const DEFAULT_COMMISSIONS = [
  { scheme: "Arbitrage Funds", firstYear: "0.05% to 0.60%", onwards: "0.05% to 0.60%" },
  { scheme: "ELSS Funds", firstYear: "0.50% to 1.25%", onwards: "0.50% to 1.25%" },
  { scheme: "Equity Oriented Funds", firstYear: "0.50% to 1.25%", onwards: "0.50% to 1.25%" },
  { scheme: "Aggressive Hybrid Equity Funds", firstYear: "0.50% to 1.25%", onwards: "0.50% to 1.25%" },
  { scheme: "Fixed Maturity Solutions", firstYear: "0.05% to 0.50%", onwards: "0.05% to 0.50%" },
  { scheme: "Fund of Funds", firstYear: "0.25% to 1%", onwards: "0.25% to 1%" },
  { scheme: "Gilt Funds", firstYear: "0.25% to 1%", onwards: "0.05% to 0.65%" },
  { scheme: "Hybrid Debt Funds", firstYear: "0.05% to 0.75%", onwards: "0.05% to 0.75%" },
  { scheme: "Income Funds", firstYear: "0.05% to 1%", onwards: "0.05% to 1%" },
  { scheme: "Index Funds", firstYear: "0.01% to 0.75%", onwards: "0.01% to 0.75%" },
  { scheme: "Liquid / Ultra Short Funds", firstYear: "0.05% to 0.50%", onwards: "0.05% to 0.50%" },
  { scheme: "Short-Term Income Funds", firstYear: "0.05% to 0.65%", onwards: "0.05% to 0.65%" },
  { scheme: "Thematic / Sector Funds", firstYear: "0.50% to 1.25%", onwards: "0.50% to 1.25%" },
];

const CommissionDisclosure = () => {
  const { cmsContent } = useCMSContent('commission-disclosure');

  useMetaTags(cmsContent['_seo'] || {
    title: "Commission Disclosure | We Care Freedom Wealth",
    description: "Transparent disclosure of our advisory revenue models and institutional standards.",
    robotsTag: "index, follow"
  });

  const commissions = cmsContent['commission-table']?.items?.length
    ? cmsContent['commission-table'].items
    : DEFAULT_COMMISSIONS;

  const notes = cmsContent['notes']?.items?.length
    ? cmsContent['notes'].items
    : [
        { title: "Market Volatility Protocol", content: "Investments in mutual funds are subject to market risk. Stakeholders should analyze scheme-related documentation clinically before capital deployment." },
        { title: "Synchronization Frequency", content: "This disclosure is maintained on a best-effort basis and synchronization occurs as actual details are provided by Asset Management Companies." },
        { title: "Sovereign Decisioning", content: "Clients maintain total autonomy to accept or reject proposals. Independent legal and fiduciary consultation is encouraged." },
        { title: "Regulatory Calibration", content: "As per SEBI's enhanced transparency protocols (Dec 2024), we maintain full disclosure for both direct and institutional mutual fund Solutions." },
      ];

  return (
    <div className="bg-[#f8fafc]">
      {/* Cinematic Light Header */}
      <section
        className="relative h-[55vh] flex items-center overflow-hidden pt-16"
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
              <FaChartBar className="text-orange-600 text-xs" />
              <div className="text-orange-900 font-bold text-[10px] uppercase tracking-[0.2em]" dangerouslySetInnerHTML={{ __html: cmsContent['hero']?.badge || 'Institutional Transparency' }} />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 uppercase tracking-tighter">
              {cmsContent['hero']?.title ? (
                <span dangerouslySetInnerHTML={{ __html: cmsContent['hero'].title.replace(/Disclosure\./g, '<span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 font-black">Disclosure.</span>') }} />
              ) : <>Commission <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 font-black">Disclosure.</span></>}
            </h1>

            <div className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto font-medium" dangerouslySetInnerHTML={{ __html: cmsContent['hero']?.description || "Under SEBI Circular SEBI/IMD/CIR No.4/168230/09, we maintain clinical transparency regarding our advisory revenue models and institutional standards." }} />
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 -mt-20 relative z-20">

        {/* Regulation Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[3rem] shadow-xl p-10 sm:p-16 border border-slate-100 mb-16"
        >
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tight"
                dangerouslySetInnerHTML={{ __html: cmsContent['intro']?.title || 'Trail Revenue Structure' }}
              />
              <div className="text-slate-600 text-lg leading-relaxed mb-10 font-medium cms-content">
                <div dangerouslySetInnerHTML={{ __html: cmsContent['intro']?.description || "As per SEBI regulations, we disclose the trail commission received from mutual fund houses. These rates represent the range of trailing commissions we receive on various schemes as a percentage of your Assets Under Management (AUM)." }} />
              </div>
              <div className="flex items-start space-x-6 p-8 bg-orange-50 rounded-[2.5rem] border border-orange-100">
                <FaInfoCircle className="text-orange-500 text-3xl shrink-0 mt-1" />
                <div className="text-slate-800 font-bold text-sm italic leading-relaxed cms-content">
                  <div dangerouslySetInnerHTML={{ __html: cmsContent['intro']?.quote || '"Institutional integrity is non-negotiable. Our revenue models are clinically aligned with your long-term capital expansion objectives."' }} />
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 w-full bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent"></div>
              <div className="relative z-10 text-center">
                <FaTable className="text-orange-500 text-5xl mx-auto mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-2xl font-black mb-4 uppercase tracking-tight">Yield Matrix</h4>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-relaxed">Standardized Benchmark Data <br />Q1 2025 COMPLIANCE</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Commission Table */}
        <div className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden mb-24">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em]">Asset Class Profile</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-center">Inception Yield (Yr 1)</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-center">Terminal Yield (Yr 2+)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {commissions.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-10 py-6 text-slate-900 font-black text-sm uppercase tracking-tight group-hover:text-orange-600 transition-colors">
                      <span dangerouslySetInnerHTML={{ __html: row.scheme }} />
                    </td>
                    <td className="px-10 py-6 text-slate-500 font-bold text-center text-sm">
                      <span dangerouslySetInnerHTML={{ __html: row.firstYear }} />
                    </td>
                    <td className="px-10 py-6 text-slate-500 font-bold text-center text-sm">
                      <span dangerouslySetInnerHTML={{ __html: row.onwards }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Important Notes Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {notes.map((note, idx) => (
            <NoteBlock key={idx} title={note.title} content={note.content} />
          ))}
        </div>

        {/* CTA Contact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center bg-slate-900 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl shadow-slate-900/40"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-orange-600/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-6 uppercase tracking-tight">Establish Compliance Uplink</h3>
            <p className="text-slate-400 mb-12 max-w-xl mx-auto font-medium text-lg leading-relaxed">
              Our institutional compliance cell is available for deep-dive analysis of revenue structural alignment and regulatory protocols.
            </p>
            <a href="mailto:info@wcfw.in" className="inline-flex items-center px-12 py-5 bg-orange-600 text-white font-black rounded-2xl hover:bg-white hover:text-orange-600 transition-all shadow-xl group uppercase tracking-widest text-xs">
              Initiate Inquiry <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const NoteBlock = ({ title, content }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-lg hover:shadow-2xl transition-all"
  >
    <h4 className="text-base font-black text-slate-900 mb-4 flex items-center uppercase tracking-widest">
      <span className="w-1.5 h-6 bg-orange-500 rounded-full mr-4"></span>
      <span dangerouslySetInnerHTML={{ __html: title }} />
    </h4>
    <div className="text-slate-500 text-sm font-medium leading-relaxed cms-content">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  </motion.div>
);

export default CommissionDisclosure;
