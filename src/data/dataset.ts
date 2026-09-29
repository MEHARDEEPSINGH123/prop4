import rawData from "./raw-data.json";
import {
  CommunityEnriched,
  ResidenceEnriched,
  DistrictEnriched,
  AmenityEnriched,
  AmenityCategory,
  SchoolEnriched,
  TransportHubEnriched,
  LifestyleZoneEnriched,
  LifestyleCategory,
  SmartFeatureEnriched,
  InvestmentInsightEnriched,
  FinancingProgramEnriched,
  ViewingEventEnriched,
  ProjectComparisonEnriched,
  CustomerStoryEnriched,
} from "../types";

export * from "../types";

export const rawDataset = rawData;

// Deterministic international currency and number formatters (SSR & Client Hydration Safe)
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(Math.round(num || 0));
};

export const formatSGD = (num: number): string => {
  return `SGD $${formatNumber(num)}`;
};

// Curated Architectural Imagery Pool
const ARCHITECTURAL_HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=85",
];

const INTERIOR_IMAGES = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502005229762-ee1b2da94088?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
];

const LIFESTYLE_IMAGES = [
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80", // Wellness
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80", // Dining
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80", // Retail
  "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80", // Entertainment
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80", // Nature
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80", // Family Living
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80", // Technology
];

// District Master Names and Regional Coordinates
const DISTRICT_DETAILS: Record<string, { region: string; vibe: string; desc: string; coords: { x: number; y: number } }> = {
  "District 1": { region: "Marina Bay & Raffles Place", vibe: "Ultra-Prime Waterfront", desc: "Global financial nexus, iconic bay horizons, and super-prime skyscraper penthouses.", coords: { x: 52, y: 70 } },
  "District 2": { region: "Tanjong Pagar & Chinatown", vibe: "Historic Fusion & High-Design", desc: "Heritage conserved shophouses intertwining with futuristic green towers.", coords: { x: 48, y: 73 } },
  "District 3": { region: "Alexandra & Queenstown", vibe: "Biophilic Urban Corridor", desc: "Lush park connectors, tree-canopy towers, and creative studio clusters.", coords: { x: 42, y: 68 } },
  "District 4": { region: "Sentosa Cove & Keppel Bay", vibe: "Exclusive Island & Marina Living", desc: "Private yacht berths, coral lagoons, and oceanfront sanctuaries.", coords: { x: 45, y: 82 } },
  "District 5": { region: "Buona Vista & West Coast", vibe: "Knowledge & Deep Tech Hub", desc: "Bionics research clusters, serene coastline, and academic enclaves.", coords: { x: 34, y: 64 } },
  "District 6": { region: "City Hall & Civic District", vibe: "Cultural Monolith & Arts", desc: "National galleries, grand colonnades, and neoclassical civic parks.", coords: { x: 53, y: 64 } },
  "District 7": { region: "Bugis & Rochor", vibe: "Eclectic Cosmopolitan Nexus", desc: "Avant-garde architecture, Michelin street fare, and indie design ateliers.", coords: { x: 56, y: 61 } },
  "District 8": { region: "Farrer Park & Little India", vibe: "Artisanal Heritage Quarter", desc: "Vibrant spice trails, boutique loft conversions, and restorative bathhouses.", coords: { x: 54, y: 55 } },
  "District 9": { region: "Orchard & Cairnhill", vibe: "Premier Haute Horlogerie & Fashion", desc: "World-renowned luxury retail boulevards, quiet hillside mansions, and private galleries.", coords: { x: 48, y: 59 } },
  "District 10": { region: "Tanglin, Ardmore & Bukit Timah", vibe: "Diplomatic Green Enclave", desc: "Consulate estates, ancient rain trees, and Michelin garden restaurants.", coords: { x: 43, y: 55 } },
  "District 11": { region: "Newton & Novena", vibe: "Medical Wellness & Transit Nexus", desc: "State-of-the-art biophilic health districts and quiet residential sanctuaries.", coords: { x: 49, y: 51 } },
  "District 12": { region: "Balestier & Toa Payoh", vibe: "Mid-Century Modern Tapestry", desc: "Curated heritage culinary lanes, quiet canal esplanades, and boutique residences.", coords: { x: 53, y: 47 } },
  "District 13": { region: "MacPherson & Potong Pasir", vibe: "Tranquil Riverine Oasis", desc: "Linear waterways, quiet cycling boulevards, and community pocket farms.", coords: { x: 58, y: 46 } },
  "District 14": { region: "Eunos & Geylang", vibe: "Peranakan Architecture & Soul", desc: "Ceramic tile façades, architectural restoration gems, and contemporary lofts.", coords: { x: 64, y: 53 } },
  "District 15": { region: "Katong & Marine Parade", vibe: "Coastal Heritage & Sea Breeze", desc: "Miles of coastal parks, artisanal bakeries, and breezy penthouse terraces.", coords: { x: 72, y: 62 } },
  "District 16": { region: "Bedok & Upper East Coast", vibe: "Laidback Coastal Green", desc: "Canopy cycleways, seaside bistros, and peaceful modern sanctuaries.", coords: { x: 78, y: 58 } },
  "District 17": { region: "Changi & Loyang", vibe: "Aviation Gateway & Coastal Retreat", desc: "Pristine maritime shores, quiet sailing clubs, and global terminal connectivity.", coords: { x: 88, y: 52 } },
  "District 18": { region: "Tampines & Pasir Ris", vibe: "Eco-Town of the Future", desc: "Regenerative urban forests, solar microgrids, and family activity hubs.", coords: { x: 83, y: 45 } },
  "District 19": { region: "Serangoon & Kovan", vibe: "Culinary Haven & Private Enclave", desc: "Rooftop dining observatories, tranquil low-density estates, and leafy lanes.", coords: { x: 62, y: 40 } },
  "District 20": { region: "Bishan & Ang Mo Kio", vibe: "Central Waterway Parklands", desc: "Meandering natural rivers, sky bridges, and vast botanical expanses.", coords: { x: 52, y: 39 } },
  "District 21": { region: "Upper Bukit Timah", vibe: "Primary Rainforest Foothills", desc: "Granite quarries transformed into eco-lakes and high-elevation residences.", coords: { x: 36, y: 48 } },
  "District 22": { region: "Jurong West & Boon Lay", vibe: "Advanced Manufacturing & Innovation", desc: "Autonomous transport testbeds and industrial innovation gardens.", coords: { x: 22, y: 58 } },
  "District 23": { region: "Hillview & Bukit Panjang", vibe: "Nature Reserve Escarpment", desc: "Elevated ridgelines, quiet morning mist, and panoramic forest outlooks.", coords: { x: 33, y: 42 } },
  "District 24": { region: "Lim Chu Kang & Kranji", vibe: "Agritech & Sustainable Sanctuaries", desc: "Organic hydroponic estates, regenerative wetlands, and low-density retreats.", coords: { x: 25, y: 30 } },
  "District 25": { region: "Woodlands & Causeway Gateway", vibe: "Northern Regional Metropolis", desc: "Cross-border transit hubs, coastal boardwalks, and tech innovation parks.", coords: { x: 42, y: 22 } },
  "District 26": { region: "Mandai & Upper Thomson", vibe: "Wildlife & Eco-Conservancy", desc: "Lakeside rainforest retreats, zero-light-pollution night skies, and silence.", coords: { x: 47, y: 32 } },
  "District 27": { region: "Yishun & Sembawang Hot Spring", vibe: "Geothermal Wellness Enclave", desc: "Natural mineral spring spas, maritime naval heritage, and serene waters.", coords: { x: 53, y: 25 } },
  "District 28": { region: "Seletar & Piccadilly Green", vibe: "Aero-Heritage & Rustic Estates", desc: "Colonial black-and-white bungalows, private aviation hangars, and green lawns.", coords: { x: 63, y: 33 } },
  "District 29": { region: "Punggol Northshore", vibe: "Smart Waterway Smart-City", desc: "Seafront smart homes, autonomous maritime shuttles, and island cycle loops.", coords: { x: 72, y: 34 } },
  "District 30": { region: "Coney Island Straits", vibe: "Off-Grid Eco-Preserve", desc: "Experimental solar architecture, marine biology labs, and untouched wilderness.", coords: { x: 79, y: 30 } },
};

