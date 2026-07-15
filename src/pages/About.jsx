import { salon, team } from "../data/salonConfig";
import SectionReveal from "../components/SectionReveal";

export default function About() {
  return (
    <main className="pt-[76px] pb-24 sm:pb-32 bg-ivory min-h-screen">
      <div className="bg-espresso relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-espresso via-espresso to-espresso/90" />
        <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
          <SectionReveal>
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-champagne">Our Story</span>
            <h1 className="font-display text-[42px] sm:text-[56px] lg:text-[64px] text-ivory mt-3 tracking-[-0.02em] leading-[0.92] font-light">
              About {salon.name}
            </h1>
          </SectionReveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 py-20 sm:py-28">
          <SectionReveal className="lg:col-span-7">
            <div className="relative">
              <div className="aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_20px_80px_rgba(42,30,27,0.1)]">
                <img
                  src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=900&q=80"
                  alt="Inside Velvet & Fade"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-8 -right-6 lg:-right-12 w-[45%] aspect-[3/4] rounded-[24px] overflow-hidden border-4 border-ivory shadow-[0_16px_48px_rgba(42,30,27,0.12)]">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80"
                  alt="Styling in progress"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1} className="lg:col-span-5 flex items-center">
            <div className="lg:pl-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-champagne">Since {salon.foundedYear}</span>
              <h2 className="font-display text-[32px] sm:text-[40px] text-espresso mt-3 tracking-[-0.02em] leading-tight font-light">
                Built for <span className="italic">Everyone</span>
              </h2>
              <p className="mt-6 text-[15px] text-charcoal/45 leading-[1.9] font-light">
                When {salon.founderName} opened the doors of {salon.name} in {salon.foundedYear},
                the idea was simple but uncommon in Lagos: one salon where men and
                women receive the same calibre of care, under one roof.
              </p>
              <p className="mt-4 text-[15px] text-charcoal/45 leading-[1.9] font-light">
                Five years on, that vision holds. Our team of {salon.stats.find(s => s.label === "Stylists & barbers")?.value} stylists and
                barbers are trained across disciplines — every one of them can
                hold a conversation about a classic taper and a balayage in the same breath.
              </p>
              <p className="mt-4 text-[15px] text-charcoal/45 leading-[1.9] font-light">{salon.founderBio}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
                {salon.stats.map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-display text-[28px] sm:text-[34px] text-copper tracking-[-0.02em] leading-none font-light">{value}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/25 font-semibold mt-2">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>

        {/* Team Section */}
        <SectionReveal>
          <div className="text-center mb-14">
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-champagne">The People</span>
            <h2 className="font-display text-[36px] sm:text-[48px] text-espresso mt-3 tracking-[-0.02em] font-light">
              Meet Our <span className="italic">Team</span>
            </h2>
            <p className="mt-3 text-charcoal/35 text-[15px] max-w-md mx-auto font-light">Stylists, barbers, colourists, and therapists.</p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-28">
          {team.map((member, i) => (
            <SectionReveal key={member.name} delay={i * 0.06}>
              <div className="group bg-white rounded-[24px] overflow-hidden shadow-[0_2px_20px_rgba(42,30,27,0.04)] hover:shadow-[0_20px_60px_rgba(42,30,27,0.1)] transition-shadow duration-500">
                <div className="aspect-[3/4] overflow-hidden bg-blush">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <h3 className="font-display text-[20px] text-espresso font-medium">{member.name}</h3>
                  <p className="text-[13px] text-copper font-semibold mt-1.5">{member.role}</p>
                  <p className="text-[12px] text-charcoal/25 mt-1 font-light">{member.specialty}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Gallery */}
        <SectionReveal>
          <div className="mb-12">
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-champagne">The Space</span>
            <h2 className="font-display text-[32px] sm:text-[40px] text-espresso mt-3 tracking-[-0.02em] font-light">
              Inside <span className="italic">{salon.name}</span>
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {[
            { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80", aspect: "aspect-square" },
            { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80", aspect: "aspect-[3/4]" },
            { src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80", aspect: "aspect-[3/4]" },
            { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80", aspect: "aspect-square" },
          ].map((item, i) => (
            <SectionReveal key={i} delay={i * 0.06}>
              <div className={`${item.aspect} rounded-[20px] overflow-hidden bg-blush group`}>
                <img
                  src={item.src}
                  alt={`${salon.name} interior ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </main>
  );
}
