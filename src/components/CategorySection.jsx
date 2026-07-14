import { useState } from "react";
import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

export default function CategorySection({ category, categoryKey, onServiceSelect }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className="mb-12 lg:mb-16"
    >
      {/* Category header image */}
      <div className="relative aspect-[21/6] sm:aspect-[3/1] rounded-2xl overflow-hidden mb-6">
        {!imgLoaded && <div className="absolute inset-0 animate-pulse bg-stone/10" />}
        <img
          src={category.image}
          alt={category.label}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5 sm:p-8">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-label uppercase tracking-[0.2em] bg-copper/90 text-charcoal font-semibold mb-2">
            {category.gender === "men" ? "Men's" : category.gender === "women" ? "Women's" : "Everyone"}
          </span>
          <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-cream">
            {category.label}
          </h3>
        </div>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
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