// Curated Community Names, Taglines & Highlights
const COMMUNITY_META: Record<string, { luxuryName: string; tagline: string; concept: string; architect: string; highlights: string[] }> = {
  COM001: {
    luxuryName: "The Horizon Solaris Marina",
    tagline: "Regenerative waterfront sanctuaries overlooking the Marina channel",
    concept: "Cantilevered glass villas floating above a deep-water yacht marina with zero-carbon kinetic façades.",
    architect: "Kengo Kuma & Associates",
    highlights: ["Private 80ft yacht moorings", "Kinetic solar louvers", "Sub-aquatic wellness spa", "Biophilic sky gardens"],
  },
  COM002: {
    luxuryName: "The Horizon Obsidian Spire",
    tagline: "Monolithic volcanic stone architecture crowned by private observatory decks",
    concept: "Sculpted from matte obsidian stone and burnished bronze, offering 360-degree panoramic city views.",
    architect: "Studio David Adjaye",
    highlights: ["Volcanic thermal pool", "Private helipad access", "Triple-glazed acoustic glass", "Cellar with sommelier concierge"],
  },
  COM003: {
    luxuryName: "The Horizon Biophilic Canopy",
    tagline: "Living forest architecture where vertical rainforests filter the city air",
    concept: "Over 350 native plant species integrated into cascading residential sky terraces and hanging gardens.",
    architect: "WOHA Architects",
    highlights: ["Vertical micro-climate control", "Canopy suspension bridges", "Hydroponic community greenhouse", "Regenerative water capture"],
  },
  COM004: {
    luxuryName: "The Horizon Cloud Pavilion",
    tagline: "Weightless structural steel and glass cantilevered over parklands",
    concept: "Airy, luminous spaces designed around shifting natural daylight and panoramic sky views.",
    architect: "SANAA / Kazuyo Sejima",
    highlights: ["Double-height 7m ceilings", "Frameless sliding glass envelopes", "Infinity sky deck", "Curated sculpture pavilion"],
  },
  COM005: {
    luxuryName: "The Horizon Terraces",
    tagline: "Tiered architectural sanctuaries with private plunge pools on every level",
    concept: "Cascading limestone terraces stepping down toward natural riverbanks, harmonizing indoor and outdoor.",
    architect: "Snøhetta",
    highlights: ["Private heated plunge pools", "Limestone firepits", "Outdoor culinary kitchens", "Direct river promenade access"],
  },
  COM006: {
    luxuryName: "The Horizon Aurum Enclave",
    tagline: "Warm champagne bronze finishes and handcrafted artisan woodwork",
    concept: "Subtle Japanese craftsmanship meets Scandinavian minimalism in an exclusive 40-residence sanctuary.",
    architect: "Tadao Ando Architect & Associates",
    highlights: ["Hand-poured smooth concrete", "Hinoki cedar onsen suites", "Private tea house in bamboo grove", "Underground supercar gallery"],
  },
  COM007: {
    luxuryName: "The Horizon Botanica Reserve",
    tagline: "Preserved heritage rain trees cradling modern architectural glass pavilions",
    concept: "A 12-acre private nature reserve where homes sit seamlessly among century-old heritage trees.",
    architect: "Foster + Partners",
    highlights: ["Private nature reserve", "Canopy bird-watching lounge", "Solar micro-grid storage", "Electric off-road fleet"],
  },
  COM008: {
    luxuryName: "The Horizon Zenith Tower",
    tagline: "Ultra-high elevation living with dedicated high-speed private sky elevators",
    concept: "Rising 64 stories above the city, offering unencumbered horizon views from dawn to sunset.",
    architect: "Zaha Hadid Architects",
    highlights: ["Fluid aerodynamic exterior", "Double-deck high-speed elevators", "Observatory cigar lounge", "Cryotherapy wellness lab"],
  },
  COM009: {
    luxuryName: "The Horizon Riverine Lofts",
    tagline: "Industrial elegance with soaring ceilings along tranquil canal pathways",
    concept: "Textured steel, warm reclaimed timber, and expansive artist studios opening onto water.",
    architect: "Herzog & de Meuron",
    highlights: ["Curated art gallery lobby", "Private kayak launch dock", "Acoustically isolated music studios", "Wood-fired bakery on ground floor"],
  },
  COM010: {
    luxuryName: "The Horizon Solarium Heights",
    tagline: "Passive solar architecture with automated circadian spectral illumination",
    concept: "Every residence is optimized for natural cross-ventilation and calibrated natural light cycles.",
    architect: "BIG - Bjarke Ingels Group",
    highlights: ["Smart sun-tracking louvers", "Zero-energy cooling system", "Rooftop star-gazing pod", "Biodynamic herb courtyards"],
  },
  COM011: {
    luxuryName: "The Horizon Coastal Ridge",
    tagline: "Elevated ocean cliff residences catching perpetual maritime cross-breezes",
    concept: "Perched above coastal ridgelines with tiered infinity pools reflecting the open sea.",
    architect: "Olson Kundig",
    highlights: ["Ocean horizon infinity edge", "Marine-grade bronze hardware", "Private beach access funicular", "Salt-water therapy lap pool"],
  },
  COM012: {
    luxuryName: "The Horizon Atrium Quarters",
    tagline: "Sculptural central lightwell channeling natural sunlight four storeys deep",
    concept: "An internal oasis courtyard that filters natural rainforest mist and birdsong into every room.",
    architect: "MVRDV",
    highlights: ["Four-storey indoor waterfall", "Acoustic zen garden", "Retractable glass skylight roof", "Wine library with rare vintages"],
  },
  COM013: {
    luxuryName: "The Horizon Mirador",
    tagline: "Panoramic viewing platforms that frame iconic city skylines",
    concept: "Geometric floating volumes projecting outwards to frame bespoke landscape vignettes.",
    architect: "Heatherwick Studio",
    highlights: ["Cantilevered glass sky-walk", "Private chef tasting room", "EV fast-charging in every bay", "Sub-zero smart parcel reception"],
  },
  COM014: {
    luxuryName: "The Horizon Sylvan Sanctuary",
    tagline: "A peaceful forest retreat crafted from charred yakisugi cedar and stone",
    concept: "Understated luxury grounded in natural textures, silence, and restorative landscape architecture.",
    architect: "Sou Fujimoto",
    highlights: ["Charred yakisugi timber screens", "Silent reading pavilions", "Forest meditation trails", "Geothermal underfloor cooling"],
  },
  COM015: {
    luxuryName: "The Horizon Equinox",
    tagline: "A perfectly balanced urban resort designed around wellness and longevity",
    concept: "Collaborative wellness architecture with integrated medical check-up pods and circadian lighting.",
    architect: "Gensler Luxury Group",
    highlights: ["Longevity medical lab", "Hyperbaric oxygen chambers", "Olympic length ozone pool", "Private nutrition kitchen"],
  },
  COM016: {
    luxuryName: "The Horizon Halcyon Bay",
    tagline: "Protected marine sanctuary homes with private shoreline boardwalks",
    concept: "Curved white architectural ribbons embracing the coastline and sunset reflections.",
    architect: "Jean Nouvel",
    highlights: ["Protected coral reef lagoon", "Paddleboard launch deck", "Seaside amphitheatre", "Private catamaran charter service"],
  },
  COM017: {
    luxuryName: "The Horizon Apex Suites",
    tagline: "Bespoke collector penthouses with private museum-grade display galleries",
    concept: "Tailored for art collectors, featuring temperature-controlled display walls and UV-filtered glass.",
    architect: "Renzo Piano Building Workshop",
    highlights: ["Museum-grade lighting systems", "High-capacity art hoist elevator", "Climate-controlled vault", "Sculpture sky court"],
  },
  COM018: {
    luxuryName: "The Horizon Vayu Courtyard",
    tagline: "Aerodynamic wind-funneling architecture providing perpetual natural cooling",
    concept: "Engineered using computational fluid dynamics to reduce air-conditioning need by 65%.",
    architect: "Buro Ole Scheeren",
    highlights: ["Wind-catchers on rooftops", "Natural bamboo breeze tunnels", "Fog-misting courtyards", "Zero-carbon communal kitchen"],
  },
  COM019: {
    luxuryName: "The Horizon Lumina Cascades",
    tagline: "Crystalline glass architecture illuminated by ambient evening fiber-optics",
    concept: "A shimmering landmark that shifts from soft champagne gold by day to ethereal amber at dusk.",
    architect: "Safdie Architects",
    highlights: ["Cascading water wall", "Interactive light art installation", "Rooftop champagne bar", "Private resident theatre"],
  },
  COM020: {
    luxuryName: "The Horizon Terra Firma",
    tagline: "Rammed-earth monolithic villas rooted in geological permanence",
    concept: "Crafted from locally sourced sedimentary soils and stone, achieving supreme thermal mass and organic beauty.",
    architect: "Peter Zumthor",
    highlights: ["400mm thick rammed-earth walls", "Thermal subterranean wine cellar", "Mineral spring bathhouse", "Star observatory terrace"],
  },
};

