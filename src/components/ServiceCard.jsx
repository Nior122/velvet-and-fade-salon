import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { formatPrice, formatDuration } from "../hooks/useBooking";

export default function ServiceCard({ service, onSelect }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 24 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect?.(service)}
      className="group cursor-pointer rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone/10">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-stone/10" />
        )}
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <h3 className="font-display text-base sm:text-lg font-bold text-charcoal leading-tight">
          {service.name}
        </h3>
        <p className="mt-1 text-sm text-stone leading-relaxed flex-1">
          {service.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-stone">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {formatDuration(service.duration)}
            </span>
            <span className="font-semibold text-copper text-sm">
              {formatPrice(service.price)}
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-copper opacity-0 group-hover:opacity-100 transition-opacity">
            Book <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
