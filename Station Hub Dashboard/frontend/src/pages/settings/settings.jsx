import React, { useState, useEffect } from 'react'
import { api } from '../../api/api'

// ── SVG Icons ──────────────────────────────────────────────
const IconShop = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
  </svg>
)
const IconClock = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
)
const IconSun = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>
  </svg>
)
const IconMoon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
  </svg>
)
const IconLocation = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
)
const IconSave = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
  </svg>
)

// ── Feedback ───────────────────────────────────────────────
const Msg = ({ msg }) => {
  if (!msg) return null
  const isOk = msg.startsWith('ok:')
  return (
    <p className={`text-xs font-medium mt-1 ${isOk ? 'text-green-500' : 'text-red-500'}`}>
      {isOk ? '✓ ' : '✕ '}{msg.slice(3)}
    </p>
  )
}

// ── Sub-components OUTSIDE Settings to prevent re-render focus loss ──
const InputField = ({ label, value, onChange, type = 'text', placeholder = '', mono = false, span2 = false, inp, lbl }) => (
  <div className={span2 ? 'col-span-2' : ''}>
    <label className={`block text-xs font-medium mb-1.5 ${lbl}`}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2 text-sm border rounded-xl outline-none transition-all ${inp} ${mono ? 'font-mono tracking-wide' : ''}`}
    />
  </div>
)

const SelectField = ({ label, value, onChange, options, span2 = false, sel, lbl }) => (
  <div className={span2 ? 'col-span-2' : ''}>
    <label className={`block text-xs font-medium mb-1.5 ${lbl}`}>{label}</label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`w-full px-3 py-2 text-sm border rounded-xl outline-none transition-all ${sel}`}
    >
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>
)

const SaveBtn = ({ onClick, loading: l, label = 'Save Changes' }) => (
  <button onClick={onClick} disabled={l}
    className="text-xs font-semibold bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-5 py-2 rounded-xl transition-all shadow-sm disabled:opacity-60 cursor-pointer flex items-center gap-1.5">
    {l
      ? <><span className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" /> Saving…</>
      : <><IconSave />{label}</>}
  </button>
)

const CardHeader = ({ icon, title, txt, head }) => (
  <div className={`flex items-center gap-2.5 px-5 py-3.5 border-b ${head}`}>
    <span className="text-orange-500">{icon}</span>
    <p className={`text-sm font-semibold ${txt}`}>{title}</p>
  </div>
)

const OPEN_TIMES  = ['07:00','08:00','09:00','10:00','11:00','12:00']
const CLOSE_TIMES = ['15:00','16:00','17:00','18:00','19:00','20:00','21:00']
const BREAK_START = ['12:00','13:00','14:00']
const BREAK_END   = ['13:00','14:00','15:00']
const SLOTS       = ['15 mins','30 mins','1 hour']
const DEFAULT_CATEGORIES = ['Car Wash & Detailing', 'Auto Repair', 'Tyre & Wheel Service', 'Oil & Lube', 'Transport / Bus Station', 'Fuel Station', 'Electric Vehicle Charging', 'Parking', 'Motorcycle Service', 'Truck & Heavy Vehicle']

// ── Main Component ─────────────────────────────────────────
const Settings = () => {

  // ── Theme (controls entire app) ────────────────────────
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  useEffect(() => {
    const root = document.documentElement
    if (dark) { root.classList.add('dark');    localStorage.setItem('theme', 'dark')  }
    else       { root.classList.remove('dark'); localStorage.setItem('theme', 'light') }
  }, [dark])

  const handleThemeToggle = async (val) => {
    setDark(val === 'dark')
    try {
      await api.put('/settings/theme', { theme: val })
    } catch { /* silent — theme still works locally */ }
  }

  // ── Page state ─────────────────────────────────────────
  const [loading, setLoading] = useState(true)

  // Categories from DB
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [newCategory, setNewCategory] = useState('')
  const [catMsg, setCatMsg] = useState('')
  const [catSaving, setCatSaving] = useState(false)

  // Shop Info
  const [shopName,     setShopName]     = useState('')
  const [address,      setAddress]      = useState('')
  const [shopPhone,    setShopPhone]    = useState('')
  const [shopEmail,    setShopEmail]    = useState('')
  const [category,     setCategory]     = useState(DEFAULT_CATEGORIES[0])
  const [description,  setDescription]  = useState('')
  const [latitude,     setLatitude]     = useState(null)
  const [longitude,    setLongitude]    = useState(null)
  const [locMsg,       setLocMsg]       = useState('')
  const [shopMsg,      setShopMsg]      = useState('')
  const [shopSaving,   setShopSaving]   = useState(false)

  // Availability
  const [monFriOpen,   setMonFriOpen]   = useState('09:00')
  const [monFriClose,  setMonFriClose]  = useState('18:00')
  const [satOpen,      setSatOpen]      = useState('10:00')
  const [satClose,     setSatClose]     = useState('17:00')
  const [sunOff,       setSunOff]       = useState(true)
  const [breakStart,   setBreakStart]   = useState('13:00')
  const [breakEnd,     setBreakEnd]     = useState('14:00')
  const [slotDuration, setSlotDuration] = useState('30 mins')
  const [maxBookings,  setMaxBookings]  = useState(10)
  const [availMsg,     setAvailMsg]     = useState('')
  const [availSaving,  setAvailSaving]  = useState(false)

  // ── Fetch settings + categories from DB ───────────────
  useEffect(() => {
    ;(async () => {
      try {
        const [settingsData, catData] = await Promise.all([
          api.get('/settings/'),
          api.get('/settings/categories'),
        ])
        const s = settingsData.settings || {}
        setShopName(s.shop_name      || '')
        setAddress(s.address         || '')
        setShopPhone(s.phone         || '')
        setShopEmail(s.email         || '')
        setCategory(s.category       || DEFAULT_CATEGORIES[0])
        setDescription(s.description || '')
        setLatitude(s.latitude       || null)
        setLongitude(s.longitude     || null)
        setMonFriOpen(s.mon_fri_open   || '09:00')
        setMonFriClose(s.mon_fri_close || '18:00')
        setSatOpen(s.sat_open          || '10:00')
        setSatClose(s.sat_close        || '17:00')
        setSunOff(s.sun_off !== undefined ? s.sun_off : true)
        setBreakStart(s.break_start    || '13:00')
        setBreakEnd(s.break_end        || '14:00')
        setSlotDuration(s.slot_duration || '30 mins')
        setMaxBookings(s.max_bookings   || 10)
        if (s.theme) {
          setDark(s.theme === 'dark')
          localStorage.setItem('theme', s.theme)
          document.documentElement.classList.toggle('dark', s.theme === 'dark')
        }
        if (catData.categories?.length) setCategories(catData.categories)
      } catch { /* use defaults */ }
      finally { setLoading(false) }
    })()
  }, [])

  // ── Get current location ───────────────────────────────
  const getCurrentLocation = () => {
    setLocMsg('Detecting location...')
    if (!navigator.geolocation) {
      setLocMsg('Geolocation not supported by your browser')
      return
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        setLatitude(lat)
        setLongitude(lng)
        // Reverse geocode using OpenStreetMap Nominatim (free, no API key)
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
          const data = await res.json()
          if (data.display_name) {
            setAddress(data.display_name)
            setLocMsg('ok:Location detected')
          } else {
            setAddress(`${lat.toFixed(5)}, ${lng.toFixed(5)}`)
            setLocMsg('ok:Coordinates set')
          }
        } catch {
          setAddress(`${lat.toFixed(5)}, ${lng.toFixed(5)}`)
          setLocMsg('ok:Coordinates set')
        }
      },
      (err) => {
        setLocMsg('Could not get location: ' + err.message)
      },
      { enableHighAccuracy: true }
    )
  }

  // ── Add new category (uses raw fetch with token — same fix as change-password) ──
  const addCategory = async () => {
    if (!newCategory.trim()) return
    setCatSaving(true); setCatMsg('')
    try {
      const token = localStorage.getItem('token')
      const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const res = await fetch(`${BASE_URL}/settings/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newCategory.trim() }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || 'Failed to add category')
      }
      setCategories(prev => [...prev, newCategory.trim()])
      setNewCategory('')
      setCatMsg('ok:Category added')
    } catch (e) { setCatMsg('err:' + (e.message || 'Failed to add category')) }
    finally { setCatSaving(false) }
  }

  // ── Save handlers ──────────────────────────────────────
  const saveShopInfo = async () => {
    setShopSaving(true); setShopMsg('')
    try {
      await api.put('/settings/shop-info', {
        shop_name: shopName, address, phone: shopPhone,
        email: shopEmail, category, description,
        latitude, longitude,
      })
      setShopMsg('ok:Shop information saved')
    } catch (e) { setShopMsg('err:' + (e.message || 'Save failed')) }
    finally { setShopSaving(false) }
  }

  const saveAvailability = async () => {
    setAvailSaving(true); setAvailMsg('')
    try {
      await api.put('/settings/availability', {
        mon_fri_open: monFriOpen, mon_fri_close: monFriClose,
        sat_open: satOpen, sat_close: satClose,
        sun_off: sunOff, break_start: breakStart,
        break_end: breakEnd, slot_duration: slotDuration,
        max_bookings: maxBookings,
      })
      setAvailMsg('ok:Availability saved')
    } catch (e) { setAvailMsg('err:' + (e.message || 'Save failed')) }
    finally { setAvailSaving(false) }
  }

  // ── Theme tokens ───────────────────────────────────────
  const D    = dark
  const bg   = D ? 'bg-[#0f1117]'                  : 'bg-gray-50'
  const card = D ? 'bg-[#1a1d27] border-[#2a2d3e]' : 'bg-white border-gray-100'
  const head = D ? 'border-[#2a2d3e]'               : 'border-gray-100'
  const txt  = D ? 'text-gray-100'                  : 'text-gray-900'
  const sub  = D ? 'text-gray-400'                  : 'text-gray-500'
  const lbl  = D ? 'text-gray-400'                  : 'text-gray-600'
  const inp  = D
    ? 'bg-[#0f1117] border-[#2a2d3e] text-gray-100 focus:border-orange-500'
    : 'bg-white border-gray-200 text-gray-700 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
  const sel  = D
    ? 'bg-[#0f1117] border-[#2a2d3e] text-gray-100 focus:border-orange-500'
    : 'bg-white border-gray-200 text-gray-700 focus:border-orange-400'

  if (loading) return (
    <div className={`flex items-center justify-center h-full min-h-[300px] ${bg}`}>
      <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className={`p-6 min-h-full transition-colors duration-300 ${bg}`}>

      {/* ── Header ── */}
      <div className="mb-6">
        <h1 className={`text-xl font-semibold ${txt}`}>Settings</h1>
        <p className={`text-sm mt-0.5 ${sub}`}>Manage your shop details and preferences</p>
      </div>

      <div className="flex flex-col gap-5 max-w-4xl">

        {/* ══ THEME CARD ══ */}
        <div className={`border rounded-2xl shadow-sm overflow-hidden ${card}`}>
          <CardHeader icon={D ? <IconSun /> : <IconMoon />} title="Appearance" txt={txt} head={head} />
          <div className="p-5">
            <p className={`text-xs font-medium mb-3 ${lbl}`}>App Theme</p>
            <div className="flex items-center gap-3">

              {/* Light */}
              <button onClick={() => handleThemeToggle('light')}
                className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all cursor-pointer ${
                  !dark ? 'border-orange-500 bg-orange-500/10'
                        : D ? 'border-[#2a2d3e] hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'
                }`}>
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm flex-shrink-0">
                  <IconSun />
                </div>
                <div className="text-left">
                  <p className={`text-sm font-semibold ${txt}`}>Light Mode</p>
                  <p className={`text-xs ${sub}`}>Clean white interface</p>
                </div>
                {!dark && <span className="ml-auto w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                </span>}
              </button>

              {/* Dark */}
              <button onClick={() => handleThemeToggle('dark')}
                className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all cursor-pointer ${
                  dark ? 'border-orange-500 bg-orange-500/10'
                       : D ? 'border-[#2a2d3e] hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'
                }`}>
                <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <span className="text-white"><IconMoon /></span>
                </div>
                <div className="text-left">
                  <p className={`text-sm font-semibold ${txt}`}>Dark Mode</p>
                  <p className={`text-xs ${sub}`}>Easy on the eyes</p>
                </div>
                {dark && <span className="ml-auto w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                </span>}
              </button>

            </div>
            <p className={`text-xs mt-3 ${sub}`}>Theme is applied across all pages and saved to your account.</p>
          </div>
        </div>

        {/* ══ SHOP INFO CARD ══ */}
        <div className={`border rounded-2xl shadow-sm overflow-hidden ${card}`}>
          <CardHeader icon={<IconShop />} title="Shop Information" txt={txt} head={head} />
          <div className="p-5">
            <div className="grid grid-cols-2 gap-4">

              {/* Shop Name */}
              <InputField label="Shop Name" value={shopName} onChange={setShopName} placeholder="Your shop name" span2 inp={inp} lbl={lbl} />

              {/* Location / Address */}
              <div className="col-span-2">
                <label className={`block text-xs font-medium mb-1.5 ${lbl}`}>Location / Address</label>
                <div className={`flex items-center gap-2 border rounded-xl px-3 py-2 transition-all ${inp}`}>
                  <span className="text-gray-400 flex-shrink-0"><IconLocation /></span>
                  <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Street, City, Country"
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                  <button
                    onClick={getCurrentLocation}
                    className="text-xs text-orange-500 hover:text-orange-600 font-semibold flex-shrink-0 whitespace-nowrap cursor-pointer"
                  >
                    Use Current
                  </button>
                </div>
                {locMsg && (
                  <p className={`text-xs mt-1 font-medium ${locMsg.startsWith('ok:') ? 'text-green-500' : locMsg === 'Detecting location...' ? 'text-orange-500' : 'text-red-500'}`}>
                    {locMsg.startsWith('ok:') ? '✓ ' : ''}{locMsg.replace('ok:', '')}
                  </p>
                )}
                {latitude && longitude && (
                  <p className={`text-xs mt-0.5 ${sub}`}>
                    📍 {latitude.toFixed(5)}, {longitude.toFixed(5)}
                  </p>
                )}
              </div>

              {/* Phone & Email */}
              <InputField label="Phone Number" value={shopPhone} onChange={setShopPhone} placeholder="+92-300-0000000" inp={inp} lbl={lbl} />
              <InputField label="Email" value={shopEmail} onChange={setShopEmail} placeholder="shop@example.com" type="email" inp={inp} lbl={lbl} />

              {/* Category */}
              <div className="col-span-2">
                <SelectField label="Shop Category" value={category} onChange={setCategory} options={categories} span2 sel={sel} lbl={lbl} />
                {/* Add new category inline */}
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addCategory()}
                    placeholder="Add new category..."
                    className={`flex-1 px-3 py-1.5 text-xs border rounded-lg outline-none transition-all ${inp}`}
                  />
                  <button
                    onClick={addCategory}
                    disabled={catSaving || !newCategory.trim()}
                    className="text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {catSaving ? '...' : '+ Add'}
                  </button>
                </div>
                {catMsg && (
                  <p className={`text-xs mt-1 font-medium ${catMsg.startsWith('ok:') ? 'text-green-500' : 'text-red-500'}`}>
                    {catMsg.startsWith('ok:') ? '✓ ' : '✕ '}{catMsg.slice(3)}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className={`block text-xs font-medium mb-1.5 ${lbl}`}>Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe your shop and services..."
                  className={`w-full px-3 py-2 text-sm border rounded-xl outline-none transition-all resize-none ${inp}`}
                />
              </div>

            </div>
            <Msg msg={shopMsg} />
            <div className={`flex justify-end pt-3 mt-2 border-t ${head}`}>
              <SaveBtn onClick={saveShopInfo} loading={shopSaving} />
            </div>
          </div>
        </div>

        {/* ══ AVAILABILITY CARD ══ */}
        <div className={`border rounded-2xl shadow-sm overflow-hidden ${card}`}>
          <CardHeader icon={<IconClock />} title="Availability" txt={txt} head={head} />
          <div className="p-5 flex flex-col gap-4">

            <p className={`text-xs font-medium ${lbl}`}>Working Hours</p>

            {/* Mon–Fri */}
            <div className="flex items-center gap-2">
              <span className={`text-xs w-24 flex-shrink-0 ${sub}`}>Mon – Fri</span>
              <select value={monFriOpen} onChange={e => setMonFriOpen(e.target.value)}
                className={`flex-1 px-2 py-1.5 text-xs border rounded-lg outline-none ${sel}`}>
                {OPEN_TIMES.map(t => <option key={t}>{t}</option>)}
              </select>
              <span className={`text-xs ${sub}`}>—</span>
              <select value={monFriClose} onChange={e => setMonFriClose(e.target.value)}
                className={`flex-1 px-2 py-1.5 text-xs border rounded-lg outline-none ${sel}`}>
                {CLOSE_TIMES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Saturday */}
            <div className="flex items-center gap-2">
              <span className={`text-xs w-24 flex-shrink-0 ${sub}`}>Saturday</span>
              <select value={satOpen} onChange={e => setSatOpen(e.target.value)}
                className={`flex-1 px-2 py-1.5 text-xs border rounded-lg outline-none ${sel}`}>
                {OPEN_TIMES.map(t => <option key={t}>{t}</option>)}
              </select>
              <span className={`text-xs ${sub}`}>—</span>
              <select value={satClose} onChange={e => setSatClose(e.target.value)}
                className={`flex-1 px-2 py-1.5 text-xs border rounded-lg outline-none ${sel}`}>
                {CLOSE_TIMES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Sunday */}
            <div className="flex items-center gap-2">
              <span className={`text-xs w-24 flex-shrink-0 ${sub}`}>Sunday</span>
              <button
                onClick={() => setSunOff(!sunOff)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  sunOff
                    ? D ? 'bg-[#2a2d3e] text-gray-400 hover:text-red-400' : 'bg-gray-100 text-gray-400 hover:text-red-500'
                    : 'bg-green-500/10 text-green-500 hover:bg-red-50 hover:text-red-500'
                }`}
              >
                {sunOff ? 'OFF — click to open' : 'Open — click to close'}
              </button>
            </div>

            {/* Break */}
            <div className={`pt-3 border-t ${head}`}>
              <p className={`text-xs font-medium mb-2 ${lbl}`}>Break Time</p>
              <div className="flex items-center gap-2">
                <select value={breakStart} onChange={e => setBreakStart(e.target.value)}
                  className={`flex-1 px-2 py-1.5 text-xs border rounded-lg outline-none ${sel}`}>
                  {BREAK_START.map(t => <option key={t}>{t}</option>)}
                </select>
                <span className={`text-xs ${sub}`}>—</span>
                <select value={breakEnd} onChange={e => setBreakEnd(e.target.value)}
                  className={`flex-1 px-2 py-1.5 text-xs border rounded-lg outline-none ${sel}`}>
                  {BREAK_END.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Slot */}
            <div className={`pt-3 border-t ${head}`}>
              <p className={`text-xs font-medium mb-2 ${lbl}`}>Time Slot Duration</p>
              <div className="flex items-center gap-4">
                {SLOTS.map(s => (
                  <label key={s} className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="slot" checked={slotDuration === s}
                      onChange={() => setSlotDuration(s)} className="accent-orange-500" />
                    <span className={`text-xs ${txt}`}>{s}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Max bookings */}
            <div className={`pt-3 border-t ${head}`}>
              <label className={`block text-xs font-medium mb-1.5 ${lbl}`}>Max Bookings Per Day</label>
              <input type="number" value={maxBookings} min={1}
                onChange={e => setMaxBookings(Number(e.target.value))}
                className={`w-28 px-3 py-2 text-sm border rounded-xl outline-none transition-all ${inp}`} />
            </div>

            <Msg msg={availMsg} />
            <div className={`flex justify-end pt-2 border-t ${head}`}>
              <SaveBtn onClick={saveAvailability} loading={availSaving} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Settings