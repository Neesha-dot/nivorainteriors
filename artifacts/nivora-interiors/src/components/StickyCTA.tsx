import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const rawData = localStorage.getItem("nivoraCTADismissed");
    let isDismissed = false;

    if (rawData) {
      try {
        const data = JSON.parse(rawData);
        if (data.time && Date.now() - data.time < 30 * 60 * 1000) {
          isDismissed = true;
        } else {
          localStorage.removeItem("nivoraCTADismissed");
        }
      } catch (e) {
        localStorage.removeItem("nivoraCTADismissed");
      }
    }
    
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
    localStorage.setItem("nivoraCTADismissed", JSON.stringify({ time: Date.now() }));
  };

  const handleCTA = () => {
    window.open("https://wa.me/919999999999?text=Hi!%20I%20am%20ready%20to%20transform%20my%20space.%20Can%20we%20book%20a%20free%20consultation%3F", "_blank");
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
              Ready to transform your space? →
            </p>
            
            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <button
                onClick={handleCTA}
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
