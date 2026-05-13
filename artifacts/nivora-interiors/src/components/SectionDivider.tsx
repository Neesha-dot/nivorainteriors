import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SectionDividerProps {
  className?: string;
  color?: string;
}

export function SectionDivider({ className = "", color = "#a18661" }: SectionDividerProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: "100%" } : { width: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ height: "1px", background: color }}
      />
    </div>
  );
}