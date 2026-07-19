import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Camera, Globe, AtSign, ArrowUp } from "lucide-react";
import { salon } from "../data/salonConfig";
import BookButton from "./BookButton";

const days = [
  ["Mon — Thu", salon.hours.mon],
  ["Friday", salon.hours.fri],
  ["Saturday", salon.hours.sat],
  ["Sunday", salon.hours.sun],
];

const socials = [
  { icon: Camera, label: "Instagram", href: salon.social?.instagram },
  { icon: Globe, label: "Facebook", href: salon.social?.facebook },
  { icon: AtSign, label: "Twitter", href: salon.social?.twitter },
].filter((s) => s.href);

export default function Footer() {
  return (
    <footer className="bg-surf-0 grain text-t-prime relative border-t border-border">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 pb-10">
        {/* Brand + CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-14 border-b border-border">
          <div className="max-w-xl">
            <h2 className="display-lg text-t-prime">
              Velvet <span className="italic text-accent">&amp;</span> Fade
            </h2>
            <p className="mt-4 text-[14px] text-t-sub font-light leading-relaxed max-w-md">
              A premium unisex salon in {salon.city}. Where every style becomes your signature.
            </p>
          </div>
          <BookButton className="group inline-flex items-center gap-3 pl-8 pr-6 py-4 bg-accent text-surf-0 text-[12.5px] font-semibold uppercase tracking-[0.18em] rounded-full hover:opacity-90 transition-opacity shrink-0">
            Book Your Appointment
          </BookButton>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12 py-14">
          {/* Explore */}
          <div>
            <h3 className="kicker text-t-sub mb-6">Explore</h3>
            <ul className="space-y-3">
              {[
                { to: "/about", label: "About" },
                { to: "/services", label: "Services" },
                { to: "/gallery", label: "Gallery" },
                { to: "/team", label: "Our Team" },
                { to: "/pricing", label: "Pricing" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-[13.5px] text-t-sub hover:text-accent transition-colors font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="kicker text-t-sub mb-6">Contact</h3>
            <ul className="space-y-4 text-[13.5px] text-t-sub font-light">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent/70" />
                <span className="leading-relaxed">{salon.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent/70" />
                <a href={`tel:${salon.phone}`} className="hover:text-accent transition-colors">{salon.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent/70" />
                <a href={`mailto:${salon.email}`} className="hover:text-accent transition-colors break-all">{salon.email}</a>
              </li>
            </ul>
            {socials.length > 0 && (
              <div className="flex gap-3 mt-6">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 border border-border flex items-center justify-center text-t-sub hover:text-accent hover:border-accent/50 transition-colors rounded-full"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Hours */}
          <div>
            <h3 className="kicker text-t-sub mb-6 flex items-center gap-2">
              <Clock className="h-3 w-3" /> Hours
            </h3>
            <ul className="space-y-3 text-[13px]">
              {days.map(([day, hours]) => (
                <li key={day} className="flex flex-col text-t-sub font-light">
                  <span className="text-t-prime font-medium">{day}</span>
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Find us */}
          <div>
            <h3 className="kicker text-t-sub mb-6">Find Us</h3>
            <div className="overflow-hidden rounded-[4px] border border-border aspect-[4/3]">
              <iframe
                src={salon.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.5) brightness(0.7) contrast(1.05)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Velvet & Fade location"
              />
            </div>
            <a href={salon.directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-[12.5px] text-accent hover:text-t-prime transition-colors link-underline">
              Get Directions
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-t-sub font-light">
          <span>&copy; {new Date().getFullYear()} {salon.name}. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <span className="uppercase tracking-[0.2em]">Lekki Phase 1 · Lagos · Nigeria</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-9 h-9 border border-border flex items-center justify-center text-t-sub hover:text-accent hover:border-accent/50 transition-colors rounded-full"
              aria-label="Back to top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
      {/* spacer so mobile sticky bar never covers footer end */}
      <div className="h-20 xl:hidden" aria-hidden="true" />
    </footer>
  );
}
