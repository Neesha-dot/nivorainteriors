import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function useScrambleText(target: string, trigger: boolean, duration = 1500) {
  const [display, setDisplay] = useState(target);
  const frame = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const plain = target.replace(/<br\s*\/?>|<[^>]+>/g, "\n"); // strip html tags for scramble

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      const scrambled = plain.split("").map((char, i) => {
        if (char === "\n" || char === " ") return char;
        const charRevealAt = i / plain.length;
        if (progress >= charRevealAt) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join("");

      setDisplay(scrambled);
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [trigger, target, duration]);

  return display;
}