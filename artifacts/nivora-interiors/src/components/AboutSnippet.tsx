import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function AboutSnippet() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="py-24 md:py-32 bg-[#F9F5F0]" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="aspect-[3/4] md:aspect-[4/5] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
              alt="Nivora Interiors Studio"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2C2C2C] leading-tight mb-8">
              We design spaces that feel like you
            </h2>
            <p className="font-sans text-lg text-[#2C2C2C]/70 leading-relaxed mb-8 max-w-lg">
              At Nivora Interiors, we believe your home should be a deeply personal narrative, not a showroom. We blend Indian warmth with European editorial refinement to create spaces that are considered, tactile, and unhurried. Let us craft a home where every detail is intentional and every room invites you to linger.
            </p>
            <a
              href="#about"
              className="group flex items-center gap-2 text-[#C4856A] font-sans font-medium uppercase tracking-wider text-sm"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector("#about");
                if (el) {
                  const offset = el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top: offset, behavior: "smooth" });
                }
              }}
            >
              <span className="border-b border-[#C4856A] pb-0.5 group-hover:border-transparent transition-colors">Read our story</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
