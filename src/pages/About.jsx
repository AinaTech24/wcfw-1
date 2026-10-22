import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

import groupImage from "../assets/groupimage.png";

import vasudev from "../assets/team/vasudev.png";
import geeta from "../assets/team/geeta.png";
import nikhil from "../assets/team/nikhil.png";
import megha from "../assets/team/megha.png";
import kamlesh from "../assets/team/kamlesh.png";
import dharmesh from "../assets/team/dharmesh.png";
import tushar from "../assets/team/tushar.png";
import dhruvik from "../assets/team/dhruvik.png";
import hetal from "../assets/team/hetal.png";
import chintal from "../assets/team/chintal.png";
import dhruvi from "../assets/team/dhruvi.png";
import rajesh from "../assets/team/rajesh.png";
import pratik from "../assets/team/pratik.png";
import prakash from "../assets/team/prakash.png";
import nishith from "../assets/team/nishith.png";
import meena from "../assets/team/meena.png";
import pravin from "../assets/team/pravin.png";
import pritesh from "../assets/team/pritesh.png";
import rahul from "../assets/team/rahul.png";
import vaidehi from "../assets/team/vaidehi.png";
import vijay from "../assets/team/vijay.png";
import useCMSContent from "../hooks/useCMSContent";
import useMetaTags from "../hooks/useMetaTags";

