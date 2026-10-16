"use client";

import Script from "next/script";

declare global {
  interface Window {
    DagsisChat: {
      init: (config: { agentId: string; apiKey: string; name?: string }) => void;
      [key: string]: any;
    };
  }
}

export default function Chatbot() {
  return (
    <Script
      src="https://dagsis.ai/widget.js"
      strategy="lazyOnload"
      onLoad={() => {
        window.DagsisChat.init({
          agentId: "bf6e91e5-cfa5-4728-87ad-16b73148dba3",
          apiKey: "dad2b72e-8e65-4fa5-98c7-c38f2a9826c5"
        });
      }}
    />
  );
}
