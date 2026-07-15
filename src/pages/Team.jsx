import { team, salon } from "../data/salonConfig";
import SectionReveal from "../components/SectionReveal";

export default function Team() {
  return (
    <main className="pt-[76px] pb-24 sm:pb-32 bg-ivory min-h-screen">
      <div className="bg-espresso relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-espresso via-espresso to-espresso/90" />
        <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
          <SectionReveal>
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-champagne">The People</span>
            <h1 className="font-display text-[42px] sm:text-[56px] lg:text-[64px] text-ivory mt-3 tracking-[-0.02em] leading-[0.92] font-light">
              Our <span className="italic">Team</span>
            </h1>
            <p className="mt-5 text-ivory/40 max-w-md text-[16px] leading-relaxed font-light">
              {salon.stats.find(s => s.label === "Stylists & barbers")?.value} talented professionals, each bringing their own artistry to every appointment.
            </p>
          </SectionReveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {team.map((member, i) => (
            <SectionReveal key={member.name} delay={i * 0.06}>
              <div className="group bg-white rounded-[24px] overflow-hidden shadow-[0_2px_20px_rgba(42,30,27,0.04)] hover:shadow-[0_20px_60px_rgba(42,30,27,0.1)] transition-all duration-500">
                <div className="aspect-[3/4] overflow-hidden bg-blush">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-[22px] text-espresso font-medium">{member.name}</h3>
                  <p className="text-[14px] text-copper font-semibold mt-2">{member.role}</p>
                  <p className="text-[13px] text-charcoal/30 mt-2 font-light leading-relaxed">{member.specialty}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </main>
  );
}
