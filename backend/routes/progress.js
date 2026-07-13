import { Router } from "express";
import { progressService } from "../services/progressService.js";
import { authenticate } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { progressUpsertSchema } from "../validators/index.js";
import { asyncHandler } from "../helpers/index.js";

export const router = Router();
export default router;

router.get("/:gameId", authenticate, asyncHandler(async (req, res) => {
  const progress = await progressService.get(req.user.id, req.params.gameId);
  res.json({ success: true, data: progress });
}));

router.get("/", authenticate, asyncHandler(async (req, res) => {
  const all = await progressService.getAll(req.user.id);
  res.json({ success: true, data: all });
}));

router.patch("/:gameId", authenticate, validate(progressUpsertSchema), asyncHandler(async (req, res) => {
  const progress = await progressService.upsert(req.user.id, req.params.gameId, req.body);
  res.json({ success: true, data: progress });
}));

router.delete("/:gameId", authenticate, asyncHandler(async (req, res) => {
  await progressService.delete(req.user.id, req.params.gameId);
  res.json({ success: true });
}));
