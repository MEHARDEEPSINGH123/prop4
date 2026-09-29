import IntroExperience from "@/components/landing/IntroExperience";
import CommunityDiscovery from "@/components/communities/CommunityDiscovery";
import InteractiveDistrictExplorer from "@/components/districts/InteractiveDistrictExplorer";
import LifestyleExperience from "@/components/lifestyle/LifestyleExperience";
import SmartLivingExperience from "@/components/smart/SmartLivingExperience";
import ResidenceShowcase from "@/components/residences/ResidenceShowcase";
import AmenitiesExperience from "@/components/amenities/AmenitiesExperience";
import InvestmentStudio from "@/components/investment/InvestmentStudio";
import FinancingStudio from "@/components/financing/FinancingStudio";
import ComparisonStudio from "@/components/comparison/ComparisonStudio";
import BookingInvitationGateway from "@/components/booking/BookingInvitationGateway";
import CustomerStories from "@/components/stories/CustomerStories";
import FinalExperience from "@/components/cta/FinalExperience";
import FloatingGlassDock from "@/components/dock/FloatingGlassDock";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-primary selection:bg-accent selection:text-white">
      {/* 1. Landing Introduction (100vh Fullscreen Experience) */}
      <IntroExperience />

      {/* 2. Section 01: Community Discovery (20 Master Planned Communities) */}
      <CommunityDiscovery />

      {/* 3. Section 02: Interactive District Explorer (30 Geospatial Districts) */}
      <InteractiveDistrictExplorer />

      {/* 4. Section 03: Lifestyle Experience (40 Curated Zones across 7 Categories) */}
      <LifestyleExperience />

      {/* 5. Section 04: Smart Living Experience (40 Invisible Intelligence Features) */}
      <SmartLivingExperience />

      {/* 6. Section 05: Residence Showcase (120 Residences, Fullscreen Transitions) */}
      <ResidenceShowcase />

      {/* 7. Section 06: Amenities Experience (100 Curated Amenities across 6 Categories) */}
      <AmenitiesExperience />

      {/* 8. Section 07: Investment Studio (50 Investment Insights & SVG Charts) */}
      <InvestmentStudio />

      {/* 9. Section 08: Financing Studio (25 Financing Programs & Mortgage Engine) */}
      <FinancingStudio />

      {/* 10. Section 09: Comparison Studio (50 Project Comparisons, Card vs Card) */}
      <ComparisonStudio />

      {/* 11. Section 10: Book Tour Experience Gateway (Links to /booking) */}
      <BookingInvitationGateway />

      {/* 12. Section 11: Customer Stories (100 Editorial Resident Testimonials) */}
      <CustomerStories />

      {/* 13. Section 12: Final Experience (Fullscreen CTA & Architectural Ledger) */}
      <FinalExperience />

      {/* Floating Glass Navigation Dock (Bottom Center, Auto-Hide on Scroll Down) */}
      <FloatingGlassDock />
    </main>
  );
}
