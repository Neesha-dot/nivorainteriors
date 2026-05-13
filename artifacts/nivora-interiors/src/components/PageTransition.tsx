import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

export function PageTransition() {
  const [location] = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevLocation = useRef(location);

  useEffect(() => {
    if (!overlayRef.current) return;
    if (prevLocation.current === location) return;
    prevLocation.current = location;

    const overlay = overlayRef.current;
    // Flash in then out
    overlay.style.transition = "none";
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "all";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.transition = "opacity 0.45s ease";
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
      });
    });
  }, [location]);

  return (
    <div
      ref={overlayRef}
      id="page-transition-overlay"
      style={{
        position: "fixed",
        inset: 0,
        background: "#f5f2ed",
        zIndex: 99999,
        opacity: 0,
        pointerEvents: "none",
        transition: "opacity 0.45s ease",
      }}
    />
  );
}