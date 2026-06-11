"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Scissors, ArrowRight, Menu, X } from "lucide-react";
import { buttonHover, buttonTap } from "./motion/variants";

const links = [
  { label: "Features", href: "/#features" },
  { label: "Why Desktop", href: "/#advantage" },
  { label: "Results", href: "/#metrics" },
  { label: "Contact", href: "/#contact" },
  { label: "Advertise", href: "/advertise" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], [0, 0.85]);
  const navBlur = useTransform(scrollY, [0, 80], [0, 12]);

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: useTransform(navBg, (v) => `rgba(0,0,0,${v})`),
        backdropFilter: useTransform(navBlur, (v) => `blur(${v}px)`),
        WebkitBackdropFilter: useTransform(navBlur, (v) => `blur(${v}px)`),
      }}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.a
          href="/"
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <Scissors className="h-6 w-6 text-cyan" />
          <span className="text-lg font-bold uppercase tracking-tight text-white">
            SnipShot
          </span>
        </motion.a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <motion.a
              key={l.href}
              href={l.href}
              className="relative text-sm uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
              whileHover="hover"
            >
              {l.label}
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-cyan origin-left"
                initial={{ scaleX: 0 }}
                variants={{ hover: { scaleX: 1 } }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            </motion.a>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <motion.a
            href="https://github.com/Famanias/snipshot-desktop/releases"
            className="hidden md:inline-flex items-center gap-2 clip-corner bg-cyan px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-black hover:bg-cyan-dark transition-colors"
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            Download Now
            <ArrowRight className="h-4 w-4" />
          </motion.a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-black/95 backdrop-blur-md border-t border-white/10 px-6 pb-6 pt-2"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#cta"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex items-center gap-2 clip-corner bg-cyan px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-black"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              Download Now
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
