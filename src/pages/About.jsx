import { salon, team } from "../data/salonConfig";
import SectionReveal from "../components/SectionReveal";

export default function About() {
  return (
    <main className="pt-24 sm:pt-28 pb-16 sm:pb-24 bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Hero header ── */}
        <SectionReveal>
          <div className="text-center mb-14">
            <span className="font-label text-[11px] uppercase tracking-[0.25em] text-copper">
              Our Story
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mt-2">
              About {salon.name}
            </h1>
          </div>
        </SectionReveal>

        {/* ── Story ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
          <SectionReveal>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=900&q=80"
                alt="Inside Velvet & Fade salon"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal">
                Built for Everyone
              </h2>
              <p className="mt-4 text-stone leading-relaxed">
                When Adaeze Okonkwo opened the doors of {salon.name} in {salon.foundedYear},
                the idea was simple but uncommon in Lagos: one salon where men and
                women receive the same calibre of care, without compromise. No
                "men's section" shoved to the back. No women's menu padded with
                filler. Just honest, skilled work for anyone who walks in.
              </p>
              <p className="mt-4 text-stone leading-relaxed">
                Five years on, that vision holds. Our team of {salon.stats.find(s => s.label === "Stylists & barbers")?.value} stylists and
                barbers are trained across disciplines &mdash; every one of them can
                hold a conversation about a classic taper and a balayage in the
                same breath.
              </p>
              <p className="mt-4 text-stone leading-relaxed">
                {salon.founderBio}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
                {salon.stats.map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-display text-2xl sm:text-3xl font-bold text-copper">
                      {value}
                    </p>
                    <p className="text-xs text-stone mt-1 font-label uppercase tracking-wider">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>

        {/* ── Team ── */}
        <SectionReveal>
          <div className="text-center mb-10">
            <span className="font-label text-[11px] uppercase tracking-[0.25em] text-copper">
              The People
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mt-2">
              Meet Our Team
            </h2>
            <p className="mt-2 text-stone text-sm max-w-md mx-auto">
              Stylists, barbers, colourists, and therapists who make it all happen.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {team.map((member, i) => (
            <SectionReveal key={member.name} delay={i * 0.06}>
              <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] overflow-hidden bg-stone/10">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-charcoal">
                    {member.name}
                  </h3>
                  <p className="text-sm text-copper font-medium mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-xs text-stone mt-1">{member.specialty}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* ── Interior gallery ── */}
        <SectionReveal>
          <div className="text-center mb-8">
            <span className="font-label text-[11px] uppercase tracking-[0.25em] text-copper">
              The Space
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal mt-2">
              Inside {salon.name}
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {[
            "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
            "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80",
            "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
          ].map((src, i) => (
            <SectionReveal key={i} delay={i * 0.06}>
              <div className="aspect-square rounded-xl overflow-hidden bg-stone/10">
                <img
                  src={src}
                  alt={`${salon.name} interior ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </main>
  );
}
