"use client";

import { useEffect, useRef, useState } from "react";

type Comment = {
  id: string;
  user: string;
  text: string;
  at: number;
};

function fmt(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const STORAGE_KEY = "unimate_live_comments_v1";

export default function TeachLivePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isLive, setIsLive] = useState(false);
  const [camOn, setCamOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  const [cameraError, setCameraError] = useState<string | null>(null);

  const [name, setName] = useState("tutor01");
  const [text, setText] = useState("");

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setComments(JSON.parse(raw));
        return;
      } catch {
        // ignore broken storage
      }
    }

    const seeded: Comment[] = [
      { id: "seed1", user: "student01", text: "How do I do that effectively?", at: Date.now() - 1000 * 60 * 4 },
      { id: "seed2", user: "student02", text: "What else should I read?", at: Date.now() - 1000 * 60 * 3 },
      { id: "seed3", user: "student03", text: "Thank you!", at: Date.now() - 1000 * 60 * 2 },
    ];

    setComments(seeded);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  }, []);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startCamera() {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }

      applyTrackStates(stream, camOn, micOn);
    } catch (err: any) {
      setCameraError(
        "Camera/microphone access is blocked. Please allow permissions in your browser and refresh."
      );
    }
  }

  function stopCamera() {
    const stream = streamRef.current;
    if (!stream) return;
    stream.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }

  function applyTrackStates(stream: MediaStream, cameraEnabled: boolean, micEnabled: boolean) {
    stream.getVideoTracks().forEach((t) => (t.enabled = cameraEnabled));
    stream.getAudioTracks().forEach((t) => (t.enabled = micEnabled));
  }

  function toggleCam() {
    const stream = streamRef.current;
    const next = !camOn;
    setCamOn(next);
    if (stream) applyTrackStates(stream, next, micOn);
  }

  function toggleMic() {
    const stream = streamRef.current;
    const next = !micOn;
    setMicOn(next);
    if (stream) applyTrackStates(stream, camOn, next);
  }

  function startLive() {
    setIsLive(true);
  }

  function endLive() {
    setIsLive(false);
  }

  function addComment() {
    const who = name.trim() || "tutor01";
    const msg = text.trim();
    if (!msg) return;

    const next: Comment = { id: String(Date.now()), user: who, text: msg, at: Date.now() };
    const updated = [next, ...comments];
    setComments(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setText("");
  }

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <header className="border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600 grid place-items-center font-extrabold">U</div>
            <div>
              <div className="font-extrabold leading-4">UniMate</div>
              <div className="text-xs text-white/60">Tutor Live</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`px-3 py-2 rounded-xl border text-sm flex items-center gap-2 ${
                isLive ? "bg-red-500/20 border-red-400/40" : "bg-white/5 border-white/10"
              }`}
            >
              <span
                className={`inline-block w-2.5 h-2.5 rounded-full ${
                  isLive ? "bg-red-500 animate-pulse" : "bg-white/30"
                }`}
              />
              <span className="font-semibold">{isLive ? "LIVE" : "OFFLINE"}</span>
            </div>

            <a href="/feed" className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5">
              Back to Feed
            </a>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <div className="border border-white/10 rounded-3xl p-5 bg-white/5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-white/60">You are teaching</div>
                <div className="text-xl font-extrabold">Live Session</div>
                <div className="text-xs text-white/50 mt-1">MVP preview (not broadcasting to others yet)</div>
              </div>

              {isLive ? (
                <button
                  onClick={endLive}
                  className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 font-semibold"
                >
                  End Live
                </button>
              ) : (
                <button onClick={startLive} className="px-4 py-2 rounded-xl bg-red-500 font-semibold">
                  Start Live
                </button>
              )}
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/40 relative">
              {cameraError ? (
                <div className="p-6 text-sm text-white/70">
                  <div className="font-semibold text-white">Camera access required</div>
                  <div className="mt-2">{cameraError}</div>
                  <div className="mt-4 text-white/60">
                    Tip: In Chrome, click the lock icon in the address bar → Site settings → Allow Camera & Microphone.
                  </div>
                </div>
              ) : (
                <>
                  <video ref={videoRef} className="w-full h-auto" playsInline autoPlay />
                  {isLive && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-red-500/80 text-xs font-bold border border-white/20">
                      LIVE
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={toggleCam}
                className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 font-semibold"
              >
                {camOn ? "Camera On" : "Camera Off"}
              </button>

              <button
                onClick={toggleMic}
                className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 font-semibold"
              >
                {micOn ? "Mic On" : "Mic Off"}
              </button>

              <button
                onClick={() => {
                  stopCamera();
                  startCamera();
                }}
                className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 font-semibold"
              >
                Restart Camera
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="border border-white/10 rounded-3xl p-6 bg-white/5">
            <div className="text-xl font-extrabold">Live Comments</div>
            <div className="text-sm text-white/60 mt-1">Answer questions while you teach.</div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <input
                className="col-span-1 p-3 rounded-xl bg-black/30 border border-white/10"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="col-span-2 p-3 rounded-xl bg-black/30 border border-white/10"
                placeholder="Type a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addComment();
                }}
              />
            </div>

            <button onClick={addComment} className="w-full mt-2 px-4 py-3 rounded-xl bg-violet-600 font-semibold">
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
        </div>
      </section>
    </main>
  );
}
