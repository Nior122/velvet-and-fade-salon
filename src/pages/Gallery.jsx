import { galleryImages, salon } from "../data/salonConfig";
import SectionReveal from "../components/SectionReveal";
import PageHero from "../components/PageHero";
import BookButton from "../components/BookButton";
import { ArrowRight } from "lucide-react";

export default function Gallery() {
  return (
    <main className="bg-surf-1 min-h-screen pb-28 sm:pb-32">
      <PageHero
        eyebrow="Visual Journey"
        title="The"
        emphasis="Gallery"
        subtitle={`A glimpse inside ${salon.name} — our space, our craft, and the finished looks our guests walk out with.`}
        image="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=80"
      />

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24">
        <div className="columns-2 lg:columns-3 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
          {galleryImages.map((img, i) => (
            <SectionReveal key={i} delay={Math.min(i * 0.04, 0.3)}>
              <div className="rounded-[4px] overflow-hidden bg-surf-2 break-inside-avoid group">
                <div className={`${img.aspect === "tall" ? "aspect-[3/4]" : img.aspect === "wide" ? "aspect-[4/3]" : "aspect-square"} overflow-hidden`}>
                  <img
                    src={img.src}
                    alt={`${salon.name} gallery ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <div className="text-center mt-20">
            <h2 className="display-lg text-t-prime">Like what you see?</h2>
            <p className="mt-4 text-[15px] text-t-sub font-light">Book your chair and become part of the story.</p>
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
