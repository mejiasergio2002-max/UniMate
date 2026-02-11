import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <header className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-600 grid place-items-center font-extrabold">U</div>
          <div>
            <div className="font-extrabold leading-4">UniMate</div>
            <div className="text-xs text-white/60">Teach • Learn • Tip</div>
          </div>
        </div>
        <nav className="flex items-center gap-3 text-sm">
          <Link className="text-white/80 hover:text-white" href="/dashboard">Dashboard</Link>
          <Link className="text-white/80 hover:text-white" href="/login">Login</Link>
          <Link className="px-4 py-2 rounded-xl bg-violet-600 font-semibold" href="/register">Register</Link>
        </nav>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-5xl font-extrabold leading-tight">1-on-1 tutorials + public rooms + tips.</h1>
          <p className="mt-4 text-white/70 leading-relaxed">
            UniMate is like Bandmate: teach online, create public rooms, and accept tips.
            Start simple, then add video + payments.
          </p>
          <div className="mt-8 flex gap-3 flex-wrap">
            <Link className="px-5 py-3 rounded-xl bg-violet-600 font-semibold" href="/register">Start teaching</Link>
            <Link className="px-5 py-3 rounded-xl border border-white/10" href="/dashboard">Go to dashboard</Link>
          </div>
        </div>

        <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
          <div className="font-bold">MVP</div>
          <ul className="mt-3 space-y-2 text-white/70 list-disc pl-5">
            <li>Register / Login</li>
            <li>Create room (1:1 or public)</li>
            <li>Room page (/room/[id])</li>
            <li>Tip button for rooms</li>
          </ul>
          <div className="mt-6 text-xs text-white/50">
            (This demo uses in-memory storage. Next step: real DB + Stripe + WebRTC.)
          </div>
        </div>
      </section>
    </main>
  );
}
