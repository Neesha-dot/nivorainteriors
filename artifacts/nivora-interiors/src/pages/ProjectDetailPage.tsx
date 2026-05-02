import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { ALL_PROJECTS } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const project = ALL_PROJECTS.find(p => p.slug === params.slug);

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handlePrev = () => {
    if (!project) return;
    setCurrentIndex(prev => (prev - 1 + project.gallery.length) % project.gallery.length);
  };

  const handleNext = () => {
    if (!project) return;
    setCurrentIndex(prev => (prev + 1) % project.gallery.length);
  };

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F5F0]">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-[#2C2C2C] mb-4">Project Not Found</h1>
          <Link href="/portfolio" className="text-[#C4856A] uppercase tracking-widest text-sm hover:underline">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const relatedProjects = ALL_PROJECTS.filter(p => p.slug !== params.slug).slice(0, 3);
  const whatsappText = encodeURIComponent(`Hi! I love the ${project.title} style and would like to discuss a similar project. Can we book a consultation?`);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      className="flex flex-col w-full"
    >
      {/* Hero Image */}
      <div className="relative w-full h-[70vh]">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <Link href="/portfolio" className="absolute top-24 left-6 md:left-12 z-10 text-white font-sans text-xs uppercase tracking-widest hover:opacity-70 transition-opacity">
          ← Back to Portfolio
        </Link>
      </div>

      {/* Project Intro Bar */}
      <div className="bg-[#F9F5F0] py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
            <h1 className="font-serif text-4xl md:text-5xl text-[#2C2C2C]">{project.title}</h1>
            <div className="flex flex-col md:text-right gap-2">
              <div className="font-sans text-sm"><span className="text-[#2C2C2C]/50 uppercase tracking-widest mr-2">Location</span> {project.location}</div>
              <div className="font-sans text-sm"><span className="text-[#2C2C2C]/50 uppercase tracking-widest mr-2">Year</span> {project.year}</div>
              <div className="font-sans text-sm"><span className="text-[#2C2C2C]/50 uppercase tracking-widest mr-2">Style</span> {project.style}</div>
              <div className="font-sans text-sm"><span className="text-[#2C2C2C]/50 uppercase tracking-widest mr-2">Space Type</span> {project.spaceType}</div>
            </div>
          </div>
          <div className="w-full h-px bg-[#C4856A]/30" />
        </div>
      </div>

      {/* About this project */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <h2 className="font-serif text-2xl text-[#2C2C2C] mb-6">About This Project</h2>
              <p className="font-sans text-lg text-[#2C2C2C]/80 leading-relaxed">
                {project.description}
              </p>
            </div>
            <div className="bg-[#F9F5F0] p-8 space-y-8">
              <div>
                <h3 className="font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/50 mb-2">Design Concept</h3>
                <p className="font-serif text-lg text-[#2C2C2C]">{project.concept}</p>
              </div>
              <div>
                <h3 className="font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/50 mb-2">Materials Used</h3>
                <p className="font-sans text-[#2C2C2C]">{project.materials}</p>
              </div>
              <div>
                <h3 className="font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/50 mb-4">Colour Palette</h3>
                <div className="flex gap-4">
                  {project.colors.map((color, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border border-black/10" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="py-20 bg-[#F9F5F0]">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="font-serif text-3xl text-[#2C2C2C] mb-10 text-center">Project Gallery</h2>
          {project.gallery.length === 1 ? (
            <div className="w-full aspect-[16/9] overflow-hidden cursor-pointer" onClick={() => openLightbox(0)}>
              <img src={project.gallery[0]} alt="Gallery image" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.gallery.map((img, i) => (
                <div key={i} className="aspect-[4/3] overflow-hidden cursor-pointer group" onClick={() => openLightbox(i)}>
                  <img src={img} alt={`Gallery image ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/95 flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white" onClick={() => setIsOpen(false)}>
              <X size={32} />
            </button>
            {project.gallery.length > 1 && (
              <>
                <button className="absolute left-6 text-white/50 hover:text-white" onClick={(e) => { e.stopPropagation(); handlePrev(); }}>
                  <ChevronLeft size={48} />
                </button>
                <button className="absolute right-6 text-white/50 hover:text-white" onClick={(e) => { e.stopPropagation(); handleNext(); }}>
                  <ChevronRight size={48} />
                </button>
              </>
            )}
            <div className="max-w-5xl w-full p-4" onClick={(e) => e.stopPropagation()}>
              <img src={project.gallery[currentIndex]} alt="Lightbox" className="w-full max-h-[85vh] object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lead Banner */}
      <div className="bg-[#C4856A] py-24 w-full">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Love This Style?</h2>
          <p className="font-sans text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Let's create something this beautiful for your home. Book a free consultation and let's start your journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={`https://wa.me/919999999999?text=${whatsappText}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-[#2C2C2C] px-8 py-4 font-sans text-sm uppercase tracking-wider hover:bg-[#F9F5F0] transition-colors"
            >
              Book Free Consultation
            </a>
            <Link 
              href="/contact"
              className="border border-white text-white px-8 py-4 font-sans text-sm uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              Send Your Requirements
            </Link>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      {relatedProjects.length > 0 && (
        <div className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="font-serif text-3xl text-[#2C2C2C] mb-10 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map(p => (
                <Link key={p.id} href={`/projects/${p.slug}`} className="group block cursor-pointer">
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#2C2C2C] mb-1">{p.title}</h3>
                  <p className="font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/60">{p.location}</p>
                  <div className="mt-3 inline-block border border-[#C4856A] text-[#C4856A] text-[10px] uppercase tracking-wider px-2 py-1">
                    {p.style}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
