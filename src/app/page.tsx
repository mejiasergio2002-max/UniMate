export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      {/* NAVBAR */}
      <header className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-600 grid place-items-center font-extrabold">
            U
          </div>
          <div>
            <div className="font-extrabold leading-4">UniMate</div>
            <div className="text-xs text-white/60">
              Your study buddy
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-3 text-sm">
          <a
            className="text-white/80 hover:text-white"
            href="/login"
          >
            Login
          </a>
          <a
            className="px-4 py-2 rounded-xl bg-violet-600 font-semibold"
            href="/register"
          >
            Register
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            UniMate.
            <br />
            Your study buddy.
            <br />
            Anytime, Anywhere
          </h1>

          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-xl">
            Learn together. Teach together. Join live study sessions,
            1-on-1 tutorials, and public classes from anywhere in the world.
          </p>

          <div className="mt-10 flex gap-4 flex-wrap">
            <a
              className="px-6 py-3 rounded-xl bg-violet-600 font-semibold text-base"
              href="/register"
            >
              Start teaching
            </a>
            <a
              className="px-6 py-3 rounded-xl border border-white/10 text-base hover:bg-white/5"
              href="/rooms"
            >
              Join a class
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="border border-white/10 rounded-3xl p-8 bg-white/5 backdrop-blur">
          <div className="text-2xl font-extrabold">
            UniMate now in
          </div>
          <div className="mt-2 text-4xl font-extrabold text-violet-400">
            200+ Universities
          </div>
          <div className="mt-1 text-white/70">
            across the globe
          </div>

          <div className="mt-6 text-sm text-white/50">
            Built for students. Powered by community.
          </div>
        </div>
      </section>
    </main>
  );
}
