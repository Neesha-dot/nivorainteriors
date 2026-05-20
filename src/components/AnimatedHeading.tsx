import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AnimatedHeading({ text, className }: { text: string, className?: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    if (containerRef.current) {
      const words = containerRef.current.querySelectorAll('.word');
      const ctx = gsap.context(() => {
        gsap.fromTo(
          words,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
            }
          }
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <h2 ref={containerRef} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span className="inline-block word">{word}</span>
        </span>
      ))}
    </h2>
  );
}
