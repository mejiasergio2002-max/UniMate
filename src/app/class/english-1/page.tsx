"use client";

import { useEffect, useState } from "react";

type Comment = { id: string; user: string; text: string; at: number };

function fmt(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function English1Room() {
  const id = "english-1";
  const videoSrc = "/videos/english/english-1.mp4";

  const COMMENTS_KEY = `unimate_comments_${id}`;
  const TIPS_KEY = `unimate_tips_${id}`;

  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("student01");
  const [tipsTotal, setTipsTotal] = useState(0);
  const [tipMsg, setTipMsg] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(COMMENTS_KEY);
    setComments(raw ? JSON.parse(raw) : []);
    const t = localStorage.getItem(TIPS_KEY);
    setTipsTotal(t ? Number(t) : 0);
  }, []);

  function addComment() {
    const trimmed = text.trim();
    const who = name.trim() || "student01";
    if (!trimmed) return;

    const next: Comment = { id: String(Date.now()), user: who, text: trimmed, at: Date.now() };
    const updated = [next, ...comments];
    setComments(updated);
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(updated));
    setText("");
  }

  function tip(amount: number) {
    const next = tipsTotal + amount;
    setTipsTotal(next);
    localStorage.setItem(TIPS_KEY, String(next));
    setTipMsg(`Thanks for the $${amount} tip!`);
    setTimeout(() => setTipMsg(null), 1200);
  }

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600 grid place-items-center font-extrabold">U</div>
            <div>
              <div className="font-extrabold leading-4">UniMate</div>
              <div className="text-xs text-white/60">Class · {id}</div>
            </div>
          </div>
          <a className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5" href="/feed">
            Back
          </a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <div className="border border-white/10 rounded-3xl p-5 bg-white/5">
            <div className="text-sm text-white/60">Instructor</div>
            <div className="text-xl font-extrabold">@english.tutor01</div>
            <div className="text-white/70 text-sm mt-1">English Video 1</div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <video className="w-full h-auto" src={videoSrc} controls playsInline autoPlay muted preload="auto" />
            </div>

            <div className="mt-5 border border-white/10 rounded-2xl p-4 bg-black/20">
              <div className="flex items-center justify-between">
                <div className="font-bold">Tip Jar</div>
                <div className="text-sm text-white/70">
                  Total: <span className="text-white font-semibold">${tipsTotal}</span>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <button onClick={() => tip(1)} className="px-4 py-2 rounded-xl bg-violet-600 font-semibold">
                  $1
                </button>
                <button onClick={() => tip(3)} className="px-4 py-2 rounded-xl bg-violet-600 font-semibold">
                  $3
                </button>
                <button onClick={() => tip(10)} className="px-4 py-2 rounded-xl bg-violet-600 font-semibold">
                  $10
                </button>
              </div>

              {tipMsg && <div className="mt-2 text-xs text-white/70">{tipMsg}</div>}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 border border-white/10 rounded-3xl p-6 bg-white/5">
          <div className="text-xl font-extrabold">Comments</div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <input
              className="col-span-1 p-3 rounded-xl bg-black/30 border border-white/10"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="col-span-2 p-3 rounded-xl bg-black/30 border border-white/10"
              placeholder="Write a comment…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addComment()}
            />
          </div>

          <button className="w-full mt-2 px-4 py-3 rounded-xl bg-violet-600 font-semibold" onClick={addComment}>
            Send
          </button>

          <div className="mt-5 space-y-3 max-h-[520px] overflow-auto pr-1">
            {comments.length === 0 ? (
              <div className="text-white/60 text-sm">No comments yet.</div>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="border border-white/10 rounded-2xl p-3 bg-black/20">
                  <div className="text-xs text-white/60">
                    {c.user} · {fmt(c.at)}
                  </div>
                  <div className="text-sm mt-1">{c.text}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
