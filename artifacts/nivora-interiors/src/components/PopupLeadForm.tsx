import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Required"),
  phone: z.string().min(10, "Required"),
  spaceType: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof schema>;

export function PopupLeadForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const hasShown = sessionStorage.getItem("nivoraPopupShown");
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("nivoraPopupShown", "true");
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, []);

  const onSubmit = async (data: FormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Popup form submitted:", data);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsOpen(false), 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#21291a]/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-[#f5f2ed] w-full max-w-md p-8 md:p-12 shadow-2xl z-10"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#21291a]/50 hover:text-[#21291a] transition-colors"
            >
              <X size={20} />
            </button>

            {isSuccess ? (
              <div className="text-center py-8">
                <h3 className="font-serif text-3xl text-[#21291a] mb-4">Thank You</h3>
                <p className="font-sans text-[#21291a]/70">We'll be in touch soon to schedule your consultation.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="font-serif text-3xl text-[#21291a] mb-2">Planning your dream home?</h2>
                  <p className="font-sans text-[#a18661] uppercase tracking-widest text-xs">Get a FREE 30-min Design Consultation</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <input 
                      {...register("name")}
                      placeholder="Your Name"
                      className="w-full border-b border-[#21291a]/20 py-2 bg-transparent focus:outline-none focus:border-[#a18661] transition-colors rounded-none"
                    />
                  </div>
                  <div>
                    <input 
                      {...register("phone")}
                      placeholder="Phone Number"
                      className="w-full border-b border-[#21291a]/20 py-2 bg-transparent focus:outline-none focus:border-[#a18661] transition-colors rounded-none"
                    />
                  </div>
                  <div>
                    <select 
                      {...register("spaceType")}
                      className="w-full border-b border-[#21291a]/20 py-2 bg-transparent focus:outline-none focus:border-[#a18661] transition-colors rounded-none appearance-none text-[#21291a]/80"
                    >
                      <option value="">Type of Space</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full py-4 bg-[#a18661] text-white font-sans text-sm uppercase tracking-wider hover:bg-[#21291a] transition-colors mt-4"
                  >
                    Book My Free Consultation
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
