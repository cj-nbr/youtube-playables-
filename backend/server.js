import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "./config/index.js";
import { logger } from "./utilities/logger.js";
import { initDb, closeDb } from "./database/connection.js";
import { runMigrations } from "./database/migrations/index.js";
import { runSeeds } from "./database/seeds/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profiles.js";
import progressRoutes from "./routes/progress.js";
import gameRoutes from "./routes/games.js";
import settingsRoutes from "./routes/settings.js";
import achievementRoutes from "./routes/achievements.js";

const app = express();

// Reflect any localhost / 127.0.0.1 origin (any dev port) and the explicitly
// configured production origins. Using `credentials: true` lets the browser
// store the session cookie on the cross-origin response. A mismatched origin
// would otherwise make the browser reject the request as a CORS error, which
// surfaces in the frontend as a generic "Network error".
function isAllowedOrigin(origin, callback) {
  if (!origin) return callback(null, true);
  try {
    const host = new URL(origin).hostname;
    const isLocal = host === "localhost" || host === "127.0.0.1" || host === "::1";
    if (isLocal || config.corsOrigin.includes(origin)) return callback(null, true);
  } catch {
    // fall through to deny
  }
  callback(null, false);
}

app.use(helmet());
app.use(cors({
  origin: isAllowedOrigin,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

const authLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.authMax,
  standardHeaders: true,
  legacyHeaders: false,
});

app.get("/health", (req, res) => {
  res.json({ success: true, status: "ok", env: config.env });
});

app.use("/api/v1/auth", authLimiter, authRoutes);
app.use("/api/v1/profiles", profileRoutes);
app.use("/api/v1/progress", progressRoutes);
app.use("/api/v1/games", gameRoutes);
app.use("/api/v1/settings", settingsRoutes);
app.use("/api/v1/achievements", achievementRoutes);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Not found" });
});

async function start() {
  try {
    await initDb();
    runMigrations();
    await runSeeds();
    
    const server = app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port} (${config.env})`);
    });

    process.on("SIGINT", () => {
      closeDb();
      server.close();
      process.exit(0);
    });

    process.on("SIGTERM", () => {
      closeDb();
      server.close();
      process.exit(0);
    });
  } catch (err) {
    logger.error("Failed to start server", { error: err.message });
    process.exit(1);
  }
}

start();

export default app;
