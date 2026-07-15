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
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="mb-14 lg:mb-18"
    >
      {/* Category banner */}
      <div className="relative aspect-[21/7] sm:aspect-[3/1] lg:aspect-[2.8/1] rounded-2xl overflow-hidden mb-7">
        {!imgLoaded && <div className="absolute inset-0 bg-blush animate-pulse" />}
        <img
          src={category.image}
          alt={category.label}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 ${imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/70 via-brown/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-9 flex items-end justify-between">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-rose/90 text-ivory mb-2.5">
              {genderLabel}
            </span>
            <h3 className="font-display text-[22px] sm:text-[30px] lg:text-[36px] text-ivory tracking-[-0.01em]">
              {category.label}
            </h3>
          </div>
          <span className="hidden sm:block text-[11px] uppercase tracking-[0.18em] text-ivory/50 font-semibold">
            {category.services.length} services
          </span>
        </div>
      </div>

      {/* Service grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {category.services.map((service) => (
          <ServiceCard key={service.id} service={service} onSelect={onServiceSelect} />
        ))}
      </div>
    </motion.section>
  );
}
