 
import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import BGImage from "../../assets/WebLandingPage2.png";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
 
const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  const navigate = useNavigate();
 
  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms of Service");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await api.auth.register(`${firstName} ${lastName}`, email, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setSuccess("Account created successfully!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setError(data.detail || "Signup failed");
      }
    } catch {
      setError("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div
      className="min-h-screen flex items-center justify-center p-8 relative bg-cover bg-center"
      style={{ backgroundImage: `url(${BGImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />
 
      {/* Card */}
      <div className="relative z-10 bg-white rounded-2xl p-8 w-full max-w-sm shadow-[0_8px_40px_rgba(0,0,0,0.18)]">
 
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="Station Hub Logo" className="w-[160px] h-[160px] object-contain mb-0" />
          <h1 className="text-[22px] font-bold text-black mb-1">Create Account</h1>
          <p className="text-xs text-gray-500 text-center">Start your journey with Station Hub</p>
        </div>
 
        {/* Error / Success */}
        {error && (
          <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-500 text-sm text-center">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-4 px-4 py-2.5 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm text-center">{success}</p>
          </div>
        )}
 
        {/* First + Last Name */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div>
            <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">First Name</label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 h-10 bg-gray-50">
              <span className="text-sm text-gray-400">👤</span>
              <input
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              />
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">Last Name</label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 h-10 bg-gray-50">
              <span className="text-sm text-gray-400">👤</span>
              <input
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              />
            </div>
          </div>
        </div>
 
        {/* Email */}
        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">Email Address</label>
          <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 h-10 bg-gray-50">
            <span className="text-sm text-gray-400">✉️</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
            />
          </div>
        </div>
 
        {/* Password */}
        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">Password</label>
          <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 h-10 bg-gray-50">
            <span className="text-sm text-gray-400">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 text-sm">
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
 
        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">Confirm Password</label>
          <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 h-10 bg-gray-50">
            <span className="text-sm text-gray-400">🔒</span>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 text-sm">
              {showConfirm ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
 
        {/* Terms */}
        <div className="flex items-start gap-2 mb-5">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="w-3.5 h-3.5 mt-0.5 accent-orange-500 flex-shrink-0"
          />
          <p className="text-xs text-gray-500 leading-5">
            I agree to the{" "}
            <a href="/terms" className="text-orange-500 font-semibold">Terms of Service</a>{" "}
            and{" "}
            <a href="/privacy" className="text-orange-500 font-semibold">Privacy Policy</a>
          </p>
        </div>
 
        {/* Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full h-10 bg-orange-500 text-white rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 mb-5 disabled:opacity-70"
        >
          {loading ? "Creating Account..." : "Create Account →"}
        </button>
 
        {/* Divider */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">Or sign up with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
 
        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-2.5 mb-6">
          <button className="h-9 border border-gray-300 rounded-xl bg-white flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-700">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button className="h-9 border border-gray-300 rounded-xl bg-white flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-700">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </button>
        </div>
 
        {/* Footer */}
        <p className="text-center text-xs text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-orange-500 font-semibold">Sign in</a>
        </p>
      </div>
    </div>
  );
};
 
export default SignupPage;