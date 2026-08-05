import { supabase } from "../supabase/client.js";

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
  private sessionCheckPromise: Promise<void> | null = null;

  constructor() {
    this.init();
  }

  private async init() {
    this.loading = true;
    this.notify();

    if (typeof window === "undefined") {
      this.loading = false;
      this.notify();
      return;
    }

    if (this.sessionCheckPromise) {
      await this.sessionCheckPromise;
      return;
    }

    this.sessionCheckPromise = this.restoreSession();
    await this.sessionCheckPromise;
  }

  private async restoreSession() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        this.user = {
          id: session.user.id,
          email: session.user.email,
          phone: session.user.phone,
          ...session.user.user_metadata,
        };
        await this.fetchProfile();
      } else {
        this.user = null;
        this.profile = null;
      }
    } catch (err) {
      console.error("Failed to restore session:", err);
      this.user = null;
      this.profile = null;
    } finally {
      this.loading = false;
      this.notify();

      if (typeof window !== "undefined") {
        window.addEventListener("storage", (e) => {
          if (e.key === "supabase.auth.token") {
            this.init();
          }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session?.user) {
            this.user = {
              id: session.user.id,
              email: session.user.email,
              phone: session.user.phone,
              ...session.user.user_metadata,
            };
            this.fetchProfile();
          } else {
            this.user = null;
            this.profile = null;
          }
          this.loading = false;
          this.notify();
        });

        if (subscription) {
          (this as any)._unsubscribe = subscription.unsubscribe;
        }
      }
    }
  }

  subscribe(listener: AuthListener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    const state: AuthState = {
      user: this.user,
      profile: this.profile,
      loading: this.loading,
    };
    this.listeners.forEach((fn) => fn(state));
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
    if (!email && !phone) {
      throw new Error("Email or phone number is required");
    }

    const loginIdentifier = email || phone;

    const { data, error } = await supabase.auth.signUp({
      email: email || undefined,
      phone: phone || undefined,
      password: secretCode,
      options: {
        data: {
          full_name: fullName,
          display_name: fullName,
        },
      },
    });

    if (error) {
      throw new Error(error.message || "Sign up failed");
    }

    if (data.user) {
      this.user = {
        id: data.user.id,
        email: data.user.email,
        phone: data.user.phone,
        full_name: fullName,
        display_name: fullName,
      };

      const { data: uniqueCodeData } = await supabase.rpc("generate_unique_user_code");

      const { error: userError } = await supabase
        .from("users")
        .insert({
          id: data.user.id,
          full_name: fullName,
          email: email || null,
          phone: phone || null,
          unique_user_code: uniqueCodeData || null,
        });

      if (userError) {
        console.error("Failed to create user record:", userError);
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: data.user.id,
          username: loginIdentifier,
          display_name: fullName,
          email: email || null,
          phone: phone || null,
          full_name: fullName,
          code: secretCode,
        });

      if (profileError) {
        console.error("Failed to create profile:", profileError);
      }

      await this.fetchProfile();
      this.notify();
    }

    return {
      session: data.session,
      needsConfirmation: !data.session,
      data,
    };
  }

  async signIn(login: string, secretCode: string) {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: login,
      password: secretCode,
    });

    if (error && !login.includes("@")) {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("email")
        .eq("phone", login)
        .maybeSingle();

      if (profileData?.email) {
        const retry = await supabase.auth.signInWithPassword({
          email: profileData.email,
          password: secretCode,
        });
        data = retry.data;
        error = retry.error;
      }
    }

    if (error) {
      throw new Error(error.message || "Login failed");
    }

    if (data.user) {
      this.user = {
        id: data.user.id,
        email: data.user.email,
        phone: data.user.phone,
        ...data.user.user_metadata,
      };
      await this.fetchProfile();
      this.notify();
    }

    return data;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error);
    }
    this.user = null;
    this.profile = null;
    this.notify();
  }

  async fetchProfile() {
    if (!this.user) return;
    try {
      const [profileResult, userResult] = await Promise.all([
        supabase
          .from("profiles")
          .select("*")
          .eq("id", this.user.id)
          .maybeSingle(),
        supabase
          .from("users")
          .select("id, full_name, email, phone, avatar_url, avatar_color, unique_user_code, games_played, total_play_time, highest_score, achievements_count, player_rank, current_level, status, created_at, updated_at, last_login, coins, experience")
          .eq("id", this.user.id)
          .maybeSingle(),
      ]);

      if (profileResult.error) {
        console.error("Failed to fetch profile:", profileResult.error);
      }

      if (userResult.error) {
        console.error("Failed to fetch user:", userResult.error);
      }

      this.profile = profileResult.data;
      this.user = {
        ...this.user,
        ...userResult.data,
        ...profileResult.data,
      };
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  }

  async updateProfile(fields: any) {
    if (!this.user) throw new Error("Not logged in");

    const allowedFields: Record<string, any> = {};
    const allowedKeys = ["full_name", "display_name", "email", "phone", "avatar_url", "avatar_color", "bio", "location"];
    
    for (const key of allowedKeys) {
      if (fields[key] !== undefined) {
        allowedFields[key] = fields[key];
      }
    }

    if (Object.keys(allowedFields).length === 0) {
      throw new Error("No fields provided");
    }

    const { data, error } = await supabase
      .from("profiles")
      .upsert({ id: this.user.id, ...allowedFields, updated_at: new Date().toISOString() })
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message || "Profile update failed");
    }

    this.profile = data;
    this.notify();

    return data;
  }

  async changeSecretCode(currentCode: string, newCode: string) {
    if (!this.user) throw new Error("Not logged in");

    const { error } = await supabase.auth.updateUser({
      password: newCode,
    });

    if (error) {
      throw new Error(error.message || "Failed to change secret code");
    }

    return { success: true };
  }

  async refreshSession() {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) {
      throw new Error(error.message || "Failed to refresh session");
    }
    return data;
  }
}

export const authService = new AuthService();
