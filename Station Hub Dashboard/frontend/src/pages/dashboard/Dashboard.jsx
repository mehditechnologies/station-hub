import React, { useState, useEffect, useCallback } from 'react'
import { api } from '../../api/api'

// ── SVG Icons ──────────────────────────────────────────────
const IconStation = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)
const IconUsers = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)
const IconBooking = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)
const IconInfinity = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 12c0 1.657-2.239 3-5 3-1.593 0-3.025-.523-4-1.343M18.364 12c0-1.657-2.239-3-5-3-1.593 0-3.025.523-4 1.343M18.364 12H21m-3.636 0C15.727 13.657 13.488 15 10.727 15c-2.762 0-5-1.343-5-3s2.238-3 5-3c2.761 0 5 1.343 5 3zM3 12h2.364" />
  </svg>
)
const IconMoney = () => (
  <svg className="w-10 h-10 text-white/80" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
const IconCheck = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)
const IconX = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)
const IconCalendar = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)
const IconClock = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
const IconCar = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 6H5l-2 6v3h14v-3l-2-6H9m4 0V4" />
  </svg>
)
const IconRefresh = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
)
const IconComplete = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

// ── Helpers ────────────────────────────────────────────────
const avatar = (name = '') => (name.charAt(0) || '?').toUpperCase()

const Dashboard = () => {
  const [stats,     setStats]     = useState(null)
  const [pending,   setPending]   = useState([])
  const [confirmed, setConfirmed] = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState('')
  const [actioning, setActioning] = useState({}) // { [id]: true }

  // ── Read user name from localStorage ──────────────────
  const user     = JSON.parse(localStorage.getItem('user') || '{}')
  const userName = user.full_name?.split(' ')[0] || 'Admin'

  // ── Fetch dashboard data ───────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await api.get('/dashboard/stats')
      setStats(data.stats)
      setPending(data.pending_bookings   || [])
      setConfirmed(data.confirmed_bookings || [])
    } catch (e) {
      setError(e.message || 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  // ── Update booking status ──────────────────────────────
  const updateStatus = async (id, status) => {
    setActioning(prev => ({ ...prev, [id]: true }))
    try {
      await api.patch(`/dashboard/bookings/${id}/status`, { status })
      // optimistic update
      if (status === 'confirmed') {
        const booking = pending.find(b => b.id === id)
        if (booking) {
          setPending(prev  => prev.filter(b => b.id !== id))
          setConfirmed(prev => [{ ...booking, status: 'confirmed' }, ...prev])
        }
      } else if (status === 'rejected') {
        setPending(prev => prev.filter(b => b.id !== id))
      } else if (status === 'completed') {
        setConfirmed(prev => prev.filter(b => b.id !== id))
      }
    } catch (e) {
      alert(e.message || 'Action failed')
    } finally {
      setActioning(prev => ({ ...prev, [id]: false }))
    }
  }

  // ── Stat cards config ──────────────────────────────────
  const statCards = [
    { label: 'Total Stations', value: stats?.total_stations  ?? '—', icon: <IconStation />, color: 'bg-blue-50 text-blue-500'   },
    { label: 'Total Users',    value: stats?.total_users     ?? '—', icon: <IconUsers />,   color: 'bg-purple-50 text-purple-500'},
    { label: 'Total Bookings', value: stats?.total_bookings  ?? '—', icon: <IconBooking />, color: 'bg-orange-50 text-orange-500'},
    { label: 'Services',       value: 'Unlimited',                   icon: <IconInfinity />,color: 'bg-green-50 text-green-500'  },
  ]

  // ── Loading ────────────────────────────────────────────
  if (loading) return (
    <div className="flex items-center justify-center h-full min-h-[300px]">
      <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="flex-1 p-6 overflow-auto bg-gray-50 rounded-lg">

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Welcome, {userName}! Good to have you onboard.
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Here's what's happening with your stations
          </p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 bg-white hover:bg-gray-50 transition-colors"
        >
          <IconRefresh /> Refresh
        </button>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-500">
          {error}
        </div>
      )}

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {statCards.map(card => (
          <div key={card.label} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">{card.label}</p>
              <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ── Today's Earnings ── */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-5 mb-6 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-sm text-orange-100 mb-1">Today's Earnings</p>
          <p className="text-3xl font-bold text-white">
            PKR {stats?.todays_earnings?.toLocaleString() ?? '0'}
          </p>
          <p className="text-xs text-orange-100 mt-1">
            {stats?.todays_earnings > 0 ? 'From completed bookings today' : 'No bookings completed today'}
          </p>
        </div>
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
          <IconMoney />
        </div>
      </div>

      {/* ── Bookings Grid ── */}
      <div className="grid grid-cols-3 gap-4">

        {/* Pending Bookings — col-span-2 */}
        <div className="col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <p className="text-sm font-semibold text-gray-800">Pending Bookings</p>
              <span className="text-xs bg-red-50 text-red-500 font-medium px-2 py-0.5 rounded-full">
                {pending.length}
              </span>
            </div>
          </div>

          {pending.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-gray-400">
              No pending bookings
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {pending.map(b => (
                <div key={b.id} className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm font-semibold flex-shrink-0">
                      {avatar(b.user_name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-900">{b.user_name || 'Unknown'}</p>
                        <span className="text-sm font-bold text-orange-500">
                          PKR {b.price?.toLocaleString() || '0'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {b.from_location} → {b.to_location}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><IconCalendar /> {b.travel_date}</span>
                        <span className="flex items-center gap-1"><IconClock /> {b.travel_time}</span>
                        {b.car && <span className="flex items-center gap-1"><IconCar /> {b.car}</span>}
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          disabled={actioning[b.id]}
                          onClick={() => updateStatus(b.id, 'confirmed')}
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-600 text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
                        >
                          <IconCheck /> Confirm
                        </button>
                        <button
                          disabled={actioning[b.id]}
                          onClick={() => updateStatus(b.id, 'rejected')}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
                        >
                          <IconX /> Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Confirmed Bookings */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <p className="text-sm font-semibold text-gray-800">Confirmed</p>
              <span className="text-xs bg-green-50 text-green-600 font-medium px-2 py-0.5 rounded-full">
                {confirmed.length}
              </span>
            </div>
          </div>

          {confirmed.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-gray-400">
              No confirmed bookings
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {confirmed.map(b => (
                <div key={b.id} className="px-5 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xs font-semibold flex-shrink-0">
                      {avatar(b.user_name)}
                    </div>
                    <p className="text-sm font-semibold text-gray-900 truncate">{b.user_name || 'Unknown'}</p>
                  </div>
                  <p className="text-xs text-gray-500">{b.from_location} → {b.to_location}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                    <IconCalendar />{b.travel_date}
                    <span className="mx-1">·</span>
                    <IconClock />{b.travel_time}
                  </div>
                  <div className="flex gap-2 mt-2.5">
                    <button
                      disabled={actioning[b.id]}
                      onClick={() => updateStatus(b.id, 'completed')}
                      className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-lg transition-colors disabled:opacity-50"
                    >
                      <IconComplete /> Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Dashboard