const About = () => {
  const { cmsContent, sectionOrder } = useCMSContent("about");

  useMetaTags(
    cmsContent["_seo"] || {
      title: "About Us | We Care Freedom Wealth",
      description:
        "Learn about We Care Freedom Wealth — our story, our team, and our mission to help you achieve financial freedom.",
      robotsTag: "index, follow",
    },
  );

  const foundingMembers = [
    {
      name: "Shri Vasudev Thakker",
      role: "Founder & Chairman",
      img: vasudev,
      exp: "35+ Years",
      bio: "Visionary leader who started the firm in 1989 with LIC and Post Office savings, later transforming it into a complete wealth creation platform.",
    },
    {
      name: "Lt. Smt. Geetaben Thakker",
      role: "Co-Founder",
      img: geeta,
      exp: "30+ Years",
      bio: "Co-founded the firm with unwavering dedication to helping families achieve financial security and peace of mind.",
    },
    {
      name: "Megha Thakker",
      role: "Director",
      img: megha,
      exp: "15+ Years",
      bio: "Dedicated to improving client experiences and maintaining We Care's value-driven service standards.",
    },
    {
      name: "Nikhil Thakkar",
      role: "Managing Director",
      img: nikhil,
      exp: "15+ Years",
      bio: "Leading the next generation of financial advisors with innovation, technology, and education-driven strategies.",
    },
  ];

  const headDepartment = [
    {
      name: "Nishit Pandya",
      role: "Financial Head",
      img: nishith,
      exp: "12+ Years",
      location: "Insurance & Risk Management",
      bio: "Expert in holistic protection planning and insurance advisory.",
      email: "nishit@wcfw.in",
      phone: "+91 98798 1221",
    },
    {
      name: "Dharmesh Kunadia",
      role: "Associate Partner",
      img: dharmesh,
      exp: "10+ Years",
      location: "Strategic Development",
      bio: "Focused on building scalable advisory systems and investor growth models.",
      email: "dharmesh@wcfw.in",
      phone: "+91 98798 1221",
    },
    {
      name: "Dhruvik Shah",
      role: "Associate Partner",
      img: dhruvik,
      exp: "9+ Years",
      location: "Financial Planning",
      bio: "Promotes financial happiness through structured SIP and goal-based planning.",
      email: "dhruvik@wcfw.in",
      phone: "+91 98798 1221",
    },
    {
      name: "Tushar Shah",
      role: "Associate Partner",
      img: tushar,
      exp: "8+ Years",
      location: "Client Membership",
      bio: "Ensures strong and long-lasting relationships with investors through personalised engagement.",
      email: "tushar@wcfw.in",
      phone: "+91 98798 1221",
    },
    {
      name: "Kamlesh Patel",
      role: "Associate Partner",
      img: kamlesh,
      exp: "10+ Years",
      location: "Administration & Operations",
      bio: "Handles multi-channel coordination, administration, and process improvement.",
      email: "kamlesh@wcfw.in",
      phone: "+91 98798 1221",
    },
    {
      name: "Hetal Mehta",
      role: "Back Office Head",
      img: hetal,
      exp: "8+ Years",
      location: "Operations & Client Support",
      bio: "Leads back-office operations ensuring smooth documentation and client service processes.",
      email: "hetal@wcfw.in",
      phone: "+91 98798 7757",
    },
    {
      name: "Rajesh Chauhan",
      role: "Associate Partner",
      img: rajesh,
      exp: "9+ Years",
      location: "Client Relations",
      bio: "Ensures consistent client engagement through periodic portfolio reviews.",
      email: "rajesh@wcfw.in",
      phone: "+91 98798 1221",
    },
    {
      name: "Prakash Machhi",
      role: "General Manager",
      img: prakash,
      exp: "12+ Years",
      location: "Insurance & Risk Planning",
      bio: "Expert in creating custom insurance portfolios and ensuring comprehensive coverage for clients.",
      email: "prakash@wcfw.in",
      phone: "+91 98798 1221",
    },
    {
      name: "Vaidehi Patel",
      role: "Operations Executive – Vadodara",
      img: vaidehi,
      exp: "6+ Years",
      location: "Branch Operations",
      bio: "Manages client servicing and documentation at Vadodara branch.",
      email: "vaidehi@wcfw.in",
      phone: "+91 98798 1221",
    },
    {
      name: "Pritesh Thakor",
      role: "IT Head",
      img: pritesh,
      exp: "7+ Years",
      location: "Technology & Automation",
      bio: "Heads the tech division, driving automation and CRM integration across business processes.",
      email: "pritesh@ainatech.in",
      phone: "+91 98741 50427",
    },
  ];

  const teamCategories = [
    {
      label: "Client Services",
      members: [
        { name: "Dhruvi Sheth", role: "Relationship Manager", img: dhruvi, exp: "5+ Years" },
        { name: "Chintal Patel", role: "Relationship Manager", img: chintal, exp: "5+ Years" },
        { name: "Meenaben Gohel", role: "Insurance Team", img: meena, exp: "8+ Years" },
      ],
    },
    {
      label: "Support & Operations",
      members: [
        { name: "Pravin Solanki", role: "Support Executive", img: pravin, exp: "6+ Years" },
        { name: "Rahul Solanki", role: "Support Executive", img: rahul, exp: "5+ Years" },
      ],
    },
    {
      label: "Equity & Research",
      members: [
        { name: "Vijay Vaghela", role: "Equity Team Member", img: vijay, exp: "7+ Years" },
        { name: "Pratik Shah", role: "Technical Operator", img: pratik, exp: "4+ Years" },
      ],
    },
  ];

  return (
    <div className="bg-[#f8fafc] font-sans selection:bg-orange-100 selection:text-orange-600">
      {/* Hero */}
      <section
        id="our-legacy"
        className="relative flex items-center min-h-[min(100vh,760px)] pt-24 overflow-hidden sm:pt-28 lg:pt-20 pb-14 sm:pb-20"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #ffe5bd 0%, #fffdf7 35%, #c7f1ff 100%)",
        }}
      >
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
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 mb-6 border rounded-full bg-orange-500/10 border-orange-500/20">
                <FaHistory className="text-sm text-orange-600" />
                <span className="text-orange-900 font-bold text-[11px] sm:text-xs uppercase tracking-[0.2em]">
                  Established 1989
                </span>
              </div>

              <h1 className="mb-6 text-4xl font-black leading-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900">
                Our <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                  Legacy.
                </span>
              </h1>

              <p className="max-w-xl mx-auto mb-8 text-base leading-relaxed sm:text-lg md:text-xl text-slate-700 lg:mx-0">
                For over 35 years, we've helped families navigate the complex
                world of finance with institutional precision and human-centric
                care.
              </p>

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

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="grid gap-5 sm:grid-cols-2"
            >
              <div className="p-6 border shadow-2xl sm:col-span-2 bg-white/70 backdrop-blur-xl rounded-3xl sm:p-8 border-white/50">
                <FaHandshake className="mb-5 text-4xl text-orange-500" />
                <h3 className="mb-4 text-2xl italic font-black leading-snug sm:text-3xl text-slate-900">
                  "Our Word is our Bond."
                </h3>
                <p className="text-xs font-bold tracking-widest uppercase text-slate-500">
                  WCFW Fundamental Protocol
                </p>
              </div>

              <div className="p-6 bg-white border shadow-xl rounded-3xl border-slate-100">
                <FaGem className="mb-4 text-3xl text-orange-500" />
                <h4 className="mb-2 text-lg font-black text-slate-900">Investment Services</h4>
                <p className="text-sm text-slate-500">
                  Structured investment services with disciplined approach.
                </p>
              </div>

              <div className="p-6 bg-white border shadow-xl rounded-3xl border-slate-100">
                <FaRocket className="mb-4 text-3xl text-orange-500" />
                <h4 className="mb-2 text-lg font-black text-slate-900">Growth Vision</h4>
                <p className="text-sm text-slate-500">
                  Helping families grow stronger financially.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic Ordered CMS Sections */}
      {(() => {
        const sectionMap = {
          "story-section": (
            <StorySection
              key="story-section"
              content={cmsContent["story-section"]}
            />
          ),
          "mission-vision": (
            <MissionVisionSection
              key="mission-vision"
              content={cmsContent["mission-vision"]}
            />
          ),
        };

        const defaultOrder = ["story-section", "mission-vision"];
        const orderToUse =
          sectionOrder && sectionOrder.length > 0
            ? sectionOrder.filter((key) => sectionMap[key])
            : defaultOrder;

        return orderToUse.map((key) => sectionMap[key]);
      })()}

      {/* Team Sections */}
      <div id="our-team">
        <div id="founding-members">
          <TeamSection
            title="Our Founding Members"
            subtitle="Visionary leaders who laid the foundation of WeCare Investment in 1989"
            icon={FaCrown}
            members={foundingMembers}
            columns="sm:grid-cols-2 lg:grid-cols-4"
          />
        </div>

        <div id="head-department">
          <TeamSection
            title="Head Department"
            subtitle="Leadership team driving our mission of financial literacy and client success"
            icon={FaBriefcase}
            members={headDepartment}
            columns="lg:grid-cols-3"
            showLocation
            showContact
          />
        </div>

        <div id="meet-our-team">
          <MeetOurTeamSection categories={teamCategories} />
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
              "Building Legacies, <br /> Together."
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-lg font-medium text-slate-500 sm:text-xl sm:mb-12">
              Ready to start your investment journey with suitable options
              aligned to your financial goals?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 text-sm font-black text-white transition-all transform shadow-2xl sm:px-12 sm:py-6 bg-slate-900 rounded-xl sm:rounded-2xl hover:bg-orange-600 hover:scale-105 group sm:text-base"
            >
              Get in Touch{" "}
              <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

