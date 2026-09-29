"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  districts,
  communities,
  residences,
  amenities,
  investmentInsights,
  schools,
  transportConnections,
  formatNumber,
} from "@/data/dataset";
import {
  MapPin,
  TrendingUp,
  Building,
  GraduationCap,
  Train,
  Sparkles,
  ArrowUpRight,
  Compass,
  Layers,
  Globe,
} from "lucide-react";

export default function InteractiveDistrictExplorer() {
  const [selectedDistrictId, setSelectedDistrictId] = useState("D001");
  const [hoveredDistrictId, setHoveredDistrictId] = useState<string | null>(null);

  const selectedDistrict =
    districts.find((d) => d.district_id === selectedDistrictId) || districts[0];

  // Matched entities for the active district
  const matchedCommunities = communities.filter((c) => c.district === selectedDistrict.name);
  const matchedResidences = residences.filter((r) =>
    matchedCommunities.some((c) => c.community_id === r.community_id)
  );

  const districtIndex = districts.findIndex((d) => d.district_id === selectedDistrictId);
  const matchedAmenities = amenities.slice(
    (districtIndex * 3) % (amenities.length - 6),
    ((districtIndex * 3) % (amenities.length - 6)) + 4
  );

  const matchedInsight =
    investmentInsights.find((inv) => inv.districtName === selectedDistrict.name) ||
    investmentInsights[districtIndex % investmentInsights.length];

  const matchedSchool = schools[districtIndex % schools.length];
  const matchedTransport = transportConnections[districtIndex % transportConnections.length];

  return (
    <section
      id="districts"
      className="relative w-full min-h-screen bg-[#FAF8F5] text-primary py-20 px-6 sm:px-12 border-t border-border overflow-hidden"
    >
      {/* Background Architectural Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#18181B 1px, transparent 1px), linear-gradient(to right, #18181B 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Unique Luxury Eyebrow (No numbers, No //) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-xs font-sans tracking-wide text-accent font-medium mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Singapore Geographic Masterplan</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-primary">
              Interactive District Explorer
            </h2>
            <p className="font-editorial italic text-xl text-secondary mt-1">
              Thirty interconnected sectors mapped by infrastructure, greenery, and capital momentum
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-sans text-secondary">
              Viewing Sector: <strong className="text-primary font-semibold">{selectedDistrict.region}</strong>
            </span>
          </div>
        </div>

        {/* Master Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Authentic Singapore Map with Map Pins */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-accent" />
                <span className="text-xs font-sans uppercase tracking-widest text-secondary font-medium">
                  Singapore Archipelago Topology
                </span>
              </div>
              <span className="text-xs text-muted font-sans">
                Select any location pin
              </span>
            </div>

            {/* Geographical Singapore Map Container */}
            <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#E8EFF3] border border-stone-200/90 overflow-hidden shadow-inner">
              {/* Realistic SVG Cartography of Singapore Island */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#C46A3A" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#C46A3A" stopOpacity="0" />
                  </radialGradient>
                  <filter id="pinShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0.8" stdDeviation="0.6" floodOpacity="0.35" />
                  </filter>
                </defs>

                {/* Straits Water Texture */}
                <rect width="100" height="100" fill="#E8EFF3" />

                {/* Johor Bahru / Malaysia Coast (North) */}
                <path
                  d="M 0,0 L 100,0 L 100,16 Q 85,15 70,18 Q 50,14 30,17 Q 15,12 0,16 Z"
                  fill="#E2DBD1"
                  stroke="#D3C9BD"
                  strokeWidth="0.5"
                />
                <text x="50" y="8" fontSize="2.8" textAnchor="middle" fill="#8C8275" fontFamily="sans-serif" letterSpacing="0.4" fontWeight="600">
                  JOHOR BAHRU (MALAYSIA)
                </text>
                <text x="50" y="15" fontSize="1.8" textAnchor="middle" fill="#7A8E99" fontFamily="sans-serif" letterSpacing="0.3">
                  STRAITS OF JOHOR
                </text>

                {/* Singapore Main Island Geographic Landmass */}
                <path
                  d="M 16,36 
                     C 20,28 30,22 42,21
                     C 50,21 58,23 68,26
                     C 76,28 85,32 94,40
                     C 96,44 94,52 88,56
                     C 80,62 70,68 56,76
                     C 48,78 40,75 34,71
                     C 28,68 20,67 14,64
                     C 10,60 12,50 14,44
                     Z"
                  fill="#FAF7F2"
                  stroke="#D8D1C7"
                  strokeWidth="0.8"
                />

                {/* Singapore Coastline Details: Jurong Island */}
                <path
                  d="M 18,67 C 22,66 26,70 24,75 C 20,77 16,74 18,67 Z"
                  fill="#EDE8E1"
                  stroke="#D8D1C7"
                  strokeWidth="0.5"
                />
                {/* Sentosa Island (South) */}
                <path
                  d="M 44,79 C 48,78 52,80 50,84 C 45,85 42,82 44,79 Z"
                  fill="#EDE8E1"
                  stroke="#D8D1C7"
                  strokeWidth="0.5"
                />
                {/* Pulau Ubin & Tekong (Northeast) */}
                <path
                  d="M 80,24 C 84,23 88,26 86,29 C 82,30 79,27 80,24 Z"
                  fill="#EDE8E1"
                  stroke="#D8D1C7"
                  strokeWidth="0.5"
                />
                <path
                  d="M 89,22 C 94,22 96,26 93,29 C 89,29 88,25 89,22 Z"
                  fill="#EDE8E1"
                  stroke="#D8D1C7"
                  strokeWidth="0.5"
                />

                {/* Biophilic Nature Reserve Greenery Patches */}
                <ellipse cx="44" cy="46" rx="9" ry="7" fill="#567A60" opacity="0.18" />
                <ellipse cx="48" cy="35" rx="6" ry="5" fill="#567A60" opacity="0.16" />
                <ellipse cx="32" cy="42" rx="5" ry="4" fill="#567A60" opacity="0.15" />
                <text x="44" y="47" fontSize="1.8" textAnchor="middle" fill="#567A60" fontFamily="sans-serif" opacity="0.9" fontStyle="italic">
                  Central Nature Reserve
                </text>

                {/* Waterway / Reservoir lines */}
                <path d="M 44,48 Q 50,56 53,68" fill="none" stroke="#B8D1DE" strokeWidth="0.7" />
                <path d="M 68,36 Q 62,44 65,52" fill="none" stroke="#B8D1DE" strokeWidth="0.5" />

                {/* Singapore Strait Label */}
                <text x="50" y="94" fontSize="2.2" textAnchor="middle" fill="#7A8E99" fontFamily="sans-serif" letterSpacing="0.4">
                  SINGAPORE STRAIT
                </text>

                {/* Territorial Network Interconnects */}
                {districts.slice(0, 29).map((d, i) => {
                  const nextD = districts[(i + 1) % districts.length];
                  return (
                    <line
                      key={`net-${i}`}
                      x1={d.coordinates.x}
                      y1={d.coordinates.y}
                      x2={nextD.coordinates.x}
                      y2={nextD.coordinates.y}
                      stroke="#C8C2B8"
                      strokeWidth="0.25"
                      strokeDasharray="1,1"
                      opacity="0.6"
                    />
                  );
                })}

                {/* 30 Districts Represented by Map Pin Icons (Image 2 style) */}
                {districts.map((d) => {
                  const isSelected = d.district_id === selectedDistrictId;
                  const isHovered = d.district_id === hoveredDistrictId;

                  // Center the Map Pin: tip points precisely at d.coordinates.x, d.coordinates.y
                  // Standard Map Pin bounding box: centered at x, tip at y
                  const pinWidth = isSelected ? 4.2 : isHovered ? 3.8 : 2.8;
                  const pinHeight = isSelected ? 5.8 : isHovered ? 5.2 : 3.8;
                  const pinX = d.coordinates.x - pinWidth / 2;
                  const pinY = d.coordinates.y - pinHeight;

                  return (
                    <g
                      key={d.district_id}
                      onClick={() => setSelectedDistrictId(d.district_id)}
                      onMouseEnter={() => setHoveredDistrictId(d.district_id)}
                      onMouseLeave={() => setHoveredDistrictId(null)}
                      data-interactive
                      className="cursor-pointer"
                    >
                      {/* Generous Invisible Hit Target */}
                      <circle
                        cx={d.coordinates.x}
                        cy={d.coordinates.y - pinHeight / 2}
                        r="4"
                        fill="transparent"
                      />

                      {/* Selected Radiant Glow */}
                      {isSelected && (
                        <circle
                          cx={d.coordinates.x}
                          cy={d.coordinates.y}
                          r="5"
                          fill="url(#pinGlow)"
                          className="pointer-events-none"
                        />
                      )}

                      {/* Ground Contact Shadow */}
                      <ellipse
                        cx={d.coordinates.x}
                        cy={d.coordinates.y + 0.3}
                        rx={isSelected ? 1.4 : 1.0}
                        ry={isSelected ? 0.6 : 0.4}
                        fill="#000000"
                        opacity={isSelected ? "0.3" : "0.15"}
                        className="pointer-events-none"
                      />

                      {/* Elegant Map Pin Icon (Exact match of Image 2) */}
                      <path
                        d={`M ${pinX + pinWidth / 2} ${pinY + pinHeight}
                            C ${pinX} ${pinY + pinHeight * 0.6}
                              ${pinX} ${pinY + pinHeight * 0.3}
                              ${pinX + pinWidth / 2} ${pinY}
                            C ${pinX + pinWidth} ${pinY + pinHeight * 0.3}
                              ${pinX + pinWidth} ${pinY + pinHeight * 0.6}
                              ${pinX + pinWidth / 2} ${pinY + pinHeight}
                            Z
                            M ${pinX + pinWidth / 2} ${pinY + pinHeight * 0.35}
                            m -${pinWidth * 0.22}, 0
                            a ${pinWidth * 0.22},${pinWidth * 0.22} 0 1,0 ${pinWidth * 0.44},0
                            a ${pinWidth * 0.22},${pinWidth * 0.22} 0 1,0 -${pinWidth * 0.44},0
                            Z`}
                        fillRule="evenodd"
                        fill={isSelected ? "#C46A3A" : isHovered ? "#B05B2E" : "#18181B"}
                        stroke="#FFFFFF"
                        strokeWidth="0.35"
                        filter="url(#pinShadow)"
                        className="transition-all duration-200 pointer-events-none"
                      />

                      {/* Clean Floating Name on Active/Hovered Pin (NO CODES) */}
                      {(isSelected || isHovered) && (
                        <g className="pointer-events-none">
                          <rect
                            x={d.coordinates.x - 12}
                            y={pinY - 4.5}
                            width="24"
                            height="3.6"
                            rx="1.2"
                            fill="#18181B"
                            stroke="#FFFFFF"
                            strokeWidth="0.3"
                          />
                          <text
                            x={d.coordinates.x}
                            y={pinY - 2.1}
                            fontSize="1.9"
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontFamily="sans-serif"
                            fontWeight="600"
                          >
                            {d.region.split(" & ")[0].split(",")[0]}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Map Floating Legend (NO CODES) */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-border text-[11px] font-sans text-secondary flex items-center gap-3 shadow-sm">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent" /> Selected Sector
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" /> District Pin
                </span>
                <span className="flex items-center gap-1.5 text-success">
                  <span className="w-2.5 h-2.5 rounded-full bg-success/40" /> Nature Reserve
                </span>
              </div>
            </div>

            {/* Quick Sector Selector - ALL REAL NAMES, NO CODES */}
            <div className="space-y-2 mt-6">
              <span className="text-xs uppercase font-sans text-secondary tracking-wider block font-medium">
                Select Sector (All 30 Master Regions)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                {districts.map((d) => {
                  const isSelected = d.district_id === selectedDistrictId;
                  const shortName = d.region.split(" & ")[0].split(",")[0];
                  return (
                    <button
                      key={d.district_id}
                      onClick={() => setSelectedDistrictId(d.district_id)}
                      data-interactive
                      className={`py-2 px-3 rounded-xl text-xs font-sans text-left transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-accent text-white font-semibold shadow-sm"
                          : "bg-stone-50 hover:bg-stone-100 text-secondary hover:text-primary border border-stone-200/80"
                      }`}
                    >
                      <MapPin className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? "text-white" : "text-accent"}`} />
                      <span className="truncate">{shortName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Live District Dossier (NO CODES, NO //) */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDistrict.district_id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45 }}
                className="space-y-6"
              >
                {/* District Identity Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-card relative overflow-hidden">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-xs font-sans uppercase tracking-widest text-accent font-semibold block">
                        Prime Singapore Archipelago
                      </span>
                      <h3 className="font-heading text-3xl font-bold text-primary mt-0.5">
                        {selectedDistrict.region}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                      {selectedDistrict.vibe}
                    </span>
                  </div>

                  <p className="text-secondary text-sm font-sans leading-relaxed mb-6">
                    {selectedDistrict.description}
                  </p>

                  {/* 3 Metric Pills */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                    <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-border">
                      <span className="text-[11px] text-muted block uppercase font-sans">
                        Transit Score
                      </span>
                      <span className="font-heading text-xl font-bold text-primary">
                        {selectedDistrict.transitScore}/100
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-border">
                      <span className="text-[11px] text-muted block uppercase font-sans">
                        Greenery Ratio
                      </span>
                      <span className="font-heading text-xl font-bold text-success">
                        {selectedDistrict.greeneryRatio}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-border">
                      <span className="text-[11px] text-muted block uppercase font-sans">
                        Avg. Growth
                      </span>
                      <span className="font-heading text-xl font-bold text-accent">
                        {selectedDistrict.growthAverage}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Communities & Residences in this District */}
                <div className="bg-white rounded-3xl p-6 border border-border shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-accent" />
                      <h4 className="font-heading font-semibold text-primary text-base">
                        Communities & Residences
                      </h4>
                    </div>
                    <span className="text-xs text-muted font-sans">
                      {matchedCommunities.length} Master Enclave Planned
                    </span>
                  </div>

                  {matchedCommunities.length > 0 ? (
                    <div className="space-y-3">
                      {matchedCommunities.map((c) => (
                        <div
                          key={c.community_id}
                          className="p-4 rounded-2xl bg-[#FAF8F5] border border-border flex items-center justify-between gap-4 hover:border-accent/40 transition-colors"
                        >
                          <div>
                            <span className="text-xs font-sans text-accent font-medium">
                              Master Community
                            </span>
                            <h5 className="font-heading font-bold text-primary text-sm sm:text-base">
                              {c.name}
                            </h5>
                            <span className="text-xs text-secondary">
                              Starting from SGD ${formatNumber(c.starting_price_sgd)}
                            </span>
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white border border-border text-primary shadow-sm flex-shrink-0">
                            {c.availability}
                          </span>
                        </div>
                      ))}

                      {matchedResidences.length > 0 && (
                        <div className="pt-2 text-xs text-secondary flex items-center justify-between">
                          <span>
                            {matchedResidences.length} crafted residence configurations available here
                          </span>
                          <a
                            href="#residences"
                            className="inline-flex items-center gap-1 text-accent font-medium hover:underline"
                          >
                            <span>Inspect units</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-muted italic p-3 bg-stone-50 rounded-xl">
                      Future Horizon enclave slated for subsequent phase release in this sector.
                    </p>
                  )}
                </div>

                {/* Amenities, Schools & Transport Connectivity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Amenities */}
                  <div className="bg-white rounded-3xl p-5 border border-border shadow-card">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <h4 className="font-heading font-semibold text-primary text-sm">
                        District Amenities
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {matchedAmenities.map((a) => (
                        <div
                          key={a.id}
                          className="text-xs text-secondary flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <span className="font-medium text-primary">{a.curatedName}</span>
                          <span className="text-[10px] text-muted">({a.category})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Schools & Transit */}
                  <div className="bg-white rounded-3xl p-5 border border-border shadow-card">
                    <div className="flex items-center gap-2 mb-3">
                      <Train className="w-4 h-4 text-accent" />
                      <h4 className="font-heading font-semibold text-primary text-sm">
                        Infrastructure
                      </h4>
                    </div>
                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex items-center gap-1 text-primary font-medium">
                          <Train className="w-3.5 h-3.5 text-secondary" />
                          <span>{matchedTransport.curatedName}</span>
                        </div>
                        <span className="text-[11px] text-muted block pl-4.5">
                          {matchedTransport.lines.join(" • ")} ({matchedTransport.distanceKm} km)
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-1 text-primary font-medium">
                          <GraduationCap className="w-3.5 h-3.5 text-secondary" />
                          <span>{matchedSchool.curatedName}</span>
                        </div>
                        <span className="text-[11px] text-muted block pl-4.5">
                          {matchedSchool.curriculum} ({matchedSchool.distanceKm} km)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Capital Outlook Snippet (NO CODES, NO //) */}
                <div className="p-5 rounded-3xl bg-primary text-white border border-primary-subtle shadow-card flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-accent text-xs font-sans mb-1 font-medium">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Capital & Investment Outlook</span>
                    </div>
                    <h5 className="font-heading font-bold text-base">
                      {matchedInsight.capitalRecommendation}
                    </h5>
                    <p className="text-xs text-stone-300 mt-0.5">
                      Yield: {matchedInsight.rentalYield} • {matchedInsight.fiveYearAppreciationEst}
                    </p>
                  </div>

                  <a
                    href="#investment"
                    className="p-3 rounded-full bg-accent hover:bg-accent-hover text-white transition-transform hover:scale-105 flex-shrink-0"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
