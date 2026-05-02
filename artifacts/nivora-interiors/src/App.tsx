import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { AboutSnippet } from "@/components/AboutSnippet";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { InstagramFeed } from "@/components/InstagramFeed";
import { AboutSection } from "@/components/AboutSection";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { PopupLeadForm } from "@/components/PopupLeadForm";
import { StickyCTA } from "@/components/StickyCTA";
import { IntroOverlay } from "@/components/IntroOverlay";
import { CustomCursor } from "@/components/CustomCursor";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { StatsSection } from "@/components/StatsSection";

const queryClient = new QueryClient();

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-[#F9F5F0] text-[#2C2C2C] selection:bg-[#C4856A] selection:text-white font-sans relative">
          <IntroOverlay onComplete={() => setIntroComplete(true)} />
          <CustomCursor />
          
          <AnnouncementBanner />
          <NavBar />
          
          <main>
            <Hero introComplete={introComplete} />
            <MarqueeStrip />
            <AboutSnippet />
            <StatsSection />
            <FeaturedProjects />
            <Services />
            <MarqueeStrip />
            <Portfolio />
            <Testimonials />
            <InstagramFeed />
            <AboutSection />
            <ContactForm />
          </main>

          <Footer />

          <FloatingWhatsApp />
          <PopupLeadForm />
          <StickyCTA />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
