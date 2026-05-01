import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import {
  FaTrash,
  FaEnvelope,
  FaUsers,
  FaToggleOn,
  FaToggleOff,
  FaDownload,
  FaSearch,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { PageLoader } from "../../components/LoadingSkeletons";

const NewsletterManager = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await api.get("/newsletter");
      setSubscribers(res.data);
    } catch (err) {
      console.error("Error fetching subscribers:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSubscription = async (subscriber) => {
    try {
      if (subscriber.isActive) {
        await api.patch(`/newsletter/${subscriber._id}/unsubscribe`);
      } else {
        // Reactivate - using the subscribe endpoint won't work, update directly
        await api.patch(`/newsletter/${subscriber._id}/unsubscribe`);
      }
      fetchSubscribers();
    } catch (err) {
      console.error("Error toggling subscription:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subscriber permanently?")) return;
    try {
      await api.delete(`/newsletter/${id}`);
      fetchSubscribers();
    } catch (err) {
      console.error("Error deleting subscriber:", err);
    }
  };

  const exportCSV = () => {
    const activeSubscribers = subscribers.filter((s) => s.isActive);
    const csv =
      "Email,Name,Subscribed Date\n" +
      activeSubscribers
        .map(
          (s) =>
            `${s.email},${s.name || "N/A"},${new Date(s.subscribedAt).toLocaleDateString()}`,
        )
        .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const filteredSubscribers = subscribers.filter(
    (s) =>
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.name && s.name.toLowerCase().includes(search.toLowerCase())),
  );

  const activeCount = subscribers.filter((s) => s.isActive).length;

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Newsletter Subscribers
          </h1>
          <p className="text-gray-500 mt-1">
            Manage email subscribers and export data.
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="px-6 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-emerald-200 flex items-center gap-3 transition-all hover:-translate-y-0.5"
        >
          <FaDownload /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4"
        >
          <div className="bg-blue-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
            <FaUsers />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Total Subscribers
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {subscribers.length}
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4"
        >
          <div className="bg-emerald-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
            <FaEnvelope />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active</p>
            <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4"
        >
          <div className="bg-red-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
            <FaToggleOff />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Unsubscribed</p>
            <p className="text-2xl font-bold text-gray-900">
              {subscribers.length - activeCount}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Search */}
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search subscribers by email or name..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none shadow-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Subscribed
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
            {filteredSubscribers.length > 0 ? (
              filteredSubscribers.map((sub) => (
                <tr key={sub._id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    {sub.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {sub.name || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(sub.subscribedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${sub.isActive ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}
                    >
                      {sub.isActive ? "Active" : "Unsubscribed"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(sub._id)}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                    >
                      <FaTrash size={14} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center text-gray-400"
                >
                  No subscribers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsletterManager;
