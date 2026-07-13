import { progressRepository } from "../repositories/progressRepository.js";
import { profileRepository } from "../repositories/profileRepository.js";
import { AppError } from "../errors/index.js";
import { pickDefined } from "../helpers/index.js";
import config from "../config/index.js";

export const progressService = {
  async get(userId, gameId) {
    const progress = progressRepository.get(userId, gameId);
    if (!progress) {
      return {
        user_id: userId,
        game_id: gameId,
        current_level: 1,
        unlocked_levels: 1,
        coins: 0,
        stars: 0,
        xp: 0,
        score: 0,
        lives: 0,
        inventory: [],
        power_ups: [],
        character: null,
        skin: null,
        difficulty: null,
        game_settings: {},
        checkpoints: {},
        mission_progress: {},
        custom_data: {},
        time_played: 0,
        highest_score: 0,
        best_time: null,
      };
    }
    return progress;
  },

  async getAll(userId) {
    return progressRepository.getAllForUser(userId);
  },

  async upsert(userId, gameId, fields) {
    const allowed = pickDefined(fields);
    if (Object.keys(allowed).length === 0) {
      throw AppError.badRequest("No fields provided");
    }
    return progressRepository.upsert(userId, gameId, allowed);
  },

  async delete(userId, gameId) {
    progressRepository.delete(userId, gameId);
  },
};
