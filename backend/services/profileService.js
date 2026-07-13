import { profileRepository } from "../repositories/profileRepository.js";
import { userRepository } from "../repositories/userRepository.js";
import { AppError } from "../errors/index.js";
import { pickDefined } from "../helpers/index.js";
import config from "../config/index.js";

export const profileService = {
  async getMe(userId) {
    const profile = profileRepository.findByUserId(userId);
    if (!profile) {
      return {
        user_id: userId,
        display_name: null,
        avatar_color: "#0070f3",
        bio: null,
        location: null,
        games_played: 0,
        levels_completed: 0,
        total_score: 0,
        achievements_count: 0,
      };
    }
    return profile;
  },

  async updateMe(userId, fields) {
    const allowed = pickDefined(fields);
    if (Object.keys(allowed).length === 0) {
      throw AppError.badRequest("No fields provided");
    }
    return profileRepository.upsert(userId, allowed);
  },

  async getUserProfile(userId) {
    const user = userRepository.findById(userId);
    if (!user) throw AppError.notFound("User not found");
    const profile = profileRepository.findByUserId(userId) || {};
    return {
      id: user.id,
      username: user.username,
      display_name: profile.display_name ?? null,
      avatar_color: profile.avatar_color ?? "#0070f3",
      bio: profile.bio ?? null,
      location: profile.location ?? null,
      games_played: profile.games_played ?? 0,
      levels_completed: profile.levels_completed ?? 0,
      total_score: profile.total_score ?? 0,
      achievements_count: profile.achievements_count ?? 0,
    };
  },

  async setData(userId, key, value) {
    profileRepository.setData(userId, key, value);
    return profileRepository.getData(userId, key);
  },

  async getData(userId, key) {
    const val = profileRepository.getData(userId, key);
    if (val === null) throw AppError.notFound("Key not found");
    return val;
  },

  async getAllData(userId) {
    return profileRepository.allData(userId);
  },
};
