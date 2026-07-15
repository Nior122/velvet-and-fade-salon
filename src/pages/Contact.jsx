import { salon } from "../data/salonConfig";
import SectionReveal from "../components/SectionReveal";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <main className="pt-[76px] pb-24 sm:pb-32 bg-ivory min-h-screen">
      <div className="bg-espresso relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-espresso via-espresso to-espresso/90" />
        <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
          <SectionReveal>
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-champagne">Get In Touch</span>
            <h1 className="font-display text-[42px] sm:text-[56px] lg:text-[64px] text-ivory mt-3 tracking-[-0.02em] leading-[0.92] font-light">
              Contact <span className="italic">Us</span>
            </h1>
            <p className="mt-5 text-ivory/40 max-w-md text-[16px] leading-relaxed font-light">
              We'd love to hear from you. Reach out for bookings, enquiries, or just to say hello.
            </p>
          </SectionReveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <SectionReveal>
            <div className="space-y-10">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-champagne" />
                </div>
                <div>
                  <h3 className="font-display text-[20px] text-espresso font-medium">Visit Us</h3>
                  <p className="text-[14px] text-charcoal/40 mt-1 font-light leading-relaxed">{salon.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-champagne" />
                </div>
                <div>
                  <h3 className="font-display text-[20px] text-espresso font-medium">Call Us</h3>
                  <a href={`tel:${salon.phone}`} className="text-[14px] text-charcoal/40 mt-1 font-light block hover:text-copper transition-colors">
                    {salon.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-champagne" />
                </div>
                <div>
                  <h3 className="font-display text-[20px] text-espresso font-medium">Email Us</h3>
                  <a href={`mailto:${salon.email}`} className="text-[14px] text-charcoal/40 mt-1 font-light block hover:text-copper transition-colors">
                    {salon.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-champagne" />
                </div>
                <div>
                  <h3 className="font-display text-[20px] text-espresso font-medium">Opening Hours</h3>
                  <div className="text-[14px] text-charcoal/40 mt-1 font-light space-y-1">
                    <p>Mon – Thu: 9:00 AM – 8:00 PM</p>
                    <p>Fri – Sat: 9:00 AM – 9:00 PM</p>
                    <p>Sunday: 12:00 PM – 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Map */}
          <SectionReveal delay={0.1}>
            <div className="rounded-[28px] overflow-hidden border border-charcoal/8 aspect-[4/3] shadow-[0_20px_80px_rgba(42,30,27,0.08)]">
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
          </SectionReveal>
        </div>
      </div>
    </main>
  );
}
