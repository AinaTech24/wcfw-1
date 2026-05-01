import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import {
  FaSave,
  FaSync,
  FaCog,
  FaGlobe,
  FaShareAlt,
  FaSearch,
  FaBuilding,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { PageLoader } from "../../components/LoadingSkeletons";

const SiteSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("company");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get("/settings");
      setSettings(res.data);
    } catch (err) {
      console.error("Error fetching settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await api.put("/settings", settings);
      setMessage("Settings saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error saving settings:", err);
      setMessage("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const updateSocialLink = (platform, value) => {
    setSettings((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
  };

  const updateSeo = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      seo: { ...prev.seo, [field]: value },
    }));
  };

  const tabs = [
    { id: "company", label: "Company Info", icon: FaBuilding },
    { id: "social", label: "Social Links", icon: FaShareAlt },
    { id: "seo", label: "SEO Defaults", icon: FaSearch },
    { id: "content", label: "Hero & Footer", icon: FaGlobe },
  ];

  if (loading || !settings) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
          <p className="text-gray-500 mt-1">
            Global configuration for the entire website.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchSettings}
            className="p-4 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-all shadow-sm"
          >
            <FaSync className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-200 flex items-center gap-3 transition-all ${saving ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-0.5"}`}
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FaSave />
            )}
            Save Settings
          </button>
        </div>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl flex items-center gap-3 text-sm ${message.includes("success") ? "bg-emerald-50 border border-emerald-100 text-emerald-600" : "bg-red-50 border border-red-100 text-red-600"}`}
        >
          <FaCog /> <span>{message}</span>
        </motion.div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all ${activeTab === tab.id ? "bg-slate-900 text-white shadow-lg" : "bg-white text-gray-500 border border-gray-100 hover:border-gray-300"}`}
          >
            <tab.icon className="text-sm" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        {activeTab === "company" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Company Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaBuilding className="text-orange-500" /> Company Name
                </label>
                <input
                  type="text"
                  value={settings.companyName || ""}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaEnvelope className="text-orange-500" /> Email
                </label>
                <input
                  type="email"
                  value={settings.companyEmail || ""}
                  onChange={(e) => updateField("companyEmail", e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaPhone className="text-orange-500" /> Phone
                </label>
                <input
                  type="text"
                  value={settings.companyPhone || ""}
                  onChange={(e) => updateField("companyPhone", e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaWhatsapp className="text-emerald-500" /> WhatsApp Number
                </label>
                <input
                  type="text"
                  value={settings.whatsappNumber || ""}
                  onChange={(e) =>
                    updateField("whatsappNumber", e.target.value)
                  }
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g. 919876543210"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-orange-500" /> Address
              </label>
              <textarea
                value={settings.companyAddress || ""}
                onChange={(e) => updateField("companyAddress", e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none h-24"
              />
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Social Media Links
            </h2>
            {[
              {
                key: "facebook",
                label: "Facebook",
                icon: FaFacebookF,
                color: "text-blue-600",
              },
              {
                key: "instagram",
                label: "Instagram",
                icon: FaInstagram,
                color: "text-pink-600",
              },
              {
                key: "linkedin",
                label: "LinkedIn",
                icon: FaLinkedinIn,
                color: "text-blue-700",
              },
              {
                key: "youtube",
                label: "YouTube",
                icon: FaYoutube,
                color: "text-red-600",
              },
              {
                key: "twitter",
                label: "Twitter / X",
                icon: FaGlobe,
                color: "text-gray-900",
              },
            ].map(({ key, label, icon: Icon, color }) => (
              <div key={key} className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center ${color}`}
                >
                  <Icon />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type="url"
                    value={settings.socialLinks?.[key] || ""}
                    onChange={(e) => updateSocialLink(key, e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder={`https://${key}.com/...`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "seo" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Default SEO Settings
            </h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Default Meta Title
              </label>
              <input
                type="text"
                value={settings.seo?.defaultMetaTitle || ""}
                onChange={(e) => updateSeo("defaultMetaTitle", e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="We Care Freedom Wealth - Financial Services"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Default Meta Description
              </label>
              <textarea
                value={settings.seo?.defaultMetaDescription || ""}
                onChange={(e) =>
                  updateSeo("defaultMetaDescription", e.target.value)
                }
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none h-24"
                placeholder="Your trusted financial partner..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Default Meta Keywords
              </label>
              <input
                type="text"
                value={settings.seo?.defaultMetaKeywords || ""}
                onChange={(e) =>
                  updateSeo("defaultMetaKeywords", e.target.value)
                }
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="mutual funds, SIP, investment, financial planning"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Google Analytics ID
              </label>
              <input
                type="text"
                value={settings.seo?.googleAnalyticsId || ""}
                onChange={(e) => updateSeo("googleAnalyticsId", e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="G-XXXXXXXXXX"
              />
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Hero & Footer Content
            </h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hero Tagline
              </label>
              <input
                type="text"
                value={settings.heroTagline || ""}
                onChange={(e) => updateField("heroTagline", e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="Your Financial Freedom Journey Starts Here"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hero Subtitle
              </label>
              <textarea
                value={settings.heroSubtitle || ""}
                onChange={(e) => updateField("heroSubtitle", e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none h-24"
                placeholder="We help you build wealth through smart investments..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Footer Text
              </label>
              <textarea
                value={settings.footerText || ""}
                onChange={(e) => updateField("footerText", e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none h-24"
                placeholder="© 2026 We Care Freedom Wealth. All rights reserved."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteSettings;
