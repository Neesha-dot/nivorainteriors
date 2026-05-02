export interface Project {
  id: number;
  slug: string;
  title: string;
  style: string;
  location: string;
  year: string;
  spaceType: string;
  image: string;
  gallery: string[];
  description: string;
  concept: string;
  materials: string;
  colors: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export const ALL_PROJECTS: Project[] = [
  {
    id: 1, slug: "mehta-residence",
    title: "The Mehta Residence",
    style: "Modern", location: "Bandra, Mumbai", year: "2024", spaceType: "Full Home — 3BHK",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80"
    ],
    description: "A serene, uncluttered living space designed for a family of three who wanted a calm sanctuary in the heart of bustling Bandra. We stripped back unnecessary ornamentation, focusing on natural light and tactile materials. Every surface invites touch; every corner invites rest.",
    concept: "Warm Minimalism — natural textures layered with deliberate restraint.",
    materials: "Travertine, Oak Wood, Linen, Brushed Brass",
    colors: ["#E8E3DF", "#C4856A", "#8C837C", "#2C2C2C"],
    isNew: false, isFeatured: true
  },
  {
    id: 2, slug: "kapoor-family-home",
    title: "Kapoor Family Home",
    style: "Contemporary", location: "Pune", year: "2024", spaceType: "Full Home — 4BHK",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80"
    ],
    description: "Designed for a family of five, this full-home project balances elegance with everyday practicality. Custom joinery throughout ensures everything has its place, leaving the mind free. The brief was simple: a home that feels expensive but never fragile.",
    concept: "Relaxed Luxury — comfortable sophistication for real family living.",
    materials: "Bouclé, Walnut, Rattan, Limewash",
    colors: ["#DCD8D3", "#B5A89E", "#5A514B", "#252322"],
    isNew: false, isFeatured: true
  },
  {
    id: 3, slug: "sharma-suite",
    title: "The Sharma Suite",
    style: "Minimalist", location: "Thane", year: "2023", spaceType: "Master Bedroom",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
    ],
    description: "A masterclass in restraint. Every element was chosen for tactile quality and visual calm. Nothing shouts; everything whispers. The client asked for a room that felt like waking up in a five-star hotel — and staying there forever.",
    concept: "Refined Silence — where less becomes immeasurably more.",
    materials: "Quartzite, Fluted Glass, Matte Lacquer, Bronze",
    colors: ["#F2EFEA", "#4A5D54", "#D4AC82", "#1E1E1E"],
    isNew: true, isFeatured: true
  },
  {
    id: 4, slug: "verma-penthouse",
    title: "Verma Penthouse",
    style: "Eclectic", location: "Navi Mumbai", year: "2023", spaceType: "Penthouse — 5BHK",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=80"
    ],
    description: "A bold, collected interior for a client with a passionate love of art and travel. Each room tells a different story; the home as a whole tells theirs. The challenge was making eclecticism feel intentional, not accidental.",
    concept: "Curated Eclecticism — global influences rooted in Indian warmth.",
    materials: "Velvet, Aged Brass, Terracotta Tile, Dark Teak",
    colors: ["#8B4513", "#F5DEB3", "#2F4F4F", "#D2691E"],
    isNew: true, isFeatured: true
  },
  {
    id: 5, slug: "joshi-villa",
    title: "The Joshi Villa",
    style: "Traditional", location: "Ambernath", year: "2023", spaceType: "Full Villa",
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80"
    ],
    description: "Rooted in Indian design tradition, this villa celebrates craftsmanship. Carved wooden accents, hand-blocked textiles, and a Vastu-aligned floor plan create a home that feels both ancient and alive. A multi-generational project that honours the past.",
    concept: "Heritage Reimagined — traditional forms with modern comfort.",
    materials: "Teak, Marble, Hand-block Cotton, Brass Inlay",
    colors: ["#F5E6C8", "#8B2500", "#4A3728", "#D4A853"],
    isNew: false, isFeatured: false
  },
  {
    id: 6, slug: "arora-office",
    title: "Arora Office Interiors",
    style: "Modern", location: "Mumbai CBD", year: "2022", spaceType: "Commercial Office — 4500 sqft",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=1200&q=80"
    ],
    description: "A 4,500 sqft commercial office designed to inspire productivity and reflect the brand's forward-thinking culture. Open-plan zones, acoustic pods, and a statement reception area. A workspace people actually want to spend time in.",
    concept: "Purposeful Energy — spaces that work as hard as the people in them.",
    materials: "Polished Concrete, Glass, Perforated Steel, Engineered Timber",
    colors: ["#F0EEE9", "#3D3D3D", "#C4856A", "#A8B5A8"],
    isNew: false, isFeatured: false
  },
  {
    id: 7, slug: "singhania-apartment",
    title: "The Singhania Apartment",
    style: "Vastu-Inspired", location: "Worli, Mumbai", year: "2024", spaceType: "Full Home — 3BHK",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80"
    ],
    description: "Every element of this home was designed in harmony with Vastu Shastra — from entry orientation to the placement of the Pooja room and master bedroom. Serenity is not an afterthought here; it is the architecture.",
    concept: "Sacred Harmony — ancient principles guiding modern living.",
    materials: "Kota Stone, Copper Accents, Natural Linen, Sandalwood Teak",
    colors: ["#FFF8E7", "#C4956A", "#6B5344", "#2C2C2C"],
    isNew: true, isFeatured: false
  },
  {
    id: 8, slug: "patel-beach-house",
    title: "Patel Beach House",
    style: "Contemporary", location: "Alibaug", year: "2022", spaceType: "Weekend Home",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&q=80"
    ],
    description: "A breezy weekend home steps from the water in Alibaug. The brief: designed for entertaining, built for relaxation. Natural materials that age gracefully. Spaces that feel different on a Tuesday afternoon than they do at a Saturday sunset.",
    concept: "Coastal Contemporary — light, open, unhurried.",
    materials: "Ceramic, Jute, Linen Weave, Whitewash Stone",
    colors: ["#E8DDD0", "#7BA7BC", "#C4A882", "#2D3B2F"],
    isNew: false, isFeatured: false
  }
];

export const FEATURED_PROJECTS = ALL_PROJECTS.filter(p => p.isFeatured);
