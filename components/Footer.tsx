"use client";

import { motion } from "framer-motion";
import { Scissors, ArrowRight, Twitter, Linkedin, Instagram } from "lucide-react";
import { FormEvent, useRef } from "react";
import { staggerContainer, fadeInUp } from "./motion/variants";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "Why Desktop", href: "#advantage" },
  { label: "Results", href: "#metrics" },
  { label: "Download", href: "#cta" },
];

const projectLinks = [
  { label: "About", href: "#" },
  { label: "GitHub", href: "https://github.com/" },
  { label: "Thesis", href: "#" },
  { label: "Contact", href: "#contact" },
];

// const socials = [
//   { icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
//   { icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
//   { icon: Instagram, href: "https://instagram.com/", label: "Instagram" },
// ];

export default function Footer() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <footer id="contact" className="bg-black border-t border-[#1A1A1A]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <motion.div
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Col 1 — Brand */}
          <motion.div variants={fadeInUp}>
            <a href="#" className="flex items-center gap-2">
              <Scissors className="h-6 w-6 text-cyan" />
              <span className="text-lg font-bold uppercase tracking-tight text-white">
                SnipShot
              </span>
            </a>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Snip, Read, Translate:
              <br />
              Manga Made Accessible.
            </p>
          </motion.div>

          {/* Col 2 — Product links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Product
            </h4>
            <ul className="mt-4 space-y-3">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Project links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Project
            </h4>
            <ul className="mt-4 space-y-3">
              {projectLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                    {...(l.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4 — Stay Updated */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Stay Updated
            </h4>
            <form onSubmit={handleSubmit} className="mt-4 flex">
              <input
                ref={inputRef}
                type="email"
                required
                placeholder="you@email.com"
                className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan"
              />
              <button
                type="submit"
                className="clip-corner bg-cyan px-4 py-2.5 text-black hover:bg-cyan-dark transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-2 text-xs text-gray-500">
              Get notified on new releases and updates.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1A1A1A]">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-center gap-4 px-6 py-6">
          <p className="text-xs text-gray-500">
            &copy; 2026 SnipShot. All rights reserved.
          </p>
          {/* <div className="flex items-center gap-4">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label={s.label}
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <s.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
}
