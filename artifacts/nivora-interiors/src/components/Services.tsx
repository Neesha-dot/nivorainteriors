import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AnimatedHeading } from "./AnimatedHeading";

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

export function Services() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="services" className="py-24 md:py-32 bg-[#F9F5F0]" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <AnimatedHeading text="What We Do" className="font-serif text-4xl md:text-5xl text-[#2C2C2C]" />
        </motion.div>

        <div className="flex flex-col border-t border-[#2C2C2C]/10">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-[#2C2C2C]/10 hover:bg-white/50 transition-colors px-4 -mx-4 md:px-6 md:-mx-6 cursor-pointer cursor-hover"
              onClick={() => {
                const el = document.querySelector("#contact");
                if (el) {
                  const offset = el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top: offset, behavior: "smooth" });
                }
              }}
            >
              <div className="flex-1 mb-2 md:mb-0">
                <h3 className="font-serif text-2xl text-[#2C2C2C] group-hover:text-[#C4856A] transition-colors">{service.title}</h3>
              </div>
              <div className="flex-1 md:text-right pr-4 md:pr-12">
                <p className="font-sans text-[#2C2C2C]/60 text-sm md:text-base">{service.description}</p>
              </div>
              <div className="hidden md:block opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-[#C4856A] font-sans text-sm uppercase tracking-wider">
                Enquire →
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center text-[#2C2C2C]/50 italic font-serif mt-12"
        >
          Pricing starting from ₹2,50,000 or custom quote on request
        </motion.p>
      </div>
    </section>
  );
}
