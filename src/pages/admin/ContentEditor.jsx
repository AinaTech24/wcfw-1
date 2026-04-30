import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import {
  FaSave,
  FaSync,
  FaExclamationTriangle,
  FaPlus,
  FaTrash,
  FaTimes,
  FaFileAlt,
  FaLayerGroup,
  FaCode,
  FaEye,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const API = "/api/content";

/**
 * Ensure a URL has a proper protocol prefix.
 * If the URL starts with www. or is a bare domain, prepend https://
 */
const ensureAbsoluteUrl = (url) => {
  if (!url) return url;
  url = url.trim();
  // Already has a valid protocol or is a special link
  if (/^(https?:\/\/|mailto:|tel:|#|\/)/.test(url)) {
    return url;
  }
  return `https://${url}`;
};

// Override the default Snow theme link handler to auto-add https://
const Link = Quill.import("formats/link");
class CustomLink extends Link {
  static sanitize(url) {
    return super.sanitize(ensureAbsoluteUrl(url));
  }
}
Quill.register(CustomLink, true);

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "clean"],
  ],
};

const DEFAULT_PAGES = [
  "home",
  "about",
  "services",
  "contact",
  "blog",
  "videos",
  "newsletter",
  "financial-freedom",
  "asset-allocation",
  "retirement",
  "child-education",
  "child-wedding",
  "dream-home",
  "emergency-fund",
  "wealth-creation",
  "mutual-fund",
  "stocks",
  "life-insurance",
  "fixed-deposit",
  "tax-solution",
  "goal-based-investing",
  "privacy-policy",
  "terms-of-service",
  "disclaimer",
  "commission-disclosure",
];

