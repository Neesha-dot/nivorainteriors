import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "wouter";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HomeAboutSnippet() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (curtainRef.current) {
      const ctx = gsap.context(() => {
        gsap.to(curtainRef.current, {
          scaleX: 0,
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: curtainRef.current,
            start: "top 70%",
          }
        });
      });
      return () => ctx.revert();
    }
  }, []);

  return (
    <section className="py-24 md:py-32 bg-[#f5f2ed]" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden"
          >
            <div 
              ref={curtainRef}
              className="absolute inset-0 bg-[#a18661] z-10 origin-right"
            />
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
              alt="Nivora Interiors Studio"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#21291a] leading-tight mb-8">
              We design spaces that feel like you
            </h2>
            <p className="font-sans text-lg text-[#21291a]/70 leading-relaxed mb-8 max-w-lg">
              At Nivora Interiors, we believe your home should be a deeply personal narrative, not a showroom. We blend Indian warmth with European editorial refinement.
            </p>
            <Link href="/about" className="group flex items-center gap-2 text-[#a18661] font-sans font-medium uppercase tracking-wider text-sm cursor-hover">
              <span className="border-b border-[#a18661] pb-0.5 group-hover:border-transparent transition-colors">Read Our Story</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}