import { useState, useRef, useCallback } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50); // percentage
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] overflow-hidden cursor-col-resize select-none rounded-sm"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* After image (full width, behind) */}
      <img src={afterImage} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover" />

      {/* Before image (clipped to left side) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img src={beforeImage} alt={beforeLabel} className="absolute inset-0 w-full h-full object-cover" style={{ width: containerRef.current?.offsetWidth || "100%" }} />
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 text-white font-sans text-xs uppercase tracking-widest px-3 py-1">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 bg-black/50 text-white font-sans text-xs uppercase tracking-widest px-3 py-1">
        {afterLabel}
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/80"
        style={{ left: `${position}%` }}
      />

      {/* Gold drag handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#a18661] border-2 border-white flex items-center justify-center shadow-lg pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
          <path d="M5 8L2 5v6l3-3zm6 0l3 3V5l-3 3z"/>
        </svg>
      </div>
    </div>
  );
}