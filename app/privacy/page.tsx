import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SnipShot",
  description:
    "Learn how SnipShot collects, uses, and protects your information, including your email and uploaded images.",
};

const sections = [
  {
    title: "1. Overview",
    body: (
      <>
        SnipShot values your privacy. This policy explains how we collect, use,
        and protect information when you use our cloud-hosted translation service.
      </>
    ),
  },
  {
    title: "2. Information we collect",
    body: (
      <>
        We only collect your email address for account creation and
        authentication, and images that you upload to be stored in our database
        for processing and translation.
      </>
    ),
  },
  {
    title: "3. How we use data",
    body: (
      <>
        Your email is used to manage your account and authenticate access, while
        your uploaded images are stored securely in our database to provide
        our image translation services.
      </>
    ),
  },
  {
    title: "4. Data retention & control",
    body: (
      <>
        You have full control over your content. You can delete your uploaded
        images at any time directly within the app itself. If you wish to delete
        your entire account, you can request account deletion by emailing us at{" "}
        <a
          href="mailto:hello.snipshot@gmail.com"
          className="text-cyan hover:underline"
        >
          hello.snipshot@gmail.com
        </a>{" "}
        or by visiting our{" "}
        <Link href="/account-deletion" className="text-cyan hover:underline">
          account deletion page
        </Link>{" "}
        for more details.
      </>
    ),
  },
  {
    title: "5. Security",
    body: (
      <>
        We use industry-standard safeguards for data in transit and at rest. No
        online platform is perfectly secure, but we continuously improve our
        defenses.
      </>
    ),
  },
  {
    title: "6. Contact",
    body: (
      <>
        If you have questions about this policy or wish to request data/account
        deletion, contact us at{" "}
        <a
          href="mailto:hello.snipshot@gmail.com"
          className="text-cyan hover:underline"
        >
          hello.snipshot@gmail.com
        </a>
        . Continued use of SnipShot means you accept this privacy policy.
      </>
    ),
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
        <p className="mt-3 text-sm text-gray-400">Last updated: June 7, 2026</p>
      </section>

      <section className="mx-auto w-full max-w-5xl space-y-5 px-6 pb-20">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-lg border border-[#1A1A1A] bg-[#050505] p-6"
          >
            <h2 className="text-lg font-semibold text-white">{section.title}</h2>
            <div className="mt-3 text-sm leading-relaxed text-gray-300">{section.body}</div>
          </article>
        ))}

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
            className="clip-corner bg-cyan px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-cyan-dark"
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