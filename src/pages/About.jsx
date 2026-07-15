import { salon, team } from "../data/salonConfig";
import SectionReveal from "../components/SectionReveal";

export default function About() {
  return (
    <main className="pt-[72px] sm:pt-[80px] pb-20 sm:pb-32 bg-ivory min-h-screen">
      {/* Hero header */}
      <div className="bg-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "20px 20px" }} />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
          <SectionReveal>
            <span className="font-label text-[11px] font-600 uppercase tracking-[0.3em] text-gold">
              Our Story
            </span>
            <h1 className="font-display text-[36px] sm:text-[48px] lg:text-[56px] font-900 text-ivory mt-3 tracking-[-0.04em] leading-[0.95]">
              About {salon.name}
            </h1>
          </SectionReveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* ── Story — asymmetric editorial ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 py-16 sm:py-24">
          <SectionReveal className="lg:col-span-7">
            <div className="relative">
              <div className="aspect-[4/3] rounded-[24px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=900&q=80"
                  alt="Inside Velvet & Fade"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Overlapping accent image */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 lg:-right-12 w-[45%] aspect-[3/4] rounded-[20px] overflow-hidden border-4 border-ivory shadow-[0_12px_40px_rgba(26,31,22,0.12)]">
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
            <div className="lg:pl-6">
              <span className="font-label text-[11px] font-600 uppercase tracking-[0.3em] text-gold">
                Since {salon.foundedYear}
              </span>
              <h2 className="font-display text-[28px] sm:text-[34px] font-800 text-ink mt-3 tracking-[-0.03em] leading-tight">
                Built for Everyone
              </h2>
              <p className="mt-5 text-[15px] text-ink/50 leading-[1.8]">
                When Adaeze Okonkwo opened the doors of {salon.name} in {salon.foundedYear},
                the idea was simple but uncommon in Lagos: one salon where men and
                women receive the same calibre of care, under one roof.
              </p>
              <p className="mt-4 text-[15px] text-ink/50 leading-[1.8]">
                Five years on, that vision holds. Our team of {salon.stats.find(s => s.label === "Stylists & barbers")?.value} stylists and
                barbers are trained across disciplines — every one of them can
                hold a conversation about a classic taper and a balayage in the
                same breath.
              </p>
              <p className="mt-4 text-[15px] text-ink/50 leading-[1.8]">
                {salon.founderBio}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-10">
                {salon.stats.map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-display text-[26px] sm:text-[30px] font-900 text-forest tracking-[-0.03em] leading-none">
                      {value}
                    </p>
                    <p className="font-label text-[10px] uppercase tracking-[0.2em] text-ink/35 font-600 mt-2">
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
          <div className="text-center mb-12">
            <span className="font-label text-[11px] font-600 uppercase tracking-[0.3em] text-gold">
              The People
            </span>
            <h2 className="font-display text-[32px] sm:text-[40px] font-800 text-ink mt-3 tracking-[-0.03em]">
              Meet Our Team
            </h2>
            <p className="mt-3 text-ink/45 text-[15px] max-w-md mx-auto">
              Stylists, barbers, colourists, and therapists who make it all happen.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-20 sm:mb-28">
          {team.map((member, i) => (
            <SectionReveal key={member.name} delay={i * 0.06}>
              <div className="group bg-white rounded-[20px] overflow-hidden shadow-[0_2px_20px_rgba(26,31,22,0.04)] hover:shadow-[0_8px_40px_rgba(26,31,22,0.1)] transition-shadow duration-500">
                <div className="aspect-[3/4] overflow-hidden bg-sand/30">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-[17px] font-700 text-ink tracking-[-0.01em]">
                    {member.name}
                  </h3>
                  <p className="text-[13px] text-forest font-label font-600 mt-1">
                    {member.role}
                  </p>
                  <p className="text-[12px] text-ink/35 mt-1.5">{member.specialty}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* ── Interior gallery ── */}
        <SectionReveal>
          <div className="mb-10">
            <span className="font-label text-[11px] font-600 uppercase tracking-[0.3em] text-gold">
              The Space
            </span>
            <h2 className="font-display text-[28px] sm:text-[36px] font-800 text-ink mt-3 tracking-[-0.03em]">
              Inside {salon.name}
            </h2>
          </div>
        </SectionReveal>

        {/* Masonry-ish gallery */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80", aspect: "aspect-square" },
            { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80", aspect: "aspect-[3/4]" },
            { src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80", aspect: "aspect-[3/4]" },
            { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80", aspect: "aspect-square" },
          ].map((item, i) => (
            <SectionReveal key={i} delay={i * 0.06}>
              <div className={`${item.aspect} rounded-[16px] overflow-hidden bg-sand/30`}>
                <img
                  src={item.src}
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
