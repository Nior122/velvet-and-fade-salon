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
    <footer className="bg-brown text-ivory">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-8">
        {/* Top — brand */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-14 border-b border-ivory/10 pb-10">
          <div>
            <h2 className="font-display text-[36px] sm:text-[48px] lg:text-[58px] leading-[0.9] tracking-[-0.02em]">
              {salon.name.split(" ")[0]}{" "}
              <span className="text-rose italic">&</span>{" "}
              {salon.name.split(" & ")[1]}
            </h2>
            <p className="mt-3 text-[12px] uppercase tracking-[0.22em] text-ivory/40 font-semibold">
              {salon.tagline}
            </p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 border border-ivory/15 flex items-center justify-center text-ivory/30 hover:text-rose hover:border-rose/40 transition-all shrink-0 self-start sm:self-end"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20 mb-14">
          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ivory/30 mb-5">Contact</h3>
            <ul className="space-y-3.5 text-[14px] text-ivory/65">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-rose/60" />
                <span className="leading-relaxed">{salon.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-rose/60" />
                <a href={`tel:${salon.phone}`} className="hover:text-rose transition-colors">{salon.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-rose/60" />
                <a href={`mailto:${salon.email}`} className="hover:text-rose transition-colors">{salon.email}</a>
              </li>
            </ul>
            <div className="flex gap-3 mt-5">
              {socials.map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-9 h-9 border border-ivory/10 flex items-center justify-center text-ivory/30 hover:text-rose hover:border-rose/30 transition-all">
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ivory/30 mb-5 flex items-center gap-2">
              <Clock className="h-3 w-3 text-rose/60" /> Hours
            </h3>
            <ul className="space-y-2 text-[13px]">
              {days.map(([day, hours]) => (
                <li key={day} className="flex justify-between text-ivory/50">
                  <span className="font-semibold text-ivory/70">{day}</span>
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ivory/30 mb-5">Location</h3>
            <div className="overflow-hidden border border-ivory/8 aspect-[16/10]">
              <iframe
                src={salon.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.5) brightness(0.65) sepia(0.15)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Salon location on Google Maps"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-ivory/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-ivory/25">
          <span>&copy; {new Date().getFullYear()} {salon.name}. All rights reserved.</span>
          <span className="uppercase tracking-[0.15em]">Lagos, Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
