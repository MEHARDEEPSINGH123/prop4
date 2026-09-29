"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { smartFeatures, SmartFeatureEnriched } from "@/data/dataset";
import {
  Cpu,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Sliders,
  SunMedium,
  ScanFace,
  ThermometerSnowflake,
  Box,
  VolumeX,
  Wind,
  Droplets,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Climate & Air",
  "Biometrics & Security",
  "Energy & Grid",
  "Acoustics & Light",
  "Autonomous Services",
] as const;

export default function SmartLivingExperience() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedFeature, setSelectedFeature] = useState<SmartFeatureEnriched | null>(null);

  const filteredFeatures =
    activeCategory === "All"
      ? smartFeatures
      : smartFeatures.filter((f) => f.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "SunMedium":
        return <SunMedium className="w-5 h-5 text-accent" />;
      case "ScanFace":
        return <ScanFace className="w-5 h-5 text-accent" />;
      case "ThermometerSnowflake":
        return <ThermometerSnowflake className="w-5 h-5 text-accent" />;
      case "Box":
        return <Box className="w-5 h-5 text-accent" />;
      case "VolumeX":
        return <VolumeX className="w-5 h-5 text-accent" />;
      case "Wind":
        return <Wind className="w-5 h-5 text-accent" />;
      case "Droplets":
        return <Droplets className="w-5 h-5 text-accent" />;
      default:
        return <Zap className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <section
      id="smart-living"
      className="relative w-full min-h-screen bg-[#FAF8F5] text-primary py-24 px-6 sm:px-12 border-t border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-xs font-sans tracking-wide text-accent font-medium mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>Adaptive Living Intelligence</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-primary">
              Smart Living Experience
            </h2>
            <p className="font-editorial italic text-xl text-secondary mt-1">
              40 responsive micro-systems operating synchronously to elevate biological wellbeing
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-secondary">
              Total Systems: <strong className="text-primary">{smartFeatures.length} Active</strong>
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-10 pb-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-interactive
                className={`px-4 py-2 rounded-full text-xs font-medium font-sans whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white font-semibold shadow-md"
                    : "bg-white hover:bg-stone-100 text-secondary border border-border"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 opacity-60 font-mono text-[10px]">
                    ({smartFeatures.filter((f) => f.category === cat).length})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 3D Hover Interactive Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredFeatures.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (idx % 6) * 0.06 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-card hover:shadow-luxury hover:border-accent/30 transition-all duration-300 flex flex-col justify-between"
              style={{ transformStyle: "preserve-3d" }}
              data-cursor-expand
            >
              {/* Card Ambient Glow on Hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

              <div>
                {/* Header: Icon, Category & Metric */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="p-3 rounded-2xl bg-[#F7F4EF] border border-border group-hover:bg-accent/10 transition-colors">
                    {getIcon(feature.icon)}
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent font-semibold">
                      {feature.metric}
                    </span>
                  </div>
                </div>

                <span className="text-xs uppercase font-mono tracking-wider text-secondary block mb-1">
                  {feature.category}
                </span>

                <h3 className="font-heading text-xl font-bold text-primary tracking-tight mb-3 group-hover:text-accent transition-colors">
                  {feature.curatedName}
                </h3>

                <p className="text-secondary text-sm font-sans leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              {/* Benefits Section */}
              <div className="pt-4 border-t border-border space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-muted block">
                  Measured Benefits:
                </span>
                {feature.benefits.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2 text-xs text-primary font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
