import { motion } from "framer-motion";
import { ContactForm } from "@/components/ContactForm";

export function ContactPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      className="flex flex-col w-full pt-24"
    >
      <div className="bg-[#F9F5F0] py-32 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-5xl md:text-6xl text-[#2C2C2C] mb-6">Let's Start Your Project</h1>
          <p className="font-sans text-[#2C2C2C]/70 text-lg max-w-2xl mx-auto">We'd love to hear about your dream space.</p>
        </div>
      </div>
      <ContactForm />
    </motion.div>
  );
}