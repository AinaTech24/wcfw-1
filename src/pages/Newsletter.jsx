import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaBook,
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaArrowRight,
  FaTerminal,
} from "react-icons/fa";
import useCMSContent from "../hooks/useCMSContent";
import useMetaTags from "../hooks/useMetaTags";

const Newsletter = () => {
  const { cmsContent } = useCMSContent("newsletter");

  // SEO Hook
  useMetaTags(
    cmsContent["_seo"] || {
      title: "Newsletter | We Care Freedom Wealth",
      description:
        "Read our latest articles and insights on personal finance, investing, tax, and wealth creation.",
      robotsTag: "index, follow",
    },
  );

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);

  const categories = ["All", "Personal Finance", "Investing", "Tax", "Wealth"];

  const staticPosts = React.useMemo(
    () => [
      {
        title: "Architecting Your Multi-Generational Wealth Legacy",
        description:
          "Discover the benefits of partnering with We Care Freedom Wealth for all your investment and financial solution needs.",
        categories: ["Investing"],
        author: "Financial Expert",
        pubDate: "2025-10-05",
        thumbnail:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
        link: "#",
      },
      {
        title: "Institutional Equity Allocation: A Modern Primer",
        description:
          "Everything beginners need to know about stock market investing and trading through your demat account.",
        categories: ["Investing"],
        author: "Market Analyst",
        pubDate: "2025-10-02",
        thumbnail:
          "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
        link: "#",
      },
      {
        title: "Tactical Tax Strategizing for Ultra HNI Portfolios",
        description:
          "Learn how to save tax while building wealth through smart mutual fund investments via We Care platform.",
        categories: ["Tax"],
        author: "Tax Advisor",
        pubDate: "2025-09-28",
        thumbnail:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        link: "#",
      },
      {
        title: "The Compounding Protocol: Analyzing SIP Efficiency",
        description:
          "Discover how SIPs can help you build substantial wealth over time with disciplined investing.",
        categories: ["Wealth"],
        author: "Wealth Advisor",
        pubDate: "2025-09-25",
        thumbnail:
          "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
        link: "#",
      },
      {
        title: "Sovereign Independence: The 2025 Wealth Roadmap",
        description:
          "Essential tips for budgeting, saving, and managing your personal finances effectively.",
        categories: ["Personal Finance"],
        author: "Finance Coach",
        pubDate: "2025-09-20",
        thumbnail:
          "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&q=80",
        link: "#",
      },
    ],
    [],
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://economictimes.indiatimes.com/wealth/rssfeeds/837555174.cms",
        );
        const data = await response.json();
        if (data.status === "ok" && data.items && data.items.length > 0) {
          const processedPosts = data.items.map((item) => ({
            ...item,
            categories: ["Personal Finance"],
            thumbnail:
              item.thumbnail ||
              item.enclosure?.link ||
              "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
          }));
          setPosts(processedPosts);
        } else {
          setPosts(staticPosts);
        }
      } catch (error) {
        setPosts(staticPosts);
      } finally {
        // loading state removed if not used
      }
    };
    fetchPosts();
  }, [staticPosts]);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.categories.includes(selectedCategory);
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                  Knowledge Repository
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 sm:mb-8">
                Financial <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                  Intelligence.
                </span>
              </h1>

              <p className="max-w-2xl mx-auto mb-8 text-base font-medium leading-relaxed lg:mx-0 sm:text-lg lg:text-xl text-slate-700 sm:mb-12">
                Sovereign insights, institutional analysis, and tactical wisdom
                engineered to empower your wealth creation journey.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-5 lg:justify-start sm:gap-8">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900 sm:text-3xl">
                    200+
                  </span>
                  <span className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                    Insights Published
                  </span>
                </div>

                <div className="hidden w-px h-12 sm:block bg-slate-200"></div>

                <div className="flex flex-col">
                  <span className="text-2xl font-black text-orange-600 sm:text-3xl">
                    Daily
                  </span>
                  <span className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                    Market Pulse
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
                  value: "Advisor",
                  label: "Grade Analysis",
                },
                {
                  icon: FaSearch,
                  value: "Deep",
                  label: "Research Access",
                },
                {
                  icon: FaCalendarAlt,
                  value: "Daily",
                  label: "Fresh Updates",
                },
                {
                  icon: FaBook,
                  value: "200+",
                  label: "Insights",
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

      {/* Search & Categories Bar */}
      <div className="relative z-20 px-4 py-24 mx-auto -mt-20 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] p-8 sm:p-12 border border-slate-100 mb-20"
        >
          <div className="grid items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="relative group">
                <FaSearch className="absolute transition-colors -translate-y-1/2 left-5 top-1/2 text-slate-400 group-hover:text-orange-500" />
                <input
                  type="text"
                  placeholder="Identify insights..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-[1.5rem] p-5 pl-14 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all font-bold text-slate-800 outline-none"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-7">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-3 rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all ${selectedCategory === cat ? "bg-slate-900 text-white shadow-xl" : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all h-full flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.thumbnail}
                  className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                  alt={post.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                <div className="absolute flex space-x-2 top-6 left-6">
                  {post.categories.map((c) => (
                    <span
                      key={c}
                      className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-orange-600 shadow-sm"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col flex-1 p-10">
                <div className="flex items-center space-x-4 mb-6 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <span className="flex items-center">
                    <FaUser className="mr-2 text-orange-600" /> {post.author}
                  </span>
                  <span className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-orange-600" />{" "}
                    {new Date(post.pubDate).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="mb-6 text-2xl font-black leading-tight tracking-tight uppercase transition-colors text-slate-900 group-hover:text-orange-600 line-clamp-2">
                  {post.title}
                </h3>
                <p className="mb-8 text-sm font-medium leading-relaxed text-slate-500 line-clamp-3">
                  {post.description?.replace(/<[^>]*>?/gm, "")}
                </p>
                <div className="pt-8 mt-auto border-t border-slate-50">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-xs font-black tracking-widest uppercase transition-colors text-slate-900 group-hover:text-orange-600"
                  >
                    Access Protocol{" "}
                    <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-2" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
