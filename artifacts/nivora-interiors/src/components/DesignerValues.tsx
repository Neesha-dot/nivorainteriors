import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useInView } from "react-intersection-observer";

const LEFT_COLUMN = [
  {
    title: "INTEGRITY IS EVERYTHING",
    body: "We conduct our work with the highest level of honesty and transparency. Every decision we make is guided by what is truly best for you and your space."
  },
  {
    title: "WE ARE TRUSTWORTHY",
    body: "Your home is your most personal space. We treat every project with complete confidentiality, care, and commitment — as if it were our own."
  }
];

const RIGHT_COLUMN = [
  {
    title: "WE PROVIDE VALUE AND QUALITY",
    body: "We believe great design should be accessible. We source the best materials within your budget and never compromise on quality or finish."
  },
  {
    title: "WE ARE LIFELONG LEARNERS",
    body: "Design is always evolving. We constantly update our knowledge of trends, materials, and techniques to bring you the freshest and most relevant design solutions."
  },
  {
    title: "THERE IS NO I IN TEAM",
    body: "Every project is a collaboration — between us, our vendors, contractors, and most importantly, you. Great spaces are built together."
  }
];

function AccordionItem({ title, body, isOpen, onToggle }: { title: string, body: string, isOpen: boolean, onToggle: () => void }) {
  return (
    <div className={`mb-4 transition-colors duration-300 ${isOpen ? 'bg-[#F5EFE8] border-l-2 border-[#C4856A]' : 'bg-[#F0ECE6]'}`}>
      <button 
        className="w-full px-6 py-5 flex items-center justify-between text-left cursor-hover"
        onClick={onToggle}
      >
        <span className="font-sans text-sm md:text-base font-medium tracking-wider uppercase text-[#2C2C2C]">{title}</span>
        {isOpen ? <Minus size={20} className="text-[#C4856A]" /> : <Plus size={20} className="text-[#2C2C2C]/50" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-[#2C2C2C]/70 font-sans leading-relaxed">
              {body}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DesignerValues() {
  const [openId, setOpenId] = useState<string | null>(null);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 md:py-32 bg-[#F9F5F0]" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-[#2C2C2C] mb-4">What It Means To Be A Designer.</h2>
          <p className="font-sans text-sm uppercase tracking-widest text-[#C4856A]">These Are The Values We Stand For:</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div>
            {LEFT_COLUMN.map((item, idx) => {
              const id = `left-${idx}`;
              return (
                <AccordionItem 
                  key={id} 
                  title={item.title} 
                  body={item.body} 
                  isOpen={openId === id} 
                  onToggle={() => setOpenId(openId === id ? null : id)} 
                />
              );
            })}
          </div>
          <div>
            {RIGHT_COLUMN.map((item, idx) => {
              const id = `right-${idx}`;
              return (
                <AccordionItem 
                  key={id} 
                  title={item.title} 
                  body={item.body} 
                  isOpen={openId === id} 
                  onToggle={() => setOpenId(openId === id ? null : id)} 
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}