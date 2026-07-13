import { MemoryCache } from "../utilities/id.js";

// Singleton cache instance reused by services (leaderboards, hot settings).
export const cache = new MemoryCache(30_000);
export { MemoryCache };
