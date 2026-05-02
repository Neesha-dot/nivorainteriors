import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Link } from "wouter";
import { AnimatedHeading } from "./AnimatedHeading";
import { FEATURED_PROJECTS } from "@/data/projects";

function ProjectCard({ project, index, inView }: any) {
  const [tiltStyle, setTiltStyle] = useState({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)" });
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, background: "" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((x - centerX) / centerX) * 6;
    const tiltY = -((y - centerY) / centerY) * 6;
    setTiltStyle({ transform: `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale(1.02)` });
    setGlareStyle({
      opacity: 0.2,
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.8), transparent)`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)" });
    setGlareStyle({ opacity: 0, background: "" });
  };

  return (
    <Link href={`/projects/${project.slug}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className="group relative aspect-[4/3] md:aspect-[3/4] overflow-hidden cursor-pointer cursor-hover transition-transform duration-300"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
          style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
        />
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300" 
          style={glareStyle}
        />
        
        {project.isNew && (
          <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-sm text-[#2C2C2C] text-xs uppercase tracking-widest px-3 py-1 font-sans">
            New
          </div>
        )}

        <div className="absolute inset-0 bg-[#2C2C2C]/85 p-8 flex flex-col justify-end translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
          <p className="text-white/70 font-sans text-xs uppercase tracking-widest mb-2">
            {project.location} — {project.style}
          </p>
          <h3 className="text-white font-serif text-2xl">{project.title}</h3>
        </div>
      </motion.div>
    </Link>
  );
}

export function FeaturedProjects({ limit, showViewAll }: { limit?: number, showViewAll?: boolean }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const displayProjects = limit ? FEATURED_PROJECTS.slice(0, limit) : FEATURED_PROJECTS;

  return (
    <section className="py-24 md:py-32 bg-white" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col items-center mb-16 text-center">
          <AnimatedHeading text="Selected Work" className="font-serif text-4xl md:text-5xl text-[#2C2C2C] mb-3" />
          <p className="font-sans text-[#2C2C2C]/60 text-base mb-6">A glimpse into the spaces we have brought to life</p>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-16 h-px bg-[#C4856A] origin-center"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {displayProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} inView={inView} />
          ))}
        </div>

        {showViewAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center"
          >
            <Link
              href="/portfolio"
              className="group flex items-center gap-2 text-[#C4856A] font-sans font-medium uppercase tracking-wider text-sm cursor-hover"
            >
              <span className="border-b border-[#C4856A] pb-0.5 group-hover:border-transparent transition-colors">View All Projects</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
