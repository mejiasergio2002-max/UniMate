"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const r = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) return setMsg(data.error || "Failed");

    setMsg("Registered! Now login.");
    r.push("/login");
  }

  return (
    <main className="min-h-screen bg-[#0b1020] text-white flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md border border-white/10 bg-white/5 rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Register</h1>
        <p className="text-white/60 text-sm mt-1">Create your UniMate account.</p>

        <div className="mt-5 space-y-3">
          <input className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
            placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
          <input className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
            placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
            placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>

        {msg && <div className="mt-4 text-sm text-white/70">{msg}</div>}

        <button className="mt-5 w-full p-3 rounded-xl bg-violet-600 font-semibold">Create account</button>
        <Link className="block mt-3 text-sm text-white/70 hover:text-white" href="/login">Already have an account? Login</Link>
      </form>
    </main>
  );
}
