import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AnimatedHeading } from "./AnimatedHeading";
import { Link, useLocation } from "wouter";

const SERVICES = [
  {
    title: "Full Home Interior Design",
    description: "End-to-end design for 1BHK to 5BHK homes",
  },
  {
    title: "Modular Kitchen Design",
    description: "Functional, beautiful kitchens tailored to Indian cooking",
  },
  {
    title: "Bedroom Design",
    description: "Restful sanctuaries designed around you",
  },
  {
    title: "Living & Dining Design",
    description: "Spaces for gathering, entertaining, and everyday life",
  },
  {
    title: "Commercial / Office Interiors",
    description: "Productive, inspiring workspaces",
  },
  {
    title: "Vastu-Compliant Design",
    description: "Harmonious spaces rooted in Vastu principles",
  },
  {
    title: "3D Visualisation / Walkthrough",
    description: "See your space before it's built",
  },
  {
    title: "Renovation Consulting",
    description: "Expert guidance for your home transformation",
  },
];

export function Services({ homePreview = false }: { homePreview?: boolean }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [, navigate] = useLocation();

  const displayServices = homePreview ? SERVICES.slice(0, 4) : SERVICES;

  return (
    <section id="services" className="py-24 md:py-32 bg-[#f5f2ed]" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center md:text-left"
        >
          <AnimatedHeading text="What We Do" className="font-serif text-4xl md:text-5xl text-[#21291a]" />
        </motion.div>

        <div className="flex flex-col border-t border-[#21291a]/10">
          {displayServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-[#21291a]/10 hover:bg-white/50 transition-colors px-4 -mx-4 md:px-6 md:-mx-6 ${!homePreview ? "cursor-pointer cursor-hover" : ""}`}
              onClick={() => {
                if (!homePreview) {
                  navigate("/contact");
                }
              }}
            >
              <div className="flex-1 mb-2 md:mb-0">
                <h3 className="font-serif text-2xl text-[#21291a] group-hover:text-[#a18661] transition-colors">{service.title}</h3>
              </div>
              {!homePreview && (
                <>
                  <div className="flex-1 md:text-right pr-4 md:pr-12">
                    <p className="font-sans text-[#21291a]/60 text-sm md:text-base">{service.description}</p>
                  </div>
                  <div className="hidden md:block opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-[#a18661] font-sans text-sm uppercase tracking-wider">
                    Enquire →
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {homePreview ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center md:justify-start mt-12"
          >
            <Link
              href="/services"
              className="group flex items-center gap-2 text-[#a18661] font-sans font-medium uppercase tracking-wider text-sm cursor-hover"
            >
              <span className="border-b border-[#a18661] pb-0.5 group-hover:border-transparent transition-colors">See All Services</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center text-[#21291a]/50 italic font-serif mt-12"
          >
            Pricing starting from ₹2,50,000 or custom quote on request
          </motion.p>
        )}
      </div>
    </section>
  );
}
