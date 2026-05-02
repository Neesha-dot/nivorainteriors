import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";

const STYLE_FILTERS = ["All", "Modern", "Minimalist", "Traditional", "Contemporary", "Eclectic", "Vastu-Inspired"];

const ALL_PROJECTS = [
  {
    id: 1,
    title: "The Mehta Residence",
    style: "Modern",
    location: "Bandra, Mumbai",
    year: "2024",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80"
    ],
    description: "A serene, uncluttered living space focusing on natural light and tactile materials. We stripped back unnecessary ornamentation to create a calm sanctuary in the heart of bustling Bandra.",
    concept: "Warm Minimalism — natural textures layered with restraint.",
    materials: "Travertine, Oak Wood, Linen, Brushed Brass",
    colors: ["#E8E3DF", "#C4856A", "#8C837C", "#2C2C2C"]
  },
  {
    id: 2,
    title: "Kapoor Family Home",
    style: "Contemporary",
    location: "Pune",
    year: "2024",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80", "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80"],
    description: "Designed for a family of five, this full-home project balances elegance with everyday practicality. Custom joinery throughout ensures everything has its place.",
    concept: "Relaxed Luxury — comfortable sophistication for family living.",
    materials: "Bouclé, Walnut, Rattan, Limewash",
    colors: ["#DCD8D3", "#B5A89E", "#5A514B", "#252322"]
  },
  {
    id: 3,
    title: "The Sharma Suite",
    style: "Minimalist",
    location: "Thane",
    year: "2023",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80"],
    description: "A masterclass in restraint. Every element of this suite was chosen for its tactile quality and visual calm. Nothing shouts; everything whispers.",
    concept: "Refined Silence — where less becomes immeasurably more.",
    materials: "Quartzite, Fluted Glass, Matte Lacquer, Bronze",
    colors: ["#F2EFEA", "#4A5D54", "#D4AC82", "#1E1E1E"]
  },
  {
    id: 4,
    title: "Verma Penthouse",
    style: "Eclectic",
    location: "Navi Mumbai",
    year: "2023",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80", "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=80"],
    description: "A bold, collected interior for a client with a love of art and travel. Each room tells a different story; the home as a whole tells theirs.",
    concept: "Curated Eclecticism — global influences rooted in Indian warmth.",
    materials: "Velvet, Aged Brass, Terracotta Tile, Dark Teak",
    colors: ["#8B4513", "#F5DEB3", "#2F4F4F", "#D2691E"]
  },
  {
    id: 5,
    title: "The Joshi Villa",
    style: "Traditional",
    location: "Ambernath",
    year: "2023",
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&q=80"],
    description: "Rooted in Indian design tradition, this villa celebrates craftsmanship — carved wooden accents, hand-blocked textiles, and a Vastu-aligned floor plan.",
    concept: "Heritage Reimagined — traditional forms with modern comfort.",
    materials: "Teak, Marble, Hand-block Cotton, Brass Inlay",
    colors: ["#F5E6C8", "#8B2500", "#4A3728", "#D4A853"]
  },
  {
    id: 6,
    title: "Arora Office Interiors",
    style: "Modern",
    location: "Mumbai CBD",
    year: "2022",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80", "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=1200&q=80"],
    description: "A 4,500 sqft commercial office designed to inspire productivity and reflect the brand's forward-thinking culture. Open plan, acoustic pods, and a statement reception.",
    concept: "Purposeful Energy — spaces that work as hard as the people in them.",
    materials: "Polished Concrete, Glass, Perforated Steel, Engineered Timber",
    colors: ["#F0EEE9", "#3D3D3D", "#C4856A", "#A8B5A8"]
  },
  {
    id: 7,
    title: "The Iyer Sanctuary",
    style: "Vastu-Inspired",
    location: "Thane",
    year: "2024",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80"],
    description: "Every element of this home was designed in harmony with Vastu Shastra — from the entry orientation to the placement of the Pooja room and master bedroom.",
    concept: "Sacred Harmony — ancient principles guiding modern living.",
    materials: "Kota Stone, Copper Accents, Natural Linen, Sandalwood Teak",
    colors: ["#FFF8E7", "#C4956A", "#6B5344", "#2C2C2C"]
  },
  {
    id: 8,
    title: "Patel Family Nest",
    style: "Contemporary",
    location: "Nashik",
    year: "2022",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80"],
    description: "A warm, layered interior for a multi-generational family. The challenge was balancing the tastes of three generations — the result is timeless and deeply personal.",
    concept: "Multigenerational Warmth — one home, many stories.",
    materials: "Ceramic, Jute, Linen Weave, Antique Brass",
    colors: ["#E8DDD0", "#C4856A", "#7A6A5A", "#3A2E24"]
  }
];

