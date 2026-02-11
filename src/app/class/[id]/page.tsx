"use client";

import { useEffect, useMemo, useState } from "react";
import { findVideo } from "../../../lib/videos";

type Comment = {
  id: string;
  user: string;
  text: string;
  at: number;
};

function time(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ClassPage({ params }: { params: { id: string } }) {
  const video = useMemo(() => findVideo(params.id), [params.id]);

  const COMMENTS_KEY = `unimate_comments_${params.id}`;
  const TIPS_KEY = `unimate_tips_${params.id}`;

  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [tips, setTips] = useState(0);
  const [amount, setAmount] = useState(50);

  useEffect(() => {
    const c = localStorage.getItem(COMMENTS_KEY);
    setComments(c ? JSON.parse(c) : []);
    const t = localStorage.getItem(TIPS_KEY);
    setTips(t ? Number(t) : 0);
  }, [COMMENTS_KEY, TIPS_KEY]);

  function addComment() {
    if (!text.trim()) return;

    const next = {
      id: String(Date.now()),
      user: "student01",
      text,
      at: Date.now(),
    };

    const updated = [next, ...comments];
    setComments(updated);
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(updated));
    setText("");
  }

  function tip() {
    const next = tips + amount;
    setTips(next);
    localStorage.setItem(TIPS_KEY, String(next));
  }

  if (!video) {
    return (
      <main className="min-h-screen bg-[#0b1020] text-white p-10">
        <h1 className="text-2xl font-bold">Class not found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <header className="border-b border-white/10 px-6 py-6 flex justify-between">
        <div>
          <div className="font-extrabold">UniMate</div>
          <div className="text-sm text-white/60">{video.title}</div>
        </div>
        <a href="/feed" className="px-4 py-2 rounded-xl border border-white/10">
          Back
        </a>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-12 gap-6">
        {/* VIDEO */}
        <div className="lg:col-span-7">
          <video
            src={video.src}
            controls
            autoPlay
            className="w-full rounded-2xl border border-white/10"
          />

          {/* TIP JAR */}
          <div className="mt-4 border border-white/10 rounded-2xl p-4 bg-black/20">
            <div className="font-bold">Tip Jar</div>
            <div className="text-sm text-white/70">Total: {tips}</div>

            <div className="mt-2 flex gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-24 p-2 rounded-xl bg-black/30 border border-white/10"
              />
              <button onClick={tip} className="px-4 py-2 bg-violet-600 rounded-xl">
                Tip
              </button>
            </div>
          </div>
        </div>

        {/* COMMENTS */}
        <div className="lg:col-span-5 border border-white/10 rounded-3xl p-5 bg-white/5">
          <div className="font-extrabold text-lg">Comments</div>

          <div className="mt-3 flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 p-3 rounded-xl bg-black/30 border border-white/10"
            />
            <button onClick={addComment} className="px-4 py-2 bg-violet-600 rounded-xl">
              Send
            </button>
          </div>

          <div className="mt-4 space-y-3 max-h-[400px] overflow-auto">
            {comments.map((c) => (
              <div key={c.id} className="border border-white/10 rounded-xl p-3 bg-black/20">
                <div className="text-xs text-white/60">
                  {c.user} · {time(c.at)}
                </div>
                <div className="text-sm">{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
