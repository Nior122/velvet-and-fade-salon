import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Camera, Globe, AtSign } from "lucide-react";
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
  { icon: Camera, label: "Instagram", href: "#" },
  { icon: Globe, label: "Facebook", href: "#" },
  { icon: AtSign, label: "Twitter / X", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-cream/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-copper" />
                <span>{salon.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-copper" />
                <a href={`tel:${salon.phone}`} className="hover:text-copper transition-colors">
                  {salon.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-copper" />
                <a href={`mailto:${salon.email}`} className="hover:text-copper transition-colors">
                  {salon.email}
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-5">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-9 w-9 rounded-full bg-warmgray/40 flex items-center justify-center text-cream/60 hover:bg-copper hover:text-charcoal transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-copper" />
              Business Hours
            </h3>
            <ul className="space-y-2 text-sm">
              {days.map(([day, hours]) => (
                <li key={day} className="flex justify-between text-cream/70">
                  <span className="font-medium text-cream/90">{day}</span>
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Find Us</h3>
            <div className="rounded-xl overflow-hidden border border-warmgray/30 aspect-[4/3]">
              <iframe
                src={salon.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Salon location on Google Maps"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-warmgray/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40">
          <span>&copy; {new Date().getFullYear()} {salon.name}. All rights reserved.</span>
          <Link to="/" className="hover:text-copper transition-colors">
            {salon.name} &mdash; {salon.tagline}
          </Link>
        </div>
      </div>
    </footer>
  );
}
