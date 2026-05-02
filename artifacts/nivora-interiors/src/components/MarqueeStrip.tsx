export function MarqueeStrip() {
  const text = "Nivora Interiors  ✦  Interior Design  ✦  Mumbai  ✦  Luxury Spaces  ✦  Your Vision  ✦  Our Craft  ✦  ";
  
  return (
    <div className="w-full py-5 bg-[#F0EBE3] border-y border-[#C4856A]/50 overflow-hidden flex whitespace-nowrap">
      <div className="animate-marquee inline-block font-serif text-[14px] md:text-[15px] tracking-[0.15em] text-[#C4856A]">
        {text}{text}{text}{text}
      </div>
      <div className="animate-marquee inline-block font-serif text-[14px] md:text-[15px] tracking-[0.15em] text-[#C4856A]" aria-hidden="true">
        {text}{text}{text}{text}
      </div>
    </div>
  );
}
