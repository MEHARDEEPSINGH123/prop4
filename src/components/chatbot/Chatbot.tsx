"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { X, Sparkles } from "lucide-react";

declare global {
  interface Window {
    DagsisChat?: {
      init: (config: { agentId: string; apiKey: string; name?: string }) => void;
      open?: () => void;
      close?: () => void;
      toggle?: () => void;
      [key: string]: any;
    };
  }
}

const AGENT_ID = "08b7eb4e-8f75-4830-a13e-26497a542b1d";
const API_KEY = "6f8ac3e5-c75c-42c8-8584-5d4409b747a0";
const WORKING_EMBED_URL = `https://dagsis.ai/embed/${AGENT_ID}?name=${encodeURIComponent("AI Agent")}#apiKey=${encodeURIComponent(API_KEY)}`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 1. Listen for clicks on the header AI AGENT button
    const handleToggle = () => {
      setIsOpen((prev) => !prev);
    };

    window.addEventListener("toggle-dagsis-chat", handleToggle);
    window.addEventListener("open-dagsis-chat", () => setIsOpen(true));

    // 2. Intercept and fix any broken dagsis.jsuite.in URL injected into DOM
    const fixDagsisIframes = () => {
      // Hide any floating buttons in the right corner
      const btn = document.getElementById("dagsis-chat-button");
      if (btn) {
        btn.style.display = "none";
        btn.style.visibility = "hidden";
      }

      // Hide Dagsis's default container if it loaded the broken dagsis.jsuite.in domain
      const defaultContainer = document.getElementById("dagsis-chat-container");
      if (defaultContainer) {
        defaultContainer.style.display = "none";
      }

      // Rewrite any iframe pointing to broken dagsis.jsuite.in -> working dagsis.ai
      const iframes = document.querySelectorAll<HTMLIFrameElement>('iframe[src*="dagsis.jsuite.in"]');
      iframes.forEach((ifr) => {
        ifr.src = ifr.src.replace("dagsis.jsuite.in", "dagsis.ai");
      });
    };

    fixDagsisIframes();
    const observer = new MutationObserver(fixDagsisIframes);
    observer.observe(document.body, { childList: true, subtree: true });

    // 3. Define window.DagsisChat API
    if (typeof window !== "undefined") {
      window.DagsisChat = {
        init: (config) => {
          // If called, ensure isOpen can be toggled
          console.log("DagsisChat initialized:", config.agentId);
        },
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen((prev) => !prev),
      };
    }

    return () => {
      window.removeEventListener("toggle-dagsis-chat", handleToggle);
      window.removeEventListener("open-dagsis-chat", () => setIsOpen(true));
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Script tag with fallback handling */}
      <Script
        src="https://dagsis.jsuite.in/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && window.DagsisChat?.init) {
            window.DagsisChat.init({
              agentId: AGENT_ID,
              apiKey: API_KEY,
            });
          }
        }}
        onError={() => {
          // Handled seamlessly by our direct embed
        }}
      />

      {/* Live Dagsis AI Agent Window (Toggled exclusively from the header AI Agent button) */}
      {isOpen && (
        <div
          id="dagsis-active-window"
          className="fixed bottom-6 right-6 z-[999999] w-[calc(100vw-32px)] sm:w-[420px] h-[640px] max-h-[86vh] rounded-2xl bg-[#18181B] border border-accent/40 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
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
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent/20 text-accent border border-accent/30">
                Online
              </span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-stone-400 hover:text-accent hover:bg-white/10 transition-colors cursor-pointer"
              title="Close Dagsis AI Agent"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Genuine Dagsis AI Agent embedded directly via working dagsis.ai */}
          <div className="flex-1 w-full h-full bg-white relative">
            <iframe
              src={WORKING_EMBED_URL}
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
