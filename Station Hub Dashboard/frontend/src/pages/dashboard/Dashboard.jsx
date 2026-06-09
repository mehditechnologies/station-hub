import GroupLogo from "../../assets/group.png";
import InfinityLogo from "../../assets/infinity.png";
import StationLogo from "../../assets/station.png";
import AppointmentLogo from "../../assets/appointment.png";
import Money from "../../assets/money2.png";
// import Money2 from "../assets/money2.png"

import React from 'react'

const Dashboard = () => {


const statCards = [
  { label: "Total Stations", value: "0", icon: StationLogo },
  { label: "Total Users", value: "0", icon: GroupLogo },
  { label: "Total Bookings", value: "0", icon: AppointmentLogo },
  { label: "Services", value: "Unlimited", icon: InfinityLogo },
];
  return (
    <div>
        {/* ── Main Content ── */}
      <main className="flex-1 p-6 overflow-auto bg-gray-50 rounded-lg ">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Welcome, Sadeed! Good to have you onboard.
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Here's what's happening with your stations
            </p>
          </div>

          {/* <div className="flex items-center gap-2">
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    activeFilter === f
                      ? "bg-orange-500 text-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 bg-white hover:bg-gray-50 transition-colors">
              🔄 Refresh
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 bg-white hover:bg-gray-50 transition-colors">
              ⬇️ Export CSV
            </button>
          </div> */}
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-gray-500 mb-1">{card.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
              </div>
              <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                <img src={card.icon} alt={card.label} className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
        {/* /////////////////////////////////////////////////// */}
        {/* Today's Earnings */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-5 mb-6 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-sm text-orange-100 mb-1">Today's Earnings</p>
            <p className="text-3xl font-bold text-white">PKR 0</p>
            <p className="text-xs text-orange-100 mt-1">No bookings completed today</p>
          </div>
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
            <img src={Money} alt="" className="h-11 w-11" />
          </div>
        </div>

        {/* Bookings Section */}
        <div className="grid grid-cols-3 gap-4">

          {/* Pending Bookings */}
          <div className="col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <p className="text-sm font-semibold text-gray-800">Pending Bookings</p>
                <span className="text-xs bg-red-50 text-red-500 font-medium px-2 py-0.5 rounded-full">2</span>
              </div>
              <a href="#" className="text-xs text-orange-500 hover:text-orange-600 font-medium">View all</a>
            </div>

            <div className="divide-y divide-gray-50">
              {[
                { name: "Ahmed Khan", service: "Premium Detail", date: "June 10", time: "2:30 PM – 3:00 PM", car: "Toyota Corolla (Silver)", price: "PKR 2,500" },
                { name: "Sara Ahmed",  service: "Express Wash",   date: "June 10", time: "4:00 PM – 4:15 PM", car: "Honda City (White)",    price: "PKR 1,500" },
              ].map((b, i) => (
                <div key={i} className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm font-semibold flex-shrink-0">
                      {b.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-900">{b.name}</p>
                        <span className="text-sm font-bold text-orange-500">{b.price}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{b.service}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                        <span>📅 {b.date}</span>
                        <span>⏰ {b.time}</span>
                        <span>🚗 {b.car}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-600 text-xs font-medium rounded-lg transition-colors">
                          ✅ Confirm
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-medium rounded-lg transition-colors">
                          ❌ Reject
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-500 text-xs font-medium rounded-lg transition-colors">
                          💬 Chat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Confirmed Bookings */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <p className="text-sm font-semibold text-gray-800">Confirmed</p>
                <span className="text-xs bg-green-50 text-green-600 font-medium px-2 py-0.5 rounded-full">3</span>
              </div>
            </div>

            <div className="divide-y divide-gray-50">
              {[
                { name: "Fatima Khan", service: "Deep Cleaning",     date: "June 11", time: "10:00 AM" },
                { name: "Ali Raza",    service: "Interior Detailing", date: "June 12", time: "2:00 PM"  },
                { name: "Usman Malik", service: "Express Wash",       date: "June 13", time: "11:00 AM" },
              ].map((b, i) => (
                <div key={i} className="px-5 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xs font-semibold flex-shrink-0">
                      {b.name.charAt(0)}
                    </div>
                    <p className="text-sm font-semibold text-gray-900 truncate">{b.name}</p>
                  </div>
                  <p className="text-xs text-gray-500">{b.service}</p>
                  <p className="text-xs text-gray-400 mt-0.5">📅 {b.date} · ⏰ {b.time}</p>
                  <div className="flex gap-2 mt-2.5">
                    <button className="flex-1 px-2 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-500 text-xs rounded-lg transition-colors">
                      Details
                    </button>
                    <button className="flex-1 px-2 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-lg transition-colors">
                      Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        {/* /////////////////////////////////////////////////// */}
      </main>
    </div>
  )
}

export default Dashboard