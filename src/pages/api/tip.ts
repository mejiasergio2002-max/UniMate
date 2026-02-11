import type { NextApiRequest, NextApiResponse } from "next";
import { rooms } from "@/lib/db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { roomId, amount } = req.body ?? {};
  const amt = Number(amount);

  if (!roomId) return res.status(400).json({ error: "Missing roomId" });
  if (!Number.isFinite(amt) || amt <= 0) return res.status(400).json({ error: "Invalid amount" });
  if (!rooms[String(roomId)]) return res.status(404).json({ error: "Room not found" });

  rooms[String(roomId)].tipsTotal += amt;

  return res.status(200).json({ ok: true, tipsTotal: rooms[String(roomId)].tipsTotal });
}
