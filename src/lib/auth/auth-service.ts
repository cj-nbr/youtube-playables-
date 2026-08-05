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
      console.log("[Auth] restoreSession got session:", session?.user ? "yes" : "no");
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
      console.error("[Auth] Failed to restore session:", err);
      this.user = null;
      this.profile = null;
    } finally {
      this.loading = false;
      this.notify();

      if (typeof window !== "undefined") {
        if ((this as any)._unsubscribe) {
          (this as any)._unsubscribe();
        }

        window.addEventListener("storage", (e) => {
          if (e.key === "supabase.auth.token") {
            console.log("[Auth] Storage event, re-initializing");
            this.sessionCheckPromise = null;
            this.init();
          }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          console.log("[Auth] onAuthStateChange:", event, session?.user ? "user" : "no user");
          if (event === "SIGNED_OUT") {
            this.user = null;
            this.profile = null;
          } else if (session?.user) {
            this.user = {
              id: session.user.id,
              email: session.user.email,
              phone: session.user.phone,
              ...session.user.user_metadata,
            };
            this.fetchProfile();
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
          code: secretCode,
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
      const [profileResult, userResult, achievementsResult] = await Promise.all([
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
        supabase
          .from("achievements")
          .select("id, code, name, description, tier, reward, unlocked_at, progress, created_at, user_id")
          .eq("user_id", this.user.id)
          .order("earned_at", { ascending: false }),
      ]);

      if (profileResult.error) {
        console.error("Failed to fetch profile:", profileResult.error);
      }

      if (userResult.error) {
        console.error("Failed to fetch user:", userResult.error);
      }

      if (achievementsResult.error) {
        console.error("Failed to fetch achievements:", achievementsResult.error);
      }

      this.profile = profileResult.data;
      const userDbData = userResult.data || {};
      const profileData = profileResult.data || {};
      
      this.user = {
        ...this.user,
        ...userDbData,
        ...profileData,
        achievements: achievementsResult.data || [],
      };
      
      if (!this.user.email && userDbData.phone) {
        this.user.email = this.user.email || null;
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  }

  async updateProfile(fields: any) {
    if (!this.user) throw new Error("Not logged in");

    const profileFields: Record<string, any> = {};
    const profileKeys = ["display_name", "email", "phone", "avatar_url", "avatar_color", "bio", "location", "code"];
    
    for (const key of profileKeys) {
      if (fields[key] !== undefined) {
        profileFields[key] = fields[key];
      }
    }

    if (Object.keys(profileFields).length === 0 && !fields.full_name) {
      throw new Error("No fields provided");
    }

    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id, username, display_name, email")
      .eq("id", this.user.id)
      .maybeSingle();

    let profileData;
    let profileError;

    const ensureString = (val: any, fallback: string) => {
      if (typeof val === "string" && val.trim() !== "") return val.trim();
      return fallback;
    };

    const generatedUsername = ensureString(
      this.user.email?.includes("@") ? this.user.email.split("@")[0] : this.user.phone || this.user.id,
      "user_" + String(this.user.id || "").slice(0, 8)
    );

    const generatedDisplayName = ensureString(
      fields.full_name || this.user.full_name || this.user.name || this.user.phone,
      generatedUsername
    );

    if (!existingProfile) {
      const result = await supabase
        .from("profiles")
        .insert({
          id: this.user.id,
          username: generatedUsername,
          display_name: generatedDisplayName,
          email: this.user.email || null,
          phone: this.user.phone || null,
          ...profileFields,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select("*")
        .single();
      
      profileData = result.data;
      profileError = result.error;
    } else {
      const result = await supabase
        .from("profiles")
        .upsert({ 
          id: this.user.id, 
          username: generatedUsername,
          display_name: generatedDisplayName,
          ...profileFields, 
          updated_at: new Date().toISOString() 
        }, {
          onConflict: "id",
        })
        .select("*")
        .single();
      
      profileData = result.data;
      profileError = result.error;
    }

    if (profileError) {
      console.error("Profile update error:", profileError);
      throw new Error(profileError.message || "Profile update failed");
    }

    if (fields.full_name !== undefined) {
      const { error: userError } = await supabase
        .from("users")
        .update({ full_name: fields.full_name, updated_at: new Date().toISOString() })
        .eq("id", this.user.id);

      if (userError) {
        console.error("Failed to update users table:", userError);
      }
    }

    this.profile = profileData;
    this.notify();

    return profileData;
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
