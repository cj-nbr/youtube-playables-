import { supabase } from "../database/connection.js";
import { userRepository } from "../repositories/userRepository.js";
import { profileRepository } from "../repositories/profileRepository.js";
import { AppError } from "../errors/index.js";

// Authentication is delegated to Supabase Auth. The server uses the
// service-role client to administer users and the anon client (via
// verifyToken in the auth middleware) to validate sessions.

export const authService = {
  async register({ username, email, password }) {
    if (await userRepository.usernameExists(username)) {
      throw AppError.conflict("Username already taken");
    }
    if (await userRepository.emailExists(email)) {
      throw AppError.conflict("Email already registered");
    }

    const { data: created, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // auto-confirm so players can sign in immediately
      user_metadata: { username, display_name: username },
    });
    if (error) {
      throw AppError.conflict(error.message || "Unable to create account");
    }
    if (!created?.user) {
      throw AppError.internal("Account creation did not return a user");
    }

    const userId = created.user.id;
    const profile = await profileRepository.upsert(userId, {
      username,
      email,
      role: "user",
      status: "active",
      email_verified: true,
    });

    const { data: session, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError || !session?.session) {
      // Account exists but we couldn't start a session; still return the profile.
      return { user: this.sanitize(profile), token: null, expiresIn: 0 };
    }

    return {
      user: this.sanitize(profile),
      token: session.session.access_token,
      expiresIn: session.session.expires_in,
    };
  },

  async login({ login, password }) {
    let result = await supabase.auth.signInWithPassword({ email: login, password });

    if (result.error) {
      // `login` may be a username — resolve it to the registered email.
      const profile = await userRepository.findByUsername(login);
      if (!profile?.email) throw AppError.unauthorized("Invalid credentials");
      result = await supabase.auth.signInWithPassword({ email: profile.email, password });
    }

    if (result.error || !result.data?.session) {
      throw AppError.unauthorized("Invalid credentials");
    }

    const authUser = result.data.user;
    const profile = await userRepository.findById(authUser.id);
    if (profile?.status === "suspended") throw AppError.forbidden("Account suspended");
    if (profile?.status === "deleted") throw AppError.unauthorized("Account not found");

    await userRepository.updateLastLogin(authUser.id);

    return {
      user: this.sanitize(profile),
      token: result.data.session.access_token,
      expiresIn: result.data.session.expires_in,
    };
  },

  // Revoke all of the user's Supabase sessions (true server-side logout).
  async logout(userId) {
    if (!userId) return;
    const { error } = await supabase.auth.admin.signOut({ userId });
    if (error) throw AppError.internal(error.message);
  },

  async me(userId) {
    const profile = await userRepository.findById(userId);
    if (!profile) throw AppError.unauthorized("User not found");
    return this.sanitize(profile);
  },

  sanitize(profile) {
    // The profile table holds no secrets (passwords live in Supabase Auth),
    // so it can be returned as-is.
    return profile;
  },
};

export default authService;
