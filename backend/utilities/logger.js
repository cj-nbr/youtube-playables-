import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const logsDir = path.resolve(__dirname, "..", "logs");
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

const useJson = process.env.NODE_ENV === "production";

function fmt(level, msg, meta) {
  const ts = new Date().toISOString();
  if (useJson) {
    return JSON.stringify({ ts, level, msg, ...(meta ? { meta } : {}) }) + "\n";
  }
  return `[${ts}] ${level.toUpperCase()} ${msg}${meta ? " " + JSON.stringify(meta) : ""}\n`;
}

function write(level, msg, meta) {
  const line = fmt(level, msg, meta);
  if (level === "error") process.stderr.write(line);
  else process.stdout.write(line);
}

export const logger = {
  info: (msg, meta) => write("info", msg, meta),
  warn: (msg, meta) => write("warn", msg, meta),
  error: (msg, meta) => write("error", msg, meta),
  debug: (msg, meta) => {
    if (!useJson) write("debug", msg, meta);
  },
};

export default logger;
