"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function RoomPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [amount, setAmount] = useState(50);
  const [msg, setMsg] = useState<string | null>(null);

  async function tip() {
    setMsg(null);
    const res = await fetch("/api/tip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId: id, amount }),
    });

    const data = await res.json();
    if (!res.ok) return setMsg(data.error || "Tip failed");

    setMsg(`Tip sent! Total tips: ${data.tipsTotal}`);
  }

  return (
    <main className="min-h-screen bg-[#0b1020] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold">Room</h1>
          <Link className="px-4 py-2 rounded-xl border border-white/10" href="/dashboard">Back</Link>
        </div>

        <div className="mt-2 text-white/70">Room ID: <span className="text-white">{id}</span></div>

        <div className="mt-6 border border-white/10 rounded-2xl bg-white/5 p-6">
          <h2 className="text-xl font-bold">Live session (placeholder)</h2>
          <p className="mt-2 text-white/70">
            This is where video/chat will go (WebRTC + realtime later).
          </p>

          <div className="mt-6">
            <div className="text-sm text-white/70 mb-2">Send a tip</div>
            <div className="flex gap-2">
              <input
                className="w-32 p-3 rounded-xl bg-black/30 border border-white/10"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <button className="px-5 py-3 rounded-xl bg-violet-600 font-semibold" onClick={tip}>
                Tip
              </button>
            </div>
            {msg && <div className="mt-3 text-sm text-white/70">{msg}</div>}
          </div>
        </div>
      </div>
    </main>
  );
}
