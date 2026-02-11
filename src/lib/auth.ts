import crypto from "crypto";

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 120000, 32, "sha256").toString("hex");
  return `${salt}.${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(".");
  if (!salt || !hash) return false;
  const test = crypto.pbkdf2Sync(password, salt, 120000, 32, "sha256").toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(test, "hex"));
}

// Simple token for MVP (NOT a real JWT)
export function makeToken(userId: string) {
  const sig = crypto.randomBytes(16).toString("hex");
  return `${userId}.${sig}`;
}

export function getUserIdFromToken(token?: string) {
  if (!token) return null;
  const [userId] = token.split(".");
  return userId || null;
}
