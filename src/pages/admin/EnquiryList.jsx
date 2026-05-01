import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import {
  FaTrash,
  FaCheck,
  FaEnvelope,
  FaPhone,
  FaHistory,
  FaInbox,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { PageLoader } from "../../components/LoadingSkeletons";

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await api.get("/enquiry");
      setEnquiries(res.data);
    } catch (err) {
      console.error("Error fetching enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/enquiry/${id}/status`, { status });
      setEnquiries(enquiries.map((e) => (e._id === id ? { ...e, status } : e)));
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status });
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Enquiries & Leads</h1>
        <p className="text-gray-500 mt-1">
          Manage all contact form submissions from the website.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List Container */}
        <div className="lg:col-span-2 space-y-4">
          {enquiries.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
              <FaInbox className="text-5xl mx-auto mb-4 text-gray-200" />
              <p className="text-gray-500 font-medium">No enquiries yet.</p>
            </div>
          ) : (
            enquiries.map((enquiry) => (
              <motion.div
                key={enquiry._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setSelectedEnquiry(enquiry)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                  selectedEnquiry?._id === enquiry._id
                    ? "bg-white border-orange-500 shadow-xl ring-1 ring-orange-500"
                    : "bg-white border-gray-100 shadow-sm hover:border-orange-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg ${
                        enquiry.status === "new"
                          ? "bg-orange-500"
                          : "bg-slate-400"
                      }`}
                    >
                      {(enquiry.name || "U").charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {enquiry.name || "Anonymous User"}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {new Date(enquiry.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      enquiry.status === "new"
                        ? "bg-orange-100 text-orange-600"
                        : enquiry.status === "read"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-emerald-100 text-emerald-600"
                    }`}
                  >
                    {enquiry.status}
                  </span>
                </div>
                <h4 className="mt-4 font-semibold text-gray-800 line-clamp-1">
                  {enquiry.subject || "General Inquiry"}
                </h4>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {enquiry.message}
                </p>
              </motion.div>
            ))
          )}
        </div>

        {/* Details Container */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {selectedEnquiry ? (
              <motion.div
                key={selectedEnquiry._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-2xl sticky top-8"
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Details</h2>
                  <div className="flex gap-2">
                    {selectedEnquiry.status !== "replied" && (
                      <button
                        onClick={() =>
                          updateStatus(selectedEnquiry._id, "replied")
                        }
                        className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                        title="Mark as Replied"
                      >
                        <FaCheck />
                      </button>
                    )}
                    <button className="p-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                      <FaEnvelope />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Email
                      </p>
                      <p className="text-sm font-semibold truncate">
                        {selectedEnquiry.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <FaPhone />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Phone
                      </p>
                      <p className="text-sm font-semibold">
                        {selectedEnquiry.phone}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-50">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                      Message
                    </p>
                    <div className="bg-gray-50 p-6 rounded-2xl text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedEnquiry.message}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-50">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-2">
                        <FaHistory /> Registered IP: {selectedEnquiry.ip}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-gray-50 rounded-3xl p-12 border-2 border-dashed border-gray-200 text-center text-gray-400">
                <FaInbox className="text-5xl mx-auto mb-4 opacity-20" />
                <p className="font-medium">
                  Select an enquiry from the list to view details.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default EnquiryList;
