import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Camera, Globe, AtSign, ArrowUp, Send } from "lucide-react";
import { salon } from "../data/salonConfig";
import { useState } from "react";

const days = [
  ["Monday", salon.hours.mon], ["Tuesday", salon.hours.tue], ["Wednesday", salon.hours.wed],
  ["Thursday", salon.hours.thu], ["Friday", salon.hours.fri], ["Saturday", salon.hours.sat],
  ["Sunday", salon.hours.sun],
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-espresso text-ivory">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 pb-8">
        {/* Newsletter + Brand */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16 pb-14 border-b border-ivory/8">
          <div className="max-w-lg">
            <h2 className="font-display text-[42px] sm:text-[56px] lg:text-[68px] leading-[0.9] tracking-[-0.02em] font-light">
              {salon.name.split(" ")[0]}{" "}
              <span className="text-champagne italic">&</span>{" "}
              {salon.name.split(" & ")[1]}
            </h2>
            <p className="mt-4 text-[13px] uppercase tracking-[0.25em] text-ivory/30 font-medium">
              {salon.tagline}
            </p>

            <div className="mt-8">
              <p className="text-[13px] text-ivory/40 mb-3 font-light">Subscribe for exclusive offers & styling tips</p>
              {subscribed ? (
                <p className="text-[13px] text-success font-medium">Thank you for subscribing!</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 max-w-xs px-5 py-3 bg-ivory/5 border border-ivory/10 rounded-full text-[13px] text-ivory placeholder:text-ivory/25 focus:outline-none focus:border-champagne/30 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-copper text-ivory rounded-full hover:bg-copper/90 transition-all flex items-center gap-2"
                    aria-label="Subscribe"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 border border-ivory/10 flex items-center justify-center text-ivory/30 hover:text-champagne hover:border-champagne/30 transition-all rounded-full shrink-0 lg:self-end"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 mb-16">
          {/* Quick Links */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-ivory/25 mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { to: "/services", label: "Services" },
                { to: "/booking", label: "Book Now" },
                { to: "/about", label: "About Us" },
                { to: "/gallery", label: "Gallery" },
                { to: "/team", label: "Our Team" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-[13px] text-ivory/40 hover:text-champagne transition-colors font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-ivory/25 mb-6">Contact</h3>
            <ul className="space-y-4 text-[13px] text-ivory/40 font-light">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-champagne/40" />
                <span className="leading-relaxed">{salon.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-champagne/40" />
                <a href={`tel:${salon.phone}`} className="hover:text-champagne transition-colors">{salon.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-champagne/40" />
                <a href={`mailto:${salon.email}`} className="hover:text-champagne transition-colors">{salon.email}</a>
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              {[
                { icon: Camera, label: "Instagram" },
                { icon: Globe, label: "Facebook" },
                { icon: AtSign, label: "Twitter" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 border border-ivory/8 flex items-center justify-center text-ivory/25 hover:text-champagne hover:border-champagne/30 transition-all rounded-full"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-ivory/25 mb-6 flex items-center gap-2">
              <Clock className="h-3 w-3 text-champagne/40" /> Opening Hours
            </h3>
            <ul className="space-y-2.5 text-[12.5px]">
              {days.map(([day, hours]) => (
                <li key={day} className="flex justify-between text-ivory/35 font-light">
                  <span className="font-medium text-ivory/50">{day}</span>
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-ivory/25 mb-6">Find Us</h3>
            <div className="overflow-hidden rounded-[20px] border border-ivory/8 aspect-[16/10]">
              <iframe
                src={salon.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.6) brightness(0.5) sepia(0.2)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Salon location on Google Maps"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-ivory/6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-ivory/20 font-light">
          <span>&copy; {new Date().getFullYear()} {salon.name}. All rights reserved.</span>
          <span className="uppercase tracking-[0.2em]">Lekki Phase 1, Lagos, Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
