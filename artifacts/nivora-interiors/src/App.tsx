import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-[#F9F5F0] text-[#2C2C2C] selection:bg-[#C4856A] selection:text-white font-sans">
          <AnnouncementBanner />
          <NavBar />
          
          <main>
            <Hero />
            <AboutSnippet />
            <FeaturedProjects />
            <Services />
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

