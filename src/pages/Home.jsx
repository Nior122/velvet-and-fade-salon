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
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <main>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden bg-black">
        <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=80" alt="Salon interior" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <div className="absolute bottom-0 right-0 w-[55%] h-[60%] bg-offwhite origin-bottom-right skew-y-[-6deg] sm:skew-y-[-4deg] translate-y-[12%]" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 h-full flex items-end sm:items-center pb-24 sm:pb-0 pt-32 sm:pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center w-full">
            <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-xl">
              <motion.span variants={fadeUp} className="inline-block font-label text-[10px] font-bold uppercase tracking-[0.35em] text-lime mb-5">
                Est. {salon.foundedYear} — Lekki, Lagos
              </motion.span>

              <motion.h1 variants={fadeUp} className="font-display text-[44px] sm:text-[56px] lg:text-[72px] xl:text-[80px] font-extrabold uppercase text-white leading-[0.9] tracking-[-0.04em]">
                Where Every<br />Style Finds<br /><span className="text-lime">Home</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-6 text-[15px] text-white/50 leading-relaxed max-w-md font-body">
                Premium haircuts, colour, braiding, nails and spa treatments — all under one roof in the heart of Lekki.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
                <Link to="/booking" className="group inline-flex items-center gap-2 px-7 py-3.5 bg-lime text-black font-label font-bold text-[13px] uppercase tracking-[0.05em] hover:bg-lime/90 transition-all duration-200">
                  Book Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/services" className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white text-[13px] font-label font-bold uppercase tracking-[0.05em] hover:bg-white/10 transition-all duration-200">
                  View Services
                </Link>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.7 }} className="hidden sm:flex flex-col gap-3 items-end">
              {salon.stats.map(({ label, value }, i) => (
                <div key={label} className={`bg-white border-2 border-black px-5 py-3 ${i === 1 ? "mr-8" : i === 2 ? "mr-16" : ""}`}>
                  <p className="font-display text-[26px] font-extrabold uppercase text-black tracking-[-0.03em] leading-none">{value}</p>
                  <p className="font-label text-[9px] uppercase tracking-[0.25em] text-black/30 font-bold mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-white/10 z-20">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <div className="flex items-center gap-6 sm:gap-10 py-4 overflow-x-auto scrollbar-hide">
              {highlights.map((text, i) => (
                <span key={i} className="flex items-center gap-3 text-[11px] text-white/40 font-label font-bold uppercase tracking-[0.15em] whitespace-nowrap">
                  <span className="w-1.5 h-1.5 bg-lime shrink-0" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Signature services ── */}
      <section className="py-20 sm:py-32 bg-offwhite">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
              <div>
                <span className="font-label text-[10px] font-bold uppercase tracking-[0.3em] text-black/30">What We Do Best</span>
                <h2 className="font-display text-[32px] sm:text-[40px] font-extrabold uppercase text-black mt-2 tracking-[-0.03em]">Signature Services</h2>
              </div>
              <Link to="/services" className="group flex items-center gap-2 text-[12px] font-label font-bold text-black hover:text-lime transition-colors uppercase tracking-[0.1em]">
                View All <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {signatureServices.map((svc, i) => (
              <SectionReveal key={svc.id} delay={i * 0.08}>
                <Link to="/services" className="group block overflow-hidden bg-white border border-black/8 hover:border-lime transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-light">
                    <img src={svc.image} alt={svc.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-[15px] font-bold uppercase text-black group-hover:text-lime transition-colors tracking-[-0.01em]">{svc.name}</h3>
                    <p className="text-[12px] text-gray mt-1.5 leading-relaxed">{svc.description}</p>
                    <p className="text-[14px] font-bold text-black mt-3">{formatPrice(svc.price)}</p>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust / Founder ── */}
      <section className="py-20 sm:py-32 bg-black text-white relative">
        <div className="absolute top-12 right-12 w-[120px] h-[120px] border border-white/5 hidden lg:block" />

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <SectionReveal className="lg:col-span-5">
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden border-2 border-white/10">
                  <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80" alt="Adaeze Okonkwo, founder" loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 sm:-right-8 bg-lime text-black px-5 py-3">
                  <p className="font-display text-[28px] font-extrabold leading-none tracking-[-0.03em]">{salon.foundedYear}</p>
                  <p className="font-label text-[8px] uppercase tracking-[0.3em] font-bold mt-0.5">Founded</p>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1} className="lg:col-span-7 lg:pl-12">
              <div>
                <span className="font-label text-[10px] font-bold uppercase tracking-[0.3em] text-lime">Meet the Founder</span>
                <h2 className="font-display text-[28px] sm:text-[36px] font-extrabold uppercase text-white mt-3 tracking-[-0.03em] leading-tight">{salon.founderName}</h2>
                <p className="mt-5 text-[14px] text-white/45 leading-[1.8] max-w-lg">{salon.founderBio}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-10">
                  {salon.stats.map(({ label, value }) => (
                    <div key={label}>
                      <p className="font-display text-[26px] sm:text-[30px] font-extrabold text-lime tracking-[-0.03em] leading-none">{value}</p>
                      <p className="font-label text-[9px] uppercase tracking-[0.25em] text-white/25 font-bold mt-2">{label}</p>
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
