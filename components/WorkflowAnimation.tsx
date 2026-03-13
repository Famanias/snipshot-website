"use client";

/**
 * WorkflowAnimation.tsx
 * ----------------------
 * SnipShot manga-reading workflow demo.
 * 100% user-controlled — no autoplay, no timers.
 * Stage is set only by clicking stage buttons or keyboard (ArrowRight / Space).
 *
 * Stages: snip → ocr → inpaint → translate
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Stage = "snip" | "ocr" | "inpaint" | "translate";

interface StageConfig {
  id: Stage;
  label: string;
  icon: string;
  description: string;
  color: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STAGES: StageConfig[] = [
  {
    id: "snip",
    label: "Snip",
    icon: "✂",
    description: "Select a manga panel region",
    color: "#0EA5E9",
  },
  {
    id: "ocr",
    label: "OCR",
    icon: "⬡",
    description: "Detect & extract Japanese text",
    color: "#06B6D4",
  },
  {
    id: "inpaint",
    label: "Inpaint",
    icon: "◈",
    description: "Clean original text from panel",
    color: "#8B5CF6",
  },
  {
    id: "translate",
    label: "Translate",
    icon: "⟳",
    description: "Overlay English translation",
    color: "#10B981",
  },
];

const STAGE_ORDER: Stage[] = ["snip", "ocr", "inpaint", "translate"];

// Faux manga speech bubbles with Japanese text and English translations
const MANGA_BUBBLES = [
  {
    id: "b1",
    japanese: "待って！",
    english: "Wait!",
    romaji: "Matte!",
    top: "8%",
    left: "4%",
    width: "20%",
    height: "28%",
    shape: "round",
  },
  {
    id: "b2",
    japanese: "何が起きているの？",
    english: "What's happening?",
    romaji: "Nani ga okiteiru no?",
    top: "6%",
    left: "30%",
    width: "24%",
    height: "30%",
    shape: "spiky",
  },
  {
    id: "b3",
    japanese: "危ない！",
    english: "Look out!",
    romaji: "Abunai!",
    top: "58%",
    left: "6%",
    width: "18%",
    height: "30%",
    shape: "round",
  },
  {
    id: "b4",
    japanese: "もう終わりだ…",
    english: "It's all over...",
    romaji: "Mou owari da...",
    top: "55%",
    left: "58%",
    width: "26%",
    height: "32%",
    shape: "jagged",
  },
];

// ─── Helper: stage index ───────────────────────────────────────────────────────

function stageIndex(s: Stage): number {
  return STAGE_ORDER.indexOf(s);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Animated dashed selection frame shown during "snip" stage */
