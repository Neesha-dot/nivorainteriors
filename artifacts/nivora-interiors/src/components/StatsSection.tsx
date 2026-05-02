import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const STATS = [
  { target: 50, label: "Projects Completed", suffix: "+" },
  { target: 7, label: "Years of Experience", suffix: "" },
  { target: 12, label: "Cities Served", suffix: "" },
  { target: 200, label: "Happy Clients", suffix: "+" },
];

export function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="bg-white py-20" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {STATS.map((stat, index) => (
            <StatCounter key={index} stat={stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCounter({ stat, inView }: { stat: typeof STATS[0], inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    const duration = 2000;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      
      // Easing out quart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeProgress * stat.target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(stat.target);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, stat.target]);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-8 h-0.5 bg-[#C4856A] mb-4"></div>
      <p className="font-serif text-6xl md:text-7xl text-[#2C2C2C] mb-2">
        {count}{stat.suffix}
      </p>
      <p className="font-sans text-xs md:text-sm uppercase tracking-wider text-[#C4856A]">
        {stat.label}
      </p>
    </div>
  );
}
