import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});

// ✅ attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // make sure headers exists
  config.headers = config.headers || {};

  if (token && token !== "undefined" && token !== "null") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // ✅ prevent browser cache (important for GET products)
  config.headers["Cache-Control"] = "no-cache";
  config.headers.Pragma = "no-cache";

  // Optional: add timestamp to force fresh response
  if (config.method?.toLowerCase() === "get") {
    config.params = { ...(config.params || {}), _t: Date.now() };
  }

  return config;
});

export default api;