"use client";

import { motion } from "framer-motion";
import { Scissors } from "lucide-react";
import { staggerContainer, fadeInUp } from "./motion/variants";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "Why SnipShot", href: "#advantage" },
  { label: "Results", href: "#metrics" },
  { label: "Download", href: "#cta" },
];

const projectLinks = [
  { label: "About", href: "/about" },
  { label: "Documentation", href: "/docs" },
  // { label: "Contact", href: "#contact" },
];

const legal = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

// const socials = [
//   { icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
//   { icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
//   { icon: Instagram, href: "https://instagram.com/", label: "Instagram" },
// ];

export default function Footer() {
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

          {/* Col 4 — Legal links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Legal
            </h4>
            <ul className="mt-4 space-y-3">
              {legal.map((l) => (
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
