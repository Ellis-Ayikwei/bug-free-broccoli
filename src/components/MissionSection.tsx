// Edit this block to change the mission statement shown in its own section
// on the homepage (separate from the shorter hero copy above it).
const MISSION_STATEMENT = {
  heading: "Our mission",
  paragraphs: [
    "We're building something that only works if enough people believe in it early. This site exists to measure that belief before we ask anyone to act on it.",
    "A pledge here costs you nothing today. It tells us, and everyone else watching, that the idea is worth backing. When we're ready to deliver, we'll come back to the people who said yes.",
  ],
};

export default function MissionSection() {
  return (
    <section className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-2xl px-6 py-16 text-center sm:py-20">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
          {MISSION_STATEMENT.heading}
        </h2>
        <div className="mt-4 space-y-4">
          {MISSION_STATEMENT.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-slate-600">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
