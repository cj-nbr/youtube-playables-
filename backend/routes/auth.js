import { Router } from "express";
import { authService } from "../services/authService.js";
import { registerSchema, loginSchema } from "../validators/index.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../helpers/index.js";
import { authenticate } from "../middleware/auth.js";
import { verifyToken } from "../database/connection.js";
import config from "../config/index.js";

export const router = Router();
export default router;

router.post("/register", validate(registerSchema), asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  if (result.token) {
    const maxAge = (result.expiresIn || config.session.ttlHours * 60 * 60) * 1000;
    res.cookie("session_token", result.token, {
      httpOnly: true,
      secure: config.isProduction,
      sameSite: "lax",
      maxAge,
    });
  }
  res.status(201).json({ success: true, data: result });
}));

router.post("/login", validate(loginSchema), asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  const maxAge = (result.expiresIn || config.session.ttlHours * 60 * 60) * 1000;
  res.cookie("session_token", result.token, {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: "lax",
    maxAge,
  });
  res.json({ success: true, data: result });
}));

router.post("/logout", asyncHandler(async (req, res) => {
  const token = req.cookies?.session_token || req.headers.authorization?.slice(7);
  if (token) {
    const authUser = await verifyToken(token);
    if (authUser) await authService.logout(authUser.id);
  }
  res.clearCookie("session_token");
  res.json({ success: true });
}));

router.get("/me", authenticate, asyncHandler(async (req, res) => {
  const user = await authService.me(req.user.id);
  res.json({ success: true, data: user });
}));
