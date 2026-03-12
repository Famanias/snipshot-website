"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { buttonHover, buttonTap } from "./variants";
import type { ReactNode } from "react";

interface Props extends Omit<HTMLMotionProps<"a">, "children"> {
  children: ReactNode;
  href: string;
  className?: string;
}

export default function MotionButton({
  children,
  href,
  className = "",
  ...rest
}: Props) {
  return (
    <motion.a
      href={href}
      whileHover={buttonHover}
      whileTap={buttonTap}
      className={className}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
