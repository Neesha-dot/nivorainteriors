import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SiWhatsapp } from "react-icons/si";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  city: z.string().min(2, "City is required"),
  spaceType: z.string().min(1, "Please select a space type"),
  description: z.string().optional(),
  callbackTime: z.string().min(1, "Please select a preferred callback time"),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-[#2C2C2C] mb-6">Let's Start Your Project</h2>
          <div className="w-16 h-px bg-[#C4856A] mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {isSuccess ? (
            <div className="bg-[#F9F5F0] p-12 text-center border border-[#C4856A]/20">
              <h3 className="font-serif text-3xl text-[#2C2C2C] mb-4">Thank you for reaching out</h3>
              <p className="font-sans text-[#2C2C2C]/70">We have received your enquiry and will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/70">Full Name *</label>
                  <input 
                    {...register("fullName")}
                    className="w-full border-b border-[#2C2C2C]/20 py-2 bg-transparent focus:outline-none focus:border-[#C4856A] transition-colors rounded-none"
                    placeholder="Jane Doe"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/70">Phone Number *</label>
                  <input 
                    {...register("phone")}
                    type="tel"
                    className="w-full border-b border-[#2C2C2C]/20 py-2 bg-transparent focus:outline-none focus:border-[#C4856A] transition-colors rounded-none"
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/70">Email Address *</label>
                  <input 
                    {...register("email")}
                    type="email"
                    className="w-full border-b border-[#2C2C2C]/20 py-2 bg-transparent focus:outline-none focus:border-[#C4856A] transition-colors rounded-none"
                    placeholder="jane@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/70">City *</label>
                  <input 
                    {...register("city")}
                    className="w-full border-b border-[#2C2C2C]/20 py-2 bg-transparent focus:outline-none focus:border-[#C4856A] transition-colors rounded-none"
                    placeholder="Mumbai"
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/70">Type of Space *</label>
                  <select 
                    {...register("spaceType")}
                    className="w-full border-b border-[#2C2C2C]/20 py-2 bg-transparent focus:outline-none focus:border-[#C4856A] transition-colors rounded-none appearance-none"
                  >
                    <option value="">Select a space type</option>
                    <option value="Living Room">Living Room</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Office">Office</option>
                    <option value="Full Home">Full Home</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Pooja Room">Pooja Room</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.spaceType && <p className="text-red-500 text-xs mt-1">{errors.spaceType.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/70">Preferred Callback Time *</label>
                  <select 
                    {...register("callbackTime")}
                    className="w-full border-b border-[#2C2C2C]/20 py-2 bg-transparent focus:outline-none focus:border-[#C4856A] transition-colors rounded-none appearance-none"
                  >
                    <option value="">Select a time</option>
                    <option value="Morning">Morning (9AM – 12PM)</option>
                    <option value="Afternoon">Afternoon (12PM – 4PM)</option>
                    <option value="Evening">Evening (4PM – 8PM)</option>
                  </select>
                  {errors.callbackTime && <p className="text-red-500 text-xs mt-1">{errors.callbackTime.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/70">Project Description</label>
                <textarea 
                  {...register("description")}
                  rows={4}
                  className="w-full border-b border-[#2C2C2C]/20 py-2 bg-transparent focus:outline-none focus:border-[#C4856A] transition-colors resize-none rounded-none"
                  placeholder="Tell us a bit about your project, timeline, and vision..."
                ></textarea>
              </div>

              <div className="pt-8 flex flex-col items-center gap-6">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-12 py-4 bg-[#C4856A] text-white font-sans text-sm uppercase tracking-wider hover:bg-[#b0745b] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Enquiry"}
                </button>

                <a 
                  href="https://wa.me/919999999999?text=Hi!%20I'm%20interested%20in%20interior%20design%20services.%20Can%20we%20discuss%20my%20project%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-[#2C2C2C]/70 hover:text-[#25D366] transition-colors font-sans text-sm"
                >
                  Or chat with us on WhatsApp
                  <SiWhatsapp className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
