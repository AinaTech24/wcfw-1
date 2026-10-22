import React, { useState, useEffect, useCallback, useMemo } from "react";
import api from "../../utils/api";
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
  FaGripVertical,
  FaSort,
  FaCheck,
} from "react-icons/fa";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const API = "/content";

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
  "calculators",
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
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [modalSections, setModalSections] = useState([]);
  const [reorderLoading, setReorderLoading] = useState(false);
  const [newPageName, setNewPageName] = useState("");
  const [newSectionName, setNewSectionName] = useState("");
  const [viewMode, setViewMode] = useState("form"); // 'form' or 'json'

  // Fetch all unique pages
  const fetchPages = useCallback(async () => {
    try {
      const res = await api.get(API);
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
      const res = await api.get(`${API}?page=${selectedPage}`);
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

  const contentSections = useMemo(
    () => sections.filter((s) => s.section !== "seo-settings"),
    [sections],
  );

  const openReorderModal = () => {
    setModalSections([...contentSections]);
    setShowReorderModal(true);
  };

  const handleSaveReorder = async () => {
    setReorderLoading(true);
    try {
      const seoSection = sections.find((s) => s.section === "seo-settings");
      const merged = seoSection ? [...modalSections, seoSection] : modalSections;
      setSections(merged);

      const orderedIds = modalSections.map((s) => s.id || s._id);
      await api.post(`${API}/reorder`, {
        page: selectedPage,
        orderedIds,
      });

      setShowReorderModal(false);
      setMessage("Section order updated successfully!");
      setTimeout(() => setMessage(""), 2500);
    } catch (err) {
      setError("Failed to save section order.");
      fetchSections();
    } finally {
      setReorderLoading(false);
    }
  };

  const handleSave = async () => {
    setSaveLoading(true);
    setError("");
    setMessage("");
    try {
      const parsedContent = JSON.parse(content);
      const parsedSeo = JSON.parse(seoContent);

      await api.post(`${API}/update`, {
        page: selectedPage,
        section: selectedSection.section,
        content: parsedContent,
      });

      await api.post(`${API}/update`, {
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
      await api.post(`${API}/update`, {
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
      await api.post(`${API}/update`, {
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

  // Delete a section
  const handleDeleteSection = async (section) => {
    const sectionId = section.id || section._id;
    if (!sectionId) {
      setError("Cannot delete section: Section ID is missing.");
      return;
    }
    if (
      !window.confirm(
        `Delete section "${section.section}" from page "${selectedPage}"?`,
      )
    )
      return;
    try {
      // Use the delete content endpoint
      await api.delete(`${API}/${sectionId}`);
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
      await api.delete(`${API}/page/${pageName}`);
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
              <label className="block mb-2 text-sm font-semibold text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}
              </label>
              {Array.isArray(value) ? (
                <div className="space-y-3">
                  {value.map((item, idx) => (
                    <div
                      key={idx}
                      className="relative p-4 border border-gray-100 bg-gray-50 rounded-xl group"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          const newArr = [...value];
                          newArr.splice(idx, 1);
                          const newParsed = { ...parsed, [key]: newArr };
                          setContent(JSON.stringify(newParsed, null, 4));
                        }}
                        className="absolute text-gray-300 transition-opacity opacity-0 top-2 right-2 hover:text-red-500 group-hover:opacity-100"
                      >
                        <FaTrash size={12} />
                      </button>
                      {typeof item === "object" && item !== null ? (
                        Object.entries(item).map(([subKey, subValue]) => (
                          <div key={subKey} className="mb-2">
                            <label className="block mb-1 text-xs font-semibold text-gray-500 capitalize">
                              {subKey
                                .replace(/([A-Z])/g, " $1")
                                .replace(/_/g, " ")}
                            </label>
                            {isTextareaField(subKey, subValue) ? (
                              <div className="pb-2 text-black bg-white border border-gray-200 rounded-lg">
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
                                className="w-full p-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                              />
                            )}
                          </div>
                        ))
                      ) : (
                        <div>
                          {isTextareaField(key, item) ? (
                            <div className="pb-2 text-black bg-white border border-gray-200 rounded-lg">
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
                              className="w-full p-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
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
                    className="text-xs font-bold tracking-widest text-orange-600 uppercase hover:text-orange-700"
                  >
                    + Add Item
                  </button>
                </div>
              ) : typeof value === "object" && value !== null ? (
                <div className="p-4 space-y-3 border border-gray-100 bg-gray-50 rounded-xl">
                  {Object.entries(value).map(([subKey, subValue]) => (
                    <div key={subKey}>
                      <label className="block mb-1 text-xs font-semibold text-gray-500 capitalize">
                        {subKey.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}
                      </label>
                      {isTextareaField(subKey, subValue) ? (
                        <div className="pb-2 text-black bg-white border border-gray-200 rounded-lg">
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
                          className="w-full p-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {isTextareaField(key, value) ? (
                    <div className="pb-2 text-black bg-white border border-gray-100 rounded-lg shadow-sm">
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
                      className="w-full p-3 border border-gray-100 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-500"
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
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Page Content Editor
          </h1>
          <p className="mt-1 text-gray-500">
            Manage all text, images, and data across every page of the website.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              fetchPages();
              if (selectedPage) fetchSections();
            }}
            className="p-4 text-gray-600 transition-all bg-gray-100 shadow-sm rounded-2xl hover:bg-gray-200"
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
            className="flex items-center gap-3 p-4 text-sm border bg-emerald-50 border-emerald-100 rounded-2xl text-emerald-600"
          >
            <FaSave /> <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left Sidebar - Pages & Sections */}
        <div className="space-y-6 lg:col-span-1">
          {/* Pages */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
                <FaFileAlt className="text-orange-500" /> Pages
              </label>
              <button
                onClick={() => setShowAddPage(true)}
                className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700"
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
                    className="flex-shrink-0 p-2 text-gray-300 transition-colors hover:text-red-500"
                    title="Delete page"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
              {pages.length === 0 && (
                <div className="p-4 text-xs text-center text-gray-400 border-2 border-gray-200 border-dashed bg-gray-50 rounded-xl">
                  No pages yet. Click "Add" to create one.
                </div>
              )}
            </div>
          </div>

          {/* Sections */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
                <FaLayerGroup className="text-blue-500" /> Sections
              </label>
              <div className="flex items-center gap-1.5">
                {selectedPage && contentSections.length > 1 && (
                  <button
                    onClick={openReorderModal}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shadow-sm"
                    title="Open reorder modal"
                  >
                    <FaSort className="text-slate-500" size={11} /> Reorder
                  </button>
                )}
                {selectedPage && (
                  <button
                    onClick={() => setShowAddSection(true)}
                    className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    <FaPlus size={10} /> Add
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {contentSections.map((sec, idx) => {
                const secId = sec.id || sec._id;
                const isSelected =
                  (selectedSection?._id || selectedSection?.id) === secId;
                return (
                  <div
                    key={secId}
                    className="flex items-center gap-1"
                  >
                    <button
                      type="button"
                      onClick={() => handleSectionChange(sec)}
                      className={`flex-1 p-3 rounded-xl text-left text-sm font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-slate-900 text-white shadow-lg"
                          : "bg-white text-gray-700 border border-gray-100 hover:border-gray-300"
                      }`}
                    >
                      <span>
                        {sec.section
                          .split("-")
                          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                          .join(" ")}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        #{idx + 1}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSection(sec)}
                      className="flex-shrink-0 p-2 text-gray-300 transition-colors hover:text-red-500"
                      title="Delete section"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
            {contentSections.length === 0 && selectedPage && (
              <div className="p-4 text-xs text-center text-gray-400 border-2 border-gray-200 border-dashed bg-gray-50 rounded-xl">
                No sections. Click "Add" to create one.
              </div>
            )}
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="space-y-4 lg:col-span-3">
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
              <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
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
                      <div className="py-8 text-center text-gray-400">
                        <p>Cannot render form for this content structure.</p>
                        <button
                          onClick={() => setViewMode("json")}
                          className="mt-2 font-bold text-orange-600"
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
                    <div className="mt-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
                      <div className="flex items-center gap-3 p-4 text-gray-500 border-b border-gray-100 bg-gray-50">
                        <FaCode className="text-orange-500" />
                        <span className="text-xs font-bold tracking-widest uppercase">
                          Page SEO Settings
                        </span>
                      </div>
                      <div className="p-6 space-y-5">
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                          <div>
                            <label className="block mb-1 text-sm font-semibold text-gray-700">
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
                            <label className="block mb-1 text-sm font-semibold text-gray-700">
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
                            <label className="block mb-1 text-sm font-semibold text-gray-700">
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
                            <label className="block mb-1 text-sm font-semibold text-gray-700">
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
                          <label className="block mb-1 text-sm font-semibold text-gray-700">
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
                          <label className="block mb-1 text-sm font-semibold text-gray-700">
                            Schema Markup (JSON-LD)
                          </label>
                          <p className="mb-2 text-xs text-gray-400">
                            Paste raw JSON-LD schema objects without script tags
                            here. Used for structured data like Person,
                            Organization, etc.
                          </p>
                          <textarea
                            value={seo.schemaMarkup || ""}
                            onChange={(e) =>
                              updateSeo("schemaMarkup", e.target.value)
                            }
                            className="w-full h-32 p-3 font-mono text-xs text-green-400 transition-all border rounded-lg shadow-inner outline-none bg-slate-900 border-slate-700 focus:ring-2 focus:ring-orange-500"
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
                              <p className="mt-1 text-xs text-gray-500">
                                Automatically generates FAQPage schema for this
                                page.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={addFaq}
                              className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
                            >
                              <FaPlus /> Add FAQ
                            </button>
                          </div>
                          <div className="space-y-4">
                            {(seo.faqSchema || []).map((faq, idx) => (
                              <div
                                key={idx}
                                className="relative p-4 transition-all border border-gray-200 bg-gray-50 rounded-xl group hover:border-gray-300"
                              >
                                <button
                                  type="button"
                                  onClick={() => removeFaq(idx)}
                                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors bg-white p-1.5 rounded-full shadow-sm hover:shadow"
                                >
                                  <FaTrash size={12} />
                                </button>
                                <div className="pr-8 mb-3">
                                  <label className="block mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
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
                                  <label className="block mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
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
                              <div className="py-8 text-sm font-medium text-center text-gray-400 border-2 border-gray-200 border-dashed rounded-xl bg-gray-50">
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
                    <div className="mt-6 overflow-hidden border shadow-xl bg-slate-900 rounded-3xl border-slate-800">
                      <div className="flex items-center gap-3 p-4 border-b bg-slate-800 border-slate-700 text-slate-400">
                        <FaCode className="text-orange-500" />
                        <span className="text-xs font-bold tracking-widest uppercase">
                          Page SEO Settings (Raw JSON)
                        </span>
                      </div>
                      <div className="p-4 font-mono text-xs text-red-400 border-b bg-red-900/20 border-red-900/30">
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
            <div className="p-16 text-center text-gray-400 border-2 border-gray-200 border-dashed bg-gray-50 rounded-3xl">
              <FaFileAlt className="mx-auto mb-4 text-5xl opacity-20" />
              <p className="text-lg font-medium">
                Select a page and section to start editing
              </p>
              <p className="mt-2 text-sm">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowAddPage(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Add New Page
              </h3>
              <input
                type="text"
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
                placeholder="e.g. careers, faq, pricing"
                className="w-full p-3 mb-4 border border-gray-100 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-500"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleAddPage()}
              />
              <p className="mb-6 text-xs text-gray-400">
                Page name will be auto-formatted (lowercase, hyphenated). A
                default "hero" section will be created.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddPage(false)}
                  className="px-4 py-2 font-bold text-gray-500 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPage}
                  className="px-6 py-2 font-bold text-white bg-orange-600 shadow-lg rounded-xl"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowAddSection(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Add Section to "{selectedPage}"
              </h3>
              <input
                type="text"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                placeholder="e.g. hero, features, cta, stats"
                className="w-full p-3 mb-4 border border-gray-100 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-500"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleAddSection()}
              />
              <p className="mb-6 text-xs text-gray-400">
                Section name will be auto-formatted. A default content structure
                will be created.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddSection(false)}
                  className="px-4 py-2 font-bold text-gray-500 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSection}
                  className="px-6 py-2 font-bold text-white bg-blue-600 shadow-lg rounded-xl"
                >
                  Add Section
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reorder Sections Modal */}
      <AnimatePresence>
        {showReorderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => !reorderLoading && setShowReorderModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="w-full max-w-lg p-6 bg-white shadow-2xl rounded-3xl border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FaSort className="text-orange-500" /> Reorder Sections
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Page: <span className="font-semibold text-gray-800 capitalize">{selectedPage}</span> &bull; Drag handles to change layout order
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowReorderModal(false)}
                  disabled={reorderLoading}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <FaTimes size={16} />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto pr-1 mb-6">
                <Reorder.Group
                  axis="y"
                  values={modalSections}
                  onReorder={setModalSections}
                  className="space-y-2.5"
                >
                  {modalSections.map((sec, index) => {
                    const secId = sec.id || sec._id;
                    return (
                      <Reorder.Item
                        key={secId}
                        value={sec}
                        className="flex items-center gap-3 p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-2xl cursor-grab active:cursor-grabbing select-none transition-colors"
                        whileDrag={{
                          scale: 1.02,
                          backgroundColor: "#ffffff",
                          boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.15)",
                          borderColor: "#f97316",
                          zIndex: 60,
                        }}
                      >
                        <div className="p-1 text-gray-400 hover:text-orange-500 transition-colors">
                          <FaGripVertical size={16} />
                        </div>
                        <span className="w-7 h-7 flex items-center justify-center text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm">
                          {index + 1}
                        </span>
                        <div className="flex-1 font-semibold text-sm text-slate-800">
                          {sec.section
                            .split("-")
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(" ")}
                        </div>
                        <span className="text-xs text-gray-400 font-mono">
                          {sec.section}
                        </span>
                      </Reorder.Item>
                    );
                  })}
                </Reorder.Group>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowReorderModal(false)}
                  disabled={reorderLoading}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveReorder}
                  disabled={reorderLoading}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 shadow-md shadow-orange-200 rounded-xl flex items-center gap-2 transition-all hover:-translate-y-0.5"
                >
                  {reorderLoading ? (
                    <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  ) : (
                    <FaCheck size={13} />
                  )}
                  Save Order
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
