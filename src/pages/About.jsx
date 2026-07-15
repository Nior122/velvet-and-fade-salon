import { salon, team } from "../data/salonConfig";
import SectionReveal from "../components/SectionReveal";

export default function About() {
  return (
    <main className="pt-[68px] pb-20 sm:pb-28 bg-ivory min-h-screen">
      <div className="bg-brown relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
          <SectionReveal>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-rose">Our Story</span>
            <h1 className="font-display text-[36px] sm:text-[48px] lg:text-[56px] text-ivory mt-3 tracking-[-0.02em] leading-[0.95]">About {salon.name}</h1>
          </SectionReveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 py-16 sm:py-24">
          <SectionReveal className="lg:col-span-7">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=900&q=80" alt="Inside Velvet & Fade" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="hidden sm:block absolute -bottom-6 -right-4 lg:-right-10 w-[45%] aspect-[3/4] rounded-2xl overflow-hidden border-4 border-ivory shadow-[0_10px_36px_rgba(46,36,32,0.12)]">
                <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80" alt="Styling in progress" loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1} className="lg:col-span-5 flex items-center">
            <div className="lg:pl-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-rose">Since {salon.foundedYear}</span>
              <h2 className="font-display text-[28px] sm:text-[34px] text-brown mt-3 tracking-[-0.02em] leading-tight">Built for Everyone</h2>
              <p className="mt-5 text-[15px] text-brown/45 leading-[1.8]">
                When Adaeze Okonkwo opened the doors of {salon.name} in {salon.foundedYear},
                the idea was simple but uncommon in Lagos: one salon where men and
                women receive the same calibre of care, under one roof.
              </p>
              <p className="mt-4 text-[15px] text-brown/45 leading-[1.8]">
                Five years on, that vision holds. Our team of {salon.stats.find(s => s.label === "Stylists & barbers")?.value} stylists and
                barbers are trained across disciplines — every one of them can
                hold a conversation about a classic taper and a balayage in the same breath.
              </p>
              <p className="mt-4 text-[15px] text-brown/45 leading-[1.8]">{salon.founderBio}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-10">
                {salon.stats.map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-display text-[26px] sm:text-[30px] text-rose-deep tracking-[-0.02em] leading-none">{value}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-brown/30 font-bold mt-2">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>

        <SectionReveal>
          <div className="text-center mb-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-rose">The People</span>
            <h2 className="font-display text-[32px] sm:text-[40px] text-brown mt-3 tracking-[-0.02em]">Meet Our Team</h2>
            <p className="mt-3 text-brown/40 text-[15px] max-w-md mx-auto">Stylists, barbers, colourists, and therapists.</p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-20 sm:mb-28">
          {team.map((member, i) => (
            <SectionReveal key={member.name} delay={i * 0.06}>
              <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(46,36,32,0.05)] hover:shadow-[0_10px_40px_rgba(46,36,32,0.1)] transition-shadow duration-500">
                <div className="aspect-[3/4] overflow-hidden bg-blush">
                  <img src={member.image} alt={member.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-[17px] text-brown">{member.name}</h3>
                  <p className="text-[13px] text-rose-deep font-semibold mt-1">{member.role}</p>
                  <p className="text-[12px] text-brown/30 mt-1">{member.specialty}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <div className="mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-rose">The Space</span>
            <h2 className="font-display text-[28px] sm:text-[36px] text-brown mt-3 tracking-[-0.02em]">Inside {salon.name}</h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80", aspect: "aspect-square" },
            { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80", aspect: "aspect-[3/4]" },
            { src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80", aspect: "aspect-[3/4]" },
            { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80", aspect: "aspect-square" },
          ].map((item, i) => (
            <SectionReveal key={i} delay={i * 0.06}>
              <div className={`${item.aspect} rounded-xl overflow-hidden bg-blush`}>
                <img src={item.src} alt={`${salon.name} interior ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </main>
  );
}
