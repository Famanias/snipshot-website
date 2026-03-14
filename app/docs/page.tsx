import Link from "next/link";

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-black text-gray-200">
      <header className="border-b border-[#1A1A1A] bg-[#050505]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-widest text-cyan"
          >
            SnipShot Docs
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            Back to home
          </Link>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan">
          Documentation
        </p>
        <h1 className="mt-4 heading text-4xl text-white sm:text-5xl">
          SnipShot Product Guide
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-300">
          Everything you need to run SnipShot effectively, from the first panel
          capture to final translated render. This guide is optimized for quick
          onboarding and fast reference during real reading sessions.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-6 pb-16 md:grid-cols-2">
        <article className="rounded-lg border border-[#1A1A1A] bg-[#050505] p-6">
          <h2 className="text-xl font-semibold text-white">1. Quick start</h2>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed text-gray-300">
            <li>Create or sign in to your SnipShot account.</li>
            <li>Open a manga panel and capture the region you want to translate.</li>
            <li>Choose your output language.</li>
            <li>Review translated text and export the final panel if needed.</li>
          </ol>
        </article>

        <article className="rounded-lg border border-[#1A1A1A] bg-[#050505] p-6">
          <h2 className="text-xl font-semibold text-white">2. Supported content</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-300">
            <li>Speech bubbles and dialogue-heavy scenes</li>
            <li>Vertical Japanese text layouts</li>
            <li>Mixed typography and stylized sound effects</li>
            <li>Dense pages with multiple reading zones</li>
          </ul>
        </article>

        <article className="rounded-lg border border-[#1A1A1A] bg-[#050505] p-6">
          <h2 className="text-xl font-semibold text-white">3. Translation workflow</h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-300">
            SnipShot uses a multi-stage pipeline for stable results: detection,
            OCR, translation, cleanup, and re-rendering. This keeps text readable
            while preserving original panel composition.
          </p>
        </article>

        <article className="rounded-lg border border-[#1A1A1A] bg-[#050505] p-6">
          <h2 className="text-xl font-semibold text-white">4. Troubleshooting</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-300">
            <li>Low OCR accuracy: capture a tighter crop around text.</li>
            <li>Missing words: retry with higher panel contrast.</li>
            <li>Slow responses: refresh and re-submit the panel snippet.</li>
            <li>Layout artifacts: use the re-render option once more.</li>
          </ul>
        </article>
      </section>
    </main>
  );
}