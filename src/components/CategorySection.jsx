import { useState } from "react";
import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

export default function CategorySection({ category, categoryKey, onServiceSelect }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const genderLabel =
    category.gender === "men" ? "For Him" : category.gender === "women" ? "For Her" : "For Everyone";

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-16 lg:mb-20"
    >
      {/* Category header — cinematic banner */}
      <div className="relative aspect-[21/7] sm:aspect-[3/1] lg:aspect-[2.8/1] rounded-[24px] overflow-hidden mb-8">
        {!imgLoaded && <div className="absolute inset-0 bg-sand/40 animate-pulse" />}
        <img
          src={category.image}
          alt={category.label}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 ${
            imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex items-end justify-between">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-label font-600 uppercase tracking-[0.2em] bg-gold/90 text-ink mb-3">
              {genderLabel}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-800 text-ivory tracking-[-0.02em]">
              {category.label}
            </h3>
          </div>
          <span className="hidden sm:block font-label text-[11px] uppercase tracking-[0.2em] text-ivory/60 font-500">
            {category.services.length} services
          </span>
        </div>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {category.services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onSelect={onServiceSelect}
          />
        ))}
      </div>
    </motion.section>
  );
}
