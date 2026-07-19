import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Star, Clock, MapPin, Phone } from "lucide-react";
import {
  salon,
  heroContent,
  experience,
  signatureServices,
  galleryImages,
} from "../data/salonConfig";
import { formatPrice, formatDuration } from "../hooks/useBooking";
import SectionReveal from "../components/SectionReveal";
import TestimonialCarousel from "../components/TestimonialCarousel";
import BookButton from "../components/BookButton";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };

const hoursList = [
  ["Mon — Thu", salon.hours.mon],
  ["Friday", salon.hours.fri],
  ["Saturday", salon.hours.sat],
  ["Sunday", salon.hours.sun],
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main>
      {/* ─────────── HERO ─────────── */}
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden bg-surf-0 grain">
        <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1800&q=80"
            alt="The interior of Velvet & Fade salon in Lekki, Lagos"
            className="h-full w-full object-cover"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surf-0/70 via-surf-0/45 to-surf-0/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-surf-0/70 to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: overlayOpacity }}
          className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 min-h-[100svh] flex flex-col justify-end pb-28 sm:pb-32"
        >
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-4xl">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-3 kicker text-accent mb-7">
              <span className="w-9 h-px bg-accent/70" />
              {heroContent.eyebrow}
            </motion.span>

            <motion.h1 variants={fadeUp} className="display-xl text-t-prime">
              {heroContent.headline.map((line, i) => (
                <span key={i} className="block">
                  {i === heroContent.emphasis ? <span className="italic text-accent">{line}</span> : line}
                </span>
              ))}
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-8 text-[16px] sm:text-[18px] text-t-sub leading-relaxed max-w-xl font-light">
              {heroContent.sub}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
              <BookButton className="group inline-flex items-center gap-3 pl-8 pr-6 py-4 bg-accent text-surf-0 text-[12.5px] font-semibold uppercase tracking-[0.18em] rounded-full hover:opacity-90 transition-opacity duration-400">
                Book Your Appointment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </BookButton>
              <Link
                to="/services"
                className="link-underline inline-flex items-center gap-2 py-4 text-t-prime hover:text-accent text-[12.5px] font-medium uppercase tracking-[0.18em] transition-colors"
              >
                Explore Services
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-t-sub">
              <span className="inline-flex items-center gap-2 text-[13px] font-light">
                <MapPin className="h-4 w-4 text-accent/70" /> {salon.city}
              </span>
              <span className="inline-flex items-center gap-2 text-[13px] font-light">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-t-prime">4.8</span> Google rating
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────── THE EXPERIENCE ─────────── */}
      <section className="bg-surf-1 py-24 sm:py-36">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
            <SectionReveal className="lg:col-span-7">
              <span className="kicker">{experience.eyebrow}</span>
              <h2 className="display-lg text-t-prime mt-6">
                {experience.statement.split(".")[0]}.
                <span className="block italic text-accent mt-2">
                  {experience.statement.split(".").slice(1).join(".").trim()}
                </span>
              </h2>
              <p className="mt-8 text-[16px] sm:text-[17px] text-t-sub leading-[1.9] font-light max-w-xl">
                {experience.body}
              </p>
            </SectionReveal>

            <div className="lg:col-span-5 grid sm:grid-cols-2 gap-x-10 gap-y-10">
              {experience.pillars.map((p, i) => (
                <SectionReveal key={p.title} delay={i * 0.08}>
                  <div className="border-t border-border pt-5">
                    <h3 className="font-display text-[22px] text-t-prime font-medium">{p.title}</h3>
                    <p className="mt-2 text-[14px] text-t-sub leading-relaxed font-light">{p.text}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── SIGNATURE SERVICES ─────────── */}
      <section className="py-24 sm:py-32 bg-surf-0">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <SectionReveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-6">
              <div>
                <span className="kicker">What We Do Best</span>
                <h2 className="display-lg text-t-prime mt-4">
                  Signature <span className="italic text-accent">Services</span>
                </h2>
              </div>
              <Link to="/services" className="group inline-flex items-center gap-2 text-[13px] font-medium text-accent-d hover:text-accent transition-colors">
                View All Services
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {signatureServices.map((svc, i) => (
              <SectionReveal key={svc.id} delay={i * 0.08}>
                <Link to="/services" className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-surf-2 rounded-[4px]">
                    <img
                      src={svc.image}
                      alt={svc.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surf-0/80 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 kicker text-t-prime/90 text-[10px]">Signature</span>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-t-prime">
                      <span className="text-[15px] font-medium tracking-wide">{formatPrice(svc.price)}</span>
                      <span className="text-[11px] uppercase tracking-[0.15em] text-t-prime/60">{formatDuration(svc.duration)}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-display text-[22px] text-t-prime group-hover:text-accent transition-colors">
                      {svc.name}
                    </h3>
                    <p className="text-[13.5px] text-t-sub mt-1.5 leading-relaxed font-light">{svc.description}</p>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── ABOUT / ONE ROOF ─────────── */}
      <section className="py-24 sm:py-36 bg-surf-1">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <SectionReveal className="lg:col-span-6">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-[6px]">
                  <img
                    src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=900&q=80"
                    alt="A calm styling moment inside Velvet & Fade"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="hidden sm:block absolute -bottom-10 -right-6 lg:-right-10 w-[46%] aspect-[3/4] overflow-hidden rounded-[6px] border-8 border-surf-1">
                  <img
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80"
                    alt="Braiding in progress at Velvet & Fade"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1} className="lg:col-span-6 lg:pl-8">
              <span className="kicker">Our Story</span>
              <h2 className="display-lg text-t-prime mt-5">
                One salon.<br /><span className="italic text-accent">Everyone</span> welcome.
              </h2>
              <p className="mt-7 text-[16px] text-t-sub leading-[1.9] font-light max-w-lg">
                When {salon.founderName} opened the doors of {salon.name} in {salon.foundedYear},
                the idea was simple but uncommon in Lagos: one salon where men and women
                receive the same calibre of care, under one roof.
              </p>
              <p className="mt-4 text-[16px] text-t-sub leading-[1.9] font-light max-w-lg">
                Today, that vision holds — a team trained across disciplines, equally
                at home with a classic taper and a considered balayage.
              </p>
              <Link to="/about" className="group inline-flex items-center gap-2 mt-9 text-[13px] font-medium text-accent-d hover:text-accent transition-colors">
                Read Our Full Story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ─────────── GALLERY STRIP ─────────── */}
      <section className="py-24 sm:py-32 bg-surf-0 grain relative overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 relative">
          <SectionReveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-6">
              <div>
                <span className="kicker">The Space</span>
                <h2 className="display-lg text-t-prime mt-4">
                  Inside <span className="italic text-accent">Velvet &amp; Fade</span>
                </h2>
              </div>
              <Link to="/gallery" className="group inline-flex items-center gap-2 text-[13px] font-medium text-t-sub hover:text-accent transition-colors">
                Full Gallery
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </SectionReveal>
        </div>

        <div className="flex gap-4 overflow-x-auto hide-scrollbar px-6 sm:px-10 lg:px-16 pb-2 snap-x">
          {galleryImages.slice(0, 8).map((img, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <div
                className={`snap-start shrink-0 overflow-hidden rounded-[4px] bg-surf-2 group ${
                  img.aspect === "tall" ? "w-[240px] sm:w-[300px]" : "w-[300px] sm:w-[400px]"
                }`}
              >
                <div className={`${img.aspect === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"} overflow-hidden`}>
                  <img
                    src={img.src}
                    alt={`Velvet & Fade — salon scene ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ─────────── HOURS + LOCATION ─────────── */}
      <section className="py-24 sm:py-32 bg-surf-1">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <SectionReveal>
              <span className="kicker">Opening Hours</span>
              <h2 className="display-lg text-t-prime mt-4">Plan Your <span className="italic text-accent">Visit</span></h2>
              <div className="mt-10 divide-y divide-border max-w-md">
                {hoursList.map(([day, hours]) => (
                  <div key={day} className="flex items-center justify-between py-4">
                    <span className="text-[15px] text-t-prime font-medium">{day}</span>
                    <span className="text-[14px] text-t-sub font-light">{hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href={`tel:${salon.phone}`} className="inline-flex items-center gap-2 px-6 py-3.5 border border-border text-t-prime text-[12.5px] font-medium uppercase tracking-[0.15em] rounded-full hover:bg-accent hover:text-surf-0 hover:border-accent transition-colors">
                  <Phone className="h-4 w-4" /> Call Us
                </a>
                <a href={salon.directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 border border-border text-t-prime text-[12.5px] font-medium uppercase tracking-[0.15em] rounded-full hover:bg-accent hover:text-surf-0 hover:border-accent transition-colors">
                  <MapPin className="h-4 w-4" /> Get Directions
                </a>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="relative overflow-hidden rounded-[6px] aspect-[4/3] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                <iframe
                  src={salon.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.4) contrast(1.05)" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Velvet & Fade location on Google Maps"
                />
              </div>
              <div className="mt-5 flex items-start gap-3">
                <Clock className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <p className="text-[14px] text-t-sub font-light leading-relaxed">
                  {salon.address}
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ─────────── TESTIMONIALS ─────────── */}
      <section className="py-24 sm:py-32 bg-surf-0 grain relative overflow-hidden">
        <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <SectionReveal>
            <div className="text-center mb-14">
              <span className="kicker text-accent">In Their Words</span>
              <h2 className="display-lg text-t-prime mt-4">What Our Guests Say</h2>
            </div>
          </SectionReveal>
          <TestimonialCarousel testimonials={salon.testimonials} />
        </div>
      </section>

      {/* ─────────── FINAL CTA ─────────── */}
      <section className="bg-surf-1 py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <SectionReveal>
            <div className="relative overflow-hidden rounded-[8px]">
              <img
                src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1400&q=80"
                alt="Velvet & Fade ambiance"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-surf-0/95 via-surf-0/85 to-surf-0/60" />
              <div className="relative z-10 py-20 sm:py-28 px-8 sm:px-16 max-w-2xl">
                <span className="kicker text-accent">Ready for Your Next Look?</span>
                <h2 className="display-lg text-t-prime mt-5">
                  Your next transformation<br /><span className="italic text-accent">starts here.</span>
                </h2>
                <p className="mt-6 text-[16px] text-t-sub max-w-md font-light leading-relaxed">
                  Reserve your chair at {salon.name} in {salon.city} and experience the difference for yourself.
                </p>
                <BookButton className="group inline-flex items-center gap-3 mt-10 pl-8 pr-6 py-4 bg-accent text-surf-0 text-[12.5px] font-semibold uppercase tracking-[0.18em] rounded-full hover:opacity-90 transition-opacity duration-400">
                  Book Your Appointment
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </BookButton>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
