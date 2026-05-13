import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{x: number, y: number, id: number}[]>([]);

  useEffect(() => {
    // Only render on non-touch devices
    const isTouch = !window.matchMedia('(pointer: fine)').matches;
    if (isTouch) return;

    document.body.style.cursor = 'none';

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      setTrail(prev => {
        const next = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
        return next.slice(-8);
      });

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      
      // Handle hover state
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('.cursor-hover') || target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a';
      
      if (ringRef.current) {
        if (isHoverable) {
          ringRef.current.classList.add('w-16', 'h-16', 'bg-[#a18661]/20', 'border-transparent');
          ringRef.current.classList.remove('w-10', 'h-10', 'border-[#a18661]');
        } else {
          ringRef.current.classList.remove('w-16', 'h-16', 'bg-[#a18661]/20', 'border-transparent');
          ringRef.current.classList.add('w-10', 'h-10', 'border-[#a18661]');
        }
      }
    };

    const render = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(requestRef.current);
      document.body.style.cursor = '';
    };
  }, []);

  if (!window.matchMedia('(pointer: fine)').matches) return null;

  return (
    <>
      {trail.map((point, index) => {
        const age = index / trail.length; // 0 = oldest, 1 = newest
        const opacity = age * 0.5;
        const size = 2 + age * 2; // 2px to 4px
        return (
          <div
            key={point.id}
            className="fixed top-0 left-0 rounded-full pointer-events-none"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: "#a18661",
              opacity,
              transform: `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)`,
              zIndex: 9997,
              transition: "opacity 0.6s ease",
            }}
          />
        );
      })}
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-[#21291a] rounded-full pointer-events-none z-[9999] transition-transform duration-75 ease-out"
        style={{ willChange: 'transform' }}
      />
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border-[1.5px] border-[#a18661] rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