// Curate 100 Amenities across 6 categories
const AMENITY_CATEGORIES: AmenityCategory[] = ["Wellness", "Sports", "Family", "Business", "Leisure", "Community"];
const AMENITY_DESCRIPTIONS: string[] = [
  "Sub-aquatic hydrotherapy plunge pools with magnesium-infused mineral waters.",
  "Cryotherapy chambers calibrated to -110°C for rapid cellular recovery and longevity.",
  "25-meter cantilevered infinity lap pool floating over the forest canopy.",
  "Professional squash court with shock-absorbent hardwood flooring and stadium viewing.",
  "Biophilic co-working library with high-speed quantum fiber and acoustic focus pods.",
  "Private screening cinema with Dolby Atmos sound and Italian leather reclining lounges.",
  "Rooftop culinary pavilion equipped with wood-fired ovens and sommelier tasting stations.",
  "Montessori-inspired nature play laboratory with safe water features and sensory gardens.",
  "Private golf simulation studio with 4K laser projection of world-class championship courses.",
  "Soundproof podcast and multimedia production studio with broadcast-grade equipment.",
  "Herbal apothecary conservatory where residents harvest organic medicinal botanicals.",
  "Heated Himalayan salt stone sauna promoting respiratory detoxification and deep sleep.",
  "Dedicated supercar climate-controlled vault with detailing bay and charging nodes.",
  "Pet grooming spa and agility obstacle courtyard for canine companions.",
  "Outdoor amphitheatre hosting sunset chamber music and indie architectural screenings.",
  "Bespoke wine tasting cellar managed by resident master sommeliers.",
];

