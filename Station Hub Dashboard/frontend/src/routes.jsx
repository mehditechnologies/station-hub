// import { Routes, Route, Navigate } from "react-router-dom";

// import Auth from "./pages/LoginPage";
// import HomeLayout from "./pages/Home";
// import Dashboard from "./pages/DashBoard";
// import Profile from "./pages/profile";
// import Settings from "./pages/settings";
// import Serv from "./pages/services";
// import Signup from "./pages/SignupPage";

// function AppRoutes() {
//   return (
//     <Routes>
//       {/* Auth route (outside layout) */}
//       <Route path="/login" element={<Auth />} />
//       <Route path="/signup" element={<Signup />} />

//       {/* Main layout routes */}
//       <Route path="/" element={<HomeLayout />}>
        
//         {/* default route → dashboard */}
//         <Route index element={<Navigate to="/dashboard" />} />

//         <Route path="dashboard" element={<Dashboard />} />
//         <Route path="services" element={<Serv />} />
//         <Route path="profile" element={<Profile />} />
//         <Route path="settings" element={<Settings />} />

//       </Route>

//       {/* fallback */}
//       <Route path="*" element={<Navigate to="/dashboard" />} />
//     </Routes>
//   );
// }

// export default AppRoutes;


import { Routes, Route, Navigate } from "react-router-dom";

import Auth from "./pages/LoginPage";
import HomeLayout from "./pages/Home";
import Dashboard from "./pages/DashBoard";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import Serv from "./pages/services";
import Signup from "./pages/SignupPage";

import ProtectedRoute from "./protectedRoutes";

function AppRoutes() {

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};


  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomeLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="services" element={<Serv />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default AppRoutes;