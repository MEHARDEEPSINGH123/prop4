"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { X, Sparkles } from "lucide-react";

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

const AGENT_ID = "08b7eb4e-8f75-4830-a13e-26497a542b1d";
const API_KEY = "6f8ac3e5-c75c-42c8-8584-5d4409b747a0";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Listen for header AI Agent button clicks
    const handleToggle = () => {
      // If external Dagsis container exists in DOM, toggle it
      const dagsisContainer = document.getElementById("dagsis-chat-container");
      if (dagsisContainer) {
        const isHidden =
          dagsisContainer.style.display === "none" ||
          getComputedStyle(dagsisContainer).display === "none";
        dagsisContainer.style.display = isHidden ? "block" : "none";
      } else {
        // Fallback toggle for embedded Dagsis frame
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("toggle-dagsis-chat", handleToggle);
    window.addEventListener("open-dagsis-chat", handleToggle);

    return () => {
      window.removeEventListener("toggle-dagsis-chat", handleToggle);
      window.removeEventListener("open-dagsis-chat", handleToggle);
    };
  }, []);

  return (
    <>
      {/* Official Dagsis AI Script provided by user */}
      <Script
        src="https://dagsis.jsuite.in/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && window.DagsisChat) {
            window.DagsisChat.init({
              agentId: AGENT_ID,
              apiKey: API_KEY,
            });
          }
        }}
      />

      {/* Dagsis AI Agent CDN fallback script */}
      <Script
        src="https://dagsis.ai/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && window.DagsisChat) {
            window.DagsisChat.init({
              agentId: AGENT_ID,
              apiKey: API_KEY,
            });
          }
        }}
      />

      {/* Fallback Direct Dagsis Agent Window (Active when triggered via Header Button if external script is blocked/offline) */}
      {isOpen && (
        <div
          id="dagsis-direct-window"
          className="fixed bottom-6 right-6 z-[999999] w-[calc(100vw-32px)] sm:w-[420px] h-[640px] max-h-[88vh] rounded-2xl bg-[#18181B] border border-accent/40 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header styled to Horizon Living UI theme */}
          <div className="px-4 py-3 bg-[#18181B] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="font-heading text-sm font-semibold text-stone-100 tracking-tight">
                Dagsis AI Agent
              </span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-stone-400 hover:text-accent hover:bg-white/10 transition-colors"
              title="Close Dagsis AI Agent"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Real Dagsis Embedded Agent */}
          <div className="flex-1 w-full h-full bg-white relative">
            <iframe
              src={`https://dagsis.ai/embed/${AGENT_ID}#apiKey=${encodeURIComponent(API_KEY)}`}
              title="Dagsis AI Agent"
              allow="clipboard-write; microphone"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      )}
    </>
  );
}
