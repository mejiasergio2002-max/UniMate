import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "@/lib/db";
import { makeToken, verifyPassword } from "@/lib/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });

  const emailLower = String(email).toLowerCase();
  const user = Object.values(users).find((u) => u.email === emailLower);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = verifyPassword(String(password), user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = makeToken(user.id);
  // MVP: send token back; client stores in localStorage
  return res.status(200).json({ ok: true, token, user: { id: user.id, name: user.name, email: user.email } });
}
