export default function MyTutorsPage() {
  const mathTutors = [
    "algebra.ace",
    "calc.with.jane",
    "numbers.nate",
    "mathby.milo",
    "linear.liam",
    "stats.sophie",
    "geometry.guy",
    "equation.ella",
    "themathdesk",
    "pi.prof",
  ];

  const englishTutors = [
    "grammar.grace",
    "essay.emma",
    "english.with.jack",
    "lit.lucas",
    "writewith.sara",
    "vocab.victor",
    "poetry.paul",
    "syntax.sophie",
    "readwith.rose",
    "wordcraft.john",
  ];

  const scienceTutors = [
    "physics.finn",
    "bio.by.bella",
    "chem.with.chris",
    "science.sam",
    "astro.alex",
    "labnotes.lily",
    "quantum.quinn",
    "earth.ed",
    "neuron.nick",
    "datadna",
  ];

  function Section({
    title,
    tutors,
  }: {
    title: string;
    tutors: string[];
  }) {
    return (
      <div className="border border-white/10 rounded-3xl p-6 bg-white/5">
        <h2 className="text-xl font-extrabold">{title}</h2>
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          {tutors.map((t) => (
            <div
              key={t}
              className="border border-white/10 rounded-2xl p-4 bg-black/20 hover:bg-black/30 transition"
            >
              <div className="font-semibold">@{t}</div>
              <div className="text-xs text-white/60 mt-1">
                Tutor · Available for classes
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold">My Tutors</div>
            <div className="text-white/60 text-sm">
              Tutors you can book or follow (MVP list)
            </div>
          </div>

          <a
            href="/feed"
            className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5"
          >
            Back to Feed
          </a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10 space-y-6">
        <Section title="Math Tutors" tutors={mathTutors} />
        <Section title="English Tutors" tutors={englishTutors} />
        <Section title="Science Tutors" tutors={scienceTutors} />
      </section>
    </main>
  );
}
