"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeInUp } from "./variants";
import type { ReactNode } from "react";

interface Props extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  /** px before viewport edge to trigger (negative = earlier) */
  margin?: string;
}

export default function RevealSection({
  children,
  className,
  margin = "-80px",
  ...rest
}: Props) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
