import { salon, team, experience } from "../data/salonConfig";
import SectionReveal from "../components/SectionReveal";
import PageHero from "../components/PageHero";
import BookButton from "../components/BookButton";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <main className="bg-surf-1 min-h-screen pb-28 sm:pb-32">
      <PageHero
        eyebrow="Our Story"
        title="About"
        emphasis={salon.name}
        image="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1400&q=80"
      />

      {/* Story */}
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 py-20 sm:py-28 items-center">
          <SectionReveal className="lg:col-span-7">
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-[6px]">
                <img
                  src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1000&q=80"
                  alt="Inside Velvet & Fade"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-10 -right-6 lg:-right-12 w-[44%] aspect-[3/4] overflow-hidden rounded-[6px] border-8 border-surf-1">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80"
                  alt="Styling in progress"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1} className="lg:col-span-5">
            <span className="kicker">Since {salon.foundedYear}</span>
            <h2 className="display-lg text-t-prime mt-4">
              Built for <span className="italic text-accent">everyone.</span>
            </h2>
            <p className="mt-7 text-[15.5px] text-t-sub leading-[1.9] font-light">
              When {salon.founderName} opened the doors of {salon.name} in {salon.foundedYear},
              the idea was simple but uncommon in Lagos: one salon where men and women receive
              the same calibre of care, under one roof.
            </p>
            <p className="mt-4 text-[15.5px] text-t-sub leading-[1.9] font-light">
              {salon.founderBio}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-8 border-t border-border">
              {salon.stats.map(({ label, value }) => (
                <div key={label}>
                  <p className="font-display text-[32px] text-accent-d tracking-[-0.02em] leading-none">{value}</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-t-sub font-semibold mt-2">{label}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>

        {/* Philosophy pillars */}
        <SectionReveal>
          <div className="border-t border-border pt-16">
            <span className="kicker">{experience.eyebrow}</span>
            <h2 className="display-lg text-t-prime mt-4 max-w-3xl">
              {experience.statement}
            </h2>
          </div>
        </SectionReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10 mt-12 mb-24">
          {experience.pillars.map((p, i) => (
            <SectionReveal key={p.title} delay={i * 0.08}>
              <div className="border-t border-border pt-5">
                <span className="font-display text-[18px] text-accent-d">0{i + 1}</span>
                <h3 className="font-display text-[22px] text-t-prime mt-1">{p.title}</h3>
                <p className="mt-2 text-[14px] text-t-sub leading-relaxed font-light">{p.text}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Team */}
        <SectionReveal>
          <div className="text-center mb-14">
            <span className="kicker">The People</span>
            <h2 className="display-lg text-t-prime mt-4">Meet Our <span className="italic text-accent">Team</span></h2>
            <p className="mt-3 text-t-sub text-[15px] max-w-md mx-auto font-light">
              Stylists, barbers, colourists, and therapists.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-24">
          {team.map((member, i) => (
            <SectionReveal key={member.name} delay={i * 0.06}>
              <div className="group">
                <div className="aspect-[3/4] overflow-hidden bg-surf-2 rounded-[4px]">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
                <div className="mt-5">
                  <h3 className="font-display text-[22px] text-t-prime">{member.name}</h3>
                  <p className="text-[12.5px] text-accent-d font-medium uppercase tracking-[0.12em] mt-1.5">{member.role}</p>
                  <p className="text-[13px] text-t-sub mt-1.5 font-light">{member.specialty}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <div className="text-center border-t border-border pt-16">
            <h2 className="display-lg text-t-prime">Come see us in {salon.city.split(",")[0]}.</h2>
            <BookButton className="group inline-flex items-center gap-3 mt-8 pl-8 pr-6 py-4 bg-accent text-surf-0 text-[12.5px] font-semibold uppercase tracking-[0.18em] rounded-full hover:opacity-90 transition-opacity">
              Book Your Appointment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </BookButton>
          </div>
        </SectionReveal>
      </div>
    </main>
  );
}