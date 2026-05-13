import { motion } from "framer-motion";
import { ContactForm } from "@/components/ContactForm";
import { Phone, Mail, MapPin } from "lucide-react";

export function ContactPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      className="flex flex-col w-full pt-24 bg-[#f5f2ed]"
    >
      <div className="py-32 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-5xl md:text-6xl text-[#21291a] mb-6">Let's Start Your Project</h1>
          <p className="font-sans text-[#21291a]/70 text-lg max-w-2xl mx-auto">We'd love to hear about your dream space.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-32">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Left Column: Form */}
          <div className="w-full lg:w-7/12 bg-white rounded shadow-sm overflow-hidden">
            <div className="[&>section]:py-10 [&>section]:bg-white [&_#contact]:max-w-full">
              <ContactForm />
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="w-full lg:w-5/12 flex flex-col">
            <div className="bg-white p-10 rounded shadow-sm border border-[#21291a]/5 mb-8">
              <h2 className="font-serif text-3xl text-[#21291a] mb-2">Nivora Interiors</h2>
              <p className="font-serif italic text-[#a18661] mb-8">From Vision to Execution</p>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 text-[#21291a]/80 font-sans">
                  <Phone className="text-[#a18661]" size={20} />
                  <span>+91 99999 99999</span>
                </div>
                <div className="flex items-center gap-4 text-[#21291a]/80 font-sans">
                  <Mail className="text-[#a18661]" size={20} />
                  <span>hello@nivorainteriors.com</span>
                </div>
                <div className="flex items-start gap-4 text-[#21291a]/80 font-sans">
                  <MapPin className="text-[#a18661] mt-1 shrink-0" size={20} />
                  <span>Suite 405, The Design Hub,<br/>Bandra West, Mumbai 400050</span>
                </div>
              </div>

              <a 
                href="https://wa.me/919999999999?text=Hi!%20I%20am%20interested%20in%20interior%20design%20services.%20Can%20we%20discuss%20my%20project%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center gap-2 border border-[#a18661] text-[#a18661] py-4 uppercase tracking-wider text-sm font-sans hover:bg-[#a18661] hover:text-white transition-colors"
              >
                Chat on WhatsApp →
              </a>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded p-6 border border-[#21291a]/10 flex flex-col justify-center items-center text-center">
                <div className="font-sans font-medium text-[#21291a] mb-1">Free Initial Consultation</div>
                <div className="font-sans text-xs text-[#21291a]/60">No charges for the first meeting</div>
              </div>
              <div className="bg-white rounded p-6 border border-[#21291a]/10 flex flex-col justify-center items-center text-center">
                <div className="font-sans font-medium text-[#21291a] mb-1">24-Hour Response</div>
                <div className="font-sans text-xs text-[#21291a]/60">We reply to all enquiries within a day</div>
              </div>
              <div className="bg-white rounded p-6 border border-[#21291a]/10 flex flex-col justify-center items-center text-center">
                <div className="font-sans font-medium text-[#21291a] mb-1">Serving All of Mumbai</div>
                <div className="font-sans text-xs text-[#21291a]/60">We travel to your location</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}