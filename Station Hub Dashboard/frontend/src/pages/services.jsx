import React from 'react'
import { useState } from 'react';
const services = () => {

const [isAddingNew, setIsAddingNew] = useState(false);

  return (
    <div>
      <main className="flex-1 p-6 overflow-auto rounded-lg bg-gray-50">

  {/* Header */}
  <div className="flex items-start justify-between mb-6">
    <div>
      <h1 className="text-xl font-semibold text-gray-900">My Services</h1>
      <p className="text-sm text-gray-400 mt-0.5">Manage all your car care services</p>
    </div>
    <button onClick={() => setIsAddingNew(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors shadow-sm">
      <span className="text-base leading-none">+</span> Add New
    </button>
  </div>
{/* ///////////////////////////////////////////////////// */}
{/* Add New Service Form - shown when isAddingNew is true */}
{isAddingNew && (
  <div className="bg-white border border-orange-200 rounded-2xl shadow-sm overflow-hidden mb-4">
    
    {/* Form Header */}
    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-orange-50/50">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm">+</span>
        </div>
        <p className="text-sm font-semibold text-gray-900">Add New Service</p>
      </div>
      <button
        onClick={() => setIsAddingNew(false)}
        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
      >
        ✕
      </button>
    </div>

    <div className="p-5">
      <div className="grid grid-cols-3 gap-4">

        {/* Service Name */}
        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Service Name</label>
          <input
            type="text"
            placeholder="e.g. Premium Detail"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
          <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-white text-gray-700">
            <option value="Active">🟢 Active</option>
            <option value="Inactive">🟡 Inactive</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Price (PKR)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">PKR</span>
            <input
              type="number"
              placeholder="2,500"
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Duration</label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. 20–30 mins"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Rating (optional)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            placeholder="4.9"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
          />
        </div>

        {/* Description */}
        <div className="col-span-3">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Description</label>
          <textarea
            rows={3}
            placeholder="Describe your service briefly..."
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
          />
        </div>

        {/* Image Upload */}
        <div className="col-span-3">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Service Image</label>
          <div className="border-2 border-dashed border-gray-200 hover:border-orange-300 rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group">
            <div className="w-9 h-9 bg-orange-50 group-hover:bg-orange-100 rounded-xl flex items-center justify-center transition-colors">
              <span className="text-lg">📸</span>
            </div>
            <p className="text-xs text-gray-400 text-center">
              Click to upload or drag & drop
              <span className="block text-gray-300">PNG, JPG up to 5MB</span>
            </p>
            <input type="file" accept="image/*" className="hidden" />
          </div>
        </div>

      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 mt-5 pt-4 border-t border-gray-100">
        <button
          onClick={() => setIsAddingNew(false)}
          className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
        >
          Cancel
        </button>
        <button className="px-5 py-2 text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors shadow-sm">
          Save Service
        </button>
      </div>
    </div>

  </div>
)}
{/* ///////////////////////////////////////////////////// */}


  {/* Service Cards Grid */}
  <div className="grid grid-cols-3 gap-4">
    {[
      {
        name: "Premium Detail",
        price: "PKR 2,500",
        duration: "20–30 mins",
        rating: "4.9",
        reviews: 12,
        description: "Professional interior and exterior cleaning with premium products.",
        status: "Active",
      },
      {
        name: "Express Wash",
        price: "PKR 1,500",
        duration: "15 mins",
        rating: "4.8",
        reviews: 25,
        description: "Quick exterior wash with water spot treatment.",
        status: "Active",
      },
      {
        name: "Interior Detailing",
        price: "PKR 3,500",
        duration: "45 mins",
        rating: "4.9",
        reviews: 8,
        description: "Deep cleaning of car interior with vacuum and conditioning.",
        status: "Inactive",
      },
    ].map((service, i) => (
      <div
        key={i}
        className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col"
      >
        {/* Image Placeholder */}
        <div className="h-36 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
          <span className="text-4xl opacity-40">🚗</span>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Title + Status */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="text-sm font-bold text-gray-900">{service.name}</p>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
                service.status === "Active"
                  ? "bg-green-50 text-green-600"
                  : "bg-yellow-50 text-yellow-600"
              }`}
            >
              {service.status === "Active" ? "🟢" : "🟡"} {service.status}
            </span>
          </div>

          {/* Price + Duration */}
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
            <span className="font-semibold text-orange-500">{service.price}</span>
            <span className="text-gray-300">|</span>
            <span>⏱️ {service.duration}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
            <span className="text-yellow-400">⭐</span>
            <span className="font-medium text-gray-700">{service.rating}</span>
            <span className="text-gray-400">({service.reviews} reviews)</span>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-400 leading-relaxed mb-4 flex-1">
            {service.description}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
            <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-medium rounded-lg transition-colors">
              ✏️ Edit
            </button>
            <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 border border-red-100 hover:bg-red-50 text-red-500 text-xs font-medium rounded-lg transition-colors">
              🗑️ Delete
            </button>
            <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium rounded-lg transition-colors">
              📊 Stats
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</main>
    </div>
  )
}

export default services