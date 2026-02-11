"use client";

import { useEffect, useMemo, useState } from "react";

type Room = {
  id: string;
  topic: string;
  isPublic: boolean;
  tipsTotal: number;
  createdAt: number;
  hostName: string;
  hostUserId: string;
};

type User = { id: string; name: string; email: string };

const FEED_VIDEOS = [
  // Put your real files in /public/videos and update names here
  { src: "/videos/study-1.mp4", title: "Focus Mode" },
  { src: "/videos/study-2.mp4", title: "Late Night Grind" },
  { src: "/videos/study-3.mp4", title: "Deep Work" },
  { src: "/videos/study-4.mp4", title: "Chill Study" },
];

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function FeedPage() {
  const [me, setMe] = useState<User | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

  const token = useMemo(
    () => (typeof window !== "undefined" ? localStorage.getItem("unimate_token") : null),
    []
  );

  async function loadRooms() {
    setLoading(true);
    setMsg(null);

    const res = await fetch("/api/rooms", {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    const data = await res.json();
    if (!res.ok) {
      setLoading(false);
      setMsg(data.error || "Failed to load feed");
      return;
    }

    setMe(data.me ? { id: data.me.id, name: data.me.name, email: data.me.email } : null);
    setRooms(data.rooms || []);
    setLoading(false);
  }

  useEffect(() => {
    loadRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createRoom() {
    setMsg(null);
    if (!token) return setMsg("Please login or register to start teaching.");
    if (!topic.trim()) return setMsg("Enter a topic.");

    const res = await fetch("/api/create-room", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ topic, isPublic }),
    });

    const data = await res.json();
    if (!res.ok) return setMsg(data.error || "Failed to create room");

    window.location.href = `/room/${data.roomId}`;
  }

  function logout() {
    localStorage.removeItem("unimate_token");
    localStorage.removeItem("unimate_user");
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0b1020]/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600 grid place-items-center font-extrabold">U</div>
            <div>
              <div className="font-extrabold leading-4">UniMate</div>
              <div className="text-xs text-white/60">Feed</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            {me ? (
              <>
                <div className="text-white/70 hidden sm:block">
                  {me.name} <span className="text-white/40">({me.email})</span>
                </div>
                <button
                  className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5"
                  onClick={loadRooms}
                >
                  Refresh
                </button>
                <button
                  className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a className="text-white/80 hover:text-white" href="/login">
                  Login
                </a>
                <a className="px-4 py-2 rounded-xl bg-violet-600 font-semibold" href="/register">
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero vibe */}
      <section className="max-w-6xl mx-auto px-6 pt-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          {/* glow */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-violet-600/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative p-7 md:p-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold">
                  UniMate. Your study buddy.
                  <span className="text-white/60"> Anytime, Anywhere.</span>
                </h1>
                <p className="mt-3 text-white/70 max-w-2xl">
                  Join classes, jump into live public rooms, or start teaching your own session.
                </p>
              </div>

              <div className="flex gap-3">
                <a href="/" className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5">
                  Home
                </a>
                <a href="/register" className="px-4 py-2 rounded-xl bg-violet-600 font-semibold">
                  Start teaching
                </a>
              </div>
            </div>

            {/* Video mood wall */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              {FEED_VIDEOS.map((v) => (
                <div
                  key={v.src}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                >
                  <video
                    className="h-36 md:h-40 w-full object-cover"
                    src={v.src}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="text-sm font-semibold">{v.title}</div>
                    <div className="text-[11px] text-white/60">UniMate Vibe</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-xs text-white/50">
              Tip: If videos don’t play automatically on some browsers, click once on a card to start playback.
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-12 gap-6">
        {/* Left: Create room */}
        <div className="lg:col-span-5 border border-white/10 rounded-3xl p-6 bg-white/5">
          <h2 className="text-xl font-extrabold">Start teaching</h2>
          <p className="mt-2 text-white/70 text-sm">
            Create a room and share it. Public rooms show up in the feed.
          </p>

          <div className="mt-4 space-y-3">
            <input
              className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
              placeholder="Topic (e.g. Calculus, Guitar, Python)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />

            <label className="flex items-center gap-2 text-sm text-white/70">
              <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
              Public room (unchecked = 1-on-1)
            </label>

            {msg && <div className="text-sm text-white/70">{msg}</div>}

            <button className="w-full p-3 rounded-xl bg-violet-600 font-semibold" onClick={createRoom}>
              Create room
            </button>

            {!token && (
              <div className="text-xs text-white/50">
                You need to login/register to create rooms.
              </div>
            )}
          </div>
        </div>

        {/* Right: Rooms feed */}
        <div className="lg:col-span-7 border border-white/10 rounded-3xl p-6 bg-white/5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold">Join a class</h2>
              <p className="mt-1 text-white/70 text-sm">Live public rooms will appear here.</p>
            </div>

            <button
              className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-sm"
              onClick={loadRooms}
            >
              Refresh
            </button>
          </div>

          <div className="mt-5">
            {loading ? (
              <div className="text-white/60">Loading…</div>
            ) : rooms.length === 0 ? (
              <div className="text-white/60">No rooms yet. Create the first one.</div>
            ) : (
              <div className="space-y-3">
                {rooms.map((r) => (
                  <div key={r.id} className="group border border-white/10 rounded-2xl p-4 bg-black/20 hover:bg-black/25 transition">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-bold truncate">{r.topic}</div>
                        <div className="text-xs text-white/60 mt-1">
                          Host: {r.hostName} • {r.isPublic ? "Public" : "1-on-1"} • Tips: {r.tipsTotal} •{" "}
                          {timeAgo(r.createdAt)}
                        </div>
                      </div>
                      <a
                        className="px-4 py-2 rounded-xl bg-violet-600 font-semibold text-sm whitespace-nowrap"
                        href={`/room/${r.id}`}
                      >
                        Join
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 text-xs text-white/40">
            Feed shows public rooms + your own rooms (if logged in).
          </div>
        </div>
      </section>
    </main>
  );
}
