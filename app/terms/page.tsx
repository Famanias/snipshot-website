import Link from "next/link";

const sections = [
  {
    title: "1. Acceptance of terms",
    body: "By accessing SnipShot, you agree to these Terms of Service. If you do not agree, do not use the service.",
  },
  {
    title: "2. Service description",
    body: "SnipShot is a cloud-hosted manga translation service that processes user-submitted image snippets to generate translated panel text.",
  },
  {
    title: "3. Account responsibility",
    body: "You are responsible for safeguarding your account credentials and for activity that occurs under your account.",
  },
  {
    title: "4. Acceptable use",
    body: "You may not misuse the platform, attempt unauthorized access, upload malicious content, or violate applicable laws while using SnipShot.",
  },
  {
    title: "5. Intellectual property",
    body: "SnipShot and its software, branding, and design remain our property. You retain rights to content you provide, subject to service operation needs.",
  },
  {
    title: "6. Limitation of liability",
    body: "SnipShot is provided as is, without warranties. We are not liable for indirect or consequential damages to the fullest extent permitted by law.",
  },
  {
    title: "7. Changes and contact",
    body: "We may update these terms as the product evolves. Continued use after updates indicates acceptance of the revised terms.",
  },
];

export default function TermsPage() {
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

      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan">
          Legal
        </p>
        <h1 className="mt-4 heading text-4xl text-white sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-gray-400">Last updated: March 14, 2026</p>
      </section>

      <section className="mx-auto w-full max-w-5xl space-y-5 px-6 pb-20">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-lg border border-[#1A1A1A] bg-[#050505] p-6"
          >
            <h2 className="text-lg font-semibold text-white">{section.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">{section.body}</p>
          </article>
        ))}

        <div className="pt-2 text-sm text-gray-400">
          <Link href="/privacy" className="text-cyan hover:text-cyan-dark">
            Read Privacy Policy
          </Link>
        </div>
      </section>
    </main>
  );
}