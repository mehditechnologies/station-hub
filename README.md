<div align="center">

# 🚉 Station Hub

### Find stations, book your seat, and travel smarter — all in one place.

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Firebase](https://img.shields.io/badge/Database-Firebase-FFCA28?logo=firebase&logoColor=white)](https://firebase.google.com/)
[![Expo](https://img.shields.io/badge/Mobile-Expo-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![React](https://img.shields.io/badge/Dashboard-React%20%2B%20Vite-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue)](#license)

</div>

---

## 📖 About

**Station Hub** is a full-stack travel and booking platform that connects passengers with nearby travel stations. Users can browse stations, view available services, book seats for a trip, and manage their bookings — all through a clean mobile app. Station and booking data is managed through a dedicated admin dashboard.

The project is made up of three parts:

| Component | Description |
|---|---|
| 📱 **Station Hub App** | Passenger-facing mobile app (React Native + Expo) |
| 🖥️ **Station Hub Dashboard** | Admin panel for managing stations, services, and bookings (React + Vite) |
| ⚙️ **Backend API** | FastAPI service backed by Firebase, shared by both apps |

---

## ✨ Features

### 📱 Mobile App
- 🔐 **Authentication** — Secure sign up / login with JWT-based sessions
- 📍 **Location-Based Discovery** — Find nearby stations using device location
- 🚏 **Station Browsing** — View station details, amenities, and available services
- 🎫 **Seat Booking** — Book seats for a trip with from/to location, date, time, and seat count
- 🌗 **Onboarding & Splash Flow** — Smooth first-launch experience
- 👤 **Profile Management** — Manage personal info and settings
- 🗺️ **Set/Choose Location** — Pick a custom location for more relevant station results

### 🖥️ Admin Dashboard
- 📊 **Dashboard Overview** — At-a-glance stats on stations, services, and bookings
- 🚉 **Station Management** — Add, edit, and manage station listings
- 🧾 **Booking Management** — View and manage passenger bookings
- 🌙 **Dark Mode** — Full dark/light theme support across navbar and sidebar
- 🔐 **Protected Routes** — Authenticated access to admin-only pages

### ⚙️ Backend API
- FastAPI REST API with modular routers for auth, stations, bookings, services, profile, settings, and dashboard
- Firebase Admin SDK for data storage and auth verification
- JWT-based authentication middleware
- Password hashing via `passlib`/`bcrypt`

---

## 🛠️ Tech Stack

| Layer            | Technology |
|-------------------|------------|
| Mobile App        | React Native, Expo, Expo Router |
| Admin Dashboard    | React 19, Vite, Tailwind CSS, Framer Motion |
| Backend            | FastAPI, Python |
| Database / Auth    | Firebase (Admin SDK) |
| Auth (API)         | JWT (python-jose), bcrypt password hashing |

---

## 📂 Project Structure

```
Station Hub/
├── Station Hub App/              # Mobile app
│   ├── Frontend/                 # Expo + React Native app
│   │   ├── app/                  # Screens: auth, tabs, onboarding, splash
│   │   ├── components/           # Reusable UI components
│   │   └── constants/            # Theme & config
│   └── Backend/                  # FastAPI backend
│       ├── routes/               # auth, stations, bookings, services, dashboard, profile, settings
│       ├── models/               # Station, Booking, User models
│       ├── services/             # Business logic per route
│       ├── schemas/              # Pydantic request/response schemas
│       └── middleware/           # Auth middleware
└── Station Hub Dashboard/        # Admin dashboard
    └── frontend/                 # React + Vite admin panel
        ├── src/pages/            # Dashboard pages
        ├── src/components/       # UI components
        └── src/context/          # App-wide context (e.g. theme)
```

---

## 🚀 Getting Started

### 1. Backend (FastAPI)

```bash
cd "Station Hub App/Backend"
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
```

Add your Firebase service account credentials and environment variables (see `.env`), then run:

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

### 2. Mobile App (Expo)

```bash
cd "Station Hub App/Frontend"
npm install
npx expo start
```

### 3. Admin Dashboard (React + Vite)

```bash
cd "Station Hub Dashboard/frontend"
npm install
npm run dev
```

---

## 🔐 Security Notes

- Sensitive files such as `serviceAccountKey.json`, `.env`, and `google-services.json` should **never** be committed to version control. These are excluded via `.gitignore`.
- If a credential is ever accidentally committed, rotate/revoke the key immediately and scrub it from git history (e.g. using `git filter-repo`).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check.

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">🚉 Built for smarter, simpler travel booking for necessities of life 🚉</p>
