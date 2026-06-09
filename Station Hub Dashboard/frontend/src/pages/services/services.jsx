import React, { useState, useEffect, useCallback } from 'react'
import { api } from '../../api/api'

// ── SVG Icons ──────────────────────────────────────────────
const IconPlus = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
)
const IconEdit = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)
const IconTrash = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)
const IconBarChart = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)
const IconX = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)
const IconStar = () => (
  <svg className="w-3 h-3 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)
const IconClock = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
const IconCar = () => (
  <svg className="w-8 h-8 text-orange-300 opacity-40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 6H5l-2 6v3h14v-3l-2-6H9m4 0V4" />
  </svg>
)
const IconRefresh = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
)

// ── Empty state ────────────────────────────────────────────
const EmptyState = ({ onAdd, D }) => (
  <div className="col-span-3 flex flex-col items-center justify-center py-20 text-center">
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${D ? 'bg-orange-500/20' : 'bg-orange-50'}`}>
      <svg className="w-8 h-8 text-orange-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    </div>
    <p className={`text-sm font-semibold mb-1 ${D ? 'text-gray-200' : 'text-gray-700'}`}>No services yet</p>
    <p className={`text-xs mb-4 ${D ? 'text-gray-500' : 'text-gray-400'}`}>Add your first service to start receiving bookings</p>
    <button
      onClick={onAdd}
      className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-xl transition-colors"
    >
      <IconPlus /> Add First Service
    </button>
  </div>
)

// ── Service Form ───────────────────────────────────────────
const EMPTY_FORM = { name: '', price: '', duration: '', description: '', status: 'Active', rating: '' }

const ServiceForm = ({ initial = EMPTY_FORM, onSave, onCancel, saving, error, title, D }) => {
  const [form, setForm] = useState(initial)
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const lbl = D ? 'text-gray-400' : 'text-gray-600'
  const inp = D 
    ? 'bg-[#1a1d27] border-[#2a2d3e] text-gray-100 focus:border-orange-500'
    : 'bg-white border-gray-200 text-gray-700 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'

  return (
    <div className={`border rounded-2xl shadow-sm overflow-hidden mb-4 ${D ? 'bg-[#1a1d27] border-[#2a2d3e]' : 'bg-white border-orange-200'}`}>
      <div className={`flex items-center justify-between px-5 py-4 border-b ${D ? 'bg-orange-500/10 border-[#2a2d3e]' : 'border-gray-100 bg-orange-50/40'}`}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
            <IconPlus />
          </div>
          <p className={`text-sm font-semibold ${D ? 'text-gray-100' : 'text-gray-900'}`}>{title}</p>
        </div>
        <button onClick={onCancel} className={`w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors ${D ? 'text-gray-500 hover:bg-[#2a2d3e]' : 'text-gray-400 hover:text-gray-600'}`}>
          <IconX />
        </button>
      </div>

      <div className="p-5">
        {error && (
          <div className={`mb-4 px-3 py-2 rounded-lg text-xs ${D ? 'bg-red-500/20 border border-red-500/50 text-red-400' : 'bg-red-50 border border-red-100 text-red-500'}`}>
            {error}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className={`block text-xs font-medium mb-1.5 ${lbl}`}>Service Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="e.g. Premium Detail"
              className={`w-full px-3 py-2 text-sm border rounded-xl focus:outline-none transition-all ${inp}`}
            />
          </div>

          <div>
            <label className={`block text-xs font-medium mb-1.5 ${lbl}`}>Status</label>
            <select
              value={form.status}
              onChange={e => set('status', e.target.value)}
              className={`w-full px-3 py-2 text-sm border rounded-xl focus:outline-none transition-all ${inp}`}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div>
            <label className={`block text-xs font-medium mb-1.5 ${lbl}`}>Price (PKR)</label>
            <div className="relative">
              <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium ${D ? 'text-gray-600' : 'text-gray-400'}`}>PKR</span>
              <input
                type="number"
                value={form.price}
                onChange={e => set('price', e.target.value)}
                placeholder="2500"
                className={`w-full pl-10 pr-3 py-2 text-sm border rounded-xl focus:outline-none transition-all ${inp}`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-medium mb-1.5 ${lbl}`}>Duration</label>
            <input
              type="text"
              value={form.duration}
              onChange={e => set('duration', e.target.value)}
              placeholder="e.g. 20–30 mins"
              className={`w-full px-3 py-2 text-sm border rounded-xl focus:outline-none transition-all ${inp}`}
            />
          </div>

          <div>
            <label className={`block text-xs font-medium mb-1.5 ${lbl}`}>Rating (optional)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={form.rating}
              onChange={e => set('rating', e.target.value)}
              placeholder="4.9"
              className={`w-full px-3 py-2 text-sm border rounded-xl focus:outline-none transition-all ${inp}`}
            />
          </div>

          <div className="col-span-3">
            <label className={`block text-xs font-medium mb-1.5 ${lbl}`}>Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Describe your service briefly..."
              className={`w-full px-3 py-2 text-sm border rounded-xl focus:outline-none transition-all resize-none ${inp}`}
            />
          </div>
        </div>

        <div className={`flex items-center justify-end gap-3 mt-5 pt-4 border-t ${D ? 'border-[#2a2d3e]' : 'border-gray-100'}`}>
          <button onClick={onCancel} className={`px-4 py-2 text-sm font-medium border rounded-xl transition-colors ${D ? 'text-gray-500 border-[#2a2d3e] hover:bg-[#2a2d3e]' : 'text-gray-500 hover:text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={saving}
            className="px-5 py-2 text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors shadow-sm disabled:opacity-60 flex items-center gap-1.5"
          >
            {saving
              ? <><span className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" /> Saving…</>
              : 'Save Service'
            }
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────
const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [confirmDel, setConfirmDel] = useState(null)
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')

  // ── Fetch services ────────────────────────────────────
  const fetchServices = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const data = await api.get('/services/')
      setServices(data.services || [])
    } catch (e) {
      setError(e.message || 'Failed to load services')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchServices() }, [fetchServices])
  useEffect(() => {
    const handleThemeChange = () => {
      setDark(localStorage.getItem('theme') === 'dark')
    }
    window.addEventListener('storage', handleThemeChange)
    return () => window.removeEventListener('storage', handleThemeChange)
  }, [])

  const validate = (form) => {
    if (!form.name.trim()) return 'Service name is required'
    if (!form.price) return 'Price is required'
    if (isNaN(Number(form.price)) || Number(form.price) < 0) return 'Enter a valid price'
    if (!form.duration.trim()) return 'Duration is required'
    return null
  }

  const handleAdd = async (form) => {
    const err = validate(form)
    if (err) { setFormError(err); return }
    setSaving(true); setFormError('')
    try {
      const data = await api.post('/services/', {
        name: form.name.trim(),
        price: Number(form.price),
        duration: form.duration.trim(),
        description: form.description.trim(),
        status: form.status,
        rating: form.rating ? Number(form.rating) : null,
      })
      setServices(prev => [data.service, ...prev])
      setIsAdding(false)
    } catch (e) {
      setFormError(e.message || 'Failed to add service')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = async (form) => {
    const err = validate(form)
    if (err) { setFormError(err); return }
    setSaving(true); setFormError('')
    try {
      const data = await api.put(`/services/${editingId}`, {
        name: form.name.trim(),
        price: Number(form.price),
        duration: form.duration.trim(),
        description: form.description.trim(),
        status: form.status,
        rating: form.rating ? Number(form.rating) : null,
      })
      setServices(prev => prev.map(s => s.id === editingId ? { ...s, ...data.service } : s))
      setEditingId(null)
    } catch (e) {
      setFormError(e.message || 'Failed to update service')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    setDeletingId(id)
    try {
      await api.delete(`/services/${id}`)
      setServices(prev => prev.filter(s => s.id !== id))
    } catch (e) {
      alert(e.message || 'Failed to delete service')
    } finally {
      setDeletingId(null)
      setConfirmDel(null)
    }
  }

  // ── Theme tokens ───────────────────────────────────────
  const D = dark
  const bg = D ? 'bg-[#0f1117]' : 'bg-gray-50'
  const txt = D ? 'text-gray-100' : 'text-gray-900'
  const sub = D ? 'text-gray-400' : 'text-gray-500'

  if (loading) return (
    <div className={`flex items-center justify-center h-full min-h-[300px] rounded-lg ${bg}`}>
      <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className={`flex-1 p-6 overflow-auto rounded-lg transition-colors duration-300 ${bg}`}>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className={`text-xl font-semibold ${txt}`}>My Services</h1>
          <p className={`text-sm mt-0.5 ${sub}`}>
            {services.length} service{services.length !== 1 ? 's' : ''} · Manage what you offer
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchServices}
            className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs text-gray-600 transition-colors ${D ? 'bg-[#1a1d27] border-[#2a2d3e] text-gray-400 hover:text-gray-300' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
          >
            <IconRefresh /> Refresh
          </button>
          <button
            onClick={() => { setIsAdding(true); setEditingId(null); setFormError('') }}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
          >
            <IconPlus /> Add New
          </button>
        </div>
      </div>

      {error && (
        <div className={`mb-4 px-4 py-3 border rounded-xl text-sm ${D ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-red-50 border-red-200 text-red-500'}`}>
          {error}
        </div>
      )}

      {isAdding && (
        <ServiceForm
          title="Add New Service"
          onSave={handleAdd}
          onCancel={() => { setIsAdding(false); setFormError('') }}
          saving={saving}
          error={formError}
          D={D}
        />
      )}

      {editingId && (() => {
        const svc = services.find(s => s.id === editingId)
        if (!svc) return null
        return (
          <ServiceForm
            title={`Edit — ${svc.name}`}
            initial={{
              name: svc.name || '',
              price: svc.price || '',
              duration: svc.duration || '',
              description: svc.description || '',
              status: svc.status || 'Active',
              rating: svc.rating || '',
            }}
            onSave={handleEdit}
            onCancel={() => { setEditingId(null); setFormError('') }}
            saving={saving}
            error={formError}
            D={D}
          />
        )
      })()}

      <div className="grid grid-cols-3 gap-4">
        {services.length === 0 && !isAdding && (
          <EmptyState onAdd={() => setIsAdding(true)} D={D} />
        )}

        {services.map(svc => (
          <div
            key={svc.id}
            className={`border rounded-2xl shadow-sm overflow-hidden flex flex-col transition-colors ${D ? 'bg-[#1a1d27] border-[#2a2d3e]' : 'bg-white border-gray-100'}`}
          >
            {svc.image_url
              ? <img src={svc.image_url} alt={svc.name} className="h-36 w-full object-cover" />
              : (
                <div className={`h-36 flex items-center justify-center ${D ? 'bg-orange-500/10' : 'bg-gradient-to-br from-orange-50 to-orange-100'}`}>
                  <IconCar />
                </div>
              )
            }

            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className={`text-sm font-bold leading-tight ${D ? 'text-gray-100' : 'text-gray-900'}`}>{svc.name}</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 flex items-center gap-1 ${
                  svc.status === 'Active'
                    ? D ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'
                    : D ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-50 text-yellow-600'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${svc.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  {svc.status}
                </span>
              </div>

              <div className={`flex items-center gap-3 text-xs mb-2 ${D ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className="font-semibold text-orange-500">
                  PKR {Number(svc.price).toLocaleString()}
                </span>
                <span className={D ? 'text-gray-600' : 'text-gray-200'}>|</span>
                <span className="flex items-center gap-1">
                  <IconClock /> {svc.duration}
                </span>
              </div>

              {svc.rating && (
                <div className={`flex items-center gap-1 text-xs mb-3 ${D ? 'text-gray-400' : 'text-gray-500'}`}>
                  <IconStar />
                  <span className={`font-medium ${D ? 'text-gray-300' : 'text-gray-700'}`}>{Number(svc.rating).toFixed(1)}</span>
                </div>
              )}

              {svc.description && (
                <p className={`text-xs leading-relaxed mb-3 flex-1 line-clamp-2 ${D ? 'text-gray-500' : 'text-gray-400'}`}>
                  {svc.description}
                </p>
              )}

              <div className="flex-1" />

              {confirmDel === svc.id ? (
                <div className={`mt-auto pt-3 border-t ${D ? 'border-[#2a2d3e]' : 'border-gray-100'}`}>
                  <p className={`text-xs font-medium mb-2 text-center ${D ? 'text-red-400' : 'text-red-500'}`}>
                    Delete "{svc.name}"? This can't be undone.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setConfirmDel(null)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg text-xs font-medium transition-colors ${D ? 'border-[#2a2d3e] text-gray-500 hover:bg-[#2a2d3e]' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(svc.id)}
                      disabled={deletingId === svc.id}
                      className="flex-1 px-2 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-60"
                    >
                      {deletingId === svc.id ? 'Deleting…' : 'Yes, Delete'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className={`flex items-center gap-2 pt-3 border-t mt-auto ${D ? 'border-[#2a2d3e]' : 'border-gray-100'}`}>
                  <button
                    onClick={() => { setEditingId(svc.id); setIsAdding(false); setFormError('') }}
                    className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 border rounded-lg text-xs font-medium transition-colors ${D ? 'border-[#2a2d3e] text-gray-400 hover:bg-[#2a2d3e]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    <IconEdit /> Edit
                  </button>
                  <button
                    onClick={() => setConfirmDel(svc.id)}
                    className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 border rounded-lg text-xs font-medium transition-colors ${D ? 'border-red-500/50 text-red-400 hover:bg-red-500/10' : 'border-red-100 text-red-500 hover:bg-red-50'}`}
                  >
                    <IconTrash /> Delete
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    <IconBarChart /> Stats
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services