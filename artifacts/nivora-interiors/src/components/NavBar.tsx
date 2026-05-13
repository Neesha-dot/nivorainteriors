import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";

const LINKS = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function NavBar() {
  const [location] = useLocation();
  const isHomePage = location === "/";
  const [isScrolled, setIsScrolled] = useState(!isHomePage);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#21291a]/95 backdrop-blur-md border-b border-white/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="cursor-hover flex items-center">
          <img src="/logo.png" alt="Nivora Interiors" className="nav-logo" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => {
            const isActive = location === link.href;
            return (
            <Link
              key={link.name}
              href={link.href}
              className={`font-sans text-sm uppercase tracking-[0.15em] transition-colors relative cursor-hover ${
                isScrolled
                  ? "text-[#f5f2ed]/80 hover:text-[#a18661]"
                  : "text-white/80 hover:text-white"
              } ${isActive ? "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-[#a18661] after:transition-all" : ""}`}
            >
              {link.name}
            </Link>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 -mr-2 cursor-hover ${
            isScrolled ? "text-[#f5f2ed]" : "text-white"
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
            className="fixed inset-0 bg-[#21291a] z-50 flex flex-col pt-24 px-6 pb-6"
          >
            <button
              className="absolute top-6 right-6 p-2 text-[#f5f2ed] cursor-hover"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            <nav className="flex flex-col gap-8 mt-12 items-center">
              {LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-3xl text-[#f5f2ed] hover:text-[#a18661] transition-colors cursor-hover"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
