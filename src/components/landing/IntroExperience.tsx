"use client";

import { motion } from "framer-motion";
import { ArrowDown, Compass, Globe, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

export default function IntroExperience() {
  const [soundActive, setSoundActive] = useState(false);

  const handleEnter = () => {
    const target = document.getElementById("communities");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="intro"
      className="relative w-full h-screen min-h-[680px] flex flex-col justify-between overflow-hidden bg-primary text-parchment select-none"
    >
      {/* Cinematic Fullscreen Architectural Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
          className="w-full h-full bg-cover bg-center brightness-[0.72] contrast-[1.08]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90')",
          }}
        />
        {/* Soft Vignette & Architectural Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-primary/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-transparent to-primary/70" />
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(247, 244, 239, 0.4) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Top Architectural Coordinates & Ambient Status Bar */}
      <div className="relative z-10 w-full px-6 sm:px-12 pt-8 sm:pt-10 flex items-center justify-between text-xs sm:text-sm tracking-widest text-stone-300/80 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-semibold text-stone-200 tracking-wider">HORIZON LIVING • SINGAPORE</span>
          <span className="hidden sm:inline text-stone-400">• LAT 1.290270° N, LONG 103.851959° E</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <span className="hidden md:inline-flex items-center gap-1.5 text-stone-300">
            <Globe className="w-3.5 h-3.5 text-accent" />
            30 DISTRICT ARCHIPELAGO
          </span>
          <button
            onClick={() => setSoundActive(!soundActive)}
            data-interactive
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-stone-200 transition-colors"
          >
            {soundActive ? <Volume2 className="w-3.5 h-3.5 text-accent" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="text-[11px] tracking-wider uppercase">{soundActive ? "Ambient On" : "Sound Off"}</span>
          </button>
        </div>
      </div>

      {/* Center Cinematic Typography */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 text-center flex flex-col items-center justify-center my-auto">
        {/* Editorial Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-editorial italic text-2xl sm:text-3xl md:text-4xl text-accent font-light tracking-wide mb-3"
        >
          Designed Around Life
        </motion.p>

        {/* Main Monolithic Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white mb-4 leading-none"
        >
          Horizon Living
        </motion.h1>

        {/* Future-Ready Communities Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-sans text-base sm:text-lg md:text-xl text-stone-300 font-light max-w-2xl tracking-wide leading-relaxed mb-8 sm:mb-10"
        >
          Future-Ready Communities engineered with biophilic sanctuaries, autonomous intelligence, and timeless architectural mastery.
        </motion.p>

        {/* Immersive Enter Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button
            onClick={handleEnter}
            data-interactive
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-accent hover:bg-accent-hover text-white text-sm sm:text-base font-semibold tracking-wider transition-all duration-300 shadow-luxury hover:shadow-2xl hover:scale-[1.02]"
          >
            <span>Enter Experience</span>
            <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
            <div className="absolute -inset-1 rounded-full bg-accent/30 blur-md -z-10 group-hover:bg-accent/50 transition-all duration-300" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Architectural Metrics Bar */}
      <div className="relative z-10 w-full px-6 sm:px-12 pb-8 sm:pb-12 border-t border-white/10 bg-gradient-to-t from-primary/90 to-transparent backdrop-blur-[2px]">
        <div className="max-w-6xl mx-auto pt-6 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-left">
          <div className="flex flex-col">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">20</span>
            <span className="text-xs text-stone-400 font-sans tracking-wide uppercase mt-0.5">Master Communities</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">120</span>
            <span className="text-xs text-stone-400 font-sans tracking-wide uppercase mt-0.5">Crafted Residences</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">100</span>
            <span className="text-xs text-stone-400 font-sans tracking-wide uppercase mt-0.5">Curated Amenities</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-accent tracking-tight">Net-Zero</span>
            <span className="text-xs text-stone-400 font-sans tracking-wide uppercase mt-0.5">Super Low Energy Standard</span>
          </div>
        </div>
      </div>
    </section>
  );
}
