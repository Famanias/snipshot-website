"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import adsData from "@/data/advertisements.json";

interface Advertisement {
  active: boolean;
  title?: string;
  description?: string;
  url: string;
  image?: string;
}

export default function HeroAd() {
  // Filter all active ads
  const activeAds = (adsData as Advertisement[]).filter((ad) => ad.active);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Rotate ads every 6 seconds unless hovered
  useEffect(() => {
    if (activeAds.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeAds.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [activeAds.length, isHovered]);

  // If no ads are active, do not render
  if (activeAds.length === 0) return null;

  // Safe bounds check just in case
  const currentAd = activeAds[currentIndex] || activeAds[0];
  const { title, description, url, image } = currentAd;

  const hasImage = !!image;
  const hasCopy = !!title || !!description;

  const isCard = hasImage && hasCopy;
  const isImageOnly = hasImage && !hasCopy;
  const isTextBanner = !hasImage && hasCopy;

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
      className="mb-8 w-full flex flex-col items-center px-4 z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wrapper with a stable minimum height to prevent page layout jitter during transitions */}
      <div className="w-full max-w-xl min-h-[96px] flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full flex justify-center"
          >
            {isCard && (
              <motion.a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full max-w-xl glass clip-corner p-5 text-left border border-cyan/15 hover:border-cyan/40 hover:shadow-[0_0_25px_rgba(14,165,233,0.15)] transition-all duration-300 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:ring-offset-2 focus:ring-offset-black"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Subtle background glow that animates on hover */}
                <div className="absolute -right-12 -top-12 -z-10 w-28 h-28 bg-cyan/5 rounded-full blur-2xl transition-all duration-300 group-hover:bg-cyan/15 group-hover:scale-110" />
                
                <div className="flex items-center gap-4">
                  {image && (
                    <div className="relative w-16 h-16 shrink-0 rounded-lg border border-white/10 overflow-hidden bg-black/35 flex items-center justify-center">
                      <img
                        src={image}
                        alt={description || "Partner logo"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-cyan bg-cyan/10 px-2 py-0.5 rounded border border-cyan/25">
                        {title || "SPONSORED"}
                      </span>
                    </div>
                    {description && (
                      <p className="mt-2 text-xs md:text-sm text-gray-300 font-medium line-clamp-2 leading-relaxed transition-colors duration-300 group-hover:text-white">
                        {description}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-gray-400 group-hover:text-cyan group-hover:border-cyan/35 group-hover:bg-cyan/5 transition-all duration-300">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </motion.a>
            )}

            {isImageOnly && (
              <motion.a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full max-w-xl overflow-hidden rounded-xl border border-white/10 hover:border-cyan/40 hover:shadow-[0_0_25px_rgba(14,165,233,0.15)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:ring-offset-2 focus:ring-offset-black"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Visit sponsored partner website"
              >
                <img
                  src={image}
                  alt="Sponsored advertisement"
                  className="w-full h-auto object-cover max-h-40 transition-transform duration-500 group-hover:scale-[1.01]"
                  loading="lazy"
                />
              </motion.a>
            )}

            {isTextBanner && (
              <motion.a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full max-w-xl items-center justify-between gap-4 py-3 px-5 glass rounded-xl border border-white/10 hover:border-cyan/40 hover:shadow-[0_0_20px_rgba(14,165,233,0.1)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:ring-offset-2 focus:ring-offset-black"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="shrink-0 text-[9px] font-bold tracking-widest uppercase text-cyan bg-cyan/10 px-1.5 py-0.5 rounded border border-cyan/20">
                    {title || "SPONSORED"}
                  </span>
                  {description && (
                    <p className="text-xs text-gray-300 font-medium truncate transition-colors duration-300 group-hover:text-white">
                      {description}
                    </p>
                  )}
                </div>
                <div className="shrink-0 flex items-center gap-1.5 text-xs text-gray-400 group-hover:text-cyan transition-colors duration-300">
                  <span className="hidden sm:inline">Learn More</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </motion.a>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators: Render only if there are multiple active ads */}
      {activeAds.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {activeAds.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? "bg-cyan w-3"
                  : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to ad slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
