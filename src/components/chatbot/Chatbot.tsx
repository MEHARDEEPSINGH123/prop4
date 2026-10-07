"use client";

import Script from "next/script";

declare global {
  interface Window {
    DagsisChat?: {
      init: (config: { agentId: string; apiKey: string }) => void;
      [key: string]: any;
    };
  }
}

export default function Chatbot() {
  const initChat = () => {
    if (typeof window === "undefined") return;
    
    if (window.DagsisChat && typeof window.DagsisChat.init === "function") {
      window.DagsisChat.init({
        agentId: "08b7eb4e-8f75-4830-a13e-26497a542b1d",
        apiKey: "6f8ac3e5-c75c-42c8-8584-5d4409b747a0",
      });
    } else {
      // Graceful fallback retry in case script evaluation executes asynchronously
      let retries = 0;
      const interval = setInterval(() => {
        retries++;
        if (window.DagsisChat && typeof window.DagsisChat.init === "function") {
          window.DagsisChat.init({
            agentId: "08b7eb4e-8f75-4830-a13e-26497a542b1d",
            apiKey: "6f8ac3e5-c75c-42c8-8584-5d4409b747a0",
          });
          clearInterval(interval);
        } else if (retries >= 25) {
          clearInterval(interval);
        }
      }, 200);
    }
  };

  return (
    <Script
      src="https://dagsis.jsuite.in/widget.js"
      strategy="afterInteractive"
      onLoad={initChat}
    />
  );
}
