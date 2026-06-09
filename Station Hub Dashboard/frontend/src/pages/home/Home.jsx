import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import UserMenuModal from "../../components/modals/menuModal";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

// ── Inline SVG Icons ──────────────────────────────────────
const IconMenu = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const IconDashboard = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const IconServices = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconProfile = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconSettings = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

const IconBell = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const IconMore = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
  </svg>
);

// ── Nav Items ─────────────────────────────────────────────
const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <IconDashboard /> },
  { name: "Services",  path: "/services",  icon: <IconServices /> },
  { name: "Profile",   path: "/profile",   icon: <IconProfile /> },
  { name: "Settings",  path: "/settings",  icon: <IconSettings /> },
];

export default function HomeLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleProfile  = () => console.log("Profile clicked");
  const handleSettings = () => console.log("Settings clicked");
  const handleLogout   = () => console.log("Logout clicked");

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">

      {/* ── TOP NAVBAR ── */}
      <header className="h-16 bg-white w-screen border-b border-gray-200 flex items-center justify-between pr-6 z-10">

        <div className="flex items-center w-52 border-b border-gray-100 px-2 py-0 justify-between gap-4">
          {/* Hamburger */}
          <div className="w-10 h-10 flex items-center justify-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-orange-500 hover:bg-orange-50 transition-colors cursor-pointer"
            >
              <IconMenu />
            </button>
          </div>

          {/* Logo */}
          <div className="w-20 h-20 flex items-center mr-3 justify-center">
            <img src={Logo} className="w-20 h-20 object-contain cursor-pointer" />
          </div>
        </div>

        {/* Right: notifications + avatar */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-orange-500 hover:bg-orange-50 transition-colors cursor-pointer">
            <IconBell />
          </div>
          <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-semibold cursor-pointer">
            SJ
          </div>
        </div>

      </header>

      <div className="flex h-[calc(100vh-64px)]">

        {/* ── SIDEBAR ── */}
        <aside className={`flex-shrink-0 bg-white h-full border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden ${sidebarOpen ? "w-52" : "w-14"}`}>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                  location.pathname === item.path
                    ? "bg-orange-500/20 border border-orange-500 text-orange-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                } ${!sidebarOpen ? "justify-center" : ""}`}
                title={!sidebarOpen ? item.name : ""}
              >
                <span className={location.pathname === item.path ? "text-orange-500" : "text-gray-400"}>
                  {item.icon}
                </span>
                {sidebarOpen && <span>{item.name}</span>}
              </button>
            ))}
          </nav>

          {/* Bottom user card */}
          <div className="border-t border-gray-100 px-2 py-4">
            <div className={`flex items-center gap-2 px-2 py-2 bg-orange-500/10 border border-orange-500/30 rounded-lg ${!sidebarOpen ? "justify-center" : ""}`}>
              <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                SJ
              </div>
              {sidebarOpen && (
                <div className="min-w-0 flex items-center justify-between gap-2 flex-1">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">Sadeed Javaid</p>
                    <p className="text-xs text-gray-400 truncate">sadeed@example.com</p>
                  </div>
                  <button
                    className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setModalPosition({ top: rect.top - 166, left: rect.right - 180 });
                      setIsModalOpen(true);
                    }}
                  >
                    <IconMore />
                  </button>
                </div>
              )}
            </div>
          </div>

        </aside>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>

      </div>

      <UserMenuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProfile={handleProfile}
        onSettings={handleSettings}
        onLogout={handleLogout}
        position={modalPosition}
      />

    </div>
  );
}