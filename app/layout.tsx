import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SnipShot – Snip, OCR, Translate Manga Instantly",
  description:
    "SnipShot is a desktop tool for manga and comic readers. Snip any screenshot, extract text with AI-powered OCR, and get instant multilingual translations. Read raw manga without limits.",
  openGraph: {
    title: "SnipShot – Snip, OCR, Translate Manga Instantly",
    description:
      "Snip any manga screenshot, extract text with AI OCR, and translate to 26+ languages instantly. Built for desktop power users.",
    type: "website",
    locale: "en_US",
    siteName: "SnipShot",
  },
  twitter: {
    card: "summary_large_image",
    title: "SnipShot – Snip, OCR, Translate Manga Instantly",
    description:
      "Desktop tool for manga readers: snip, OCR, translate in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${rubik.variable} antialiased`}>{children}</body>
    </html>
  );
}
