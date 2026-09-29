"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { lifestyleZones, LifestyleCategory } from "@/data/dataset";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  ArrowRight,
  Shield,
  Tag,
} from "lucide-react";

const CATEGORIES: ("All" | LifestyleCategory)[] = [
  "All",
  "Wellness",
  "Retail",
  "Entertainment",
  "Dining",
  "Nature",
  "Family Living",
  "Technology",
];

export default function LifestyleExperience() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | LifestyleCategory>("All");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredZones =
    selectedCategory === "All"
      ? lifestyleZones
      : lifestyleZones.filter((z) => z.category === selectedCategory);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -460 : 460;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="lifestyle"
      className="relative w-full min-h-screen bg-primary text-parchment py-24 border-t border-white/10 overflow-hidden"
    >
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-sans tracking-wide text-accent font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Lifestyle Realms</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Lifestyle Experience
            </h2>
            <p className="font-editorial italic text-xl text-stone-300 mt-1">
              40 curated experiential sanctuaries designed around human restoration and sensory joy
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleScroll("left")}
              data-interactive
              aria-label="Scroll Left"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              data-interactive
              aria-label="Scroll Right"
              className="p-3 rounded-full bg-accent hover:bg-accent-hover text-white backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 shadow-luxury"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 7 Required Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-6 pb-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                data-interactive
                className={`px-4 py-2 rounded-full text-xs font-medium font-sans whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-accent text-white font-semibold shadow-md"
                    : "bg-white/10 hover:bg-white/20 text-stone-300 border border-white/10"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 opacity-60 font-mono text-[10px]">
                    ({lifestyleZones.filter((z) => z.category === cat).length})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal Scroll Showcase Reel */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto no-scrollbar px-6 sm:px-12 scroll-smooth cursor-grab active:cursor-grabbing pb-8"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {filteredZones.map((zone, idx) => (
          <motion.div
            key={zone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (idx % 6) * 0.08 }}
            className="flex-shrink-0 w-[85vw] sm:w-[420px] md:w-[480px] rounded-3xl bg-stone-900/90 border border-white/15 overflow-hidden shadow-2xl group flex flex-col justify-between"
            style={{ scrollSnapAlign: "start" }}
            data-cursor-expand
          >
            {/* Top Fullscreen Imagery Showcase */}
            <div className="relative w-full h-72 sm:h-80 overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center brightness-[0.75] group-hover:scale-105 group-hover:brightness-90 transition-transform duration-700 ease-out"
                style={{ backgroundImage: `url('${zone.image}')` }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/40" />

              {/* Badges on Image */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-primary/80 backdrop-blur-md border border-white/20 text-xs font-mono text-accent">
                  {zone.category}
                </span>
              </div>

              {/* Zone Title on Image Bottom */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  {zone.curatedName}
                </h3>
              </div>
            </div>

            {/* Bottom Card Content */}
            <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow space-y-6">
              <div>
                <p className="font-editorial italic text-lg text-accent/90 mb-2 font-light">
                  "{zone.tagline}"
                </p>
                <p className="text-stone-300 text-sm leading-relaxed font-sans">
                  {zone.description}
                </p>
              </div>

              {/* Tags & Hours */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {zone.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-stone-300 text-[11px] font-sans"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-stone-400 font-mono pt-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    <span>{zone.hours}</span>
                  </div>
                  <span className="text-stone-300">{zone.curator}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reel Bottom Progress & Count */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-4 flex items-center justify-between text-xs text-stone-400 font-mono">
        <span>Displaying {filteredZones.length} of 40 Total Lifestyle Zones</span>
        <span className="hidden sm:inline">Drag or scroll horizontally to explore</span>
      </div>
    </section>
  );
}
