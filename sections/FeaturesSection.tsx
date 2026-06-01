"use client";

import { motion } from "framer-motion";
import { Scissors, Scan, Languages, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import MouseTiltCard from "@/components/motion/MouseTiltCard";
import RevealSection from "@/components/motion/RevealSection";
import { staggerContainer, fadeInUp } from "@/components/motion/variants";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Scissors,
    title: "Snip Anywhere",
    description:
      "Select any screen region — manga pages, webtoons, light novel scans, or raw raws — and capture it instantly.",
  },
  {
    icon: Scan,
    title: "Smart OCR",
    description:
      "Our OCR engine excels at vertical Japanese text, stylised manga fonts, speech bubbles, and complex panel layouts that trip up generic tools.",
  },
  {
    icon: Languages,
    title: "Instant Translation",
    description:
      "Translate extracted text seamlessly - powered with our AI-powered translator full context awareness.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-black py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <RevealSection className="text-center max-w-2xl mx-auto">
          <h2 className="heading text-3xl sm:text-4xl lg:text-5xl text-white">
            Built for Readers
          </h2>
          <p className="mt-4 text-gray-400 text-lg leading-relaxed">
            Three powerful stages that turn any screenshot into readable,
            translated text — no manual work required.
          </p>
        </RevealSection>

        {/* Cards grid — staggered reveal + tilt */}
        <motion.div
          className="mt-14 grid gap-6 md:grid-cols-3"
          variants={staggerContainer(0.18, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={fadeInUp}>
              <MouseTiltCard className="h-full">
                <motion.div
                  className="glass clip-corner-lg relative group overflow-hidden p-8 h-full"
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="shine-gradient absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <f.icon className="relative h-10 w-10 text-cyan" />

                  <h3 className="relative mt-5 heading text-lg text-white">
                    {f.title}
                  </h3>

                  <p className="relative mt-3 text-sm text-gray-400 leading-relaxed">
                    {f.description}
                  </p>

                  <a
                    href="#cta"
                    className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan hover:text-white transition-colors"
                  >
                    {/* Learn More
                    <ArrowRight className="h-4 w-4" /> */}
                  </a>
                </motion.div>
              </MouseTiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
