import React from 'react'

const profile = () => {
  return (
    <div>
      <main className="flex-1 p-6 overflow-auto bg-gray-50 rounded-lg">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">My Profile</h1>
        <p className="text-sm text-gray-400 mt-0.5">Personal account settings</p>
      </div>

      <div className="flex flex-col gap-4 max-w-2xl">

        {/* Profile Information */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <span className="text-base">👤</span>
            <p className="text-sm font-semibold text-gray-900">Profile Information</p>
          </div>

          <div className="p-5 flex flex-col gap-4">

            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                SJ
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Sadeed Javaid</p>
                <button className="mt-1 text-xs text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1 transition-colors">
                  📸 Upload Photo
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name</label>
              <input
                type="text"
                defaultValue="Sadeed Javaid"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
              <div className="relative">
                <input
                  type="email"
                  defaultValue="sadeed@example.com"
                  className="w-full px-3 py-2 pr-24 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-500 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                  ✓ Verified
                </span>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone</label>
              <div className="relative">
                <input
                  type="tel"
                  defaultValue="+92-300-1234567"
                  className="w-full px-3 py-2 pr-24 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-500 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                  ✓ Verified
                </span>
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Date of Birth</label>
              <input
                type="date"
                defaultValue="1995-03-15"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <button className="text-xs font-medium text-gray-500 hover:text-gray-700 border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-xl transition-colors">
                🔑 Change Password
              </button>
              <button className="text-xs font-medium bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition-colors shadow-sm">
                Save Changes
              </button>
            </div>

          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <span className="text-base">🌙</span>
            <p className="text-sm font-semibold text-gray-900">Appearance</p>
          </div>

          <div className="p-5 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2.5">Theme Preference</label>
              <div className="flex flex-col gap-2">
                {["Light Mode", "Dark Mode", "System Default"].map((theme) => (
                  <label key={theme} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="theme"
                      defaultChecked={theme === "Dark Mode"}
                      className="accent-orange-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{theme}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Language</label>
              <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-white text-gray-700">
                <option>English (United States)</option>
                <option>English (United Kingdom)</option>
                <option>Urdu</option>
              </select>
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button className="text-xs font-medium bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <span className="text-base">🔔</span>
            <p className="text-sm font-semibold text-gray-900">Notifications</p>
          </div>

          <div className="p-5 flex flex-col gap-3">
            {[
              { label: "New Booking Notifications", checked: true },
              { label: "Booking Confirmations",     checked: true },
              { label: "Payment Alerts",            checked: true },
              { label: "Weekly Reports",            checked: true },
              { label: "Marketing Emails",          checked: false },
            ].map((item) => (
              <label key={item.label} className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{item.label}</span>
                <div className="relative">
                  <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 peer-checked:bg-orange-500 rounded-full transition-colors cursor-pointer"></div>
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4"></div>
                </div>
              </label>
            ))}

            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button className="text-xs font-medium bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <span className="text-base">🔐</span>
            <p className="text-sm font-semibold text-gray-900">Security</p>
          </div>

          <div className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">Two-Factor Authentication</p>
                <p className="text-xs text-gray-400 mt-0.5">Add an extra layer of security to your account</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">Enabled</span>
                <button className="text-xs font-medium text-orange-500 hover:text-orange-600 border border-orange-200 hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-colors">
                  Manage 2FA
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-100">
              <div>
                <p className="text-xs font-medium text-gray-600">Last Login</p>
                <p className="text-sm text-gray-800 mt-0.5">June 8, 2026 @ 11:30 AM</p>
              </div>
              <button className="text-xs font-medium text-gray-500 hover:text-gray-700 border border-gray-200 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors">
                View All Activity
              </button>
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button className="text-xs font-medium bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white border border-red-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-red-100 bg-red-50/40">
            <span className="text-base">⚠️</span>
            <p className="text-sm font-semibold text-red-600">Danger Zone</p>
          </div>

          <div className="p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">Delete Account</p>
                <p className="text-xs text-gray-400 mt-0.5">All data will be permanently deleted and cannot be recovered</p>
              </div>
              <button className="text-xs font-medium text-red-500 hover:text-red-600 border border-red-200 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors flex-shrink-0">
                🗑️ Delete Account
              </button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-800">Logout</p>
                <p className="text-xs text-gray-400 mt-0.5">Sign out from your current session</p>
              </div>
              <button className="text-xs font-medium text-gray-600 hover:text-gray-800 border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-xl transition-colors flex-shrink-0">
                🚪 Logout
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
    </div>
  )
}

export default profile