import { serviceCategories } from "../data/salonConfig";
import { formatPrice, formatDuration } from "../hooks/useBooking";
import SectionReveal from "../components/SectionReveal";
import PageHero from "../components/PageHero";
import BookButton from "../components/BookButton";
import { ArrowRight } from "lucide-react";

const allCategories = Object.entries(serviceCategories);

export default function Pricing() {
  return (
    <main className="bg-surf-1 min-h-screen pb-28 sm:pb-32">
      <PageHero
        eyebrow="The Price List"
        title="Investment"
        subtitle="Transparent pricing for premium services — no hidden fees, no surprises. All prices in Nigerian Naira (₦)."
        image="https://images.unsplash.com/photo-1633681926035-ec1ac984418a?w=1400&q=80"
      />

      <div className="mx-auto max-w-[920px] px-6 sm:px-10 pt-16 sm:pt-24">
        {allCategories.map(([key, cat], catIndex) => (
          <SectionReveal key={key} delay={Math.min(catIndex * 0.04, 0.2)}>
            <div className="mb-16">
              <div className="flex items-baseline justify-between border-b border-border pb-4 mb-2">
                <h2 className="display-lg text-t-prime text-[clamp(26px,4vw,40px)]">{cat.label}</h2>
                <span className="kicker text-t-sub">
                  {cat.gender === "men" ? "Him" : cat.gender === "women" ? "Her" : "All"}
                </span>
              </div>
              <div>
                {cat.services.map((svc) => (
                  <div key={svc.id} className="flex items-baseline gap-4 py-5 border-b border-border group">
                    <div className="min-w-0">
                      <h3 className="font-display text-[20px] text-t-prime group-hover:text-accent-d transition-colors inline">
                        {svc.name}
                      </h3>
                      <p className="text-[13px] text-t-sub mt-1 font-light">{svc.description}</p>
                    </div>
                    <span className="flex-1 border-b border-dotted border-border translate-y-[-4px] min-w-6" aria-hidden="true" />
                    <div className="text-right shrink-0">
                      <span className="text-[17px] font-medium text-accent-d block">{formatPrice(svc.price)}</span>
                      <span className="text-[11px] text-t-sub uppercase tracking-wider">{formatDuration(svc.duration)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        ))}

        <SectionReveal>
          <div className="text-center mt-8 pt-12 border-t border-border">
            <p className="text-[14px] text-t-sub font-light mb-8 max-w-md mx-auto">
              Prices may vary for special requests and consultations. Get in touch and we'll happily advise.
            </p>
            <BookButton className="group inline-flex items-center gap-3 pl-8 pr-6 py-4 bg-accent text-surf-0 text-[12.5px] font-semibold uppercase tracking-[0.18em] rounded-full hover:opacity-90 transition-opacity">
              Book Your Appointment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </BookButton>
          </div>
        </SectionReveal>
      </div>
    </main>
  );
}
