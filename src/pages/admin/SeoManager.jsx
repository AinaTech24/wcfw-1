import React, { useState, useEffect, useCallback } from "react";
import {
  FaSave,
  FaSync,
  FaExternalLinkAlt,
  FaSitemap,
  FaRobot,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../utils/api";
import { PageLoader } from "../../components/LoadingSkeletons";

const SeoManager = () => {
  const [seo, setSeo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchSeo = useCallback(async () => {
    try {
      const res = await api.get("/seo");
      setSeo({
        siteUrl: res.data.siteUrl || "https://www.wcfw.in",
        robotsTxt: res.data.robotsTxt || "",
        sitemapCustomUrls: res.data.sitemapCustomUrls || "",
      });
    } catch (err) {
      setError("Failed to load SEO settings.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSeo();
  }, [fetchSeo]);

  const update = (field, value) => setSeo((p) => ({ ...p, [field]: value }));

  const flash = (setter, msg) => {
    setter(msg);
    setTimeout(() => setter(""), 3500);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const res = await api.put("/seo", seo);
      setSeo({
        siteUrl: res.data.siteUrl,
        robotsTxt: res.data.robotsTxt,
        sitemapCustomUrls: res.data.sitemapCustomUrls || "",
      });
      flash(setMessage, "Saved. Changes are now live.");
    } catch (err) {
      flash(setError, "Failed to save SEO settings.");
    } finally {
      setSaving(false);
    }
  };

  const resetRobots = async () => {
    try {
      const res = await api.get("/seo/default-robots");
      update("robotsTxt", res.data.robotsTxt);
      flash(setMessage, "Loaded recommended robots.txt. Click Save to apply.");
    } catch {
      flash(setError, "Failed to load default robots.txt.");
    }
  };

  if (loading) return <PageLoader />;

  const liveBase = (seo.siteUrl || "https://www.wcfw.in").replace(/\/+$/, "");

  const autoPages = [
    "/",
    "/about",
    "/services",
    "/contact",
    "/blog",
    "/calculators",
    "/videos",
    "/newsletter",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO & Sitemap</h1>
          <p className="mt-1 text-gray-500">
            Manage robots.txt and sitemap.xml. Sitemap updates automatically when blogs are published.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchSeo}
            className="p-4 text-gray-600 transition-all bg-gray-100 shadow-sm rounded-2xl hover:bg-gray-200"
            title="Reload"
          >
            <FaSync className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-200 flex items-center gap-3 transition-all ${saving ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-0.5"}`}
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
            ) : (
              <FaSave />
            )}
            Save Changes
          </button>
        </div>
      </div>

      {/* Alerts */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-4 text-sm text-red-600 border border-red-100 bg-red-50 rounded-2xl"
          >
            <FaExclamationTriangle /> <span>{error}</span>
          </motion.div>
        )}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-4 text-sm border bg-emerald-50 border-emerald-100 rounded-2xl text-emerald-600"
          >
            <FaCheckCircle /> <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Site URL */}
      <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl">
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Site URL (canonical domain)
        </label>
        <input
          type="text"
          value={seo.siteUrl}
          onChange={(e) => update("siteUrl", e.target.value)}
          className="w-full p-3 border border-gray-100 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-500"
          placeholder="https://www.wcfw.in"
        />
        <p className="mt-2 text-xs text-gray-400">
          Used to build all URLs in the sitemap and the Sitemap directive in robots.txt.
        </p>
      </div>

      {/* robots.txt */}
      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3 text-gray-500">
            <FaRobot className="text-orange-500" />
            <span className="text-xs font-bold tracking-widest uppercase">
              robots.txt
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={resetRobots}
              className="text-xs font-bold text-orange-600 hover:text-orange-700"
            >
              Reset to recommended
            </button>
            <a
              href={`${liveBase}/robots.txt`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              View live <FaExternalLinkAlt size={9} />
            </a>
          </div>
        </div>
        <div className="p-6">
          <textarea
            value={seo.robotsTxt}
            onChange={(e) => update("robotsTxt", e.target.value)}
            spellCheck="false"
            className="w-full p-4 font-mono text-sm text-slate-800 bg-gray-50 rounded-xl outline-none resize-none leading-relaxed border border-gray-100 focus:ring-2 focus:ring-orange-500 min-h-[200px]"
            placeholder={"User-agent: *\nAllow: /"}
          />
        </div>
      </div>

      {/* sitemap.xml */}
      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3 text-gray-500">
            <FaSitemap className="text-orange-500" />
            <span className="text-xs font-bold tracking-widest uppercase">
              sitemap.xml
            </span>
          </div>
          <a
            href={`${liveBase}/sitemap.xml`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            View live <FaExternalLinkAlt size={9} />
          </a>
        </div>
        <div className="p-6 space-y-5">
          {/* Auto status */}
          <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-700">
            <FaCheckCircle className="mt-0.5 shrink-0 text-emerald-500" />
            <div>
              <p className="font-semibold">Auto-generated — always up to date</p>
              <p className="mt-1 text-xs text-emerald-600 leading-relaxed">
                All published blog posts are added to the sitemap automatically
                the moment they go live. No manual updates needed.
              </p>
            </div>
          </div>

          {/* Static pages list */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
              Always included
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {autoPages.map((p) => (
                <span
                  key={p}
                  className="text-xs font-mono text-slate-600 bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5 truncate"
                >
                  {liveBase}{p === "/" ? "" : p}
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-400">
              + All published, indexable blog posts (auto-added on publish)
            </p>
          </div>

          {/* Custom additional URLs */}
          <div>
            <label className="block mb-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Additional custom URLs{" "}
              <span className="font-normal normal-case text-gray-400">
                — optional, one per line
              </span>
            </label>
            <textarea
              value={seo.sitemapCustomUrls}
              onChange={(e) => update("sitemapCustomUrls", e.target.value)}
              spellCheck="false"
              className="w-full p-4 font-mono text-sm text-slate-800 bg-gray-50 rounded-xl outline-none resize-none leading-relaxed border border-gray-100 focus:ring-2 focus:ring-orange-500 min-h-[100px]"
              placeholder={`https://www.wcfw.in/some-custom-page\nhttps://www.wcfw.in/another-page`}
            />
            <p className="mt-2 text-xs text-gray-400">
              Add any pages not in the auto list above. These are appended to
              the sitemap on every request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoManager;
