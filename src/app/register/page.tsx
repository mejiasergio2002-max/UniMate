"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onRegister(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        setMsg(data.error || "Register failed");
        return;
      }

      if (data.token) localStorage.setItem("unimate_token", data.token);
      if (data.user) localStorage.setItem("unimate_user", JSON.stringify(data.user));

      setLoading(false);
      window.location.href = "/feed";
    } catch (err: any) {
      setLoading(false);
      setMsg(err?.message || "Register failed");
    }
  }

  return (
    <main className="min-h-screen bg-[#0b1020] text-white grid place-items-center px-6">
      <div className="w-full max-w-md border border-white/10 rounded-3xl p-6 bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-600 grid place-items-center font-extrabold">U</div>
          <div>
            <div className="font-extrabold leading-4">UniMate</div>
            <div className="text-xs text-white/60">Register</div>
          </div>
        </div>

        <h1 className="mt-5 text-2xl font-extrabold">Create your account</h1>
        <p className="mt-2 text-white/70 text-sm">Start teaching or join a class in seconds.</p>

        <form onSubmit={onRegister} className="mt-6 space-y-3">
          <input
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {msg && <div className="text-sm text-white/70">{msg}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-xl bg-violet-600 font-semibold disabled:opacity-60"
          >
            {loading ? "Creating..." : "Register"}
          </button>

          <div className="text-sm text-white/70 text-center pt-2">
            Already have an account?{" "}
            <a className="text-white hover:underline" href="/login">
              Login
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
