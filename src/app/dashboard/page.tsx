"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type User = { id: string; name: string; email: string };

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [topic, setTopic] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

  const token = useMemo(() => (typeof window !== "undefined" ? localStorage.getItem("unimate_token") : null), []);

  useEffect(() => {
    const u = typeof window !== "undefined" ? localStorage.getItem("unimate_user") : null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(u ? JSON.parse(u) : null);
  }, []);

  async function createRoom() {
    setMsg(null);
    if (!token) return setMsg("Please login first.");
    if (!topic.trim()) return setMsg("Enter a topic.");

    const res = await fetch("/api/create-room", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ topic, isPublic }),
    });

    const data = await res.json();
    if (!res.ok) return setMsg(data.error || "Failed");

    window.location.href = `/room/${data.roomId}`;
  }

  function logout() {
    localStorage.removeItem("unimate_token");
    localStorage.removeItem("unimate_user");
    window.location.href = "/login";
  }

  return (
    <main className="min-h-screen bg-[#0b1020] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold">Dashboard</h1>
          <div className="flex gap-2">
            <Link className="px-4 py-2 rounded-xl border border-white/10" href="/">Home</Link>
            <button className="px-4 py-2 rounded-xl border border-white/10" onClick={logout}>Logout</button>
          </div>
        </div>

        <div className="mt-2 text-white/70 text-sm">
          {user ? `Logged in as ${user.name} (${user.email})` : "Not logged in."}
        </div>

        <div className="mt-6 border border-white/10 rounded-2xl bg-white/5 p-6">
          <h2 className="text-xl font-bold">Create a room</h2>

          <div className="mt-4 space-y-3">
            <input
              className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
              placeholder="Topic (e.g. Algebra, Guitar, Coding)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />

            <label className="flex items-center gap-2 text-sm text-white/70">
              <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
              Public room (unchecked = 1-on-1)
            </label>

            {msg && <div className="text-sm text-white/70">{msg}</div>}

            <button className="w-full p-3 rounded-xl bg-violet-600 font-semibold" onClick={createRoom}>
              Create room
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