export function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof ALL_PROJECTS[0] | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [, navigate] = useLocation();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredProjects = filter === "All" 
    ? ALL_PROJECTS 
    : ALL_PROJECTS.filter(p => p.style === filter);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setGalleryIndex((prev) => (prev + 1) % selectedProject.gallery.length);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setGalleryIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
    }
  };

  return (
    <>
      <section id="portfolio" className="pb-24 md:pb-32 bg-white" ref={ref}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center mb-16"
          >
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl">
              {STYLE_FILTERS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`font-sans text-sm uppercase tracking-widest transition-colors cursor-hover ${
                    filter === cat 
                      ? "text-[#C4856A] border-b border-[#C4856A]" 
                      : "text-[#2C2C2C]/50 hover:text-[#2C2C2C]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="group cursor-pointer w-full shrink-0 cursor-hover"
                  onClick={() => {
                    setSelectedProject(project);
                    setGalleryIndex(0);
                  }}
                >
                  <div className="aspect-[4/5] w-full overflow-hidden mb-6">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-serif text-3xl text-[#2C2C2C] mb-2">{project.title}</h3>
                  <p className="font-sans text-sm uppercase tracking-widest text-[#2C2C2C]/60">
                    {project.style} — {project.location}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-12 bg-[#2C2C2C]/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 30 }}
              className="bg-[#F9F5F0] w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 p-2 bg-white/50 backdrop-blur rounded-full text-[#2C2C2C] hover:bg-white transition-colors cursor-hover"
                onClick={() => setSelectedProject(null)}
              >
                <X size={20} />
              </button>

              {/* Gallery Side */}
              <div className="w-full md:w-3/5 relative aspect-square md:aspect-auto md:min-h-[60vh]">
                <img
                  src={selectedProject.gallery[galleryIndex]}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                
                {selectedProject.gallery.length > 1 && (
                  <div className="absolute inset-y-0 w-full flex items-center justify-between px-4 pointer-events-none">
                    <button onClick={handlePrevImage} className="pointer-events-auto p-2 bg-white/50 backdrop-blur rounded-full hover:bg-white text-[#2C2C2C] cursor-hover">
                      <ChevronLeft size={20} />
                    </button>
                    <button onClick={handleNextImage} className="pointer-events-auto p-2 bg-white/50 backdrop-blur rounded-full hover:bg-white text-[#2C2C2C] cursor-hover">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>

              {/* Info Side */}
              <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col">
                <h2 className="font-serif text-4xl text-[#2C2C2C] mb-3">{selectedProject.title}</h2>
                <div className="flex gap-2 items-center font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/60 mb-8">
                  <span>{selectedProject.location}</span>
                  <span>•</span>
                  <span>{selectedProject.year}</span>
                  <span>•</span>
                  <span className="text-[#C4856A]">{selectedProject.style}</span>
                </div>
                
                <div className="space-y-6 mb-8 flex-1">
                  <div>
                    <h4 className="font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/50 mb-2">Concept</h4>
                    <p className="font-serif text-lg text-[#2C2C2C]">{selectedProject.concept}</p>
                  </div>
                  <div>
                    <h4 className="font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/50 mb-2">Description</h4>
                    <p className="font-sans text-[#2C2C2C]/80 leading-relaxed text-sm">
                      {selectedProject.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/50 mb-2">Materials</h4>
                    <p className="font-sans text-sm text-[#2C2C2C]">{selectedProject.materials}</p>
                  </div>
                  <div>
                    <h4 className="font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/50 mb-3">Palette</h4>
                    <div className="flex gap-3">
                      {selectedProject.colors.map((color, i) => (
                        <div 
                          key={i} 
                          className="w-8 h-8 rounded-full border border-black/10 shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-[#2C2C2C]/10">
                  <p className="font-serif italic text-[#2C2C2C]/70 mb-4">Love this style? Let's create something similar.</p>
                  <button 
                    onClick={() => {
                      setSelectedProject(null);
                      navigate("/contact");
                    }}
                    className="w-full py-4 bg-[#C4856A] text-white font-sans text-sm uppercase tracking-wider hover:bg-[#b0745b] transition-colors cursor-hover"
                  >
                    Get a Quote
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
