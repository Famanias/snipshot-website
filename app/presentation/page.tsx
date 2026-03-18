"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react";
import {
  TitleSlide,
  IntroSlide,
  MethodsSlide,
  ResultsSlide,
  DiscussionSlide,
  ConclusionSlide,
} from "./slides";

const slides = [
  { id: "title", component: TitleSlide },
  { id: "intro", component: IntroSlide },
  { id: "methods", component: MethodsSlide },
  { id: "results", component: ResultsSlide },
  { id: "discussion", component: DiscussionSlide },
  { id: "conclusion", component: ConclusionSlide },
] as const;

export default function PresentationPage() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
  }, [next, prev]);

  const SlideComponent = slides[current].component;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 font-rubik overflow-hidden flex flex-col selection:bg-cyan/30">
      {/* ── Progress bar ── */}
      <div className="h-1 w-full bg-gray-900 fixed top-0 z-50">
        <motion.div
          className="h-full bg-linear-to-r from-cyan to-sky-300"
          initial={{ width: 0 }}
          animate={{
            width: `${((current + 1) / slides.length) * 100}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* ── Fullscreen toggle ── */}
      <button
        onClick={toggleFullscreen}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-gray-900/80 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 transition-all backdrop-blur-sm"
        title="Toggle Fullscreen"
      >
        {isFullscreen ? (
          <Minimize className="w-5 h-5" />
        ) : (
          <Maximize className="w-5 h-5" />
        )}
      </button>

      {/* ── Slide area ── */}
      <main className="flex-1 relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: direction * -50, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SlideComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Bottom navigation ── */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center gap-8 z-50">
        <button
          onClick={prev}
          disabled={current === 0}
          className="p-3 rounded-full bg-gray-900/80 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                current === i
                  ? "bg-cyan w-8"
                  : "bg-gray-700 w-2.5 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="p-3 rounded-full bg-gray-900/80 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* ── Keyboard hint ── */}
      <div className="fixed bottom-8 right-8 text-xs text-gray-600 hidden md:block font-mono">
        Use arrow keys to navigate
      </div>
    </div>
  );
}
