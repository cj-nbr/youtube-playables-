import { Router } from "express";
import { settingsService } from "../services/settingsService.js";
import { preferencesService } from "../services/preferencesService.js";
import { authenticate } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { settingsSchema, preferencesSchema } from "../validators/index.js";
import { asyncHandler } from "../helpers/index.js";

export const router = Router();
export default router;

router.get("/settings", authenticate, asyncHandler(async (req, res) => {
  const settings = await settingsService.get(req.user.id);
  res.json({ success: true, data: settings });
}));

router.patch("/settings", authenticate, validate(settingsSchema), asyncHandler(async (req, res) => {
  const settings = await settingsService.patch(req.user.id, req.body);
  res.json({ success: true, data: settings });
}));

router.get("/preferences", authenticate, asyncHandler(async (req, res) => {
  const prefs = await preferencesService.get(req.user.id);
  res.json({ success: true, data: prefs });
}));

router.patch("/preferences", authenticate, validate(preferencesSchema), asyncHandler(async (req, res) => {
  const prefs = await preferencesService.patch(req.user.id, req.body);
  res.json({ success: true, data: prefs });
}));
