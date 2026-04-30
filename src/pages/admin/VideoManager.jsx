import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaSave,
  FaTimes,
  FaYoutube,
  FaPlay,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { PageLoader } from "../../components/LoadingSkeletons";

const getYoutubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/,
  );
  return match ? match[1] : null;
};

const VideoManager = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({
    title: "",
    youtubeUrl: "",
    thumbnail: "",
    description: "",
    category: "General",
    order: 0,
    isActive: true,
    seo: {
      title: "",
      description: "",
      keywords: "",
      canonicalUrl: "",
      robotsTag: "index, follow",
      schemaMarkup: "",
    },
    faqs: [],
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("/api/videos");
      setVideos(res.data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Auto-generate thumbnail from YouTube URL if not provided
      const videoData = { ...currentVideo };
      if (!videoData.thumbnail && videoData.youtubeUrl) {
        const ytId = getYoutubeId(videoData.youtubeUrl);
        if (ytId)
          videoData.thumbnail = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
      }

      if (currentVideo._id) {
        await axios.put(`/api/videos/${currentVideo._id}`, videoData);
      } else {
        await axios.post("/api/videos", videoData);
      }
      setIsEditing(false);
      resetForm();
      fetchVideos();
    } catch (err) {
      console.error("Error saving video:", err);
    }
  };

  const handleEdit = (video) => {
    setCurrentVideo(video);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this video?")) return;
    try {
      await axios.delete(`/api/videos/${id}`);
      fetchVideos();
    } catch (err) {
      console.error("Error deleting video:", err);
    }
  };

  const resetForm = () => {
    setCurrentVideo({
      title: "",
      youtubeUrl: "",
      thumbnail: "",
      description: "",
      category: "General",
      order: 0,
      isActive: true,
      seo: {
        title: "",
        description: "",
        keywords: "",
        canonicalUrl: "",
        robotsTag: "index, follow",
        schemaMarkup: "",
      },
      faqs: [],
    });
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Video Gallery</h1>
          <p className="text-gray-500 mt-1">
            Manage YouTube videos displayed on the website.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => {
              resetForm();
              setIsEditing(true);
            }}
            className="px-6 py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-200 flex items-center gap-3 transition-all hover:-translate-y-0.5"
          >
            <FaPlus /> Add Video
          </button>
        )}
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {currentVideo._id ? "Edit Video" : "Add New Video"}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Video Title
                </label>
                <input
                  type="text"
                  required
                  value={currentVideo.title}
                  onChange={(e) =>
                    setCurrentVideo({ ...currentVideo, title: e.target.value })
                  }
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    required
                    value={currentVideo.youtubeUrl}
                    onChange={(e) =>
                      setCurrentVideo({
                        ...currentVideo,
                        youtubeUrl: e.target.value,
                      })
                    }
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={currentVideo.thumbnail}
                    onChange={(e) =>
                      setCurrentVideo({
                        ...currentVideo,
                        thumbnail: e.target.value,
                      })
                    }
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="Optional: Auto-fetches from YouTube"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={currentVideo.category}
                    onChange={(e) =>
                      setCurrentVideo({
                        ...currentVideo,
                        category: e.target.value,
                      })
                    }
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="e.g. Mutual Funds, Tax Planning"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={currentVideo.description}
                  onChange={(e) =>
                    setCurrentVideo({
                      ...currentVideo,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none h-20"
                />
              </div>

              {/* YouTube Preview */}
              {(currentVideo.thumbnail ||
                (currentVideo.youtubeUrl &&
                  getYoutubeId(currentVideo.youtubeUrl))) && (
                <div className="rounded-2xl overflow-hidden border border-gray-100">
                  <img
                    src={
                      currentVideo.thumbnail ||
                      `https://img.youtube.com/vi/${getYoutubeId(currentVideo.youtubeUrl)}/maxresdefault.jpg`
                    }
                    alt="Video thumbnail"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              {/* SEO Section */}
              <div className="border-t border-gray-100 pt-6 mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  SEO Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={currentVideo.seo?.title || ""}
                      onChange={(e) =>
                        setCurrentVideo({
                          ...currentVideo,
                          seo: { ...currentVideo.seo, title: e.target.value },
                        })
                      }
                      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Meta Keywords
                    </label>
                    <input
                      type="text"
                      value={currentVideo.seo?.keywords || ""}
                      onChange={(e) =>
                        setCurrentVideo({
                          ...currentVideo,
                          seo: {
                            ...currentVideo.seo,
                            keywords: e.target.value,
                          },
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
                      value={currentVideo.seo?.description || ""}
                      onChange={(e) =>
                        setCurrentVideo({
                          ...currentVideo,
                          seo: {
                            ...currentVideo.seo,
                            description: e.target.value,
                          },
                        })
                      }
                      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none h-20"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Schema Markup (JSON-LD)
                    </label>
                    <textarea
                      value={currentVideo.seo?.schemaMarkup || ""}
                      onChange={(e) =>
                        setCurrentVideo({
                          ...currentVideo,
                          seo: {
                            ...currentVideo.seo,
                            schemaMarkup: e.target.value,
                          },
                        })
                      }
                      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl font-mono text-sm focus:ring-2 focus:ring-orange-500 outline-none h-32"
                      placeholder='{ "@context": "https://schema.org", "@type": "VideoObject", ... }'
                    />
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="border-t border-gray-100 pt-6 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    FAQ Section
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentVideo({
                        ...currentVideo,
                        faqs: [
                          ...(currentVideo.faqs || []),
                          { question: "", answer: "" },
                        ],
                      })
                    }
                    className="px-4 py-2 bg-orange-100 text-orange-600 font-bold rounded-lg text-sm hover:bg-orange-200"
                  >
                    + Add FAQ
                  </button>
                </div>
                <div className="space-y-4">
                  {(currentVideo.faqs || []).map((faq, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          const newFaqs = [...currentVideo.faqs];
                          newFaqs.splice(index, 1);
                          setCurrentVideo({ ...currentVideo, faqs: newFaqs });
                        }}
                        className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                      <div className="mb-3 pr-8">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Question
                        </label>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => {
                            const newFaqs = [...currentVideo.faqs];
                            newFaqs[index].question = e.target.value;
                            setCurrentVideo({ ...currentVideo, faqs: newFaqs });
                          }}
                          className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Answer
                        </label>
                        <textarea
                          value={faq.answer}
                          onChange={(e) => {
                            const newFaqs = [...currentVideo.faqs];
                            newFaqs[index].answer = e.target.value;
                            setCurrentVideo({ ...currentVideo, faqs: newFaqs });
                          }}
                          className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500 h-20"
                        />
                      </div>
                    </div>
                  ))}
                  {(!currentVideo.faqs || currentVideo.faqs.length === 0) && (
                    <p className="text-sm text-gray-500 italic">
                      No FAQs added yet.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentVideo.isActive}
                    onChange={(e) =>
                      setCurrentVideo({
                        ...currentVideo,
                        isActive: e.target.checked,
                      })
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-12 h-6 rounded-full transition-all ${currentVideo.isActive ? "bg-emerald-500" : "bg-gray-300"} relative`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${currentVideo.isActive ? "left-6" : "left-0.5"}`}
                    ></div>
                  </div>
                  <span className="font-semibold text-gray-700">
                    {currentVideo.isActive ? "Visible" : "Hidden"}
                  </span>
                </label>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-slate-200 transition-all"
                >
                  <FaSave className="inline-block mr-2" /> Save Video
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Grid */}
      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => {
            const ytId = getYoutubeId(video.youtubeUrl);
            const thumb =
              video.thumbnail ||
              (ytId
                ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`
                : null);

            return (
              <motion.div
                key={video._id}
                layout
                className={`bg-white rounded-3xl border shadow-sm overflow-hidden group hover:shadow-xl transition-shadow ${!video.isActive ? "opacity-60 border-gray-200" : "border-gray-100"}`}
              >
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FaYoutube className="text-5xl" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
                    >
                      <FaPlay className="ml-1" />
                    </a>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(video)}
                      className="p-2 bg-white/90 backdrop-blur-sm text-blue-600 rounded-lg shadow-sm hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(video._id)}
                      className="p-2 bg-white/90 backdrop-blur-sm text-red-600 rounded-lg shadow-sm hover:bg-red-600 hover:text-white transition-all"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                  {video.category && (
                    <span className="absolute bottom-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                      {video.category}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 line-clamp-2">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {video.description}
                    </p>
                  )}
                  {!video.isActive && (
                    <span className="inline-block mt-3 px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full uppercase">
                      Hidden
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VideoManager;
