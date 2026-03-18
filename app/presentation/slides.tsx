"use client";

import { motion } from "framer-motion";
import {
  Scissors,
  Image,
  Type,
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

/* ─── animation helpers ─── */
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { delay, duration: 0.7, ease: EASE },
});

const fadeLeft = (delay = 0) => ({
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { delay, duration: 0.7, ease: EASE },
});

const fadeRight = (delay = 0) => ({
  initial: { x: 50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { delay, duration: 0.7, ease: EASE },
});

const scaleUp = (delay = 0) => ({
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { delay, duration: 0.7, ease: EASE },
});

/* ─────────────────────────── TITLE SLIDE ─────────────────────────── */

export function TitleSlide() {
  return (
    <div className="flex flex-col h-full items-center justify-center px-8 md:px-24 max-w-7xl mx-auto w-full text-center">
      {/* Decorative glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(14,165,233,0.4), transparent 70%)",
          }}
        />
      </div>

      <motion.div
        {...scaleUp(0)}
        className="mb-8 mx-auto w-20 h-20 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center"
      >
        <Scissors className="w-10 h-10 text-cyan" />
      </motion.div>

      <motion.h1
        {...fadeUp(0.2)}
        className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-5xl leading-tight"
      >
        <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan to-sky-300">
          SnipShot
        </span>
      </motion.h1>

      <motion.h2
        {...fadeUp(0.4)}
        className="text-xl md:text-3xl font-medium text-gray-300 max-w-4xl leading-relaxed mt-4"
      >
        A Deep Learning–Based System for Translating Text in Digital Comics
      </motion.h2>

      <motion.div
        {...fadeUp(0.6)}
        className="pt-12 flex flex-col items-center space-y-4"
      >
        <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold">
          Researchers
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-gray-400 font-medium">
          <span className="text-cyan">John Lynard F. Isip</span>
          <span>Arvin Shelby de Leon</span>
          <span>Denise Lou B. Punzalan</span>
        </div>
        <p className="text-xs text-gray-600 pt-2">
          Gordon College, Olongapo City, Philippines
        </p>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────── INTRODUCTION SLIDE ─────────────────────────── */

export function IntroSlide() {
  return (
    <div className="flex flex-col h-full justify-center px-8 md:px-24 max-w-7xl mx-auto w-full">
      <div className="mb-12">
        <h2 className="text-sm uppercase tracking-widest text-cyan font-bold mb-2">
          Introduction
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white">
          The Language Barrier in Comics
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          {...fadeLeft(0.2)}
          className="space-y-6"
        >
          <p className="text-xl text-gray-300 leading-relaxed">
            Digital comics attract{" "}
            <span className="text-cyan font-semibold">150 million</span>{" "}
            monthly readers worldwide, yet translating embedded text remains a{" "}
            <span className="text-rose-400 font-semibold">
              fragmented, 7-step process
            </span>
            .
          </p>

          <ul className="space-y-4 text-gray-400 text-lg">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-cyan shrink-0 mt-1" />
              <span>
                Existing tools are mobile-only, leaving desktop readers
                underserved.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-cyan shrink-0 mt-1" />
              <span>
                Text overlays disrupt visual storytelling and artistic
                composition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-cyan shrink-0 mt-1" />
              <span>
                Multi-step workflows interrupt the natural reading flow.
              </span>
            </li>
          </ul>
        </motion.div>

        <motion.div {...fadeRight(0.4)} className="relative">
          <div className="absolute inset-0 bg-linear-to-tr from-cyan/20 to-sky-500/10 rounded-3xl blur-2xl" />
          <div className="relative bg-gray-900/50 border border-gray-800 p-8 rounded-3xl flex flex-col items-center gap-8">
            {/* Traditional workflow vs SnipShot */}
            <div className="flex items-center justify-between w-full px-4">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-rose-400" />
                </div>
                <p className="text-sm text-gray-400 text-center">
                  Traditional
                  <br />
                  <span className="text-rose-400 font-bold">7 Steps</span>
                </p>
              </div>

              <ChevronRight className="w-8 h-8 text-gray-600" />

              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-cyan/20 border border-cyan/30 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-cyan" />
                </div>
                <p className="text-sm text-gray-400 text-center">
                  SnipShot
                  <br />
                  <span className="text-cyan font-bold">1 Click</span>
                </p>
              </div>
            </div>

            <div className="w-full border-t border-gray-800 pt-6">
              <p className="text-2xl font-bold text-white mb-2">SnipShot</p>
              <p className="text-gray-400">
                Snip any panel, get an instant in-image translation{" "}
                <br />
                powered by deep learning—no manual steps.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────── METHODS SLIDE ─────────────────────────── */

export function MethodsSlide() {
  return (
    <div className="flex flex-col h-full justify-center px-8 md:px-24 max-w-7xl mx-auto w-full">
      <div className="mb-12">
        <h2 className="text-sm uppercase tracking-widest text-emerald-400 font-bold mb-2">
          Methodology
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white">
          Five-Stage AI Pipeline
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Pipeline card */}
        <motion.div
          {...fadeUp(0.2)}
          className="bg-gray-900/50 border border-gray-800 p-8 rounded-3xl"
        >
          <Brain className="w-12 h-12 text-emerald-400 mb-6" />
          <h4 className="text-2xl font-bold text-white mb-4">
            System Architecture
          </h4>
          <p className="text-gray-400 mb-6">
            End-to-end deep learning pipeline integrating five specialized AI
            models.
          </p>

          <div className="space-y-3 text-gray-300">
            {[
              {
                step: "01",
                label: "Detection",
                tech: "DBNet + ResNet-34",
                color: "bg-cyan",
              },
              {
                step: "02",
                label: "OCR",
                tech: "RoFormer + XPOS",
                color: "bg-sky-400",
              },
              {
                step: "03",
                label: "Translation",
                tech: "Llama-3-70b",
                color: "bg-emerald-400",
              },
              {
                step: "04",
                label: "Inpainting",
                tech: "LaMa",
                color: "bg-violet-400",
              },
              {
                step: "05",
                label: "Rendering",
                tech: "Text Placement",
                color: "bg-amber-400",
              },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-3">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${s.color}`}
                />
                <span className="text-gray-500 font-mono text-sm w-6">
                  {s.step}
                </span>
                <span className="font-semibold">{s.label}</span>
                <span className="text-gray-600 text-sm ml-auto font-mono">
                  {s.tech}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Research design card */}
        <motion.div
          {...fadeUp(0.4)}
          className="bg-gray-900/50 border border-gray-800 p-8 rounded-3xl"
        >
          <BarChart3 className="w-12 h-12 text-cyan mb-6" />
          <h4 className="text-2xl font-bold text-white mb-4">
            Research Design
          </h4>
          <p className="text-gray-400 mb-6">
            Descriptive-developmental study using Design Science Research (DSR)
            with Agile methodology.
          </p>

          <div className="flex items-center gap-4 mb-6">
            <div className="text-4xl font-black text-cyan">N=79</div>
            <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
              Survey
              <br />
              Participants
            </div>
          </div>

          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
              Technology Acceptance Model (TAM) framework
            </li>
            <li className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
              20 beta testers for hands-on evaluation
            </li>
            <li className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
              BLEU-4 automated translation benchmarking
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────── RESULTS SLIDE ─────────────────────────── */

function ProgressBar({
  label,
  percentage,
  textColor,
  bgColor,
}: {
  label: string;
  percentage: number;
  textColor: string;
  bgColor: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-gray-300 font-medium">{label}</span>
        <span className={`${textColor} font-bold`}>{percentage}%</span>
      </div>
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className={`h-full rounded-full ${bgColor}`}
        />
      </div>
    </div>
  );
}

export function ResultsSlide() {
  return (
    <div className="flex flex-col h-full justify-center px-8 md:px-24 max-w-7xl mx-auto w-full">
      <div className="mb-12">
        <h2 className="text-sm uppercase tracking-widest text-amber-400 font-bold mb-2">
          Results
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white">
          Proven Performance
        </h3>
      </div>

      <div className="grid md:grid-cols-12 gap-12">
        {/* Key stats */}
        <motion.div
          {...fadeLeft(0.2)}
          className="md:col-span-5 space-y-8"
        >
          <div className="bg-gray-900/80 border border-gray-800 p-8 rounded-3xl">
            <Target className="w-10 h-10 text-amber-400 mb-6" />
            <h4 className="text-xl font-bold text-white mb-2">
              Technical Benchmarks
            </h4>
            <p className="text-gray-400 mb-6">
              Automated evaluation across 9 test runs with human-verified ground
              truth.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "88.98%", label: "OCR Accuracy" },
                { value: "0.6139", label: "BLEU Score" },
                { value: "~5s", label: "Mean Process Time" },
                { value: "85.92%", label: "OCR Confidence" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-center"
                >
                  <div className="text-xl font-black text-amber-300">
                    {m.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Progress bars */}
        <motion.div
          {...fadeRight(0.4)}
          className="md:col-span-7 space-y-8 bg-gray-900/30 p-8 rounded-3xl border border-gray-800/50"
        >
          <h4 className="text-2xl font-bold text-white mb-8">
            User Acceptance (TAM)
          </h4>

          <div className="space-y-8">
            <ProgressBar
              label="Perceived Usefulness (PU)"
              percentage={78.4}
              textColor="text-cyan"
              bgColor="bg-cyan"
            />
            <ProgressBar
              label="Perceived Ease of Use (PEU)"
              percentage={70.0}
              textColor="text-emerald-400"
              bgColor="bg-emerald-400"
            />
            <ProgressBar
              label="BLEU scores for 11+ char segments"
              percentage={72.2}
              textColor="text-violet-400"
              bgColor="bg-violet-400"
            />
            <ProgressBar
              label="Sub-linear scaling across resolutions"
              percentage={88.9}
              textColor="text-amber-400"
              bgColor="bg-amber-400"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────── DISCUSSION SLIDE ─────────────────────────── */

export function DiscussionSlide() {
  return (
    <div className="flex flex-col h-full justify-center px-8 md:px-24 max-w-7xl mx-auto w-full">
      <div className="mb-12">
        <h2 className="text-sm uppercase tracking-widest text-rose-400 font-bold mb-2">
          Discussion
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white">
          Insights &amp; Limitations
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Short text challenge */}
        <motion.div
          {...scaleUp(0.2)}
          className="bg-linear-to-br from-gray-900 to-gray-950 border border-gray-800 p-10 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Type className="w-32 h-32 text-white" />
          </div>
          <div className="text-5xl font-black text-rose-400 mb-4">0.41</div>
          <h4 className="text-2xl font-bold text-white mb-4">
            Short Text BLEU
          </h4>
          <p className="text-gray-400 text-lg relative z-10">
            Fragments under 10 characters—exclamations, SFX, single words—score
            lowest, due to limited n-gram overlap. Longer segments achieve{" "}
            <span className="text-emerald-400 font-semibold">0.72 BLEU</span>.
          </p>
        </motion.div>

        {/* Rendering variability */}
        <motion.div
          {...scaleUp(0.4)}
          className="bg-linear-to-br from-gray-900 to-gray-950 border border-gray-800 p-10 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Image className="w-32 h-32 text-white" />
          </div>
          <div className="text-5xl font-black text-amber-400 mb-4">1.8s</div>
          <h4 className="text-2xl font-bold text-white mb-4">
            Rendering Bottleneck
          </h4>
          <p className="text-gray-400 text-lg relative z-10">
            Rendering is the slowest stage (mean 1,805 ms) with high variability
            due to image complexity and text reconstruction demands.
          </p>
        </motion.div>
      </div>

      <motion.div
        {...fadeUp(0.6)}
        className="mt-12 p-6 bg-gray-900/50 border border-gray-800 rounded-2xl flex items-center gap-6"
      >
        <Lightbulb className="w-8 h-8 text-cyan shrink-0" />
        <p className="text-gray-300">
          <strong className="text-white">Key takeaway:</strong> SnipShot
          excels at multi-sentence dialogue translation but needs
          domain-specific fine-tuning for stylized fonts, SFX, and very short
          utterances. Cloud dependency is a limitation for offline use.
        </p>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────── CONCLUSION SLIDE ─────────────────────────── */

export function ConclusionSlide() {
  return (
    <div className="flex flex-col h-full justify-center px-8 md:px-24 max-w-7xl mx-auto w-full text-center">
      <motion.div
        {...scaleUp(0)}
        className="mx-auto bg-cyan/10 w-24 h-24 rounded-full flex items-center justify-center mb-8 border border-cyan/20"
      >
        <Rocket className="w-12 h-12 text-cyan" />
      </motion.div>

      <motion.h3
        {...fadeUp(0.2)}
        className="text-4xl md:text-6xl font-bold text-white mb-8"
      >
        Bridging the Language Gap
      </motion.h3>

      <motion.p
        {...fadeUp(0.3)}
        className="text-xl text-gray-400 max-w-3xl mx-auto mb-16 leading-relaxed"
      >
        SnipShot demonstrates that a unified deep learning pipeline can{" "}
        <span className="text-white font-semibold">
          effectively translate
        </span>{" "}
        text embedded in digital comics—achieving 88.98% OCR accuracy, moderate-to-good BLEU translation scores, and strong user acceptance.
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
          <motion.div
            key={item.title}
            {...fadeUp(0.4 + i * 0.1)}
            className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl"
          >
            <item.icon className="w-8 h-8 text-cyan mb-3" />
            <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
