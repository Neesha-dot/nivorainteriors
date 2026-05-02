import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const PROJECTS = [
  {
    id: 1,
    title: "The Kapoor Residence",
    location: "Bandra, Mumbai",
    style: "Modern Minimalist",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    isNew: false,
  },
  {
    id: 2,
    title: "Serenity Suite",
    location: "Juhu, Mumbai",
    style: "Contemporary",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
    isNew: false,
  },
  {
    id: 3,
    title: "The Mehta Kitchen",
    location: "Powai, Mumbai",
    style: "Modular Modern",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    isNew: true,
  },
  {
    id: 4,
    title: "Arora Home Office",
    location: "Pune",
    style: "Warm Eclectic",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    isNew: true,
  },
];

export function FeaturedProjects() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 md:py-32 bg-white" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-[#2C2C2C] mb-6">Selected Work</h2>
          <div className="w-16 h-px bg-[#C4856A]"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative aspect-[4/3] md:aspect-[3/4] overflow-hidden cursor-pointer"
              onClick={() => {
                const el = document.querySelector("#portfolio");
                if (el) {
                  const offset = el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top: offset, behavior: "smooth" });
                }
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {project.isNew && (
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-[#2C2C2C] text-xs uppercase tracking-widest px-3 py-1 font-sans">
                  New
                </div>
              )}

              <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <p className="text-white/80 font-sans text-sm uppercase tracking-wider mb-2">
                  {project.style} — {project.location}
                </p>
                <h3 className="text-white font-serif text-3xl">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center"
        >
          <a
            href="#portfolio"
            className="group flex items-center gap-2 text-[#C4856A] font-sans font-medium uppercase tracking-wider text-sm"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector("#portfolio");
              if (el) {
                const offset = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offset, behavior: "smooth" });
              }
            }}
          >
            <span className="border-b border-[#C4856A] pb-0.5 group-hover:border-transparent transition-colors">View All Projects</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
