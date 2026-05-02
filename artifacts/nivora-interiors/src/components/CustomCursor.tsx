import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only render on non-touch devices
    const isTouch = !window.matchMedia('(pointer: fine)').matches;
    if (isTouch) return;

    document.body.style.cursor = 'none';

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      
      // Handle hover state
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('.cursor-hover') || target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a';
      
      if (ringRef.current) {
        if (isHoverable) {
          ringRef.current.classList.add('w-16', 'h-16', 'bg-[#C4856A]/20', 'border-transparent');
          ringRef.current.classList.remove('w-10', 'h-10', 'border-[#C4856A]');
        } else {
          ringRef.current.classList.remove('w-16', 'h-16', 'bg-[#C4856A]/20', 'border-transparent');
          ringRef.current.classList.add('w-10', 'h-10', 'border-[#C4856A]');
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
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-[#2C2C2C] rounded-full pointer-events-none z-[9999] transition-transform duration-75 ease-out"
        style={{ willChange: 'transform' }}
      />
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border-[1.5px] border-[#C4856A] rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
