import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaEye,
  FaHandshake,
  FaArrowRight,
  FaHistory,
  FaGem,
  FaCrown,
  FaUsers,
  FaBriefcase,
  FaChartLine,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import groupImage from "../assets/groupimage.png";

// Import all team images

import useCMSContent from "../hooks/useCMSContent";
import useMetaTags from "../hooks/useMetaTags";
import useTeam from "../hooks/useTeam";

const About = () => {
  const { teamMembers } = useTeam();
  const { cmsContent } = useCMSContent("about");

  // 🔥 Safety layer
  const safeTeamMembers = Array.isArray(teamMembers) ? teamMembers : [];

  // Filter team by categories
  const foundingMembers = safeTeamMembers.filter(
    (m) => m.category === "founding" && m.isActive,
  );

  const directors = safeTeamMembers.filter(
    (m) => m.category === "director" && m.isActive,
  );

  const leadership = safeTeamMembers.filter(
    (m) => m.category === "leadership" && m.isActive,
  );

  const associatePartners = safeTeamMembers.filter(
    (m) => m.category === "associate_partner" && m.isActive,
  );

  const insuranceHeads = safeTeamMembers.filter(
    (m) => m.category === "insurance_head" && m.isActive,
  );

  const relationshipManagers = safeTeamMembers.filter(
    (m) => m.category === "rm" && m.isActive,
  );

  const equityHead = safeTeamMembers.filter(
    (m) => m.category === "equity_head" && m.isActive,
  );

  // SEO Hook
  useMetaTags(
    cmsContent["_seo"] || {
      title: "About Us | We Care Freedom Wealth",
      description:
        "Learn about our 35-year legacy of building trust and wealth.",
      robotsTag: "index, follow",
    },
  );

  return (
    <div className="bg-[#f8fafc] font-sans selection:bg-orange-100 selection:text-orange-600">
      {/* Cinematic Light Header */}
      <section
        id="our-legacy"
        className="relative flex items-center min-h-screen pt-24 overflow-hidden sm:pt-28 lg:pt-20 pb-14 sm:pb-20"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #ffe5bd 0%, #fffdf7 35%, #c7f1ff 100%)",
        }}
      >
        {/* Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_100%)]"></div>

          <img
            src={groupImage}
            alt="Legacy"
            className="absolute top-0 right-0 object-cover w-full h-full lg:w-1/2 opacity-10 grayscale mix-blend-multiply"
          />
        </div>

        <div className="relative z-10 w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2 mb-6 border rounded-full bg-orange-500/10 border-orange-500/20">
                <FaHistory className="text-sm text-orange-600" />
                <span className="text-orange-900 font-bold text-[11px] sm:text-xs uppercase tracking-[0.2em]">
                  Established 1989
                </span>
              </div>

              {/* Heading */}
              <h1 className="mb-6 text-4xl font-black leading-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900">
                Our <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                  Legacy.
                </span>
              </h1>

              {/* Paragraph */}
              <p className="max-w-xl mx-auto mb-8 text-base leading-relaxed sm:text-lg md:text-xl text-slate-700 lg:mx-0">
                For over 35 years, we've helped families navigate the complex
                world of finance with institutional precision and human-centric
                care.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 lg:justify-start sm:gap-10">
                <div>
                  <h3 className="text-3xl font-black text-slate-900">35+</h3>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                    Years of Trust
                  </p>
                </div>

                <div className="hidden w-px h-12 sm:block bg-slate-300"></div>

                <div>
                  <h3 className="text-3xl font-black text-orange-600">10K+</h3>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                    Families Protected
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE CARDS */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="grid gap-5 sm:grid-cols-2"
            >
              {/* Main Quote Card */}
              <div className="p-6 border shadow-2xl sm:col-span-2 bg-white/70 backdrop-blur-xl rounded-3xl sm:p-8 border-white/50">
                <FaHandshake className="mb-5 text-4xl text-orange-500" />

                <h3 className="mb-4 text-2xl italic font-black leading-snug sm:text-3xl text-slate-900">
                  "Our Word is our Bond."
                </h3>

                <p className="text-xs font-bold tracking-widest uppercase text-slate-500">
                  WCFW Fundamental Protocol
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-6 bg-white border shadow-xl rounded-3xl border-slate-100">
                <FaGem className="mb-4 text-3xl text-orange-500" />
                <h4 className="mb-2 text-lg font-black text-slate-900">
                  Premium Advisory
                </h4>
                <p className="text-sm text-slate-500">
                  Strategic planning with elite wealth solutions.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-6 bg-white border shadow-xl rounded-3xl border-slate-100">
                <FaRocket className="mb-4 text-3xl text-orange-500" />
                <h4 className="mb-2 text-lg font-black text-slate-900">
                  Growth Vision
                </h4>
                <p className="text-sm text-slate-500">
                  Helping families grow stronger financially.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story & Evolution */}
      <section id="our-story" className="relative z-20 py-24 -mt-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] p-8 sm:p-20 border border-slate-100"
          >
            <div className="grid items-center gap-10 lg:grid-cols-2 sm:gap-16">
              <div>
                <div className="flex items-center mb-6 space-x-4 sm:mb-8">
                  <span className="w-8 h-px bg-orange-500 sm:w-12"></span>
                  <div
                    className="text-orange-600 font-bold uppercase tracking-widest text-[10px] sm:text-sm"
                    dangerouslySetInnerHTML={{
                      __html:
                        cmsContent["story-section"]?.badge ||
                        "The Human Protocol",
                    }}
                  />
                </div>
                <h2 className="mb-6 text-3xl font-extrabold leading-tight sm:text-5xl text-slate-900 sm:mb-8">
                  {cmsContent["story-section"]?.title ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: cmsContent["story-section"].title.replace(
                          /Institutional Reality/g,
                          '<span class="text-orange-600">Institutional Reality</span>',
                        ),
                      }}
                    />
                  ) : (
                    <>
                      From Vision to <br />{" "}
                      <span className="text-orange-600">
                        Institutional Reality
                      </span>
                    </>
                  )}
                </h2>
                <div className="space-y-6 text-base font-medium leading-relaxed sm:space-y-8 text-slate-500 sm:text-lg">
                  {cmsContent["story-section"]?.p1 ? (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: cmsContent["story-section"].p1,
                      }}
                    />
                  ) : (
                    <p>
                      In 1989,{" "}
                      <span className="font-black text-slate-900">
                        Shri Vasudev Thakker
                      </span>{" "}
                      founded WeCare with a singular mission: to dismantle the
                      barriers to financial literacy. He believed wealth wasn't
                      an end state, but a vehicle for absolute independence.
                    </p>
                  )}
                  {cmsContent["story-section"]?.p2 ? (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: cmsContent["story-section"].p2,
                      }}
                    />
                  ) : (
                    <p>
                      Today, that vision has transformed into an institutional
                      powerhouse, guiding over{" "}
                      <span className="font-black text-orange-600 underline decoration-orange-500 decoration-4 underline-offset-4">
                        10,000+ elite families
                      </span>{" "}
                      and managing a combined legacy of trust spanning
                      generations.
                    </p>
                  )}
                </div>

                <div className="flex items-center mt-8 space-x-4 sm:mt-12 sm:space-x-6">
                  <div className="flex items-center justify-center w-12 h-12 text-white shadow-xl sm:w-16 sm:h-16 bg-slate-900 rounded-xl sm:rounded-2xl shadow-slate-900/20">
                    <FaGem className="text-xl sm:text-2xl" />
                  </div>
                  <div>
                    <div
                      className="text-lg font-black text-slate-900 sm:text-xl"
                      dangerouslySetInnerHTML={{
                        __html:
                          cmsContent["story-section"]?.highlight_title ||
                          "The Gold Standard",
                      }}
                    />
                    <div
                      className="text-slate-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest"
                      dangerouslySetInnerHTML={{
                        __html:
                          cmsContent["story-section"]?.highlight_label ||
                          "Quality Driven Advisory",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/5 blur-[80px] rounded-full"></div>
                <div className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-4 sm:border-8 border-white group">
                  <img
                    src={groupImage}
                    alt="Our Team"
                    className="object-cover w-full h-full transition-all duration-700 grayscale hover:grayscale-0 hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                    <div
                      className="mb-1 text-xs font-black tracking-widest text-orange-400 uppercase sm:text-sm sm:mb-2"
                      dangerouslySetInnerHTML={{
                        __html:
                          cmsContent["story-section"]?.img_badge ||
                          "The Architecture of Trust",
                      }}
                    />
                    <div
                      className="text-xl font-bold leading-tight text-white sm:text-2xl"
                      dangerouslySetInnerHTML={{
                        __html:
                          cmsContent["story-section"]?.img_title ||
                          "Elite Team WCFW",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        id="mission-vision"
        className="py-12 sm:py-24 bg-[#0f172a] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full w-96 h-96 bg-orange-600/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 rounded-full w-96 h-96 bg-blue-600/10 blur-3xl"></div>

        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 sm:gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-md rounded-[2rem] sm:rounded-[3rem] p-10 sm:p-16 border border-white/10 group"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-6 transition-transform bg-orange-600 shadow-2xl sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl sm:mb-10 shadow-orange-600/20 group-hover:scale-110">
                <FaRocket className="text-2xl text-white sm:text-3xl" />
              </div>
              <div
                className="mb-4 text-2xl font-black tracking-tight text-white uppercase sm:text-3xl sm:mb-6"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["mission-vision"]?.missionTitle || "Our Mission",
                }}
              />
              <p className="text-lg font-medium leading-relaxed text-slate-400 sm:text-xl">
                {cmsContent["mission-vision"]?.missionText ? (
                  <span
                    className="inline-block cms-content"
                    dangerouslySetInnerHTML={{
                      __html: cmsContent["mission-vision"].missionText,
                    }}
                  />
                ) : (
                  <>
                    To cultivate{" "}
                    <span className="text-white">
                      absolute financial literacy
                    </span>{" "}
                    across the sub-continent, enabling families to secure a
                    stress-free existence through scientific capital engineering
                    and disciplined deployment.
                  </>
                )}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-md rounded-[2rem] sm:rounded-[3rem] p-10 sm:p-16 border border-white/10 group"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-6 transition-transform border sm:w-20 sm:h-20 bg-white/10 rounded-2xl sm:rounded-3xl sm:mb-10 border-white/20 group-hover:scale-110">
                <FaEye className="text-2xl text-orange-500 sm:text-3xl" />
              </div>
              <div
                className="mb-4 text-2xl font-black tracking-tight text-white uppercase sm:text-3xl sm:mb-6"
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["mission-vision"]?.visionTitle || "Our Vision",
                }}
              />
              <p className="text-lg font-medium leading-relaxed text-slate-400 sm:text-xl">
                {cmsContent["mission-vision"]?.visionText ? (
                  <span
                    className="inline-block cms-content"
                    dangerouslySetInnerHTML={{
                      __html: cmsContent["mission-vision"].visionText,
                    }}
                  />
                ) : (
                  <>
                    To empower{" "}
                    <span className="text-white">
                      1,000,000 individual lives
                    </span>{" "}
                    with sophisticated financial wisdom by 2025, architecting a
                    sustainable roadmap for generational prosperity.
                  </>
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Sections - Preserve static data for now, text sections are dynamic above */}
      <div id="our-team">
        <div id="founding-members">
          <TeamSection
            title="Founders"
            subtitle="Visionaries Who Started It All"
            icon={FaCrown}
            members={foundingMembers}
            columns="lg:grid-cols-4"
            centerAlign
          />
        </div>

        <div id="directors">
          <TeamSection
            title="Board of Directors"
            subtitle="Strategic Leadership"
            icon={FaBriefcase}
            members={directors}
            columns="lg:grid-cols-4"
          />
        </div>

        <div id="leadership">
          <TeamSection
            title="Senior Executives"
            subtitle="Operational Excellence"
            icon={FaUsers}
            members={leadership}
            columns="lg:grid-cols-3"
          />
        </div>

        <div id="associate-partners">
          <TeamSection
            title="Associate Partners"
            subtitle="Regional & Functional Leaders"
            icon={FaBriefcase}
            members={associatePartners}
            columns="lg:grid-cols-3"
            showLocation
          />
        </div>

        <div id="insurance-head">
          <TeamSection
            title="Associate Partner (Insurance)"
            subtitle="Risk Management & Protection"
            icon={FaBriefcase}
            members={insuranceHeads}
            columns="lg:grid-cols-2"
            centerAlign
          />
        </div>

        <div id="equity-head">
          <TeamSection
            title="Equity Team"
            subtitle="Market Intelligence"
            icon={FaChartLine}
            members={equityHead}
            columns="lg:grid-cols-3"
            centerAlign
          />
        </div>

        <div id="relationship-managers">
          <TeamSection
            title="Relationship Managers"
            subtitle="Your Trusted Advisors"
            icon={FaHandshake}
            members={relationshipManagers}
            columns="lg:grid-cols-4"
          />
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="relative max-w-5xl px-4 py-12 mx-auto overflow-hidden text-center sm:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-10 sm:p-24 rounded-[3rem] sm:rounded-[4rem] border border-slate-100 shadow-2xl relative"
        >
          <div className="absolute top-0 w-48 h-48 -translate-x-1/2 rounded-full left-1/2 bg-orange-500/5 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="mb-6 text-3xl italic font-black leading-tight sm:text-6xl text-slate-900 sm:mb-8 decoration-orange-500 decoration-8 underline-offset-8">
              {cmsContent["cta-section"]?.title ? (
                <span
                  className="inline-block cms-content"
                  dangerouslySetInnerHTML={{
                    __html: cmsContent["cta-section"].title,
                  }}
                />
              ) : (
                <>
                  "Building Legacies, <br /> Together."
                </>
              )}
            </h2>
            <div
              className="max-w-2xl mx-auto mb-8 text-lg font-medium text-slate-500 sm:text-xl sm:mb-12 cms-content"
              dangerouslySetInnerHTML={{
                __html:
                  cmsContent["cta-section"]?.description ||
                  "Ready to architect your own financial legacy? Let's build a future where your capital works for your vision.",
              }}
            />
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 text-sm font-black text-white transition-all transform shadow-2xl sm:px-12 sm:py-6 bg-slate-900 rounded-xl sm:rounded-2xl hover:bg-orange-600 hover:scale-105 group sm:text-base"
            >
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    cmsContent["cta-section"]?.btnText ||
                    "Schedule a Vision Meeting",
                }}
              />{" "}
              <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

