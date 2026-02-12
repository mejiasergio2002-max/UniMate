import FeedTopNav from "../components/FeedTopNav";
import Link from "next/link";

export default function FeedPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-slate-900 text-white">
      {/* TOP NAV */}
      <FeedTopNav />

      {/* FEED CONTENT (UNCHANGED) */}
      <section className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Link href="/class/math-1">
          <div className="rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition">
            <video
              src="/videos/math-1.mp4"
              muted
              preload="metadata"
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <div className="text-sm font-medium">Math Basics</div>
              <div className="text-xs text-white/60">@tutor1</div>
            </div>
          </div>
        </Link>

        <Link href="/class/math-2">
          <div className="rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition">
            <video
              src="/videos/math-2.mp4"
              muted
              preload="metadata"
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <div className="text-sm font-medium">Algebra</div>
              <div className="text-xs text-white/60">@tutor2</div>
            </div>
          </div>
        </Link>

        <Link href="/class/math-3">
          <div className="rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition">
            <video
              src="/videos/math-3.mp4"
              muted
              preload="metadata"
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <div className="text-sm font-medium">Geometry</div>
              <div className="text-xs text-white/60">@tutor3</div>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
