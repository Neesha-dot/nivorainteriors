import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { name: "Home", href: "#home" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F9F5F0]/90 backdrop-blur-md border-b border-[#2C2C2C]/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#home");
          }}
          className={`font-serif text-2xl tracking-wide ${
            isScrolled ? "text-[#2C2C2C]" : "text-white"
          }`}
        >
          Nivora Interiors
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className={`font-sans text-sm uppercase tracking-[0.15em] transition-colors ${
                isScrolled
                  ? "text-[#2C2C2C] hover:text-[#C4856A]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 -mr-2 ${
            isScrolled ? "text-[#2C2C2C]" : "text-white"
          }`}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#F9F5F0] z-50 flex flex-col pt-24 px-6 pb-6"
          >
            <button
              className="absolute top-6 right-6 p-2 text-[#2C2C2C]"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            <nav className="flex flex-col gap-8 mt-12 items-center">
              {LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="font-serif text-3xl text-[#2C2C2C] hover:text-[#C4856A] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
