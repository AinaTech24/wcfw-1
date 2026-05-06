import React from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaCheckCircle,
  FaBullseye,
  FaChartLine,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useMetaTags from "../../hooks/useMetaTags";

import mainImg from "../../assets/images/services/goal-based-investing.png";

const GoalBasedPlanning = () => {
  useMetaTags(
    "Goal-Based Financial Planning for Long-Term Wealth | We Care Finance",
    "Learn how goal-based financial planning helps you invest wisely, manage risk, and achieve long-term wealth with expert guidance from We Care.",
  );

  return (
    <article className="bg-white min-h-screen">
      {/* Simple Progress Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        className="fixed top-0 left-0 right-0 h-1 bg-orange-600 origin-left z-[1000]"
      />

      {/* Post Header */}
      <header className="pt-32 pb-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-8"
          >
            Financial Planning
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.2] mb-12 uppercase tracking-tight"
          >
            Goal-Based Financial Planning: <br />
            <span className="text-orange-600">
              A Smart Way to Secure Your Financial Future
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-8 text-slate-400 text-[10px] font-black uppercase tracking-widest"
          >
            <span className="flex items-center">
              <FaUser className="mr-2 text-orange-600" /> We Care Team
            </span>
            <span className="flex items-center">
              <FaCalendarAlt className="mr-2 text-orange-600" /> Feb 18, 2026
            </span>
            <span className="flex items-center">
              <FaClock className="mr-2 text-orange-600" /> 6 min read
            </span>
          </motion.div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-6xl mx-auto px-4 -mt-12 mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-[3rem] overflow-hidden shadow-2xl relative aspect-[21/9]"
        >
          <img
            src={mainImg}
            alt="Goal-Based Financial Planning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-24">
        <div className="prose prose-lg prose-slate max-w-none">
          <div className="space-y-12">
            {/* Introduction */}
            <section>
              <p className="text-xl text-slate-600 leading-relaxed font-medium first-letter:text-7xl first-letter:font-black first-letter:text-orange-600 first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]">
                In an era of rising living costs, market volatility, and
                changing lifestyles, managing money without a clear direction
                can create long-term uncertainty. Many individuals invest
                regularly but still feel unsure about whether their financial
                decisions truly support their future needs. A structured and
                well-thought-out financial approach helps bring clarity,
                confidence, and control over personal finances.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mt-6">
                At We Care Freedom Wealth, financial planning focuses on
                aligning investments with real-life objectives such as family
                security, lifestyle goals, and long-term financial stability. A
                purpose-driven approach ensures that money is not just invested,
                but invested wisely.
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* What Is */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">
                What Is Goal-Based Financial Planning?
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Goal-Based Financial Planning is a strategic approach where
                financial decisions are made based on clearly defined life goals
                rather than short-term market trends or random investment
                choices.
              </p>
              <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100">
                <h4 className="text-slate-900 font-bold mb-6">
                  Each financial goal is planned by considering three essential
                  elements:
                </h4>
                <ul className="space-y-4">
                  {[
                    "The amount required",
                    "The time frame to achieve it",
                    "The individual’s risk tolerance",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center space-x-4 text-slate-700 font-bold"
                    >
                      <FaCheckCircle className="text-orange-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed mt-8">
                This approach ensures that every investment has a specific
                purpose and contributes meaningfully to achieving long-term
                financial objectives.
              </p>
            </section>

            {/* Why Is Important */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">
                Why Is Goal-Based Financial Planning Important?
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                A structured financial plan provides direction and reduces
                uncertainty. Goal-Based Financial Planning helps individuals
                remain disciplined, even during market fluctuations, by keeping
                the focus on long-term outcomes rather than short-term
                volatility.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mt-6">
                With professional{" "}
                <strong>Financial Planning Services in India</strong>, investors
                can create customized strategies that adapt to different life
                stages while ensuring financial stability and growth.
              </p>
            </section>

            {/* How to Set Goals */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">
                How to Set Financial Goals Effectively
              </h2>

              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Identify Personal and Family Objectives
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                The foundation of effective financial planning lies in
                identifying clear and realistic goals. These may include
                creating an emergency fund, planning for children’s education,
                purchasing a home, or building a retirement corpus.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Categorize Goals Based on Time Horizon
              </h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  { title: "Short-term", desc: "Up to 3 years" },
                  { title: "Medium-term", desc: "3 to 7 years" },
                  { title: "Long-term", desc: "More than 7 years" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-orange-50 rounded-2xl p-6 text-center border border-orange-100"
                  >
                    <div className="text-orange-600 font-black text-sm uppercase mb-2">
                      {item.title}
                    </div>
                    <div className="text-slate-900 font-bold">{item.desc}</div>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Estimate Goal Cost and Consider Inflation
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Accurate estimation of goal costs is essential. Inflation must
                be factored in to ensure that future financial needs are
                adequately covered.
              </p>
            </section>

            {/* Investment Options */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">
                Investment Options for Goal-Based Financial Planning
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                Choosing the right investment tools plays a vital role in the
                success of Goal-Based Financial Planning.
              </p>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                    <FaChartLine className="text-blue-600 text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      Mutual Funds and SIPs
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      Mutual funds offer diversification and professional
                      management, making them suitable for long-term financial
                      goals. SIPs encourage disciplined investing and reduce the
                      impact of market volatility.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
                    <FaBullseye className="text-green-600 text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      Equity and Stock Investments
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      Direct equity investments may be suitable for individuals
                      with a higher risk appetite and long-term investment
                      horizons.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center shrink-0">
                    <FaShieldAlt className="text-purple-600 text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      Insurance and Tax Planning
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      Insurance safeguards financial goals against unforeseen
                      risks, while tax planning improves overall returns.
                      Integrated solutions provided through Wealth Management
                      Services help maintain balance between growth and
                      protection.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Monitor & Review */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">
                How to Monitor and Review Your Financial Plan
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Financial planning is not a one-time activity. Regular
                monitoring ensures that investments remain aligned with changing
                goals and market conditions.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mt-6">
                Through professional <strong>Wealth Management Services</strong>
                , portfolios can be reviewed, rebalanced, and adjusted based on
                income changes, life events, or nearing goal timelines.
              </p>
            </section>

            {/* Common Mistakes */}
            <section className="bg-slate-900 rounded-[3rem] p-12 text-white">
              <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                Common Mistakes to Avoid
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Many investors fail to achieve financial goals due to avoidable
                errors such as investing without clear objectives, ignoring risk
                tolerance, delaying investments, or failing to review plans
                periodically.
              </p>
              <p className="font-bold text-orange-500">
                A disciplined Goal-Based Financial planning approach helps avoid
                these mistakes and improves long-term financial outcomes.
              </p>
            </section>

            {/* Conclusion */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8 text-center">
                Conclusion
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed text-center max-w-2xl mx-auto">
                Goal-Based Financial Planning brings purpose and structure to
                personal finance. By aligning investments with clearly defined
                goals, individuals can manage risks effectively and work toward
                long-term financial security.
              </p>
              <p className="text-lg font-bold text-slate-950 mt-8 text-center">
                With expert guidance from We Care Freedom Wealth, investors can
                transform financial aspirations into achievable milestones and
                build a confident, secure future.
              </p>
            </section>

            {/* FAQ Section */}
            <section className="bg-orange-50 rounded-[3rem] p-12 border border-orange-100">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-10">
                Frequently Asked Questions
              </h2>
              <div className="space-y-8">
                {[
                  {
                    q: "What is goal-based financial planning?",
                    a: "Goal-Based Financial Planning is a method where investments are aligned with specific life goals, defined timelines, and suitable risk levels.",
                  },
                  {
                    q: "Who should consider goal-based financial planning?",
                    a: "Working professionals, business owners, families, and retirees can all benefit from structured financial planning.",
                  },
                  {
                    q: "How is goal-based planning different from traditional investing?",
                    a: "Traditional investing focuses mainly on returns, whereas goal-based planning focuses on achieving specific financial objectives.",
                  },
                  {
                    q: "What investment options are used in goal-based planning?",
                    a: "Mutual funds, SIPs, equities, insurance products, and tax-saving instruments are commonly used.",
                  },
                  {
                    q: "How often should a financial plan be reviewed?",
                    a: "A financial plan should ideally be reviewed once a year or after major life changes.",
                  },
                ].map((faq, i) => (
                  <div
                    key={i}
                    className="border-b border-orange-200 pb-6 last:border-0 last:pb-0"
                  >
                    <h4 className="text-slate-900 font-black mb-3">{faq.q}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Contact CTA */}
          <section className="mt-12">
            <div className="relative bg-slate-900 rounded-[3rem] p-12 overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent" />
              <div className="relative z-10">
                <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                  Ready to Start?
                </p>
                <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-6">
                  Talk to a Financial Expert
                </h3>
                <p className="text-slate-400 font-medium leading-relaxed max-w-xl mx-auto mb-10">
                  Let We Care Freedom Wealth help you build a personalised
                  goal-based financial plan tailored to your life and
                  aspirations.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest text-sm px-10 py-5 rounded-2xl transition-all shadow-xl hover:shadow-orange-500/30 group"
                >
                  Contact Us Today
                  <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};

export default GoalBasedPlanning;
