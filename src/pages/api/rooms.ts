import type { NextApiRequest, NextApiResponse } from "next";
import { rooms, users } from "@/lib/db";
import { getUserIdFromToken } from "@/lib/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const token = req.headers.authorization?.replace("Bearer ", "");
  const userId = getUserIdFromToken(token);

  const allRooms = Object.values(rooms).sort((a, b) => b.createdAt - a.createdAt);

  // Public rooms always visible
  const publicRooms = allRooms.filter((r) => r.isPublic);

  // If logged in, include user's own rooms too (even if private)
  const myRooms = userId ? allRooms.filter((r) => r.hostUserId === userId) : [];

  // De-dupe (in case a user's room is also public)
  const merged = [...publicRooms, ...myRooms].reduce((acc, r) => {
    acc.set(r.id, r);
    return acc;
  }, new Map<string, (typeof allRooms)[number]>());

  const list = Array.from(merged.values()).map((r) => ({
    id: r.id,
    topic: r.topic,
    isPublic: r.isPublic,
    tipsTotal: r.tipsTotal,
    createdAt: r.createdAt,
    hostName: r.hostName,
    hostUserId: r.hostUserId,
  }));

  return res.status(200).json({ ok: true, rooms: list, me: userId ? users[userId] ?? null : null });
}
