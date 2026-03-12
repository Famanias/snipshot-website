"use client";

import { useEffect, useRef } from "react";
import {
  useMotionValue,
  useSpring,
  useInView,
  motion,
} from "framer-motion";

interface Props {
  /** The target number to count up to */
  value: number;
  /** Suffix to append (e.g. "+", "/5") */
  suffix?: string;
  /** Prefix to prepend (e.g. "~") */
  prefix?: string;
  /** Duration hint in seconds */
  duration?: number;
  className?: string;
}

export default function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, {
    stiffness: 60,
    damping: 20,
    duration,
  });

  useEffect(() => {
    if (isInView) motionVal.set(value);
  }, [isInView, motionVal, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v: number) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [spring, prefix, suffix]);

  return (
    <motion.span
      ref={ref}
      className={className}
    >
      {prefix}0{suffix}
    </motion.span>
  );
}
