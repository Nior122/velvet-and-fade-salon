import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { salon, signatureServices } from "../data/salonConfig";
import { formatPrice } from "../hooks/useBooking";
import SectionReveal from "../components/SectionReveal";
import { useRef } from "react";

const highlights = [
  "Men's & Women's Services",
  "Lekki Phase 1, Lagos",
  "Open 7 Days",
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <main>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden bg-espresso">
        <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=80"
            alt="Salon interior"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-espresso/45" />
        </motion.div>

        <div className="absolute bottom-0 right-0 w-[55%] h-[60%] bg-ivory origin-bottom-right skew-y-[-6deg] sm:skew-y-[-4deg] translate-y-[12%]" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 h-full flex items-end sm:items-center pb-24 sm:pb-0 pt-32 sm:pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center w-full">
            <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-xl">
              <motion.span variants={fadeUp} className="inline-block font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne mb-5">
                Est. {salon.foundedYear} &middot; Lekki, Lagos
              </motion.span>

              <motion.h1 variants={fadeUp} className="font-display text-[46px] sm:text-[58px] lg:text-[74px] xl:text-[82px] font-semibold text-ivory leading-[0.92] tracking-[-0.03em]">
                Where Every<br />Style Finds<br /><span className="italic text-champagne">Home</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-6 text-[16px] sm:text-[17px] text-ivory/55 leading-relaxed max-w-md">
                Premium haircuts, colour, braiding, nails and spa treatments — all under one roof in the heart of Lekki.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
                <Link to="/booking" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-plum text-ivory font-label font-bold text-[14px] hover:bg-plum/90 transition-all duration-300 shadow-[0_4px_24px_rgba(107,58,74,0.3)] hover:shadow-[0_8px_40px_rgba(107,58,74,0.4)]">
                  Book Your Appointment
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/services" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-ivory/15 text-ivory text-[14px] font-label font-semibold hover:bg-ivory/8 transition-all duration-300">
                  View Services
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="hidden sm:flex flex-col gap-4 items-end"
            >
              {salon.stats.map(({ label, value }, i) => (
                <div key={label} className={`bg-ivory/95 backdrop-blur-sm rounded-[16px] px-6 py-4 shadow-[0_8px_32px_rgba(44,34,32,0.1)] ${i === 1 ? "mr-8" : i === 2 ? "mr-16" : ""}`}>
                  <p className="font-display text-[30px] font-semibold text-espresso tracking-[-0.02em] leading-none">{value}</p>
                  <p className="font-label text-[10px] uppercase tracking-[0.2em] text-espresso/35 mt-1">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-espresso/75 backdrop-blur-md border-t border-ivory/6 z-20">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <div className="flex items-center gap-6 sm:gap-10 py-4 overflow-x-auto scrollbar-hide">
              {highlights.map((text, i) => (
                <span key={i} className="flex items-center gap-3 text-[12px] sm:text-[13px] text-ivory/45 font-label font-medium whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne/50 shrink-0" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Signature services ── */}
      <section className="py-20 sm:py-32 bg-ivory">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
              <div>
                <span className="font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-mauve-deep">What We Do Best</span>
                <h2 className="font-display text-[34px] sm:text-[42px] font-semibold text-espresso mt-2 tracking-[-0.02em]">Signature Services</h2>
              </div>
              <Link to="/services" className="group flex items-center gap-2 text-[13px] font-label font-semibold text-plum hover:text-mauve-deep transition-colors duration-300">
                View All
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {signatureServices.map((svc, i) => (
              <SectionReveal key={svc.id} delay={i * 0.08}>
                <Link to="/services" className="group block rounded-[16px] overflow-hidden bg-white shadow-[0_2px_20px_rgba(44,34,32,0.04)] hover:shadow-[0_12px_40px_rgba(44,34,32,0.1)] transition-shadow duration-500">
                  <div className="aspect-[4/3] overflow-hidden bg-parchment">
                    <img src={svc.image} alt={svc.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-[17px] font-semibold text-espresso group-hover:text-plum transition-colors duration-300">{svc.name}</h3>
                    <p className="text-[13px] text-espresso/40 mt-1.5 leading-relaxed">{svc.description}</p>
                    <p className="text-[15px] font-display font-semibold text-plum mt-3">{formatPrice(svc.price)}</p>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust / Founder ── */}
      <section className="py-20 sm:py-32 bg-parchment relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full border border-mauve/10" />
        <div className="absolute -bottom-12 -left-12 w-[200px] h-[200px] rounded-full bg-champagne/10" />

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <SectionReveal className="lg:col-span-5">
              <div className="relative">
                <div className="aspect-[3/4] rounded-[20px] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80" alt="Adaeze Okonkwo, founder" loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="absolute -bottom-5 -right-4 sm:-right-8 bg-plum text-ivory rounded-[16px] px-5 py-3.5 shadow-[0_8px_32px_rgba(107,58,74,0.3)]">
                  <p className="font-display text-[30px] font-semibold leading-none tracking-[-0.02em]">{salon.foundedYear}</p>
                  <p className="font-label text-[9px] uppercase tracking-[0.25em] text-ivory/55 mt-0.5">Founded</p>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1} className="lg:col-span-7 lg:pl-12">
              <div>
                <span className="font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-mauve-deep">Meet the Founder</span>
                <h2 className="font-display text-[30px] sm:text-[38px] font-semibold text-espresso mt-3 tracking-[-0.02em] leading-tight">{salon.founderName}</h2>
                <p className="mt-5 text-[15px] text-espresso/50 leading-[1.8] max-w-lg">{salon.founderBio}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
                  {salon.stats.map(({ label, value }) => (
                    <div key={label}>
                      <p className="font-display text-[28px] sm:text-[32px] font-semibold text-plum tracking-[-0.02em] leading-none">{value}</p>
                      <p className="font-label text-[10px] uppercase tracking-[0.2em] text-espresso/30 mt-2">{label}</p>
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
