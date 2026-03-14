"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle } from "lucide-react";
import RevealSection from "@/components/motion/RevealSection";
import {
  fadeInLeft,
  fadeInUp,
  staggerContainer,
} from "@/components/motion/variants";
import { useRef } from "react";

const bullets = [
  "Sub-second snip → translate → read workflow",
  "Handles complex layouts: vertical text, SFX, speech bubbles",
  "7-stage AI pipeline: detect → OCR → translate → inpaint → render",
  "Survey-backed: 5/5 usefulness from 79+ manga fans",
];

export default function AdvantageSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);

  return (
    <section id="advantage" className="bg-[#050505] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Text side */}
          <div>
            <RevealSection>
              <h2 className="heading text-3xl sm:text-4xl lg:text-5xl text-white">
                Desktop Power,
                <br />
                No Compromises
              </h2>

              <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-lg">
                SnipShot runs seamlessly in the cloud — accessible from any device with a full-size display. No
                local hardware requirements, no subscription walls. Just fast, accurate
                translation built for long reading sessions.
              </p>
            </RevealSection>

            {/* Staggered bullets */}
            <motion.ul
              className="mt-8 space-y-4"
              variants={staggerContainer(0.12, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {bullets.map((b) => (
                <motion.li
                  key={b}
                  className="flex items-start gap-3"
                  variants={fadeInLeft}
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
                  <span className="text-sm text-gray-200 leading-relaxed">
                    {b}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Image side with parallax */}
          <div className="relative" ref={imgRef}>
            <motion.div
              className="clip-corner-lg overflow-hidden"
              style={{ y: imgY }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80"
                alt="Desktop manga translation workflow"
                className="w-full h-auto object-cover aspect-[4/3]"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              />
            </motion.div>
            {/* Subtle glow behind image */}
            <div className="absolute -inset-4 -z-10 bg-cyan/5 blur-3xl rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