// Curate 40 Smart Features
const SMART_FEATURE_META: Array<{ title: string; category: SmartFeatureEnriched["category"]; desc: string; benefits: string[]; metric: string; icon: string }> = [
  {
    title: "Circadian Spectral Lighting",
    category: "Acoustics & Light",
    desc: "AI dynamically shifts indoor color temperature from 2200K amber morning glow to 5000K crisp daylight, optimizing melatonin and circadian health.",
    benefits: ["32% increase in deep REM sleep", "Reduced eye strain during screen work", "Automated sunset dimming"],
    metric: "99.4% CRI Index",
    icon: "SunMedium",
  },
  {
    title: "Sub-Millimeter Biometric Gateway",
    category: "Biometrics & Security",
    desc: "3D facial geometric recognition unlocks private elevators and residence doors in 0.18s without keycards or smartphone taps.",
    benefits: ["Zero-friction arrival flow", "Military-grade AES-256 local encryption", "Encrypted guest temporary keys"],
    metric: "0.18s Unlock Speed",
    icon: "ScanFace",
  },
  {
    title: "Geothermal Predictive Climate Matrix",
    category: "Climate & Air",
    desc: "Machine learning analyzes outdoor humidity, solar trajectory, and personal metabolic preferences to pre-cool living zones with zero drafts.",
    benefits: ["42% reduction in peak HVAC consumption", "Whisper-quiet <18dB sound profile", "Zone-by-zone microclimates"],
    metric: "42% Energy Saved",
    icon: "ThermometerSnowflake",
  },
  {
    title: "Autonomous Delivery Sky-Dock",
    category: "Autonomous Services",
    desc: "Rooftop drone and autonomous mobile robot docking receiving parcels and groceries, sanitized via UV-C and delivered to internal parcel lockers.",
    benefits: ["Contactless luxury deliveries", "Temperature-controlled chilled lockers", "Instant app delivery notifications"],
    metric: "100% UV-C Sanitized",
    icon: "Box",
  },
  {
    title: "Acoustic Anti-Noise Glazing",
    category: "Acoustics & Light",
    desc: "Triple-layered acoustic polyvinyl butyral (PVB) glass with destructive wave interference canceling urban traffic rumble completely.",
    benefits: ["Library-grade 24dB interior calm", "UV99.9% solar radiation rejection", "Structural seismic safety"],
    metric: "-48dB Noise Cut",
    icon: "VolumeX",
  },
  {
    title: "Kinetic Microgrid & Solid-State Battery",
    category: "Energy & Grid",
    desc: "On-site crystalline solar façades paired with ceramic solid-state battery banks supply 85% of communal energy autonomy.",
    benefits: ["Continuous backup power during outages", "Negative grid carbon footprint", "Lower resident maintenance levies"],
    metric: "85% Solar Autonomy",
    icon: "Zap",
  },
  {
    title: "Medical-Grade HEPA & Bio-Ionizer",
    category: "Climate & Air",
    desc: "Hospital-standard filtration cycles entire residence air volume every 14 minutes, eliminating 99.97% of airborne PM0.1 particles and viruses.",
    benefits: ["Pure mountain-quality indoor air", "Eliminates pollen and particulate smog", "Real-time volatile organic compound (VOC) monitoring"],
    metric: "99.97% PM0.1 Trapped",
    icon: "Wind",
  },
  {
    title: "Predictive Water Reclamation & Leak AI",
    category: "Energy & Grid",
    desc: "Micro-ultrasonic sensors detect microscopic pipe anomalies in 2 milliseconds, auto-diverting greywater to lush landscape irrigation.",
    benefits: ["Zero undetected water damage risks", "60% reduction in potable water waste", "Real-time water usage analytics"],
    metric: "2ms Anomaly Detection",
    icon: "Droplets",
  },
];

