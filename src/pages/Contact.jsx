import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import {
  FaWhatsapp,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaPaperPlane,
  FaFacebook,
  FaTwitter,
  FaHeadset,
  FaGlobe,
  FaShieldAlt,
  FaArrowRight,
  FaHeadphones,
} from "react-icons/fa";
import useCMSContent from "../hooks/useCMSContent";
import useMetaTags from "../hooks/useMetaTags";

import CustomSelect from "../components/CustomSelect";

const Contact = () => {
  const { cmsContent } = useCMSContent("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, control } = useForm();

  // SEO Hook
  useMetaTags(
    cmsContent["_seo"] || {
      title: "Contact Us | We Care Freedom Wealth",
      description: "Get in touch with our financial advisors.",
      robotsTag: "index, follow",
    },
  );

  const officeLocations = [
    {
      city: "Anand HQ",
      address: "312 - 316, Krishna Shrey Complex, Raj Marg, Anand - 388001",
      phone: "+91 93772 77703",
      email: "info@wcfw.in",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d147.95806132827518!2d72.943892!3d22.5658472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4fd40a134a8d%3A0x9cec1ba95b807341!2sWe%20Care%20Freedom%20Wealth%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1697074456145!5m2!1sen!2sin",
    },
    {
      city: "Vadodara",
      address: "304-306, The Park, Above Nexa, Akshar Chowk, Vadodara - 390020",
      phone: "+91 98241 43812",
      email: "tushar@wcfw.in",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.2!2d73.1812!3d22.3072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE4JzI2LjAiTiA3M8KwMTAnNTIuMyJF!5e0!3m2!1sen!2sin!4v1696920000000!5m2!1sen!2sin",
    },
    {
      city: "Ahmedabad",
      address:
        "301, Anam 1, Nr. Parimal Garden, Off. C G Road, Ahmedabad - 380006",
      phone: "+91 72840 47366",
      email: "dhruvik@wcfw.in",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.1!2d72.5566!3d23.0340!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAyJzAyLjQiTiA3MsKwMzMnMjMuOCJF!5e0!3m2!1sen!2sin!4v1696920000000!5m2!1sen!2sin",
    },
    {
      city: "Delhi",
      address: "505, Mansarover Building, Nehru Place, New Delhi - 110019",
      phone: "+91 98100 31561",
      email: "pavan@wcfw.in",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.522458072756!2d77.25075447527322!3d28.55145188888571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce36d49e45b33%3A0xa704474671d18209!2sMansarover%20Building%2C%20Nehru%20Place%2C%20New%20Delhi%2C%20Delhi%20110019!5e0!3m2!1sen!2sin!4v1707500000000!5m2!1sen!2sin",
    },
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post("/api/enquiry", data);
      alert(
        "Thank you! Your enquiry has been received. Our team will contact you shortly.",
      );
      reset();
    } catch (err) {
      console.error("Error submitting enquiry:", err);
      alert("Failed to submit enquiry. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] selection:bg-orange-100 selection:text-orange-600">
      {/* Cinematic Light Header */}
      <section
        className="relative pb-24 overflow-hidden pt-28 sm:pt-32 sm:pb-28"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #fff4e4 0%, #ffffff 40%, #eaf9ff 100%)",
        }}
      >
        {/* Background Blur Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 rounded-full w-72 h-72 bg-orange-400/10 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 rounded-full w-96 h-96 bg-sky-400/10 blur-3xl"></div>
          <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-80 h-80 bg-orange-300/10 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 bg-white border border-orange-100 rounded-full shadow-md">
              <FaHeadphones className="text-sm text-orange-500" />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.25em] text-orange-700"
                dangerouslySetInnerHTML={{
                  __html: cmsContent["hero"]?.badge || "Command Center",
                }}
              />
            </div>

            {/* Heading */}
            <h1 className="mb-8 text-4xl font-black leading-[1.05] text-slate-900 sm:text-6xl lg:text-7xl">
              {cmsContent["hero"]?.title ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: cmsContent["hero"].title.replace(
                      /Strategy\./g,
                      '<span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Strategy.</span>',
                    ),
                  }}
                />
              ) : (
                <>
                  Let&apos;s Talk
                  <span className="ml-5 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                    Strategy.
                  </span>
                </>
              )}
            </h1>

            {/* Description */}
            <div
              className="max-w-3xl mx-auto mb-12 text-base font-medium leading-relaxed sm:text-xl text-slate-600"
              dangerouslySetInnerHTML={{
                __html:
                  cmsContent["hero"]?.description ||
                  "Connect with our advisory teams across India. Whether it's a portfolio audit or legacy solution, we're ready to architect your vision.",
              }}
            />

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14">
              <div>
                <h4 className="text-3xl font-black sm:text-4xl text-slate-900">
                  {cmsContent["hero"]?.stat1_val || "60m"}
                </h4>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                  {cmsContent["hero"]?.stat1_label || "SLA Response"}
                </p>
              </div>

              <div className="hidden w-px h-12 sm:block bg-slate-200"></div>

              <div>
                <h4 className="text-3xl font-black text-orange-600 sm:text-4xl">
                  {cmsContent["hero"]?.stat2_val || "4+"}
                </h4>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                  {cmsContent["hero"]?.stat2_label || "National Hubs"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="relative z-20 py-24 -mt-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            {/* Form Side */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] p-8 sm:p-16 border border-slate-100"
              >
                <div className="flex items-center mb-8 space-x-4 sm:mb-10">
                  <span className="w-8 h-px bg-orange-500 sm:w-12"></span>
                  <span className="text-orange-600 font-bold uppercase tracking-widest text-[10px] sm:text-xs">
                    {cmsContent["form-section"]?.badge || "Let's Connect"}
                  </span>
                </div>
                <h2 className="mb-8 text-3xl font-black leading-tight sm:text-4xl text-slate-900 sm:mb-10">
                  {cmsContent["form-section"]?.title || "Contact Our Advisors"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                        Enter Your Name
                      </label>
                      <input
                        {...register("name", { required: true })}
                        className="w-full p-5 font-bold transition-all border outline-none bg-slate-50 border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:bg-white text-slate-800"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                        Enter Your Phone Number
                      </label>
                      <input
                        {...register("phone", { required: true })}
                        className="w-full p-5 font-bold transition-all border outline-none bg-slate-50 border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:bg-white text-slate-800"
                        placeholder="+91 98XXX XXXXX"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      Enter Your E-mail
                    </label>
                    <input
                      {...register("email", { required: true })}
                      className="w-full p-5 font-bold transition-all border outline-none bg-slate-50 border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:bg-white text-slate-800"
                      placeholder="john@protocol.com"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      Select Services
                    </label>

                    <Controller
                      name="service"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          value={field.value}
                          onChange={field.onChange}
                          options={[
                            {
                              label: "Wealth Management",
                              value: "Wealth Management",
                            },
                            {
                              label: "Mutual Funds & SIPs",
                              value: "Mutual Funds",
                            },
                            {
                              label: "Life & Health Insurance",
                              value: "Insurance",
                            },
                            {
                              label: "Tax Saving Strategies",
                              value: "Tax Solution",
                            },
                            {
                              label: "General Inquiry",
                              value: "Others",
                            },
                          ]}
                        />
                      )}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      Briefly Describe Your Objective
                    </label>
                    <textarea
                      {...register("message", { required: true })}
                      rows="4"
                      className="w-full p-5 font-bold transition-all border outline-none resize-none bg-slate-50 border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:bg-white text-slate-800"
                      placeholder="E.g. Looking for a comprehensive portfolio review and risk assessment."
                    ></textarea>
                  </div>

                  <button
                    disabled={isSubmitting}
                    className="flex items-center justify-center w-full py-6 space-x-4 text-xs font-black tracking-widest text-white uppercase transition-all shadow-2xl bg-slate-900 rounded-2xl hover:bg-orange-600 group"
                  >
                    <span>
                      {isSubmitting ? "Initiating Uplink..." : "Submit Enquiry"}
                    </span>
                    <FaPaperPlane className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Info Side */}
            <div className="space-y-8 lg:col-span-5">
              {/* Emergency / WhatsApp Node */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#0f172a] rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-10 text-white relative overflow-hidden group shadow-2xl shadow-slate-900/20"
              >
                <div className="absolute top-0 right-0 w-40 h-40 transition-transform duration-700 rounded-bl-full bg-orange-500/10 group-hover:scale-150"></div>
                <div className="flex items-center mb-6 space-x-4 sm:space-x-5 sm:mb-8">
                  <div className="flex items-center justify-center w-12 h-12 border sm:w-14 sm:h-14 bg-green-500/20 rounded-xl sm:rounded-2xl border-green-500/20">
                    <FaWhatsapp className="text-2xl text-green-400 sm:text-3xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black tracking-tight sm:text-xl">
                      {cmsContent["info-section"]?.wa_title || "Quick Connect"}
                    </h4>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                      {cmsContent["info-section"]?.wa_badge ||
                        "SLA: 60 MIN PROTOCOL"}
                    </p>
                  </div>
                </div>
                <p className="mb-6 text-2xl font-black tracking-tighter sm:text-3xl sm:mb-8">
                  {cmsContent["info-section"]?.wa_num || "+91 93772 77703"}
                </p>
                <a
                  href={`https://wa.me/${cmsContent["info-section"]?.wa_num?.replace(/\D/g, "") || "919377277703"}`}
                  className="inline-flex items-center text-sm font-black text-orange-400 transition-colors hover:text-white group sm:text-base"
                >
                  Chat Now on WhatsApp{" "}
                  <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-2" />
                </a>
              </motion.div>

              {/* Support Channels */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-10 border border-slate-100 space-y-6 sm:space-y-8 shadow-xl shadow-slate-900/5"
              >
                <div className="flex items-start space-x-4 sm:space-x-5">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 rounded-xl sm:rounded-2xl group">
                    <FaHeadset className="text-xl text-orange-500 transition-transform sm:text-2xl group-hover:scale-110" />
                  </div>
                  <div>
                    <h5 className="text-base font-black text-slate-900 sm:text-lg">
                      {cmsContent["info-section"]?.email_title || "E-mail Us"}
                    </h5>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1 mt-1">
                      {cmsContent["info-section"]?.email_time ||
                        "Mon-Sat | 10:00 - 18:00 IST"}
                    </p>
                    <p className="text-sm font-bold text-slate-700 sm:text-base">
                      {cmsContent["info-section"]?.email_val || "info@wcfw.in"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 sm:space-x-5">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 rounded-xl sm:rounded-2xl group">
                    <FaGlobe className="text-xl text-blue-500 transition-transform sm:text-2xl group-hover:scale-110" />
                  </div>
                  <div>
                    <h5 className="text-base font-black text-slate-900 sm:text-lg">
                      Our Social Profiles
                    </h5>
                    <div className="flex mt-4 space-x-3 sm:space-x-4">
                      {[
                        {
                          icon: FaLinkedin,
                          href: "https://www.linkedin.com/company/we-care-freedom/",
                        },
                        {
                          icon: FaFacebook,
                          href: "https://www.facebook.com/wecarefreedom",
                        },
                        {
                          icon: FaTwitter,
                          href: "https://x.com/we_care_invest",
                        },
                        {
                          icon: FaInstagram,
                          href: "https://www.instagram.com/wecarefreedomwealth/",
                        },
                        {
                          icon: FaYoutube,
                          href: "https://www.youtube.com/@wecarefreedomwealth",
                        },
                      ].map((social, i) => (
                        <a
                          key={i}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 transition-all border rounded-lg sm:w-11 sm:h-11 bg-slate-50 border-slate-100 sm:rounded-xl text-slate-400 hover:text-orange-600 hover:bg-white hover:shadow-lg"
                        >
                          <social.icon />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Legacy Trust */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 sm:p-10 border-2 border-dashed border-slate-200 rounded-[2rem] sm:rounded-[3rem] text-center"
              >
                <FaShieldAlt className="mx-auto mb-4 text-4xl text-slate-300 sm:text-5xl sm:mb-6" />
                <p className="text-slate-400 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.3em] mb-3">
                  {cmsContent["info-section"]?.security_badge ||
                    "Institutional Grade Security"}
                </p>
                <div
                  className="text-xs font-medium leading-relaxed text-slate-500 sm:text-sm"
                  dangerouslySetInnerHTML={{
                    __html:
                      cmsContent["info-section"]?.security_text ||
                      "All transmission telemetry is encrypted and handled under strict confidentiality protocol.",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Grid - Map Focused (Static for now, can be dynamic later) */}
      <section className="py-24 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <h3 className="text-orange-600 font-black uppercase tracking-[0.3em] text-xs mb-4">
              The Presence Protocol
            </h3>
            <h2 className="text-4xl font-black sm:text-5xl text-slate-900">
              National Hubs
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {officeLocations.map((office, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-50 hover:border-orange-200 transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <iframe
                    title={office.city}
                    src={office.mapEmbed}
                    className="w-full h-full transition-all duration-1000 border-0 group-hover:scale-105"
                    loading="lazy"
                  ></iframe>
                  <div className="absolute inset-x-0 bottom-0 transition-opacity opacity-0 h-1/2 bg-gradient-to-t from-white to-transparent group-hover:opacity-100"></div>
                </div>
                <div className="p-8">
                  <h4 className="mb-3 text-xl font-black tracking-tight text-slate-900">
                    {office.city}
                  </h4>
                  <p className="mb-6 text-xs font-medium leading-relaxed text-slate-500 line-clamp-2">
                    {office.address}
                  </p>
                  <div className="pt-6 space-y-3 border-t border-slate-50">
                    <p className="text-sm font-black text-orange-600">
                      {office.phone}
                    </p>
                    <p className="text-[10px] font-black text-slate-300 lowercase tracking-widest">
                      {office.email}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
