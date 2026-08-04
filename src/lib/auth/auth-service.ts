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
    this.init();
  }

  private async init() {
    const token = this.getToken();
    this.user = null;
    this.profile = null;
    this.loading = true;
    
    if (token) {
      try {
        const response = await fetch(`${PUBLIC_API_URL}/api/v1/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            this.user = data.data;
          }
        }
      } catch (err) {
        console.error("Failed to fetch user on init:", err);
      }
    }
    
    this.loading = false;
    this.notify();
    
    if (typeof window !== "undefined") {
      window.addEventListener("storage", (e) => {
        if (e.key === "session_token") {
          this.init();
        }
      });
    }
  }

  private getToken(): string | null {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("session_token");
    }
    return null;
  }

  private notify() {
    const state: AuthState = {
      user: this.user,
      profile: this.profile,
      loading: this.loading,
    };
    this.listeners.forEach((fn) => fn(state));
  }

  subscribe(listener: AuthListener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getState(): AuthState {
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
    this.setToken(token);
    this.user = data.data.user;
    await this.fetchProfile();
    this.notify();
    
    return { session: { access_token: token }, needsConfirmation: false, data: data.data };
  }

  async signIn(login: string, secretCode: string) {
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
    this.setToken(token);
    this.user = data.data.user;
    await this.fetchProfile();
    this.notify();
    
    return data.data;
  }

  async signOut() {
    this.removeToken();
    this.user = null;
    this.profile = null;
    this.notify();
  }

  async fetchProfile() {
    if (!this.user) return;
    try {
      const token = this.getToken();
      const response = await fetch(`${PUBLIC_API_URL}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          this.profile = data.data;
        }
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  }

  async updateProfile(fields: any) {
    const token = this.getToken();
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
    const token = this.getToken();
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
    const token = this.getToken();
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
    
    this.setToken(data.data.token);
    this.user = data.data.user;
    await this.fetchProfile();
    this.notify();
    
    return data.data;
  }

  private setToken(token: string) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("session_token", token);
    }
  }

  private removeToken() {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("session_token");
    }
  }
}

export const authService = new AuthService();