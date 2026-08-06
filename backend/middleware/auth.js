import { verifyToken } from "../database/connection.js";
import { userRepository } from "../repositories/userRepository.js";
import { AppError } from "../errors/index.js";
import { asyncHandler } from "../helpers/index.js";

export const authenticate = asyncHandler(async (req, res, next) => {
 let token;
 
 const authHeader = req.headers.authorization;
 if (authHeader?.startsWith("Bearer ")) {
  token = authHeader.slice(7);
 } else if (req.headers.cookie?.includes("session_token=")) {
  // Handle cookies from Express
  const cookies = req.headers.cookie.split(";");
  for (const cookie of cookies) {
   if (cookie.trim().startsWith("session_token=")) {
    token = cookie.split("=")[1];
    break;
   }
  }
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
  throw AppError.forbidden("User not found or inactive");
 }
 
 req.user = { 
  id: profile.id, 
  role: profile.role || "user", 
  username: profile.username || "", 
  email: profile.email 
 };
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
     req.user = { 
      id: profile.id, 
      role: profile.role || "user", 
      username: profile.username || "", 
      email: profile.email 
     };
    }
   }
  } catch {
   // ignore — optional auth never blocks
  }
 }
 next();
});
