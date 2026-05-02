import { motion } from "framer-motion";
import { AboutSnippet } from "@/components/AboutSnippet";
import { HowWeWork } from "@/components/HowWeWork";
import { DesignerValues } from "@/components/DesignerValues";
import { AboutSection } from "@/components/AboutSection";

export function AboutPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      className="flex flex-col w-full pt-24"
    >
      <AboutSnippet />
      <HowWeWork />
      <DesignerValues />
      <AboutSection />
    </motion.div>
  );
}