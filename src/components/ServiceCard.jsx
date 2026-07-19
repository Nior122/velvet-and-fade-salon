import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { formatPrice, formatDuration } from "../hooks/useBooking";

export default function ServiceCard({ service, onSelect }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.button
      type="button"
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 32 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect?.(service)}
      className="group text-left flex flex-col bg-surf-1 rounded-[4px] overflow-hidden border border-border hover:border-accent-d/50 transition-colors duration-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surf-2">
        {!loaded && <div className="absolute inset-0 bg-surf-2 animate-pulse" />}
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surf-0/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
          <span className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 text-t-prime text-[11.5px] font-semibold uppercase tracking-[0.18em] flex items-center gap-1.5">
            Book This <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[21px] text-t-prime leading-snug group-hover:text-accent-d transition-colors">
            {service.name}
          </h3>
          <span className="text-[15px] font-medium text-accent-d shrink-0 pt-1">{formatPrice(service.price)}</span>
        </div>
        <p className="mt-2.5 text-[13.5px] text-t-sub leading-relaxed flex-1 font-light">{service.description}</p>
        <div className="mt-5 pt-4 border-t border-border">
          <span className="text-[11px] uppercase tracking-[0.18em] text-t-sub font-medium">
            {formatDuration(service.duration)}
          </span>
        </div>
      </div>
    </motion.button>
  );
}
