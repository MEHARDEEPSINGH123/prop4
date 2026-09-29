"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Building2,
  MapPin,
  Sparkles,
  Cpu,
  Home,
  Trees,
  TrendingUp,
  Calculator,
  GitCompare,
  CalendarCheck,
  ChevronUp,
  X,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: typeof Compass;
  href: string;
  isSpecial?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: "intro", label: "Explore", icon: Compass, href: "#intro" },
  { id: "communities", label: "Communities", icon: Building2, href: "#communities" },
  { id: "districts", label: "Districts", icon: MapPin, href: "#districts" },
  { id: "lifestyle", label: "Lifestyle", icon: Sparkles, href: "#lifestyle" },
  { id: "smart-living", label: "Smart Living", icon: Cpu, href: "#smart-living" },
  { id: "residences", label: "Residences", icon: Home, href: "#residences" },
  { id: "amenities", label: "Amenities", icon: Trees, href: "#amenities" },
  { id: "investment", label: "Investment", icon: TrendingUp, href: "#investment" },
  { id: "financing", label: "Financing", icon: Calculator, href: "#financing" },
  { id: "compare", label: "Compare", icon: GitCompare, href: "#compare" },
  { id: "book-tour", label: "Book Tour", icon: CalendarCheck, href: "/booking", isSpecial: true },
];

export default function FloatingGlassDock() {
  const pathname = usePathname();
  const isBookingPage = pathname === "/booking";

  const [isOpen, setIsOpen] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(isBookingPage ? "book-tour" : "intro");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isManuallyClosedRef = useRef(false);

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    isManuallyClosedRef.current = true;
    setIsOpen(false);
  };

  const handleOpen = () => {
    isManuallyClosedRef.current = false;
    setIsOpen(true);
  };

  useEffect(() => {
    if (isBookingPage) {
      setActiveSection("book-tour");
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // At very top of page, keep open unless user manually closed it
      if (currentScrollY < 120) {
        if (!isManuallyClosedRef.current) {
          setIsOpen(true);
        }
      } else {
        // Scrolling down: shrink to small 3 horizontal lines button
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 8) {
          setIsOpen(false);
        } else if (lastScrollY - currentScrollY > 8) {
          // Scrolling up: pop up to full dock with 1 sec animation
          isManuallyClosedRef.current = false;
          setIsOpen(true);
        }
      }

      setLastScrollY(currentScrollY);

      // Active section detection
      const sections = NAV_ITEMS.filter((item) => item.href.startsWith("#")).map((item) =>
        document.querySelector(item.href)
      );
      const scrollPosition = currentScrollY + window.innerHeight * 0.4;

      sections.forEach((sec, idx) => {
        if (sec) {
          const rect = (sec as HTMLElement).offsetTop;
          const height = (sec as HTMLElement).offsetHeight;
          if (scrollPosition >= rect && scrollPosition < rect + height) {
            setActiveSection(NAV_ITEMS[idx].id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isBookingPage]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Resolve navigation destination whether on home page or /booking
  const resolveHref = (item: NavItem) => {
    if (item.href.startsWith("#")) {
      return isBookingPage ? `/${item.href}` : item.href;
    }
    return item.href;
  };

  return (
    <div className="fixed bottom-6 right-6 sm:right-8 z-40 max-w-[calc(100vw-2rem)]">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Small Circular Trigger with Three Horizontal Lines in Same Corner */
          <motion.button
            key="smallTrigger"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleOpen}
            data-interactive
            title="Open Navigation"
            aria-label="Open Navigation Menu"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-xl border border-stone-200/90 shadow-dock hover:shadow-luxury hover:scale-105 active:scale-95 transition-all flex items-center justify-center group cursor-pointer"
          >
            {/* Ambient luxury accent glow */}
            <div className="absolute inset-0 -z-10 rounded-full bg-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Three Clean Horizontal Lines */}
            <div className="flex flex-col items-center justify-center gap-1 w-4.5">
              <span className="w-4 h-[2px] bg-primary rounded-full group-hover:bg-accent transition-colors duration-200" />
              <span className="w-4 h-[2px] bg-primary rounded-full group-hover:bg-accent transition-colors duration-200" />
              <span className="w-4 h-[2px] bg-primary rounded-full group-hover:bg-accent transition-colors duration-200" />
            </div>
          </motion.button>
        ) : (
          /* Ultra-Compact Luxury Dock (Active Section Expanded + Hover Tooltips + Book Tour) */
          <motion.nav
            key="compactDock"
            aria-label="Floating Navigation Dock"
            initial={{ opacity: 0, scale: 0.8, x: 35, y: 15 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 35, y: 15 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center gap-0.5 sm:gap-1 px-2 py-1 rounded-full bg-white/95 backdrop-blur-xl border border-stone-200/90 shadow-dock overflow-visible"
          >
            {/* Subtle Ambient Accent Border Glow */}
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent/5 via-stone-400/5 to-accent/5 blur-sm" />

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              const isHovered = hoveredItem === item.id;
              const targetUrl = resolveHref(item);

              if (item.isSpecial) {
                // Highlighted Book Tour Action Pill leading to /booking
                return (
                  <Link
                    key={item.id}
                    href={targetUrl}
                    data-interactive
                    className={`relative flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-sans font-semibold whitespace-nowrap transition-all duration-200 ml-0.5 shadow-sm ${
                      isBookingPage
                        ? "bg-primary text-white"
                        : "bg-accent hover:bg-accent-hover text-white hover:scale-105 active:scale-95"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              }

              return (
                <div key={item.id} className="relative">
                  {/* Floating Micro-Tooltip on Hover */}
                  <AnimatePresence>
                    {isHovered && !isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 2, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-stone-900/90 backdrop-blur-sm text-white text-[10px] font-sans tracking-wide whitespace-nowrap shadow-md pointer-events-none z-50 border border-white/10"
                      >
                        {item.label}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Link
                    href={targetUrl}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    data-interactive
                    className={`relative group flex items-center gap-1.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? "px-2.5 py-1 text-primary font-semibold bg-stone-100/90 border border-stone-200/80 shadow-sm"
                        : "p-1.5 text-secondary hover:text-primary hover:bg-stone-50"
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isActive ? "text-accent stroke-[2.2]" : "text-secondary stroke-[1.8] group-hover:scale-110"
                      }`}
                    />

                    {/* Active Label reveals cleanly only for the active section */}
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="tracking-tight font-sans whitespace-nowrap text-[11px] text-primary"
                      >
                        {item.label}
                      </motion.span>
                    )}

                    {/* Mini Active Dot */}
                    {isActive && (
                      <span className="w-1 h-1 rounded-full bg-accent animate-pulseSubtle ml-0.5" />
                    )}
                  </Link>
                </div>
              );
            })}

            {/* Quick Controls: Return to Top & ( X ) Close Cross */}
            <div className="flex items-center pl-1 border-l border-stone-200/80 ml-0.5 gap-0.5">
              <button
                onClick={scrollToTop}
                title="Return to Top"
                data-interactive
                className="p-1 rounded-full hover:bg-stone-100 text-secondary hover:text-primary transition-colors"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleClose}
                title="Close Navigation"
                data-interactive
                aria-label="Close Navigation"
                className="p-1 rounded-full hover:bg-stone-100 text-secondary hover:text-accent transition-colors group"
              >
                <X className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
