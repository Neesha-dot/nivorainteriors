import { SiWhatsapp } from "react-icons/si";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919999999999?text=Hi!%20I'm%20interested%20in%20interior%20design%20services.%20Can%20we%20discuss%20my%20project%3F"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 md:bottom-8 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:scale-110 hover:-translate-y-1 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <SiWhatsapp size={32} />
    </a>
  );
}
