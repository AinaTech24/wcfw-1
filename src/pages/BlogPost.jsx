import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUser, FaArrowLeft, FaClock } from "react-icons/fa";
import useMetaTags from "../hooks/useMetaTags";
import { FAQSchema } from "../components/SchemaMarkup";
import renderBlogContent from "../utils/renderBlogContent";

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blog/${slug}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  useMetaTags({
    title: blog?.metaTitle || `${blog?.title || "Loading..."} | WCFW Blog`,
    description: blog?.metaDescription || blog?.summary || "",
    keywords: blog?.metaKeywords || (blog?.tags ? blog?.tags.join(", ") : ""),
    canonicalUrl: blog?.canonicalUrl || "",
    robotsTag: blog?.robotsTag || "index, follow",
    ogImage: blog?.image || "",
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Blog Not Found
        </h1>
        <Link
          to="/blog"
          className="text-orange-600 font-bold hover:underline flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <FAQSchema faqs={blog.faq} />
      {/* Header / Hero */}
      <div className="relative h-[40vh] sm:h-[60vh] overflow-hidden">
        {blog.image ? (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
            <span
              aria-hidden="true"
              className="text-white/10 text-[20vw] font-black absolute select-none"
            >
              WCFW
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-20">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center text-orange-400 font-bold text-sm mb-6 hover:text-white transition-colors group"
            >
              <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />{" "}
              Back to Chronicles
            </Link>
            <h1 className="text-3xl sm:text-6xl font-black text-white mb-8 leading-tight tracking-tighter uppercase">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-8 text-slate-300 text-xs sm:text-sm font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <FaUser className="text-orange-500" /> {blog.author}
              </span>
              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-orange-500" />{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <FaClock className="text-orange-500" />{" "}
                {Math.ceil(blog.content.length / 1000)} MIN READ
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-20 sm:py-32">
        <div className="prose prose-lg prose-slate max-w-none">
          <p className="text-xl sm:text-2xl text-slate-500 font-medium italic mb-12 leading-relaxed border-l-4 border-orange-500 pl-8">
            {blog.summary}
          </p>
          <div
            className="text-slate-700 leading-[1.8] text-lg prose-headings:font-black prose-headings:text-slate-900 prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-a:text-orange-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-li:marker:text-orange-500"
            dangerouslySetInnerHTML={{
              __html: renderBlogContent(blog.content),
            }}
          />
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-20 pt-10 border-t border-slate-100 flex flex-wrap gap-4">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-slate-50 text-slate-500 rounded-full text-xs font-bold uppercase tracking-widest border border-slate-100"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* FAQs */}
        {blog.faq && blog.faq.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-8 tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {blog.faq.map((item, idx) => (
                <details
                  key={idx}
                  className="group bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 text-lg list-none">
                    {item.question}
                    <span className="ml-4 text-orange-500 text-2xl leading-none transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-slate-600 leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-32 p-10 sm:p-16 bg-slate-900 rounded-[3rem] text-center text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          <h3 className="text-2xl sm:text-4xl font-black mb-8 leading-tight">
            Secure Your Legacy Today
          </h3>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto">
            Build a robust financial future with our institutional-grade
            advisory protocols.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-orange-600 text-white font-black rounded-2xl hover:bg-orange-500 transition-all transform hover:scale-105 shadow-2xl"
          >
            Schedule Consultation
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
