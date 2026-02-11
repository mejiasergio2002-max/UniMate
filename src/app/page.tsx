export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      {/* Top Nav */}
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600 grid place-items-center font-extrabold">
              U
            </div>
            <div>
              <div className="font-extrabold leading-4">UniMate</div>
              <div className="text-xs text-white/60">Your study buddy</div>
            </div>
          </div>

          {/* ✅ Right buttons */}
          <div className="flex items-center gap-3 text-sm">
            <a className="text-white/80 hover:text-white" href="/feed">
              Enter feed
            </a>
            <a className="text-white/80 hover:text-white" href="/login">
              Login
            </a>
            <a className="px-4 py-2 rounded-xl bg-violet-600 font-semibold" href="/register">
              Register
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          UniMate. Your study buddy. Anytime, Anywhere
        </h1>

        <p className="mt-4 text-white/70 max-w-2xl">
          Join classes, watch short lessons, or start teaching.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a className="px-6 py-3 rounded-xl bg-violet-600 font-semibold" href="/register">
            Start teaching
          </a>
          <a className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 font-semibold" href="/feed">
            Join a class
          </a>
        </div>

        <div className="mt-10 text-white/60 text-sm">
          UniMate now in 200+ Universities across the globe
        </div>
      </section>
    </main>
  );
}
