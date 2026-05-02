import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Instagram } from "lucide-react";

const INSTAGRAM_POSTS = [
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80",
  "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=400&q=80",
  "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&q=80",
  "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80",
  "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&q=80",
];

export function InstagramFeed() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-[#F9F5F0]" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-[#2C2C2C] mb-2">Follow Our Journey</h2>
          <a 
            href="https://www.instagram.com/nivorainteriors" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-sans text-[#C4856A] uppercase tracking-widest text-sm hover:text-[#2C2C2C] transition-colors"
          >
            @nivorainteriors
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post, index) => (
            <motion.a
              key={index}
              href="https://www.instagram.com/nivorainteriors"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden bg-black/5"
            >
              <img
                src={post}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#2C2C2C]/0 group-hover:bg-[#2C2C2C]/40 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0" size={32} />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <a
            href="https://www.instagram.com/nivorainteriors"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-[#2C2C2C] font-sans font-medium uppercase tracking-wider text-sm hover:text-[#C4856A] transition-colors"
          >
            <span className="border-b border-transparent group-hover:border-[#C4856A] pb-0.5 transition-colors">See more on Instagram</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
