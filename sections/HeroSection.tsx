"use client";

import {
  motion,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  heroWord,
  staggerContainer,
  fadeInUp,
  buttonHover,
  buttonTap,
} from "@/components/motion/variants";
import { useEffect, useRef, useState } from "react";

const headlineWords = ["Snip.", "Extract.", "Translate."];

interface ScissorLayerProps {
  id: string;
  scrollYProgress: MotionValue<number>;
  shouldReduceMotion: boolean;
  left: string;
  top: string;
  width: string;
  opacity: number;
  strokeWidth: number;
  blur?: string;
  fromY: number;
  toY: number;
  fromRotate: number;
  toRotate: number;
  baseScale: number;
  flip?: boolean;
}

function ScissorLayer({
  id,
  scrollYProgress,
  shouldReduceMotion,
  left,
  top,
  width,
  opacity,
  strokeWidth,
  blur,
  fromY,
  toY,
  fromRotate,
  toRotate,
  baseScale,
  flip = false,
}: ScissorLayerProps) {
  const layerY = useTransform(scrollYProgress, [0, 1], [fromY, toY]);
  const layerRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [fromRotate, toRotate],
  );

  return (
    <motion.div
      className="absolute aspect-square"
      style={{
        left,
        top,
        width,
        opacity,
        filter: blur ? `blur(${blur})` : undefined,
        y: shouldReduceMotion ? fromY : layerY,
        rotate: shouldReduceMotion ? fromRotate : layerRotate,
      }}
      initial={{ opacity: 0, scale: baseScale * 0.94 }}
      animate={
        shouldReduceMotion
          ? { opacity, scale: baseScale }
          : {
              opacity: [opacity * 0.7, opacity, opacity * 0.78],
              scale: [baseScale, baseScale * 1.02, baseScale],
            }
      }
      transition={{ duration: 14, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
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
    </motion.div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Keep SSR and the first client render identical to avoid hydration mismatches.
  const shouldReduceMotion = hasMounted ? prefersReducedMotion : false;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const glowLayerY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const scanLineY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const glowOffsetX = useSpring(
    useTransform(pointerX, [0, 1], [-36, 36]),
    { stiffness: 90, damping: 24 },
  );
  const glowOffsetY = useSpring(
    useTransform(pointerY, [0, 1], [-24, 24]),
    { stiffness: 90, damping: 24 },
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;

    const bounds = sectionRef.current?.getBoundingClientRect();
    if (!bounds) return;

    pointerX.set((event.clientX - bounds.left) / bounds.width);
    pointerY.set((event.clientY - bounds.top) / bounds.height);
  };

  const handleMouseLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* Background layer stack: ambient glow + branded scissor silhouettes + scan line */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Ambient glow field: soft cyan bloom that tracks the pointer slightly for depth */}
        <motion.div
          className="absolute inset-[-12%]"
          style={{
            x: shouldReduceMotion ? 0 : glowOffsetX,
            y: shouldReduceMotion ? 0 : glowOffsetY,
            translateY: glowLayerY,
            background:
              "radial-gradient(circle at 22% 20%, rgba(14,165,233,0.18), transparent 24%), radial-gradient(circle at 70% 28%, rgba(56,189,248,0.12), transparent 20%), radial-gradient(circle at 55% 68%, rgba(14,165,233,0.14), transparent 28%), radial-gradient(circle at 48% 48%, rgba(255,255,255,0.03), transparent 40%)",
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.03, 1],
                  opacity: [0.64, 0.88, 0.64],
                  rotate: [0, 2, 0],
                }
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Far background scissors: biggest silhouette, faintest opacity, slowest drift */}
        <ScissorLayer
          id="scissor-far-left"
          scrollYProgress={scrollYProgress}
          shouldReduceMotion={Boolean(shouldReduceMotion)}
          left="-10%"
          top="2%"
          width="clamp(18rem, 34vw, 32rem)"
          opacity={0.1}
          strokeWidth={10}
          blur="2px"
          fromY={-24}
          toY={24}
          fromRotate={-18}
          toRotate={-8}
          baseScale={1.08}
        />

        {/* Mid-back scissors: centered anchor shape that drifts deeper into frame on scroll */}
        <ScissorLayer
          id="scissor-center"
          scrollYProgress={scrollYProgress}
          shouldReduceMotion={Boolean(shouldReduceMotion)}
          left="34%"
          top="-4%"
          width="clamp(22rem, 42vw, 42rem)"
          opacity={0.14}
          strokeWidth={12}
          blur="1px"
          fromY={-8}
          toY={70}
          fromRotate={4}
          toRotate={14}
          baseScale={1.18}
        />

        {/* Front-right scissors: brighter layer with opposing motion for stronger depth */}
        <ScissorLayer
          id="scissor-front-right"
          scrollYProgress={scrollYProgress}
          shouldReduceMotion={Boolean(shouldReduceMotion)}
          left="70%"
          top="16%"
          width="clamp(12rem, 20vw, 18rem)"
          opacity={0.2}
          strokeWidth={8}
          fromY={16}
          toY={-36}
          fromRotate={22}
          toRotate={10}
          baseScale={1}
          flip
        />

        {/* Lower foreground scissors: larger branded silhouette that moves fastest with scroll */}
        <ScissorLayer
          id="scissor-lower-left"
          scrollYProgress={scrollYProgress}
          shouldReduceMotion={Boolean(shouldReduceMotion)}
          left="2%"
          top="56%"
          width="clamp(16rem, 28vw, 26rem)"
          opacity={0.18}
          strokeWidth={9}
          fromY={10}
          toY={122}
          fromRotate={-10}
          toRotate={9}
          baseScale={1.04}
        />

        {/* HUD scan line: a slow cyan pass that reinforces the OCR / scanning feel */}
        <motion.div
          className="absolute inset-x-[8%] h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent opacity-40"
          style={{ y: scanLineY }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  top: ["18%", "76%", "18%"],
                  opacity: [0, 0.4, 0],
                }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="w-full text-center">
          {/* Staggered headline */}
          <motion.h1
            className="heading mx-auto max-w-5xl text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl"
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
            className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-400"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Capture any manga panel, webtoon page, or raw scan — SnipShot&apos;s
            7-stage AI pipeline detects text, recognises characters, and
            translates to 26+ languages in under a second. No copy-paste, no
            mobile hassle.
          </motion.p>

          {/* CTA button — delayed */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
          >
            <motion.a
              href="#cta"
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
