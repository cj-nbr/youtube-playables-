import { verifyToken } from "../database/connection.js";
import { userRepository } from "../repositories/userRepository.js";
import { AppError } from "../errors/index.js";
import { asyncHandler } from "../helpers/index.js";

// Sessions are Supabase access tokens (JWTs). We validate the token with the
// anon client and load the owning profile; no local session table is needed.
export const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.slice(7);
  } else if (req.cookies?.session_token) {
    token = req.cookies.session_token;
  }

  if (!token) {
    throw AppError.unauthorized("Missing token");
  }

  const authUser = await verifyToken(token);
  if (!authUser) {
    throw AppError.unauthorized("Invalid or expired token");
  }

  const profile = await userRepository.findById(authUser.id);
  if (!profile) {
    throw AppError.unauthorized("User not found");
  }
  if (profile.status !== "active") {
    throw AppError.unauthorized("User not found or inactive");
  }

  req.user = { id: profile.id, role: profile.role, username: profile.username };
  next();
});

export const optionalAuth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    try {
      const authUser = await verifyToken(authHeader.slice(7));
      if (authUser) {
        const profile = await userRepository.findById(authUser.id);
        if (profile && profile.status === "active") {
          req.user = { id: profile.id, role: profile.role, username: profile.username };
        }
      }
    } catch {
      // ignore — optional auth never blocks
    }
  }
  next();
});
