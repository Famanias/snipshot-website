import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-gray-200">
      <header className="border-b border-[#1A1A1A] bg-[#050505]">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-widest text-cyan"
          >
            SnipShot
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            Back to home
          </Link>
        </div>
      </header>

      <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan">
          About
        </p>
        <h1 className="mt-4 heading text-4xl text-white sm:text-5xl">
          Built For Better Comic Reading
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
          SnipShot helps manga and comic readers instantly translate hard-to-read
          panels without breaking flow. We designed it to remove friction from raw
          reading sessions so you can focus on story, pacing, and art.
        </p>
      </section>

      <section className="border-y border-[#1A1A1A] bg-[#050505]">
        <div className="mx-auto grid w-full max-w-5xl gap-8 px-6 py-12 sm:grid-cols-2">
          <article className="rounded-lg border border-[#1A1A1A] bg-black/60 p-6">
            <h2 className="text-xl font-semibold text-white">Our mission</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              Make translated manga reading feel instant, dependable, and natural
              for everyone, from casual readers to high-volume binge sessions.
            </p>
          </article>

          <article className="rounded-lg border border-[#1A1A1A] bg-black/60 p-6">
            <h2 className="text-xl font-semibold text-white">Cloud-first delivery</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              SnipShot is hosted in the cloud so you can access the same workflow
              from wherever you read, with zero local setup and consistent updates.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-14">
        <h2 className="text-2xl font-semibold text-white">Learn more</h2>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/docs"
            className="clip-corner border border-[#1A1A1A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-gray-400"
          >
            Read Documentation
          </Link>
          <Link
            href="/privacy"
            className="clip-corner border border-[#1A1A1A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-gray-400"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="clip-corner border border-[#1A1A1A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-gray-400"
          >
            Terms of Service
          </Link>
        </div>
      </section>
    </main>
  );
}