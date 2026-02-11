import type { NextApiRequest, NextApiResponse } from "next";
import { users, uid } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, password } = req.body ?? {};
  if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });

  const emailLower = String(email).toLowerCase();
  const exists = Object.values(users).some((u) => u.email === emailLower);
  if (exists) return res.status(409).json({ error: "Email already registered" });

  const id = uid("user");
  users[id] = {
    id,
    name: String(name),
    email: emailLower,
    passwordHash: hashPassword(String(password)),
    createdAt: Date.now(),
  };

  return res.status(200).json({ ok: true });
}
