import { motion } from "framer-motion";
import { Services } from "@/components/Services";
import { ContactForm } from "@/components/ContactForm";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

export function ServicesPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      className="flex flex-col w-full pt-24"
    >
      <div className="bg-[#f5f2ed] py-32 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-5xl md:text-6xl text-[#21291a] mb-6">What We Do</h1>
          <p className="font-sans text-[#21291a]/70 text-lg max-w-2xl mx-auto">Thoughtful design for every corner of your home.</p>
        </div>
      </div>
      <Services />

      {/* Before/After section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="text-center mb-12">
            <p className="font-sans text-xs uppercase tracking-widest text-[#a18661] mb-3">The Transformation</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#21291a] mb-4">From Empty to Extraordinary</h2>
            <p className="font-sans text-[#21291a]/60 max-w-xl mx-auto">Drag the slider to see the full scope of what Nivora Interiors can do for your space.</p>
          </div>
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=80"
            afterImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80"
            beforeLabel="Before"
            afterLabel="After Nivora"
          />
        </div>
      </section>

      <ContactForm />
    </motion.div>
  );
}