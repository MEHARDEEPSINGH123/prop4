"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { communities, CommunityEnriched, formatNumber } from "@/data/dataset";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Leaf,
  Cpu,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function CommunityDiscovery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeCommunity = communities[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % communities.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + communities.length) % communities.length);
  };

  const jumpToResidenceShowcase = (communityId: string) => {
    // Set url hash or trigger custom event for residence filter
    window.location.hash = `#residences?comm=${communityId}`;
    const el = document.getElementById("residences");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="communities"
      className="relative w-full min-h-screen bg-primary text-parchment overflow-hidden flex flex-col justify-between py-12 sm:py-16"
    >
      {/* Dynamic Background Image with Smooth Crossfade */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCommunity.community_id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full bg-cover bg-center brightness-[0.55] contrast-[1.05]"
            style={{
              backgroundImage: `url('${activeCommunity.heroImage}')`,
            }}
          />
        </AnimatePresence>

        {/* Ambient Darkened Gradient Masks for Ultimate Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-transparent to-primary/85" />
      </div>

      {/* Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-sans tracking-wide text-accent font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Enclave Portfolio</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Community Discovery
          </h2>
        </div>

        {/* Progress & Quick Scrub */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="font-heading text-2xl font-bold text-white tracking-tight">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-stone-400 font-mono text-sm"> / {communities.length}</span>
            <p className="text-[11px] text-stone-400 uppercase tracking-widest">Master Planned</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              data-interactive
              aria-label="Previous Community"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              data-interactive
              aria-label="Next Community"
              className="p-3 rounded-full bg-accent hover:bg-accent-hover text-white backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 shadow-luxury"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Viewport Content for Active Community */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 my-auto py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCommunity.community_id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center"
          >
            {/* Left Column: Community Narrative & Identity */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Badges: District & Availability */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono text-stone-200">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  {activeCommunity.district}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
                    activeCommunity.availability === "Now Selling"
                      ? "bg-success/20 border border-success/40 text-emerald-300"
                      : activeCommunity.availability === "Limited Units"
                      ? "bg-accent/20 border border-accent/40 text-amber-200"
                      : "bg-white/10 border border-white/20 text-stone-300"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {activeCommunity.availability}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.08] mb-4">
                {activeCommunity.name}
              </h3>

              <p className="font-editorial italic text-xl sm:text-2xl text-accent/90 mb-4 max-w-2xl font-light">
                "{activeCommunity.tagline}"
              </p>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-sans mb-6">
                {activeCommunity.description}
              </p>

              {/* Highlights Chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {activeCommunity.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-md bg-stone-900/60 border border-stone-700/60 text-stone-300 text-xs font-sans tracking-wide"
                  >
                    • {h}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => jumpToResidenceShowcase(activeCommunity.community_id)}
                  data-interactive
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-white text-sm font-semibold tracking-wide transition-all shadow-luxury hover:scale-[1.02]"
                >
                  <span>Discover Residences</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#book-tour"
                  data-interactive
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 text-sm font-medium tracking-wide backdrop-blur-md border border-white/15 transition-all"
                >
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>Reserve Private Tour</span>
                </a>
              </div>
            </div>

            {/* Right Column: Architectural Specifications Glass Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-stone-900/80 backdrop-blur-xl border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                  <span className="text-xs uppercase font-mono tracking-widest text-stone-400">
                    Architectural Index
                  </span>
                  <span className="text-xs font-mono text-accent">
                    {activeCommunity.energyRating}
                  </span>
                </div>

                {/* Starting Price Showcase */}
                <div>
                  <span className="text-xs text-stone-400 uppercase tracking-wider block font-sans">
                    Starting Investment
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
                      SGD ${formatNumber(activeCommunity.starting_price_sgd)}
                    </span>
                    <span className="text-xs text-stone-400">SGD</span>
                  </div>
                  <span className="text-[11px] text-stone-400">
                    Approx. ${(activeCommunity.starting_price_sgd / 1000000).toFixed(2)}M • Tier-1 Asset
                  </span>
                </div>

                {/* Dual Metrics: Smart Score & Sustainability Score */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-stone-300 mb-2">
                      <span className="text-xs font-medium font-sans">Smart Score</span>
                      <Cpu className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-heading text-3xl font-bold text-white">
                          {activeCommunity.smartScore}
                        </span>
                        <span className="text-xs text-stone-400">/100</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                        <div
                          className="bg-accent h-full rounded-full"
                          style={{ width: `${activeCommunity.smartScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-stone-300 mb-2">
                      <span className="text-xs font-medium font-sans">Sustainability</span>
                      <Leaf className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-heading text-3xl font-bold text-white">
                          {activeCommunity.sustainabilityScore}
                        </span>
                        <span className="text-xs text-stone-400">/100</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                        <div
                          className="bg-emerald-400 h-full rounded-full"
                          style={{ width: `${activeCommunity.sustainabilityScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lead Architect & Residence Count */}
                <div className="pt-2 text-xs text-stone-300 space-y-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Master Architect</span>
                    <span className="font-semibold text-stone-200">{activeCommunity.architect}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Curated Residences</span>
                    <span className="font-semibold text-stone-200">{activeCommunity.unitsCount} Units Available</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Horizontal Community Scrubber Bar at Bottom */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 pt-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 border-t border-white/10">
          {communities.map((c, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={c.community_id}
                onClick={() => setCurrentIndex(idx)}
                data-interactive
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-sans transition-all duration-200 ${
                  isSelected
                    ? "bg-accent text-white font-semibold shadow-md"
                    : "bg-white/5 hover:bg-white/15 text-stone-400 hover:text-stone-200"
                }`}
              >
                {c.name.replace("The Horizon ", "")}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
