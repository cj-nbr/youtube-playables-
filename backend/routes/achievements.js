import { Router } from "express";
import { achievementsService } from "../services/achievementsService.js";
import { authenticate } from "../middleware/auth.js";
import { asyncHandler } from "../helpers/index.js";

export const router = Router();
export default router;

router.get("/", authenticate, asyncHandler(async (req, res) => {
  const achievements = await achievementsService.list(req.user.id);
  res.json({ success: true, data: achievements });
}));

router.post("/:id/unlock", authenticate, asyncHandler(async (req, res) => {
  const achievement = await achievementsService.unlock(req.user.id, Number(req.params.id));
  res.json({ success: true, data: achievement });
}));