// Curate Lifestyle Categories and Names
const LIFESTYLE_TITLES: Record<LifestyleCategory, string[]> = {
  Wellness: ["Hydrotherapy Sky Bath", "Thermal Bio-Sauna", "Canopy Yoga Sanctuary", "Salt Crystal Sanctorum", "Cryo Healing Pavilion", "Sensory Floatarium"],
  Retail: ["Artisanal Concept Atelier", "Rare Vintage Gallery", "Curated Organic Providore", "Horology & Craft Salon", "Design Monograph Bookstore", "Boutique Fragrance Lab"],
  Entertainment: ["Private Holographic Cinema", "Audiophile Vinyl Salon", "Chamber Acoustics Amphitheatre", "Sky Observatory Deck", "Immersive VR Studio", "Sculpture Garden Lounge"],
  Dining: ["Michelin Omakase Pavilion", "Wood-Fired Hearth Courtyard", "Rooftop Botanical Tea House", "Artisan Bakery & Roastery", "Biodynamic Vineyard Cellar", "Private Chef Dining Room"],
  Nature: ["Canopy Rainforest Walkway", "Lush Fern Conservatory", "Fragrant Herb Courtyard", "Reflecting Water Garden", "Orchid Mist Atrium", "Ancient Rain Tree Reserve"],
  "Family Living": ["Montessori Forest Laboratory", "Junior Discovery Maker Space", "Splash Pebble Stream", "Stargazing Campsite Pods", "Interactive Storytelling Tree", "Family Cycling Trail"],
  Technology: ["Autonomous EV Transit Hub", "High-Altitude Drone Pad", "Quantum Fiber Co-Working", "Holographic Meeting Capsule", "Robotic Mixology Bar", "Digital Art Gallery"],
};

// Enriched Communities
export const communities: CommunityEnriched[] = rawData.communities.map((c, i) => {
  const meta = COMMUNITY_META[c.community_id] || {
    luxuryName: `Horizon Sanctuary ${i + 1}`,
    tagline: "Architectural elegance designed for generational serenity",
    concept: "Contemporary luxury residences engineered with biophilic finishes.",
    architect: "Foster + Partners",
    highlights: ["Infinity sky pool", "Private elevator foyer", "Smart home matrix", "Concierge valet"],
  };

  const smartScore = 92 + (i % 8);
  const sustainabilityScore = 90 + ((i * 3) % 10);

  return {
    ...c,
    name: meta.luxuryName,
    slug: meta.luxuryName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    tagline: meta.tagline,
    description: meta.concept,
    smartScore,
    sustainabilityScore,
    heroImage: ARCHITECTURAL_HERO_IMAGES[i % ARCHITECTURAL_HERO_IMAGES.length],
    galleryImages: [
      ARCHITECTURAL_HERO_IMAGES[(i + 1) % ARCHITECTURAL_HERO_IMAGES.length],
      INTERIOR_IMAGES[i % INTERIOR_IMAGES.length],
      INTERIOR_IMAGES[(i + 3) % INTERIOR_IMAGES.length],
    ],
    architect: meta.architect,
    unitsCount: 18 + (i % 7) * 4,
    energyRating: "BCA Green Mark Platinum Super Low Energy",
    highlights: meta.highlights,
  };
});

// Enriched Residences (120 residences from dataset)
const RESIDENCE_LAYOUT_TYPES = [
  "Garden Courtyard Villa",
  "The Sky Terrace Suite",
  "The Monolith Penthouse",
  "The Duplex Atrium",
  "The Horizon Grand Residence",
  "The Obsidian Loft",
  "The Panoramic Corner Suite",
  "The Waterfront Pavilion",
];

