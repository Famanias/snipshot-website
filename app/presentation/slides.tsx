"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ChevronRight,
  BarChart3,
  Clock,
  Target,
  Lightbulb,
  Rocket,
  Shield,
  Zap,
  Globe,
  Eye,
  Brain,
} from "lucide-react";
import WorkflowAnimation from "@/components/WorkflowAnimation";


const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

const scaleUp = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, delay, ease: EASE },
});


function CornerAccents() {
  return (
    <>
      <span className="absolute top-0 left-0 w-1.75 h-1.75 bg-white/80" />
      <span className="absolute top-0 right-0 w-1.75 h-1.75 bg-white/80" />
      <span className="absolute bottom-0 left-0 w-1.75 h-1.75 bg-white/80" />
      <span className="absolute bottom-0 right-0 w-1.75 h-1.75 bg-white/80" />
    </>
  );
}

function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative bg-white/7 backdrop-blur-md border border-white/12 rounded-xl p-8 ${className}`}
    >
      {children}
    </div>
  );
}

function GlassBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-sm text-sm ${className}`}
    >
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.3em] text-white/40 font-light mb-3">
      {children}
    </p>
  );
}


export function TitleSlide() {
  return (
    <div className="flex flex-col h-full items-center justify-center text-center px-8">
      <div className="max-w-225 mx-auto">
        <motion.div {...fadeUp(0)}>
          <GlassBadge className="mb-8 text-white/60 text-xs">
            Research Paper Presentation
          </GlassBadge>
        </motion.div>

        <motion.h1
          {...fadeUp(0.15)}
          className="text-5xl md:text-7xl font-light text-white leading-[1.1] mb-6 tracking-tight"
        >
          Snip<span className="font-semibold">Shot</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.3)}
          className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-2xl mx-auto mb-10"
        >
          A Deep Learningâ€“Based System for Translating{" "}
          <em className="font-(family-name:--font-instrument) italic text-white/80">
            Text in Digital Comics
          </em>
        </motion.p>

        <motion.div {...fadeUp(0.45)}>
          <GlassPanel className="inline-block text-left px-10 py-6">
            <CornerAccents />
            <p className="text-sm text-white/80 font-medium">
              John Lynard F. Isip &middot; Arvin Shelby de Leon &middot; Denise
              Lou B. Punzalan
            </p>
            <p className="text-xs text-white/35 mt-1.5 font-light">
              Gordon College, Olongapo City, Philippines
            </p>
          </GlassPanel>
        </motion.div>
      </div>
    </div>
  );
}


