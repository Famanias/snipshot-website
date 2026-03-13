"use client";

import { motion } from "framer-motion";
import WorkflowAnimation from "@/components/WorkflowAnimation";
import RevealSection from "@/components/motion/RevealSection";
import { fadeInUp } from "@/components/motion/variants";

export default function WorkflowSection() {
  return (
    <section id="workflow" className="bg-black py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <RevealSection className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-cyan/80">
            How It Works
          </p>
          <h2 className="heading mt-4 text-3xl text-white sm:text-4xl lg:text-5xl">
            Watch SnipShot Go From Raw Panel To Readable Translation
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-400">
            A single capture kicks off the entire flow: snip the panel, detect the text,
            extract the dialogue, and return a clean translation in seconds.
          </p>
        </RevealSection>

        <motion.div
          className="mx-auto mt-12 max-w-6xl"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <WorkflowAnimation/>
        </motion.div>
      </div>
    </section>
  );
}
