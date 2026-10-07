"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  X,
  RotateCcw,
  Bot,
  CalendarCheck,
  ChevronDown,
  Building2,
  TrendingUp,
  Percent,
} from "lucide-react";

declare global {
  interface Window {
    DagsisChat?: {
      init: (config: { agentId: string; apiKey: string }) => void;
      open?: () => void;
      close?: () => void;
      toggle?: () => void;
      [key: string]: any;
    };
  }
}

interface ChatMessage {
  id: string;
  sender: "agent" | "user";
  text: string;
  timestamp: string;
  actions?: Array<{ label: string; href?: string; prompt?: string }>;
}

const INITIAL_GREETING =
  "Welcome to Horizon Living. I am your Dagsis AI Spatial Concierge, versed in our 20 master communities, 30 Singapore districts, 120 curated residences, and bespoke private wealth financing. How may I assist your exploration today?";

const QUICK_QUESTIONS = [
  "Tell me about The Horizon Solaris Marina",
  "What is the starting price across the portfolio?",
  "Can foreign buyers purchase here?",
  "How do I book a private viewing tour?",
  "Explain the 2.45% Green ESG Mortgage",
  "What are the biophilic & smart living features?",
];

// Curated Knowledge Engine grounded in Horizon Living dataset
function getConciergeResponse(query: string): {
  text: string;
  actions?: Array<{ label: string; href?: string; prompt?: string }>;
} {
  const q = query.toLowerCase();

  if (q.includes("solaris") || q.includes("marina") || q.includes("com001")) {
    return {
      text: "The Horizon Solaris Marina (COM001 in District 1 - Marina Bay) is an iconic waterfront enclave designed by Kengo Kuma & Associates. Starting from SGD $925,000 with 18 exclusive residences, it features private 80ft yacht moorings, kinetic zero-carbon solar louvers, a sub-aquatic wellness spa, and an exceptional 90/100 Net-Zero ESG sustainability rating.",
      actions: [
        { label: "Book Private Marina Viewing", href: "/booking" },
        { label: "View District 1 Details", prompt: "Tell me about District 1" },
      ],
    };
  }

  if (q.includes("obsidian") || q.includes("spire") || q.includes("adjaye") || q.includes("com002")) {
    return {
      text: "The Horizon Obsidian Spire (COM002 in District 2 - Tanjong Pagar) was conceived by Studio David Adjaye. Monolithic volcanic stone architecture crowned by private observatory decks, starting at SGD $950,000. Features include a volcanic thermal pool, private helipad access, triple-glazed acoustic PVB glass, and an underground cellar with sommelier concierge.",
      actions: [{ label: "Schedule VIP Tour", href: "/booking" }],
    };
  }

  if (q.includes("biophilic") || q.includes("canopy") || q.includes("woha") || q.includes("com003")) {
    return {
      text: "The Horizon Biophilic Canopy (COM003 in District 3 - Alexandra) by WOHA Architects integrates over 350 native plant species into cascading residential sky terraces. Starting at SGD $975,000, it reduces ambient urban temperatures by 3.4°C and incorporates vertical microclimate control, canopy suspension bridges, and regenerative water capture.",
      actions: [{ label: "Explore Viewing Calendar", href: "/booking" }],
    };
  }

  if (q.includes("price") || q.includes("cost") || q.includes("rate") || q.includes("how much") || q.includes("budget")) {
    return {
      text: "Across our 20 communities, residence acquisitions begin at SGD $815,000 for boutique studio/one-bedroom suites (from 810 sq.ft. at ~SGD $1,006/psf) up to SGD $38,000,000+ for multi-level sky penthouses and cantilevered waterfront pavilions. Every residence includes Sub-Zero & Wolf appliances, private high-speed lift lobbies, and acoustic noise-canceling envelopes.",
      actions: [
        { label: "Financing Calculator", prompt: "Explain the 2.45% Green ESG Mortgage" },
        { label: "Schedule Portfolio Consultation", href: "/booking" },
      ],
    };
  }

  if (q.includes("foreign") || q.includes("foreigner") || q.includes("absd") || q.includes("stamp duty") || q.includes("international")) {
    return {
      text: "Foreign citizens can freely acquire Horizon Living residences as standard non-landed strata titles. While international buyers typically face Singapore's Additional Buyer's Stamp Duty (ABSD), citizens and permanent residents of countries with Free Trade Agreements (including the United States, Switzerland, Norway, Iceland, and Liechtenstein) enjoy the exact same stamp duty treatment as Singapore Citizens for their first residential acquisition.",
      actions: [
        { label: "Consult Private Wealth Advisory", href: "/booking" },
      ],
    };
  }

  if (q.includes("tour") || q.includes("viewing") || q.includes("book") || q.includes("appointment") || q.includes("salon") || q.includes("visit")) {
    return {
      text: "Horizon Living properties maintain zero public showflats to preserve tranquility. Private viewings are conducted by accredited Directors (Marcus Sterling, Celeste Lim, Alexander Wright, Genevieve Tan) across 4 bespoke formats: VIP Private Tour, Sunset Architectural Salon (5:00–6:30 PM), VR Spatial Walkthrough, and Penthouse Champagne Preview. Complimentary Rolls-Royce Spectre or Mercedes-Maybach EQS chauffeur transit is provided.",
      actions: [
        { label: "Reserve Chauffeur & Viewing Slot", href: "/booking" },
      ],
    };
  }

  if (q.includes("financ") || q.includes("mortgage") || q.includes("loan") || q.includes("rate") || q.includes("esg")) {
    return {
      text: "In partnership with Tier-1 Swiss and Singapore private banks (UBS, Julius Baer, DBS Private Bank), Horizon Living offers preferential 2.45% p.a. Fixed Green ESG Mortgages with a 20% down payment and 1.5% green rebate on upfront capital costs. All facilities feature zero lock-in penalties after 24 months and complimentary interest rate conversion after year three.",
      actions: [
        { label: "Book Private Wealth Session", href: "/booking" },
      ],
    };
  }

  if (q.includes("smart") || q.includes("tech") || q.includes("air") || q.includes("light") || q.includes("biometric") || q.includes("wellness")) {
    return {
      text: "Our residences feature invisible ambient intelligence: Circadian Spectral Lighting shifting from 2200K amber glow to 5000K crisp white (increasing deep REM sleep by 32%), Sub-Millimeter 3D Biometric Gateways unlocking elevators in 0.18s, Medical-Grade HEPA filtration cycling air volume every 14 minutes (99.97% PM0.1 particulate capture), and Acoustic -48dB PVB triple-glazing for library-grade 24dB calm.",
      actions: [
        { label: "Explore Smart Living", prompt: "Tell me about The Horizon Solaris Marina" },
      ],
    };
  }

  if (q.includes("district") || q.includes("location") || q.includes("where")) {
    return {
      text: "Horizon Living spans Singapore's 30 postal districts—from ultra-prime waterfronts in District 1 (Marina Bay) and District 4 (Sentosa Cove) to prestigious hillside sanctuaries in District 10 (Tanglin, Bukit Timah) and emerging smart waterway corridors in District 29 (Punggol Northshore). Average 5-year capital growth ranges between 4.2% and 8.2% across sectors.",
      actions: [
        { label: "Explore District 1", prompt: "Tell me about The Horizon Solaris Marina" },
        { label: "Book District Tour", href: "/booking" },
      ],
    };
  }

  // Default intelligent concierge response
  return {
    text: `Thank you for your inquiry. Horizon Living's Singapore portfolio encompasses 20 master communities engineered by Pritzker-winning architects, 120 bespoke residences, and 100 private wellness facilities. You may explore specific enclaves (like The Horizon Solaris Marina or Obsidian Spire), calculate 2.45% ESG financing, or reserve a private chauffeur-accompanied viewing salon.`,
    actions: [
      { label: "Explore The Horizon Solaris Marina", prompt: "Tell me about The Horizon Solaris Marina" },
      { label: "Schedule Private Viewing Salon", href: "/booking" },
      { label: "View ESG Financing (2.45%)", prompt: "Explain the 2.45% Green ESG Mortgage" },
    ],
  };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-0",
      sender: "agent",
      text: INITIAL_GREETING,
      timestamp: "Just now",
      actions: [
        { label: "🏛️ The Horizon Solaris Marina", prompt: "Tell me about The Horizon Solaris Marina" },
        { label: "💰 Price Ranges", prompt: "What is the starting price across the portfolio?" },
        { label: "📅 Schedule Private Viewing", href: "/booking" },
        { label: "🌿 2.45% ESG Financing", prompt: "Explain the 2.45% Green ESG Mortgage" },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Listen for global custom events to open the AI Agent
  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 300);
    };

    window.addEventListener("open-dagsis-chat", handleOpenEvent);
    window.addEventListener("open-ai-agent", handleOpenEvent);

    return () => {
      window.removeEventListener("open-dagsis-chat", handleOpenEvent);
      window.removeEventListener("open-ai-agent", handleOpenEvent);
    };
  }, []);

  // Initialize DagsisChat external agent
  const handleScriptLoad = () => {
    if (typeof window !== "undefined") {
      const initDagsis = () => {
        if (window.DagsisChat && typeof window.DagsisChat.init === "function") {
          try {
            window.DagsisChat.init({
              agentId: "08b7eb4e-8f75-4830-a13e-26497a542b1d",
              apiKey: "6f8ac3e5-c75c-42c8-8584-5d4409b747a0",
            });
          } catch (err) {
            console.warn("DagsisChat init caught:", err);
          }
        }
      };

      initDagsis();

      // Graceful retry
      let retries = 0;
      const interval = setInterval(() => {
        retries++;
        if (window.DagsisChat && typeof window.DagsisChat.init === "function") {
          initDagsis();
          clearInterval(interval);
        } else if (retries >= 15) {
          clearInterval(interval);
        }
      }, 300);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const userText = (textToSend || input).trim();
    if (!userText) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // If external DagsisChat is available, forward query or open
    if (typeof window !== "undefined") {
      const win = window as any;
      if (win.DagsisChat?.sendMessage && typeof win.DagsisChat.sendMessage === "function") {
        try {
          win.DagsisChat.sendMessage(userText);
        } catch {
          // ignore
        }
      }
    }

    // AI Concierge Response with realistic typing delay
    setTimeout(() => {
      const response = getConciergeResponse(userText);
      const agentMessage: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: "agent",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actions: response.actions,
      };

      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleReset = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: "agent",
        text: INITIAL_GREETING,
        timestamp: "Just now",
        actions: [
          { label: "🏛️ The Horizon Solaris Marina", prompt: "Tell me about The Horizon Solaris Marina" },
          { label: "💰 Price Ranges", prompt: "What is the starting price across the portfolio?" },
          { label: "📅 Schedule Private Viewing", href: "/booking" },
          { label: "🌿 2.45% ESG Financing", prompt: "Explain the 2.45% Green ESG Mortgage" },
        ],
      },
    ]);
  };

  return (
    <>
      {/* 1. External Script from Dagsis */}
      <Script
        src="https://dagsis.jsuite.in/widget.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={() => {
          console.info("Dagsis external widget unavailable. Using Horizon Living native AI Concierge engine.");
        }}
      />

      {/* 2. Floating Bottom-Right AI Agent Launcher (Matching UI Theme) */}
      <div className="fixed bottom-6 right-6 z-40">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 10 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsOpen(true);
                // Also trigger external Dagsis if initialized
                if (typeof window !== "undefined") {
                  const win = window as any;
                  if (win.DagsisChat?.open) win.DagsisChat.open();
                }
              }}
              data-interactive
              aria-label="Open Horizon Living AI Concierge"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-stone-900/95 hover:bg-stone-900 border border-accent/40 hover:border-accent text-stone-100 shadow-2xl backdrop-blur-md transition-all duration-300 group cursor-pointer"
            >
              {/* Glowing Pulse Dot */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
              </span>

              <Sparkles className="w-4 h-4 text-accent group-hover:rotate-12 transition-transform duration-300" />

              <div className="flex flex-col text-left">
                <span className="text-[12px] font-sans font-medium tracking-wide leading-none text-stone-100">
                  Dagsis AI Agent
                </span>
                <span className="text-[9px] font-mono text-accent/90 uppercase tracking-widest mt-0.5">
                  Spatial Concierge
                </span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Luxury Slide-In AI Agent Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-[420px] h-[580px] max-h-[85vh] z-50 flex flex-col rounded-2xl bg-stone-900/95 backdrop-blur-xl border border-accent/30 shadow-2xl overflow-hidden font-sans text-stone-200"
          >
            {/* Header */}
            <div className="relative px-4 py-3.5 bg-stone-950/80 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {/* Monogram Avatar */}
                <div className="relative w-8 h-8 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center text-accent font-heading font-bold text-xs shadow-inner">
                  H
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-stone-900" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading text-sm font-semibold text-stone-100 tracking-tight">
                      Horizon Concierge
                    </h3>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-accent/20 text-accent font-mono">
                      Dagsis AI
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-400 font-mono flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online • Spatial Intelligence v2.4
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  data-interactive
                  title="Reset Conversation"
                  aria-label="Reset Conversation"
                  className="p-1.5 rounded-full text-stone-400 hover:text-stone-100 hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  data-interactive
                  title="Close AI Agent"
                  aria-label="Close AI Agent"
                  className="p-1.5 rounded-full text-stone-400 hover:text-accent hover:bg-white/10 transition-colors group"
                >
                  <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-3.5 text-xs scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-accent text-white font-normal rounded-tr-sm shadow-md"
                        : "bg-stone-800/90 text-stone-200 border border-white/5 rounded-tl-sm shadow-sm"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>

                  {/* Actions / Suggestion buttons embedded in message */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                      {msg.actions.map((act, i) =>
                        act.href ? (
                          <Link
                            key={i}
                            href={act.href}
                            onClick={() => setIsOpen(false)}
                            data-interactive
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/20 hover:bg-accent border border-accent/40 text-stone-100 hover:text-white text-[11px] font-sans font-medium transition-colors"
                          >
                            <CalendarCheck className="w-3 h-3 text-accent hover:text-white" />
                            {act.label}
                          </Link>
                        ) : (
                          <button
                            key={i}
                            onClick={() => act.prompt && handleSendMessage(act.prompt)}
                            data-interactive
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-800 hover:bg-stone-700/80 border border-stone-700/60 text-stone-300 hover:text-stone-100 text-[11px] transition-colors"
                          >
                            {act.label}
                          </button>
                        )
                      )}
                    </div>
                  )}

                  <span className="text-[9px] text-stone-500 font-mono mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 text-stone-400 bg-stone-800/60 border border-white/5 px-3 py-2 rounded-2xl w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                  <span className="text-[10px] font-mono ml-1 text-stone-400">Consulting spatial core…</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips Tray */}
            <div className="px-3 py-2 bg-stone-950/40 border-t border-white/5 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
              {QUICK_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  data-interactive
                  className="px-2.5 py-1 rounded-full bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700/40 text-[10px] font-sans flex-shrink-0 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-stone-950/90 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about communities, pricing, tours, districts..."
                  className="flex-1 bg-stone-900/90 border border-stone-800 rounded-full px-3.5 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-accent/80 focus:ring-1 focus:ring-accent/80 transition-all font-sans"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  data-interactive
                  aria-label="Send message"
                  className="p-2 rounded-full bg-accent hover:bg-accent/90 disabled:opacity-40 disabled:hover:bg-accent text-white transition-all shadow-md cursor-pointer flex-shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              <div className="flex items-center justify-between text-[9px] text-stone-500 font-mono px-2 pt-1.5">
                <span>Direct Concierge: +65 6800 8899</span>
                <span>Rolls-Royce Chauffeur Available</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
