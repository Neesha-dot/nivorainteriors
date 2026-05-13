import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link, useLocation } from "wouter";
import { ALL_PROJECTS } from "@/data/projects";

const STYLE_FILTERS = ["All", "Modern", "Minimalist", "Traditional", "Contemporary", "Eclectic", "Vastu-Inspired"];

export function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [, navigate] = useLocation();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredProjects = filter === "All" 
    ? ALL_PROJECTS 
    : ALL_PROJECTS.filter(p => p.style === filter);

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
                  className="w-full shrink-0"
                >
                  <Link href={`/projects/${project.slug}`} className="group block cursor-pointer">
                    <div className="relative aspect-[4/5] w-full overflow-hidden mb-6">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#2C2C2C]/80 p-8 flex flex-col justify-end translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
                        <h3 className="text-white font-serif text-2xl mb-1">{project.title}</h3>
                        <p className="text-white/70 font-sans text-xs uppercase tracking-widest">
                          {project.location}
                        </p>
                      </div>
                      {project.isNew && (
                        <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-[#2C2C2C] text-xs uppercase tracking-widest px-3 py-1 font-sans">
                          New
                        </div>
                      )}
                    </div>
                    <h3 className="font-serif text-3xl text-[#2C2C2C] mb-2">{project.title}</h3>
                    <p className="font-sans text-sm uppercase tracking-widest text-[#2C2C2C]/60">
                      {project.style} — {project.location}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