export const residences: ResidenceEnriched[] = rawData.residences.map((r, i) => {
  const typeIndex = i % RESIDENCE_LAYOUT_TYPES.length;
  const layout = RESIDENCE_LAYOUT_TYPES[typeIndex];
  const floor = 4 + (i % 45);
  const orientations = ["North-South Sea Facing", "East Horizon Sunrise", "West Marina Sunset", "Panoramic 270° Skyline"];
  const orientation = orientations[i % orientations.length];
  const sqft = r.area_sqft;
  const psf = Math.round(r.price_sgd / sqft);

  return {
    ...r,
    luxuryName: `${layout} ${String(floor).padStart(2, "0")}-${String((i % 6) + 1).padStart(2, "0")}`,
    collectionType: layout,
    floorLevel: `Level ${floor}`,
    orientation,
    image: INTERIOR_IMAGES[i % INTERIOR_IMAGES.length],
    floorplanUrl: `/floorplans/layout-${(i % 5) + 1}.svg`,
    pricePerSqft: psf,
    features: [
      `${r.bedrooms} En-Suite Bedrooms`,
      `${r.bathrooms} Marble Clad Bathrooms`,
      `${r.area_sqft} Sq.Ft. Living Canvas`,
      "Sub-Zero & Wolf Kitchen Suite",
      "Private High-Speed Lift Lobby",
      "Motorized Floor-to-Ceiling Glazing",
    ],
  };
});

// Enriched Districts (30 districts from dataset)
export const districts: DistrictEnriched[] = rawData.districts.map((d, i) => {
  const details = DISTRICT_DETAILS[d.name] || {
    region: `Metropolitan Sector ${i + 1}`,
    vibe: "Urban Innovation Enclave",
    desc: "Seamless connectivity, lush linear parks, and prime modern infrastructure.",
    coords: { x: 30 + (i % 6) * 10, y: 30 + Math.floor(i / 6) * 10 },
  };

  return {
    ...d,
    region: details.region,
    code: `D${String(i + 1).padStart(2, "0")}`,
    vibe: details.vibe,
    description: details.desc,
    image: ARCHITECTURAL_HERO_IMAGES[(i * 2) % ARCHITECTURAL_HERO_IMAGES.length],
    coordinates: details.coords,
    growthAverage: `${(4.2 + (i % 6) * 0.8).toFixed(1)}%`,
    transitScore: 94 + (i % 6),
    greeneryRatio: `${65 + (i % 25)}%`,
  };
});

// Enriched Amenities (100 amenities from dataset)
export const amenities: AmenityEnriched[] = rawData.amenities.map((a, i) => {
  const cat = AMENITY_CATEGORIES[i % AMENITY_CATEGORIES.length];
  const desc = AMENITY_DESCRIPTIONS[i % AMENITY_DESCRIPTIONS.length];
  const namesByCat: Record<AmenityCategory, string[]> = {
    Wellness: ["Thermal Hydrotherapy Pool", "Himalayan Salt Sauna", "Cryo Longevity Chamber", "Skyline Meditation Deck", "Aromatherapy Mist Grotto", "Private Massage Cabana"],
    Sports: ["Olympic Cantilevered Lap Pool", "High-Tech Golf Simulator", "Panoramic Squash Court", "Outdoor Padel Tennis Court", "Bouldering Wall", "Pilates Reformer Studio"],
    Family: ["Montessori Forest Nursery", "Pebble Splash Garden", "Stargazing Treehouse", "Interactive STEM Maker Lab", "Children's Reading Dome", "Family Barbecue Lawn"],
    Business: ["Executive Boardroom Suite", "Soundproof Podcast Studio", "Quantum Fiber Co-working", "Private Video Conference Pods", "Financial Terminal Lounge", "Courier Concierge Center"],
    Leisure: ["Dolby Atmos Cinema Lounge", "Bespoke Wine Cellar", "Artisan Coffee Roastery", "Rooftop Starlight Observatory", "Japanese Zen Garden", "Billiards & Cigar Salon"],
    Community: ["Organic Botanical Greenhouse", "Resident Herb Courtyard", "Sunset Culinary Pavilion", "Community Amphitheatre", "Pet Pampering Parlour", "Maker Workshop & Tool Library"],
  };
  const curatedNameList = namesByCat[cat];
  const curatedName = `${curatedNameList[i % curatedNameList.length]} ${Math.floor(i / curatedNameList.length) > 0 ? `#${Math.floor(i / curatedNameList.length) + 1}` : ""}`.trim();

  return {
    ...a,
    curatedName,
    category: cat,
    description: desc,
    iconName: cat === "Wellness" ? "Sparkles" : cat === "Sports" ? "Activity" : cat === "Family" ? "Users" : cat === "Business" ? "Briefcase" : cat === "Leisure" ? "GlassWater" : "HeartHandshake",
    image: ARCHITECTURAL_HERO_IMAGES[i % ARCHITECTURAL_HERO_IMAGES.length],
    perks: ["24/7 Resident Access", "App-Based VIP Booking", "Private Keycard Entry", "Certified Professional Staff"],
  };
});

