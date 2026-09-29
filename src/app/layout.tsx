import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Horizon Living — Future-Ready Communities Designed Around Life",
  description:
    "An immersive community discovery platform. Explore 20 master-planned enclaves, 120 crafted residences, 100 amenities, and autonomous living across Singapore's 30 districts.",
  keywords: [
    "Horizon Living",
    "Luxury Real Estate",
    "Smart Communities",
    "Biophilic Architecture",
    "Singapore Penthouses",
    "Autonomous Living",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${cormorantGaramond.variable}`}
    >
      <body className="antialiased selection:bg-accent selection:text-white">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
