"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

import RevealSection from "@/components/motion/RevealSection";
import {
  fadeInLeft,
  fadeInUp,
  staggerContainer,
} from "@/components/motion/variants";

const bullets = [
  "Sub-second snip → translate → read workflow",
  "Handles complex layouts: vertical text, SFX, speech bubbles",
  "7-stage AI pipeline: detect → OCR → translate → inpaint → render",
  "Survey-backed: 5/5 usefulness from 79+ manga fans",
];

const screenshots = [
  "/sample_pages/Screenshot_36.png",
  "/sample_pages/Screenshot_37.png",
  "/sample_pages/Screenshot_38.png",
];

export default function AdvantageSection() {
  const imgRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + screenshots.length) % screenshots.length
    );
  };

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
                SnipShot runs seamlessly in the cloud — accessible from any
                device with a full-size display. No local hardware requirements,
                no subscription walls. Just fast, accurate translation built for
                long reading sessions.
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

          {/* Image side with carousel */}
          <div className="relative" ref={imgRef}>
            <motion.div
              className="clip-corner-lg overflow-hidden relative"
              style={{ y: imgY }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.img
                key={screenshots[currentIndex]}
                src={screenshots[currentIndex]}
                alt="Desktop manga translation workflow"
                className="w-full h-auto object-cover"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                animate="visible"
                viewport={{ once: true, margin: "-60px" }}
              />

              {/* Left button */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Right button */}
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      currentIndex === index
                        ? "bg-white"
                        : "bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Subtle glow behind image */}
            <div className="absolute -inset-4 -z-10 rounded-full bg-cyan/5 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}