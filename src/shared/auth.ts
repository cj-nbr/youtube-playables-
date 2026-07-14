// Thin client for the YOUTUBE PLAYABLES auth API.
//
// The backend issues a Supabase JWT on login/register. We keep that token in
// localStorage and send it as a Bearer header on every request. (The backend
// also drops a SameSite=lax cookie, but a cookie is not sent back on
// cross-origin fetch() calls, so the Bearer token is the reliable session.)

export interface AuthUser {
  id: string;
  username: string;
  email?: string;
  display_name?: string;
  role?: string;
  status?: string;
  [key: string]: unknown;
}

export interface Session {
  token: string;
  user: AuthUser;
  expiresIn: number;
}

export interface ApiError extends Error {
  status: number;
}

// In dev the Astro site is proxied to the API on the same origin (see
// astro.config.mjs), so API_BASE defaults to "" and requests use the
// relative `/api/v1/...` paths. For a production deployment on a separate
// domain, set PUBLIC_API_URL to the backend origin (e.g. https://api.example.com).
const API_BASE: string = import.meta.env.PUBLIC_API_URL ?? "";

const SESSION_KEY = "ytp:session";

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function setSession(session: Session): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    /* storage may be unavailable (private mode) — fail silently */
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

interface ApiOptions extends RequestInit {
  auth?: boolean;
}

/** Fetch against the API, attaching the bearer token and parsing JSON. */
export async function apiFetch<T = unknown>(
  path: string,
  options: ApiOptions = {}
): Promise<T> {
  const { auth = true, headers, ...rest } = options;
  const session = getSession();

  const res = await fetch(`${API_BASE}${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(auth && session ? { Authorization: `Bearer ${session.token}` } : {}),
      ...(headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      (data as { message?: string }).message || `Request failed (${res.status})`;
    const err = new Error(message) as ApiError;
    err.status = res.status;
    throw err;
  }
  return data as T;
}

interface AuthResponse {
  success: boolean;
  data: Session;
}

export async function login(login: string, password: string): Promise<Session> {
  const data = await apiFetch<AuthResponse>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ login, password }),
    auth: false,
  });
  setSession(data.data);
  return data.data;
}

export async function register(
  username: string,
  email: string,
  password: string
): Promise<Session> {
  const data = await apiFetch<AuthResponse>("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    auth: false,
  });
  if (data.data?.token) setSession(data.data);
  return data.data;
}

export async function fetchMe(): Promise<AuthUser | null> {
  const session = getSession();
  if (!session) return null;
  try {
    const data = await apiFetch<{ success: boolean; data: AuthUser }>(
      "/api/v1/auth/me"
    );
    // Keep the cached user fresh (e.g. username changes).
    setSession({ ...session, user: data.data });
    return data.data;
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  const session = getSession();
  if (session) {
    try {
      await apiFetch("/api/v1/auth/logout", { method: "POST" });
    } catch {
      /* best-effort — still clear local session below */
    }
  }
  clearSession();
}

export const api = { base: API_BASE, fetch: apiFetch };
