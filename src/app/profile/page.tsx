"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("Student");
  const [handle, setHandle] = useState("student01");

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold">My Profile</div>
            <div className="text-white/60 text-sm">MVP profile settings (local only)</div>
          </div>

          <a className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5" href="/feed">
            Back to Home
          </a>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-6 py-10">
        <div className="border border-white/10 rounded-3xl p-6 bg-white/5">
          <label className="block text-sm text-white/70">Display name</label>
          <input
            className="mt-2 w-full p-3 rounded-xl bg-black/30 border border-white/10"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block text-sm text-white/70 mt-5">Username</label>
          <input
            className="mt-2 w-full p-3 rounded-xl bg-black/30 border border-white/10"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
          />

          <div className="mt-6 text-sm text-white/60">
            Next step: connect this to auth (register/login) and store in DB.
          </div>
        </div>
      </section>
    </main>
  );
}
