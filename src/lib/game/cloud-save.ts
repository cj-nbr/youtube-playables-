import { authService } from "../auth/auth-service.js";
import { upsertGameProgress, getGameProgress, deleteGameProgress } from "../db/progress.js";
import { saveGameData, getGameSave, getAllGameSaves } from "../db/saves.js";
import { updateUserStats, incrementUserStat, getUserStats } from "../db/stats.js";
import { updateProfile, getProfile } from "../db/profiles.js";

const SAVE_DEBOUNCE_MS = 1000;
let saveTimer: ReturnType<typeof setTimeout> | null = null;

export class CloudSave {
  private gameId: string;
  private userId: string | null = null;
  private lastSaveData: Record<string, any> = {};

  constructor(gameId: string) {
    this.gameId = gameId;
    this.init();
  }

  private init() {
    const unsub = authService.subscribe((state) => {
      const wasLoggedOut = !this.userId;
      this.userId = state.user?.id ?? null;
      if (wasLoggedOut && this.userId) {
        this.restore();
      }
    });
    return () => unsub();
  }

  async restore(): Promise<Record<string, any> | null> {
    if (!this.userId) return null;
    try {
      const save = await getGameSave(this.userId, this.gameId);
      if (save?.data) {
        this.lastSaveData = save.data;
        return save.data;
      }
      const progress = await getGameProgress(this.userId, this.gameId);
      if (progress) {
        const { id, user_id, game_id, save_slot, created_at, updated_at, ...rest } = progress as any;
        this.lastSaveData = rest;
        return rest;
      }
    } catch {
      // ignore restore errors
    }
    return null;
  }

  async save(data: Record<string, any>): Promise<void> {
    if (!this.userId) return;
    const serialized = JSON.stringify(data);
    if (serialized === JSON.stringify(this.lastSaveData)) return;

    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
      try {
        this.lastSaveData = data;
        await saveGameData(this.userId, this.gameId, data);
      } catch {
        // silent fail
      }
    }, SAVE_DEBOUNCE_MS);
  }

  async saveProgress(updates: Record<string, any>): Promise<void> {
    if (!this.userId) return;
    try {
      await upsertGameProgress(this.userId, this.gameId, updates);
    } catch {
      // silent fail
    }
  }

  async loadProgress() {
    if (!this.userId) return null;
    try {
      return await getGameProgress(this.userId, this.gameId);
    } catch {
      return null;
    }
  }

  async clear(): Promise<void> {
    if (!this.userId) return;
    try {
      await deleteGameProgress(this.userId, this.gameId);
      await deleteGameSave(this.userId, this.gameId);
      this.lastSaveData = {};
    } catch {
      // silent fail
    }
  }

  isLoggedIn() {
    return !!this.userId;
  }
}

let cloudSaveInstance: CloudSave | null = null;

export function getCloudSave(gameId: string): CloudSave {
  if (!cloudSaveInstance || cloudSaveInstance["gameId"] !== gameId) {
    cloudSaveInstance = new CloudSave(gameId);
  }
  return cloudSaveInstance;
}

export async function syncHighScore(gameId: string, score: number) {
  const state = authService.getState();
  if (!state.user) return score;

  try {
    const progress = await getGameProgress(state.user.id, gameId);
    const currentHigh = progress?.high_score ?? 0;
    if (score > currentHigh) {
      await upsertGameProgress(state.user.id, gameId, { high_score: score });
      const stats = await getUserStats(state.user.id);
      if (stats) {
        const scores = stats.highest_scores ?? {};
        scores[gameId] = score;
        await updateUserStats(state.user.id, { highest_scores: scores });
      }
    }
  } catch {
    // silent fail
  }
  return score;
}

export async function recordGamePlay(userId: string, gameId: string, won = false) {
  try {
    await incrementUserStat(userId, "total_games_played", 1);
    if (won) {
      await incrementUserStat(userId, "wins", 1);
    } else {
      await incrementUserStat(userId, "losses", 1);
    }
    const profile = await getProfile(userId);
    if (profile) {
      await updateProfile(userId, {
        statistics: {
          ...(profile.statistics ?? {}),
          last_played: new Date().toISOString(),
        },
      });
    }
  } catch {
    // silent fail
  }
}