// Enriched Schools (50 schools from dataset)
export const schools: SchoolEnriched[] = rawData.schools.map((s, i) => {
  const schoolTypes = ["International Baccalaureate World School", "Premier Autonomous High School", "Primary Science & Arts Academy", "British Curriculum College"];
  const curriculums = ["IB Diploma Programme", "Cambridge IGCSE & A-Levels", "Integrated Programme (IP)", "Advanced Placement (AP)"];

  return {
    ...s,
    curatedName: `Horizon Academy & Institute ${i + 1}`,
    type: schoolTypes[i % schoolTypes.length],
    curriculum: curriculums[i % curriculums.length],
    distanceKm: Number((0.4 + (i % 15) * 0.2).toFixed(1)),
  };
});

// Enriched Transport Hubs (50 transport connections from dataset)
export const transportConnections: TransportHubEnriched[] = rawData.transport_connections.map((t, i) => {
  const types: TransportHubEnriched["type"][] = ["MRT Metro", "High-Speed Rail", "Expressway Arterial", "Autonomous Shuttle"];
  const lineSets = [
    ["Circle Line", "Downtown Line"],
    ["North-South Arterial", "Thomson-East Coast Line"],
    ["Cross Island Fast Track", "East-West Trunk"],
    ["Autonomous Marina Transit Pod", "Coastal Ferry Link"],
  ];

  return {
    ...t,
    curatedName: `Station ${i + 1} • Transit Hub`,
    lines: lineSets[i % lineSets.length],
    distanceKm: Number((0.2 + (i % 10) * 0.15).toFixed(2)),
    type: types[i % types.length],
  };
});

// Enriched Lifestyle Zones (40 lifestyle zones from dataset)
const LIFESTYLE_CATS: LifestyleCategory[] = ["Wellness", "Retail", "Entertainment", "Dining", "Nature", "Family Living", "Technology"];

export const lifestyleZones: LifestyleZoneEnriched[] = rawData.lifestyle_zones.map((lz, i) => {
  const category = LIFESTYLE_CATS[i % LIFESTYLE_CATS.length];
  const titles = LIFESTYLE_TITLES[category];
  const curatedName = titles[i % titles.length] + (Math.floor(i / titles.length) > 0 ? ` Phase ${Math.floor(i / titles.length) + 1}` : "");

  return {
    ...lz,
    curatedName,
    category,
    tagline: `Immersive ${category.toLowerCase()} curated for discerning residents`,
    description: `A masterfully designed experiential zone elevating daily life through sensory architectural details, fine textures, and tranquil environments.`,
    image: LIFESTYLE_IMAGES[i % LIFESTYLE_IMAGES.length],
    curator: `Horizon Lifestyle Collective & Studio ${i + 1}`,
    hours: "06:00 — 23:00 Daily",
    tags: [category, "Curated Experience", "Horizon Exclusive", "Concierge Reserved"],
  };
});

// Enriched Smart Features (40 smart features from dataset)
export const smartFeatures: SmartFeatureEnriched[] = rawData.smart_features.map((sf, i) => {
  const metaIndex = i % SMART_FEATURE_META.length;
  const meta = SMART_FEATURE_META[metaIndex];

  return {
    ...sf,
    curatedName: `${meta.title} ${Math.floor(i / SMART_FEATURE_META.length) > 0 ? `V${Math.floor(i / SMART_FEATURE_META.length) + 1}` : ""}`.trim(),
    category: meta.category,
    description: meta.desc,
    benefits: meta.benefits,
    metric: meta.metric,
    icon: meta.icon,
  };
});

// Enriched Investment Insights (50 insights from dataset)
export const investmentInsights: InvestmentInsightEnriched[] = rawData.investment_insights.map((inv, i) => {
  const growthNum = parseFloat(inv.growth.replace("%", "")) || 5;
  const yieldPct = (3.6 + (growthNum * 0.25) + (i % 5) * 0.1).toFixed(2);
  const districtIndex = i % rawData.districts.length;
  const district = rawData.districts[districtIndex];
  const directions: InvestmentInsightEnriched["trendDirection"][] = ["accelerating", "stable", "prime-peak"];

  return {
    ...inv,
    growthNumeric: growthNum,
    rentalYield: `${yieldPct}%`,
    districtId: district.district_id,
    districtName: district.name,
    trendDirection: directions[i % directions.length],
    horizonOutlook: `Exceptional capital stability driven by low residential supply and surging prime international demand.`,
    fiveYearAppreciationEst: `+${(growthNum * 4.8 + 12).toFixed(1)}% Projected 5Y Gain`,
    capitalRecommendation: growthNum >= 7 ? "Tier-1 High Growth Alpha" : growthNum >= 5 ? "Defensive Generational Wealth" : "Yield-Maximizing Blue Chip",
  };
});

