import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Camera, Globe, AtSign, ArrowUp } from "lucide-react";
import { salon } from "../data/salonConfig";

const days = [
  ["Mon", salon.hours.mon],
  ["Tue", salon.hours.tue],
  ["Wed", salon.hours.wed],
  ["Thu", salon.hours.thu],
  ["Fri", salon.hours.fri],
  ["Sat", salon.hours.sat],
  ["Sun", salon.hours.sun],
];

const socials = [
  { icon: Camera, label: "Instagram" },
  { icon: Globe, label: "Facebook" },
  { icon: AtSign, label: "Twitter / X" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory relative overflow-hidden">
      {/* Subtle texture pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-8">
        {/* Top row — large brand + tagline */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-16 border-b border-ivory/10 pb-12">
          <div>
            <h2 className="font-display text-[40px] sm:text-[56px] lg:text-[72px] font-900 tracking-[-0.04em] leading-[0.9]">
              {salon.name.split(" ")[0]}<span className="text-gold">&</span>{salon.name.split(" & ")[1]}
            </h2>
            <p className="mt-3 font-label text-[13px] uppercase tracking-[0.2em] text-ivory/40 font-500">
              {salon.tagline}
            </p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 rounded-full border border-ivory/15 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold/40 transition-all duration-300 shrink-0 self-start sm:self-end"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20 mb-16">
          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-700 uppercase tracking-[0.15em] text-ivory/30 mb-6">
              Contact
            </h3>
            <ul className="space-y-4 text-[15px] text-ivory/60">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 shrink-0 text-gold/60" />
                <span className="leading-relaxed">{salon.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold/60" />
                <a href={`tel:${salon.phone}`} className="hover:text-gold transition-colors duration-300">
                  {salon.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold/60" />
                <a href={`mailto:${salon.email}`} className="hover:text-gold transition-colors duration-300">
                  {salon.email}
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-ivory/10 flex items-center justify-center text-ivory/30 hover:text-gold hover:border-gold/30 transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display text-sm font-700 uppercase tracking-[0.15em] text-ivory/30 mb-6 flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-gold/60" />
              Hours
            </h3>
            <ul className="space-y-2.5 text-[14px]">
              {days.map(([day, hours]) => (
                <li key={day} className="flex justify-between text-ivory/50">
                  <span className="font-600 text-ivory/70">{day}</span>
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="font-display text-sm font-700 uppercase tracking-[0.15em] text-ivory/30 mb-6">
              Location
            </h3>
            <div className="rounded-2xl overflow-hidden border border-ivory/8 aspect-[16/10] bg-ink-soft/50">
              <iframe
                src={salon.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.6) brightness(0.7) contrast(1.1)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Salon location on Google Maps"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-ivory/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-ivory/25">
          <span>&copy; {new Date().getFullYear()} {salon.name}. All rights reserved.</span>
          <span className="font-label uppercase tracking-[0.15em]">
            Crafted with care in Lagos
          </span>
        </div>
      </div>
    </footer>
  );
}
