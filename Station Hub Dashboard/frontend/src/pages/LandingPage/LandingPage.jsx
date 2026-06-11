import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/darkMainLogo.png";
import BGImage from "../../assets/WebLandingPage2.png";

const IconCalendar = () => (
  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const IconStation = () => (
  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const IconChart = () => (
  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const features = [
  {
    icon: <IconCalendar />,
    title: "Smart Bookings",
    desc: "Manage and confirm customer bookings in real time.",
  },
  {
    icon: <IconStation />,
    title: "Station Control",
    desc: "Add and manage multiple service stations easily.",
  },
  {
    icon: <IconChart />,
    title: "Live Analytics",
    desc: "Track earnings, users, and performance at a glance.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex flex-col relative overflow-hidden"
      style={{
        backgroundImage: `url(${BGImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-5">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Station Hub" className="w-12 h-12 object-contain" />
          <span className="text-white font-bold text-xl">Station Hub</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 text-white border border-white/40 rounded-lg text-sm font-semibold hover:bg-white/10 transition"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 bg-orange-500 text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition shadow-lg"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          <span className="text-orange-400 text-xs font-semibold tracking-wide uppercase">
            All Service Stations. One Hub.
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 max-w-3xl">
          Manage Your Station
          <span className="text-orange-500"> Smarter</span>
        </h1>

        <p className="text-gray-300 text-lg max-w-xl mb-10 leading-relaxed">
          Station Hub gives you full control over bookings, services, and customers — all from one powerful dashboard.
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base rounded-xl shadow-[0_4px_24px_rgba(249,115,22,0.5)] transition-all hover:scale-105"
          >
            Start For Free →
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3.5 border border-white/30 text-white font-semibold text-base rounded-xl hover:bg-white/10 transition-all"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="relative z-10 px-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-left hover:bg-white/15 transition"
            >
              <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center mb-3">
                {f.icon}
              </div>
              <h3 className="text-white font-bold text-base mb-1">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-6">
        <p className="text-gray-500 text-xs">© 2024 Station Hub. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingPage;