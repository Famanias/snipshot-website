"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Download } from "lucide-react";
import { fadeInUp, staggerContainer, scaleIn, buttonHover, buttonTap } from "@/components/motion/variants";

function parseEmailFromHash(): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.slice(1);
  const params = new URLSearchParams(hash);
  const token = params.get("access_token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.email ?? null;
  } catch {
    return null;
  }
}

export default function WelcomeClient() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(parseEmailFromHash());
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-cyan/10 blur-[120px] opacity-50" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-lg w-full"
        variants={staggerContainer(0.15, 0.1)}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div variants={scaleIn} className="flex items-center gap-2 mb-10">
          <img src="/icon.svg" alt="SnipShot Logo" className="h-7 w-7" />
          <span className="text-xl font-bold uppercase tracking-tight text-white">SnipShot</span>
        </motion.div>

        {/* Check icon */}
        <motion.div variants={scaleIn} className="mb-6">
          <CheckCircle className="h-16 w-16 text-cyan" strokeWidth={1.5} />
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeInUp}
          className="heading text-4xl md:text-5xl text-white mb-4 leading-tight"
        >
          Welcome to SnipShot
          {email && (
            <span className="block text-cyan text-2xl md:text-3xl mt-2 normal-case tracking-normal font-medium">
              {email}
            </span>
          )}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeInUp}
          className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed"
        >
          Your email has been confirmed. You&apos;re all set to using SnipShot!
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <motion.a
            href="https://github.com/Famanias/snipshot-desktop/releases"
            className="inline-flex items-center justify-center gap-2 clip-corner bg-cyan px-6 py-3 text-sm font-bold uppercase tracking-wider text-black hover:bg-cyan-dark transition-colors"
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            <Download className="h-4 w-4" />
            Download SnipShot
          </motion.a>
          <motion.a
            href="/"
            className="inline-flex items-center justify-center gap-2 clip-corner border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white hover:border-white/50 transition-colors"
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            Go to Homepage
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}
