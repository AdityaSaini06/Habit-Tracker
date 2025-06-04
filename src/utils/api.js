
const BASE_URL = import.meta.env.VITE_BASE_URL;

const getToken = () => localStorage.getItem("token");

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// fetch wrapper

const api = {
  get: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  post: async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  put: async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  delete: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return res.json();
  },
};

export default api;
