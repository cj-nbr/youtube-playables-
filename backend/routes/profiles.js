import { Router } from "express";
import { profileService } from "../services/profileService.js";
import { authenticate, optionalAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { profileUpdateSchema } from "../validators/index.js";
import { asyncHandler } from "../helpers/index.js";

export const router = Router();
export default router;

router.get("/me", authenticate, asyncHandler(async (req, res) => {
  const profile = await profileService.getMe(req.user.id);
  res.json({ success: true, data: profile });
}));

router.patch("/me", authenticate, validate(profileUpdateSchema), asyncHandler(async (req, res) => {
  const profile = await profileService.updateMe(req.user.id, req.body);
  res.json({ success: true, data: profile });
}));

router.get("/:userId", optionalAuth, asyncHandler(async (req, res) => {
  const profile = await profileService.getUserProfile(Number(req.params.userId));
  res.json({ success: true, data: profile });
}));

router.get("/:userId/data/:key", authenticate, asyncHandler(async (req, res) => {
  const val = await profileService.getData(req.user.id, req.params.key);
  res.json({ success: true, data: { key: req.params.key, value: val } });
}));

router.put("/:userId/data/:key", authenticate, asyncHandler(async (req, res) => {
  const val = await profileService.setData(req.user.id, req.params.key, req.body.value);
  res.json({ success: true, data: { key: req.params.key, value: val } });
}));

router.get("/:userId/data", authenticate, asyncHandler(async (req, res) => {
  const data = await profileService.getAllData(req.user.id);
  res.json({ success: true, data });
}));
