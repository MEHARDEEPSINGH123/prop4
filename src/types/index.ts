// Horizon Living Core Types

export type AvailabilityStatus = "Launching Soon" | "Limited Units" | "Now Selling" | "Sold Out" | string;

export interface CommunityRaw {
  community_id: string;
  name: string;
  district: string;
  starting_price_sgd: number;
  availability: AvailabilityStatus;
}

export interface CommunityEnriched extends CommunityRaw {
  slug: string;
  tagline: string;
  description: string;
  smartScore: number;
  sustainabilityScore: number;
  heroImage: string;
  galleryImages: string[];
  architect: string;
  unitsCount: number;
  energyRating: string;
  highlights: string[];
}

export interface ResidenceRaw {
  residence_id: string;
  community_id: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  price_sgd: number;
}

export interface ResidenceEnriched extends ResidenceRaw {
  luxuryName: string;
  collectionType: string;
  floorLevel: string;
  orientation: string;
  image: string;
  floorplanUrl: string;
  pricePerSqft: number;
  features: string[];
}

export interface DistrictRaw {
  district_id: string;
  name: string;
}

export interface DistrictEnriched extends DistrictRaw {
  region: string;
  code: string;
  vibe: string;
  description: string;
  image: string;
  coordinates: { x: number; y: number };
  growthAverage: string;
  transitScore: number;
  greeneryRatio: string;
}

export interface AmenityRaw {
  id: string;
  name: string;
}

export type AmenityCategory = "Wellness" | "Sports" | "Family" | "Business" | "Leisure" | "Community";

export interface AmenityEnriched extends AmenityRaw {
  curatedName: string;
  category: AmenityCategory;
  description: string;
  iconName: string;
  image: string;
  perks: string[];
}

export interface SchoolRaw {
  id: string;
  name: string;
}

export interface SchoolEnriched extends SchoolRaw {
  curatedName: string;
  type: string;
  curriculum: string;
  distanceKm: number;
}

export interface TransportHubRaw {
  id: string;
  name: string;
}

export interface TransportHubEnriched extends TransportHubRaw {
  curatedName: string;
  lines: string[];
  distanceKm: number;
  type: "MRT Metro" | "High-Speed Rail" | "Expressway Arterial" | "Autonomous Shuttle";
}

export interface LifestyleZoneRaw {
  id: string;
  name: string;
}

export type LifestyleCategory = "Wellness" | "Retail" | "Entertainment" | "Dining" | "Nature" | "Family Living" | "Technology";

export interface LifestyleZoneEnriched extends LifestyleZoneRaw {
  curatedName: string;
  category: LifestyleCategory;
  tagline: string;
  description: string;
  image: string;
  curator: string;
  hours: string;
  tags: string[];
}

export interface SmartFeatureRaw {
  id: string;
  name: string;
}

export interface SmartFeatureEnriched extends SmartFeatureRaw {
  curatedName: string;
  category: "Climate & Air" | "Biometrics & Security" | "Energy & Grid" | "Acoustics & Light" | "Autonomous Services";
  description: string;
  benefits: string[];
  metric: string;
  icon: string;
}

export interface InvestmentInsightRaw {
  id: string;
  growth: string;
}

export interface InvestmentInsightEnriched extends InvestmentInsightRaw {
  growthNumeric: number;
  rentalYield: string;
  districtId: string;
  districtName: string;
  trendDirection: "accelerating" | "stable" | "prime-peak";
  horizonOutlook: string;
  fiveYearAppreciationEst: string;
  capitalRecommendation: string;
}

export interface FinancingProgramRaw {
  id: string;
  tenure_years: number;
}

export interface FinancingProgramEnriched extends FinancingProgramRaw {
  planName: string;
  rateType: "Fixed ESG Green Tier" | "Floating Prime Benchmark" | "Private Wealth Bespoke";
  baseRate: number;
  minDownPaymentPct: number;
  rebatePercent: number;
  features: string[];
}

export interface ViewingEventRaw {
  id: string;
  slots: number;
}

export interface ViewingEventEnriched extends ViewingEventRaw {
  communityId: string;
  communityName: string;
  dateStr: string;
  timeSlot: string;
  format: "VIP Private Tour" | "Sunset Architectural Salon" | "VR Spatial Walkthrough" | "Penthouse Champagne Preview";
  host: string;
}

export interface ProjectComparisonRaw {
  id: string;
  project_a: string;
  project_b: string;
}

export interface ProjectComparisonEnriched extends ProjectComparisonRaw {
  headline: string;
  advantageA: string;
  advantageB: string;
  recommendationThesis: string;
}

export interface CustomerStoryRaw {
  id: string;
  customer: string;
  rating: number;
}

export interface CustomerStoryEnriched extends CustomerStoryRaw {
  customerName: string;
  role: string;
  avatar: string;
  quote: string;
  communityPurchased: string;
  residenceModel: string;
  yearPurchased: number;
  lifestyleHighlight: string;
}
