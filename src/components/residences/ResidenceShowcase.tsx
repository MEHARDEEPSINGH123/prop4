"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { residences, communities, ResidenceEnriched, formatNumber } from "@/data/dataset";
import {
  Bed,
  Bath,
  Maximize2,
  Building,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  Sparkles,
  Compass,
  FileText,
  Calendar,
  Layers,
} from "lucide-react";

export default function ResidenceShowcase() {
  const [bedroomFilter, setBedroomFilter] = useState<number | "All">("All");
  const [communityFilter, setCommunityFilter] = useState<string>("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inspectionModalOpen, setInspectionModalOpen] = useState(false);

  // Filter 120 residences dynamically
  const filteredResidences = useMemo(() => {
    return residences.filter((r) => {
      const matchBed = bedroomFilter === "All" || r.bedrooms === bedroomFilter;
      const matchComm = communityFilter === "All" || r.community_id === communityFilter;
      return matchBed && matchComm;
    });
  }, [bedroomFilter, communityFilter]);

  // Safe index within filtered collection
  const activeResidence = filteredResidences[currentIndex] || filteredResidences[0] || residences[0];
  const activeCommunity = communities.find((c) => c.community_id === activeResidence.community_id) || communities[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredResidences.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredResidences.length) % filteredResidences.length);
  };

  return (
    <section
      id="residences"
      className="relative w-full min-h-screen bg-primary text-parchment py-20 border-t border-white/10 flex flex-col justify-between overflow-hidden"
    >
      {/* Background Fullscreen Atmosphere */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeResidence.residence_id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full bg-cover bg-center brightness-[0.4] contrast-[1.08]"
            style={{ backgroundImage: `url('${activeResidence.image}')` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-transparent to-primary/80" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-sans tracking-wide text-accent font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Architectural Residences</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Residence Showcase
          </h2>
          <p className="font-editorial italic text-xl text-stone-300 mt-1">
            120 bespoke residences presented through immersive fullscreen transitions
          </p>
        </div>

        {/* Counter & Navigation */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="font-heading text-3xl font-bold text-white tracking-tight">
              {String(currentIndex + 1).padStart(3, "0")}
            </span>
            <span className="text-stone-400 font-mono text-sm"> / {filteredResidences.length}</span>
            <p className="text-[11px] text-stone-400 uppercase tracking-widest">
              Available Units
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              data-interactive
              aria-label="Previous Residence"
              className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              data-interactive
              aria-label="Next Residence"
              className="p-3.5 rounded-full bg-accent hover:bg-accent-hover text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-luxury"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar: Bedrooms and Communities */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-white/10 text-xs">
          {/* Bedroom Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-stone-400 font-mono uppercase mr-1">Bedrooms:</span>
            {(["All", 1, 2, 3, 4, 5] as const).map((bed) => {
              const isActive = bedroomFilter === bed;
              return (
                <button
                  key={String(bed)}
                  onClick={() => {
                    setBedroomFilter(bed);
                    setCurrentIndex(0);
                  }}
                  data-interactive
                  className={`px-3 py-1 rounded-full font-mono transition-all ${
                    isActive
                      ? "bg-accent text-white font-semibold"
                      : "bg-white/10 hover:bg-white/20 text-stone-300"
                  }`}
                >
                  {bed === "All" ? "All Sizes" : `${bed} BR`}
                </button>
              );
            })}
          </div>

          {/* Community Filter Dropdown / Selector */}
          <div className="flex items-center gap-2">
            <span className="text-stone-400 font-mono uppercase">Filter Community:</span>
            <select
              value={communityFilter}
              onChange={(e) => {
                setCommunityFilter(e.target.value);
                setCurrentIndex(0);
              }}
              data-interactive
              className="bg-stone-900/90 border border-white/20 text-stone-200 text-xs rounded-xl px-3 py-1.5 font-sans focus:outline-none focus:border-accent"
            >
              <option value="All">All Master Enclaves ({residences.length} Residences)</option>
              {communities.map((c) => (
                <option key={c.community_id} value={c.community_id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Fullscreen Stage (NOT a grid) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 my-auto py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeResidence.residence_id}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center"
          >
            {/* Left Stage: Architectural Photography Viewport */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-white/20 shadow-2xl group">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${activeResidence.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Floating Image Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-stone-200">
                    {activeResidence.floorLevel} • {activeResidence.orientation}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
                      activeCommunity.availability === "Now Selling"
                        ? "bg-success/30 border border-success/40 text-emerald-300"
                        : "bg-accent/30 border border-accent/40 text-amber-200"
                    }`}
                  >
                    {activeCommunity.availability}
                  </span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <span className="text-xs font-sans uppercase tracking-wider text-accent font-medium block">
                      {activeResidence.collectionType} Collection
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {activeResidence.luxuryName}
                    </h3>
                  </div>

                  <button
                    onClick={() => setInspectionModalOpen(true)}
                    data-interactive
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all hover:scale-110"
                    title="Inspect Spatial Blueprint"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Stage: Detailed Residence Dossier */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                {/* Community Link */}
                <div className="flex items-center gap-2 text-xs font-mono text-stone-300 mb-2">
                  <Building className="w-3.5 h-3.5 text-accent" />
                  <span>{activeCommunity.name} ({activeCommunity.district})</span>
                </div>

                <h3 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
                  {activeResidence.luxuryName}
                </h3>

                <p className="font-editorial italic text-xl text-accent mb-6 font-light">
                  {activeResidence.collectionType} Collection
                </p>

                {/* Price Display */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md mb-6">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-stone-400 font-mono uppercase block">
                        Capital Valuation
                      </span>
                      <span className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        SGD ${formatNumber(activeResidence.price_sgd)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-stone-400 block">Unit Rate</span>
                      <span className="font-mono text-sm font-semibold text-accent">
                        SGD ${activeResidence.pricePerSqft} / sq.ft.
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3 Core Architecture Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <Bed className="w-5 h-5 text-accent mx-auto mb-1" />
                    <span className="font-heading text-xl font-bold text-white block">
                      {activeResidence.bedrooms}
                    </span>
                    <span className="text-[11px] text-stone-400 uppercase font-mono">Bedrooms</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <Bath className="w-5 h-5 text-accent mx-auto mb-1" />
                    <span className="font-heading text-xl font-bold text-white block">
                      {activeResidence.bathrooms}
                    </span>
                    <span className="text-[11px] text-stone-400 uppercase font-mono">Bathrooms</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <Maximize2 className="w-5 h-5 text-accent mx-auto mb-1" />
                    <span className="font-heading text-xl font-bold text-white block">
                      {activeResidence.area_sqft}
                    </span>
                    <span className="text-[11px] text-stone-400 uppercase font-mono">Sq. Ft.</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="pt-5 space-y-1.5 border-t border-white/10 mt-6">
                  {activeResidence.features.map((f, fIdx) => (
                    <div key={fIdx} className="text-xs text-stone-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <a
                  href="#book-tour"
                  data-interactive
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-white text-sm font-semibold tracking-wide transition-all shadow-luxury hover:scale-[1.02]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Residence Tour</span>
                </a>

                <button
                  onClick={() => setInspectionModalOpen(true)}
                  data-interactive
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 text-sm font-medium border border-white/15 backdrop-blur-md transition-all"
                >
                  <FileText className="w-4 h-4 text-accent" />
                  <span>View Specifications</span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scrubber Ribbon at Bottom */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 pt-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 border-t border-white/10">
          {filteredResidences.slice(0, 30).map((r, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={r.residence_id}
                onClick={() => setCurrentIndex(idx)}
                data-interactive
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-sans transition-all ${
                  isSelected
                    ? "bg-accent text-white font-semibold shadow-md"
                    : "bg-white/5 hover:bg-white/15 text-stone-400 hover:text-stone-200"
                }`}
              >
                {r.bedrooms} Bedroom Suite • SGD ${(r.price_sgd / 1000000).toFixed(2)}M
              </button>
            );
          })}
        </div>
      </div>

      {/* Specifications & Blueprint Modal */}
      <AnimatePresence>
        {inspectionModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
            onClick={() => setInspectionModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-stone-900 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-stone-200 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-xs font-mono text-accent uppercase tracking-widest">
                    Architectural Dossier
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-white">
                    {activeResidence.luxuryName}
                  </h3>
                </div>
                <button
                  onClick={() => setInspectionModalOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-stone-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Simulated Architectural Floorplan Wireframe */}
              <div className="w-full aspect-[16/9] rounded-2xl bg-black/60 border border-white/15 p-6 mb-6 flex flex-col justify-between font-sans text-xs text-stone-400">
                <div className="flex justify-between">
                  <span>SCALE 1:50 • PLANAR ARCHITECTURAL BLUEPRINT</span>
                  <span>ORIENTATION: {activeResidence.orientation}</span>
                </div>

                <div className="w-full h-32 border-2 border-dashed border-accent/40 rounded-xl flex items-center justify-center text-center p-4">
                  <div>
                    <span className="font-heading text-lg font-bold text-white block">
                      {activeResidence.area_sqft} SQ.FT. LIVING ENVELOPE
                    </span>
                    <span className="text-[11px] text-accent">
                      {activeResidence.bedrooms} BEDROOM MASTER LAYOUT • CEILING HEIGHT 3.4M
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-[11px]">
                  <span>RESIDENCE: {activeResidence.luxuryName}</span>
                  <span>ENCLAVE: {activeCommunity.name}</span>
                </div>
              </div>

              {/* Full Specs List */}
              <div className="grid grid-cols-2 gap-4 text-xs font-sans mb-6">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-stone-400 block font-mono">Floor Level</span>
                  <span className="text-white font-semibold text-sm">{activeResidence.floorLevel}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-stone-400 block font-mono">Price Per Sqft</span>
                  <span className="text-white font-semibold text-sm">SGD ${activeResidence.pricePerSqft}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-stone-400 block font-mono">Kitchen Appliances</span>
                  <span className="text-white font-semibold text-sm">Sub-Zero & Wolf Dual-Fuel</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-stone-400 block font-mono">Energy Benchmark</span>
                  <span className="text-white font-semibold text-sm">Net-Zero Carbon Envelope</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setInspectionModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-medium"
                >
                  Close Blueprint
                </button>
                <a
                  href="#book-tour"
                  onClick={() => setInspectionModalOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-accent hover:bg-accent-hover text-white text-xs font-semibold"
                >
                  Book Private Viewing
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
