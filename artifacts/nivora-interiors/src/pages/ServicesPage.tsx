import { motion } from "framer-motion";
import { Services } from "@/components/Services";
import { ContactForm } from "@/components/ContactForm";

export function ServicesPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      className="flex flex-col w-full pt-24"
    >
      <div className="bg-[#F9F5F0] py-32 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-5xl md:text-6xl text-[#2C2C2C] mb-6">What We Do</h1>
          <p className="font-sans text-[#2C2C2C]/70 text-lg max-w-2xl mx-auto">Thoughtful design for every corner of your home.</p>
        </div>
      </div>
      <Services />
      <ContactForm />
    </motion.div>
  );
}