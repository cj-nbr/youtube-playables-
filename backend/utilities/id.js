import { randomUUID } from "node:crypto";

/** Generate a secure random token (used for sessions & remember-me). */
export function generateToken(bytes = 32) {
  return randomUUID().replace(/-/g, "") + randomUUID().replace(/-/g, "");
}

export function newId() {
  return randomUUID();
}

/** Simple in-memory cache with TTL. Used for leaderboards / hot settings. */
export class MemoryCache {
  constructor(defaultTtlMs = 30_000) {
    this.defaultTtl = defaultTtlMs;
    this.store = new Map();
  }
  get(key) {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (entry.expiresAt < Date.now()) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value;
  }
  set(key, value, ttlMs = this.defaultTtl) {
    this.store.set(key, { value, expiresAt: Date.now() + ttlMs });
  }
  delete(key) {
    this.store.delete(key);
  }
  clear() {
    this.store.clear();
  }
}

export const cache = new MemoryCache();
