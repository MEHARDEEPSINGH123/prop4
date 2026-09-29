"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  viewingEvents,
  communities,
  ViewingEventEnriched,
} from "@/data/dataset";
import {
  CalendarCheck,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Sparkles,
  CheckCircle2,
  Car,
  Wine,
  Glasses,
  Compass,
} from "lucide-react";

export default function BookTourExperience() {
  const [selectedCommunityId, setSelectedCommunityId] = useState("COM001");
  const [selectedEventId, setSelectedEventId] = useState("VE001");
  const [chauffeurService, setChauffeurService] = useState(true);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Match viewing events tied to selected community or filtered
  const communityEvents = viewingEvents.filter(
    (ve) => ve.communityId === selectedCommunityId
  );
  const activeEvent =
    viewingEvents.find((ve) => ve.id === selectedEventId) || communityEvents[0] || viewingEvents[0];
  const activeCommunity =
    communities.find((c) => c.community_id === selectedCommunityId) || communities[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) return;

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#C46A3A", "#F7F4EF", "#567A60", "#18181B"],
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setGuestName("");
    setGuestEmail("");
    setGuestPhone("");
  };

  return (
    <section
      id="book-tour"
      className="relative w-full min-h-screen bg-[#FAF8F5] text-primary py-24 px-6 sm:px-12 border-t border-border overflow-hidden"
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

        {/* Master Booking Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Community & Calendar Slot Picker */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-card space-y-6">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-sans uppercase tracking-widest text-accent font-medium block">
                Sanctuary Selection
              </span>
              <h3 className="font-heading text-xl font-bold text-primary mt-0.5">
                Select Master Community & Event
              </h3>
            </div>

            {/* Community Selector */}
            <div className="space-y-2">
              <label className="text-xs font-sans uppercase tracking-wider text-secondary block">
                Target Community (20 Master Planned Enclaves)
              </label>
              <select
                value={selectedCommunityId}
                onChange={(e) => {
                  setSelectedCommunityId(e.target.value);
                  const firstEv = viewingEvents.find((v) => v.communityId === e.target.value);
                  if (firstEv) setSelectedEventId(firstEv.id);
                }}
                data-interactive
                className="w-full bg-[#FAF8F5] border border-border text-primary text-xs sm:text-sm rounded-2xl p-3 font-sans focus:outline-none focus:border-accent"
              >
                {communities.map((c) => (
                  <option key={c.community_id} value={c.community_id}>
                    {c.name} ({c.district})
                  </option>
                ))}
              </select>
            </div>

            {/* Calendar UI: Available Dates & Slot Cards from Dataset */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-secondary">
                <span>Select Scheduled Viewing Session</span>
                <span className="text-accent">{activeEvent.slots} Slots Left</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                {(communityEvents.length > 0 ? communityEvents : viewingEvents.slice(0, 8)).map(
                  (evt) => {
                    const isSelected = evt.id === selectedEventId;
                    return (
                      <button
                        key={evt.id}
                        type="button"
                        onClick={() => setSelectedEventId(evt.id)}
                        data-interactive
                        className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-md"
                            : "bg-[#FAF8F5] hover:bg-stone-100 text-secondary border-border"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                          <span className={isSelected ? "text-accent" : "text-secondary"}>
                            {evt.dateStr}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] ${
                              isSelected
                                ? "bg-accent text-white"
                                : "bg-white border border-border text-primary"
                            }`}
                          >
                            {evt.slots} Slots
                          </span>
                        </div>

                        <span className="font-heading font-bold text-sm block">
                          {evt.format}
                        </span>

                        <span
                          className={`text-[11px] mt-1 font-mono ${
                            isSelected ? "text-stone-300" : "text-muted"
                          }`}
                        >
                          {evt.timeSlot}
                        </span>
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Host Information */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-border flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-muted block">
                  Designated Executive Host
                </span>
                <span className="font-heading font-semibold text-primary text-xs sm:text-sm">
                  {activeEvent.host}
                </span>
              </div>
              <span className="p-2 rounded-full bg-white border border-border text-accent">
                <Sparkles className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Right Column: Booking Credentials & VIP Confirmation */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-card relative">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="bookingForm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="border-b border-border pb-4">
                    <span className="text-xs font-sans uppercase tracking-widest text-accent font-medium block">
                      Guest Accreditation
                    </span>
                    <h3 className="font-heading text-xl font-bold text-primary mt-0.5">
                      Guest Accreditation & Preferences
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-secondary block mb-1">
                        Full Legal Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="e.g. Dr. Julian Vance"
                          data-interactive
                          className="w-full bg-[#FAF8F5] border border-border rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-primary focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-secondary block mb-1">
                        Confidential Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder="julian@venturefamily.com"
                          data-interactive
                          className="w-full bg-[#FAF8F5] border border-border rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-primary focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-secondary block mb-1">
                        Mobile Telephone
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          placeholder="+65 9123 4567"
                          data-interactive
                          className="w-full bg-[#FAF8F5] border border-border rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-primary focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    {/* Chauffeur Service Toggle */}
                    <div
                      onClick={() => setChauffeurService(!chauffeurService)}
                      data-interactive
                      className="p-4 rounded-2xl bg-[#FAF8F5] border border-border cursor-pointer flex items-center justify-between select-none hover:border-accent/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-white border border-border text-accent">
                          <Car className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-heading font-bold text-primary block">
                            Complimentary EV Chauffeur Service
                          </span>
                          <span className="text-[11px] text-muted">
                            Private electric transfer to and from your current residence
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          chauffeurService
                            ? "bg-accent border-accent text-white"
                            : "border-border bg-white"
                        }`}
                      >
                        {chauffeurService && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    data-interactive
                    className="w-full py-4 px-8 rounded-full bg-accent hover:bg-accent-hover text-white text-sm font-semibold tracking-wider transition-all shadow-luxury hover:scale-[1.01]"
                  >
                    Confirm Private Tour Booking
                  </button>
                </motion.form>
              ) : (
                /* Success State Animation Card */
                <motion.div
                  key="bookingSuccess"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-success flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                      Reservation Confirmed
                    </span>
                    <h3 className="font-heading text-3xl font-bold text-primary mt-1">
                      Welcome, {guestName}
                    </h3>
                    <p className="font-editorial italic text-lg text-secondary mt-1">
                      Your VIP itinerary has been transmitted to {guestEmail}
                    </p>
                  </div>

                  {/* Digital Invitation Pass */}
                  <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-border text-left space-y-3 text-xs font-mono">
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted">COMMUNITY:</span>
                      <span className="font-bold text-primary">{activeCommunity.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted">DATE & TIME:</span>
                      <span className="font-bold text-primary">{activeEvent.dateStr} • {activeEvent.timeSlot}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted">HOST:</span>
                      <span className="font-bold text-primary">{activeEvent.host}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">CHAUFFEUR:</span>
                      <span className="font-bold text-accent">
                        {chauffeurService ? "Confirmed • Executive EV Dispatch" : "Self-Arrival"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    data-interactive
                    className="px-6 py-2.5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
                  >
                    Book Additional Session
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
