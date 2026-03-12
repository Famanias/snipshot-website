"use client";

import { motion } from "framer-motion";
import AnimatedNumber from "@/components/motion/AnimatedNumber";
import { staggerContainer, popIn, fadeIn } from "@/components/motion/variants";

interface Metric {
  numericValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const metrics: Metric[] = [
  { numericValue: 5, suffix: "/5", label: "Usefulness Score" },
  { numericValue: 79, suffix: "+", label: "Manga Fans Surveyed" },
  { numericValue: 26, suffix: "+", label: "Languages Supported" },
  { numericValue: 1, prefix: "~", suffix: "s", label: "Avg. Process Speed" },
];

export default function MetricsSection() {
  return (
    <section id="metrics" className="bg-cyan py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 text-center"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {metrics.map((m) => (
            <motion.div key={m.label} variants={popIn}>
              <AnimatedNumber
                value={m.numericValue}
                prefix={m.prefix}
                suffix={m.suffix}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black"
              />
              <motion.p
                className="mt-2 text-sm font-bold uppercase tracking-wider text-black/70"
                variants={fadeIn}
              >
                {m.label}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
