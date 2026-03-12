import type { Variants, Transition } from "framer-motion";

/* ── Shared transitions ── */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
};

export const springBouncy: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 18,
};

export const springSmooth: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
};

/* ── Section / block fade-in-up ── */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ── Stagger container ── */
export const staggerContainer = (
  stagger = 0.15,
  delay = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

/* ── Scale-in with spring (CTA, hero glass) ── */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

/* ── Hero word reveal ── */
export const heroWord: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

/* ── Pop-in for metrics ── */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },
};

/* ── Button hover/tap ── */
export const buttonHover = {
  scale: 1.05,
  transition: springSnappy,
};

export const buttonTap = {
  scale: 0.96,
  transition: springSnappy,
};
