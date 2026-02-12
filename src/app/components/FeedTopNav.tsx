"use client";

import Link from "next/link";

export default function FeedTopNav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-black/70 backdrop-blur border-b border-white/10">
      <div className="text-lg font-semibold text-white">
        UniMate
      </div>

      <div className="flex gap-6 text-sm text-white/70">
        <Link href="/feed" className="hover:text-white transition">
          Home
        </Link>

        <Link href="/tutors" className="hover:text-white transition">
          My Tutors
        </Link>

        <Link href="/profile" className="hover:text-white transition">
          My Account
        </Link>
      </div>
    </nav>
  );
}
