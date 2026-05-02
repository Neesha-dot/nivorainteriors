import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const scrollToPortfolio = () => {
    const element = document.querySelector("#portfolio");
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=85")' }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center mt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-sm md:text-base uppercase tracking-[0.2em] text-white/90 mb-6"
        >
          Interior Design Studio — Mumbai, India
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-12 max-w-4xl leading-tight"
        >
          Spaces That Speak Your Story
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={scrollToPortfolio}
          className="border border-white text-white px-8 py-4 uppercase tracking-wider text-sm font-sans hover:bg-white hover:text-[#2C2C2C] transition-all duration-500"
        >
          Explore Our Work
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
