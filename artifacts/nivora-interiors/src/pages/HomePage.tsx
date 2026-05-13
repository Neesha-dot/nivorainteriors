import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { StatsSection } from "@/components/StatsSection";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { InstagramFeed } from "@/components/InstagramFeed";
import { ContactForm } from "@/components/ContactForm";
import { HomeAboutSnippet } from "@/components/HomeAboutSnippet";
import { HomeHowWeWork } from "@/components/HomeHowWeWork";

export function HomePage({ introComplete }: { introComplete: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      className="flex flex-col w-full"
    >
      <Hero introComplete={introComplete} />
      
      {/* Trust Bar */}
      <div className="bg-white py-4 border-b border-[#21291a]/10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-[#21291a]/10 text-center">
            <div className="font-sans text-[#21291a] uppercase tracking-wider text-xs md:text-sm">50+ Projects Completed</div>
            <div className="font-sans text-[#21291a] uppercase tracking-wider text-xs md:text-sm">7 Years Experience</div>
            <div className="font-sans text-[#21291a] uppercase tracking-wider text-xs md:text-sm">Mumbai's Trusted Studio</div>
            <div className="font-sans text-[#21291a] uppercase tracking-wider text-xs md:text-sm">Free First Consultation</div>
          </div>
        </div>
      </div>

      <MarqueeStrip />
      <HomeAboutSnippet />
      <FeaturedProjects limit={4} showViewAll />
      <MarqueeStrip />
      <Services homePreview />
      <HomeHowWeWork />
      <StatsSection />
      <Testimonials />
      <InstagramFeed />
      <ContactForm />
    </motion.div>
  );
}