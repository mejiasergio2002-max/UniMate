import type { User } from "@/models/User";
import type { Room } from "@/models/Room";

// NOTE: In-memory storage (resets on redeploy). Perfect for MVP UI wiring.
// Later you swap this with Mongo/Postgres.
const g = globalThis as unknown as {
  __UNIMATE_USERS__?: Record<string, User>;
  __UNIMATE_ROOMS__?: Record<string, Room>;
};

export const users: Record<string, User> = (g.__UNIMATE_USERS__ ??= {});
export const rooms: Record<string, Room> = (g.__UNIMATE_ROOMS__ ??= {});

export function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}
