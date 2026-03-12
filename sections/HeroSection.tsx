"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import {
  heroWord,
  staggerContainer,
  scaleIn,
  fadeInUp,
  buttonHover,
  buttonTap,
} from "@/components/motion/variants";
import { useRef } from "react";

const headlineWords = ["Snip.", "Extract.", "Translate."];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-110"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl w-full px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="grid lg:grid-cols-5 gap-12 items-end">
          {/* Main headline area — 3 cols */}
          <div className="lg:col-span-3">
            {/* Staggered headline */}
            <motion.h1
              className="heading text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-white"
              variants={staggerContainer(0.12)}
              initial="hidden"
              animate="visible"
            >
              {headlineWords.map((word) => (
                <motion.span
                  key={word}
                  variants={heroWord}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span
                variants={heroWord}
                className="inline-block text-cyan"
              >
                Read&nbsp;Instantly.
              </motion.span>
            </motion.h1>

            {/* Subheadline — delayed fade */}
            <motion.p
              className="mt-6 max-w-xl text-lg text-gray-400 leading-relaxed"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Capture any manga panel, webtoon page, or raw scan — SnipShot's
              7‑stage AI pipeline detects text, recognises characters, and
              translates to 26+ languages in under a second. No copy‑paste, no
              mobile hassle.
            </motion.p>

            {/* CTA button — delayed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
            >
              <motion.a
                href="#cta"
                className="mt-8 inline-flex items-center gap-2.5 clip-corner bg-cyan px-7 py-3.5 text-base font-bold uppercase tracking-wider text-black hover:bg-cyan-dark transition-colors"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                Download Now
                <ArrowRight className="h-5 w-5" />
              </motion.a>
            </motion.div>
          </div>

          {/* Glass promo card — 2 cols, scale-in */}
          <motion.div
            className="lg:col-span-2"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <div className="glass clip-corner-lg relative overflow-hidden rounded-none p-6">
              <div className="shine-gradient absolute inset-0 pointer-events-none" />
              <p className="relative text-lg font-semibold text-white">
                Ready to read raw manga?
              </p>
              <p className="relative mt-2 text-sm text-gray-400 leading-relaxed">
                In our survey of 79+ manga fans, SnipShot scored a perfect{" "}
                <span className="font-bold text-cyan">5 / 5</span> usefulness
                rating. Join them.
              </p>
              <motion.a
                href="#cta"
                className="relative mt-5 inline-flex items-center gap-2 clip-corner border border-white/30 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                <BookOpen className="h-4 w-4" />
                Download Free
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
