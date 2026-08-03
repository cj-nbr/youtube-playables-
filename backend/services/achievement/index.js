import { supabase } from "../database/connection.js";
import { AppError } from "../errors/index.js";

export const achievementService = {
  async getAllAchievements() {
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .order("game_id")
      .order("tier");
    if (error) throw AppError.internal(error.message);
    return data || [];
  },

  async getAchievementsByGame(gameId) {
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .eq("game_id", gameId)
      .order("tier");
    if (error) throw AppError.internal(error.message);
    return data || [];
  },

  async getUserAchievements(userId) {
    const { data, error } = await supabase
      .from("user_achievements")
      .select(`
        *,
        achievements (*)
      `)
      .eq("user_id", userId)
      .order("unlocked_at", { ascending: false });
    if (error) throw AppError.internal(error.message);
    return data || [];
  },

  async unlockAchievement(userId, achievementId, progress = 100) {
    const { data, error } = await supabase
      .from("user_achievements")
      .upsert({
        user_id: userId,
        achievement_id: achievementId,
        unlocked_at: progress >= 100 ? new Date().toISOString() : null,
        progress,
      }, {
        onConflict: "user_id,achievement_id",
      })
      .select("*")
      .single();
    if (error) throw AppError.internal(error.message);
    return data;
  },

  async updateProgress(userId, achievementId, progress) {
    const { data, error } = await supabase
      .from("user_achievements")
      .update({
        progress,
        unlocked_at: progress >= 100 ? new Date().toISOString() : null,
      })
      .eq("user_id", userId)
      .eq("achievement_id", achievementId)
      .select("*")
      .single();
    if (error) throw AppError.internal(error.message);
    return data;
  },

  async checkAndUnlock(userId, gameId, metric, value) {
    const achievements = await this.getAchievementsByGame(gameId);
    const results = [];
    for (const achievement of achievements) {
      const userAch = await this.getUserAchievements(userId).then(list => 
        list.find(ua => ua.achievement_id === achievement.id)
      );
      if (userAch && userAch.progress >= 100) continue;
      
      let shouldUnlock = false;
      let newProgress = userAch ? userAch.progress : 0;
      
      switch (achievement.code) {
        case `${gameId}_first_win`:
        case `${gameId}_five_wins`:
        case `${gameId}_ten_wins`:
        case `${gameId}_fifty_wins`:
        case `${gameId}_score_500`:
        case `${gameId}_score_1000`:
        case `${gameId}_streak_3`:
        case `${gameId}_streak_5`:
        case `${gameId}_high_20`:
        case `${gameId}_high_50`:
        case `${gameId}_expert_clear`:
        case `${gameId}_hard_clear`:
        case `${gameId}_master`:
          if (metric === "wins" && value >= this.getThreshold(achievement.code)) shouldUnlock = true;
          if (metric === "score" && value >= this.getThreshold(achievement.code)) shouldUnlock = true;
          if (metric === "streak" && value >= this.getThreshold(achievement.code)) shouldUnlock = true;
          if (metric === "level" && value >= this.getThreshold(achievement.code)) shouldUnlock = true;
          break;
      }
      
      if (shouldUnlock) {
        newProgress = 100;
        await this.unlockAchievement(userId, achievement.id, 100);
      } else if (metric === "wins" || metric === "score" || metric === "streak" || metric === "level") {
        newProgress = Math.min(100, Math.round((value / this.getThreshold(achievement.code)) * 100));
        await this.updateProgress(userId, achievement.id, newProgress);
      }
      
      if (shouldUnlock || newProgress !== (userAch?.progress || 0)) {
        results.push({ achievement, progress: newProgress, unlocked: shouldUnlock });
      }
    }
    return results;
  },

  getThreshold(code) {
    const thresholds = {
      "first_win": 1,
      "five_wins": 5,
      "ten_wins": 10,
      "fifty_wins": 50,
      "score_500": 500,
      "score_1000": 1000,
      "streak_3": 3,
      "streak_5": 5,
      "high_20": 20,
      "high_50": 50,
      "expert_clear": 1,
      "hard_clear": 1,
      "master": 20,
    };
    for (const [key, val] of Object.entries(thresholds)) {
      if (code.includes(key)) return val;
    }
    return 1;
  },
};

export default achievementService;