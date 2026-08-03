import { supabase } from "../supabase/client.js";
import { PUBLIC_API_URL } from "../supabase/env";

export interface AuthState {
  user: any | null;
  profile: any | null;
  loading: boolean;
}

type AuthListener = (state: AuthState) => void;

class AuthService {
  private user: any | null = null;
  private profile: any | null = null;
  private loading = true;
  private listeners: Set<AuthListener> = new Set();

  constructor() {
    console.log("[AuthService] Initializing...");
    this.init();
  }

  private async init() {
    console.log("[AuthService] Initializing auth state");
    const token = localStorage.getItem("session_token");
    this.user = null;
    this.profile = null;
    this.loading = true;
    
    if (token) {
      console.log("[AuthService] Found session token");
      try {
        const response = await fetch(`${PUBLIC_API_URL}/api/v1/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(`[AuthService] /me response status: ${response.status}`);
        if (response.ok) {
          const data = await response.json();
          console.log("[AuthService] /me data:", data);
          if (data.success) {
            this.user = data.data;
            console.log("[AuthService] User set:", this.user);
          }
        }
      } catch (err) {
        console.error("[AuthService] Failed to fetch user on init:", err);
      }
    } else {
      console.log("[AuthService] No session token found");
    }
    
    this.loading = false;
    console.log("[AuthService] Notifying initial state");
    this.notify();
    
    // Listen for storage changes
    window.addEventListener("storage", (e) => {
      console.log("[AuthService] Storage change detected:", e);
      if (e.key === "session_token") {
        this.init();
      }
    });
  }

  private notify() {
    const state: AuthState = {
      user: this.user,
      profile: this.profile,
      loading: this.loading,
    };
    console.log("[AuthService] Notifying state change:", state);
    this.listeners.forEach((fn) => fn(state));
  }

  subscribe(listener: AuthListener) {
    console.log("[AuthService] New subscriber added");
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getState(): AuthState {
    console.log("[AuthService] getState called");
    return {
      user: this.user,
      profile: this.profile,
      loading: this.loading,
    };
  }

  isLoggedIn() {
    return !!this.user;
  }

  getUserId() {
    return this.user?.id ?? null;
  }

  async signUp(fullName: string, email: string, phone: string, secretCode: string) {
    console.log("[AuthService] Signing up...");
    const response = await fetch(`${PUBLIC_API_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, phone, secretCode }),
    });
    
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Sign up failed");
    }
    
    const { token } = data.data;
    localStorage.setItem("session_token", token);
    this.user = data.data.user;
    await this.fetchProfile();
    this.notify();
    
    return { session: { access_token: token }, needsConfirmation: false, data: data.data };
  }

  async signIn(login: string, secretCode: string) {
    console.log("[AuthService] Signing in...");
    const response = await fetch(`${PUBLIC_API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, secretCode }),
    });
    
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Login failed");
    }
    
    const { token } = data.data;
    localStorage.setItem("session_token", token);
    this.user = data.data.user;
    await this.fetchProfile();
    this.notify();
    
    return data.data;
  }

  async signOut() {
    console.log("[AuthService] Signing out");
    localStorage.removeItem("session_token");
    this.user = null;
    this.profile = null;
    this.notify();
  }

  async fetchProfile() {
    if (!this.user) {
      console.log("[AuthService] fetchProfile: no user");
      return;
    }
    console.log("[AuthService] Fetching profile for user:", this.user.id);
    try {
      const token = localStorage.getItem("session_token");
      const response = await fetch(`${PUBLIC_API_URL}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          this.profile = data.data;
          console.log("[AuthService] Profile fetched:", this.profile);
        }
      }
    } catch (err) {
      console.error("[AuthService] Failed to fetch profile:", err);
    }
  }

  async updateProfile(fields: any) {
    const token = localStorage.getItem("session_token");
    if (!token) throw new Error("Not logged in");
    
    const response = await fetch(`${PUBLIC_API_URL}/api/v1/auth/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fields),
    });
    
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Profile update failed");
    }
    
    this.user = data.data;
    await this.fetchProfile();
    this.notify();
    
    return data.data;
  }

  async changeSecretCode(currentCode: string, newCode: string) {
    const token = localStorage.getItem("session_token");
    if (!token) throw new Error("Not logged in");
    
    const response = await fetch(`${PUBLIC_API_URL}/api/v1/auth/change-secret-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ current_code: currentCode, new_code: newCode }),
    });
    
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to change secret code");
    }
    
    return data.data;
  }

  async refreshSession() {
    const token = localStorage.getItem("session_token");
    if (!token) throw new Error("No session to refresh");
    
    const response = await fetch(`${PUBLIC_API_URL}/api/v1/auth/refresh-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to refresh session");
    }
    
    localStorage.setItem("session_token", data.data.token);
    this.user = data.data.user;
    await this.fetchProfile();
    this.notify();
    
    return data.data;
  }
}

export const authService = new AuthService();