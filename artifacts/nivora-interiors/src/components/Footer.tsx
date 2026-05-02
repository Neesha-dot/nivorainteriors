import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { Link } from "wouter";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#2C2C2C] text-[#F9F5F0] border-t-4 border-[#C4856A] pt-20 pb-8 w-full">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16 border-b border-white/10 pb-16">
          
          {/* Brand */}
          <div className="flex flex-col items-start md:items-start">
            <Link href="/" onClick={scrollToTop} className="font-serif text-3xl mb-4 text-white cursor-hover">
              Nivora Interiors
            </Link>
            <p className="font-sans text-white/60 text-sm italic">
              From Vision to Execution
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-start md:items-center">
            <nav className="flex flex-col gap-4 text-center md:text-left">
              {[
                { name: 'Home', href: '/' },
                { name: 'Portfolio', href: '/portfolio' },
                { name: 'Services', href: '/services' },
                { name: 'About', href: '/about' },
                { name: 'Contact', href: '/contact' }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={scrollToTop}
                  className="font-sans text-sm uppercase tracking-widest text-white/70 hover:text-[#C4856A] transition-colors cursor-hover"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start md:items-end text-left md:text-right">
            <div className="space-y-2 mb-6">
              <p className="font-sans text-white/70">nivorainteriors@gmail.com</p>
              <p className="font-sans text-white/70">+91 99999 99999</p>
              <p className="font-sans text-white/70">Ambernath, Maharashtra</p>
            </div>
            
            <div className="flex items-center gap-6">
              <a 
                href="https://instagram.com/nivorainteriors" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors cursor-hover"
              >
                <SiInstagram size={20} />
              </a>
              <a 
                href="https://wa.me/919999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#25D366] transition-colors cursor-hover"
              >
                <SiWhatsapp size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-sans text-xs text-white/40 uppercase tracking-wider">
          <p>© 2026 Nivora Interiors</p>
          <p>Website by VyuhX Technologies</p>
        </div>
      </div>
    </footer>
  );
}
