import React, { useState, useEffect, useRef, useCallback } from "react";

import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaEye,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { PageLoader } from "../../components/LoadingSkeletons";
import api from "../../utils/api";
import renderBlogContent from "../../utils/renderBlogContent";

// Toolbar: H2/H3/H4 only (no H1 — title is the post's H1).
// Image button uploads to /api/upload and inserts the persisted URL.
const buildQuillModules = (imageHandler) => ({
  toolbar: {
    container: [
      [{ header: [2, 3, 4, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "link", "image"],
      ["clean"],
    ],
    handlers: { image: imageHandler },
  },
});

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "blockquote",
  "link",
  "image",
];

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    author: "Nikhil Thakkar",
    image: "",
    tags: [],
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    canonicalUrl: "",
    faq: [],
  });

  const [uploading, setUploading] = useState(false);
  const quillRef = useRef(null);

  // Inline image handler — opens a file picker, uploads to /api/upload,
  // then inserts the returned URL directly into the editor content.
  const handleInlineImageUpload = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/jpg,image/png,image/webp";
    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await api.post("/upload", formData);
        const editor = quillRef.current?.getEditor();
        if (editor) {
          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, "image", res.data.url);
          editor.setSelection(range.index + 1);
        }
      } catch (err) {
        alert("Image upload failed: " + (err.response?.data?.message || err.message));
      }
    };
    input.click();
  }, []);

  const quillModules = buildQuillModules(handleInlineImageUpload);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    // Reset so same file can be re-selected
    e.target.value = "";

    setUploading(true);
    try {
      // Do NOT pass Content-Type header manually.
      // When FormData is the body, the browser must set it with the correct
      // multipart boundary — if you set it manually, the boundary is missing
      // and the server (multer) cannot parse the file.
      const res = await api.post("/upload", formData);
      setCurrentBlog((prev) => ({ ...prev, image: res.data.url }));
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Upload failed: " + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blog");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    // Legacy posts were stored as plain text; convert to HTML so the rich-text
    // editor shows them with their original paragraphs intact.
    setCurrentBlog({ ...blog, content: renderBlogContent(blog.content) });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await api.delete(`/blog/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentBlog._id) {
        await api.put(`/blog/${currentBlog._id}`, currentBlog);
      } else {
        await api.post("/blog", currentBlog);
      }
      setIsEditing(false);
      fetchBlogs();
      resetForm();
    } catch (err) {
      console.error("Error saving blog:", err);
    }
  };

  const resetForm = () => {
    setCurrentBlog({
      title: "",
      slug: "",
      summary: "",
      content: "",
      author: "Nikhil Thakkar",
      image: "",
      tags: [],
    });
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-500 mt-1">
            Manage all articles and investment guides.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => {
              resetForm();
              setIsEditing(true);
            }}
            className="px-6 py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-200 flex items-center gap-3 transition-all hover:-translate-y-0.5 outline-none"
          >
            <FaPlus /> Create New Blog
          </button>
        )}
      </div>

      <AnimatePresence>
        {isEditing ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {currentBlog._id ? "Edit Blog" : "Create New Blog"}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-gray-600 outline-none"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={currentBlog.title}
                    onChange={(e) =>
                      setCurrentBlog({
                        ...currentBlog,
                        title: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/ /g, "-"),
                      })
                    }
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    required
                    value={currentBlog.slug}
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, slug: e.target.value })
                    }
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Featured Image
                  </label>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={currentBlog.image}
                        onChange={(e) =>
                          setCurrentBlog({
                            ...currentBlog,
                            image: e.target.value,
                          })
                        }
                        className="flex-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                        placeholder="Image URL"
                      />
                      <div className="relative">
                        <input
                          type="file"
                          id="img-upload"
                          onChange={handleImageUpload}
                          className="hidden"
                          accept="image/*"
                        />
                        <label
                          htmlFor="img-upload"
                          className={`px-6 py-3 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center border-2 border-dashed ${uploading ? "bg-gray-100 border-gray-300" : "bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100 hover:border-orange-300"}`}
                        >
                          {uploading ? "Uploading..." : "Upload Image"}
                        </label>
                      </div>
                    </div>
                    {currentBlog.image && (
                      <div className="relative w-40 h-24 rounded-xl overflow-hidden border border-gray-100 group">
                        <img
                          src={currentBlog.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentBlog({ ...currentBlog, image: "" })
                          }
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity outline-none"
                        >
                          <span className="text-white text-xs font-bold uppercase tracking-widest">
                            Remove
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Author Name
                  </label>
                  <input
                    type="text"
                    required
                    value={currentBlog.author}
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, author: e.target.value })
                    }
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Summary
                </label>
                <textarea
                  required
                  value={currentBlog.summary}
                  onChange={(e) =>
                    setCurrentBlog({ ...currentBlog, summary: e.target.value })
                  }
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none h-20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Use the toolbar to add headings (H2/H3), bold text, lists, and
                  links. Highlight text and click the link icon to add an
                  internal link (e.g. /services/mutual-fund) or an external URL.
                </p>
                <style>{`
                  .blog-editor .ql-container { border-bottom-left-radius: 0.75rem; border-bottom-right-radius: 0.75rem; background: #f9fafb; }
                  .blog-editor .ql-toolbar { border-top-left-radius: 0.75rem; border-top-right-radius: 0.75rem; background: #fff; }
                  .blog-editor .ql-editor { min-height: 20rem; font-size: 0.95rem; }
                `}</style>
                <div className="blog-editor">
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={currentBlog.content}
                    onChange={(value) =>
                      setCurrentBlog({ ...currentBlog, content: value })
                    }
                    modules={quillModules}
                    formats={quillFormats}
                  />
                </div>
              </div>

              {/* SEO Settings Section */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  SEO Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={currentBlog.metaTitle || ""}
                      onChange={(e) =>
                        setCurrentBlog({
                          ...currentBlog,
                          metaTitle: e.target.value,
                        })
                      }
                      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                      placeholder="Leave empty for default"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Canonical URL
                    </label>
                    <input
                      type="text"
                      value={currentBlog.canonicalUrl || ""}
                      onChange={(e) =>
                        setCurrentBlog({
                          ...currentBlog,
                          canonicalUrl: e.target.value,
                        })
                      }
                      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      value={currentBlog.metaDescription || ""}
                      onChange={(e) =>
                        setCurrentBlog({
                          ...currentBlog,
                          metaDescription: e.target.value,
                        })
                      }
                      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none h-20"
                    />
                  </div>
                </div>
              </div>

              {/* FAQ Schema Section */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    FAQ Schema
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentBlog({
                        ...currentBlog,
                        faq: [
                          ...(currentBlog.faq || []),
                          { question: "", answer: "" },
                        ],
                      })
                    }
                    className="text-xs font-bold text-orange-600 uppercase tracking-widest hover:text-orange-700 outline-none"
                  >
                    + Add FAQ
                  </button>
                </div>
                <div className="space-y-4">
                  {(currentBlog.faq || []).map((f, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gray-50 rounded-2xl border border-gray-100 relative group"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          const newFaq = [...currentBlog.faq];
                          newFaq.splice(idx, 1);
                          setCurrentBlog({ ...currentBlog, faq: newFaq });
                        }}
                        className="absolute top-2 right-2 text-gray-300 hover:text-red-500 outline-none"
                      >
                        <FaTrash size={12} />
                      </button>
                      <input
                        className="w-full mb-2 p-2 bg-transparent border-b border-gray-200 focus:border-orange-500 outline-none text-sm font-bold"
                        placeholder="Question"
                        value={f.question}
                        onChange={(e) => {
                          const newFaq = [...currentBlog.faq];
                          newFaq[idx].question = e.target.value;
                          setCurrentBlog({ ...currentBlog, faq: newFaq });
                        }}
                      />
                      <textarea
                        className="w-full p-2 bg-transparent focus:border-orange-500 outline-none text-sm"
                        placeholder="Answer"
                        value={f.answer}
                        onChange={(e) => {
                          const newFaq = [...currentBlog.faq];
                          newFaq[idx].answer = e.target.value;
                          setCurrentBlog({ ...currentBlog, faq: newFaq });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-all outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-slate-200 transition-all outline-none"
                >
                  <FaSave className="inline-block mr-2" /> Save Blog
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                layout
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-shadow group"
              >
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FaEye className="text-4xl opacity-20" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 bg-white/90 backdrop-blur-sm text-blue-600 rounded-lg shadow-sm hover:bg-blue-600 hover:text-white transition-all outline-none"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="p-2 bg-white/90 backdrop-blur-sm text-red-600 rounded-lg shadow-sm hover:bg-red-600 hover:text-white transition-all outline-none"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                    {blog.summary}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50 text-xs text-gray-400">
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span>{blog.author}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogManager;
