import Link from "next/link";

const sections = [
  {
    title: "1. Overview",
    body: "SnipShot values your privacy. This policy explains how we collect, use, and protect information when you use our cloud-hosted translation service.",
  },
  {
    title: "2. Information we collect",
    body: "We may collect account details (email and authentication data), usage metrics, and technical diagnostics needed to operate and improve the product.",
  },
  {
    title: "3. How we use data",
    body: "Your information is used to provide core features, improve OCR and translation quality, maintain security, and troubleshoot service reliability.",
  },
  {
    title: "4. Data retention",
    body: "We retain data only as long as necessary for account operation, legal obligations, and service quality. You can request deletion of your account data.",
  },
  {
    title: "5. Security",
    body: "We use industry-standard safeguards for data in transit and at rest. No online platform is perfectly secure, but we continuously improve our defenses.",
  },
  {
    title: "6. Contact",
    body: "If you have questions about this policy, contact us through our support channels. Continued use of SnipShot means you accept this privacy policy.",
  },
];

export default function PrivacyPage() {
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
          Privacy Policy
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
          <Link href="/terms" className="text-cyan hover:text-cyan-dark">
            Read Terms of Service
          </Link>
        </div>
      </section>
    </main>
  );
}