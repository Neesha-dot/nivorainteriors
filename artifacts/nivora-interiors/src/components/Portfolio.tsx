import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = ["All", "Living Room", "Bedroom", "Kitchen", "Office", "Full Home", "Commercial"];

const ALL_PROJECTS = [
  {
    id: 1,
    title: "The Kapoor Residence",
    category: "Living Room",
    style: "Modern Minimalist",
    location: "Bandra, Mumbai",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&q=80"
    ],
    description: "A serene, uncluttered living space focusing on natural light and tactile materials. We stripped back unnecessary ornamentation to create a calm sanctuary in the heart of bustling Bandra.",
    materials: "Travertine, Oak Wood, Linen, Brushed Brass",
    concept: "Warm Minimalism",
    colors: ["#E8E3DF", "#C4856A", "#8C837C", "#2C2C2C"]
  },
  {
    id: 2,
    title: "Serenity Suite",
    category: "Bedroom",
    style: "Contemporary",
    location: "Juhu, Mumbai",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80"],
    description: "Designed for deep rest, this master suite employs a soft, layered palette. Custom joinery ensures everything has its place, leaving the mind free to unwind.",
    materials: "Bouclé, Walnut, Rattan, Limewash",
    concept: "Tactile Sanctuary",
    colors: ["#DCD8D3", "#B5A89E", "#5A514B", "#252322"]
  },
  {
    id: 3,
    title: "The Mehta Kitchen",
    category: "Kitchen",
    style: "Modular Modern",
    location: "Powai, Mumbai",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80"],
    description: "A highly functional yet beautiful kitchen tailored to Indian cooking habits. Features include a heavy-duty concealed extraction system and seamless fluted glass cabinetry.",
    materials: "Quartzite, Fluted Glass, Matte Lacquer, Bronze",
    concept: "Hidden Functionality",
    colors: ["#F2EFEA", "#4A5D54", "#D4AC82", "#1E1E1E"]
  },
  {
    id: 4,
    title: "Arora Home Office",
    category: "Office",
    style: "Warm Eclectic",
    location: "Pune",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"],
    description: "A space that inspires productivity without feeling corporate. Rich tones, a custom reading nook, and curated artwork make this office a joy to work from.",
    materials: "Teak, Leather, Wool, Antique Brass",
    concept: "Collected Professionalism",
    colors: ["#3D2B23", "#A67B5B", "#E3D7C8", "#111111"]
  },
  {
    id: 5,
    title: "Sharma Full Home",
    category: "Full Home",
    style: "Traditional Contemporary",
    location: "Thane",
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&q=80"],
    description: "Blending heirloom Indian furniture with clean, modern lines. The entire home flows seamlessly, rooted in Vastu principles while maintaining a fresh, airy feel.",
    materials: "Rosewood, Cane, Block-printed Cotton, Terrazzo",
    concept: "Modern Heritage",
    colors: ["#EFECE6", "#8F3B26", "#BFA78A", "#2C342C"]
  },
  {
    id: 6,
    title: "CaféLattice",
    category: "Commercial",
    style: "Industrial Chic",
    location: "Navi Mumbai",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80"],
    description: "A vibrant neighborhood café designed to transition from morning coffee runs to evening gatherings. Exposed ceilings paired with warm terracotta plaster.",
    materials: "Exposed Brick, Micro-cement, Steel, Ash Wood",
    concept: "Earthy Industrial",
    colors: ["#CC7D63", "#D1C9C1", "#686A65", "#181818"]
  },
  {
    id: 7,
    title: "The Joshi Bedroom",
    category: "Bedroom",
    style: "Serene Minimal",
    location: "Ambernath",
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=1200&q=80"],
    description: "A guest bedroom that feels like a boutique hotel stay. Soft lighting and bespoke textured wall finishes create an inviting atmosphere.",
    materials: "Tadelakt, Jute, Linen, Pale Oak",
    concept: "Soft Geometry",
    colors: ["#E6DED3", "#B6AD9F", "#D9A087", "#2D2A28"]
  },
  {
    id: 8,
    title: "Patel Living Room",
    category: "Living Room",
    style: "Eclectic Warm",
    location: "Nashik",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80"],
    description: "Designed for a family that loves to entertain. Features a dramatic central rug, ample seating, and a custom bar unit that blends seamlessly into the panelling.",
    materials: "Velvet, Dark Walnut, Antiqued Mirror, Brass",
    concept: "Elevated Entertaining",
    colors: ["#F5F2EB", "#C28C72", "#485E69", "#24201E"]
  }
];

