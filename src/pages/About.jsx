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
  FaChartLine,
} from "react-icons/fa";

import groupImage from "../assets/groupimage.png";

// Import all team images
import vasudev from "../assets/team/vasudev.png";
import geeta from "../assets/team/geeta.png";
import nikhil from "../assets/team/nikhil.png";
import megha from "../assets/team/megha.png";
import priyang from "../assets/team/priyang.png";
import dwij from "../assets/team/dwij.png";
import kamlesh from "../assets/team/kamlesh.png";
import hraday from "../assets/team/hraday.png";
import dharmesh from "../assets/team/dharmesh.png";
import tushar from "../assets/team/tushar.png";
import dhruvik from "../assets/team/dhruvik.png";
import pavan from "../assets/team/pavan.jpeg";
import hetal from "../assets/team/hetal.png";
import chintal from "../assets/team/chintal.png";
import dhruvi from "../assets/team/dhruvi.png";
import rajesh from "../assets/team/rajesh.png";
import rohan from "../assets/team/rohan.png";
import hari from "../assets/team/hari.png";
import pratik from "../assets/team/pratik.png";
import prakash from "../assets/team/prakash.png";
import nishith from "../assets/team/nishith.png";
import amitArora from "../assets/team/amit.png";

const About = () => {
  // Team Data Structure
  const foundingMembers = [
    {
      name: "Vasudev Thakkar",
      role: "Founder & Chairman",
      img: vasudev,
      exp: "35+ Years",
      bio: "Established the firm in 1989 with a vision to democratize financial literacy and empower families across India.",
    },
    {
      name: "Late Smt. Geetaben Thakkar",
      role: "Co-Founder",
      img: geeta,
      exp: "30+ Years",
      bio: "The heart of our client-centric philosophy and relationship building. Her legacy continues to inspire our values.",
    },
  ];

  const directors = [
    {
      name: "Nikhil Thakkar",
      role: "Managing Director",
      img: nikhil,
      exp: "15+ Years",
      bio: "Leading the firm's strategic expansion and digital-first investment services model with institutional precision.",
    },
    {
      name: "Megha Thakkar",
      role: "Director",
      img: megha,
      exp: "12+ Years",
      bio: "Ensuring operational excellence and superior client experience across all touchpoints.",
    },
    {
      name: "Priyang Patel",
      role: "Director",
      img: priyang,
      exp: "10+ Years",
      bio: "Driving innovation in investment services and client portfolio review processes.",
    },
    {
      name: "Dwij Thakkar",
      role: "Director",
      img: dwij,
      exp: "8+ Years",
      bio: "Spearheading technology integration and next-generation financial solutions.",
    },
  ];

  const leadership = [
    {
      name: "Kamlesh Patel",
      role: "Deputy Manager (Sales Support)",
      img: kamlesh,
      location: "Corporate Office",
      bio: "Orchestrating operational excellence and strategic execution across all business verticals.",
    },
    {
      name: "Dr. H. K. Desai",
      role: "Chief Operating Officer",
      img: hraday,
      location: "Advisory Board",
      bio: "Providing institutional experience and strategic direction for long-term business initiatives.",
    },
    {
      name: "Hetal Mehta",
      role: "Deputy Manager - Customer Relationship",
      img: hetal,
      location: "Corporate Office",
      bio: "Ensuring seamless sales operations and client onboarding excellence.",
    },
  ];

  const associatePartners = [
    {
      name: "Rajesh Chauhan",
      role: "Associate Partner",
      img: rajesh,
      location: "Anand",
      bio: "Specializing in retirement solution and wealth preservation strategies.",
    },
    {
      name: "Tushar Shah",
      role: "Associate Partner",
      img: tushar,
      location: "Vadodara",
      bio: "Driving business growth and client satisfaction in the Vadodara market.",
    },
    {
      name: "Dharmesh Kunadia",
      role: "Associate Partner",
      img: dharmesh,
      location: "Anand",
      bio: "Leading client acquisition and relationship management in the Anand region.",
    },
    {
      name: "Dhruvik Shah",
      role: "Associate Partner",
      img: dhruvik,
      location: "Ahmedabad",
      bio: "Managing high-net-worth client portfolios and strategic partnerships in Ahmedabad.",
    },
    {
      name: "Pavan Sachdeva",
      role: "Associate Partner",
      img: pavan,
      location: "Delhi",
      bio: "Expanding our footprint in the Delhi NCR region with investment-related services.",
    },
    {
      name: "Amit Arora",
      role: "Associate Partner",
      img: amitArora,
      location: "Delhi",
      bio: "Driving strategic partnerships and business expansion initiatives.",
    },
  ];

  const insuranceHeads = [
    {
      name: "Prakash Machhi",
      role: "Associate Partner (Insurance - Personal Line)",
      img: prakash,
      location: "Corporate Office",
      bio: "Focusing on retirement-oriented investment options and capital preservation approaches.",
    },
    {
      name: "Nishith Pandya",
      role: "Associate Partner (Insurance - Commercial Line)",
      img: nishith,
      location: "Corporate Office",
      bio: "Handling commercial insurance solutions and risk coverage services.",
    },
  ];

  const relationshipManagers = [
    {
      name: "Chintal Patel",
      role: "Relationship Manager",
      img: chintal,
      bio: "Dedicated to building long-term client relationships and supporting investment needs.",
    },
    {
      name: "Dhruvi Sheth",
      role: "Relationship Manager",
      img: dhruvi,
      bio: "Assisting with investment processes and portfolio review support.",
    },
    {
      name: "Rohan Goswami",
      role: "Relationship Manager",
      img: rohan,
      bio: "Focused on goal-based investing and investment-related services.",
    },
    {
      name: "Harikrushna Gadhvi",
      role: "Relationship Manager",
      img: hari,
      bio: "Experienced in mutual fund distribution and systematic investment processes.",
    },
  ];

  const equityHead = [
    {
      name: "Pratik Shah",
      role: "Equity Head",
      img: pratik,
      bio: "Conducting market analysis for internal research and insights.",
    },
  ];

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
                  Investment Services
                </h4>
                <p className="text-sm text-slate-500">
                  Structured investment services with disciplined approach.
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
      <section id="our-story" className="py-24 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] p-8 sm:p-20 border border-slate-100"
          >
            <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-6 sm:mb-8">
                  <span className="h-px w-8 sm:w-12 bg-orange-500"></span>
                  <span className="text-orange-600 font-bold uppercase tracking-widest text-[10px] sm:text-sm">
                    The Human Protocol
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6 sm:mb-8 leading-tight">
                  From Vision to <br />
                  <span className="text-orange-600">Institutional Reality</span>
                </h2>
                <div className="space-y-6 sm:space-y-8 text-slate-500 text-base sm:text-lg leading-relaxed font-medium">
                  <p>
                    In 1989,{" "}
                    <span className="text-slate-900 font-black">
                      Shri Vasudev Thakker
                    </span>{" "}
                    founded WeCare with a singular mission: to dismantle the
                    barriers to financial literacy. He believed wealth wasn't an
                    end state, but a vehicle for absolute independence.
                  </p>
                  <p>
                    Today, that vision has transformed into an institutional
                    powerhouse, guiding over{" "}
                    <span className="text-orange-600 font-black underline decoration-orange-500 decoration-4 underline-offset-4">
                      10,000+ elite families
                    </span>{" "}
                    and managing a combined legacy of trust spanning
                    generations.
                  </p>
                </div>

                <div className="mt-8 sm:mt-12 flex items-center space-x-4 sm:space-x-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-900 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-900/20">
                    <FaGem className="text-xl sm:text-2xl" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-black text-lg sm:text-xl">
                      The Gold Standard
                    </p>
                    <p className="text-slate-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">
                      Quality Driven Services
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
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                    <p className="text-orange-400 font-black text-xs sm:text-sm uppercase tracking-widest mb-1 sm:mb-2">
                      The Architecture of Trust
                    </p>
                    <p className="text-white text-xl sm:text-2xl font-bold leading-tight">
                      Elite Team WCFW
                    </p>
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-md rounded-[2rem] sm:rounded-[3rem] p-10 sm:p-16 border border-white/10 group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-10 shadow-2xl shadow-orange-600/20 group-hover:scale-110 transition-transform">
                <FaRocket className="text-white text-2xl sm:text-3xl" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 sm:mb-6 uppercase tracking-tight">
                Our Mission
              </h3>
              <p className="text-slate-400 text-lg sm:text-xl leading-relaxed font-medium">
                To cultivate{" "}
                <span className="text-white">absolute financial literacy</span>{" "}
                across the sub-continent, enabling families to support informed
                financial decision-making through disciplined investment
                approaches.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-md rounded-[2rem] sm:rounded-[3rem] p-10 sm:p-16 border border-white/10 group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-10 border border-white/20 group-hover:scale-110 transition-transform">
                <FaEye className="text-orange-500 text-2xl sm:text-3xl" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 sm:mb-6 uppercase tracking-tight">
                Our Vision
              </h3>
              <p className="text-slate-400 text-lg sm:text-xl leading-relaxed font-medium">
                Reach{" "}
                <span className="text-white">1,000,000 individual lives</span>{" "}
                through accessible investment services and financial awareness
                initiatives.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founding Members */}
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

        {/* Directors */}
        <div id="directors">
          <TeamSection
            title="Board of Directors"
            subtitle="Strategic Leadership"
            icon={FaBriefcase}
            members={directors}
            columns="lg:grid-cols-4"
          />
        </div>

        {/* Leadership */}
        <div id="leadership">
          <TeamSection
            title="Senior Executives"
            subtitle="Operational Excellence"
            icon={FaUsers}
            members={leadership}
            columns="lg:grid-cols-3"
          />
        </div>

        {/* Associate Partners */}
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

        {/* Insurance Head */}
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

        {/* Equity Head */}
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

        {/* Relationship Managers */}
        <div id="relationship-managers">
          <TeamSection
            title="Relationship Managers"
            subtitle="Your Relationship Managers"
            icon={FaHandshake}
            members={relationshipManagers}
            columns="lg:grid-cols-4"
          />
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="py-12 sm:py-24 relative overflow-hidden text-center max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-10 sm:p-24 rounded-[3rem] sm:rounded-[4rem] border border-slate-100 shadow-2xl relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-6xl font-black text-slate-900 mb-6 sm:mb-8 leading-tight italic decoration-orange-500 decoration-8 underline-offset-8">
              "Building Legacies, <br /> Together."
            </h2>
            <p className="text-slate-500 text-lg sm:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto font-medium">
              Ready to start your investment journey with suitable options
              aligned to your financial goals?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 sm:px-12 sm:py-6 bg-slate-900 text-white font-black rounded-xl sm:rounded-2xl shadow-2xl hover:bg-orange-600 transition-all transform hover:scale-105 group text-sm sm:text-base"
            >
              Get in Touch{" "}
              <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 bg-orange-500/10 backdrop-blur-md border border-orange-500/20 px-4 py-2 rounded-full mb-4">
            <Icon className="text-orange-600 text-sm" />
            <span className="text-orange-900 font-bold text-xs uppercase tracking-[0.2em]">
              {subtitle}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
            {title}
          </h2>
        </div>

        {centerAlign ? (
          // Centered layout for 2-member sections
          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
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
          // Regular grid layout for other sections
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

// Team Card Component with Hover Effect
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
      {/* Image Container - Fixed height for uniformity */}
      <div className="relative overflow-hidden h-[350px] bg-gradient-to-br from-orange-50 to-slate-50">
        <img
          src={member.img}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
          alt={member.name}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Hover Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col justify-end p-6 text-white"
        >
          <p className="text-sm leading-relaxed font-medium mb-4">
            {member.bio}
          </p>
          {member.exp && (
            <div className="inline-flex items-center space-x-2 bg-orange-600/90 backdrop-blur-sm px-4 py-2 rounded-full w-fit">
              <FaGem className="text-xs" />
              <span className="text-xs font-black uppercase tracking-wider">
                {member.exp}
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Info Section - Fixed height for uniformity */}
      <div className="p-6 h-[120px] flex flex-col justify-center">
        <h4 className="text-slate-900 font-black text-lg leading-tight mb-1">
          {member.name}
        </h4>
        <p className="text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
          {member.role}
        </p>
        {showLocation && member.location && (
          <p className="text-slate-500 text-xs font-semibold flex items-center">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
            {member.location}
          </p>
        )}
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-orange-500/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  );
};

export default About;
