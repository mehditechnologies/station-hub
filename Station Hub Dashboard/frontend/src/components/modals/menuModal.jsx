import ProfileLogo from '../../assets/account.png'
import SettingLogo from '../../assets/settings.png'
import LogoutLogo from '../../assets/logout.png'
import DarkLogo from '../../assets/moon.png'
import NotifiLogo from '../../assets/notification.png'
import { Outlet, useNavigate, useLocation } from "react-router-dom";



import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function UserMenuModal({
  isOpen,
  onClose,
  onProfile,
  onSettings,
  onLogout,
  position,
}) {

  const navigate = useNavigate();

  const handleLogout = () => {
    // optional: clear auth data
    // localStorage.removeItem("token");

    navigate("/login"); // or "/" if you want home page
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* background */}
          <div
            className="absolute inset-0 "
            onClick={onClose}
          />

          {/* modal */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              top: position.top,
              left: position.left,
            }}
            className="absolute flex flex-col items-center justify-center w-47 rounded-lg shadow-lg bg-white border-gray-300 border-[1px] py-2"
          >
            <button
              onClick={onProfile}
              className="w-44 text-left px-3 py-2 hover:cursor-pointer hover:bg-gray-500/20 rounded-lg   text-sm"
            >
              Dark Mode
              <img src={DarkLogo} className="w-5 h-5 inline-block ml-[62px] " />
            </button>

            <button
              onClick={onSettings}
              className="w-44 text-left px-3 py-2  hover:cursor-pointer hover:bg-gray-500/20 rounded-lg  text-sm"
            >
              Notifications
              <img src={NotifiLogo} className="w-4 h-4 inline-block ml-[56px]" />
            </button>

            <hr className="border-[#9CA3AF] w-[170px] ml-2 my-2 " />

            <button
              onClick={handleLogout}
              className="w-44 text-left px-3 py-2 hover:cursor-pointer hover:bg-red-500/40 rounded-lg text-sm"
            >
              Logout
              <img src={LogoutLogo} className="w-4 h-4 inline-block ml-[90px]" />    
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}