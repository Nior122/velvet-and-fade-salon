import { galleryImages, salon } from "../data/salonConfig";
import SectionReveal from "../components/SectionReveal";

export default function Gallery() {
  return (
    <main className="pt-[76px] pb-24 sm:pb-32 bg-ivory min-h-screen">
      <div className="bg-espresso relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-espresso via-espresso to-espresso/90" />
        <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
          <SectionReveal>
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-champagne">Visual Journey</span>
            <h1 className="font-display text-[42px] sm:text-[56px] lg:text-[64px] text-ivory mt-3 tracking-[-0.02em] leading-[0.92] font-light">
              Our <span className="italic">Gallery</span>
            </h1>
            <p className="mt-5 text-ivory/40 max-w-md text-[16px] leading-relaxed font-light">
              A glimpse inside {salon.name} — our space, our craft, our community.
            </p>
          </SectionReveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20">
        <div className="columns-2 lg:columns-3 gap-5 space-y-5">
          {galleryImages.map((img, i) => (
            <SectionReveal key={i} delay={i * 0.04}>
              <div className="rounded-[24px] overflow-hidden bg-blush break-inside-avoid group">
                <div className={`${img.aspect === "tall" ? "aspect-[3/4]" : img.aspect === "wide" ? "aspect-[4/3]" : "aspect-square"} overflow-hidden`}>
                  <img
                    src={img.src}
                    alt={`${salon.name} gallery ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </main>
  );
}
