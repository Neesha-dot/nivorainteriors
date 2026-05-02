import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Router, Route, Switch, useLocation } from "wouter";

import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { PopupLeadForm } from "@/components/PopupLeadForm";
import { StickyCTA } from "@/components/StickyCTA";
import { IntroOverlay } from "@/components/IntroOverlay";
import { CustomCursor } from "@/components/CustomCursor";

import { HomePage } from "./pages/HomePage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { ServicesPage } from "./pages/ServicesPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ExitIntentPopup } from "./components/ExitIntentPopup";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location]);
  return null;
}

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
        <Router>
          <div className="min-h-screen bg-[#F9F5F0] text-[#2C2C2C] selection:bg-[#C4856A] selection:text-white font-sans relative">
            <ScrollToTop />
            <IntroOverlay onComplete={() => setIntroComplete(true)} />
            <CustomCursor />

            <AnnouncementBanner />
            <NavBar />

            <Switch>
              <Route path="/" component={() => <HomePage introComplete={introComplete} />} />
              <Route path="/portfolio" component={PortfolioPage} />
              <Route path="/projects/:slug" component={ProjectDetailPage} />
              <Route path="/services" component={ServicesPage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/contact" component={ContactPage} />
            </Switch>

            <Footer />

            <FloatingWhatsApp />
            <PopupLeadForm />
            <StickyCTA />
            <ExitIntentPopup />
          </div>
        </Router>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

