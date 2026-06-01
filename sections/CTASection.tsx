"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import RevealSection from "@/components/motion/RevealSection";
import {
  scaleIn,
  staggerContainer,
  buttonHover,
  buttonTap,
} from "@/components/motion/variants";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="relative bg-black py-24 lg:py-32 overflow-hidden"
    >
      {/* Radial glow with subtle pulse */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan/10 blur-[120px] rounded-full"
          animate={{ opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="relative mx-auto max-w-3xl px-6 text-center"
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <RevealSection>
          <h2 className="heading text-3xl sm:text-4xl lg:text-5xl text-white">
            Ready to Read
            <br />
            Without Limits?
          </h2>
        </RevealSection>

        <RevealSection>
          <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
            Download SnipShot and start reading raw manga, manhwa, and manhua in
            your language — for free. No account required.
          </p>
        </RevealSection>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <motion.a
            href="https://github.com/Famanias/snipshot-desktop/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="clip-corner inline-flex items-center gap-2.5 bg-cyan px-7 py-3.5 text-base font-bold uppercase tracking-wider text-black hover:bg-cyan-dark transition-colors"
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            Download SnipShot
            <ArrowRight className="h-5 w-5" />
          </motion.a>
          <motion.a
            href="#contact"
            className="clip-corner inline-flex items-center gap-2.5 border border-white/30 px-7 py-3.5 text-base font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            <Mail className="h-5 w-5" />
            Give Feedback
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
