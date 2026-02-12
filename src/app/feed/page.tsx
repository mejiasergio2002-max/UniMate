"use client";

import { useMemo, useState } from "react";

type Vid = { id: string; src: string; username: string; topic: "math" | "english" };

const VIDEOS: Vid[] = [
  { id: "math-1", src: "/videos/math/math-1.mp4", username: "math.tutor01", topic: "math" },
  { id: "math-2", src: "/videos/math/math-2.mp4", username: "math.tutor02", topic: "math" },
  { id: "math-3", src: "/videos/math/math-3.mp4", username: "math.tutor03", topic: "math" },

  { id: "english-1", src: "/videos/english/english-1.mp4", username: "english.tutor01", topic: "english" },
  { id: "english-2", src: "/videos/english/english-2.mp4", username: "english.tutor02", topic: "english" },
  { id: "english-3", src: "/videos/english/english-3.mp4", username: "english.tutor03", topic: "english" },
];

export default function FeedPage() {
  const [topic, setTopic] = useState<"math" | "english">("math");
  const [search, setSearch] = useState("");

  const videos = useMemo(() => {
    const base = VIDEOS.filter((v) => v.topic === topic);
    const q = search.trim().toLowerCase();
    if (!q) return base;
    return base.filter((v) => v.id.includes(q) || v.username.toLowerCase().includes(q));
  }, [topic, search]);

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      {/* TOP NAV */}
      <header className="border-b border-white/10 bg-black/20">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600 grid place-items-center font-extrabold">U</div>
            <div>
              <div className="font-extrabold leading-4">UniMate</div>
              <div className="text-xs text-white/60">Feed</div>
            </div>
          </div>

          <nav className="flex items-center gap-2 text-sm">
            <a href="/feed" className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
              Home
            </a>
            <a href="/tutors" className="px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5">
              My Tutors
            </a>
            <a href="/profile" className="px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5">
              My Profile
            </a>
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-6">
        {/* LEFT: START TEACHING */}
        <div className="border border-white/10 rounded-3xl p-6 bg-white/5">
          <h2 className="text-xl font-extrabold">Start teaching</h2>
          <p className="mt-2 text-white/70 text-sm">Go live instantly and teach students in real time.</p>

          <a
            href="/teach"
            className="inline-flex items-center gap-2 mt-4 px-4 py-3 rounded-xl bg-red-500 font-semibold"
          >
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            Go LIVE now
          </a>

          <div className="mt-5 text-sm text-white/60">UniMate now in 200+ Universities across the globe</div>
        </div>

        {/* RIGHT: JOIN A CLASS */}
        <div className="border border-white/10 rounded-3xl p-6 bg-white/5">
          <h2 className="text-xl font-extrabold">Join a class</h2>
          <p className="mt-2 text-white/70 text-sm">Pick a topic, then click a video.</p>

          {/* topic buttons */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setTopic("math")}
              className={`px-4 py-2 rounded-xl border ${
                topic === "math" ? "bg-violet-600 border-violet-500" : "border-white/10 hover:bg-white/5"
              } font-semibold`}
            >
              Math
            </button>
            <button
              onClick={() => setTopic("english")}
              className={`px-4 py-2 rounded-xl border ${
                topic === "english" ? "bg-violet-600 border-violet-500" : "border-white/10 hover:bg-white/5"
              } font-semibold`}
            >
              English
            </button>
          </div>

          {/* search */}
          <div className="mt-3">
            <input
              className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
              placeholder="Search video or tutor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* videos */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {videos.map((v) => (
              <a key={v.id} href={`/class/${v.id}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 group-hover:border-white/30 transition">
                  <video
                    className="h-28 w-full object-cover"
                    src={v.src}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                  />
                </div>
                <div className="mt-2 text-xs text-white/80 truncate">@{v.username}</div>
              </a>
            ))}
          </div>

          {videos.length === 0 && <div className="mt-4 text-sm text-white/60">No results.</div>}
        </div>
      </section>
    </main>
  );
}
