import { Router } from "express";
import { authService } from "../services/authService.js";
import { registerSchema, loginSchema, profileUpdateSchema, changeSecretCodeSchema } from "../validators/index.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../helpers/index.js";
import { authenticate } from "../middleware/auth.js";

export const router = Router();
export default router;

router.post("/register", validate(registerSchema), asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  res.status(201).json({ success: true, data: result });
}));

router.post("/login", validate(loginSchema), asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  res.cookie("session_token", result.token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: result.expiresIn,
  });
  res.json({ success: true, data: result });
}));

router.post("/logout", asyncHandler(async (req, res) => {
  const token = req.cookies?.session_token || req.headers.authorization?.slice(7);
  if (token) {
    await authService.logout(token);
  }
  res.clearCookie("session_token");
  res.json({ success: true });
}));

router.get("/me", authenticate, asyncHandler(async (req, res) => {
  const user = await authService.me(req.user.id);
  res.json({ success: true, data: user });
}));

router.patch("/me", authenticate, validate(profileUpdateSchema), asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req.user.id, req.body);
  res.json({ success: true, data: user });
}));

router.post("/change-secret-code", authenticate, validate(changeSecretCodeSchema), asyncHandler(async (req, res) => {
  const result = await authService.changeSecretCode(req.user.id, req.body.current_code, req.body.new_code);
  res.json({ success: true, data: result });
}));

router.post("/refresh-session", authenticate, asyncHandler(async (req, res) => {
  const token = req.cookies?.session_token || req.headers.authorization?.slice(7);
  const result = await authService.refreshSession(token);
  res.cookie("session_token", result.token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: result.expiresIn,
  });
  res.json({ success: true, data: result });
}));