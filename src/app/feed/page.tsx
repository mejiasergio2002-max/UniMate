"use client";

import { useState } from "react";
import { videosBySubject, type UniMateVideo } from "../../lib/videos";

export default function FeedPage() {
  // Start teaching
  const [topic, setTopic] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  // Join a class search (math only for now)
  const [search, setSearch] = useState("math");

  const videos: UniMateVideo[] = videosBySubject(search);

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      {/* HEADER */}
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600 grid place-items-center font-extrabold">
              U
            </div>
            <div>
              <div className="font-extrabold leading-4">UniMate</div>
              <div className="text-xs text-white/60">Feed</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <a className="text-white/80 hover:text-white" href="/login">
              Login
            </a>
            <a className="px-4 py-2 rounded-xl bg-violet-600 font-semibold" href="/register">
              Register
            </a>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-6">
        {/* ================= START TEACHING CARD ================= */}
        <div className="border border-white/10 rounded-3xl p-6 bg-white/5">
          <h2 className="text-xl font-extrabold">Start teaching</h2>
          <p className="mt-2 text-white/70 text-sm">
            Go live instantly and teach students in real time.
          </p>

          {/* LIVE LINK */}
          <a
            href="/teach"
            className="inline-flex items-center gap-2 mt-4 px-4 py-3 rounded-xl bg-red-500 font-semibold"
          >
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            Go LIVE now
          </a>

          {/* OPTIONAL META (kept simple) */}
          <div className="mt-5 space-y-3">
            <input
              className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
              placeholder="Topic (optional)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />

            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              Public class
            </label>
          </div>
        </div>

        {/* ================= JOIN A CLASS CARD ================= */}
        <div className="border border-white/10 rounded-3xl p-6 bg-white/5">
          <h2 className="text-xl font-extrabold">Join a class</h2>
          <p className="mt-2 text-white/70 text-sm">
            Browse short classes (currently: math)
          </p>

          {/* SEARCH */}
          <div className="mt-4">
            <input
              className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
              placeholder='Search subject (try "math")'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* VIDEO GRID */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {videos.map((v) => (
              <a
                key={v.id}
                href={`/class/${v.id}`}
                className="group block"
              >
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
                <div className="mt-2 text-xs text-white/80 truncate">
                  @{v.username}
                </div>
              </a>
            ))}
          </div>

          {videos.length === 0 && (
            <div className="mt-4 text-sm text-white/60">
              No classes found.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
