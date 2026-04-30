import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaSave,
  FaTimes,
  FaExchangeAlt,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { PageLoader } from "../../components/LoadingSkeletons";

const RedirectManager = () => {
  const [redirects, setRedirects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRedirect, setCurrentRedirect] = useState({
    fromPath: "",
    toPath: "",
    statusCode: 301,
    isActive: true,
  });

  useEffect(() => {
    fetchRedirects();
  }, []);

  const fetchRedirects = async () => {
    try {
      const res = await axios.get("/api/redirects");
      setRedirects(res.data);
    } catch (err) {
      console.error("Error fetching redirects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentRedirect._id) {
        await axios.put(
          `/api/redirects/${currentRedirect._id}`,
          currentRedirect,
        );
      } else {
        await axios.post("/api/redirects", currentRedirect);
      }
      setIsEditing(false);
      resetForm();
      fetchRedirects();
    } catch (err) {
      console.error("Error saving redirect:", err);
    }
  };

  const handleEdit = (redirect) => {
    setCurrentRedirect(redirect);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this redirect?")) return;
    try {
      await axios.delete(`/api/redirects/${id}`);
      fetchRedirects();
    } catch (err) {
      console.error("Error deleting redirect:", err);
    }
  };

  const toggleActive = async (redirect) => {
    try {
      await axios.put(`/api/redirects/${redirect._id}`, {
        ...redirect,
        isActive: !redirect.isActive,
      });
      fetchRedirects();
    } catch (err) {
      console.error("Error toggling redirect:", err);
    }
  };

  const resetForm = () => {
    setCurrentRedirect({
      fromPath: "",
      toPath: "",
      statusCode: 301,
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
          <h1 className="text-3xl font-bold text-gray-900">URL Redirects</h1>
          <p className="text-gray-500 mt-1">
            Manage 301/302 redirects for SEO and broken links.
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
            <FaPlus /> Add Redirect
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
                {currentRedirect._id ? "Edit Redirect" : "New Redirect"}
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
                    From Path
                  </label>
                  <input
                    type="text"
                    required
                    value={currentRedirect.fromPath}
                    onChange={(e) =>
                      setCurrentRedirect({
                        ...currentRedirect,
                        fromPath: e.target.value,
                      })
                    }
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="/old-page"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    To Path
                  </label>
                  <input
                    type="text"
                    required
                    value={currentRedirect.toPath}
                    onChange={(e) =>
                      setCurrentRedirect({
                        ...currentRedirect,
                        toPath: e.target.value,
                      })
                    }
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="/new-page"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status Code
                  </label>
                  <select
                    value={currentRedirect.statusCode}
                    onChange={(e) =>
                      setCurrentRedirect({
                        ...currentRedirect,
                        statusCode: Number(e.target.value),
                      })
                    }
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  >
                    <option value={301}>301 - Permanent</option>
                    <option value={302}>302 - Temporary</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentRedirect.isActive}
                      onChange={(e) =>
                        setCurrentRedirect({
                          ...currentRedirect,
                          isActive: e.target.checked,
                        })
                      }
                      className="sr-only"
                    />
                    <div
                      className={`w-12 h-6 rounded-full transition-all ${currentRedirect.isActive ? "bg-emerald-500" : "bg-gray-300"} relative`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${currentRedirect.isActive ? "left-6" : "left-0.5"}`}
                      ></div>
                    </div>
                    <span className="font-semibold text-gray-700">
                      {currentRedirect.isActive ? "Active" : "Inactive"}
                    </span>
                  </label>
                </div>
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
                  <FaSave className="inline-block mr-2" /> Save Redirect
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Redirect List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                From
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                To
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {redirects.length > 0 ? (
              redirects.map((r) => (
                <tr key={r._id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 text-sm font-mono text-gray-800">
                    {r.fromPath}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600 flex items-center gap-2">
                    <FaExchangeAlt className="text-orange-400 flex-shrink-0" />
                    {r.toPath}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${r.statusCode === 301 ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"}`}
                    >
                      {r.statusCode}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleActive(r)} className="text-xl">
                      {r.isActive ? (
                        <FaToggleOn className="text-emerald-500" />
                      ) : (
                        <FaToggleOff className="text-gray-400" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(r)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center text-gray-400"
                >
                  No redirects configured.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RedirectManager;
