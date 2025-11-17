const BASE_URL = import.meta.env.VITE_BACKEND_URL || "";

async function request(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    const message = (data && (data.detail || data.message)) || res.statusText;
    throw new Error(message);
  }
  return data;
}

export const api = {
  // Auth
  register: (payload) => request("/auth/register", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  me: (token) => request("/auth/me", { token }),
  updateMe: (token, payload) => request("/auth/me", { method: "PUT", body: payload, token }),
  logout: (token) => request("/auth/logout", { method: "POST", token }),

  // Appliances
  listAppliances: (token) => request("/appliances", { token }),
  createAppliance: (token, payload) => request("/appliances", { method: "POST", body: payload, token }),
  updateAppliance: (token, id, payload) => request(`/appliances/${id}`, { method: "PUT", body: payload, token }),
  deleteAppliance: (token, id) => request(`/appliances/${id}`, { method: "DELETE", token }),
  toggleAppliance: (token, id) => request(`/control/toggle/${id}`, { method: "POST", token }),
  setAppliance: (token, id, payload) => request(`/control/set/${id}`, { method: "POST", body: payload, token }),

  // Energy
  realtime: (token) => request("/energy/realtime", { token }),
  summary: (token, period = "day") => request(`/energy/summary?period=${encodeURIComponent(period)}`, { token }),
  energyWindow: (token, start, end) => request(`/energy?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`, { token }),

  // Forecast
  forecast: (token, horizon_hours = 24) => request("/forecast", { method: "POST", body: { horizon_hours }, token }),
};
