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
    <footer className="bg-black text-white relative">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-8">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-16 border-b border-white/10 pb-12">
          <div>
            <h2 className="font-display text-[36px] sm:text-[48px] lg:text-[60px] font-extrabold uppercase tracking-[-0.04em] leading-[0.9]">
              {salon.name.split(" ")[0]}{" "}
              <span className="text-lime">&</span>{" "}
              {salon.name.split(" & ")[1]}
            </h2>
            <p className="mt-3 font-label text-[11px] uppercase tracking-[0.25em] text-white/30 font-bold">
              {salon.tagline}
            </p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/30 hover:text-lime hover:border-lime/40 transition-all shrink-0 self-start sm:self-end"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20 mb-16">
          <div>
            <h3 className="font-label text-[10px] font-bold uppercase tracking-[0.25em] text-white/25 mb-6">Contact</h3>
            <ul className="space-y-4 text-[14px] text-white/50">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-lime/50" />
                <span className="leading-relaxed">{salon.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-lime/50" />
                <a href={`tel:${salon.phone}`} className="hover:text-lime transition-colors">{salon.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-lime/50" />
                <a href={`mailto:${salon.email}`} className="hover:text-lime transition-colors">{salon.email}</a>
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              {socials.map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/25 hover:text-lime hover:border-lime/30 transition-all">
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-label text-[10px] font-bold uppercase tracking-[0.25em] text-white/25 mb-6 flex items-center gap-2">
              <Clock className="h-3 w-3 text-lime/50" /> Hours
            </h3>
            <ul className="space-y-2 text-[13px]">
              {days.map(([day, hours]) => (
                <li key={day} className="flex justify-between text-white/40">
                  <span className="font-bold text-white/60">{day}</span>
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-label text-[10px] font-bold uppercase tracking-[0.25em] text-white/25 mb-6">Location</h3>
            <div className="overflow-hidden border border-white/8 aspect-[16/10]">
              <iframe
                src={salon.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) brightness(0.4) contrast(1.2)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Salon location on Google Maps"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-white/20 font-bold uppercase tracking-[0.2em]">
          <span>&copy; {new Date().getFullYear()} {salon.name}</span>
          <span>Lagos, Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
