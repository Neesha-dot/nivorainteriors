import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem("stickyCTADismissed");
    
    const handleScroll = () => {
      // Show after scrolling down a bit, hide if near bottom (footer)
      const scrolled = window.scrollY > 500;
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      
      if (!isDismissed && scrolled && !nearBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("stickyCTADismissed", "true");
  };

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[45] bg-[#2C2C2C] border-t border-white/10"
        >
          <div className="container mx-auto px-6 md:px-12 py-3 flex items-center justify-between gap-4">
            <p className="font-sans text-[#F9F5F0] text-sm uppercase tracking-widest hidden md:block">
              Let's design your space →
            </p>
            
            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <button
                onClick={scrollToContact}
                className="bg-[#F9F5F0] text-[#2C2C2C] px-6 py-2 text-xs font-sans uppercase tracking-wider hover:bg-[#C4856A] hover:text-white transition-colors"
              >
                Book Free Consultation
              </button>
              
              <button
                onClick={handleDismiss}
                className="p-1 text-white/50 hover:text-white transition-colors"
                aria-label="Dismiss"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
