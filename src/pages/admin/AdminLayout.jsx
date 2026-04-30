import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaThLarge,
  FaInbox,
  FaEdit,
  FaSignOutAlt,
  FaChevronRight,
  FaHome,
  FaExchangeAlt,
  FaEnvelopeOpenText,
  FaUsers,
  FaStar,
  FaYoutube,
  FaCog,
  FaNewspaper,
  FaBars,
  FaTimes,
  FaFileAlt,
} from "react-icons/fa";

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: "/admin/dashboard", icon: FaThLarge, label: "Dashboard" },
    { path: "/admin/enquiries", icon: FaInbox, label: "Enquiries" },
    { path: "/admin/blogs", icon: FaNewspaper, label: "Blogs" },
    { path: "/admin/content", icon: FaFileAlt, label: "Page Content" },
    { path: "/admin/team", icon: FaUsers, label: "Team" },
    { path: "/admin/testimonials", icon: FaStar, label: "Testimonials" },
    { path: "/admin/videos", icon: FaYoutube, label: "Videos" },
    {
      path: "/admin/newsletter",
      icon: FaEnvelopeOpenText,
      label: "Newsletter",
    },
    { path: "/admin/redirects", icon: FaExchangeAlt, label: "Redirects" },
    { path: "/admin/settings", icon: FaCog, label: "Settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Hamburger */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-3 bg-slate-900 text-white rounded-xl shadow-lg outline-none"
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-slate-900 text-white flex flex-col fixed inset-y-0 z-50 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-orange-500 flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm">
              W
            </div>
            WCFW Admin
          </h2>
        </div>

        <nav className="flex-1 mt-2 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl transition-all group outine-none ${
                location.pathname === item.path
                  ? "bg-orange-500 text-white shadow-lg"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="text-lg" />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              <FaChevronRight
                className={`text-xs opacity-0 transition-all ${location.pathname === item.path ? "opacity-100" : "group-hover:opacity-50"}`}
              />
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 mb-3 rounded-xl bg-slate-800/50">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate">{user?.email}</p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-400 hover:bg-red-500 hover:text-white transition-all"
          >
            <FaSignOutAlt />
            <span className="font-medium">Sign Out</span>
          </button>
          <Link
            to="/"
            className="w-full flex items-center gap-3 p-3 mt-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
          >
            <FaHome />
            <span className="font-medium">Back to Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 md:p-8">
        <div className="max-w-6xl mx-auto pt-12 lg:pt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
