"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Topic = "math" | "english";

type VideoItem = {
  id: string;            // route id e.g. "math-1"
  topic: Topic;          // "math" | "english"
  src: string;           // public path e.g. "/videos/math/math-1.mp4"
  title: string;         // label
  username: string;      // shown under thumbnail
};

const VIDEOS: VideoItem[] = [
  { id: "math-1", topic: "math", src: "/videos/math/math-1.mp4", title: "Math 1", username: "math.tutor01" },
  { id: "math-2", topic: "math", src: "/videos/math/math-2.mp4", title: "Math 2", username: "math.tutor02" },
  { id: "math-3", topic: "math", src: "/videos/math/math-3.mp4", title: "Math 3", username: "math.tutor03" },

  { id: "english-1", topic: "english", src: "/videos/english/english-1.mp4", title: "English 1", username: "english.tutor01" },
  { id: "english-2", topic: "english", src: "/videos/english/english-2.mp4", title: "English 2", username: "english.tutor02" },
  { id: "english-3", topic: "english", src: "/videos/english/english-3.mp4", title: "English 3", username: "english.tutor03" },
];

export default function FeedPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    // Special behavior you asked for:
    // - search "math" -> show math videos
    // - search "english" -> show english videos
    // - otherwise, filter by id/title/username/topic
    if (q === "math") return VIDEOS.filter((v) => v.topic === "math");
    if (q === "english") return VIDEOS.filter((v) => v.topic === "english");

    if (!q) return VIDEOS;

    return VIDEOS.filter((v) => {
      return (
        v.id.includes(q) ||
        v.title.toLowerCase().includes(q) ||
        v.username.toLowerCase().includes(q) ||
        v.topic.includes(q)
      );
    });
  }, [query]);

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      {/* TOP NAV */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600 grid place-items-center font-extrabold">U</div>
            <div>
              <div className="font-extrabold leading-4">UniMate</div>
              <div className="text-xs text-white/60">Feed</div>
            </div>
          </div>

          <nav className="flex items-center gap-2 text-sm">
            <Link href="/feed" className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
              Home
            </Link>
            <Link href="/tutors" className="px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5">
              My Tutors
            </Link>
            <Link href="/profile" className="px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5">
              My Account
            </Link>
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-8">
        {/* SEARCH */}
        <div className="border border-white/10 rounded-3xl p-5 bg-white/5">
          <div className="text-lg font-extrabold">Search</div>
          <div className="text-sm text-white/70 mt-1">
            Type <span className="font-semibold">math</span> to show Math videos, or{" "}
            <span className="font-semibold">english</span> to show English videos.
          </div>

          <input
            className="mt-4 w-full p-3 rounded-xl bg-black/30 border border-white/10"
            placeholder="Search: math / english / tutor name / video id..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* RESULTS */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((v) => (
            <Link key={v.id} href={`/class/${v.id}`} className="group block">
              <div className="border border-white/10 bg-white/5 rounded-3xl overflow-hidden hover:border-white/30 transition">
                <div className="relative bg-black/30">
                  <video
                    className="w-full h-44 object-cover"
                    src={v.src}
                    muted
                    playsInline
                    preload="metadata"
                    // NOTE: autoplay preview may be blocked on some browsers unless muted (we are muted)
                    autoPlay
                    loop
                  />
                  <div className="absolute top-3 left-3 text-xs px-2 py-1 rounded-lg bg-black/60 border border-white/10">
                    {v.topic.toUpperCase()}
                  </div>
                </div>

                <div className="p-4">
                  <div className="font-semibold">{v.title}</div>
                  <div className="text-xs text-white/70 mt-1">@{v.username}</div>
                  <div className="text-xs text-white/50 mt-2">Click to open room</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-6 text-white/60 text-sm">No videos found for that search.</div>
        )}
      </section>
    </main>
  );
}