// Team Section Component
const TeamSection = ({
  title,
  subtitle,
  icon: Icon,
  members,
  columns = "lg:grid-cols-3",
  showLocation = false,
  centerAlign = false,
}) => {
  return (
    <section className="py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center px-4 py-2 mb-4 space-x-3 border rounded-full bg-orange-500/10 backdrop-blur-md border-orange-500/20">
            <Icon className="text-sm text-orange-600" />
            <span className="text-orange-900 font-bold text-xs uppercase tracking-[0.2em]">
              {subtitle}
            </span>
          </div>
          <h2 className="text-4xl font-extrabold sm:text-5xl text-slate-900">
            {title}
          </h2>
        </div>

        {centerAlign ? (
          <div className="flex flex-wrap justify-center max-w-4xl gap-8 mx-auto">
            {members.map((member, idx) => (
              <div key={idx} className="w-full sm:w-[calc(50%-1rem)] max-w-sm">
                <TeamCard
                  member={member}
                  index={idx}
                  showLocation={showLocation}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`grid sm:grid-cols-2 ${columns} gap-8 justify-items-center`}
          >
            {members.map((member, idx) => (
              <TeamCard
                key={idx}
                member={member}
                index={idx}
                showLocation={showLocation}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Team Card Component
const TeamCard = ({ member, index, showLocation }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-[2.5rem] border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden w-full max-w-[280px] mx-auto"
    >
      <div className="relative overflow-hidden h-[350px] bg-gradient-to-br from-orange-50 to-slate-50">
        <img
          src={member.image}
          className="object-cover object-top w-full h-full transition-transform duration-700 group-hover:scale-110"
          alt={member.name}
        />
        <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent group-hover:opacity-100"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col justify-end p-6 text-white"
        >
          <p className="mb-4 text-sm font-medium leading-relaxed">
            {member.bio}
          </p>
        </motion.div>
      </div>

      <div className="p-6 h-[120px] flex flex-col justify-center">
        <h4 className="mb-1 text-lg font-black leading-tight text-slate-900">
          {member.name}
        </h4>
        <p className="mb-2 text-xs font-bold tracking-widest text-orange-600 uppercase">
          {member.designation}
        </p>
        {showLocation && member.location && (
          <p className="flex items-center text-xs font-semibold text-slate-500">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
            {member.location}
          </p>
        )}
      </div>
      <div className="absolute w-12 h-12 transition-opacity border-t-2 border-r-2 opacity-0 top-4 right-4 border-orange-500/20 rounded-tr-2xl group-hover:opacity-100"></div>
    </motion.div>
  );
};

export default About;