// Enriched Financing Programs (25 programs from dataset)
export const financingPrograms: FinancingProgramEnriched[] = rawData.financing_programs.map((f, i) => {
  const plans = [
    { name: "Horizon Green ESG Green Mortgages", rateType: "Fixed ESG Green Tier" as const, rate: 2.45, minDown: 20, rebate: 1.5 },
    { name: "Private Wealth Capital Flexibility Facility", rateType: "Private Wealth Bespoke" as const, rate: 2.75, minDown: 25, rebate: 2.0 },
    { name: "Generational Trust & Family Office Facility", rateType: "Floating Prime Benchmark" as const, rate: 2.85, minDown: 30, rebate: 2.5 },
  ];
  const chosen = plans[i % plans.length];

  return {
    ...f,
    planName: `${chosen.name} (${f.tenure_years}Y)`,
    rateType: chosen.rateType,
    baseRate: chosen.rate,
    minDownPaymentPct: chosen.minDown,
    rebatePercent: chosen.rebate,
    features: [
      `${f.tenure_years}-Year Amortization Tenure`,
      `Preferential ${chosen.rate}% p.a. Tier-1 Rate`,
      `Zero lock-in after 24 months`,
      `Free conversion to fixed rates after year 3`,
    ],
  };
});

// Enriched Viewing Events (150 events from dataset)
export const viewingEvents: ViewingEventEnriched[] = rawData.viewing_events.map((ve, i) => {
  const communityIndex = i % communities.length;
  const targetComm = communities[communityIndex];
  const formats: ViewingEventEnriched["format"][] = [
    "VIP Private Tour",
    "Sunset Architectural Salon",
    "VR Spatial Walkthrough",
    "Penthouse Champagne Preview",
  ];
  const hosts = [
    "Marcus Sterling – Private Client Director",
    "Celeste Lim – Senior Architectural Associate",
    "Alexander Wright – Managing Director",
    "Genevieve Tan – Heritage & Spatial Curator",
  ];

  const futureDay = 1 + (i % 30);
  const monthNames = ["Oct", "Nov", "Dec"];
  const month = monthNames[Math.floor(i / 50) % 3];
  const timeSlots = ["10:30 AM — 12:00 PM", "02:00 PM — 03:30 PM", "05:00 PM — 06:30 PM Sunset Slot", "07:30 PM — 09:00 PM Private Night View"];

  return {
    ...ve,
    communityId: targetComm.community_id,
    communityName: targetComm.name,
    dateStr: `${month} ${futureDay}, 2026`,
    timeSlot: timeSlots[i % timeSlots.length],
    format: formats[i % formats.length],
    host: hosts[i % hosts.length],
  };
});

// Enriched Project Comparisons (50 comparisons from dataset)
export const projectComparisons: ProjectComparisonEnriched[] = rawData.project_comparisons.map((cmp, i) => {
  const commA = communities.find((c) => c.community_id === cmp.project_a) || communities[0];
  const commB = communities.find((c) => c.community_id === cmp.project_b) || communities[1];

  return {
    ...cmp,
    headline: `${commA.name} vs ${commB.name}`,
    advantageA: `Superior waterfront panorama & ${commA.sustainabilityScore}% net-zero sustainability architecture.`,
    advantageB: `Denser lifestyle amenity integration with starting threshold of SGD $${(commB.starting_price_sgd / 1000000).toFixed(2)}M.`,
    recommendationThesis: `Select ${commA.name} for immediate coastal calm; choose ${commB.name} for high-transit urban vitality.`,
  };
});

// Enriched Customer Stories (100 customer stories from dataset)
const CUSTOMER_ROLES = [
  "Founder & Managing Partner, Quantum Ventures",
  "Principal Architect & Urbanist",
  "Chief Technology Officer, FinTech Unicorn",
  "Contemporary Art Collector & Philanthropist",
  "Biomedical Research Fellow",
  "Private Equity Managing Director",
  "International Symphony Conductor",
  "Clean Energy Industrialist",
];

const CUSTOMER_QUOTES = [
  "Moving into Horizon Living felt less like purchasing property and more like stepping 20 years into the future. The acoustic tranquility in the middle of the city is unmatched.",
  "The circadian spectral lighting and the pure air filtration system transformed my sleep quality from night one. It is rare to see architecture so deeply respectful of human biology.",
  "The private yacht mooring and the cantilevered infinity terrace have hosted the most unforgettable sunsets with our family. We wouldn't trade this for any penthouse worldwide.",
  "As an architect, I scrutinize every joint, reveal, and material interface. The execution here is museum-grade: honest materials, monolithic stone, and sublime proportions.",
  "The community culture is extraordinary. Our neighbors are innovators, collectors, and thinkers who genuinely care about sustainable generational living.",
  "The seamless biometric arrival where elevators know your routine without a single button touch exemplifies what luxury technology should be: effortless and invisible.",
];

export const customerStories: CustomerStoryEnriched[] = rawData.customer_stories.map((cs, i) => {
  const role = CUSTOMER_ROLES[i % CUSTOMER_ROLES.length];
  const quote = CUSTOMER_QUOTES[i % CUSTOMER_QUOTES.length];
  const targetComm = communities[i % communities.length];
  const targetResidence = residences[i % residences.length];

  return {
    ...cs,
    customerName: cs.customer,
    role,
    avatar: `https://images.unsplash.com/photo-${1534528741775 + (i % 20) * 100}-53994a69daeb?auto=format&fit=crop&w=400&q=80`,
    quote,
    communityPurchased: targetComm.name,
    residenceModel: targetResidence.luxuryName,
    yearPurchased: 2024 + (i % 3),
    lifestyleHighlight: targetComm.highlights[i % targetComm.highlights.length],
  };
});
