"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { investmentInsights, InvestmentInsightEnriched, formatNumber } from "@/data/dataset";
import {
  TrendingUp,
  Percent,
  Compass,
  ArrowUpRight,
  ShieldAlert,
  BarChart3,
  Layers,
  Sparkles,
} from "lucide-react";

export default function InvestmentStudio() {
  const [selectedInsightId, setSelectedInsightId] = useState("INV001");
  const [horizonYear, setHorizonYear] = useState<1 | 3 | 5 | 10>(5);

  const activeInsight =
    investmentInsights.find((i) => i.id === selectedInsightId) || investmentInsights[0];

  // Calculate dynamic projected value based on growthNumeric & horizonYear
  const sampleBasePrice = 1200000;
  const compoundedGrowthMultiplier = Math.pow(1 + activeInsight.growthNumeric / 100, horizonYear);
  const projectedVal = Math.round(sampleBasePrice * compoundedGrowthMultiplier);
  const totalGain = projectedVal - sampleBasePrice;

  return (
    <section
      id="investment"
      className="relative w-full min-h-screen bg-primary text-parchment py-24 px-6 sm:px-12 border-t border-white/10 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-sans tracking-wide text-accent font-medium mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Capital Valuation & Yield</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Investment Studio
            </h2>
            <p className="font-editorial italic text-xl text-stone-300 mt-1">
              50 econometric models forecasting capital resilience, rental yields, and district macro trends
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-stone-400">
              Insights Catalog: <strong className="text-accent">{investmentInsights.length} Datasets</strong>
            </span>
          </div>
        </div>

        {/* Studio Grid: Left Interactive SVG Chart & Projections, Right Opportunity Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Interactive Interactive Valuation Chart */}
          <div className="lg:col-span-7 bg-stone-900/90 rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-widest block">
                  Interactive Capital Trajectory
                </span>
                <h3 className="font-heading text-2xl font-bold text-white mt-1">
                  Compound Value Horizon
                </h3>
              </div>

              {/* Time Horizon Selector */}
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/10 backdrop-blur-md">
                {([1, 3, 5, 10] as const).map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setHorizonYear(yr)}
                    data-interactive
                    className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                      horizonYear === yr
                        ? "bg-accent text-white font-semibold shadow-sm"
                        : "text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {yr}Y
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive SVG Projection Chart */}
            <div className="relative w-full aspect-[16/9] bg-stone-950/60 rounded-2xl border border-white/10 p-5 mb-6 flex flex-col justify-between">
              {/* Top Chart Stats */}
              <div className="flex justify-between items-start text-xs font-mono">
                <div>
                  <span className="text-stone-400 block">Baseline SGD $1.20M</span>
                  <span className="text-xl font-heading font-bold text-white mt-0.5">
                    SGD ${(projectedVal / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-stone-400 block">Net Projected Capital Gain</span>
                  <span className="text-xl font-heading font-bold text-emerald-400 mt-0.5">
                    +SGD ${formatNumber(totalGain)}
                  </span>
                </div>
              </div>

              {/* SVG Area & Trendline */}
              <div className="relative w-full h-36 my-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C46A3A" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#C46A3A" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid guide lines */}
                  <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="0" y1="70" x2="400" y2="70" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="0" y1="110" x2="400" y2="110" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

                  {/* Dynamic Curve depending on growthNumeric */}
                  {(() => {
                    const startY = 100;
                    const endY = Math.max(15, 100 - activeInsight.growthNumeric * (horizonYear * 1.5));
                    const midY1 = startY - (startY - endY) * 0.35;
                    const midY2 = startY - (startY - endY) * 0.7;
                    const pathD = `M 0,${startY} C 120,${midY1} 260,${midY2} 400,${endY}`;
                    const areaD = `${pathD} L 400,120 L 0,120 Z`;

                    return (
                      <>
                        <path d={areaD} fill="url(#chartGradient)" />
                        <path
                          d={pathD}
                          fill="none"
                          stroke="#C46A3A"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <circle cx="400" cy={endY} r="5" fill="#C46A3A" stroke="#FFFFFF" strokeWidth="2" />
                      </>
                    );
                  })()}
                </svg>
              </div>

              {/* Chart X-Axis Labels */}
              <div className="flex justify-between text-[11px] font-mono text-stone-400 border-t border-white/10 pt-2">
                <span>Inception (Year 0)</span>
                <span>Year {Math.round(horizonYear / 2)}</span>
                <span className="text-accent font-semibold">Horizon Year {horizonYear}</span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-stone-400 font-mono block">ANNUAL GROWTH</span>
                <span className="font-heading text-2xl font-bold text-accent">
                  {activeInsight.growth}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-stone-400 font-mono block">GROSS YIELD</span>
                <span className="font-heading text-2xl font-bold text-white">
                  {activeInsight.rentalYield}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-stone-400 font-mono block">MOMENTUM</span>
                <span className="font-heading text-base font-bold text-emerald-400 capitalize">
                  {activeInsight.trendDirection}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Active Investment Insight Dossier */}
          <div className="lg:col-span-5 bg-stone-900/90 rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-sans text-accent uppercase tracking-widest block font-medium">
                  {activeInsight.districtName} Valuation Analysis
                </span>
                <h3 className="font-heading text-2xl font-bold text-white mt-1">
                  {activeInsight.capitalRecommendation}
                </h3>
              </div>
              <span className="p-2.5 rounded-full bg-accent/20 text-accent">
                <BarChart3 className="w-5 h-5" />
              </span>
            </div>

            <p className="text-stone-300 text-sm leading-relaxed font-sans">
              {activeInsight.horizonOutlook}
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-mono uppercase text-stone-400 block">
                5-Year Capital Appreciation Benchmark
              </span>
              <div className="text-xl font-heading font-bold text-white">
                {activeInsight.fiveYearAppreciationEst}
              </div>
              <p className="text-[11px] text-stone-400">
                Derived from prime real-estate liquidity models and government masterplan infrastructure timeline.
              </p>
            </div>

            {/* Quick Action to Financing Studio */}
            <div className="pt-2">
              <a
                href="#financing"
                data-interactive
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-accent hover:bg-accent-hover text-white text-sm font-semibold tracking-wide transition-all shadow-luxury"
              >
                <span>Calculate Mortgage & Financing</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 50 Investment Insights Selector Strip */}
        <div className="bg-stone-900/80 rounded-3xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-sans uppercase tracking-widest text-stone-300 font-medium">
              Econometric Models (All 50 Master Insights)
            </span>
            <span className="text-xs font-sans text-accent">
              Active: {activeInsight.districtName}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
            {investmentInsights.map((inv) => {
              const isSelected = inv.id === selectedInsightId;
              return (
                <button
                  key={inv.id}
                  onClick={() => setSelectedInsightId(inv.id)}
                  data-interactive
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-sans transition-all ${
                    isSelected
                      ? "bg-accent text-white font-bold shadow-md"
                      : "bg-white/5 hover:bg-white/15 text-stone-400 hover:text-stone-200 border border-white/5"
                  }`}
                >
                  {inv.districtName} • {inv.growth}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
