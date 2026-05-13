import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocation } from "wouter";

export function Hero({ introComplete = true }: { introComplete?: boolean }) {
  const [, navigate] = useLocation();

  const handleCTA = () => {
    window.open("https://wa.me/919999999999?text=Hi!%20I%20am%20interested%20in%20interior%20design%20services.%20Can%20we%20discuss%20my%20project%3F", "_blank");
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
          animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-sm md:text-base uppercase tracking-[0.2em] text-white/90 mb-6"
        >
          Interior Design Studio — Mumbai, India
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-white mb-12 text-center leading-[1.2] mx-auto"
          style={{ fontSize: "clamp(3.5rem, 5.5vw, 6rem)", maxWidth: "800px" }}
        >
          Spaces That Speak<br />Your Story
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={handleCTA}
            className="border border-white text-white px-8 py-4 uppercase tracking-wider text-sm font-sans hover:bg-white hover:text-[#21291a] transition-all duration-500 cursor-hover"
          >
            Book Free Consultation
          </button>
          <button 
            onClick={() => navigate("/portfolio")}
            className="text-white/70 text-sm font-sans hover:underline hover:text-white transition-colors cursor-pointer"
          >
            or Explore Our Work →
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
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