export function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof ALL_PROJECTS[0] | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredProjects = filter === "All" 
    ? ALL_PROJECTS 
    : ALL_PROJECTS.filter(p => p.category === filter);

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
    <section id="portfolio" className="py-24 md:py-32 bg-white" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-[#2C2C2C] mb-8">Our Work</h2>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-3xl">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-sans text-sm uppercase tracking-widest transition-colors ${
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

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedProject(project);
                  setGalleryIndex(0);
                }}
              >
                <div className="aspect-[4/5] overflow-hidden mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-2xl text-[#2C2C2C] mb-1">{project.title}</h3>
                <p className="font-sans text-sm text-[#2C2C2C]/60">
                  {project.style} — {project.location}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-[#2C2C2C]/90 backdrop-blur-sm"
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
                className="absolute top-4 right-4 z-10 p-2 bg-white/50 backdrop-blur rounded-full text-[#2C2C2C] hover:bg-white transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <X size={20} />
              </button>

              {/* Gallery Side */}
              <div className="w-full md:w-3/5 relative aspect-square md:aspect-auto md:min-h-full">
                <img
                  src={selectedProject.gallery[galleryIndex]}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                
                {selectedProject.gallery.length > 1 && (
                  <div className="absolute inset-y-0 w-full flex items-center justify-between px-4">
                    <button onClick={handlePrevImage} className="p-2 bg-white/50 backdrop-blur rounded-full hover:bg-white text-[#2C2C2C]">
                      <ChevronLeft size={20} />
                    </button>
                    <button onClick={handleNextImage} className="p-2 bg-white/50 backdrop-blur rounded-full hover:bg-white text-[#2C2C2C]">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>

              {/* Info Side */}
              <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col">
                <p className="font-sans text-xs uppercase tracking-widest text-[#C4856A] mb-2">{selectedProject.category}</p>
                <h2 className="font-serif text-4xl text-[#2C2C2C] mb-2">{selectedProject.title}</h2>
                <p className="font-sans text-sm text-[#2C2C2C]/60 mb-8">{selectedProject.location}</p>
                
                <p className="font-sans text-[#2C2C2C]/80 leading-relaxed mb-8">
                  {selectedProject.description}
                </p>

                <div className="space-y-4 mb-8 flex-1">
                  <div>
                    <h4 className="font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/50 mb-1">Concept</h4>
                    <p className="font-serif text-lg text-[#2C2C2C]">{selectedProject.concept}</p>
                  </div>
                  <div>
                    <h4 className="font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/50 mb-1">Materials</h4>
                    <p className="font-sans text-sm text-[#2C2C2C]">{selectedProject.materials}</p>
                  </div>
                  <div>
                    <h4 className="font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/50 mb-2">Palette</h4>
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
                      const el = document.querySelector("#contact");
                      if (el) {
                        setTimeout(() => {
                          const offset = el.getBoundingClientRect().top + window.scrollY - 80;
                          window.scrollTo({ top: offset, behavior: "smooth" });
                        }, 300);
                      }
                    }}
                    className="w-full py-4 bg-[#C4856A] text-white font-sans text-sm uppercase tracking-wider hover:bg-[#b0745b] transition-colors"
                  >
                    Get a Quote
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
