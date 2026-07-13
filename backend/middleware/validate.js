import { ZodError } from "zod";
import { AppError } from "../errors/index.js";

export function validate(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = {};
        for (const issue of err.errors) {
          const path = issue.path.join(".");
          errors[path] = issue.message;
        }
        throw AppError.badRequest("Validation failed", errors);
      }
      throw err;
    }
  };
}
