"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { customerStories, CustomerStoryEnriched } from "@/data/dataset";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Building,
  User,
  HeartHandshake,
} from "lucide-react";

export default function CustomerStories() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeStory = customerStories[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % customerStories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + customerStories.length) % customerStories.length);
  };

  return (
    <section
      id="stories"
      className="relative w-full min-h-screen bg-primary text-parchment py-24 px-6 sm:px-12 border-t border-white/10 flex flex-col justify-between overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-xs font-sans tracking-wide text-accent font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Resident Chronicles</span>
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Customer Stories
            </h2>
            <p className="font-editorial italic text-xl text-stone-300 mt-1">
              Editorial reflections from 100 residents inhabiting the Horizon living ecosystem
            </p>
          </div>

          {/* Navigation Controls & Counter */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="font-heading text-3xl font-bold text-white tracking-tight">
                {String(currentIndex + 1).padStart(3, "0")}
              </span>
              <span className="text-stone-400 font-mono text-sm"> / {customerStories.length}</span>
              <p className="text-[11px] text-stone-400 uppercase tracking-widest">
                Resident Testimonials
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                data-interactive
                aria-label="Previous Testimonial"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                data-interactive
                aria-label="Next Testimonial"
                className="p-3 rounded-full bg-accent hover:bg-accent-hover text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-luxury"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Large Editorial Quote Stage */}
        <div className="my-auto py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center"
            >
              {/* Left Column: Portrait & Community Badge */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl mb-6 group">
                  <div
                    className="w-full h-full bg-cover bg-center brightness-90 group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url('${activeStory.avatar}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[10px] font-mono uppercase text-accent block">
                      Resident Since {activeStory.yearPurchased}
                    </span>
                    <span className="font-heading text-sm font-bold text-white">
                      {activeStory.residenceModel}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-heading text-2xl font-bold text-white">
                    {activeStory.customerName}
                  </h3>
                  <p className="text-accent text-xs font-mono tracking-wide">
                    {activeStory.role}
                  </p>
                  <p className="text-stone-400 text-xs font-sans pt-1">
                    Enclave: <strong className="text-stone-200">{activeStory.communityPurchased}</strong>
                  </p>
                </div>

                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mt-4">
                  {[...Array(activeStory.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                  <span className="text-xs font-mono text-stone-300 ml-2">
                    5.0 Verified Resident
                  </span>
                </div>
              </div>

              {/* Right Column: Editorial Quote */}
              <div className="lg:col-span-7 relative">
                <Quote className="w-16 h-16 text-accent/20 absolute -top-8 -left-4 pointer-events-none -z-10" />

                <blockquote className="font-editorial italic text-2xl sm:text-3xl md:text-4xl text-stone-100 font-light leading-relaxed mb-6">
                  "{activeStory.quote}"
                </blockquote>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-stone-300">
                    <Building className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Highlight: {activeStory.lifestyleHighlight}</span>
                  </div>

                  <span className="text-xs font-sans text-stone-300 font-medium">
                    Verified Resident Story
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scrubber Ribbon at Bottom */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
            {customerStories.slice(0, 30).map((cs, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={cs.id}
                  onClick={() => setCurrentIndex(idx)}
                  data-interactive
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-sans transition-all ${
                    isSelected
                      ? "bg-accent text-white font-semibold shadow-md"
                      : "bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white"
                  }`}
                >
                  {cs.customer}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
