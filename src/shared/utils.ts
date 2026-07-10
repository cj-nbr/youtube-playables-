// Reusable, dependency-free utilities shared by every game.
// Centralising these removes duplicate code and guarantees that one game's
// helpers can never diverge from or break another's.

export const el = <T extends HTMLElement = HTMLElement>(id: string): T | null =>
  document.getElementById(id) as T | null;

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => clamp(Math.round(x), 0, 255).toString(16).padStart(2, "0"))
      .join("")
  );
}

export function colorDistance(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number }
): number {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

export function randomColor(): { r: number; g: number; b: number } {
  return { r: randInt(0, 255), g: randInt(0, 255), b: randInt(0, 255) };
}

/** Fisher–Yates shuffle returning a new array. */
export function shuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Available pixel area inside the game board (excludes padding). */
export function getGameArea(): { w: number; h: number } {
  const fn = (window as any).__getGameArea;
  if (typeof fn === "function") {
    const area = fn();
    if (area && area.w > 0 && area.h > 0) return area;
  }
  return { w: 320, h: 400 };
}

/** Compute a square cell size that fits cols×rows inside the game area. */
export function getCellSize(opts: {
  cols: number;
  rows: number;
  max?: number;
  min?: number;
  area?: { w: number; h: number };
}): number {
  const area = opts.area ?? getGameArea();
  const size = Math.min(area.w / opts.cols, area.h / opts.rows);
  if (opts.max !== undefined || opts.min !== undefined) {
    return clamp(size, opts.min ?? 0, opts.max ?? Infinity);
  }
  return size;
}

/* ----------------------------- High scores ----------------------------- */

const HS_PREFIX = "ytp:highscore:";

export function getHighScore(key: string): number {
  try {
    const raw = localStorage.getItem(HS_PREFIX + key);
    return raw ? parseInt(raw, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

/**
 * Persist a best score. By default a HIGHER value is better (e.g. points).
 * Pass `lowerIsBetter = true` for "fewest moves" style records.
 */
export function setHighScore(
  key: string,
  value: number,
  lowerIsBetter = false
): number {
  const current = getHighScore(key);
  const better =
    current === 0
      ? true
      : lowerIsBetter
        ? value < current
        : value > current;
  const best = better ? value : current;
  try {
    localStorage.setItem(HS_PREFIX + key, String(best));
  } catch {
    /* storage may be unavailable (private mode) — fail silently */
  }
  return best;
}

/* ------------------------------ Game hooks ----------------------------- */
// These wrap the global helpers exposed by GameShell so a game never has to
// touch window directly.

export function onReset(fn: () => void): void {
  (window as any).__resetGame = fn;
}

export function showOverlay(title: string, message?: string): void {
  (window as any).__showOver?.(title, message);
}

export function hideOverlay(): void {
  (window as any).__hideOver?.();
}

export function registerPause(
  pause: () => void,
  resume: () => void
): void {
  (window as any).__setPausable?.(true);
  (window as any).__pauseGame = pause;
  (window as any).__resumeGame = resume;
}

/* -------------------------------- Sound -------------------------------- */
// Lightweight WebAudio beeper with a persisted mute toggle. No external
// assets required, so it never blocks loading or breaks on slow networks.

const MUTE_KEY = "ytp:sound-muted";

class SoundEngine {
  private ctx: AudioContext | null = null;

  // Mute state is stored in localStorage (not in-memory) so that the
  // GameShell toggle and each game's beeps — which may be bundled into
  // separate scripts — always agree on the current value.
  get muted(): boolean {
    try {
      return localStorage.getItem(MUTE_KEY) === "1";
    } catch {
      return false;
    }
  }

  setMuted(value: boolean): void {
    try {
      localStorage.setItem(MUTE_KEY, value ? "1" : "0");
    } catch {
      /* ignore */
    }
    document.dispatchEvent(
      new CustomEvent("ytp:sound-change", { detail: { muted: value } })
    );
  }

  toggle(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  private context(): AudioContext | null {
    if (typeof window === "undefined") return null;
    const Ctor =
      (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!Ctor) return null;
    if (!this.ctx) this.ctx = new Ctor();
    return this.ctx;
  }

  /** Short synthesised tone. type controls the wave shape. */
  beep(opts: {
    freq?: number;
    duration?: number;
    type?: OscillatorType;
    volume?: number;
  } = {}): void {
    if (this.muted) return;
    const ctx = this.context();
    if (!ctx) return;
    const freq = opts.freq ?? 440;
    const duration = opts.duration ?? 0.12;
    const type = opts.type ?? "sine";
    const volume = opts.volume ?? 0.06;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  click(): void {
    this.beep({ freq: 320, duration: 0.06, type: "square", volume: 0.04 });
  }
  success(): void {
    this.beep({ freq: 660, duration: 0.12, type: "triangle" });
    setTimeout(() => this.beep({ freq: 880, duration: 0.12, type: "triangle" }), 90);
  }
  error(): void {
    this.beep({ freq: 160, duration: 0.18, type: "sawtooth", volume: 0.05 });
  }
  win(): void {
    [523, 659, 784, 1047].forEach((f, i) =>
      setTimeout(() => this.beep({ freq: f, duration: 0.14, type: "triangle" }), i * 110)
    );
  }
}

export const sound = new SoundEngine();
