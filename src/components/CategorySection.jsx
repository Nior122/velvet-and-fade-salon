import { useState } from "react";
import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

export default function CategorySection({ category, categoryKey, onServiceSelect }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const genderLabel =
    category.gender === "men" ? "FOR HIM" : category.gender === "women" ? "FOR HER" : "FOR EVERYONE";

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-16 lg:mb-20"
    >
      <div className="relative aspect-[21/7] sm:aspect-[3/1] lg:aspect-[2.8/1] overflow-hidden mb-8">
        {!imgLoaded && <div className="absolute inset-0 bg-gray-light animate-pulse" />}
        <img
          src={category.image}
          alt={category.label}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 ${
            imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex items-end justify-between">
          <div>
            <span className="inline-block px-2 py-0.5 text-[9px] font-label font-bold uppercase tracking-[0.25em] bg-lime text-black mb-3">
              {genderLabel}
            </span>
            <h3 className="font-display text-[24px] sm:text-[32px] lg:text-[38px] font-extrabold uppercase tracking-[-0.03em] text-white">
              {category.label}
            </h3>
          </div>
          <span className="hidden sm:block font-label text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
            {category.services.length} services
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.services.map((service) => (
          <ServiceCard key={service.id} service={service} onSelect={onServiceSelect} />
        ))}
      </div>
    </motion.section>
  );
}
