import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaSave,
  FaTimes,
  FaUserTie,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { PageLoader } from "../../components/LoadingSkeletons";

const TeamManager = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState({
    name: "",
    designation: "",
    image: "",
    bio: "",
    order: 0,
    category: "rm",
    isActive: true,
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await api.get("/team");
      setMembers(res.data);
    } catch (err) {
      console.error("Error fetching team:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentMember._id) {
        await api.put(`/team/${currentMember._id}`, currentMember);
      } else {
        await api.post("/team", currentMember);
      }
      setIsEditing(false);
      resetForm();
      fetchMembers();
    } catch (err) {
      console.error("Error saving member:", err);
    }
  };

  const handleEdit = (member) => {
    setCurrentMember(member);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this team member?")) return;
    try {
      await api.delete(`/team/${id}`);
      fetchMembers();
    } catch (err) {
      console.error("Error deleting member:", err);
    }
  };

  const moveOrder = async (index, direction) => {
    const newMembers = [...members];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newMembers.length) return;

    [newMembers[index], newMembers[swapIndex]] = [
      newMembers[swapIndex],
      newMembers[index],
    ];
    const orderedIds = newMembers.map((m) => m._id);

    try {
      await api.post("/team/reorder", { orderedIds });
      fetchMembers();
    } catch (err) {
      console.error("Error reordering:", err);
    }
  };

  const resetForm = () => {
    setCurrentMember({
      name: "",
      designation: "",
      image: "",
      bio: "",
      order: 0,
      category: "rm",
      isActive: true,
    });
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
          <p className="text-gray-500 mt-1">
            Manage the team displayed on the website.
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
            <FaPlus /> Add Member
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
                {currentMember._id ? "Edit Member" : "Add New Member"}
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
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={currentMember.name}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        name: e.target.value,
                      })
                    }
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="e.g. Nikhil Thakkar"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Designation
                  </label>
                  <input
                    type="text"
                    required
                    value={currentMember.designation}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        designation: e.target.value,
                      })
                    }
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="e.g. Relationship Manager"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={currentMember.image}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        image: e.target.value,
                      })
                    }
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="https://... or /uploads/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={currentMember.category}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        category: e.target.value,
                      })
                    }
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  >
                    <option value="founding">Founding Members</option>
                    <option value="director">Board of Directors</option>
                    <option value="leadership">Senior Leadership</option>
                    <option value="associate_partner">
                      Associate Partners
                    </option>
                    <option value="insurance_head">Insurance Heads</option>
                    <option value="rm">Relationship Managers</option>
                    <option value="equity_head">Equity Team</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={currentMember.bio}
                  onChange={(e) =>
                    setCurrentMember({ ...currentMember, bio: e.target.value })
                  }
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none h-24"
                  placeholder="Short description about this team member..."
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentMember.isActive}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        isActive: e.target.checked,
                      })
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-12 h-6 rounded-full transition-all ${currentMember.isActive ? "bg-emerald-500" : "bg-gray-300"} relative`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${currentMember.isActive ? "left-6" : "left-0.5"}`}
                    ></div>
                  </div>
                  <span className="font-semibold text-gray-700">
                    {currentMember.isActive ? "Active" : "Hidden"}
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
                  <FaSave className="inline-block mr-2" /> Save Member
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Team Grid */}
      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <motion.div
              key={member._id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-white rounded-3xl border shadow-sm overflow-hidden group hover:shadow-xl transition-shadow ${!member.isActive ? "opacity-60 border-gray-200" : "border-gray-100"}`}
            >
              <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <FaUserTie className="text-6xl" />
                  </div>
                )}
                <div className="absolute top-3 left-3 flex gap-1">
                  <button
                    onClick={() => moveOrder(index, "up")}
                    disabled={index === 0}
                    className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-orange-500 hover:text-white transition-all disabled:opacity-30"
                  >
                    <FaArrowUp size={10} />
                  </button>
                  <button
                    onClick={() => moveOrder(index, "down")}
                    disabled={index === members.length - 1}
                    className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-orange-500 hover:text-white transition-all disabled:opacity-30"
                  >
                    <FaArrowDown size={10} />
                  </button>
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="p-2 bg-white/90 backdrop-blur-sm text-blue-600 rounded-lg shadow-sm hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <FaEdit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="p-2 bg-white/90 backdrop-blur-sm text-red-600 rounded-lg shadow-sm hover:bg-red-600 hover:text-white transition-all"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-gray-900 text-lg">
                  {member.name}
                </h3>
                <p className="text-sm text-orange-600 font-semibold mt-1">
                  {member.designation}
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 opacity-60">
                  Category: {member.category?.replace("_", " ")}
                </p>
                {member.bio && (
                  <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                    {member.bio}
                  </p>
                )}
                {!member.isActive && (
                  <span className="inline-block mt-3 px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full uppercase">
                    Hidden
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamManager;
