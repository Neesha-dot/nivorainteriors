import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroOverlay({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const fullText = "Nivora Interiors";
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("nivoraIntroShown");
    if (hasShown) {
      setIsVisible(false);
      onComplete();
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsTypingComplete(true);
        }, 400);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [fullText, onComplete]);

  const handleAnimationComplete = () => {
    if (isTypingComplete) {
      sessionStorage.setItem("nivoraIntroShown", "true");
      setIsVisible(false);
      onComplete();
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isTypingComplete ? (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#f5f2ed] flex items-center justify-center"
        >
          <h1 className="font-serif text-4xl md:text-6xl text-[#21291a] tracking-wide">
            {text}
          </h1>
        </motion.div>
      ) : (
        <motion.div
          key="overlay"
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          onAnimationComplete={handleAnimationComplete}
          className="fixed inset-0 z-[100] bg-[#f5f2ed] flex items-center justify-center"
        >
          <h1 className="font-serif text-4xl md:text-6xl text-[#21291a] tracking-wide">
            {fullText}
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
