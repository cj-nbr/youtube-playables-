import { supabase } from "../database/connection.js";
import { userRepository } from "../repositories/userRepository.js";
import { profileRepository } from "../repositories/profileRepository.js";
import { sessionRepository } from "../repositories/sessionRepository.js";
import { AppError } from "../errors/index.js";
import crypto from "crypto";

const TOKEN_BYTES = 32;
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function generateToken() {
  return crypto.randomBytes(TOKEN_BYTES).toString("hex");
}

function expiresAt() {
  return new Date(Date.now() + SESSION_TTL_MS).toISOString();
}

export const authService = {
  async register({ fullName, email, phone, secretCode }) {
    if (!fullName || fullName.trim().length === 0) {
      throw AppError.badRequest("Full name is required");
    }
    if (!email && !phone) {
      throw AppError.badRequest("At least one of email or phone number is required");
    }
    if (!secretCode || secretCode.length !== 6) {
      throw AppError.badRequest("Secret code must be exactly 6 characters");
    }

    if (email && (await userRepository.emailExists(email))) {
      throw AppError.conflict("Email already registered");
    }
    if (phone && (await userRepository.phoneExists(phone))) {
      throw AppError.conflict("Phone number already registered");
    }
    if (!(await userRepository.isSecretCodeUnique(secretCode))) {
      throw AppError.conflict("This secret code is already taken");
    }

    const id = crypto.randomUUID();
    const secretCodeHash = await userRepository.hashSecretCode(secretCode);
    const uniqueUserCode = await userRepository.generateUniqueCode();

    const user = await userRepository.create({
      id,
      full_name: fullName.trim(),
      email: email || null,
      phone: phone || null,
      secret_code_hash: secretCodeHash,
      unique_user_code: uniqueUserCode,
    });

    await profileRepository.upsert(id, {
      display_name: fullName.trim(),
      email: email || null,
      phone: phone || null,
    });

    const token = generateToken();
    await sessionRepository.create(id, token);

    return {
      user: this.sanitizeUser(user),
      token,
      expiresIn: SESSION_TTL_MS,
    };
  },

  async login({ login, secretCode }) {
    if (!login || login.length === 0) {
      throw AppError.badRequest("Email or phone number is required");
    }
    if (!secretCode || secretCode.length !== 6) {
      throw AppError.badRequest("Secret code must be exactly 6 characters");
    }

    const user = await userRepository.findByLogin(login);
    if (!user) {
      throw AppError.unauthorized("Invalid credentials");
    }

    const valid = await userRepository.verifySecretCode(secretCode, user.secret_code_hash);
    if (!valid) {
      throw AppError.unauthorized("Invalid credentials");
    }

    if (user.status !== "active") {
      throw AppError.forbidden("Account is not active");
    }

    await userRepository.updateLastLogin(user.id);

    const token = generateToken();
    await sessionRepository.create(user.id, token);

    return {
      user: this.sanitizeUser(user),
      token,
      expiresIn: SESSION_TTL_MS,
    };
  },

  async logout(token) {
    if (!token) return;
    await sessionRepository.revoke(token);
  },

  async me(token) {
    const session = await sessionRepository.findByToken(token);
    if (!session || !session.is_active) {
      throw AppError.unauthorized("Invalid or expired session");
    }
    if (new Date(session.expires_at) < new Date()) {
      await sessionRepository.revoke(token);
      throw AppError.unauthorized("Session expired");
    }
    const user = await userRepository.findById(session.user_id);
    if (!user) throw AppError.unauthorized("User not found");
    return this.sanitizeUser(user);
  },

  async updateProfile(userId, fields) {
    const allowed = {};
    if (fields.full_name !== undefined) allowed.full_name = fields.full_name.trim();
    if (fields.email !== undefined) allowed.email = fields.email;
    if (fields.phone !== undefined) allowed.phone = fields.phone;
    if (fields.avatar_url !== undefined) allowed.avatar_url = fields.avatar_url;
    if (fields.avatar_color !== undefined) allowed.avatar_color = fields.avatar_color;

    if (Object.keys(allowed).length === 0) {
      throw AppError.badRequest("No fields provided");
    }

    if (allowed.email && (await userRepository.emailExistsExcluding(allowed.email, userId))) {
      throw AppError.conflict("Email already in use");
    }
    if (allowed.phone && (await userRepository.phoneExistsExcluding(allowed.phone, userId))) {
      throw AppError.conflict("Phone number already in use");
    }

    const user = await userRepository.update(userId, allowed);
    return this.sanitizeUser(user);
  },

  async changeSecretCode(userId, currentCode, newCode) {
    if (!currentCode || currentCode.length !== 6) {
      throw AppError.badRequest("Current secret code must be 6 characters");
    }
    if (!newCode || newCode.length !== 6) {
      throw AppError.badRequest("New secret code must be 6 characters");
    }

    const user = await userRepository.findById(userId);
    if (!user) throw AppError.unauthorized("User not found");

    const valid = await userRepository.verifySecretCode(currentCode, user.secret_code_hash);
    if (!valid) {
      throw AppError.unauthorized("Current secret code is incorrect");
    }

    if (!(await userRepository.isSecretCodeUnique(newCode, userId))) {
      throw AppError.conflict("This secret code is already taken");
    }

    const newHash = await userRepository.hashSecretCode(newCode);
    await userRepository.update(userId, { secret_code_hash: newHash });
    return { success: true };
  },

  async refreshSession(token) {
    const session = await sessionRepository.findByToken(token);
    if (!session || !session.is_active) {
      throw AppError.unauthorized("Invalid session");
    }
    const newToken = generateToken();
    await sessionRepository.revoke(token);
    await sessionRepository.create(session.user_id, newToken);
    return { token: newToken, expiresIn: SESSION_TTL_MS };
  },

  sanitizeUser(user) {
    const { secret_code_hash, ...safe } = user;
    return safe;
  },
};

export default authService;