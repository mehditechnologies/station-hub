import ProfileLogo from "../../assets/account.png";
import SettingLogo from "../../assets/settings.png";
import LogoutLogo from "../../assets/logout.png";
import DarkLogo from "../../assets/moon.png";
import NotifiLogo from "../../assets/notification.png";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../context/theme.Context";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function UserMenuModal({
  isOpen,
  onClose,
  onProfile,
  onSettings,
  onLogout,
  position,
  // dark,
  // onDarkModeToggle,
}) {
  const navigate = useNavigate();

  // ── Sign out ───────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ── Theme (controls entire app) ────────────────────────
  // const [dark, setDark] = useState(
  //   () => localStorage.getItem("theme") === "dark",
  // );
  // useEffect(() => {
  //   const root = document.documentElement;
  //   if (dark) {
  //     root.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     root.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // }, [dark]);

  // const handleThemeToggle = async (val) => {
  //   setDark(val === "dark");
  //   try {
  //     await api.put("/settings/theme", { theme: val });
  //   } catch {
  //     /* silent — theme still works locally */
  //   }
  // };
  const { dark, toggleTheme } = useTheme();

  // ── Theme tokens ───────────────────────────────────────
  const D = dark;
  const bg = D ? "bg-[#0f1117]" : "bg-gray-50";
  const card = D ? "bg-[#1a1d27] border-[#2a2d3e]" : "bg-white border-gray-100";
  const head = D ? "border-[#2a2d3e]" : "border-gray-100";
  const txt = D ? "text-gray-100" : "text-gray-900";
  const sub = D ? "text-gray-400" : "text-gray-500";
  const lbl = D ? "text-gray-400" : "text-gray-600";
  const inp = D
    ? "bg-[#0f1117] border-[#2a2d3e] text-gray-100 focus:border-orange-500"
    : "bg-white border-gray-200 text-gray-700 focus:border-orange-400 focus:ring-2 focus:ring-orange-100";
  const sel = D
    ? "bg-[#0f1117] border-[#2a2d3e] text-gray-100 focus:border-orange-500"
    : "bg-white border-gray-200 text-gray-700 focus:border-orange-400";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* background */}
          <div className="absolute inset-0 " onClick={onClose} />

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
            className={`absolute flex flex-col items-center justify-center w-47 rounded-lg shadow-lg border py-2 ${D ? "bg-[#1a1d27] border-[#2a2d3e]" : "bg-white border-gray-300"}`}
          >
            {/* <button
              onClick={() => toggleTheme(dark ? 'light' : 'dark')}
              className="w-44 text-left px-3 py-2 hover:cursor-pointer hover:bg-gray-500/20 rounded-lg text-sm flex items-center justify-between"
            >
              {dark ? " Dark Mode" : "Light Mode"}
              {dark ? (
                // Sun icon
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                
              ) : (
                // Moon icon
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              )}
            </button> */}
            <button
              onClick={() => toggleTheme(dark ? "light" : "dark")}
              className={`w-44 text-left px-3 py-2 hover:cursor-pointer hover:bg-gray-500/20 rounded-lg text-sm flex items-center justify-between ${txt}`}
            >
              {dark ? "Light Mode" : "Dark Mode"}
              {dark ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={D ? "white" : "currentColor"}
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={D ? "white" : "currentColor"}
                  strokeWidth="2"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <hr className="border-[#9CA3AF] w-[170px] ml-2 my-2 " />

            {/* <button
              onClick={handleLogout}
              className="w-44 text-left px-3 py-2 hover:cursor-pointer hover:bg-red-500/40 rounded-lg text-sm"
            >
              Logout
              <img
                src={LogoutLogo}
                className="w-4 h-4 inline-block ml-[90px]"
              />
            </button> */}
            <button
              onClick={handleLogout}
              className={`w-44 text-left px-3 py-2 hover:cursor-pointer hover:bg-red-500/40 rounded-lg text-sm flex items-center justify-between ${txt}`}
            >
              Logout
              {/* <img src={LogoutLogo} className="w-4 h-4" /> */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className={D ? "stroke-white" : "stroke-gray-700"}
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
