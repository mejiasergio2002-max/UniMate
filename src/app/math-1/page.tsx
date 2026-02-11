"use client";

import { useEffect, useRef, useState } from "react";

type Comment = { id: string; text: string; at: number };

function fmt(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function TeachPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const COMMENTS_KEY = "unimate_live_comments";
  const TIPS_KEY = "unimate_live_tips";

  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");

  const [tipAmount, setTipAmount] = useState(50);
  const [tipsTotal, setTipsTotal] = useState(0);

  useEffect(() => {
    // load comments (or preload once)
    const raw = localStorage.getItem(COMMENTS_KEY);
    if (raw) {
      setComments(JSON.parse(raw));
    } else {
      const seeded: Comment[] = [
        { id: "1", text: "how do i do that effectively", at: Date.now() - 1000 * 60 * 3 },
        { id: "2", text: "what else do i read", at: Date.now() - 1000 * 60 * 2 },
        { id: "3", text: "thank you", at: Date.now() - 1000 * 60 * 1 },
      ];
      setComments(seeded);
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(seeded));
    }

    // load tips
    const t = localStorage.getItem(TIPS_KEY);
    setTipsTotal(t ? Number(t) : 0);

    return () => stopLive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startLive() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsLive(true);
    } catch (e: any) {
      setError(e?.message || "Camera permission denied.");
      setIsLive(false);
    }
  }

  function stopLive() {
    const stream = streamRef.current;
    if (stream) stream.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsLive(false);
  }

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
              <div className="text-xs text-white/60">Start a Live Class</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5" href="/feed">
              Back to Feed
            </a>

            {!isLive ? (
              <button className="px-4 py-2 rounded-xl bg-violet-600 font-semibold" onClick={startLive}>
                Go Live
              </button>
            ) : (
              <button className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5" onClick={stopLive}>
                End Live
              </button>
            )}
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-10 grid lg:grid-cols-12 gap-6">
        {/* VIDEO */}
        <div className="lg:col-span-7 border border-white/10 rounded-3xl p-5 bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-extrabold">Your camera</div>
              <div className="text-sm text-white/70 mt-1">This is your live class preview (MVP).</div>
            </div>
          </div>

          {error && (
            <div className="mt-4 text-sm text-red-200 border border-red-500/30 bg-red-500/10 rounded-2xl p-3">
              {error}
            </div>
          )}

          <div className="mt-4 relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
            {/* LIVE badge TOP-RIGHT */}
            {isLive && (
              <div className="absolute top-3 right-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/15 border border-red-500/30">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm font-semibold text-red-200">LIVE</span>
              </div>
            )}

            <video ref={videoRef} className="w-full h-auto" playsInline muted autoPlay />
          </div>

          <div className="mt-4 text-xs text-white/50">
            If the preview is black, click <span className="text-white/70">Go Live</span> and allow camera/mic.
          </div>

          {/* TIP JAR under video */}
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

        {/* COMMENTS */}
        <div className="lg:col-span-5 border border-white/10 rounded-3xl p-6 bg-white/5">
          <div className="text-xl font-extrabold">Comments</div>
          <div className="mt-2 text-sm text-white/70">Preloaded student messages + your replies.</div>

          <div className="mt-4 flex gap-2">
            <input
              className="flex-1 p-3 rounded-xl bg-black/30 border border-white/10"
              placeholder="Type a comment…"
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

          <div className="mt-5 space-y-3 max-h-[560px] overflow-auto pr-1">
            {comments.map((c) => (
              <div key={c.id} className="border border-white/10 rounded-2xl p-3 bg-black/20">
                <div className="text-sm">{c.text}</div>
                <div className="text-[11px] text-white/50 mt-1">{fmt(c.at)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
