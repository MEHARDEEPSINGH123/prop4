"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  projectComparisons,
  communities,
  CommunityEnriched,
  investmentInsights,
  formatNumber,
} from "@/data/dataset";
import {
  GitCompare,
  ArrowRight,
  Sparkles,
  MapPin,
  TrendingUp,
  Check,
  ShieldCheck,
  Building,
  CheckCircle,
} from "lucide-react";

export default function ComparisonStudio() {
  const [selectedComparisonId, setSelectedComparisonId] = useState("CMP001");
  const [customA, setCustomA] = useState<string>("");
  const [customB, setCustomB] = useState<string>("");

  const activeComparison =
    projectComparisons.find((c) => c.id === selectedComparisonId) || projectComparisons[0];

  const commA =
    communities.find((c) => c.community_id === (customA || activeComparison.project_a)) ||
    communities[0];
  const commB =
    communities.find((c) => c.community_id === (customB || activeComparison.project_b)) ||
    communities[1];

  const insightA = investmentInsights.find((i) => i.districtName === commA.district) || investmentInsights[0];
  const insightB = investmentInsights.find((i) => i.districtName === commB.district) || investmentInsights[1];

  const metrics = [
    {
      label: "Starting Capital",
      valA: `SGD $${formatNumber(commA.starting_price_sgd)}`,
      valB: `SGD $${formatNumber(commB.starting_price_sgd)}`,
      scoreA: commA.starting_price_sgd <= commB.starting_price_sgd ? 90 : 80,
      scoreB: commB.starting_price_sgd <= commA.starting_price_sgd ? 90 : 80,
      winner: commA.starting_price_sgd <= commB.starting_price_sgd ? "A" : "B",
    },
    {
      label: "Location & District",
      valA: commA.district,
      valB: commB.district,
      scoreA: 85,
      scoreB: 88,
      winner: "B",
    },
    {
      label: "Availability Status",
      valA: commA.availability,
      valB: commB.availability,
      scoreA: commA.availability === "Now Selling" ? 95 : 85,
      scoreB: commB.availability === "Now Selling" ? 95 : 85,
      winner: commA.availability === "Now Selling" ? "A" : "B",
    },
    {
      label: "Investment Potential",
      valA: `${insightA.growth} Annual (${insightA.rentalYield} Yield)`,
      valB: `${insightB.growth} Annual (${insightB.rentalYield} Yield)`,
      scoreA: insightA.growthNumeric * 10,
      scoreB: insightB.growthNumeric * 10,
      winner: insightA.growthNumeric >= insightB.growthNumeric ? "A" : "B",
    },
    {
      label: "Smart Architecture Score",
      valA: `${commA.smartScore} / 100`,
      valB: `${commB.smartScore} / 100`,
      scoreA: commA.smartScore,
      scoreB: commB.smartScore,
      winner: commA.smartScore >= commB.smartScore ? "A" : "B",
    },
    {
      label: "Sustainability Index",
      valA: `${commA.sustainabilityScore} / 100`,
      valB: `${commB.sustainabilityScore} / 100`,
      scoreA: commA.sustainabilityScore,
      scoreB: commB.sustainabilityScore,
      winner: commA.sustainabilityScore >= commB.sustainabilityScore ? "A" : "B",
    },
  ];

  return (
    <section
      id="compare"
      className="relative w-full min-h-screen bg-primary text-parchment py-24 px-6 sm:px-12 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-sans tracking-wide text-accent font-medium mb-3">
              <GitCompare className="w-3.5 h-3.5" />
              <span>Dual Enclave Comparison</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Project Comparison Studio
            </h2>
            <p className="font-editorial italic text-xl text-stone-300 mt-1">
              Side-by-side architectural evaluations powered by 50 empirical project datasets
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-sans text-stone-300">
              Direct Architectural Evaluation
            </span>
          </div>
        </div>

        {/* 50 Predefined Comparisons Selector Scrubber */}
        <div className="mb-10 p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between text-xs font-sans mb-2 text-stone-300">
            <span>Select Enclave Pairing</span>
            <span className="text-accent font-medium">{activeComparison.headline}</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {projectComparisons.map((cmp) => {
              const isSelected = cmp.id === selectedComparisonId;
              const a = communities.find((c) => c.community_id === cmp.project_a);
              const b = communities.find((c) => c.community_id === cmp.project_b);
              const label = `${a ? a.name.replace("The Horizon ", "") : "Enclave A"} vs ${b ? b.name.replace("The Horizon ", "") : "Enclave B"}`;

              return (
                <button
                  key={cmp.id}
                  onClick={() => {
                    setSelectedComparisonId(cmp.id);
                    setCustomA("");
                    setCustomB("");
                  }}
                  data-interactive
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-sans transition-all ${
                    isSelected
                      ? "bg-accent text-white font-semibold shadow-md"
                      : "bg-white/5 hover:bg-white/15 text-stone-400 hover:text-stone-200 border border-white/5"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Comparison Cards (NOT Tables) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Card A */}
          <motion.div
            key={commA.community_id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-stone-900/90 border border-white/15 overflow-hidden shadow-2xl flex flex-col justify-between"
          >
            {/* Header Image */}
            <div className="relative aspect-[16/9] overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${commA.heroImage}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/40" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-accent text-white text-xs font-sans font-semibold shadow-md">
                  Enclave Option A
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-stone-200 text-xs font-sans">
                  {commA.district}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {commA.name}
                </h3>
                <p className="font-editorial italic text-stone-300 text-sm mt-0.5">
                  "{commA.tagline}"
                </p>
              </div>
            </div>

            {/* Metrics List for A */}
            <div className="p-6 sm:p-8 space-y-4 flex-grow">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs text-stone-400 font-sans uppercase block">Starting Price</span>
                <span className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  SGD ${formatNumber(commA.starting_price_sgd)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-stone-400 font-sans block">Smart Score</span>
                  <span className="font-heading text-xl font-bold text-accent">{commA.smartScore}/100</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-stone-400 font-sans block">Sustainability</span>
                  <span className="font-heading text-xl font-bold text-emerald-400">{commA.sustainabilityScore}/100</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-stone-300 space-y-1.5">
                <span className="font-sans text-accent uppercase text-[11px] block font-medium">Key Architectural Advantage</span>
                <p className="text-stone-300 leading-relaxed font-sans">
                  {activeComparison.advantageA}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <a
                  href="#book-tour"
                  data-interactive
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wide border border-white/15 transition-all"
                >
                  <span>Book Tour for {commA.name.replace("The Horizon ", "")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card B */}
          <motion.div
            key={commB.community_id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-stone-900/90 border border-white/15 overflow-hidden shadow-2xl flex flex-col justify-between"
          >
            {/* Header Image */}
            <div className="relative aspect-[16/9] overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${commB.heroImage}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/40" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-stone-700 text-white text-xs font-sans font-semibold shadow-md">
                  Enclave Option B
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-stone-200 text-xs font-sans">
                  {commB.district}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {commB.name}
                </h3>
                <p className="font-editorial italic text-stone-300 text-sm mt-0.5">
                  "{commB.tagline}"
                </p>
              </div>
            </div>

            {/* Metrics List for B */}
            <div className="p-6 sm:p-8 space-y-4 flex-grow">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs text-stone-400 font-sans uppercase block">Starting Price</span>
                <span className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  SGD ${formatNumber(commB.starting_price_sgd)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-stone-400 font-sans block">Smart Score</span>
                  <span className="font-heading text-xl font-bold text-accent">{commB.smartScore}/100</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-stone-400 font-sans block">Sustainability</span>
                  <span className="font-heading text-xl font-bold text-emerald-400">{commB.sustainabilityScore}/100</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-stone-300 space-y-1.5">
                <span className="font-sans text-accent uppercase text-[11px] block font-medium">Key Architectural Advantage</span>
                <p className="text-stone-300 leading-relaxed font-sans">
                  {activeComparison.advantageB}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <a
                  href="#book-tour"
                  data-interactive
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wide border border-white/15 transition-all"
                >
                  <span>Book Tour for {commB.name.replace("The Horizon ", "")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Metric Meters (NOT tables) */}
        <div className="bg-stone-900/90 rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6 mb-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-accent">
              Side-By-Side Qualitative & Quantitative Vectors
            </span>
            <span className="text-xs font-mono text-stone-400">
              6 Core Architectural Dimensions
            </span>
          </div>

          <div className="space-y-6">
            {metrics.map((m, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-sans">
                  <span className="font-medium text-white">{m.label}</span>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className={m.winner === "A" ? "text-accent font-bold" : "text-stone-400"}>
                      [A] {m.valA}
                    </span>
                    <span className="text-stone-600">vs</span>
                    <span className={m.winner === "B" ? "text-accent font-bold" : "text-stone-400"}>
                      [B] {m.valB}
                    </span>
                  </div>
                </div>

                {/* Comparative Dual Bar */}
                <div className="w-full h-2 rounded-full bg-white/10 flex overflow-hidden">
                  <div
                    className="bg-accent h-full transition-all duration-500"
                    style={{ width: `${(m.scoreA / (m.scoreA + m.scoreB)) * 100}%` }}
                  />
                  <div
                    className="bg-stone-500 h-full transition-all duration-500"
                    style={{ width: `${(m.scoreB / (m.scoreA + m.scoreB)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Recommendation Thesis */}
          <div className="pt-6 border-t border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-accent/20 text-accent flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-widest block">
                Horizon Advisory Synthesis
              </span>
              <p className="font-editorial italic text-lg sm:text-xl text-stone-200 mt-1">
                "{activeComparison.recommendationThesis}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
