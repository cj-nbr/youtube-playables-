const API_BASE = import.meta.env.PUBLIC_API_URL || "http://localhost:4000";

async function request(path: string, body: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || "Request failed");
  }
  return data.data;
}

export async function login(login: string, secretCode: string) {
  return request("/api/v1/auth/login", { login, secretCode });
}

export async function register(fullName: string, email: string, phone: string, secretCode: string) {
  return request("/api/v1/auth/register", { fullName, email, phone, secretCode });
}

export async function logout() {
  const token = localStorage.getItem("session_token");
  if (token) {
    await fetch(`${API_BASE}/api/v1/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  localStorage.removeItem("session_token");
}