function SelectionFrame({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="selection-frame"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute inset-2 pointer-events-none"
          style={{
            border: "2.5px dashed #0EA5E9",
            borderRadius: 6,
            boxShadow: "0 0 18px 2px rgba(14,165,233,0.35), inset 0 0 18px 0 rgba(14,165,233,0.07)",
          }}
        >
          {/* Animated corner handles */}
          {[
            { top: -4, left: -4 },
            { top: -4, right: -4 },
            { bottom: -4, left: -4 },
            { bottom: -4, right: -4 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-cyan-400 rounded-sm"
              style={pos as React.CSSProperties}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.2 }}
            />
          ))}

          {/* Scissors icon flash */}
          <motion.div
            className="absolute top-2 right-2 text-cyan-400 text-lg select-none"
            animate={{ opacity: [1, 0.3, 1], rotate: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            ✂
          </motion.div>

          {/* Dimension readout */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-cyan-400/70 bg-black/40 px-1.5 py-0.5 rounded">
            480 × 680 px
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Horizontal scan sweep + bounding boxes for OCR stage */
function OcrOverlay({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Scan line */}
          <motion.div
            key="scanline"
            className="absolute left-0 right-0 h-px pointer-events-none z-10"
            style={{ background: "linear-gradient(90deg, transparent, #06B6D4, transparent)" }}
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.6, ease: "linear", repeat: Infinity, repeatDelay: 0.8 }}
          />

          {/* Bounding boxes on each bubble */}
          {MANGA_BUBBLES.map((b, i) => (
            <motion.div
              key={`bbox-${b.id}`}
              className="absolute pointer-events-none"
              style={{
                top: b.top,
                left: b.left,
                width: b.width,
                height: b.height,
                border: "1.5px solid #06B6D4",
                borderRadius: 3,
                boxShadow: "0 0 8px rgba(6,182,212,0.45)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.12, duration: 0.3, type: "spring", stiffness: 260 }}
            >
              <div className="absolute -top-4 left-0 text-[9px] font-mono text-cyan-300/80 bg-black/50 px-1 rounded whitespace-nowrap">
                ja • {Math.round(85 + i * 3)}%
              </div>
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  );
}

/** White glow masks over original Japanese text during inpaint stage */
function InpaintOverlay({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          {MANGA_BUBBLES.map((b, i) => (
            <motion.div
              key={`mask-${b.id}`}
              className="absolute pointer-events-none flex items-center justify-center"
              style={{
                top: b.top,
                left: b.left,
                width: b.width,
                height: b.height,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.18, duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-1 rounded"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(255,255,255,0.92) 40%, rgba(220,240,255,0.6) 100%)",
                  boxShadow: "0 0 16px 4px rgba(139,92,246,0.35)",
                }}
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.3 }}
              />
              {/* Inpaint "noise" dots */}
              <div className="absolute inset-2 opacity-20" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 60 30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='5' cy='5' r='1' fill='%23888'/%3E%3Ccircle cx='15' cy='12' r='0.8' fill='%23aaa'/%3E%3Ccircle cx='30' cy='8' r='1.2' fill='%23999'/%3E%3Ccircle cx='45' cy='20' r='0.7' fill='%23bbb'/%3E%3Ccircle cx='55' cy='5' r='1' fill='%23888'/%3E%3C/svg%3E\")",
                backgroundSize: "60px 30px",
              }} />
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  );
}

/** English translation overlays on top of inpainted areas */
function TranslateOverlay({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          {MANGA_BUBBLES.map((b, i) => (
            <motion.div
              key={`trans-${b.id}`}
              className="absolute pointer-events-none flex items-center justify-center"
              style={{
                top: b.top,
                left: b.left,
                width: b.width,
                height: b.height,
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 320, damping: 22 }}
            >
              <div
                className="w-full h-full rounded flex flex-col items-center justify-center px-2"
                style={{
                  background: "rgba(255,255,255,0.93)",
                  boxShadow: "0 0 12px 2px rgba(16,185,129,0.3)",
                }}
              >
                <span className="text-[11px] sm:text-xs font-bold text-gray-900 text-center leading-tight font-serif">
                  {b.english}
                </span>
              </div>
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  );
}

/** The faux manga panel on the left */
function MangaPanel({ stage }: { stage: Stage }) {
  const idx = stageIndex(stage);

  return (
    <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden select-none"
      style={{
        background: "#f5f0e8",
        boxShadow: "0 0 0 2px rgba(14,165,233,0.15), 0 8px 40px rgba(0,0,0,0.5)",
        fontFamily: "'Noto Serif JP', serif",
      }}
    >
      {/* Manga-style halftone background */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* Panel divider lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 bottom-0 left-[28%] w-px bg-gray-900/40" />
        <div className="absolute top-0 bottom-0 left-[58%] w-px bg-gray-900/30" />
        <div className="absolute top-[50%] left-[28%] right-0 h-px bg-gray-900/30" />
      </div>

      {/* Character silhouettes */}
      <div className="absolute bottom-[5%] left-[8%] w-[16%] h-[55%] rounded-t-full bg-gray-800/20" />
      <div className="absolute bottom-[5%] left-[32%] w-[12%] h-[65%] rounded-t-full bg-gray-700/15" />
      <div className="absolute bottom-[5%] right-[12%] w-[18%] h-[50%] rounded-t-full bg-gray-800/18" />
      {/* Speed lines — top-right quadrant */}
      {[...Array(7)].map((_, i) => (
        <div key={i}
          className="absolute origin-bottom-right"
          style={{
            top: "5%",
            right: `${5 + i * 3}%`,
            width: "1px",
            height: `${18 + i * 2}%`,
            background: "rgba(0,0,0,0.12)",
            transform: `rotate(${-15 + i * 4}deg)`,
          }}
        />
      ))}

      {/* Speech bubbles with Japanese text */}
      {MANGA_BUBBLES.map((b) => (
        <div
          key={b.id}
          className="absolute flex items-center justify-center"
          style={{ top: b.top, left: b.left, width: b.width, height: b.height }}
        >
          <div
            className="w-full h-full flex items-center justify-center rounded-full px-2"
            style={{
              background: "rgba(255,255,255,0.95)",
              border: "2px solid #111",
              boxShadow: b.shape === "spiky" ? "0 0 0 4px #111, 0 0 0 5px white, 0 0 0 7px #111" : "none",
            }}
          >
            {/* Show Japanese unless inpainted/translated */}
            {idx < 2 && (
              <span className="text-[11px] sm:text-xs text-gray-900 font-bold text-center leading-snug"
                style={{ fontFamily: "'Noto Serif JP', 'serif'" }}>
                {b.japanese}
              </span>
            )}
          </div>
        </div>
      ))}

      {/* Stage overlays */}
      <SelectionFrame visible={stage === "snip"} />
      <OcrOverlay visible={stage === "ocr"} />
      <InpaintOverlay visible={stage === "inpaint"} />
      <TranslateOverlay visible={stage === "translate"} />

      {/* Panel label */}
      <div className="absolute top-2 left-2 text-[9px] font-mono text-gray-400 bg-black/20 px-1.5 py-0.5 rounded tracking-widest uppercase">
        Panel 03
      </div>
    </div>
  );
}

/** Typewriter text effect */
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const prefersReducedMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(prefersReducedMotion ? text : "");

  useEffect(() => {
    if (prefersReducedMotion) { setDisplayed(text); return; }
    setDisplayed("");
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 40);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [text, delay, prefersReducedMotion]);

  return <span className="font-mono">{displayed}</span>;
}

// ─── Right-side pipeline panels ───────────────────────────────────────────────

function SnipPanel() {
  return (
    <div className="rounded-lg p-4 border border-cyan-500/30 bg-black/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-cyan-400 text-sm">✂</span>
        <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest">Capture</span>
        <span className="ml-auto text-[10px] font-mono text-cyan-500/60">480×680px</span>
      </div>
      <div className="rounded overflow-hidden border border-cyan-900/50"
        style={{ background: "linear-gradient(135deg, #0c1a2e 0%, #0a0f1a 100%)" }}>
        <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-cyan-900/30">
          {["#ff5f57","#febc2e","#28c840"].map(c => (
            <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
          ))}
          <span className="text-[10px] font-mono text-gray-500 ml-2">snipshot://capture</span>
        </div>
        <div className="p-3 text-[11px] font-mono space-y-1">
          <div><span className="text-purple-400">region</span><span className="text-gray-400"> = </span><span className="text-green-400">Rect(x=120, y=80, w=480, h=680)</span></div>
          <div><span className="text-purple-400">source</span><span className="text-gray-400"> = </span><span className="text-orange-400">"chapter_07.png"</span></div>
          <div><span className="text-cyan-400">→ captured</span><span className="text-gray-500"> [panel_03.png]</span></div>
        </div>
      </div>
    </div>
  );
}

function OcrPanel() {
  return (
    <div className="rounded-lg p-4 border border-cyan-400/30 bg-black/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-cyan-400 text-sm">⬡</span>
        <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest">OCR Extract</span>
        <span className="ml-auto text-[10px] font-mono text-cyan-500/60">4 boxes</span>
      </div>
      <div className="space-y-2">
        {MANGA_BUBBLES.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="flex items-start gap-2 bg-cyan-950/30 rounded px-2.5 py-2 border border-cyan-900/40"
          >
            <span className="text-[10px] font-mono text-cyan-600 mt-0.5 shrink-0">#{i + 1}</span>
            <div className="min-w-0">
              <div className="text-sm text-white font-bold" style={{ fontFamily: "serif" }}>
                <TypewriterText text={b.japanese} delay={i * 0.15} />
              </div>
              <div className="text-[10px] text-gray-500 font-mono">{b.romaji}</div>
            </div>
            <span className="ml-auto text-[10px] font-mono text-emerald-500 shrink-0">{88 + i * 2}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function InpaintPanel() {
  return (
    <div className="rounded-lg p-4 border border-purple-500/30 bg-black/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-purple-400 text-sm">◈</span>
        <span className="text-purple-300 text-xs font-bold uppercase tracking-widest">Inpaint</span>
        <span className="ml-auto text-[10px] font-mono text-purple-500/60">4 regions</span>
      </div>
      <div className="space-y-1.5">
        {MANGA_BUBBLES.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.12 }}
            className="flex items-center gap-2 text-[11px] font-mono"
          >
            <motion.div
              className="w-3 h-3 rounded-sm shrink-0"
              style={{ background: "rgba(139,92,246,0.5)", boxShadow: "0 0 6px rgba(139,92,246,0.5)" }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
            />
            <span className="text-purple-300">bubble_{String(i + 1).padStart(2, "0")}</span>
            <div className="flex-1 h-px bg-purple-900/40" />
            <span className="text-emerald-400">cleaned ✓</span>
          </motion.div>
        ))}
        <div className="mt-2 pt-2 border-t border-purple-900/30 text-[10px] text-purple-400/60 font-mono">
          model: diffusion-inpaint-v3 · 312ms
        </div>
      </div>
    </div>
  );
}

function TranslatePanel() {
  return (
    <div className="rounded-lg p-4 border border-emerald-500/30 bg-black/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-emerald-400 text-sm">⟳</span>
        <span className="text-emerald-300 text-xs font-bold uppercase tracking-widest">Translation</span>
        <span className="ml-auto text-[10px] font-mono text-emerald-600/60">ja → en</span>
      </div>
      <div className="space-y-2">
        {MANGA_BUBBLES.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-start gap-3 bg-emerald-950/30 rounded px-2.5 py-2 border border-emerald-900/30"
          >
            <div className="min-w-0 flex-1">
              <div className="text-[10px] text-gray-500 font-mono mb-0.5">{b.japanese}</div>
              <div className="text-xs text-emerald-300 font-bold">"{b.english}"</div>
            </div>
            <div className="shrink-0 flex flex-col items-end gap-0.5">
              <span className="text-[9px] font-mono text-emerald-600/70">gpt-4o</span>
              <span className="text-[9px] font-mono text-emerald-500">✓ placed</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Stage Button ─────────────────────────────────────────────────────────────

function StageButton({
  config,
  active,
  index,
  onClick,
}: {
  config: StageConfig;
  active: boolean;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03, x: -2 }}
      whileTap={{ scale: 0.97 }}
      className="relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer select-none"
      style={{
        background: active
          ? `linear-gradient(135deg, rgba(14,165,233,0.22) 0%, rgba(6,182,212,0.12) 100%)`
          : "rgba(255,255,255,0.03)",
        border: active
          ? "1.5px solid rgba(14,165,233,0.7)"
          : "1.5px solid rgba(255,255,255,0.07)",
        boxShadow: active
          ? "0 0 18px rgba(14,165,233,0.3), inset 0 0 10px rgba(14,165,233,0.08)"
          : "none",
        color: active ? "#7DD3FC" : "rgba(255,255,255,0.35)",
      }}
    >
      {/* Step number */}
      <span
        className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono"
        style={{
          background: active ? "rgba(14,165,233,0.3)" : "rgba(255,255,255,0.06)",
          border: active ? "1px solid rgba(14,165,233,0.6)" : "1px solid rgba(255,255,255,0.1)",
          color: active ? "#7DD3FC" : "rgba(255,255,255,0.3)",
        }}
      >
        {index + 1}
      </span>

      <span className="text-base shrink-0">{config.icon}</span>
      <span className="text-[11px] tracking-wide uppercase">{config.label}</span>

      {/* Active left-edge indicator */}
      {active && (
        <motion.div
          layoutId="stage-indicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-cyan-400"
          style={{ boxShadow: "0 0 8px #0EA5E9" }}
        />
      )}
    </motion.button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WorkflowAnimation() {
  const [currentStage, setCurrentStage] = useState<Stage>("snip");
  const prefersReducedMotion = useReducedMotion();

  // If reduced motion: jump straight to translate (final state)
  useEffect(() => {
    if (prefersReducedMotion) setCurrentStage("translate");
  }, [prefersReducedMotion]);

  // Keyboard: ArrowRight / Space → advance to next stage (wraps around)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === " ") {
      e.preventDefault();
      setCurrentStage(prev => STAGE_ORDER[(stageIndex(prev) + 1) % STAGE_ORDER.length]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const activeStageConfig = STAGES.find(s => s.id === currentStage)!;

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8"
      style={{
        background: "linear-gradient(135deg, #020b18 0%, #060d1f 50%, #03101a 100%)",
        fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
      }}
    >
      {/* Google Font import for Japanese */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap');
      `}</style>

      {/* Header */}
      <div className="w-full max-w-6xl mb-6 flex items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-md bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 text-xs">✂</div>
            <span className="text-white font-bold text-lg tracking-tight">SnipShot</span>
            <span className="text-[10px] font-mono text-cyan-500/60 border border-cyan-900/40 px-1.5 py-0.5 rounded ml-1">workflow</span>
          </div>
          <p className="text-gray-500 text-xs">
            Click a stage to explore · <kbd className="text-[10px] bg-white/10 px-1 py-0.5 rounded">Space</kbd> or <kbd className="text-[10px] bg-white/10 px-1 py-0.5 rounded">→</kbd> to advance
          </p>
        </div>
      </div>

      {/* Main layout: [manga | sidebar] */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_220px] gap-8">

        {/* Left: Manga Panel — takes all available space */}
        <div className="flex flex-col gap-3">
          <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Source Panel</div>
          <MangaPanel stage={currentStage} />

          {/* Current stage indicator below panel */}
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-xs text-cyan-400/70 font-mono"
          >
            stage: <span className="text-cyan-300 font-bold">{currentStage}</span>
            {" · "}{activeStageConfig.description}
          </motion.div>
        </div>

        {/* Right: Stage selector sidebar */}
        <div className="flex flex-col gap-3">
          <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Stages</div>

          {/* Vertical connector line behind buttons */}
          <div className="relative flex flex-col gap-2">
            <div
              className="absolute left-[22px] top-6 bottom-6 w-px pointer-events-none"
              style={{ background: "linear-gradient(to bottom, rgba(14,165,233,0.15), rgba(14,165,233,0.05))" }}
            />

            {STAGES.map((s, i) => (
              <StageButton
                key={s.id}
                config={s}
                active={currentStage === s.id}
                index={i}
                onClick={() => setCurrentStage(s.id)}
              />
            ))}
          </div>

          {/* Stage description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStage}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-[10px] text-gray-600 mt-1 font-mono leading-relaxed px-1"
            >
              {activeStageConfig.description}
            </motion.p>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}