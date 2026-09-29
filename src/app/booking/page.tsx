import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, ShieldCheck, Compass } from "lucide-react";
import BookTourExperience from "@/components/booking/BookTourExperience";
import FloatingGlassDock from "@/components/dock/FloatingGlassDock";

export const metadata: Metadata = {
  title: "Book Private Viewing | Horizon Living Singapore",
  description:
    "Exclusive residency viewing accreditation. Reserve private access to architectural pavilions, sky decks, and private wine tastings across 20 master enclaves.",
};

export default function BookingPage() {
  return (
    <main className="relative min-h-screen bg-[#FAF8F5] text-primary selection:bg-accent selection:text-white">
      {/* Top Luxury Navigation Header */}
      <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b border-border py-4 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            data-interactive
            className="group inline-flex items-center gap-2 text-xs font-sans text-secondary hover:text-primary transition-colors"
          >
            <div className="p-1.5 rounded-full bg-stone-100 group-hover:bg-stone-200 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium">Return to Horizon Masterplan</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-[11px] font-sans text-accent font-medium">
              <Sparkles className="w-3 h-3" />
              <span>Accredited VIP Concierge</span>
            </span>
            <div className="hidden sm:flex items-center gap-1 text-[11px] font-sans text-muted">
              <ShieldCheck className="w-3.5 h-3.5 text-success" />
              <span>Encrypted Data Integrity</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Interactive Booking Studio */}
      <BookTourExperience />

      {/* Footer Back Link & Architecture Integrity Stamp */}
      <footer className="w-full bg-[#FAF8F5] border-t border-border py-12 px-6 sm:px-12 text-center space-y-4">
        <p className="font-editorial italic text-lg text-secondary">
          "Architecture is not merely where we reside, but how we cultivate presence."
        </p>
        <div>
          <Link
            href="/"
            data-interactive
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary hover:bg-stone-800 text-white text-xs font-medium transition-all shadow-sm hover:scale-105"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explore All 20 Master Communities</span>
          </Link>
        </div>
        <p className="text-[11px] text-muted">
          © 2026 Horizon Living Singapore • Confidential Private Wealth Facility
        </p>
      </footer>

      {/* Floating Glass Navigation Dock */}
      <FloatingGlassDock />
    </main>
  );
}
