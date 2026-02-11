"use client";

import { useEffect, useMemo, useState } from "react";
import { videosBySubject, type UniMateVideo } from "../../lib/videos";

type Room = {
  id: string;
  topic: string;
  isPublic: boolean;
  tipsTotal: number;
  createdAt: number;
  hostName: string;
};

type User = { id: string; name: string; email: string };

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
  const [msg, setMsg] = useState<string | null>(null);

  // Start teaching
  const [topic, setTopic] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  // Join a class search (math for now)
  const [search, setSearch] = useState("math");

  const token = useMemo(
    () => (typeof window !== "undefined" ? localStorage.getItem("unimate_token") : null),
    []
  );

  async function loadFeed() {
    setLoading(true);
    setMsg(null);

    const res = await fetch("/api/rooms", {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    const data = await res.json();
    if (!res.ok) {
      setLoading(false);
      setMsg(data.error || "Failed to load rooms");
      return;
    }

    const meData = data.me ? { id: data.me.id, name: data.me.name, email: data.me.email } : null;
    setMe(meData);

    const publicRooms = (data.rooms || []).filter((r: Room) => r.isPublic);
    setRooms(publicRooms);

    setLoading(false);
  }

  useEffect(() => {
    loadFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createRoom() {
    setMsg(null);
    if (!token) return setMsg("Please register to start teaching.");
    if (!topic.trim()) return setMsg("Enter a topic.");

    const res = await fetch("/api/create-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

  const videos: UniMateVideo[] = videosBySubject(search);

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      {/* HEADER */}
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
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
            {me ? (
              <>
                <span className="text-white/70 hidden sm:block">
                  {me.name} <span className="text-white/40">({me.email})</span>
                </span>
                <button
                  className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5"
                  onClick={loadFeed}
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

      <section className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-6">
        {/* START TEACHING */}
        <div className="border border-white/10 rounded-3xl p-6 bg-white/5">
          <h2 className="text-xl font-extrabold">Start teaching</h2>
          <p className="mt-2 text-white/70 text-sm">
            Create a room and share it. Public rooms appear in the feed.
          </p>

          {/* Optional: link to Teach page */}
          <a
            href="/teach"
            className="inline-block mt-4 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-sm"
          >
            Open Teach (Go Live)
          </a>

          <div className="mt-4 space-y-3">
            <input
              className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
              placeholder="Topic (e.g. Algebra, Guitar, Python)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />

            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              Public room
            </label>

            {msg && <div className="text-sm text-white/70">{msg}</div>}

            <button
              className="w-full p-3 rounded-xl bg-violet-600 font-semibold"
              onClick={createRoom}
            >
              Create room
            </button>
          </div>
        </div>

        {/* JOIN A CLASS */}
        <div className="border border-white/10 rounded-3xl p-6 bg-white/5">
          <h2 className="text-xl font-extrabold">Join a class</h2>
          <p className="mt-2 text-white/70 text-sm">
            Search a subject (currently: <span className="text-white/80">math</span>)
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

          {/* MINI VIDEO GRID */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {videos.map((v) => (
              <a key={v.id} href={`/class/${v.id}`} className="block">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 hover:border-white/20 transition">
                  <video
                    className="h-24 w-full object-cover"
                    src={v.src}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                  />
                </div>
                <div className="mt-2 text-xs text-white/70 truncate">{v.username}</div>
              </a>
            ))}
          </div>

          {/* PUBLIC ROOMS */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white/80">Public rooms</div>
              <button
                className="px-3 py-1.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs"
                onClick={loadFeed}
              >
                Refresh
              </button>
            </div>

            <div className="mt-3">
              {loading ? (
                <div className="text-white/60 text-sm">Loading…</div>
              ) : rooms.length === 0 ? (
                <div className="text-white/60 text-sm">No public rooms yet.</div>
              ) : (
                <div className="space-y-3">
                  {rooms.map((r) => (
                    <div key={r.id} className="border border-white/10 rounded-2xl p-4 bg-black/20">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="font-bold truncate">{r.topic}</div>
                          <div className="text-xs text-white/60 mt-1">
                            Host: {r.hostName} • Tips: {r.tipsTotal} • {timeAgo(r.createdAt)}
                          </div>
                        </div>
                        <a className="px-4 py-2 rounded-xl bg-violet-600 font-semibold text-sm" href={`/room/${r.id}`}>
                          Join
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
