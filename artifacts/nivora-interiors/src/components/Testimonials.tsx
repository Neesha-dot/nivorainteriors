import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { AnimatedHeading } from "./AnimatedHeading";

const TESTIMONIALS = [
  {
    text: "Nivora transformed our Bandra apartment into something we never imagined possible. Every corner feels intentional.",
    author: "Priya Kapoor",
    project: "Full Home Design"
  },
  {
    text: "The attention to detail is extraordinary. Our modular kitchen is not just beautiful — it works perfectly for how we cook.",
    author: "Rajesh Mehta",
    project: "Kitchen Design"
  },
  {
    text: "They understood our brief from the first meeting. The Vastu-compliant design gave us peace of mind alongside stunning aesthetics.",
    author: "Anita Sharma",
    project: "Full Home Design"
  }
];

function TestimonialCard({ t, index, inView }: any) {
  const [tiltStyle, setTiltStyle] = useState({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((x - centerX) / centerX) * 4;
    const tiltY = -((y - centerY) / centerY) * 4;
    setTiltStyle({ transform: `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale(1.02)` });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="flex flex-col items-center text-center px-8 py-10 border border-[#2C2C2C]/10 hover:border-[#C4856A]/30 transition-colors duration-300 bg-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...tiltStyle, transition: "transform 0.3s ease-out" }}
    >
      <span className="font-serif text-6xl text-[#C4856A] opacity-40 leading-none mb-4">"</span>
      <p className="font-serif italic text-xl md:text-2xl text-[#2C2C2C] leading-relaxed mb-8 flex-1">
        {t.text}
      </p>
      <div>
        <p className="font-sans font-medium uppercase tracking-widest text-[#2C2C2C] text-sm mb-1">
          {t.author}
        </p>
        <p className="font-sans text-xs text-[#2C2C2C]/50 uppercase tracking-wider">
          {t.project}
        </p>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="py-24 md:py-32 bg-[#F9F5F0]" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <AnimatedHeading text="What Our Clients Say" className="font-serif text-4xl md:text-5xl text-[#2C2C2C]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <TestimonialCard key={index} t={t} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