const ContentEditor = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [content, setContent] = useState("");
  const [seoContent, setSeoContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Modals
  const [showAddPage, setShowAddPage] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [newPageName, setNewPageName] = useState("");
  const [newSectionName, setNewSectionName] = useState("");
  const [viewMode, setViewMode] = useState("form"); // 'form' or 'json'

  // Fetch all unique pages
  const fetchPages = useCallback(async () => {
    try {
      const res = await axios.get(API);
      const allContent = res.data;
      const dbPages = [...new Set(allContent.map((c) => c.page))];

      // Merge DB pages with default pages, keeping unique and sorted
      const combinedPages = [...new Set([...DEFAULT_PAGES, ...dbPages])].sort();

      setPages(combinedPages);
      if (combinedPages.length > 0 && !selectedPage) {
        setSelectedPage(combinedPages[0]);
      }
    } catch (err) {
      setError("Failed to fetch pages.");
    }
  }, [selectedPage]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  // Fetch sections for selected page
  useEffect(() => {
    if (selectedPage) {
      fetchSections();
    }
  }, [selectedPage]);

  const fetchSections = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API}?page=${selectedPage}`);
      setSections(res.data);

      // SEO settings
      const seoSection = res.data.find((s) => s.section === "seo-settings");
      if (seoSection) {
        setSeoContent(JSON.stringify(seoSection.seoSettings || {}, null, 4));
      } else {
        setSeoContent(
          JSON.stringify(
            {
              metaTitle: "",
              metaDescription: "",
              metaKeywords: "",
              canonicalUrl: "",
              robotsTag: "index, follow",
            },
            null,
            4,
          ),
        );
      }

      // Select first non-SEO section
      const contentSections = res.data.filter(
        (s) => s.section !== "seo-settings",
      );
      if (contentSections.length > 0) {
        setSelectedSection(contentSections[0]);
        setContent(JSON.stringify(contentSections[0].content, null, 4));
      } else {
        setSelectedSection(null);
        setContent("");
      }
    } catch (err) {
      setError("Failed to fetch sections.");
    } finally {
      setLoading(false);
    }
  };

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    setContent(JSON.stringify(section.content, null, 4));
  };

  const handleSave = async () => {
    setSaveLoading(true);
    setError("");
    setMessage("");
    try {
      const parsedContent = JSON.parse(content);
      const parsedSeo = JSON.parse(seoContent);

      await axios.post(`${API}/update`, {
        page: selectedPage,
        section: selectedSection.section,
        content: parsedContent,
      });

      await axios.post(`${API}/update`, {
        page: selectedPage,
        section: "seo-settings",
        content: {},
        seoSettings: parsedSeo,
      });

      setMessage("Content & SEO updated successfully!");
      setTimeout(() => setMessage(""), 3000);
      fetchSections();
    } catch (err) {
      setError(
        err instanceof SyntaxError
          ? "Invalid JSON format. Please check your content."
          : "Failed to save content.",
      );
    } finally {
      setSaveLoading(false);
    }
  };

  // Add new page with a default section
  const handleAddPage = async () => {
    if (!newPageName.trim()) return;
    const pageName = newPageName.trim().toLowerCase().replace(/\s+/g, "-");
    try {
      await axios.post(`${API}/update`, {
        page: pageName,
        section: "hero",
        content: {
          heading: "New Page Heading",
          subheading: "Page description goes here",
          text: "",
        },
      });
      setNewPageName("");
      setShowAddPage(false);
      setSelectedPage(pageName);
      await fetchPages();
      fetchSections();
      setMessage(`Page "${pageName}" created!`);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError("Failed to create page.");
    }
  };

  // Add new section to current page
  const handleAddSection = async () => {
    if (!newSectionName.trim() || !selectedPage) return;
    const sectionName = newSectionName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");
    try {
      await axios.post(`${API}/update`, {
        page: selectedPage,
        section: sectionName,
        content: { title: "", description: "", items: [] },
      });
      setNewSectionName("");
      setShowAddSection(false);
      fetchSections();
      setMessage(`Section "${sectionName}" added!`);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError("Failed to create section.");
    }
  };

  // Delete a section (needs a backend endpoint — we'll use a workaround via update with empty then eventually delete)
  const handleDeleteSection = async (section) => {
    if (
      !window.confirm(
        `Delete section "${section.section}" from page "${selectedPage}"?`,
      )
    )
      return;
    try {
      // Use the delete content endpoint
      await axios.delete(`${API}/${section._id}`);
      fetchSections();
      setMessage(`Section "${section.section}" deleted.`);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(
        "Failed to delete section. The backend may not support deletion yet.",
      );
    }
  };

  // Delete an entire page (delete all its sections)
  const handleDeletePage = async (pageName) => {
    if (
      !window.confirm(
        `Delete the entire "${pageName}" page and all its sections?`,
      )
    )
      return;
    try {
      await axios.delete(`${API}/page/${pageName}`);
      const remaining = pages.filter((p) => p !== pageName);
      setPages(remaining);
      setSelectedPage(remaining.length > 0 ? remaining[0] : "");
      setMessage(`Page "${pageName}" deleted.`);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError("Failed to delete page.");
    }
  };

  // Try to render form fields from content JSON
  const renderFormFields = () => {
    try {
      const parsed = JSON.parse(content);
      if (typeof parsed !== "object" || parsed === null) return null;

      const isTextareaField = (key, value) => {
        return true; // Apply rich text editor to all fields
      };

      return (
        <div className="space-y-4">
          {Object.entries(parsed).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                {key.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}
              </label>
              {Array.isArray(value) ? (
                <div className="space-y-3">
                  {value.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-100 relative group"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          const newArr = [...value];
                          newArr.splice(idx, 1);
                          const newParsed = { ...parsed, [key]: newArr };
                          setContent(JSON.stringify(newParsed, null, 4));
                        }}
                        className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTrash size={12} />
                      </button>
                      {typeof item === "object" && item !== null ? (
                        Object.entries(item).map(([subKey, subValue]) => (
                          <div key={subKey} className="mb-2">
                            <label className="block text-xs font-semibold text-gray-500 mb-1 capitalize">
                              {subKey
                                .replace(/([A-Z])/g, " $1")
                                .replace(/_/g, " ")}
                            </label>
                            {isTextareaField(subKey, subValue) ? (
                              <div className="bg-white border text-black border-gray-200 rounded-lg pb-2">
                                <ReactQuill
                                  theme="snow"
                                  modules={quillModules}
                                  value={String(subValue)}
                                  onChange={(html, delta, source) => {
                                    if (source !== "user") return;
                                    const newArr = [...value];
                                    newArr[idx] = { ...item, [subKey]: html };
                                    const newParsed = {
                                      ...parsed,
                                      [key]: newArr,
                                    };
                                    setContent(
                                      JSON.stringify(newParsed, null, 4),
                                    );
                                  }}
                                />
                              </div>
                            ) : (
                              <input
                                type="text"
                                value={String(subValue)}
                                onChange={(e) => {
                                  const newArr = [...value];
                                  newArr[idx] = {
                                    ...item,
                                    [subKey]: e.target.value,
                                  };
                                  const newParsed = {
                                    ...parsed,
                                    [key]: newArr,
                                  };
                                  setContent(
                                    JSON.stringify(newParsed, null, 4),
                                  );
                                }}
                                className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm"
                              />
                            )}
                          </div>
                        ))
                      ) : (
                        <div>
                          {isTextareaField(key, item) ? (
                            <div className="bg-white border text-black border-gray-200 rounded-lg pb-2">
                              <ReactQuill
                                theme="snow"
                                modules={quillModules}
                                value={String(item)}
                                onChange={(html, delta, source) => {
                                  if (source !== "user") return;
                                  const newArr = [...value];
                                  newArr[idx] = html;
                                  const newParsed = {
                                    ...parsed,
                                    [key]: newArr,
                                  };
                                  setContent(
                                    JSON.stringify(newParsed, null, 4),
                                  );
                                }}
                              />
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={String(item)}
                              onChange={(e) => {
                                const newArr = [...value];
                                newArr[idx] = e.target.value;
                                const newParsed = { ...parsed, [key]: newArr };
                                setContent(JSON.stringify(newParsed, null, 4));
                              }}
                              className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const sample =
                        value.length > 0 && typeof value[0] === "object"
                          ? Object.fromEntries(
                              Object.keys(value[0]).map((k) => [k, ""]),
                            )
                          : "";
                      const newArr = [...value, sample];
                      const newParsed = { ...parsed, [key]: newArr };
                      setContent(JSON.stringify(newParsed, null, 4));
                    }}
                    className="text-xs font-bold text-orange-600 uppercase tracking-widest hover:text-orange-700"
                  >
                    + Add Item
                  </button>
                </div>
              ) : typeof value === "object" && value !== null ? (
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
                  {Object.entries(value).map(([subKey, subValue]) => (
                    <div key={subKey}>
                      <label className="block text-xs font-semibold text-gray-500 mb-1 capitalize">
                        {subKey.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}
                      </label>
                      {isTextareaField(subKey, subValue) ? (
                        <div className="bg-white border text-black border-gray-200 rounded-lg pb-2">
                          <ReactQuill
                            theme="snow"
                            modules={quillModules}
                            value={String(subValue)}
                            onChange={(html, delta, source) => {
                              if (source !== "user") return;
                              const newParsed = {
                                ...parsed,
                                [key]: { ...value, [subKey]: html },
                              };
                              setContent(JSON.stringify(newParsed, null, 4));
                            }}
                          />
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={String(subValue)}
                          onChange={(e) => {
                            const newParsed = {
                              ...parsed,
                              [key]: { ...value, [subKey]: e.target.value },
                            };
                            setContent(JSON.stringify(newParsed, null, 4));
                          }}
                          className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {isTextareaField(key, value) ? (
                    <div className="bg-white border text-black border-gray-100 rounded-lg pb-2 shadow-sm">
                      <ReactQuill
                        theme="snow"
                        modules={quillModules}
                        value={String(value)}
                        onChange={(html, delta, source) => {
                          if (source !== "user") return;
                          const newParsed = { ...parsed, [key]: html };
                          setContent(JSON.stringify(newParsed, null, 4));
                        }}
                      />
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={String(value)}
                      onChange={(e) => {
                        const newParsed = { ...parsed, [key]: e.target.value };
                        setContent(JSON.stringify(newParsed, null, 4));
                      }}
                      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    } catch {
      return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Page Content Editor
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all text, images, and data across every page of the website.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              fetchPages();
              if (selectedPage) fetchSections();
            }}
            className="p-4 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-all shadow-sm"
            title="Refresh Content"
          >
            <FaSync className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={handleSave}
            disabled={saveLoading || !selectedSection}
            className={`px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-200 flex items-center gap-3 transition-all ${saveLoading || !selectedSection ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-0.5"}`}
          >
            {saveLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
            className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm"
          >
            <FaExclamationTriangle /> <span>{error}</span>
            <button onClick={() => setError("")} className="ml-auto">
              <FaTimes />
            </button>
          </motion.div>
        )}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-600 text-sm"
          >
            <FaSave /> <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Pages & Sections */}
        <div className="lg:col-span-1 space-y-6">
          {/* Pages */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <FaFileAlt className="text-orange-500" /> Pages
              </label>
              <button
                onClick={() => setShowAddPage(true)}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
              >
                <FaPlus size={10} /> Add
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {pages.map((page) => (
                <div key={page} className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedPage(page)}
                    className={`flex-1 p-3 rounded-xl text-left font-bold transition-all capitalize text-sm ${
                      selectedPage === page
                        ? "bg-orange-500 text-white shadow-lg"
                        : "bg-white text-gray-600 border border-gray-100 hover:border-orange-200"
                    }`}
                  >
                    {page.replace(/-/g, " ")}
                  </button>
                  <button
                    onClick={() => handleDeletePage(page)}
                    className="p-2 text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
                    title="Delete page"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
              {pages.length === 0 && (
                <div className="p-4 text-xs text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-center">
                  No pages yet. Click "Add" to create one.
                </div>
              )}
            </div>
          </div>

          {/* Sections */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <FaLayerGroup className="text-blue-500" /> Sections
              </label>
              {selectedPage && (
                <button
                  onClick={() => setShowAddSection(true)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <FaPlus size={10} /> Add
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-2">
              {sections
                .filter((s) => s.section !== "seo-settings")
                .map((sec) => (
                  <div key={sec._id} className="flex items-center gap-1">
                    <button
                      onClick={() => handleSectionChange(sec)}
                      className={`flex-1 p-3 rounded-xl text-left text-sm font-medium transition-all ${
                        selectedSection?._id === sec._id
                          ? "bg-slate-900 text-white shadow-lg"
                          : "bg-white text-gray-500 border border-gray-100 hover:border-gray-300"
                      }`}
                    >
                      {sec.section
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")}
                    </button>
                    <button
                      onClick={() => handleDeleteSection(sec)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
                      title="Delete section"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              {sections.filter((s) => s.section !== "seo-settings").length ===
                0 &&
                selectedPage && (
                  <div className="p-4 text-xs text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-center">
                    No sections. Click "Add" to create one.
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="lg:col-span-3 space-y-4">
          {selectedSection ? (
            <>
              {/* View Mode Toggle */}
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => setViewMode("form")}
                  className={`px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${viewMode === "form" ? "bg-slate-900 text-white" : "bg-white text-gray-500 border border-gray-100"}`}
                >
                  <FaEye /> Form View
                </button>
                <button
                  onClick={() => setViewMode("json")}
                  className={`px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${viewMode === "json" ? "bg-slate-900 text-white" : "bg-white text-gray-500 border border-gray-100"}`}
                >
                  <FaCode /> JSON View
                </button>
              </div>

              {/* Content Editor */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-gray-400">
                    <FaLayerGroup className="text-orange-500" />
                    <span className="text-xs font-bold tracking-widest uppercase">
                      {selectedPage} / {selectedSection?.section}
                    </span>
                  </div>
                  <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-500 font-bold uppercase">
                    {viewMode === "json" ? "JSON" : "FORM"}
                  </span>
                </div>

                <div className="p-6">
                  {viewMode === "form" ? (
                    renderFormFields() || (
                      <div className="text-center text-gray-400 py-8">
                        <p>Cannot render form for this content structure.</p>
                        <button
                          onClick={() => setViewMode("json")}
                          className="text-orange-600 font-bold mt-2"
                        >
                          Switch to JSON View
                        </button>
                      </div>
                    )
                  ) : (
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      spellCheck="false"
                      className="w-full p-4 font-mono text-sm text-slate-800 bg-gray-50 rounded-xl outline-none resize-none leading-relaxed border border-gray-100 focus:ring-2 focus:ring-orange-500 min-h-[400px]"
                      placeholder="Enter content JSON..."
                    />
                  )}
                </div>
              </div>

              {/* SEO Settings */}
              {(() => {
                try {
                  const seo = JSON.parse(seoContent);
                  const updateSeo = (field, val) =>
                    setSeoContent(
                      JSON.stringify({ ...seo, [field]: val }, null, 4),
                    );
                  const addFaq = () =>
                    updateSeo("faqSchema", [
                      ...(seo.faqSchema || []),
                      { question: "", answer: "" },
                    ]);
                  const updateFaq = (idx, field, val) =>
                    updateSeo(
                      "faqSchema",
                      (seo.faqSchema || []).map((faq, i) =>
                        i === idx ? { ...faq, [field]: val } : faq,
                      ),
                    );
                  const removeFaq = (idx) =>
                    updateSeo(
                      "faqSchema",
                      (seo.faqSchema || []).filter((_, i) => i !== idx),
                    );

                  return (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mt-6">
                      <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-3 text-gray-500">
                        <FaCode className="text-orange-500" />
                        <span className="text-xs font-bold tracking-widest uppercase">
                          Page SEO Settings
                        </span>
                      </div>
                      <div className="p-6 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                              Meta Title
                            </label>
                            <input
                              type="text"
                              value={seo.metaTitle || ""}
                              onChange={(e) =>
                                updateSeo("metaTitle", e.target.value)
                              }
                              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                              Meta Keywords
                            </label>
                            <input
                              type="text"
                              value={seo.metaKeywords || ""}
                              onChange={(e) =>
                                updateSeo("metaKeywords", e.target.value)
                              }
                              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm transition-all"
                              placeholder="keyword1, keyword2"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                              Canonical URL
                            </label>
                            <input
                              type="text"
                              value={seo.canonicalUrl || ""}
                              onChange={(e) =>
                                updateSeo("canonicalUrl", e.target.value)
                              }
                              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                              Robots Tag
                            </label>
                            <input
                              type="text"
                              value={seo.robotsTag || ""}
                              onChange={(e) =>
                                updateSeo("robotsTag", e.target.value)
                              }
                              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm transition-all"
                              placeholder="index, follow"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Meta Description
                          </label>
                          <textarea
                            value={seo.metaDescription || ""}
                            onChange={(e) =>
                              updateSeo("metaDescription", e.target.value)
                            }
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm h-24 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Schema Markup (JSON-LD)
                          </label>
                          <p className="text-xs text-gray-400 mb-2">
                            Paste raw JSON-LD schema objects without script tags
                            here. Used for structured data like Person,
                            Organization, etc.
                          </p>
                          <textarea
                            value={seo.schemaMarkup || ""}
                            onChange={(e) =>
                              updateSeo("schemaMarkup", e.target.value)
                            }
                            className="w-full p-3 font-mono text-xs text-green-400 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none h-32 transition-all shadow-inner"
                            placeholder='{ "@context": "https://schema.org", "@type": "Organization", "name": "WCFW" }'
                            spellCheck="false"
                          />
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="text-sm font-bold text-gray-800">
                                FAQ Schema Builder
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                Automatically generates FAQPage schema for this
                                page.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={addFaq}
                              className="flex items-center gap-1 px-4 py-2 bg-blue-50 text-blue-600 font-bold text-xs rounded-lg hover:bg-blue-100 transition-colors"
                            >
                              <FaPlus /> Add FAQ
                            </button>
                          </div>
                          <div className="space-y-4">
                            {(seo.faqSchema || []).map((faq, idx) => (
                              <div
                                key={idx}
                                className="p-4 bg-gray-50 border border-gray-200 rounded-xl relative group transition-all hover:border-gray-300"
                              >
                                <button
                                  type="button"
                                  onClick={() => removeFaq(idx)}
                                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors bg-white p-1.5 rounded-full shadow-sm hover:shadow"
                                >
                                  <FaTrash size={12} />
                                </button>
                                <div className="mb-3 pr-8">
                                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                                    Question {idx + 1}
                                  </label>
                                  <input
                                    type="text"
                                    value={faq.question}
                                    onChange={(e) =>
                                      updateFaq(idx, "question", e.target.value)
                                    }
                                    className="w-full p-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm shadow-sm transition-all"
                                    placeholder="e.g., What are the benefits of Mutual Funds?"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                                    Answer
                                  </label>
                                  <textarea
                                    value={faq.answer}
                                    onChange={(e) =>
                                      updateFaq(idx, "answer", e.target.value)
                                    }
                                    className="w-full p-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm h-20 shadow-sm transition-all"
                                    placeholder="Provide a concise answer..."
                                  />
                                </div>
                              </div>
                            ))}
                            {(seo.faqSchema || []).length === 0 && (
                              <div className="text-sm text-center font-medium border-2 border-dashed border-gray-200 rounded-xl text-gray-400 py-8 bg-gray-50">
                                No FAQs added. Click "Add FAQ" to start building
                                FAQPage schema.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } catch (e) {
                  return (
                    <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden mt-6">
                      <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center gap-3 text-slate-400">
                        <FaCode className="text-orange-500" />
                        <span className="text-xs font-bold tracking-widest uppercase">
                          Page SEO Settings (Raw JSON)
                        </span>
                      </div>
                      <div className="p-4 bg-red-900/20 text-red-400 border-b border-red-900/30 text-xs font-mono">
                        Error parsing SEO settings. Showing raw JSON editor as
                        fallback.
                      </div>
                      <textarea
                        value={seoContent}
                        onChange={(e) => setSeoContent(e.target.value)}
                        spellCheck="false"
                        className="w-full p-6 font-mono text-sm text-slate-300 bg-slate-900 outline-none resize-none leading-relaxed min-h-[200px]"
                        placeholder="Page meta tags JSON..."
                      />
                    </div>
                  );
                }
              })()}
            </>
          ) : (
            <div className="bg-gray-50 rounded-3xl p-16 border-2 border-dashed border-gray-200 text-center text-gray-400">
              <FaFileAlt className="text-5xl mx-auto mb-4 opacity-20" />
              <p className="font-medium text-lg">
                Select a page and section to start editing
              </p>
              <p className="text-sm mt-2">
                Or create a new page using the "Add" button on the left.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Page Modal */}
      <AnimatePresence>
        {showAddPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddPage(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Add New Page
              </h3>
              <input
                type="text"
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
                placeholder="e.g. careers, faq, pricing"
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none mb-4"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleAddPage()}
              />
              <p className="text-xs text-gray-400 mb-6">
                Page name will be auto-formatted (lowercase, hyphenated). A
                default "hero" section will be created.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddPage(false)}
                  className="px-4 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPage}
                  className="px-6 py-2 bg-orange-600 text-white font-bold rounded-xl shadow-lg"
                >
                  Create Page
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Section Modal */}
      <AnimatePresence>
        {showAddSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddSection(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Add Section to "{selectedPage}"
              </h3>
              <input
                type="text"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                placeholder="e.g. hero, features, cta, stats"
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none mb-4"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleAddSection()}
              />
              <p className="text-xs text-gray-400 mb-6">
                Section name will be auto-formatted. A default content structure
                will be created.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddSection(false)}
                  className="px-4 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSection}
                  className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-lg"
                >
                  Add Section
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentEditor;
