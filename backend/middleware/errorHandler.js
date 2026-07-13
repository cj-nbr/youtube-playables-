import { AppError } from "../errors/index.js";

export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  const errors = err.details || undefined;

  const body = { success: false, message };
  if (errors) body.errors = errors;

  res.status(status).json(body);
}
