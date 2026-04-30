import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import {
  FaInbox,
  FaRegClock,
  FaCheckCircle,
  FaChartLine,
  FaUserPlus,
  FaEdit,
  FaUsers,
  FaNewspaper,
  FaStar,
  FaYoutube,
  FaCog,
  FaExchangeAlt,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { PageLoader } from "../../components/LoadingSkeletons";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await api.get("dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      // Fallback to basic enquiry data
      try {
        const enquiryRes = await api.get("enquiry");
        const enquiries = enquiryRes.data;
        setStats({
          enquiries: {
            total: enquiries.length,
            new: enquiries.filter((e) => e.status === "new").length,
            replied: enquiries.filter((e) => e.status === "replied").length,
          },
          blogs: { total: 0, published: 0 },
          subscribers: { total: 0, active: 0 },
          team: 0,
          testimonials: 0,
          videos: 0,
          recentEnquiries: enquiries.slice(0, 5),
        });
      } catch (fallbackErr) {
        console.error("Fallback also failed:", fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return <PageLoader />;
  }

  const statCards = [
    {
      label: "Total Enquiries",
      value: stats.enquiries.total,
      icon: FaInbox,
      color: "bg-blue-500",
    },
    {
      label: "New Leads",
      value: stats.enquiries.new,
      icon: FaUserPlus,
      color: "bg-orange-500",
    },
    {
      label: "Replied",
      value: stats.enquiries.replied,
      icon: FaCheckCircle,
      color: "bg-emerald-500",
    },
    {
      label: "Response Rate",
      value: stats.enquiries.total
        ? Math.round((stats.enquiries.replied / stats.enquiries.total) * 100) +
          "%"
        : "0%",
      icon: FaChartLine,
      color: "bg-purple-500",
    },
    {
      label: "Published Blogs",
      value: stats.blogs.published,
      icon: FaNewspaper,
      color: "bg-indigo-500",
    },
    {
      label: "Subscribers",
      value: stats.subscribers.active,
      icon: FaEnvelopeOpenText,
      color: "bg-pink-500",
    },
    {
      label: "Team Members",
      value: stats.team,
      icon: FaUsers,
      color: "bg-cyan-500",
    },
    {
      label: "Testimonials",
      value: stats.testimonials,
      icon: FaStar,
      color: "bg-yellow-500",
    },
  ];

  const quickActions = [
    {
      label: "Create Blog",
      path: "/admin/blogs",
      icon: FaEdit,
      color:
        "bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white",
    },
    {
      label: "Manage Team",
      path: "/admin/team",
      icon: FaUsers,
      color: "bg-cyan-50 text-cyan-600 hover:bg-cyan-600 hover:text-white",
    },
    {
      label: "View Enquiries",
      path: "/admin/enquiries",
      icon: FaInbox,
      color: "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white",
    },
    {
      label: "Add Video",
      path: "/admin/videos",
      icon: FaYoutube,
      color: "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white",
    },
    {
      label: "Redirects",
      path: "/admin/redirects",
      icon: FaExchangeAlt,
      color:
        "bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white",
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: FaCog,
      color: "bg-gray-100 text-gray-600 hover:bg-gray-800 hover:text-white",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">
          Welcome back to your administration panel.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4"
          >
            <div
              className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg`}
            >
              <stat.icon />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              className={`p-4 rounded-2xl flex flex-col items-center gap-3 font-bold text-sm transition-all shadow-sm ${action.color}`}
            >
              <action.icon className="text-2xl" />
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Enquiries */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Recent Enquiries</h2>
          <Link
            to="/admin/enquiries"
            className="text-orange-600 font-semibold text-sm hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats.recentEnquiries && stats.recentEnquiries.length > 0 ? (
                stats.recentEnquiries.map((enquiry) => (
                  <tr
                    key={enquiry._id}
                    className="hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-gray-900">
                        {enquiry.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {enquiry.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {enquiry.subject || "No Subject"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-2">
                      <FaRegClock className="text-orange-400" />
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          enquiry.status === "new"
                            ? "bg-orange-100 text-orange-600"
                            : enquiry.status === "read"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-emerald-100 text-emerald-600"
                        }`}
                      >
                        {enquiry.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No enquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
