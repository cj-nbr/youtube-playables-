// Lightweight JSDoc-style type contracts used across the backend. These are
// documentation aids for editors; runtime validation lives in validators/.

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 * @property {string} email
 * @property {string} password_hash
 * @property {string} role
 * @property {string} status
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} GameProgress
 * @property {number} id
 * @property {number} user_id
 * @property {string} game_id
 * @property {number} current_level
 * @property {number} coins
 * @property {number} stars
 * @property {number} xp
 * @property {number} score
 * @property {number} lives
 * @property {string} data  JSON blob for custom/checkpoint data
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} ApiErrorShape
 * @property {boolean} success
 * @property {string} message
 * @property {Object} [errors]
 */

export const API_VERSION = "v1";
export const API_BASE = `/api/${API_VERSION}`;
