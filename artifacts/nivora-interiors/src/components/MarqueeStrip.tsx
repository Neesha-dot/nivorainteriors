export function MarqueeStrip() {
  const text = "Nivora Interiors  ✦  Interior Design  ✦  Mumbai  ✦  Luxury Spaces  ✦  Your Vision  ✦  Our Craft  ✦  ";
  
  return (
    <div className="w-full py-5 bg-[#21291a] border-y border-[#a18661]/50 overflow-hidden flex whitespace-nowrap">
      <div className="animate-marquee inline-block font-serif text-[14px] md:text-[15px] tracking-[0.15em] text-[#a18661]">
        {text}{text}{text}{text}
      </div>
      <div className="animate-marquee inline-block font-serif text-[14px] md:text-[15px] tracking-[0.15em] text-[#a18661]" aria-hidden="true">
        {text}{text}{text}{text}
      </div>
    </div>
  );
}
