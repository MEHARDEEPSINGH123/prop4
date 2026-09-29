"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Sparkles,
  ArrowRight,
  Car,
  Wine,
  ShieldCheck,
  Building,
} from "lucide-react";
import { viewingEvents, communities } from "@/data/dataset";

export default function BookingInvitationGateway() {
  return (
    <section
      id="book-tour"
      className="relative w-full bg-[#FAF8F5] text-primary py-24 px-6 sm:px-12 border-t border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border pb-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-xs font-sans tracking-wide text-accent font-medium mb-3">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Private Residency Invitation</span>
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-primary">
              Book Private Viewing
            </h2>
            <p className="font-editorial italic text-xl text-secondary mt-1">
              Reserved access to architectural pavilions, private sky decks, and private wine tastings
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-sans uppercase tracking-wider text-secondary">
              Viewing Sessions: <strong className="text-primary">{viewingEvents.length} Active Slots</strong>
            </span>
          </div>
        </div>

        {/* Grand Invitation Card Stage */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border shadow-card relative overflow-hidden">
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Key Experiential Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-sans uppercase tracking-widest text-accent font-semibold block">
                  Exclusive Invitation Protocol
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-primary mt-1">
                  Experience Architectural Sanctuaries in Person
                </h3>
                <p className="text-secondary text-sm sm:text-base font-sans mt-3 leading-relaxed">
                  Join private walkthroughs of our 20 master enclaves. Every scheduled viewing session features private executive host accompaniment, confidential financial advisory, and complimentary EV chauffeur service.
                </p>
              </div>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-border">
                  <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-2">
                    <Car className="w-4 h-4" />
                  </div>
                  <h4 className="font-heading font-bold text-primary text-xs">EV Chauffeur</h4>
                  <p className="text-[11px] text-muted mt-0.5">Complimentary door-to-door transfer</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-border">
                  <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-2">
                    <Wine className="w-4 h-4" />
                  </div>
                  <h4 className="font-heading font-bold text-primary text-xs">Sky Deck Tastings</h4>
                  <p className="text-[11px] text-muted mt-0.5">Sommelier wine pairing session</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-border">
                  <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-2">
                    <Building className="w-4 h-4" />
                  </div>
                  <h4 className="font-heading font-bold text-primary text-xs">Architectural Host</h4>
                  <p className="text-[11px] text-muted mt-0.5">Design lead accompaniment</p>
                </div>
              </div>

              {/* Direct Link to Dedicated Booking Studio */}
              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  href="/booking"
                  data-interactive
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent hover:bg-accent-hover text-white text-sm font-semibold tracking-wider transition-all duration-300 shadow-luxury hover:scale-105 group"
                >
                  <span>Enter Dedicated Booking Studio</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <div className="flex items-center gap-1.5 text-xs text-muted font-sans">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  <span>Confidential VIP Accreditation • Instant Confirmation</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Event Slot Preview */}
            <div className="lg:col-span-5 bg-[#FAF8F5] rounded-2xl p-6 border border-border space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-sans uppercase tracking-wider text-secondary font-medium">
                  Next Available VIP Slots
                </span>
                <span className="text-xs text-accent font-semibold">Live Availability</span>
              </div>

              <div className="space-y-2.5">
                {viewingEvents.slice(0, 3).map((evt) => (
                  <Link
                    key={evt.id}
                    href="/booking"
                    data-interactive
                    className="block p-3.5 rounded-xl bg-white border border-border hover:border-accent/40 transition-colors group"
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-heading font-bold text-primary group-hover:text-accent transition-colors">
                        {evt.format}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                        {evt.slots} Slots Left
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted font-sans">
                      <span>{evt.dateStr} • {evt.timeSlot}</span>
                      <span className="text-accent group-hover:underline">Reserve →</span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="pt-1 text-center">
                <Link
                  href="/booking"
                  data-interactive
                  className="text-xs font-sans text-accent hover:text-accent-hover font-semibold inline-flex items-center gap-1"
                >
                  <span>View All {viewingEvents.length} Sessions on Booking Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
