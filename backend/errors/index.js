// Centralised, HTTP-aware error type. Throw `new AppError(409, '...')` from
// anywhere and the error handler turns it into a clean JSON response.

export class AppError extends Error {
  /** @param {number} status HTTP status code */
  /** @param {string} message Human-readable message */
  /** @param {Object} [details] Optional machine-readable details (e.g. field errors) */
  constructor(status, message, details = undefined) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace?.(this, AppError);
  }

  static badRequest(message = "Bad request", details) {
    return new AppError(400, message, details);
  }
  static unauthorized(message = "Unauthorized") {
    return new AppError(401, message);
  }
  static forbidden(message = "Forbidden") {
    return new AppError(403, message);
  }
  static notFound(message = "Not found") {
    return new AppError(404, message);
  }
  static conflict(message = "Conflict") {
    return new AppError(409, message);
  }
  static tooMany(message = "Too many requests") {
    return new AppError(429, message);
  }
  static internal(message = "Internal server error") {
    return new AppError(500, message);
  }
}

export default AppError;
