"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { amenities, AmenityCategory, AmenityEnriched } from "@/data/dataset";
import {
  Sparkles,
  Search,
  Activity,
  Users,
  Briefcase,
  GlassWater,
  HeartHandshake,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const CATEGORIES: ("All" | AmenityCategory)[] = [
  "All",
  "Wellness",
  "Sports",
  "Family",
  "Business",
  "Leisure",
  "Community",
];

export default function AmenitiesExperience() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | AmenityCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const filteredAmenities = useMemo(() => {
    return amenities.filter((a) => {
      const matchCategory = selectedCategory === "All" || a.category === selectedCategory;
      const matchSearch =
        searchQuery === "" ||
        a.curatedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredAmenities.length / itemsPerPage);
  const displayedAmenities = filteredAmenities.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const getCategoryIcon = (category: AmenityCategory) => {
    switch (category) {
      case "Wellness":
        return <Sparkles className="w-4 h-4 text-accent" />;
      case "Sports":
        return <Activity className="w-4 h-4 text-accent" />;
      case "Family":
        return <Users className="w-4 h-4 text-accent" />;
      case "Business":
        return <Briefcase className="w-4 h-4 text-accent" />;
      case "Leisure":
        return <GlassWater className="w-4 h-4 text-accent" />;
      case "Community":
        return <HeartHandshake className="w-4 h-4 text-accent" />;
    }
  };

  return (
    <section
      id="amenities"
      className="relative w-full min-h-screen bg-[#F7F4EF] text-primary py-24 px-6 sm:px-12 border-t border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-xs font-sans tracking-wide text-accent font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Communal Sanctuaries</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-primary">
              Amenities Experience
            </h2>
            <p className="font-editorial italic text-xl text-secondary mt-1">
              100 curated communal spaces crafted for restoration, athleticism, and social connection
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search 100 amenities..."
              data-interactive
              className="w-full bg-white border border-border rounded-full pl-10 pr-4 py-2 text-xs text-primary placeholder-muted focus:outline-none focus:border-accent shadow-sm"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-10 pb-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            const count =
              cat === "All"
                ? amenities.length
                : amenities.filter((a) => a.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setPage(1);
                }}
                data-interactive
                className={`px-4 py-2 rounded-full text-xs font-medium font-sans whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white font-semibold shadow-md"
                    : "bg-white hover:bg-stone-100 text-secondary border border-border"
                }`}
              >
                {cat}
                <span className="ml-1.5 opacity-60 font-mono text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Visual Storytelling Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {displayedAmenities.map((amenity, idx) => (
            <motion.div
              key={amenity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group bg-white rounded-3xl overflow-hidden border border-border shadow-card hover:shadow-luxury hover:border-accent/30 transition-all duration-300 flex flex-col justify-between"
              data-cursor-expand
            >
              {/* Image Preview */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${amenity.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-medium text-primary shadow-sm">
                    {getCategoryIcon(amenity.category)}
                    <span>{amenity.category}</span>
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-heading text-lg font-bold text-white tracking-tight leading-snug">
                    {amenity.curatedName}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <p className="text-secondary text-xs sm:text-sm font-sans leading-relaxed">
                  {amenity.description}
                </p>

                {/* Perks */}
                <div className="pt-3 border-t border-border space-y-1.5">
                  {amenity.perks.map((p, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs text-primary font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination & Status Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border text-xs text-secondary font-mono">
          <span>
            Showing {(page - 1) * itemsPerPage + 1}–
            {Math.min(page * itemsPerPage, filteredAmenities.length)} of {filteredAmenities.length}{" "}
            Amenities (100 Total in Masterplan)
          </span>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                data-interactive
                className="p-2 rounded-lg bg-white border border-border disabled:opacity-40 hover:bg-stone-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 font-semibold text-primary">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                data-interactive
                className="p-2 rounded-lg bg-white border border-border disabled:opacity-40 hover:bg-stone-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
