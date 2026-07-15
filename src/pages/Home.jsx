import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { salon, signatureServices } from "../data/salonConfig";
import { formatPrice } from "../hooks/useBooking";
import SectionReveal from "../components/SectionReveal";
import { useRef } from "react";

const highlights = ["Men's & Women's Services", "Lekki Phase 1, Lagos", "Open 7 Days"];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <main>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden bg-brown">
        <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=80" alt="Salon interior" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brown/80 via-brown/50 to-transparent" />
        </motion.div>

        {/* Soft diagonal accent */}
        <div className="absolute bottom-0 right-0 w-[55%] h-[55%] bg-ivory origin-bottom-right skew-y-[-5deg] sm:skew-y-[-3deg] translate-y-[14%]" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 h-full flex items-end sm:items-center pb-24 sm:pb-0 pt-32 sm:pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center w-full">
            <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-xl">
              <motion.span variants={fadeUp} className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-rose mb-5">
                Est. {salon.foundedYear} — Lekki, Lagos
              </motion.span>

              <motion.h1 variants={fadeUp} className="font-display text-[44px] sm:text-[56px] lg:text-[72px] text-ivory leading-[0.95] tracking-[-0.02em]">
                Where Every<br />Style Finds<br /><span className="italic text-rose">Home</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-6 text-[16px] text-ivory/55 leading-relaxed max-w-md">
                Premium haircuts, colour, braiding, nails and spa treatments — all under one roof in the heart of Lekki.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
                <Link to="/booking" className="group inline-flex items-center gap-2 px-7 py-3.5 bg-rose text-ivory text-[14px] font-semibold hover:bg-rose-deep transition-all duration-200 shadow-[0_4px_20px_rgba(196,144,138,0.3)]">
                  Book Your Appointment <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/services" className="inline-flex items-center gap-2 px-7 py-3.5 border border-ivory/20 text-ivory text-[14px] font-semibold hover:bg-ivory/8 transition-all duration-200">
                  View Services
                </Link>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.7 }} className="hidden sm:flex flex-col gap-3 items-end">
              {salon.stats.map(({ label, value }, i) => (
                <div key={label} className={`bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-[0_6px_28px_rgba(46,36,32,0.08)] ${i === 1 ? "mr-8" : i === 2 ? "mr-16" : ""}`}>
                  <p className="font-display text-[28px] text-brown tracking-[-0.02em] leading-none">{value}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-brown/35 font-bold mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-brown/60 backdrop-blur-md border-t border-ivory/8 z-20">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <div className="flex items-center gap-6 sm:gap-10 py-4 overflow-x-auto scrollbar-hide">
              {highlights.map((text, i) => (
                <span key={i} className="flex items-center gap-3 text-[12px] text-ivory/50 font-semibold uppercase tracking-wider whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose/60 shrink-0" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Signature services ── */}
      <section className="py-20 sm:py-28 bg-ivory">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-rose">What We Do Best</span>
                <h2 className="font-display text-[32px] sm:text-[40px] text-brown mt-2 tracking-[-0.02em]">Signature Services</h2>
              </div>
              <Link to="/services" className="group flex items-center gap-2 text-[13px] font-semibold text-rose-deep hover:text-rose transition-colors">
                View All <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {signatureServices.map((svc, i) => (
              <SectionReveal key={svc.id} delay={i * 0.07}>
                <Link to="/services" className="group block rounded-2xl overflow-hidden bg-white shadow-[0_2px_16px_rgba(46,36,32,0.05)] hover:shadow-[0_10px_40px_rgba(46,36,32,0.1)] transition-shadow duration-500">
                  <div className="aspect-[4/3] overflow-hidden bg-blush">
                    <img src={svc.image} alt={svc.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-[16px] text-brown group-hover:text-rose transition-colors">{svc.name}</h3>
                    <p className="text-[13px] text-brown/40 mt-1.5 leading-relaxed">{svc.description}</p>
                    <p className="text-[14px] font-bold text-rose-deep mt-2.5">{formatPrice(svc.price)}</p>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust / Founder ── */}
      <section className="py-20 sm:py-28 bg-blush relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[260px] h-[260px] rounded-full border border-rose/10" />
        <div className="absolute -bottom-10 -left-10 w-[180px] h-[180px] rounded-full bg-sage/10" />

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <SectionReveal className="lg:col-span-5">
              <div className="relative">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80" alt="Adaeze Okonkwo, founder" loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="absolute -bottom-5 -right-4 sm:-right-8 bg-rose text-ivory rounded-2xl px-5 py-3.5 shadow-[0_8px_28px_rgba(196,144,138,0.3)]">
                  <p className="font-display text-[28px] leading-none tracking-[-0.02em]">{salon.foundedYear}</p>
                  <p className="text-[9px] uppercase tracking-[0.22em] text-ivory/60 font-bold mt-0.5">Founded</p>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1} className="lg:col-span-7 lg:pl-10">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-rose">Meet the Founder</span>
                <h2 className="font-display text-[28px] sm:text-[36px] text-brown mt-3 tracking-[-0.02em] leading-tight">{salon.founderName}</h2>
                <p className="mt-5 text-[15px] text-brown/50 leading-[1.8] max-w-lg">{salon.founderBio}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-10">
                  {salon.stats.map(({ label, value }) => (
                    <div key={label}>
                      <p className="font-display text-[26px] sm:text-[30px] text-rose-deep tracking-[-0.02em] leading-none">{value}</p>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-brown/30 font-bold mt-2">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
