import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem("announcementDismissed");
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("announcementDismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-[#C4856A] text-[#F9F5F0] text-sm py-2 px-4 relative flex items-center justify-center font-sans"
        >
          <p className="text-center tracking-wide">
            Now accepting new projects for 2026 — Book a Free Consultation Today
          </p>
          <button
            onClick={handleDismiss}
            className="absolute right-4 p-1 hover:bg-black/10 rounded transition-colors"
            aria-label="Dismiss announcement"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
