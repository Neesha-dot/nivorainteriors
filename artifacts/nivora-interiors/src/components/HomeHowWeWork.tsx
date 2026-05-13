import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "wouter";

export function HomeHowWeWork() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 text-[#21291a] opacity-[0.03] font-serif text-[200px] md:text-[300px] leading-none pointer-events-none select-none">
        01
      </div>
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-[#21291a] mb-6">How We Work</h2>
          <div className="w-16 h-px bg-[#a18661]"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-start"
          >
            <p className="font-sans text-sm uppercase tracking-widest text-[#a18661] mb-4">Step 01</p>
            <h3 className="font-serif text-3xl md:text-4xl text-[#21291a] mb-6">Understanding Your Vision</h3>
            <p className="font-sans text-[#21291a]/70 leading-relaxed mb-8">
              Every project begins with listening. We take time to understand your lifestyle, preferences, and the way you use your space. This ensures the design direction feels truly yours.
            </p>
            <Link href="/about" className="group flex items-center gap-2 text-[#a18661] font-sans font-medium uppercase tracking-wider text-sm cursor-hover">
              <span className="border-b border-[#a18661] pb-0.5 group-hover:border-transparent transition-colors">See Our Full Process</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="aspect-[4/3] overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" 
              alt="Understanding Your Vision" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}