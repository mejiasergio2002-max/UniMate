import type { NextApiRequest, NextApiResponse } from "next";
import { users, rooms, uid } from "@/lib/db";
import { getUserIdFromToken } from "@/lib/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  const userId = getUserIdFromToken(token);

  if (!userId || !users[userId]) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { topic, isPublic } = req.body ?? {};
  if (!topic) return res.status(400).json({ error: "Missing topic" });

  const id = uid("room");
  rooms[id] = {
    id,
    hostUserId: userId,
    hostName: users[userId].name,
    topic: String(topic),
    isPublic: Boolean(isPublic),
    tipsTotal: 0,
    createdAt: Date.now(),
  };

  return res.status(200).json({ ok: true, roomId: id });
}
