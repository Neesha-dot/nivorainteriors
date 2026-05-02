import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AnimatedHeading } from "./AnimatedHeading";

const STEPS = [
  {
    number: "01",
    title: "Understanding Your Vision",
    body: "Every project begins with listening. We take time to understand your lifestyle, preferences, and the way you use your space. This ensures the design direction feels truly yours.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
  },
  {
    number: "02",
    title: "Design & Planning",
    body: "We translate your vision into detailed design concepts — mood boards, 3D visualisations, material selections, and floor plans — so you can see your space before a single nail is hammered.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
  },
  {
    number: "03",
    title: "Execution & Supervision",
    body: "Our team supervises every stage of implementation — from civil work to final styling — ensuring the finished space matches the design exactly.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
  },
  {
    number: "04",
    title: "Handover & Styling",
    body: "We do a final walkthrough with you, style the space with decor, and hand over a home that is move-in ready and exactly as you imagined.",
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80"
  }
];

function Step({ step, index }: { step: any, index: number }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const isEven = index % 2 === 0;

  return (
    <div className="relative py-20 md:py-28 overflow-hidden border-b border-[#2C2C2C]/10 last:border-b-0" ref={ref}>
      <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? 'right-0' : 'left-0'} text-[#2C2C2C] opacity-[0.05] font-serif text-[180px] md:text-[240px] leading-none pointer-events-none select-none`}>
        {step.number}
      </div>
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col items-start ${!isEven ? 'md:order-last' : ''}`}
          >
            <p className="font-sans text-sm uppercase tracking-widest text-[#C4856A] mb-4">Step {step.number}</p>
            <h3 className="font-serif text-3xl md:text-4xl text-[#2C2C2C] mb-6">{step.title}</h3>
            <p className="font-sans text-[#2C2C2C]/70 leading-relaxed">
              {step.body}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="aspect-[4/3] overflow-hidden"
          >
            <img 
              src={step.image} 
              alt={step.title} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function HowWeWork() {
  return (
    <section className="bg-white">
      <div className="pt-24 md:pt-32 pb-12 flex flex-col items-center text-center container mx-auto px-6">
        <AnimatedHeading text="How We Work" className="font-serif text-4xl md:text-5xl text-[#2C2C2C] mb-6" />
        <div className="w-16 h-px bg-[#C4856A]"></div>
      </div>
      
      <div>
        {STEPS.map((step, index) => (
          <Step key={step.number} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}