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

  constructor() {
    this.init();
  }

  private async init() {
    const { data: { session } } = await supabase.auth.getSession();
    this.user = session?.user ?? null;
    if (this.user) {
      await this.fetchProfile();
    }
    this.loading = false;
    this.notify();

    supabase.auth.onAuthStateChange(async (_event, session) => {
      this.user = session?.user ?? null;
      if (this.user) {
        await this.fetchProfile();
      } else {
        this.profile = null;
      }
      this.notify();
    });
  }

  private async fetchProfile() {
    if (!this.user) return;
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", this.user.id)
      .maybeSingle();
    this.profile = data ?? null;
  }

  // The profile row is normally created by the `handle_new_user` DB trigger.
  // If that trigger is missing on the connected project, create it here so the
  // user has a usable profile (RLS allows inserting your own row).
  private async ensureProfile() {
    if (!this.user) return;
    const userId = this.user.id;
    const email = this.user.email ?? "";
    const username =
      (this.user.user_metadata?.username as string | undefined) ??
      email.split("@")[0] ??
      "player";

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (!data) {
      await supabase.from("profiles").upsert(
        {
          id: userId,
          username,
          display_name: username,
          email,
        },
        { onConflict: "id" }
      );
    }
    await this.fetchProfile();
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

  async signUp(email: string, password: string, username: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });
    if (error) throw error;
    // Supabase only returns a session when email confirmation is disabled.
    // Without a session the account is not authenticated yet, so don't mark
    // the user as signed-in (the profile row is created by a DB trigger).
    const session = data.session;
    if (session) {
      this.user = data.user;
      await this.ensureProfile();
    } else {
      this.user = null;
      this.profile = null;
    }
    this.notify();
    return { session, needsConfirmation: !session, data };
  }

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    this.user = data.user;
    await this.ensureProfile();
    this.notify();
    return data;
  }

  async signInWithUsername(username: string, password: string) {
    const { getProfileByUsername } = await import("../db/profiles.js");
    const profile = await getProfileByUsername(username);
    if (!profile?.email) throw new Error("Invalid username or password");
    return this.signIn(profile.email, password);
  }

  async signOut() {
    await supabase.auth.signOut();
    this.user = null;
    this.profile = null;
    this.notify();
  }

  isLoggedIn() {
    return !!this.user;
  }

  getUserId() {
    return this.user?.id ?? null;
  }
}

export const authService = new AuthService();
