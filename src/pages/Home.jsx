import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Scissors, MapPin, Clock } from "lucide-react";
import { salon, signatureServices } from "../data/salonConfig";
import { formatPrice } from "../hooks/useBooking";
import SectionReveal from "../components/SectionReveal";

const highlights = [
  { icon: Scissors, text: "Men's & Women's Services" },
  { icon: MapPin, text: "Lekki Phase 1, Lagos" },
  { icon: Clock, text: "Open 7 Days a Week" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Home() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=80"
            alt="Salon interior"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/60 to-charcoal/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block font-label text-[11px] uppercase tracking-[0.25em] text-copper mb-4"
            >
              Unisex Salon &mdash; Est. {salon.foundedYear}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-[1.1]"
            >
              Where Every
              <br />
              Style Finds Home
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-base sm:text-lg text-cream/70 leading-relaxed max-w-md"
            >
              Premium haircuts, colour, braiding, nails and spa treatments for
              men and women &mdash; all under one roof in the heart of Lekki.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-copper text-charcoal font-semibold text-sm hover:bg-copper/90 transition-colors shadow-lg shadow-copper/20"
              >
                Book Your Appointment
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-cream/30 text-cream text-sm font-medium hover:bg-cream/10 transition-colors"
              >
                View Services
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 rounded-full border-2 border-cream/30 flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="w-1 h-1.5 rounded-full bg-cream/60"
            />
          </div>
        </motion.div>
      </section>

      {/* ── Highlight strip ── */}
      <section className="bg-charcoal border-b border-warmgray/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 py-4 sm:py-5">
            {highlights.map(({ icon: Icon, text }, i) => (
              <span
                key={i}
                className="flex items-center gap-2 text-xs sm:text-sm text-cream/70"
              >
                <Icon className="h-4 w-4 text-copper" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Signature services ── */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="font-label text-[11px] uppercase tracking-[0.25em] text-copper">
                What We Do Best
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mt-2">
                Signature Services
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {signatureServices.map((svc, i) => (
              <SectionReveal key={svc.id} delay={i * 0.08}>
                <Link
                  to="/services"
                  className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-stone/10">
                    <img
                      src={svc.image}
                      alt={svc.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base font-bold text-charcoal group-hover:text-copper transition-colors">
                      {svc.name}
                    </h3>
                    <p className="text-sm text-stone mt-1">{svc.description}</p>
                    <p className="text-sm font-semibold text-copper mt-2">
                      {formatPrice(svc.price)}
                    </p>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-copper hover:text-charcoal transition-colors"
            >
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── Trust / Founder ── */}
      <section className="py-16 sm:py-24 bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SectionReveal>
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80"
                    alt="Adaeze Okonkwo, founder"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-copper text-charcoal rounded-2xl px-5 py-3 shadow-lg">
                  <p className="font-display text-2xl font-bold">{salon.foundedYear}</p>
                  <p className="text-xs font-label uppercase tracking-widest">Founded</p>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div>
                <span className="font-label text-[11px] uppercase tracking-[0.25em] text-copper">
                  Meet the Founder
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">
                  {salon.founderName}
                </h2>
                <p className="mt-5 text-cream/70 leading-relaxed">
                  {salon.founderBio}
                </p>

                {/* Stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
                  {salon.stats.map(({ label, value }) => (
                    <div key={label}>
                      <p className="font-display text-2xl sm:text-3xl font-bold text-copper">
                        {value}
                      </p>
                      <p className="text-xs text-cream/50 mt-1 font-label uppercase tracking-wider">
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
