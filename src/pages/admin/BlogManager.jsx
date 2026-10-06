import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

import {
  FaPlus,
  FaMinus,
  FaTrash,
  FaEdit,
  FaEye,
  FaSave,
  FaTimes,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaCheck,
  FaImage,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { PageLoader } from "../../components/LoadingSkeletons";
import api from "../../utils/api";
import renderBlogContent from "../../utils/renderBlogContent";

// Register custom ResizableImage with Quill
if (Quill) {
  const BaseImage = Quill.import("formats/image");
  class ResizableImage extends BaseImage {
    static create(value) {
      const src = typeof value === "object" ? value.src : value;
      const node = super.create(src);
      if (typeof value === "object") {
        if (value.width) {
          node.setAttribute("width", value.width);
          node.style.width = value.width;
        }
        if (value.height) {
          node.setAttribute("height", value.height);
          node.style.height = value.height;
        }
        if (value.style) node.setAttribute("style", value.style);
        if (value.alt) node.setAttribute("alt", value.alt);
      }
      return node;
    }

    static formats(domNode) {
      const formats = {};
      if (domNode.hasAttribute("src")) formats.src = domNode.getAttribute("src");
      const width = domNode.getAttribute("width") || domNode.style.width;
      if (width) formats.width = width;
      const height = domNode.getAttribute("height") || domNode.style.height;
      if (height) formats.height = height;
      const style = domNode.getAttribute("style");
      if (style) formats.style = style;
      const alt = domNode.getAttribute("alt");
      if (alt) formats.alt = alt;
      return formats;
    }

    format(name, value) {
      if (name === "width") {
        if (value) {
          this.domNode.setAttribute("width", value);
          this.domNode.style.width = value;
        } else {
          this.domNode.removeAttribute("width");
          this.domNode.style.width = "";
        }
      } else if (name === "height") {
        if (value) {
          this.domNode.setAttribute("height", value);
          this.domNode.style.height = value;
        } else {
          this.domNode.removeAttribute("height");
          this.domNode.style.height = "";
        }
      } else if (name === "style") {
        if (value) {
          this.domNode.setAttribute("style", value);
        } else {
          this.domNode.removeAttribute("style");
        }
      } else if (name === "alt") {
        if (value) {
          this.domNode.setAttribute("alt", value);
        } else {
          this.domNode.removeAttribute("alt");
        }
      } else {
        super.format(name, value);
      }
    }
  }
  ResizableImage.blotName = "image";
  ResizableImage.tagName = "IMG";
  Quill.register(ResizableImage, true);
  Quill.register("formats/image", ResizableImage, true);
}

// Toolbar: H2/H3/H4 only (no H1 — title is the post's H1).
// Image handler uploads to /api/upload.
const buildQuillModules = (imageHandler) => ({
  toolbar: {
    container: [
      [{ header: [2, 3, 4, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "link", "image"],
      ["clean"],
    ],
    handlers: {
      image: imageHandler,
    },
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
    imageAlt: "",
    tags: [],
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    canonicalUrl: "",
    faq: [],
  });

  const [uploading, setUploading] = useState(false);
  const quillRef = useRef(null);
  const editorWrapperRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [imgOverlay, setImgOverlay] = useState(null);
  const [customWidthInput, setCustomWidthInput] = useState("");
  const [customAltInput, setCustomAltInput] = useState("");
  const [altSaved, setAltSaved] = useState(false);

  const syncQuillContent = useCallback(() => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const html = editor.root.innerHTML;
      setCurrentBlog((prev) => ({ ...prev, content: html }));
    }
  }, []);

  const updateOverlay = useCallback((img) => {
    if (!img || !editorWrapperRef.current) {
      setImgOverlay(null);
      return;
    }
    const container = editorWrapperRef.current;
    const containerRect = container.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    const top = imgRect.top - containerRect.top + container.scrollTop;
    const left = imgRect.left - containerRect.left + container.scrollLeft;
    const width = imgRect.width;
    const height = imgRect.height;

    const currentW = img.style.width || img.getAttribute("width") || "100%";
    const currentAlt = img.getAttribute("alt") || img.alt || "";
    setImgOverlay({
      top,
      left,
      width,
      height,
      currentWidth: currentW,
    });
    setCustomWidthInput(currentW);
    setCustomAltInput(currentAlt);
  }, []);

  const handleEditorContainerClick = (e) => {
    const clickedImg = e.target && e.target.tagName === "IMG" ? e.target : null;

    if (clickedImg) {
      e.stopPropagation();
      if (selectedImg && selectedImg !== clickedImg) {
        selectedImg.classList.remove("selected-blog-img");
      }
      clickedImg.classList.add("selected-blog-img");
      setSelectedImg(clickedImg);
      updateOverlay(clickedImg);
    } else {
      if (selectedImg) {
        selectedImg.classList.remove("selected-blog-img");
      }
      setSelectedImg(null);
      setImgOverlay(null);
    }
  };

  useEffect(() => {
    if (!isEditing) return;

    const timer = setTimeout(() => {
      const editor = quillRef.current?.getEditor();
      if (!editor?.root) return;

      const handleImgClick = (e) => {
        if (e.target && e.target.tagName === "IMG") {
          e.stopPropagation();
          if (selectedImg && selectedImg !== e.target) {
            selectedImg.classList.remove("selected-blog-img");
          }
          e.target.classList.add("selected-blog-img");
          setSelectedImg(e.target);
          updateOverlay(e.target);
        }
      };

      editor.root.addEventListener("click", handleImgClick);
      return () => {
        editor.root.removeEventListener("click", handleImgClick);
      };
    }, 200);

    return () => clearTimeout(timer);
  }, [isEditing, selectedImg, updateOverlay]);

  useEffect(() => {
    const handleReposition = () => {
      if (selectedImg) {
        updateOverlay(selectedImg);
      }
    };
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);
    return () => {
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [selectedImg, updateOverlay]);

  // Global document click/pointerdown and Escape key to cleanly deselect image
  useEffect(() => {
    if (!selectedImg) return;

    const handleGlobalPointerDown = (e) => {
      const isImgTarget = Boolean(
        (e.target.tagName === "IMG" && e.target.closest(".blog-editor")) ||
        e.target.closest(".img-resizer-overlay") ||
        e.target.closest(".img-top-toolbar")
      );
      if (!isImgTarget) {
        selectedImg.classList.remove("selected-blog-img");
        setSelectedImg(null);
        setImgOverlay(null);
      }
    };

    const handleGlobalKeyDown = (e) => {
      if (e.key === "Escape") {
        if (selectedImg) {
          selectedImg.classList.remove("selected-blog-img");
          setSelectedImg(null);
          setImgOverlay(null);
        }
      }
    };

    document.addEventListener("pointerdown", handleGlobalPointerDown);
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handleGlobalPointerDown);
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [selectedImg]);

  const handleApplySize = (sizeStr) => {
    if (!selectedImg) return;
    selectedImg.style.width = sizeStr;
    selectedImg.setAttribute("width", sizeStr);
    selectedImg.style.maxWidth = "100%";
    selectedImg.style.height = "auto";
    selectedImg.removeAttribute("height");
    try {
      const blot = Quill.find(selectedImg);
      if (blot && typeof blot.format === "function") {
        blot.format("width", sizeStr);
        blot.format("style", selectedImg.getAttribute("style"));
      }
    } catch (e) {}
    syncQuillContent();
    setTimeout(() => updateOverlay(selectedImg), 50);
  };

  const handleApplyAlign = (align) => {
    if (!selectedImg) return;
    if (align === "left") {
      selectedImg.style.display = "block";
      selectedImg.style.marginLeft = "0";
      selectedImg.style.marginRight = "auto";
    } else if (align === "center") {
      selectedImg.style.display = "block";
      selectedImg.style.marginLeft = "auto";
      selectedImg.style.marginRight = "auto";
    } else if (align === "right") {
      selectedImg.style.display = "block";
      selectedImg.style.marginLeft = "auto";
      selectedImg.style.marginRight = "0";
    }
    try {
      const blot = Quill.find(selectedImg);
      if (blot && typeof blot.format === "function") {
        blot.format("style", selectedImg.getAttribute("style"));
      }
    } catch (e) {}
    syncQuillContent();
    setTimeout(() => updateOverlay(selectedImg), 50);
  };

  const handleApplyAlt = (altText) => {
    if (!selectedImg) return;
    const cleanAlt = (altText || "").trim();
    if (cleanAlt) {
      selectedImg.setAttribute("alt", cleanAlt);
    } else {
      selectedImg.removeAttribute("alt");
    }
    try {
      const blot = Quill.find(selectedImg);
      if (blot && typeof blot.format === "function") {
        blot.format("alt", cleanAlt);
      }
    } catch (e) {}
    syncQuillContent();
    setAltSaved(true);
    setTimeout(() => setAltSaved(false), 2000);
  };

  const handleDeleteImage = () => {
    if (!selectedImg) return;
    selectedImg.remove();
    setSelectedImg(null);
    setImgOverlay(null);
    syncQuillContent();
  };

  const handleDragResize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedImg || !editorWrapperRef.current) return;

    const startX = e.clientX;
    const startWidth = selectedImg.getBoundingClientRect().width;
    const maxW = editorWrapperRef.current.clientWidth - 32;

    const onPointerMove = (evt) => {
      const deltaX = evt.clientX - startX;
      const targetW = Math.max(80, Math.min(startWidth + deltaX, maxW));
      const widthVal = `${Math.round(targetW)}px`;
      selectedImg.style.width = widthVal;
      selectedImg.setAttribute("width", widthVal);
      selectedImg.style.maxWidth = "100%";
      selectedImg.style.height = "auto";
      selectedImg.removeAttribute("height");
      updateOverlay(selectedImg);
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      try {
        const blot = Quill.find(selectedImg);
        if (blot && typeof blot.format === "function") {
          blot.format("width", selectedImg.style.width);
          blot.format("style", selectedImg.getAttribute("style"));
        }
      } catch (e) {}
      syncQuillContent();
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

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

  const quillModules = useMemo(
    () => buildQuillModules(handleInlineImageUpload),
    [handleInlineImageUpload]
  );

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
    setCurrentBlog({
      ...blog,
      imageAlt: blog.imageAlt || "",
      content: renderBlogContent(blog.content),
    });
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
      const editor = quillRef.current?.getEditor();
      if (editor?.root) {
        editor.root.querySelectorAll(".selected-blog-img").forEach((el) => {
          el.classList.remove("selected-blog-img");
        });
      }
      const finalContent = editor?.root ? editor.root.innerHTML : currentBlog.content;
      const blogPayload = { ...currentBlog, content: finalContent };

      const blogId = blogPayload.id || blogPayload._id;
      if (blogId) {
        await api.put(`/blog/${blogId}`, blogPayload);
      } else {
        await api.post("/blog", blogPayload);
      }
      setIsEditing(false);
      fetchBlogs();
      resetForm();
    } catch (err) {
      console.error("Error saving blog:", err);
      alert("Error saving blog: " + (err.response?.data?.message || err.message));
    }
  };

  const resetForm = () => {
    if (selectedImg) selectedImg.classList.remove("selected-blog-img");
    setSelectedImg(null);
    setImgOverlay(null);
    setCustomAltInput("");
    setCustomWidthInput("");
    setCurrentBlog({
      title: "",
      slug: "",
      summary: "",
      content: "",
      author: "Nikhil Thakkar",
      image: "",
      imageAlt: "",
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
                      <>
                        <div className="relative w-40 h-24 rounded-xl overflow-hidden border border-gray-100 group">
                          <img
                            src={currentBlog.image}
                            alt={currentBlog.imageAlt || "Preview"}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setCurrentBlog({ ...currentBlog, image: "", imageAlt: "" })
                            }
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity outline-none"
                          >
                            <span className="text-white text-xs font-bold uppercase tracking-widest">
                              Remove
                            </span>
                          </button>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Image Alt Text (SEO)
                          </label>
                          <input
                            type="text"
                            value={currentBlog.imageAlt || ""}
                            onChange={(e) =>
                              setCurrentBlog({ ...currentBlog, imageAlt: e.target.value })
                            }
                            className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm"
                            placeholder="Describe this image for accessibility and SEO"
                          />
                        </div>
                      </>
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
                  Use the toolbar to add headings, text, or images. Click any image inside the editor to customize size or alignment.
                </p>

                {/* PINNED IMAGE TOOLBAR — Appears whenever an image is clicked */}
                {selectedImg && (
                  <div className="img-top-toolbar bg-orange-50 border-2 border-orange-400 rounded-2xl p-4 mb-3 shadow-lg flex flex-wrap items-center justify-between gap-3 animate-fade-in">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-orange-950 text-sm flex items-center gap-1.5">
                        <FaImage className="text-orange-600" /> Selected Image:
                      </span>
                      <span className="text-xs bg-white text-orange-800 px-2.5 py-1 rounded-full font-mono font-bold border border-orange-200">
                        {selectedImg.style.width || selectedImg.getAttribute("width") || "100%"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-gray-700">Size:</span>
                      {[
                        { label: "25%", val: "25%" },
                        { label: "50%", val: "50%" },
                        { label: "75%", val: "75%" },
                        { label: "100%", val: "100%" },
                      ].map((p) => (
                        <button
                          key={p.val}
                          type="button"
                          onClick={() => handleApplySize(p.val)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                            (selectedImg.style.width === p.val || selectedImg.getAttribute("width") === p.val)
                              ? "bg-orange-600 text-white ring-2 ring-orange-400 scale-105"
                              : "bg-white text-gray-700 hover:bg-orange-100 border border-gray-200"
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}

                      <div className="w-px h-5 bg-orange-300 mx-1" />

                      <span className="text-xs font-bold text-gray-700">Align:</span>
                      <button
                        type="button"
                        onClick={() => handleApplyAlign("left")}
                        title="Align Left"
                        className="px-2.5 py-1.5 bg-white hover:bg-orange-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 flex items-center gap-1 shadow-sm"
                      >
                        <FaAlignLeft /> Left
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyAlign("center")}
                        title="Align Center"
                        className="px-2.5 py-1.5 bg-white hover:bg-orange-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 flex items-center gap-1 shadow-sm"
                      >
                        <FaAlignCenter /> Center
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyAlign("right")}
                        title="Align Right"
                        className="px-2.5 py-1.5 bg-white hover:bg-orange-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 flex items-center gap-1 shadow-sm"
                      >
                        <FaAlignRight /> Right
                      </button>

                      <div className="w-px h-5 bg-orange-300 mx-1" />

                      {/* Custom Width Input */}
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={customWidthInput}
                          onChange={(e) => setCustomWidthInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleApplySize(customWidthInput);
                            }
                          }}
                          placeholder="e.g. 350px"
                          className="w-20 px-2 py-1 bg-white border border-gray-300 rounded-xl text-xs outline-none text-center font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => handleApplySize(customWidthInput)}
                          className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow"
                        >
                          Apply
                        </button>
                      </div>

                      <div className="w-px h-5 bg-orange-300 mx-1" />

                      {/* Alt Text */}
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={customAltInput}
                          onChange={(e) => setCustomAltInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleApplyAlt(customAltInput);
                            }
                          }}
                          placeholder="Alt text"
                          className="w-32 px-2 py-1 bg-white border border-gray-300 rounded-xl text-xs outline-none font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => handleApplyAlt(customAltInput)}
                          className={`px-3 py-1 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1 transition-colors ${
                            altSaved
                              ? "bg-emerald-600 hover:bg-emerald-700"
                              : "bg-orange-600 hover:bg-orange-700"
                          }`}
                        >
                          {altSaved ? (
                            <>
                              <FaCheck className="text-[10px]" /> Saved
                            </>
                          ) : (
                            "Set Alt"
                          )}
                        </button>
                      </div>

                      <div className="w-px h-5 bg-orange-300 mx-1" />

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={handleDeleteImage}
                        className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
                      >
                        <FaTrash /> Delete
                      </button>

                      {/* Done */}
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedImg) selectedImg.classList.remove("selected-blog-img");
                          setSelectedImg(null);
                          setImgOverlay(null);
                        }}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <FaCheck className="text-xs" /> Done
                      </button>
                    </div>
                  </div>
                )}

                <style>{`
                  .blog-editor .ql-container { border-bottom-left-radius: 0.75rem; border-bottom-right-radius: 0.75rem; background: #f9fafb; }
                  .blog-editor .ql-toolbar { border-top-left-radius: 0.75rem; border-top-right-radius: 0.75rem; background: #fff; }
                  .blog-editor .ql-editor { min-height: 20rem; font-size: 0.95rem; }
                  .blog-editor .ql-editor img {
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border-radius: 0.5rem;
                  }
                  .blog-editor .ql-editor img:hover {
                    box-shadow: 0 0 0 3px #ea580c !important;
                  }
                  .blog-editor .ql-editor img.selected-blog-img {
                    outline: 4px solid #ea580c !important;
                    box-shadow: 0 0 20px rgba(234, 88, 12, 0.4) !important;
                  }
                `}</style>
                <div
                  className="blog-editor relative"
                  ref={editorWrapperRef}
                  onClick={handleEditorContainerClick}
                >
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={currentBlog.content || ""}
                    onChange={(value) =>
                      setCurrentBlog((prev) => ({ ...prev, content: value }))
                    }
                    modules={quillModules}
                  />

                  {/* Image Resizer & Alignment Floating Controls */}
                  {selectedImg && imgOverlay && (
                    <div
                      className="img-resizer-overlay absolute pointer-events-auto z-30 transition-all"
                      style={{
                        top: `${imgOverlay.top}px`,
                        left: `${imgOverlay.left}px`,
                        width: `${imgOverlay.width}px`,
                        height: `${imgOverlay.height}px`,
                      }}
                    >
                      {/* Bounding box outline */}
                      <div className="absolute inset-0 border-2 border-orange-500 border-dashed rounded-lg pointer-events-none" />

                      {/* Floating toolbar pill inside or above */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 ${
                          imgOverlay.top < 70 ? "top-3" : "-top-14"
                        } bg-slate-900/95 text-white backdrop-blur-md px-3 py-2 rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-700 whitespace-nowrap text-xs font-semibold z-40`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Size presets */}
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider mr-1">Size:</span>
                        {[
                          { label: "25%", val: "25%" },
                          { label: "50%", val: "50%" },
                          { label: "75%", val: "75%" },
                          { label: "100%", val: "100%" },
                        ].map((p) => (
                          <button
                            key={p.val}
                            type="button"
                            onClick={() => handleApplySize(p.val)}
                            className={`px-2 py-1 rounded-lg transition-colors ${
                              (selectedImg.style.width === p.val || selectedImg.getAttribute("width") === p.val)
                                ? "bg-orange-600 text-white font-bold"
                                : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}

                        <div className="w-px h-4 bg-slate-700 mx-1" />

                        {/* Alignment */}
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider mr-1">Align:</span>
                        <button
                          type="button"
                          onClick={() => handleApplyAlign("left")}
                          title="Align Left"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          <FaAlignLeft />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApplyAlign("center")}
                          title="Align Center"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          <FaAlignCenter />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApplyAlign("right")}
                          title="Align Right"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          <FaAlignRight />
                        </button>

                        <div className="w-px h-4 bg-slate-700 mx-1" />

                        {/* Delete image */}
                        <button
                          type="button"
                          onClick={handleDeleteImage}
                          title="Delete image"
                          className="p-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white"
                        >
                          <FaTrash />
                        </button>

                        {/* Done controls */}
                        <button
                          type="button"
                          onClick={() => {
                            if (selectedImg) selectedImg.classList.remove("selected-blog-img");
                            setSelectedImg(null);
                            setImgOverlay(null);
                          }}
                          title="Done"
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 ml-1 transition-colors"
                        >
                          <FaCheck className="text-[10px]" /> Done
                        </button>
                      </div>

                      {/* Bottom-right interactive corner drag handle */}
                      <div
                        onPointerDown={handleDragResize}
                        title="Drag corner to resize"
                        className="absolute -right-3 -bottom-3 w-6 h-6 bg-orange-600 hover:bg-orange-500 text-white rounded-full flex items-center justify-center shadow-xl cursor-se-resize select-none border-2 border-white transition-transform hover:scale-125 z-40 text-[9px] font-bold"
                      >
                        +
                      </div>
                    </div>
                  )}
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
                      onClick={() => handleDelete(blog.id)}
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
