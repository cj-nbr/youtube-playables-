import { Router } from "express";
import { statsService } from "../services/statsService.js";
import { authenticate } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { statsPatchSchema, saveDataSchema } from "../validators/index.js";
import { asyncHandler } from "../helpers/index.js";
import { supabase } from "../database/connection.js";
import { AppError } from "../errors/index.js";

export const router = Router();
export default router;

router.get("/:gameId/save", authenticate, asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from("game_save_data")
    .select("slot, data, created_at, updated_at")
    .eq("user_id", req.user.id)
    .eq("game_id", req.params.gameId);
  if (error) throw AppError.internal(error.message);
  res.json({ success: true, data: data || [] });
}));

router.put("/:gameId/save", authenticate, validate(saveDataSchema), asyncHandler(async (req, res) => {
  const slot = req.body.slot || "default";
  const { error } = await supabase
    .from("game_save_data")
    .upsert(
      {
        user_id: req.user.id,
        game_id: req.params.gameId,
        slot,
        data: req.body.data,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,game_id,slot" }
    );
  if (error) throw AppError.internal(error.message);
  res.json({ success: true });
}));

router.delete("/:gameId/save", authenticate, asyncHandler(async (req, res) => {
  const slot = req.query.slot || "default";
  const { error } = await supabase
    .from("game_save_data")
    .delete()
    .eq("user_id", req.user.id)
    .eq("game_id", req.params.gameId)
    .eq("slot", slot);
  if (error) throw AppError.internal(error.message);
  res.json({ success: true });
}));

router.get("/:gameId/stats", authenticate, asyncHandler(async (req, res) => {
  const stats = await statsService.get(req.user.id, req.params.gameId);
  res.json({ success: true, data: stats });
}));

router.patch("/:gameId/stats", authenticate, validate(statsPatchSchema), asyncHandler(async (req, res) => {
  const stats = await statsService.patch(req.user.id, req.params.gameId, req.body);
  res.json({ success: true, data: stats });
}));
