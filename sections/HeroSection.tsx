"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroAd from "@/components/HeroAd";
import {
  heroWord,
  staggerContainer,
  fadeInUp,
  buttonHover,
  buttonTap,
} from "@/components/motion/variants";

const headlineWords = ["Snip.", "Extract.", "Translate."];

interface StaticScissorProps {
  id: string;
  left: string;
  top: string;
  width: string;
  opacity: number;
  strokeWidth: number;
  blur?: string;
  flip?: boolean;
}

function StaticScissor({
  id,
  left,
  top,
  width,
  opacity,
  strokeWidth,
  blur,
  flip = false,
}: StaticScissorProps) {
  return (
    <div
      className="absolute aspect-square"
      style={{
        left,
        top,
        width,
        opacity,
        filter: blur ? `blur(${blur})` : undefined,
      }}
    >
      <div
        className="h-full w-full"
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
      >
        <svg
          viewBox="0 0 900 900"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`${id}-gradient`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="36%" stopColor="rgba(125,211,252,0.48)" />
              <stop offset="70%" stopColor="rgba(14,165,233,0.92)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g
            stroke={`url(#${id}-gradient)`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${id}-glow)`}
          >
            <circle cx="190" cy="255" r="84" opacity="0.9" />
            <circle cx="190" cy="645" r="84" opacity="0.9" />
            <circle cx="190" cy="255" r="34" opacity="0.35" />
            <circle cx="190" cy="645" r="34" opacity="0.35" />

            <path d="M258 305L448 448L782 134" />
            <path d="M258 595L448 452L782 766" />
            <path d="M340 444L782 134" opacity="0.46" />
            <path d="M340 456L782 766" opacity="0.46" />
            <circle cx="448" cy="450" r="22" fill="rgba(186,230,253,0.14)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function StaticOcrBackdrop() {
  return (
    <div className="absolute right-[7%] top-[20%] hidden w-[18rem] rounded-2xl border border-cyan/20 bg-black/35 p-3 backdrop-blur-sm lg:block">
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan/80">
        OCR Regions
      </p>
      <div className="mt-2 space-y-2">
        <div className="rounded-lg border border-cyan/35 bg-cyan/5 px-2 py-1.5 text-[10px] text-cyan/70">
          Box 01 - ja 94%
        </div>
        <div className="rounded-lg border border-cyan/35 bg-cyan/5 px-2 py-1.5 text-[10px] text-cyan/70">
          Box 02 - ja 91%
        </div>
        <div className="rounded-lg border border-cyan/35 bg-cyan/5 px-2 py-1.5 text-[10px] text-cyan/70">
          Box 03 - ja 89%
        </div>
      </div>
    </div>
  );
}

function StaticTranslationBackdrop() {
  return (
    <div className="absolute left-[8%] bottom-[14%] hidden w-[20rem] rounded-2xl border border-emerald-400/20 bg-black/30 p-3 backdrop-blur-sm lg:block">
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-300/80">
        Translation Preview
      </p>
      <div className="mt-2 space-y-2 text-[11px]">
        <div className="rounded-lg border border-emerald-400/25 bg-emerald-400/5 px-2 py-1.5 text-emerald-200/75">
          Wait... I can read this now?
        </div>
        <div className="rounded-lg border border-emerald-400/25 bg-emerald-400/5 px-2 py-1.5 text-emerald-200/75">
          I need the next page right now.
        </div>
      </div>
    </div>
  );
}

function StaticInpaintBackdrop() {
  return (
    <div className="absolute left-[6%] top-[14%] hidden w-[16rem] rounded-2xl border border-violet-400/20 bg-black/35 p-3 backdrop-blur-sm lg:block">
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-violet-300/80">
        Inpaint Cleanup
      </p>
      <div className="mt-2 space-y-2">
        <div className="flex items-center justify-between rounded-lg border border-violet-400/25 bg-violet-400/5 px-2 py-1.5 text-[10px]">
          <span className="text-violet-200/75">bubble_01</span>
          <span className="text-emerald-300/80">cleaned</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-violet-400/25 bg-violet-400/5 px-2 py-1.5 text-[10px]">
          <span className="text-violet-200/75">bubble_02</span>
          <span className="text-emerald-300/80">patched</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-violet-400/25 bg-violet-400/5 px-2 py-1.5 text-[10px]">
          <span className="text-violet-200/75">bubble_03</span>
          <span className="text-emerald-300/80">blended</span>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Static layered background: glow + scissors + OCR + translation */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-[-12%]"
          style={{
            background:
              "radial-gradient(circle at 22% 20%, rgba(14,165,233,0.18), transparent 24%), radial-gradient(circle at 70% 28%, rgba(56,189,248,0.12), transparent 20%), radial-gradient(circle at 55% 68%, rgba(14,165,233,0.14), transparent 28%), radial-gradient(circle at 48% 48%, rgba(255,255,255,0.03), transparent 40%)",
          }}
        />

        <StaticScissor
          id="scissor-far-left"
          left="-10%"
          top="2%"
          width="clamp(18rem, 34vw, 32rem)"
          opacity={0.1}
          strokeWidth={10}
          blur="2px"
        />

        <StaticScissor
          id="scissor-center"
          left="34%"
          top="-4%"
          width="clamp(22rem, 42vw, 42rem)"
          opacity={0.14}
          strokeWidth={12}
          blur="1px"
        />

        <StaticScissor
          id="scissor-front-right"
          left="70%"
          top="16%"
          width="clamp(12rem, 20vw, 18rem)"
          opacity={0.2}
          strokeWidth={8}
          flip
        />

        <StaticScissor
          id="scissor-lower-left"
          left="2%"
          top="56%"
          width="clamp(16rem, 28vw, 26rem)"
          opacity={0.18}
          strokeWidth={9}
        />

        <div className="absolute inset-x-[8%] top-[62%] h-px bg-gradient-to-r from-transparent via-cyan/35 to-transparent opacity-45" />

        <StaticOcrBackdrop />
        <StaticInpaintBackdrop />
        <StaticTranslationBackdrop />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="w-full text-center">
          <HeroAd />
          <motion.h1
            className="heading mx-auto max-w-5xl text-3xl leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl"
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
            <motion.span variants={heroWord} className="inline-block text-cyan">
              Read&nbsp;Instantly.
            </motion.span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-gray-400 sm:text-base lg:text-lg"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Capture any manga panel, webtoon page, or raw scan. SnipShot&apos;s
            5-stage pipeline detects text, recognises characters, and
            translates to seamlessly. No copy-paste, no mobile hassle.
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
          >
            <motion.a
              href="https://github.com/Famanias/snipshot-desktop/releases"
              className="inline-flex items-center gap-2.5 clip-corner bg-cyan px-7 py-3.5 text-base font-bold uppercase tracking-wider text-black transition-colors hover:bg-cyan-dark"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              Download Now
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
