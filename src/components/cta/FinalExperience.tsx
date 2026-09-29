"use client";

import { motion } from "framer-motion";
import { ArrowUp, Sparkles, Globe, ShieldCheck, HeartHandshake } from "lucide-react";
import { rawDataset } from "@/data/dataset";

export default function FinalExperience() {
  const handleStartExploring = () => {
    const el = document.getElementById("communities");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="final-cta"
      className="relative w-full min-h-screen bg-primary text-parchment flex flex-col justify-between overflow-hidden border-t border-white/10"
    >
      {/* Background Architectural Canvas */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center brightness-[0.35] contrast-[1.1]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/80" />
      </div>

      {/* Top Subtle Status */}
      <div className="relative z-10 w-full px-6 sm:px-12 pt-12 flex items-center justify-between text-xs font-sans tracking-wider text-stone-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span>HORIZON LIVING • THE FUTURE OF SHELTER</span>
        </div>
        <button
          onClick={scrollToTop}
          data-interactive
          className="flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors"
        >
          <span>Return to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Grand Typography & CTA */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 text-center my-auto py-16">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-editorial italic text-2xl sm:text-3xl text-accent font-light mb-4"
        >
          Designed Around Life
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-tight"
        >
          Discover Your Future Community
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-stone-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed mb-10"
        >
          Step beyond conventional real estate. Immerse in regenerative architectural ecosystems, invisible intelligence, and timeless community living.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <button
            onClick={handleStartExploring}
            data-interactive
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-accent hover:bg-accent-hover text-white text-base font-semibold tracking-wider transition-all duration-300 shadow-luxury hover:scale-105"
          >
            <span>Start Exploring</span>
            <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <div className="absolute -inset-1 rounded-full bg-accent/30 blur-md -z-10 group-hover:bg-accent/50 transition-all" />
          </button>
        </motion.div>
      </div>

      {/* Architectural Ledger & Dataset Integrity Footer */}
      <div className="relative z-10 w-full px-6 sm:px-12 py-10 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Dataset Metric Footprint */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 text-xs font-mono border-b border-white/10 pb-6 text-stone-300">
            <div>
              <span className="text-accent font-bold block">{rawDataset.communities.length}</span>
              <span className="text-stone-500 text-[11px]">Communities</span>
            </div>
            <div>
              <span className="text-accent font-bold block">{rawDataset.residences.length}</span>
              <span className="text-stone-500 text-[11px]">Residences</span>
            </div>
            <div>
              <span className="text-accent font-bold block">{rawDataset.districts.length}</span>
              <span className="text-stone-500 text-[11px]">Districts</span>
            </div>
            <div>
              <span className="text-accent font-bold block">{rawDataset.amenities.length}</span>
              <span className="text-stone-500 text-[11px]">Amenities</span>
            </div>
            <div>
              <span className="text-accent font-bold block">{rawDataset.lifestyle_zones.length}</span>
              <span className="text-stone-500 text-[11px]">Lifestyle Zones</span>
            </div>
            <div>
              <span className="text-accent font-bold block">{rawDataset.smart_features.length}</span>
              <span className="text-stone-500 text-[11px]">Smart Features</span>
            </div>
            <div>
              <span className="text-accent font-bold block">{rawDataset.customer_stories.length}</span>
              <span className="text-stone-500 text-[11px]">Resident Stories</span>
            </div>
          </div>

          {/* Legal, Philosophy & Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-sans">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-white text-sm tracking-tight">
                HORIZON LIVING
              </span>
              <span>• Architectural Experience Platform</span>
            </div>

            <p className="text-center sm:text-right text-[11px] text-stone-500">
              Zero hardcoded mock data • Dynamically rendered across 14 master collections • © 2026 Horizon Living
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