export function IntroSlide() {
  return (
    <div className="flex flex-col h-full justify-center px-8">
      <div className="max-w-275 mx-auto w-full">
        <SectionLabel>Introduction</SectionLabel>
        <motion.h2
          {...fadeUp(0)}
          className="text-4xl md:text-5xl font-light text-white mb-12 tracking-tight"
        >
          The Language Barrier{" "}
          <em className="font-(family-name:--font-instrument) italic text-white/70">
            in Comics
          </em>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div {...fadeLeft(0.2)}>
            <GlassPanel>
              <CornerAccents />
              <p className="text-lg text-white/70 font-light leading-relaxed mb-6">
                Digital comics attract{" "}
                <span className="text-white font-medium">150 million</span>{" "}
                monthly readers worldwide, yet translating embedded text remains
                a{" "}
                <span className="text-rose-300 font-medium">
                  fragmented, multi-step process
                </span>
                .
              </p>

              <div className="space-y-4">
                {[
                  "Existing tools are mobile-only, leaving desktop readers underserved.",
                  "Text overlays disrupt visual storytelling and artistic composition.",
                  "Multi-step workflows interrupt the natural reading flow.",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
                    <span className="text-sm text-white/50 font-light">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div {...fadeRight(0.4)}>
            <GlassPanel className="flex flex-col items-center gap-8">
              <CornerAccents />
              <div className="flex items-center justify-between w-full px-4">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-lg bg-white/6 border border-white/10 flex items-center justify-center">
                    <Clock className="w-7 h-7 text-rose-300/80" />
                  </div>
                  <div className="text-center">
                    <GlassBadge className="text-xs text-rose-300">
                      Multi-Steps
                    </GlassBadge>
                    <p className="text-[10px] text-white/30 mt-1 font-light">
                      Traditional
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-6 h-6 text-white/20" />

                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-lg bg-white/6 border border-white/10 flex items-center justify-center">
                    <Zap className="w-7 h-7 text-cyan/80" />
                  </div>
                  <div className="text-center">
                    <GlassBadge className="text-xs text-cyan">
                      1 Click
                    </GlassBadge>
                    <p className="text-[10px] text-white/30 mt-1 font-light">
                      SnipShot
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full border-t border-white/10 pt-6">
                <p className="text-xl font-medium text-white mb-2">SnipShot</p>
                <p className="text-sm text-white/40 font-light">
                  Snip any panel, get an instant in-image translation powered by
                  deep learning with no manual steps.
                </p>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


export function MethodsSlide() {
  return (
    <div className="flex flex-col h-full justify-center px-8">
      <div className="max-w-275 mx-auto w-full">
        <SectionLabel>Methodology</SectionLabel>
        <motion.h2
          {...fadeUp(0)}
          className="text-4xl md:text-5xl font-light text-white mb-12 tracking-tight"
        >
          Five-Stage{" "}
          <em className="font-(family-name:--font-instrument) italic text-white/70">
            AI Pipeline
          </em>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div {...fadeUp(0.2)}>
            <GlassPanel>
              <CornerAccents />
              <Brain className="w-10 h-10 text-white/50 mb-5" />
              <h4 className="text-xl font-medium text-white mb-3">
                System Architecture
              </h4>
              <p className="text-sm text-white/40 font-light mb-6">
                End-to-end deep learning pipeline integrating five specialized
                AI models.
              </p>

              <div className="space-y-3">
                {[
                  {
                    step: "01",
                    label: "Detection",
                    tech: "DBNet + ResNet-34",
                  },
                  { step: "02", label: "OCR", tech: "RoFormer + XPOS" },
                  { step: "03", label: "Translation", tech: "Llama-3-70b" },
                  { step: "04", label: "Inpainting", tech: "LaMa" },
                  {
                    step: "05",
                    label: "Rendering",
                    tech: "Text Placement",
                  },
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <span className="text-white/30 font-mono text-xs w-5">
                      {s.step}
                    </span>
                    <span className="text-white/80 text-sm font-medium">
                      {s.label}
                    </span>
                    <span className="text-white/25 text-xs ml-auto font-mono">
                      {s.tech}
                    </span>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div {...fadeUp(0.4)}>
            <GlassPanel>
              <CornerAccents />
              <BarChart3 className="w-10 h-10 text-white/50 mb-5" />
              <h4 className="text-xl font-medium text-white mb-3">
                Research Design
              </h4>
              <p className="text-sm text-white/40 font-light mb-6">
                Descriptive-developmental study using Design Science Research
                (DSR) with Agile methodology.
              </p>

              <div className="flex items-center gap-4 mb-6">
                <GlassBadge className="text-2xl font-medium text-white">
                  N=79
                </GlassBadge>
                <span className="text-xs text-white/30 uppercase tracking-wider font-light">
                  Survey
                  <br />
                  Participants
                </span>
              </div>

              <div className="space-y-3 text-sm text-white/50 font-light">
                {[
                  "Technology Acceptance Model (TAM) framework",
                  "20 beta testers for hands-on evaluation",
                  "BLEU-4 automated translation benchmarking",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    {text}
                  </div>
                ))}
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


function ProgressBar({
  label,
  percentage,
}: {
  label: string;
  percentage: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-white/60 text-sm font-light">{label}</span>
        <span className="text-white font-medium text-sm">{percentage}%</span>
      </div>
      <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="h-full rounded-full bg-white/60"
        />
      </div>
    </div>
  );
}

export function ResultsSlide() {
  return (
    <div className="flex flex-col h-full justify-center px-8">
      <div className="max-w-275 mx-auto w-full">
        <SectionLabel>Results</SectionLabel>
        <motion.h2
          {...fadeUp(0)}
          className="text-4xl md:text-5xl font-light text-white mb-12 tracking-tight"
        >
          Proven{" "}
          <em className="font-(family-name:--font-instrument) italic text-white/70">
            Performance
          </em>
        </motion.h2>

        <div className="grid md:grid-cols-12 gap-8">
          <motion.div {...fadeLeft(0.2)} className="md:col-span-5">
            <GlassPanel>
              <CornerAccents />
              <Target className="w-8 h-8 text-white/50 mb-5" />
              <h4 className="text-lg font-medium text-white mb-2">
                Technical Benchmarks
              </h4>
              <p className="text-xs text-white/35 font-light mb-6">
                Automated evaluation across 9 test runs with human-verified
                ground truth.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "88.98%", label: "OCR Accuracy" },
                  { value: "0.6139", label: "BLEU Score" },
                  { value: "~5s", label: "Mean Process Time" },
                  { value: "85.92%", label: "OCR Confidence" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="flex flex-col items-center gap-0.5 px-2 py-3 bg-white/6 backdrop-blur-sm border border-white/10 rounded-sm"
                  >
                    <span className="text-lg font-medium text-white">
                      {m.value}
                    </span>
                    <span className="text-[10px] text-white/30 font-light">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div {...fadeRight(0.4)} className="md:col-span-7">
            <GlassPanel>
              <CornerAccents />
              <h4 className="text-lg font-medium text-white mb-8">
                User Acceptance (TAM)
              </h4>
              <div className="space-y-8">
                <ProgressBar
                  label="Perceived Usefulness (PU)"
                  percentage={78.4}
                />
                <ProgressBar
                  label="Perceived Ease of Use (PEU)"
                  percentage={70.0}
                />
                <ProgressBar
                  label="BLEU scores for 11+ char segments"
                  percentage={72.2}
                />
                <ProgressBar
                  label="Sub-linear scaling across resolutions"
                  percentage={88.9}
                />
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


export function WorkflowSlide() {
  return <WorkflowAnimation />;
}


// ── Replace the empty strings below with real file paths inside /public ─────────────────────────
// e.g. easy.raw = "/sample_pages/easy_raw.png"
// Complex images are landscape; easy & medium are portrait.
// All three panels share the same frame — images are fitted via object-contain.
const SAMPLE_IMAGES = {
  easy: {
    raw: "/sample_pages/test-image-easy1.jpg",
    inpainted: "/sample_pages/test-image-easy1_inpainted.png",
    translated: "/sample_pages/test-image-easy1_translated.png"
  },
  medium: {
    raw: "/sample_pages/test-image-medium.png",
    inpainted: "/sample_pages/test-image-medium_inpainted.png",
    translated: "/sample_pages/test-image-medium_translated.png"
  },
  complex: {
    raw: "/sample_pages/test-image-complex1.png",
    inpainted: "/sample_pages/test-image-complex1_inpainted.png",
    translated: "/sample_pages/test-image-complex1_translated.png"
  },
} satisfies Record<string, Record<string, string>>;

export function SampleResultsSlide() {
  const [category, setCategory] = useState<"easy" | "medium" | "complex">("easy");

  const categories = [
    { id: "easy" as const,    label: "Easy",    orient: "Portrait" },
    { id: "medium" as const,  label: "Medium",  orient: "Portrait" },
    { id: "complex" as const, label: "Complex", orient: "Landscape" },
  ];

  const panels = [
    { key: "raw" as const,        label: "Raw Image" },
    { key: "inpainted" as const,  label: "Inpainted" },
    { key: "translated" as const, label: "Translated" },
  ];

  return (
    <div className="flex h-full">
      {/* ── Sidebar ──────────────────────────────────────── */}
      <motion.aside
        {...fadeLeft(0)}
        className="w-52 flex flex-col justify-center gap-2 px-6 border-r border-white/10 shrink-0"
      >
        <SectionLabel>Demonstration</SectionLabel>
        <h2 className="text-2xl font-light text-white mb-6 tracking-tight">
          Sample{" "}
          <em className="font-(family-name:--font-instrument) italic text-white/70">
            Results
          </em>
        </h2>

        <div className="space-y-2">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1, ease: EASE }}
              onClick={() => setCategory(cat.id)}
              className={`w-full text-left px-4 py-3 rounded-sm border transition-all duration-300 ${
                category === cat.id
                  ? "bg-white/15 border-white/30 text-white"
                  : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white/80"
              }`}
            >
              <span className="block text-sm font-medium">{cat.label}</span>
              <span className="block text-[10px] text-white/30 font-mono mt-0.5">
                {cat.orient}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.aside>

      {/* ── Image panels ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col py-10 px-8 gap-4 min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex gap-5 flex-1 min-h-0"
          >
            {panels.map((panel, i) => (
              <motion.div
                key={panel.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                className="flex-1 flex flex-col gap-3 min-h-0"
              >
                {/* Column header */}
                <div className="flex items-center gap-3 shrink-0">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/40 font-light whitespace-nowrap">
                    {panel.label}
                  </p>
                  <div className="flex-1 h-px bg-white/8" />
                </div>

                {/* Image frame — uniform dimensions for all categories */}
                <div className="relative flex-1 min-h-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                  {SAMPLE_IMAGES[category][panel.key] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={SAMPLE_IMAGES[category][panel.key]}
                      alt={`${category} ${panel.label}`}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  ) : (
                    /* Placeholder — visible until a real path is set above */
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <div className="w-14 h-14 rounded-full border border-dashed border-white/15 flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white/15" />
                      </div>
                      <div className="text-center space-y-1.5 px-6">
                        <p className="text-[11px] text-white/25 font-medium uppercase tracking-widest">
                          Placeholder
                        </p>
                        <p className="text-[10px] text-white/15 font-mono leading-relaxed">
                          SAMPLE_IMAGES
                          <br />
                          .{category}.{panel.key}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}


export function DiscussionSlide() {
  return (
    <div className="flex flex-col h-full justify-center px-8">
      <div className="max-w-275 mx-auto w-full">
        <SectionLabel>Discussion</SectionLabel>
        <motion.h2
          {...fadeUp(0)}
          className="text-4xl md:text-5xl font-light text-white mb-12 tracking-tight"
        >
          Insights &amp;{" "}
          <em className="font-(family-name:--font-instrument) italic text-white/70">
            Limitations
          </em>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div {...scaleUp(0.2)}>
            <GlassPanel className="relative overflow-hidden">
              <CornerAccents />
              <div className="text-5xl font-light text-rose-300/90 mb-4">
                0.41
              </div>
              <h4 className="text-xl font-medium text-white mb-4">
                Short Text BLEU
              </h4>
              <p className="text-sm text-white/50 font-light leading-relaxed">
                Fragments under 10 characters, exclamations, SFX, single
                words score lowest, due to limited n-gram overlap. Longer
                segments achieve{" "}
                <span className="text-emerald-300/90 font-medium">
                  0.72 BLEU
                </span>
                .
              </p>
            </GlassPanel>
          </motion.div>

          <motion.div {...scaleUp(0.4)}>
            <GlassPanel className="relative overflow-hidden">
              <CornerAccents />
              <div className="text-5xl font-light text-amber-300/90 mb-4">
                1.8s
              </div>
              <h4 className="text-xl font-medium text-white mb-4">
                Rendering Bottleneck
              </h4>
              <p className="text-sm text-white/50 font-light leading-relaxed">
                Rendering is the slowest stage (mean 1,805 ms) with high
                variability due to image complexity and text reconstruction
                demands.
              </p>
            </GlassPanel>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.6)}>
          <GlassPanel className="mt-8 flex items-center gap-6 py-5 px-6">
            <Lightbulb className="w-7 h-7 text-white/40 shrink-0" />
            <p className="text-sm text-white/60 font-light">
              <strong className="text-white/90 font-medium">
                Key takeaway:
              </strong>{" "}
              SnipShot excels at multi-sentence dialogue translation but needs
              domain-specific fine-tuning for stylized fonts, SFX, and very
              short utterances. Cloud dependency is a limitation for offline use.
            </p>
          </GlassPanel>
        </motion.div>
      </div>
    </div>
  );
}


export function ConclusionSlide() {
  return (
    <div className="flex flex-col h-full justify-center px-8 text-center">
      <div className="max-w-250 mx-auto w-full">
        <motion.div
          {...scaleUp(0)}
          className="mx-auto w-20 h-20 rounded-full bg-white/6 border border-white/12 flex items-center justify-center mb-8"
        >
          <Rocket className="w-10 h-10 text-white/60" />
        </motion.div>

        <motion.h3
          {...fadeUp(0.15)}
          className="text-4xl md:text-6xl font-light text-white mb-8 tracking-tight"
        >
          Bridging the{" "}
          <em className="font-(family-name:--font-instrument) italic text-white/80">
            Language Gap
          </em>
        </motion.h3>

        <motion.p
          {...fadeUp(0.3)}
          className="text-lg text-white/50 max-w-3xl mx-auto mb-14 leading-relaxed font-light"
        >
          SnipShot demonstrates that a unified deep learning pipeline can{" "}
          <span className="text-white/90 font-medium">
            effectively translate
          </span>{" "}
          text embedded in digital comics achieving 88.98% OCR accuracy,
          moderate-to-good BLEU translation scores, and strong user acceptance.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          {[
            {
              title: "Fine-tune OCR Models",
              desc: "Train on artistic and stylized comic fonts to push accuracy beyond 88.98%.",
              icon: Eye,
            },
            {
              title: "Local LLM Translation",
              desc: "Explore quantized on-device models for offline functionality and reduced latency.",
              icon: Shield,
            },
            {
              title: "Expand Language Support",
              desc: "Add more in-demand languages to serve a broader global readership.",
              icon: Globe,
            },
          ].map((item, i) => (
            <motion.div key={item.title} {...fadeUp(0.4 + i * 0.1)}>
              <GlassPanel className="p-6">
                <CornerAccents />
                <item.icon className="w-7 h-7 text-white/50 mb-3" />
                <h4 className="text-base font-medium text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-white/40 font-light leading-relaxed">
                  {item.desc}
                </p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
