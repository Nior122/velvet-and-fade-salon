import { team, salon } from "../data/salonConfig";
import SectionReveal from "../components/SectionReveal";
import PageHero from "../components/PageHero";

export default function Team() {
  const count = salon.stats.find((s) => s.label === "Stylists & barbers")?.value;
  return (
    <main className="bg-surf-1 min-h-screen pb-28 sm:pb-32">
      <PageHero
        eyebrow="The People"
        title="Our"
        emphasis="Team"
        subtitle={`${count} talented professionals, each bringing their own artistry to every appointment.`}
        image="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1400&q=80"
      />

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                  <h3 className="font-display text-[24px] text-t-prime">{member.name}</h3>
                  <p className="text-[12.5px] text-accent-d font-medium uppercase tracking-[0.12em] mt-2">{member.role}</p>
                  <p className="text-[13.5px] text-t-sub mt-2 font-light leading-relaxed">{member.specialty}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </main>
  );
}