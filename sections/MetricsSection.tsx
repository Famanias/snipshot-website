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
  { numericValue: 100, suffix: "%", label: "Free" },
  { numericValue: 100, suffix: "%", label: "Open Source" }
];

export default function MetricsSection() {
  return (
    <section id="metrics" className="bg-cyan py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="flex flex-wrap justify-center gap-8 lg:gap-16 text-center"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {metrics.map((m) => (
            <motion.div key={m.label} variants={popIn} className="w-36 sm:w-44">
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