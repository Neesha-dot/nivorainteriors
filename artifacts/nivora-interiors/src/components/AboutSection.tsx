import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedHeading } from "./AnimatedHeading";

export function AboutSection() {
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
    <section id="about" className="py-24 md:py-32 bg-[#f5f2ed]" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative aspect-[3/4] overflow-hidden"
          >
            <div 
              ref={curtainRef}
              className="absolute inset-0 bg-[#a18661] z-10 origin-right"
            />
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80"
              alt="Kavya Nair, Principal Designer"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-[#21291a] mb-4">
              Kavya Nair, Principal Designer
            </h2>
            
            <p className="font-sans text-sm uppercase tracking-widest text-[#a18661] mb-8">
              Based in Mumbai | Working across India
            </p>
            
            <p className="font-sans text-[#21291a]/80 leading-relaxed mb-10 max-w-lg">
              "Great design shouldn't feel like a museum. It should feel like an exhale—the moment you walk through your front door and know you are entirely, unmistakably home."
            </p>

            <ul className="space-y-6">
              {[
                "8+ years of experience across residential and commercial spaces",
                "Clients across Mumbai, Pune, Thane, Navi Mumbai and beyond",
                "Vastu-conscious design approach, rooted in Indian living",
                "Committed to timelines, transparent pricing, and complete care"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#a18661] shrink-0" />
                  <span className="font-sans text-[#21291a]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
