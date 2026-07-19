import { useState } from "react";
import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

export default function CategorySection({ category, onServiceSelect }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const genderLabel =
    category.gender === "men" ? "For Him" : category.gender === "women" ? "For Her" : "For Everyone";

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="mb-20 lg:mb-28"
    >
      <div className="flex items-end justify-between mb-8 gap-6 border-b border-border pb-6">
        <div className="flex items-baseline gap-5">
          <span className="kicker">{genderLabel}</span>
          <h2 className="display-lg text-t-prime text-[clamp(30px,5vw,52px)]">{category.label}</h2>
        </div>
        <span className="hidden sm:block text-[11px] uppercase tracking-[0.2em] text-t-sub font-medium shrink-0">
          {category.services.length} services
        </span>
      </div>

      <div className="relative aspect-[21/8] sm:aspect-[3/1] overflow-hidden rounded-[6px] mb-8">
        {!imgLoaded && <div className="absolute inset-0 bg-surf-2 animate-pulse" />}
        <img
          src={category.image}
          alt={category.label}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 ${imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surf-0/40 to-transparent" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.services.map((service) => (
          <ServiceCard key={service.id} service={service} onSelect={onServiceSelect} />
        ))}
      </div>
    </motion.section>
  );
}
