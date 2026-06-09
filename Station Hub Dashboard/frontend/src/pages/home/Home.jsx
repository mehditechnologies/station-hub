
import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import MenuLogo from "../assets/menu1.png";
import MoreLogo from "../assets/more.png";
import DashLogo from "../assets/dashboard.png";
import dropLogo from "../assets/waterdrop.png";
import UserMenuModal from "../../components/modals/menuModal";
import ProfileLogo from '../assets/account.png'
import SettingLogo from '../assets/settings.png'
import NotifiLogo from '../assets/notification.png'
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const LOGO_SRC = Logo;

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: DashLogo },
  { name: "Services", path: "/services", icon: dropLogo },
  { name: "Profile", path: "/profile", icon: ProfileLogo },
  { name: "Settings", path: "/settings", icon: SettingLogo },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState("All");
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

const handleProfile = () => {
  console.log("Profile clicked");
};

const handleSettings = () => {
  console.log("Settings clicked");
};

const handleLogout = () => {
  console.log("Logout clicked");
};

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">

      
          {/* ── TOP NAVBAR ── */}
          <header className="h-16 bg-white  w-screen border-b border-gray-200 flex items-center justify-between pr-6">
            
            
            <div className='flex items-center w-52  border-b border-gray-100  px-2 py-0 justify-between gap-4 ' >
                
                {/* Menu button (fixed size box prevents clipping) */}
                <div className="w-10 h-10 flex items-center justify-center">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:cursor-pointer"
                  >
                    <img src={MenuLogo} className="w-5 h-5" />
                  </button>
                </div>

                {/* Logo */}
                <div className="w-20 h-20 flex items-center  mr-3  justify-center">
                  
                  <img src={LOGO_SRC} className="w-20 h-20 object-contain ml-0 hover:cursor-pointer" />
                </div>

            </div>

            {/* Right: User section */}
            <div className="flex items-center gap-3">

              {/* notification dot (optional) */}
              <div className="w-9 h-9 hover:cursor-pointer rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">
                <img src={NotifiLogo} alt="" className="h-5 w-5" />
              </div>

              {/* user avatar */}
              <div className="w-9 h-9 hover:cursor-pointer rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-semibold">
                SJ
              </div>

            </div>
          
          </header>

        <div className=" flex h-[calc(100vh-64px)] ">

          {/* ── Sidebar ── */}
          <aside
            className={`flex-shrink-0 bg-white h-full border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden
            ${sidebarOpen ? "w-52" : "w-14"}`}
          >
            {/* Nav */}
            <nav className="flex-1 px-2 py-4 space-y-1 ">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-colors ${
                    location.pathname === item.path
                      ? "bg-orange-500/20 border-[1px] border-orange-500 hover:cursor-pointer text-black font-medium"
                      : "text-gray-600 hover:bg-gray-100 hover:cursor-pointer"
                  } ${!sidebarOpen ? "justify-center" : ""}`}
                  title={!sidebarOpen ? item.name : ""}
                >
                  <span className="text-base">
                    <img src={item.icon} alt={item.name} className="w-5 h-5" />
                  </span>

                  {sidebarOpen && <span>{item.name}</span>}
                </button>
              ))}
            </nav>

            {/* Bottom */}
            <div className="border-t border-gray-100 px-2 py-4 space-y-1">
              <div className={`flex items-center gap-2 px-2 py-2 bg-orange-500/20 border-[1px] rounded-lg border-orange-500  ${!sidebarOpen ? "justify-center " : ""}`}>
                <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                  SJ
                </div>
                {sidebarOpen && (
                  <div className="min-w-0 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-gray-800 truncate">Sadeed Javaid</p>
                      <p className="text-xs text-gray-400 truncate">sadeed@example.com</p>
                    </div>
                    <div className='relative'>
                      <img
                      src={MoreLogo}
                      alt="More"
                      className="w-4 h-4 cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();

                      setModalPosition({
                        top: rect.top - 166,   // 120 = approx modal height; pushes it above the icon
                        left: rect.right - 180, // adjust horizontal alignment as needed
                      });

                        setIsModalOpen(true);
                      }}
                    />
                    </div>
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