// ── Team Section ─────────────────────────────────────────────────────────────
const TeamSection = ({
  title,
  subtitle,
  icon: Icon,
  members,
  columns = "lg:grid-cols-3",
  showLocation = false,
  showContact = false,
  centerAlign = false,
}) => (
  <section className="py-20">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <div className="inline-flex items-center px-4 py-2 mb-4 space-x-3 border rounded-full bg-orange-500/10 backdrop-blur-md border-orange-500/20">
          <Icon className="text-sm text-orange-600" />
          <span className="text-orange-900 font-bold text-xs uppercase tracking-[0.2em]">
            {subtitle}
          </span>
        </div>
        <h2 className="text-4xl font-extrabold sm:text-5xl text-slate-900">{title}</h2>
      </div>

      {centerAlign ? (
        <div className="flex flex-wrap justify-center max-w-4xl gap-8 mx-auto">
          {members.map((member, idx) => (
            <div key={idx} className="w-full sm:w-[calc(50%-1rem)] max-w-sm">
              <TeamCard member={member} index={idx} showLocation={showLocation} showContact={showContact} />
            </div>
          ))}
        </div>
      ) : (
        <div className={`grid sm:grid-cols-2 ${columns} gap-8 justify-items-center`}>
          {members.map((member, idx) => (
            <TeamCard key={idx} member={member} index={idx} showLocation={showLocation} showContact={showContact} />
          ))}
        </div>
      )}
    </div>
  </section>
);

