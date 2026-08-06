import { z } from "zod";

export const registerSchema = z.object({
 fullName: z.string().min(1).max(128),
 email: z.string().email().optional().or(z.literal("")),
 phone: z.string().min(1).max(20).optional().or(z.literal("")),
 secretCode: z.string().length(6),
});

export const loginSchema = z.object({
 login: z.string().min(1),
 secretCode: z.string().length(6),
});

export const profileUpdateSchema = z.object({
 full_name: z.string().max(128).optional(),
 email: z.string().email().optional().or(z.literal("")),
 phone: z.string().max(20).optional().or(z.literal("")),
 avatar_url: z.string().optional(),
 avatar_color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
});

export const changeSecretCodeSchema = z.object({
 current_code: z.string().length(6),
 new_code: z.string().length(6),
});

export const progressUpsertSchema = z.object({
 current_level: z.number().int().min(1).optional(),
 unlocked_levels: z.number().int().min(1).optional(),
 coins: z.number().int().min(0).optional(),
 stars: z.number().int().min(0).optional(),
 xp: z.number().int().min(0).optional(),
 score: z.number().int().min(0).optional(),
 lives: z.number().int().min(0).optional(),
 inventory: z.array(z.any()).optional(),
 power_ups: z.array(z.any()).optional(),
 character: z.string().max(128).optional(),
 skin: z.string().max(128).optional(),
 difficulty: z.string().max(32).optional(),
 game_settings: z.record(z.any()).optional(),
 checkpoints: z.record(z.any()).optional(),
 mission_progress: z.record(z.any()).optional(),
 custom_data: z.record(z.any()).optional(),
 time_played: z.number().int().min(0).optional(),
 highest_score: z.number().int().min(0).optional(),
 best_time: z.number().int().min(0).optional(),
});

export const settingsSchema = z.object({
 theme: z.enum(["system", "light", "dark"]).optional(),
 sound: z.boolean().optional(),
 music: z.boolean().optional(),
 notifications: z.boolean().optional(),
 reduced_motion: z.boolean().optional(),
 language: z.string().max(8).optional(),
});

export const preferencesSchema = z.object({
 difficulty: z.enum(["easy", "normal", "hard"]).optional(),
 controls: z.enum(["auto", "keyboard", "touch", "mouse"]).optional(),
 boardStyle: z.string().max(64).optional(),
});

export const saveDataSchema = z.object({
 slot: z.string().max(32).optional(),
 data: z.record(z.any()),
});

export const statsPatchSchema = z.object({
 plays: z.number().int().min(0).optional(),
 wins: z.number().int().min(0).optional(),
 losses: z.number().int().min(0).optional(),
 best_score: z.number().int().min(0).optional(),
 total_score: z.number().int().min(0).optional(),
 best_time: z.number().int().min(0).optional(),
 total_time: z.number().int().min(0).optional(),
});

