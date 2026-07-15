import { serviceCategories } from "../data/salonConfig";
import { formatPrice, formatDuration } from "../hooks/useBooking";
import SectionReveal from "../components/SectionReveal";
import { Link } from "react-router-dom";

const allCategories = Object.entries(serviceCategories);

export default function Pricing() {
  return (
    <main className="pt-[76px] pb-24 sm:pb-32 bg-ivory min-h-screen">
      <div className="bg-espresso relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-espresso via-espresso to-espresso/90" />
        <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
          <SectionReveal>
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-champagne">Investment</span>
            <h1 className="font-display text-[42px] sm:text-[56px] lg:text-[64px] text-ivory mt-3 tracking-[-0.02em] leading-[0.92] font-light">
              Our <span className="italic">Pricing</span>
            </h1>
            <p className="mt-5 text-ivory/40 max-w-md text-[16px] leading-relaxed font-light">
              Transparent pricing for premium services. No hidden fees, no surprises.
            </p>
          </SectionReveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1000px] px-6 sm:px-10 pt-16 sm:pt-20">
        {allCategories.map(([key, cat], catIndex) => (
          <SectionReveal key={key} delay={catIndex * 0.05}>
            <div className="mb-14">
              <h2 className="font-display text-[28px] sm:text-[34px] text-espresso tracking-[-0.02em] font-light mb-6 pb-4 border-b border-charcoal/8">
                {cat.label}
              </h2>
              <div className="space-y-0">
                {cat.services.map((svc) => (
                  <div key={svc.id} className="flex items-center justify-between py-5 border-b border-charcoal/5 group">
                    <div className="flex-1 min-w-0 mr-6">
                      <h3 className="font-display text-[18px] text-espresso font-medium group-hover:text-copper transition-colors">
                        {svc.name}
                      </h3>
                      <p className="text-[13px] text-charcoal/35 mt-1 font-light">{svc.description}</p>
                    </div>
                    <div className="text-right shrink-0 flex items-center gap-6">
                      <span className="text-[12px] text-charcoal/25 font-medium uppercase tracking-wider hidden sm:block">
                        {formatDuration(svc.duration)}
                      </span>
                      <span className="text-[16px] font-semibold text-copper min-w-[80px] text-right">
                        {formatPrice(svc.price)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        ))}

        <SectionReveal>
          <div className="text-center mt-10 pt-10 border-t border-charcoal/8">
            <p className="text-[14px] text-charcoal/35 font-light mb-6">
              All prices are in Nigerian Naira (₦). Prices may vary for special requests.
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-copper text-ivory text-[13px] font-semibold uppercase tracking-wider rounded-full hover:bg-copper/90 transition-all duration-300 shadow-[0_4px_24px_rgba(184,107,75,0.3)]"
            >
              Book Your Appointment
            </Link>
          </div>
        </SectionReveal>
      </div>
    </main>
  );
}
