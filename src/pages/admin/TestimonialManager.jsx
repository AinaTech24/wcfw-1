import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaSave,
  FaTimes,
  FaStar,
  FaQuoteLeft,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { PageLoader } from "../../components/LoadingSkeletons";

const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState({
    name: "",
    designation: "",
    content: "",
    rating: 5,
    image: "",
    isActive: true,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await api.get("/testimonials");
      setTestimonials(res.data);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentTestimonial._id) {
        await api.put(
          `/testimonials/${currentTestimonial._id}`,
          currentTestimonial,
        );
      } else {
        await api.post("/testimonials", currentTestimonial);
      }
      setIsEditing(false);
      resetForm();
      fetchTestimonials();
    } catch (err) {
      console.error("Error saving testimonial:", err);
    }
  };

  const handleEdit = (testimonial) => {
    setCurrentTestimonial(testimonial);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await api.delete(`/testimonials/${id}`);
      fetchTestimonials();
    } catch (err) {
      console.error("Error deleting testimonial:", err);
    }
  };

  const resetForm = () => {
    setCurrentTestimonial({
      name: "",
      designation: "",
      content: "",
      rating: 5,
      image: "",
      isActive: true,
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-200"}
      />
    ));
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-500 mt-1">
            Manage client reviews and testimonials on the website.
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
            <FaPlus /> Add Testimonial
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
                {currentTestimonial._id
                  ? "Edit Testimonial"
                  : "New Testimonial"}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    required
                    value={currentTestimonial.name}
                    onChange={(e) =>
                      setCurrentTestimonial({
                        ...currentTestimonial,
                        name: e.target.value,
                      })
                    }
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Designation / City
                  </label>
                  <input
                    type="text"
                    value={currentTestimonial.designation}
                    onChange={(e) =>
                      setCurrentTestimonial({
                        ...currentTestimonial,
                        designation: e.target.value,
                      })
                    }
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="e.g. Business Owner, Mumbai"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Testimonial Content
                </label>
                <textarea
                  required
                  value={currentTestimonial.content}
                  onChange={(e) =>
                    setCurrentTestimonial({
                      ...currentTestimonial,
                      content: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none h-28"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setCurrentTestimonial({
                            ...currentTestimonial,
                            rating: star,
                          })
                        }
                        className="text-2xl transition-transform hover:scale-110"
                      >
                        <FaStar
                          className={
                            star <= currentTestimonial.rating
                              ? "text-yellow-400"
                              : "text-gray-200"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={currentTestimonial.image}
                    onChange={(e) =>
                      setCurrentTestimonial({
                        ...currentTestimonial,
                        image: e.target.value,
                      })
                    }
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentTestimonial.isActive}
                    onChange={(e) =>
                      setCurrentTestimonial({
                        ...currentTestimonial,
                        isActive: e.target.checked,
                      })
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-12 h-6 rounded-full transition-all ${currentTestimonial.isActive ? "bg-emerald-500" : "bg-gray-300"} relative`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${currentTestimonial.isActive ? "left-6" : "left-0.5"}`}
                    ></div>
                  </div>
                  <span className="font-semibold text-gray-700">
                    {currentTestimonial.isActive ? "Visible" : "Hidden"}
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
                  <FaSave className="inline-block mr-2" /> Save Testimonial
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonial Cards */}
      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <motion.div
              key={t._id}
              layout
              className={`bg-white rounded-3xl p-8 border shadow-sm hover:shadow-xl transition-shadow relative ${!t.isActive ? "opacity-60 border-gray-200" : "border-gray-100"}`}
            >
              <div className="absolute top-6 right-6 flex gap-2">
                <button
                  onClick={() => handleEdit(t)}
                  className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                >
                  <FaTrash size={14} />
                </button>
              </div>

              <FaQuoteLeft className="text-3xl text-orange-200 mb-4" />
              <p className="text-gray-700 leading-relaxed mb-6 line-clamp-4">
                {t.content}
              </p>

              <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  {t.designation && (
                    <p className="text-sm text-gray-500">{t.designation}</p>
                  )}
                </div>
                <div className="ml-auto flex gap-0.5">
                  {renderStars(t.rating)}
                </div>
              </div>
              {!t.isActive && (
                <span className="absolute top-6 left-6 px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full uppercase">
                  Hidden
                </span>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialManager;
