export default function TutorsPage() {
  const tutors = [
    { handle: "math.tutor01", subject: "Math" },
    { handle: "math.tutor02", subject: "Math" },
    { handle: "math.tutor03", subject: "Math" },
    { handle: "english.tutor01", subject: "English" },
    { handle: "english.tutor02", subject: "English" },
    { handle: "english.tutor03", subject: "English" },
  ];

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold">My Tutors</div>
            <div className="text-white/60 text-sm">Saved tutors (MVP placeholder)</div>
          </div>

          <a className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5" href="/feed">
            Back to Home
          </a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tutors.map((t) => (
          <div key={t.handle} className="border border-white/10 rounded-3xl p-5 bg-white/5">
            <div className="text-white/60 text-sm">{t.subject}</div>
            <div className="text-xl font-extrabold">@{t.handle}</div>
            <div className="mt-4 text-sm text-white/70">
              MVP: later this becomes “follow tutor”, availability, and private class booking.
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
