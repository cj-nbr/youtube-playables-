import { supabase } from "./client.js";

export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  email: string;
  avatar_url: string | null;
  created_at: string;
  last_login: string | null;
  preferences: Record<string, any>;
  statistics: Record<string, any>;
}

export interface GameProgress {
  id: string;
  user_id: string;
  game_id: string;
  current_level: number;
  highest_level: number;
  coins: number;
  score: number;
  high_score: number;
  stars: number;
  unlocks: string[];
  achievements: string[];
  lives: number;
  inventory: Record<string, any>;
  settings: Record<string, any>;
  checkpoints: Record<string, any>;
  progress_percentage: number;
  last_played: string | null;
  time_played: number;
  completion_status: string;
  save_slot: string;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  id: string;
  user_id: string;
  total_games_played: number;
  wins: number;
  losses: number;
  total_time_played: number;
  highest_scores: Record<string, number>;
  overall_progress: number;
  achievements: string[];
  created_at: string;
  updated_at: string;
}

export interface GameSave {
  id: string;
  user_id: string;
  game_id: string;
  slot: string;
  data: Record<string, any>;
  created_at: string;
  updated_at: string;
}
