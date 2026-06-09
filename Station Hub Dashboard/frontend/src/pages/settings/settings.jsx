import React from 'react'

const settings = () => {
  return (
    <div>
      <main className="flex-1 p-6 overflow-auto bg-gray-50 rounded-lg ">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-400 mt-0.5">Manage your shop details</p>
      </div>

      <div className="flex flex-col gap-4 max-w-2xl">

        {/* Shop Information */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <span className="text-base">📍</span>
            <p className="text-sm font-semibold text-gray-900">Shop Information</p>
          </div>

          <div className="p-5 flex flex-col gap-4">

            <div className="grid grid-cols-2 gap-4">
              {/* Shop Name */}
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Shop Name</label>
                <input
                  type="text"
                  defaultValue="Sadeed's Premium Car Care"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              {/* Location */}
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Location / Address</label>
                <input
                  type="text"
                  defaultValue="Saddar, Rawalpindi, Pakistan"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+92-300-1234567"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
                <input
                  type="email"
                  defaultValue="sadeed@example.com"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              {/* Category */}
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Shop Category</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-white text-gray-700">
                  <option>Car Wash & Detailing</option>
                  <option>Auto Repair</option>
                  <option>Tyre & Wheel Service</option>
                  <option>Oil & Lube</option>
                </select>
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Description</label>
                <textarea
                  rows={3}
                  defaultValue="Professional car care with premium products and experienced staff."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button className="text-xs font-medium bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <span className="text-base">🕐</span>
            <p className="text-sm font-semibold text-gray-900">Availability</p>
          </div>

          <div className="p-5 flex flex-col gap-4">

            {/* Working Hours */}
            <div>
              <p className="text-xs font-medium text-gray-600 mb-3">Working Hours</p>
              <div className="flex flex-col gap-3">
                {[
                  { day: "Monday – Friday", open: "09:00", close: "18:00", off: false },
                  { day: "Saturday",        open: "10:00", close: "17:00", off: false },
                  { day: "Sunday",          open: "",      close: "",       off: true  },
                ].map((row) => (
                  <div key={row.day} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-32 flex-shrink-0">{row.day}</span>
                    {row.off ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg">OFF</span>
                        <button className="text-xs text-orange-500 hover:text-orange-600 font-medium transition-colors">
                          Toggle
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <select defaultValue={row.open} className="px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 bg-white text-gray-700">
                          {["08:00","09:00","10:00","11:00","12:00"].map(t => <option key={t}>{t}</option>)}
                        </select>
                        <span className="text-gray-300 text-xs">—</span>
                        <select defaultValue={row.close} className="px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 bg-white text-gray-700">
                          {["16:00","17:00","18:00","19:00","20:00"].map(t => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Break Time */}
            <div className="pt-3 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-600 w-32 flex-shrink-0">Break Time <span className="text-gray-400 block font-normal">(Prayer & Lunch)</span></span>
                <div className="flex items-center gap-2">
                  <select className="px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 bg-white text-gray-700">
                    {["12:00","13:00","14:00"].map(t => <option key={t}>{t}</option>)}
                  </select>
                  <span className="text-gray-300 text-xs">—</span>
                  <select className="px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 bg-white text-gray-700">
                    {["13:00","14:00","15:00"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Slot Duration */}
            <div className="pt-3 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-600 mb-2.5">Time Slot Duration</p>
              <div className="flex items-center gap-4">
                {["15 mins", "30 mins", "1 hour"].map((slot) => (
                  <label key={slot} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="slot"
                      defaultChecked={slot === "15 mins"}
                      className="accent-orange-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{slot}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Max Bookings */}
            <div className="pt-3 border-t border-gray-100">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Max Bookings Per Day</label>
              <input
                type="number"
                defaultValue={10}
                min={1}
                className="w-32 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button className="text-xs font-medium bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Payment & Bank Details */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <span className="text-base">💳</span>
            <p className="text-sm font-semibold text-gray-900">Payment & Bank Details</p>
          </div>

          <div className="p-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Account Holder Name</label>
                <input
                  type="text"
                  defaultValue="Sadeed Javaid"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Bank Name</label>
                <input
                  type="text"
                  defaultValue="HBL – Habib Bank Limited"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Account Number</label>
                <input
                  type="text"
                  defaultValue="1234567890"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">IBAN</label>
                <input
                  type="text"
                  defaultValue="PK36 HBLA 0029 2000 1000 0000 00"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all font-mono tracking-wide"
                />
              </div>

            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button className="text-xs font-medium bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex items-center justify-end gap-3 pb-2">
          <button className="text-xs font-medium text-gray-500 hover:text-gray-700 border border-gray-200 hover:bg-gray-50 px-5 py-2 rounded-xl transition-colors">
            ❌ Cancel
          </button>
          <button className="text-xs font-medium bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl transition-colors shadow-sm">
            💾 Save All
          </button>
        </div>

      </div>
    </main>
    </div>
  )
}

export default settings