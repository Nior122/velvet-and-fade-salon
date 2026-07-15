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
      {/* ── Hero — full bleed diagonal composition ── */}
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden bg-ink">
        {/* Background image with Ken Burns */}
        <motion.div
          style={{ scale: imgScale, y: imgY }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=80"
            alt="Salon interior"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/50" />
        </motion.div>

        {/* Diagonal accent */}
        <div className="absolute bottom-0 right-0 w-[55%] h-[60%] bg-ivory origin-bottom-right skew-y-[-6deg] sm:skew-y-[-4deg] translate-y-[12%]" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 h-full flex items-end sm:items-center pb-24 sm:pb-0 pt-32 sm:pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center w-full">
            {/* Left: text block */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="max-w-xl"
            >
              <motion.span
                variants={fadeUp}
                className="inline-block font-label text-[11px] font-600 uppercase tracking-[0.3em] text-gold mb-5"
              >
                Est. {salon.foundedYear} &middot; Lekki, Lagos
              </motion.span>

              <motion.h1
                variants={fadeUp}
                className="font-display text-[44px] sm:text-[56px] lg:text-[72px] xl:text-[80px] font-900 text-ivory leading-[0.92] tracking-[-0.04em]"
              >
                Where Every
                <br />
                Style Finds
                <br />
                <span className="text-gold">Home</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-[16px] sm:text-[17px] text-ivory/60 leading-relaxed max-w-md"
              >
                Premium haircuts, colour, braiding, nails and spa treatments — all under one roof in the heart of Lekki.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/booking"
                  className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gold text-ink font-display font-700 text-[14px] tracking-[-0.01em] hover:bg-gold-light transition-all duration-300 shadow-[0_4px_24px_rgba(196,162,101,0.3)] hover:shadow-[0_8px_40px_rgba(196,162,101,0.4)]"
                >
                  Book Your Appointment
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-ivory/20 text-ivory text-[14px] font-display font-600 hover:bg-ivory/10 transition-all duration-300"
                >
                  View Services
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: overlapping stats cards */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="hidden sm:flex flex-col gap-4 items-end"
            >
              {salon.stats.map(({ label, value }, i) => (
                <div
                  key={label}
                  className={`bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)] ${
                    i === 1 ? "mr-8" : i === 2 ? "mr-16" : ""
                  }`}
                >
                  <p className="font-display text-[28px] font-900 text-ink tracking-[-0.03em] leading-none">
                    {value}
                  </p>
                  <p className="font-label text-[10px] uppercase tracking-[0.2em] text-ink/40 font-600 mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Highlight strip at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-ink/80 backdrop-blur-md border-t border-ivory/8 z-20">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <div className="flex items-center gap-6 sm:gap-10 py-4 overflow-x-auto scrollbar-hide">
              {highlights.map((text, i) => (
                <span key={i} className="flex items-center gap-3 text-[12px] sm:text-[13px] text-ivory/50 font-label font-500 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/60 shrink-0" />
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
                <span className="font-label text-[11px] font-600 uppercase tracking-[0.3em] text-gold">
                  What We Do Best
                </span>
                <h2 className="font-display text-[32px] sm:text-[40px] font-800 text-ink mt-2 tracking-[-0.03em]">
                  Signature Services
                </h2>
              </div>
              <Link
                to="/services"
                className="group flex items-center gap-2 text-[13px] font-label font-600 text-forest hover:text-gold transition-colors duration-300"
              >
                View All
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {signatureServices.map((svc, i) => (
              <SectionReveal key={svc.id} delay={i * 0.08}>
                <Link
                  to="/services"
                  className="group block rounded-[20px] overflow-hidden bg-white shadow-[0_2px_20px_rgba(26,31,22,0.04)] hover:shadow-[0_8px_40px_rgba(26,31,22,0.1)] transition-shadow duration-500"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-sand/30">
                    <img
                      src={svc.image}
                      alt={svc.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-[16px] font-700 text-ink group-hover:text-forest transition-colors duration-300">
                      {svc.name}
                    </h3>
                    <p className="text-[13px] text-ink/45 mt-1.5 leading-relaxed">{svc.description}</p>
                    <p className="text-[14px] font-display font-700 text-forest mt-3">
                      {formatPrice(svc.price)}
                    </p>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust / Founder — asymmetric layout ── */}
      <section className="py-20 sm:py-32 bg-sand/40 relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full border border-forest/10" />
        <div className="absolute -bottom-12 -left-12 w-[200px] h-[200px] rounded-full bg-gold/5" />

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <SectionReveal className="lg:col-span-5">
              <div className="relative">
                <div className="aspect-[3/4] rounded-[24px] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80"
                    alt="Adaeze Okonkwo, founder"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Floating accent card */}
                <div className="absolute -bottom-5 -right-4 sm:-right-8 bg-forest text-ivory rounded-2xl px-5 py-3.5 shadow-[0_8px_32px_rgba(45,74,62,0.3)]">
                  <p className="font-display text-[28px] font-900 leading-none tracking-[-0.03em]">{salon.foundedYear}</p>
                  <p className="font-label text-[9px] uppercase tracking-[0.25em] text-ivory/60 font-600 mt-0.5">Founded</p>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1} className="lg:col-span-7 lg:pl-12">
              <div>
                <span className="font-label text-[11px] font-600 uppercase tracking-[0.3em] text-gold">
                  Meet the Founder
                </span>
                <h2 className="font-display text-[28px] sm:text-[36px] font-800 text-ink mt-3 tracking-[-0.03em] leading-tight">
                  {salon.founderName}
                </h2>
                <p className="mt-5 text-[15px] text-ink/55 leading-[1.8] max-w-lg">
                  {salon.founderBio}
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
                  {salon.stats.map(({ label, value }) => (
                    <div key={label}>
                      <p className="font-display text-[26px] sm:text-[30px] font-900 text-forest tracking-[-0.03em] leading-none">
                        {value}
                      </p>
                      <p className="font-label text-[10px] uppercase tracking-[0.2em] text-ink/35 font-600 mt-2">
                        {label}
                      </p>
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
