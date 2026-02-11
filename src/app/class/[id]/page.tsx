"use client";

import { useEffect, useMemo, useState } from "react";
import { findVideo } from "@/lib/videos";

type Comment = { text: string; at: number };

function timeStamp(ts: number) {
  const d = new Date(ts);
  return d.toLocaleString();
}

export default function ClassRoomPage({ params }: { params: { id: string } }) {
  const video = useMemo(() => findVideo(params.id), [params.id]);

  const commentsKey = `unimate_comments_${params.id}`;
  const tipsKey = `unimate_tips_${params.id}`;

  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [tipAmount, setTipAmount] = useState(50);
  const [tipsTotal, setTipsTotal] = useState(0);

  useEffect(() => {
    // load comments
    const raw = localStorage.getItem(commentsKey);
    setComments(raw ? JSON.parse(raw) : []);

    // load tips
    const t = localStorage.getItem(tipsKey);
    setTipsTotal(t ? Number(t) : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  function addComment() {
    const trimmed = text.trim();
    if (!trimmed) return;

    const next = [{ text: trimmed, at: Date.now() }, ...comments];
    setComments(next);
    localStorage.setItem(commentsKey, JSON.stringify(next));
    setText("");
  }

  function tip() {
    const amt = Number(tipAmount);
    if (!Number.isFinite(amt) || amt <= 0) return;

    const next = tipsTotal + amt;
    setTipsTotal(next);
    localStorage.setItem(tipsKey, String(next));
  }

  if (!video) {
    return (
      <main className="min-h-screen bg-[#0b1020] text-white p-10">
        <h1 className="text-2xl font-extrabold">Class not found</h1>
        <p className="mt-2 text-white/70">That video/class ID doesn’t exist.</p>
        <a className="inline-block mt-6 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5" href="/feed">
          Back to Feed
        </a>
      </main>
    );
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
        {/* Video */}
        <div className="lg:col-span-7 border border-white/10 rounded-3xl p-4 bg-white/5">
          <div className="text-sm text-white/60">Instructor</div>
          <div className="text-xl font-extrabold">{video.username}</div>
          <div className="text-white/70 text-sm mt-1">{video.title}</div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
            <video className="w-full h-auto" src={video.src} controls playsInline />
          </div>

          {/* Tip jar */}
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
              <button className="px-5 py-3 rounded-xl bg-violet-600 font-semibold" onClick={tip}>
                Tip
              </button>
            </div>

            <div className="mt-2 text-xs text-white/50">
              (MVP: tips are saved locally for now. Next: real payments.)
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="lg:col-span-5 border border-white/10 rounded-3xl p-6 bg-white/5">
          <h2 className="text-xl font-extrabold">Comments</h2>
          <p className="mt-2 text-white/70 text-sm">Ask questions, share notes, say thanks.</p>

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

          <div className="mt-5 space-y-3 max-h-[460px] overflow-auto pr-1">
            {comments.length === 0 ? (
              <div className="text-white/60 text-sm">No comments yet.</div>
            ) : (
              comments.map((c, i) => (
                <div key={i} className="border border-white/10 rounded-2xl p-3 bg-black/20">
                  <div className="text-sm">{c.text}</div>
                  <div className="text-[11px] text-white/50 mt-1">{timeStamp(c.at)}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
