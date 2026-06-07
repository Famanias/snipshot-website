import Link from "next/link";
import { Mail, Trash2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Deletion Request | SnipShot",
  description:
    "Learn how to request deletion of your SnipShot account and all associated data, including images, folders, and credentials.",
};

export default function AccountDeletionPage() {
  return (
    <main className="min-h-screen bg-black text-gray-200">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan">
          Support
        </p>
        <h1 className="mt-4 heading text-4xl text-white sm:text-5xl">
          Account Deletion
        </h1>
        <p className="mt-3 text-sm text-gray-400">Last updated: June 7, 2026</p>
      </section>

      {/* Main Content */}
      <section className="mx-auto w-full max-w-5xl space-y-8 px-6 pb-20">
        <div className="rounded-lg border border-[#1A1A1A] bg-[#050505] p-6 sm:p-8">
          <p className="text-base leading-relaxed text-gray-300">
            If you wish to delete your SnipShot account and remove all personal information associated with it, you can request full deletion at any time. Below are the details on how to make a request and what data is impacted.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-white flex items-center gap-2">
            What Data Will Be Deleted?
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Upon processing your request, all data associated with your account will be permanently erased. This includes:
          </p>
          <ul className="mt-4 list-disc pl-5 space-y-2 text-sm text-gray-300 font-sans">
            <li>
              <strong>Account credentials:</strong> Your email, authentication records, and profile details.
            </li>
            <li>
              <strong>All uploaded images:</strong> Every snip, screenshot, and image uploaded to our translation services.
            </li>
            <li>
              <strong>Folders and organization data:</strong> Your folder structures, file organization hierarchy, and metadata.
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-white">Data Retention Policy</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            No user data is retained after deletion. Once the process is complete, all your account records, documents, uploaded assets, and organization schemas are permanently purged from our databases and cloud storage. This action is irreversible.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-white">How to Request Deletion</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            To submit your request, please send an email to{" "}
            <a href="mailto:hello.snipshot@gmail.com" className="text-cyan hover:underline">
              hello.snipshot@gmail.com
            </a>{" "}
            with the subject line <code className="bg-black border border-[#1A1A1A] px-1.5 py-0.5 rounded text-cyan">Account Deletion Request</code>.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            We will verify your identity to ensure security, and your request will be processed within <strong>5 business days</strong> of receiving the email.
          </p>

          {/* Mailto Button */}
          <div className="mt-8">
            <a
              href="mailto:hello.snipshot@gmail.com?subject=Account%20Deletion%20Request"
              className="clip-corner inline-flex items-center gap-2 bg-cyan px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-black hover:bg-cyan-dark transition-colors"
            >
              <Mail className="h-4 w-4" />
              Send Deletion Email
            </a>
          </div>
        </div>

        {/* Legal links footer */}
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
