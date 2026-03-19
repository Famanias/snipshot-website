"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react";
import { Barlow, Instrument_Serif } from "next/font/google";
import {
  TitleSlide,
  IntroSlide,
  MethodsSlide,
  ResultsSlide,
  DetailedResultsSlide,
  WorkflowSlide,
  SampleResultsSlide,
  DiscussionSlide,
  ConclusionSlide,
} from "./slides";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const VIDEO_SRC =
  "/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4";

const slides = [
  { id: "title",          component: TitleSlide },
  { id: "intro",          component: IntroSlide },
  { id: "methods",        component: MethodsSlide },
  { id: "workflow",       component: WorkflowSlide },
  { id: "samples",        component: SampleResultsSlide },
  { id: "results",        component: ResultsSlide },
  { id: "results-detail", component: DetailedResultsSlide },
  { id: "discussion",     component: DiscussionSlide },
  { id: "conclusion",     component: ConclusionSlide },
];

export default function PresentationPage() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isWorkflowSlide = slides[current].id === "workflow";

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    } else {
      await document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const next = useCallback(() => {
    if (current < slides.length - 1) {
      setDirection(1);
      setCurrent((c) => c + 1);
    }
  }, [current]);

  const prev = useCallback(() => {
    if (current > 0) {
      setDirection(-1);
      setCurrent((c) => c - 1);
    }
  }, [current]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isWorkflowSlide) return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, isWorkflowSlide]);

  const SlideComponent = slides[current].component;

  return (
    <div
      className={`${barlow.variable} ${instrumentSerif.variable} min-h-screen text-white overflow-hidden flex flex-col selection:bg-white/20`}
      style={{ fontFamily: "var(--font-barlow), sans-serif" }}
    >
      {/* ── Video background ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
        src={VIDEO_SRC}
      />
      <div className="fixed inset-0 bg-black/20 z-1" />

      {/* ── Progress bar ── */}
      <div className="h-px w-full bg-white/10 fixed top-0 z-50">
        <motion.div
          className="h-full bg-white/80"
          initial={{ width: 0 }}
          animate={{
            width: `${((current + 1) / slides.length) * 100}%`,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        />
      </div>

      {/* ── Top bar: counter + fullscreen ── */}
      <div className="fixed top-6 left-6 z-50 text-[11px] font-mono text-white/40 tracking-widest">
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(slides.length).padStart(2, "0")}
      </div>

      <button
        onClick={toggleFullscreen}
        className="fixed top-5 right-6 z-50 p-2.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-sm text-white/60 hover:text-white hover:bg-white/20 transition-all"
        title="Toggle Fullscreen"
      >
        {isFullscreen ? (
          <Minimize className="w-4 h-4" />
        ) : (
          <Maximize className="w-4 h-4" />
        )}
      </button>

      {/* ── Slide area ── */}
      <main className="flex-1 relative z-2">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute inset-0"
          >
            <SlideComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Bottom navigation ── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-white/8 backdrop-blur-md border border-white/12 rounded-sm px-5 py-2.5">
        <button
          onClick={prev}
          disabled={current === 0}
          className="p-1.5 text-white/50 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                current === i
                  ? "bg-white w-6 h-1.5"
                  : "bg-white/25 w-1.5 h-1.5 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="p-1.5 text-white/50 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
