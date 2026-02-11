"use client";

import { useEffect, useState } from "react";

type Comment = { id: string; text: string; at: number };

function formatTime(ts: number) {
  return new Date(ts).toLocaleString();
}

export default function Math3RoomPage() {
  const VIDEO_ID = "math-3";
  const VIDEO_SRC = "/videos/math/math-3.mp4";
  const TITLE = "Math Focus 3";
  const USERNAME = "math.tutor03";

  const COMMENTS_KEY = `unimate_comments_${VIDEO_ID}`;
  const TIPS_KEY = `unimate_tips_${VIDEO_ID}`;

  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [tipAmount, setTipAmount] = useState(50);
  const [tipsTotal, setTipsTotal] = useState(0);

  useEffect(() => {
    const raw = localStorage.getItem(COMMENTS_KEY);
    setComments(raw ? JSON.parse(raw) : []);
    const t = localStorage.getItem(TIPS_KEY);
    setTipsTotal(t ? Number(t) : 0);
  }, []);

  function addComment() {
    const trimmed = text.trim();
    if (!trimmed) return;
    const next: Comment = { id: String(Date.now()), text: trimmed, at: Date.now() };
    const updated = [next, ...comments];
    setComments(updated);
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(updated));
    setText("");
  }

  function sendTip() {
    const amt = Number(tipAmount);
    if (!Number.isFinite(amt) || amt <= 0) return;
    const next = tipsTotal + amt;
    setTipsTotal(next);
    localStorage.setItem(TIPS_KEY, String(next));
  }

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600 grid place-items-center font-extrabold">U</div>
            <div>
              <div className="font-extrabold leading-4">UniMate</div>
              <div className="text-xs text-white/60">Class Room</div>
            </div>
          </div>
          <a className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5" href="/feed">
            Back
          </a>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-10 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 border border-white/10 rounded-3xl p-5 bg-white/5">
          <div className="text-sm text-white/60">Instructor</div>
          <div className="text-xl font-extrabold">{USERNAME}</div>
          <div className="text-white/70 text-sm mt-1">{TITLE}</div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
            <video className="w-full h-auto" src={VIDEO_SRC} controls playsInline autoPlay muted />
          </div>

          <div className="mt-6 border border-white/10 rounded-2xl p-4 bg-black/20">
            <div className="flex items-center justify-between">
              <div className="font-bold">Tip Jar</div>
              <div className="text-sm text-white/70">
                Total: <span className="text-white font-semibold">{tipsTotal}</span>
              </div>
            </div>

            <div className="mt-3 flex gap-2 items-center">
              <input
                className="w-28 p-3 rounded-xl bg-black/30 border border-white/10"
                type="number"
                value={tipAmount}
                onChange={(e) => setTipAmount(Number(e.target.value))}
              />
              <button className="px-5 py-3 rounded-xl bg-violet-600 font-semibold" onClick={sendTip}>
                Tip
              </button>
            </div>

            <div className="mt-2 text-xs text-white/50">MVP: tips saved locally (next: Stripe).</div>
          </div>
        </div>

        <div className="lg:col-span-5 border border-white/10 rounded-3xl p-6 bg-white/5">
          <h2 className="text-xl font-extrabold">Comments</h2>
          <p className="mt-2 text-white/70 text-sm">Ask questions while watching.</p>

          <div className="mt-4 flex gap-2">
            <input
              className="flex-1 p-3 rounded-xl bg-black/30 border border-white/10"
              placeholder="Write a comment…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addComment();
              }}
            />
            <button className="px-4 py-3 rounded-xl bg-violet-600 font-semibold" onClick={addComment}>
              Send
            </button>
          </div>

          <div className="mt-5 space-y-3 max-h-[520px] overflow-auto pr-1">
            {comments.length === 0 ? (
              <div className="text-white/60 text-sm">No comments yet.</div>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="border border-white/10 rounded-2xl p-3 bg-black/20">
                  <div className="text-sm">{c.text}</div>
                  <div className="text-[11px] text-white/50 mt-1">{formatTime(c.at)}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
