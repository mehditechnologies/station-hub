const BASE_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem('token');

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || `Request failed: ${res.status}`);
  }
  return data;
};

export const api = {
  // ── Generic methods ──────────────────────────────────────
  post: async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  get: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(res);
  },

  put: async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  delete: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(res);
  },

  // ── Auth endpoints ────────────────────────────────────────
  auth: {
    register: (full_name, email, password, phone = '') =>
      api.post('/auth/register', { full_name, email, password, phone }),

    login: (email, password) =>
      api.post('/auth/login', { email, password }),

    forgotPassword: (email) =>
      api.post('/auth/forgot-password', { email }),

    verifyOTP: (email, otp) =>
      api.post('/auth/verify-otp', { email, otp }),

    resetPassword: (email, otp, new_password) =>
      api.post('/auth/reset-password', { email, otp, new_password }),

    changePassword: (old_password, new_password) =>
      api.post('/auth/change-password', { old_password, new_password }),
  },
};