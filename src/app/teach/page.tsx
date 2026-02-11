"use client";

import { useEffect, useRef, useState } from "react";

type Comment = {
  id: string;
  user: string;
  text: string;
  at: number;
};

export default function TeachPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [live, setLive] = useState(false);

  async function goLive() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
    setLive(true);
  }

  function send() {
    if (!text.trim()) return;
    setComments([
      {
        id: String(Date.now()),
        user: "student01",
        text,
        at: Date.now(),
      },
      ...comments,
    ]);
    setText("");
  }

  return (
    <main className="min-h-screen bg-[#0b1020] text-white px-6 py-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <div className="relative">
            {live && (
              <div className="absolute top-3 right-3 bg-red-600 px-3 py-1 rounded-xl text-sm">
                LIVE
              </div>
            )}
            <video ref={videoRef} muted className="w-full rounded-2xl border border-white/10" />
          </div>

          {!live && (
            <button
              onClick={goLive}
              className="mt-4 px-6 py-3 bg-red-600 rounded-xl font-bold"
            >
              Go Live
            </button>
          )}
        </div>

        <div className="lg:col-span-5 border border-white/10 rounded-3xl p-5 bg-white/5">
          <div className="font-bold">Comments</div>

          <div className="mt-3 flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 p-3 rounded-xl bg-black/30 border border-white/10"
              placeholder="Reply to students…"
            />
            <button onClick={send} className="px-4 py-2 bg-violet-600 rounded-xl">
              Send
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="border border-white/10 rounded-xl p-3">
                <div className="text-xs text-white/60">{c.user}</div>
                <div>{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
