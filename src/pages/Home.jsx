import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight, Star, ChevronDown, Users, Scissors, Calendar, Award } from "lucide-react";
import { salon, signatureServices, serviceCategories, galleryImages } from "../data/salonConfig";
import { formatPrice, formatDuration } from "../hooks/useBooking";
import SectionReveal from "../components/SectionReveal";
import TestimonialCarousel from "../components/TestimonialCarousel";

const iconMap = { users: Users, calendar: Calendar, scissors: Scissors, star: Star };

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };

function AnimatedCounter({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const numericPart = parseInt(value.replace(/[^0-9]/g, ""));
  const prefix = value.startsWith("+") ? "+" : "";
  const suffixPart = value.replace(/[0-9+]/g, "");

  if (isNaN(numericPart)) return <span>{value}{suffix}</span>;

  return (
    <span ref={ref}>
      {inView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {prefix}{numericPart.toLocaleString()}{suffixPart}{suffix}
        </motion.span>
      ) : "0"}
    </span>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden bg-espresso">
        <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80"
            alt="Velvet & Fade luxury salon interior"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/60 via-espresso/40 to-espresso/80" />
        </motion.div>

        <motion.div
          style={{ y: textY, opacity }}
          className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 h-full flex flex-col justify-center pt-32 pb-24"
        >
          <div className="max-w-3xl">
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-champagne mb-6"
              >
                <span className="w-8 h-px bg-champagne" />
                Est. {salon.foundedYear} — Lekki, Lagos
              </motion.span>

              <motion.h1
                variants={fadeUp}
                className="font-display text-[52px] sm:text-[72px] lg:text-[96px] text-ivory leading-[0.92] tracking-[-0.02em] font-light"
              >
                Where Every Style
                <br />
                Becomes{" "}
                <span className="italic text-champagne">Your</span>
                <br />
                <span className="italic text-champagne">Signature</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-8 text-[17px] text-ivory/50 leading-relaxed max-w-lg font-light"
              >
                Premium haircuts, colour, braiding, nails and spa treatments — crafted with intention in the heart of Lekki.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/booking"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-copper text-ivory text-[13px] font-semibold uppercase tracking-wider rounded-full hover:bg-copper/90 transition-all duration-300 shadow-[0_4px_24px_rgba(184,107,75,0.35)]"
                >
                  Book Appointment
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-ivory/20 text-ivory text-[13px] font-semibold uppercase tracking-wider rounded-full hover:bg-ivory/8 transition-all duration-300"
                >
                  Explore Services
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-12 flex items-center gap-6">
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-champagne text-champagne" />
                  ))}
                </div>
                <span className="text-[13px] text-ivory/40 font-light">
                  <span className="text-ivory/70 font-medium">4.8</span> rating · 500+ happy clients
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/30 font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4 text-ivory/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="relative -mt-16 z-20 mx-auto max-w-[1200px] px-6 sm:px-10">
        <SectionReveal>
          <div className="bg-white/80 backdrop-blur-2xl rounded-[28px] shadow-[0_20px_80px_rgba(42,30,27,0.08)] border border-white/60 p-8 sm:p-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {salon.stats.map(({ label, value, icon, suffix }, i) => {
                const Icon = iconMap[icon] || Star;
                return (
                  <div key={label} className="text-center">
                    <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-4 w-4 text-champagne" />
                    </div>
                    <p className="font-display text-[36px] sm:text-[42px] text-espresso tracking-[-0.02em] leading-none">
                      <AnimatedCounter value={value} suffix={suffix || ""} />
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/30 font-semibold mt-2">{label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ── Signature Services ── */}
      <section className="py-24 sm:py-32 bg-ivory">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <SectionReveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-champagne">What We Do Best</span>
                <h2 className="font-display text-[36px] sm:text-[48px] text-espresso mt-3 tracking-[-0.02em] font-light">
                  Signature Services
                </h2>
              </div>
              <Link
                to="/services"
                className="group flex items-center gap-2 text-[13px] font-medium text-copper hover:text-copper/80 transition-colors"
              >
                View All Services
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {signatureServices.map((svc, i) => (
              <SectionReveal key={svc.id} delay={i * 0.08}>
                <Link
                  to="/services"
                  className="group block rounded-[24px] overflow-hidden bg-white shadow-[0_2px_20px_rgba(42,30,27,0.04)] hover:shadow-[0_20px_60px_rgba(42,30,27,0.1)] transition-all duration-500"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-blush">
                    <img
                      src={svc.image}
                      alt={svc.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-[20px] text-espresso group-hover:text-copper transition-colors font-medium">
                      {svc.name}
                    </h3>
                    <p className="text-[13px] text-charcoal/40 mt-2 leading-relaxed font-light">
                      {svc.description}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-charcoal/5">
                      <p className="text-[15px] font-semibold text-copper">{formatPrice(svc.price)}</p>
                      <span className="text-[11px] uppercase tracking-wider text-charcoal/25 font-medium">{formatDuration(svc.duration)}</span>
                    </div>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Preview ── */}
      <section className="py-24 sm:py-32 bg-blush relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full border border-champagne/10 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-rose/5 translate-y-1/2 -translate-x-1/2" />

        <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <SectionReveal className="lg:col-span-5">
              <div className="relative">
                <div className="aspect-[3/4] rounded-[32px] overflow-hidden shadow-[0_20px_80px_rgba(42,30,27,0.12)]">
                  <img
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80"
                    alt="Adaeze Okonkwo, founder of Velvet & Fade"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-copper text-ivory rounded-[20px] px-6 py-4 shadow-[0_8px_32px_rgba(184,107,75,0.3)]">
                  <p className="font-display text-[32px] leading-none tracking-[-0.02em] font-light">{salon.foundedYear}</p>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-ivory/60 font-semibold mt-1">Founded</p>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1} className="lg:col-span-7 lg:pl-8">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-champagne">Our Story</span>
                <h2 className="font-display text-[32px] sm:text-[42px] text-espresso mt-3 tracking-[-0.02em] leading-tight font-light">
                  Built for <span className="italic">Everyone</span>
                </h2>
                <p className="mt-6 text-[16px] text-charcoal/50 leading-[1.9] font-light max-w-lg">
                  When {salon.founderName} opened the doors of {salon.name} in {salon.foundedYear},
                  the idea was simple but uncommon in Lagos: one salon where men and women receive the same calibre of care, under one roof.
                </p>
                <p className="mt-4 text-[16px] text-charcoal/50 leading-[1.9] font-light max-w-lg">
                  Five years on, that vision holds. Our team of {salon.stats.find(s => s.label === "Stylists & barbers")?.value} stylists
                  and barbers are trained across disciplines — every one of them can hold a conversation about a classic taper and a balayage in the same breath.
                </p>

                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 mt-8 text-[13px] font-medium text-copper hover:text-copper/80 transition-colors"
                >
                  Read Our Full Story
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Gallery Preview ── */}
      <section className="py-24 sm:py-32 bg-ivory">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <SectionReveal>
            <div className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-champagne">The Space</span>
              <h2 className="font-display text-[36px] sm:text-[48px] text-espresso mt-3 tracking-[-0.02em] font-light">
                Inside <span className="italic">Velvet & Fade</span>
              </h2>
            </div>
          </SectionReveal>

          <div className="columns-2 lg:columns-4 gap-4 space-y-4">
            {galleryImages.slice(0, 8).map((img, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <div className="rounded-[20px] overflow-hidden bg-blush break-inside-avoid group">
                  <div className={`${img.aspect === "tall" ? "aspect-[3/4]" : img.aspect === "wide" ? "aspect-[4/3]" : "aspect-square"} overflow-hidden`}>
                    <img
                      src={img.src}
                      alt={`Salon gallery ${i + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <div className="text-center mt-12">
              <Link
                to="/gallery"
                className="group inline-flex items-center gap-2 px-8 py-4 border border-espresso/10 text-espresso text-[13px] font-semibold uppercase tracking-wider rounded-full hover:bg-espresso hover:text-ivory transition-all duration-300"
              >
                View Full Gallery
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 sm:py-32 bg-espresso relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-espresso via-espresso to-espresso/95" />
        <div className="absolute top-20 right-20 w-[200px] h-[200px] rounded-full border border-champagne/5" />

        <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <SectionReveal>
            <div className="text-center mb-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-champagne">Client Love</span>
              <h2 className="font-display text-[36px] sm:text-[48px] text-ivory mt-3 tracking-[-0.02em] font-light">
                What They Say
              </h2>
            </div>
          </SectionReveal>

          <TestimonialCarousel testimonials={salon.testimonials} />
        </div>
      </section>

      {/* ── Booking CTA ── */}
      <section className="py-24 sm:py-32 bg-ivory relative overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <SectionReveal>
            <div className="relative rounded-[32px] overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&q=80"
                  alt="Salon ambiance"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/75 to-espresso/60" />
              </div>

              <div className="relative z-10 py-20 sm:py-28 px-8 sm:px-16 text-center">
                <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-champagne">Ready?</span>
                <h2 className="font-display text-[40px] sm:text-[56px] lg:text-[64px] text-ivory mt-4 tracking-[-0.02em] leading-[0.95] font-light">
                  Your Next Style
                  <br />
                  <span className="italic text-champagne">Awaits</span>
                </h2>
                <p className="mt-6 text-[16px] text-ivory/45 max-w-md mx-auto font-light leading-relaxed">
                  Book your appointment today and experience the luxury difference.
                </p>
                <Link
                  to="/booking"
                  className="group inline-flex items-center gap-3 mt-10 px-10 py-4 bg-copper text-ivory text-[13px] font-semibold uppercase tracking-wider rounded-full hover:bg-copper/90 transition-all duration-300 shadow-[0_4px_24px_rgba(184,107,75,0.4)]"
                >
                  Book Appointment
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
