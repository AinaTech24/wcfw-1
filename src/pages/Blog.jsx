import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
  FaTerminal,
} from "react-icons/fa";
import useMetaTags from "../hooks/useMetaTags";

import goalBasedImg from "../assets/images/services/goal-based-investing.png";
import mutualFundsImg from "../assets/images/services/mutual-funds.png";
import stocksImg from "../assets/images/services/stocks.png";

import { PageLoader } from "../components/LoadingSkeletons";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blog");
        // Normalize: handle bare array or wrapped { data: [...] }
        if (Array.isArray(res.data)) {
          setBlogs(res.data);
        } else if (Array.isArray(res.data?.data)) {
          setBlogs(res.data.data);
        } else {
          console.error("Unexpected blog API response shape:", res.data);
          setBlogs([]);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useMetaTags(
    "Financial Insights & Knowledge | We Care Freedom Wealth",
    "Expert financial articles on goal-based planning, mutual funds, and equity investments to help you build long-term wealth.",
  );

  const blogPosts =
    blogs.length > 0
      ? blogs
      : [
          {
            id: 1,
            title: "Goal Based Investing Strategy",
            slug: "goal-based-investing-strategy",
            image: goalBasedImg,
            category: "Planning",
            summary:
              "Learn how goal-based investing helps structure wealth creation efficiently.",
            createdAt: new Date(),
            readTime: "5 min read",
          },
          {
            id: 2,
            title: "Why Mutual Funds Build Wealth",
            slug: "why-mutual-funds-build-wealth",
            image: mutualFundsImg,
            category: "Mutual Funds",
            summary:
              "Understand SIP, diversification, and long-term mutual fund growth.",
            createdAt: new Date(),
            readTime: "6 min read",
          },
          {
            id: 3,
            title: "Equity Investing Basics",
            slug: "equity-investing-basics",
            image: stocksImg,
            category: "Stocks",
            summary:
              "Explore stock investing fundamentals for long-term returns.",
            createdAt: new Date(),
            readTime: "7 min read",
          },
        ];

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="bg-[#f8fafc]">
      {/* Cinematic Light Header */}
      <section
        className="relative min-h-[min(100vh,720px)] sm:min-h-[min(75vh,640px)] lg:min-h-[min(90vh,760px)] flex items-center overflow-hidden pt-28 pb-14 sm:pt-24 sm:pb-20 lg:pt-16"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #ffe5bd 0%, #fffdf7 35%, #c7f1ff 100%)",
        }}
      >
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_100%)]"></div>

          <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-orange-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10 w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 sm:gap-14 lg:gap-12">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 mb-6 space-x-3 border rounded-full bg-orange-500/10 backdrop-blur-md border-orange-500/20 sm:mb-8"
              >
                <FaBook className="text-sm text-orange-600" />
                <span className="text-orange-900 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em]">
                  Insights Gallery
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 sm:mb-8">
                Wealth <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                  Chronicles.
                </span>
              </h1>

              <p className="max-w-2xl mx-auto mb-8 text-base font-medium leading-relaxed lg:mx-0 sm:text-lg lg:text-xl text-slate-700 sm:mb-12">
                Expert perspectives and strategic narratives designed to
                illuminate the path toward your ultimate financial goals.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-5 lg:justify-start sm:gap-8">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900 sm:text-3xl">
                    Expert
                  </span>
                  <span className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                    Research Pieces
                  </span>
                </div>

                <div className="hidden w-px h-12 sm:block bg-slate-200"></div>

                <div className="flex flex-col">
                  <span className="text-2xl font-black text-orange-600 sm:text-3xl">
                    Strategic
                  </span>
                  <span className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                    Asset Insights
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
            >
              {[
                {
                  icon: FaTerminal,
                  value: "Elite",
                  label: "Market Research",
                },
                {
                  icon: FaBook,
                  value: "Fresh",
                  label: "Weekly Articles",
                },
                {
                  icon: FaCalendarAlt,
                  value: "Updated",
                  label: "Regular Insights",
                },
                {
                  icon: FaArrowRight,
                  value: "Smart",
                  label: "Actionable Ideas",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-white/70 backdrop-blur-xl border border-white/40 p-5 sm:p-6 rounded-[1.75rem] sm:rounded-[2rem] shadow-xl"
                >
                  <item.icon className="mb-3 text-xl text-orange-500 sm:text-2xl" />

                  <div className="mb-1 text-lg font-black sm:text-xl text-slate-900">
                    {item.value}
                  </div>

                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Articles Section Header */}
      <div className="px-4 pt-24 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-between gap-6 pb-12 border-b md:flex-row md:items-end border-slate-100"
        >
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tighter uppercase text-slate-900">
              Latest Research
            </h2>
            <div className="w-20 h-1.5 bg-orange-600 rounded-full" />
          </div>
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">
            Filtering for Institutional Quality
          </p>
        </motion.div>
      </div>

      {/* Blog Post Grid */}
      <section className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all h-full flex flex-col"
            >
              <Link
                to={`/blog/${post.slug || post.id}`}
                className="block overflow-hidden relative aspect-[16/10]"
              >
                <img
                  src={post.image || goalBasedImg}
                  alt={post.imageAlt || post.title}
                  className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent group-hover:opacity-100"></div>
                <div className="absolute top-6 left-6">
                  <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-orange-600 shadow-sm border border-orange-100">
                    {post.category || post.tags?.[0] || "Financial"}
                  </span>
                </div>
              </Link>

              <div className="flex flex-col flex-1 p-10">
                <div className="flex items-center justify-between mb-6 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <span className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-orange-600" />{" "}
                    {new Date(
                      post.createdAt || Date.now(),
                    ).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <FaClock className="mr-2 text-orange-600" />{" "}
                    {post.readTime || "5 min read"}
                  </span>
                </div>

                <Link to={`/blog/${post.slug || post.id}`}>
                  <h3 className="mb-6 text-2xl font-black leading-tight tracking-tight uppercase transition-colors text-slate-900 group-hover:text-orange-600 line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="mb-8 text-sm font-medium leading-relaxed text-slate-500 line-clamp-3">
                  {post.summary || post.excerpt}
                </p>

                <div className="pt-8 mt-auto border-t border-slate-50">
                  <Link
                    to={`/blog/${post.slug || post.id}`}
                    className="flex items-center text-xs font-black tracking-widest uppercase transition-colors text-slate-900 group-hover:text-orange-600"
                  >
                    Read Protocol{" "}
                    <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-2" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter CTA Integration */}
      <section className="px-4 pb-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[3rem] p-12 sm:p-20 relative overflow-hidden text-center text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10">
            <h2 className="mb-8 text-3xl font-black leading-tight sm:text-5xl">
              Subscribe to Our{" "}
              <span className="text-orange-500">Newsletter</span>
            </h2>
            <p className="max-w-2xl mx-auto mb-12 text-lg leading-relaxed text-slate-400 sm:text-xl">
              Stay updated with the latest market trends, financial advice, and
              economic insights delivered to your inbox.
            </p>
            <Link
              to="/newsletter"
              className="inline-flex items-center px-10 py-4 font-black text-white transition-all transform bg-orange-600 shadow-2xl rounded-2xl hover:bg-orange-500 hover:scale-105"
            >
              Explore Newsletter <FaArrowRight className="ml-3" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
