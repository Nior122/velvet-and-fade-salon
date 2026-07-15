import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Camera, Globe, AtSign, ArrowUp } from "lucide-react";
import { salon } from "../data/salonConfig";

const days = [
  ["Mon", salon.hours.mon], ["Tue", salon.hours.tue], ["Wed", salon.hours.wed],
  ["Thu", salon.hours.thu], ["Fri", salon.hours.fri], ["Sat", salon.hours.sat],
  ["Sun", salon.hours.sun],
];

const socials = [
  { icon: Camera, label: "Instagram" },
  { icon: Globe, label: "Facebook" },
  { icon: AtSign, label: "Twitter / X" },
];

export default function Footer() {
  return (
    <footer className="bg-espresso text-ivory relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-8">
        {/* Top — brand */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-16 border-b border-ivory/8 pb-12">
          <div>
            <h2 className="font-display text-[44px] sm:text-[60px] lg:text-[76px] font-semibold tracking-[-0.03em] leading-[0.9]">
              {salon.name.split(" ")[0]} <span className="text-champagne italic">&</span> {salon.name.split(" & ")[1]}
            </h2>
            <p className="mt-3 font-label text-[12px] uppercase tracking-[0.22em] text-ivory/35">
              {salon.tagline}
            </p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 rounded-full border border-ivory/12 flex items-center justify-center text-ivory/30 hover:text-champagne hover:border-champagne/35 transition-all duration-300 shrink-0 self-start sm:self-end"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20 mb-16">
          <div>
            <h3 className="font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/25 mb-6">Contact</h3>
            <ul className="space-y-4 text-[15px] text-ivory/55">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 shrink-0 text-mauve/60" />
                <span className="leading-relaxed">{salon.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-mauve/60" />
                <a href={`tel:${salon.phone}`} className="hover:text-champagne transition-colors duration-300">{salon.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-mauve/60" />
                <a href={`mailto:${salon.email}`} className="hover:text-champagne transition-colors duration-300">{salon.email}</a>
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              {socials.map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-10 h-10 rounded-full border border-ivory/8 flex items-center justify-center text-ivory/25 hover:text-champagne hover:border-champagne/30 transition-all duration-300">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/25 mb-6 flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-mauve/60" /> Hours
            </h3>
            <ul className="space-y-2.5 text-[14px]">
              {days.map(([day, hours]) => (
                <li key={day} className="flex justify-between text-ivory/45">
                  <span className="font-semibold text-ivory/65">{day}</span>
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/25 mb-6">Location</h3>
            <div className="rounded-2xl overflow-hidden border border-ivory/6 aspect-[16/10] bg-espresso-soft/50">
              <iframe
                src={salon.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.7) brightness(0.6) sepia(0.2)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Salon location on Google Maps"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-ivory/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-ivory/20">
          <span>&copy; {new Date().getFullYear()} {salon.name}. All rights reserved.</span>
          <span className="font-label uppercase tracking-[0.18em]">Crafted with care in Lagos</span>
        </div>
      </div>
    </footer>
  );
}
