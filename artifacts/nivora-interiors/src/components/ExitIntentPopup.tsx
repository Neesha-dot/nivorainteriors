import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLocation } from "wouter";

export function ExitIntentPopup() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (location !== "/") return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20) {
        triggerPopup();
      }
    };

    const triggerPopup = () => {
      const hasShown = sessionStorage.getItem("nivoraExitShown");
      if (!hasShown) {
        setIsOpen(true);
        sessionStorage.setItem("nivoraExitShown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [location]);

  const handleSubmit = () => {
    if (!phone || phone.length < 10) return;
    const text = encodeURIComponent(`Hi! I'd like a free moodboard for my home. My number is ${phone}`);
    window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
    setIsOpen(false);
  };

  const handleDismiss = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleDismiss}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-md p-10 rounded-sm shadow-2xl z-10 text-center"
          >
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 text-[#2C2C2C]/50 hover:text-[#2C2C2C] transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-[#C4856A] font-sans text-xs uppercase tracking-widest mb-3">Wait — Before You Go</div>
            <h2 className="font-serif text-2xl text-[#2C2C2C] mb-3">Let us show you what we can do with your space.</h2>
            <p className="font-sans text-[#2C2C2C]/70 text-sm mb-6">
              Get a free moodboard designed for your home — no commitment, just inspiration.
            </p>

            <div className="space-y-4">
              <input
                type="tel"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-[#2C2C2C]/20 py-3 px-4 font-sans text-[#2C2C2C] focus:outline-none focus:border-[#C4856A] transition-colors"
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-[#C4856A] text-white py-4 font-sans text-sm uppercase tracking-wider hover:bg-[#B3745A] transition-colors"
              >
                Send Me a Free Moodboard
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
