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
      <MarqueeStrip />
      <HomeAboutSnippet />
      <HomeHowWeWork />
      <StatsSection />
      <FeaturedProjects limit={3} showViewAll />
      <MarqueeStrip />
      <Services homePreview />
      <Testimonials />
      <InstagramFeed />
      <ContactForm />
    </motion.div>
  );
}