// ── Team Card (original hover portrait design) ────────────────────────────────
const TeamCard = ({ member, index, showLocation, showContact }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-[2.5rem] border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden w-full max-w-[320px] mx-auto"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-[350px] bg-gradient-to-br from-orange-50 to-slate-50">
        <img
          src={member.img}
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
          <p className="mb-4 text-sm font-medium leading-relaxed">{member.bio}</p>
          {member.exp && (
            <div className="inline-flex items-center px-4 py-2 space-x-2 rounded-full bg-orange-600/90 backdrop-blur-sm w-fit">
              <FaGem className="text-xs" />
              <span className="text-xs font-black tracking-wider uppercase">{member.exp}</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col justify-center p-6">
        <h4 className="mb-1 text-lg font-black leading-tight text-slate-900">{member.name}</h4>
        <p className="mb-1 text-xs font-bold tracking-widest text-orange-600 uppercase">{member.role}</p>
        {showLocation && member.location && (
          <p className="flex items-center mb-1 text-xs font-semibold text-slate-500">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 shrink-0"></span>
            {member.location}
          </p>
        )}
        {showContact && member.email && (
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 mt-1"
          >
            <FaEnvelope size={10} className="shrink-0" /> {member.email}
          </a>
        )}
        {showContact && member.phone && (
          <a
            href={`tel:${member.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 mt-0.5"
          >
            <FaPhone size={10} className="shrink-0" /> {member.phone}
          </a>
        )}
      </div>

      <div className="absolute w-12 h-12 transition-opacity border-t-2 border-r-2 opacity-0 top-4 right-4 border-orange-500/20 rounded-tr-2xl group-hover:opacity-100"></div>
    </motion.div>
  );
};

// ── Meet Our Team (categorised, consistent design language) ──────────────────
const MeetOurTeamSection = ({ categories }) => (
  <section className="py-20 bg-slate-50">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <div className="inline-flex items-center px-4 py-2 mb-4 space-x-3 border rounded-full bg-orange-500/10 backdrop-blur-md border-orange-500/20">
          <FaUsers className="text-sm text-orange-600" />
          <span className="text-orange-900 font-bold text-xs uppercase tracking-[0.2em]">
            Dedicated professionals working together to serve our 4600+ families
          </span>
        </div>
        <h2 className="text-4xl font-extrabold sm:text-5xl text-slate-900">Meet Our Team</h2>
      </div>

      <div className="space-y-14">
        {categories.map((cat, cidx) => (
          <div key={cidx}>
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="flex items-center justify-center w-8 h-8 text-sm font-black text-white bg-orange-500 rounded-full shrink-0">
                {cidx + 1}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">{cat.label}</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {cat.members.map((m, idx) => (
                <div key={idx} className="w-full max-w-[320px]">
                  <TeamCard member={m} index={idx} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const MiniCard = ({ member, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className="bg-white rounded-[2rem] border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center text-center group w-[180px]"
  >
    <div className="w-20 h-20 mb-3 overflow-hidden transition-colors duration-300 border-2 border-orange-100 rounded-full group-hover:border-orange-400">
      <img
        src={member.img}
        alt={member.name}
        className="object-cover object-top w-full h-full"
      />
    </div>
    <h4 className="text-sm font-black leading-tight text-slate-900">{member.name}</h4>
    <p className="text-xs text-orange-600 font-bold mt-0.5">{member.role}</p>
    <p className="mt-1 text-xs text-slate-400">{member.exp}</p>
  </motion.div>
);

// ── Dynamic CMS Sections ──────────────────────────────────────────────────
const StorySection = ({ content }) => {
  const badge = content?.badge || "The Human Protocol";
  const title = content?.title || "From Vision to Institutional Reality";
  const p1 = content?.p1;
  const p2 = content?.p2;
  const highlight_title = content?.highlight_title || "The Gold Standard";
  const highlight_label = content?.highlight_label || "Quality Driven Services";
  const img_badge = content?.img_badge || "The Architecture of Trust";
  const img_title = content?.img_title || "Elite Team WCFW";

  return (
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
                <span className="text-orange-600 font-bold uppercase tracking-widest text-[10px] sm:text-sm">
                  {badge}
                </span>
              </div>
              <h2 className="mb-6 text-3xl font-extrabold leading-tight sm:text-5xl text-slate-900 sm:mb-8">
                {title.includes("<") ? (
                  <span dangerouslySetInnerHTML={{ __html: title }} />
                ) : title.includes("Institutional Reality") ? (
                  <>
                    From Vision to <br />
                    <span className="text-orange-600">Institutional Reality</span>
                  </>
                ) : (
                  title
                )}
              </h2>
              <div className="space-y-6 text-base font-medium leading-relaxed sm:space-y-8 text-slate-500 sm:text-lg">
                {p1 ? (
                  <div dangerouslySetInnerHTML={{ __html: p1 }} />
                ) : (
                  <p>
                    In 1989,{" "}
                    <span className="font-black text-slate-900">Shri Vasudev Thakker</span>{" "}
                    founded WeCare with a singular mission: to dismantle the barriers to
                    financial literacy. He believed wealth wasn't an end state, but a
                    vehicle for absolute independence.
                  </p>
                )}
                {p2 ? (
                  <div dangerouslySetInnerHTML={{ __html: p2 }} />
                ) : (
                  <p>
                    Today, that vision has transformed into an institutional powerhouse,
                    guiding over{" "}
                    <span className="font-black text-orange-600 underline decoration-orange-500 decoration-4 underline-offset-4">
                      10,000+ elite families
                    </span>{" "}
                    and managing a combined legacy of trust spanning generations.
                  </p>
                )}
              </div>

              <div className="flex items-center mt-8 space-x-4 sm:mt-12 sm:space-x-6">
                <div className="flex items-center justify-center w-12 h-12 text-white shadow-xl sm:w-16 sm:h-16 bg-slate-900 rounded-xl sm:rounded-2xl shadow-slate-900/20">
                  <FaGem className="text-xl sm:text-2xl" />
                </div>
                <div>
                  <p className="text-lg font-black text-slate-900 sm:text-xl">{highlight_title}</p>
                  <p className="text-slate-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">
                    {highlight_label}
                  </p>
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
                  <p className="mb-1 text-xs font-black tracking-widest text-orange-400 uppercase sm:text-sm sm:mb-2">
                    {img_badge}
                  </p>
                  <p className="text-xl font-bold leading-tight text-white sm:text-2xl">
                    {img_title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const MissionVisionSection = ({ content }) => {
  const missionTitle = content?.missionTitle || "Our Mission";
  const missionText =
    content?.missionText ||
    'To cultivate <span class="text-white">absolute financial literacy</span> across the sub-continent, enabling families to support informed financial decision-making through disciplined investment approaches.';
  const visionTitle = content?.visionTitle || "Our Vision";
  const visionText =
    content?.visionText ||
    'Reach <span class="text-white">1,000,000 individual lives</span> through accessible investment services and financial awareness initiatives.';

  return (
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
            <h3 className="mb-4 text-2xl font-black tracking-tight text-white uppercase sm:text-3xl sm:mb-6">
              {missionTitle}
            </h3>
            <div
              className="text-lg font-medium leading-relaxed text-slate-400 sm:text-xl"
              dangerouslySetInnerHTML={{ __html: missionText }}
            />
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/5 backdrop-blur-md rounded-[2rem] sm:rounded-[3rem] p-10 sm:p-16 border border-white/10 group"
          >
            <div className="flex items-center justify-center w-16 h-16 mb-6 transition-transform border sm:w-20 sm:h-20 bg-white/10 rounded-2xl sm:rounded-3xl sm:mb-10 border-white/20 group-hover:scale-110">
              <FaEye className="text-2xl text-orange-500 sm:text-3xl" />
            </div>
            <h3 className="mb-4 text-2xl font-black tracking-tight text-white uppercase sm:text-3xl sm:mb-6">
              {visionTitle}
            </h3>
            <div
              className="text-lg font-medium leading-relaxed text-slate-400 sm:text-xl"
              dangerouslySetInnerHTML={{ __html: visionText }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
