import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { formatPrice, formatDuration } from "../hooks/useBooking";

export default function ServiceCard({ service, onSelect }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left - rect.width / 2) / 20,
      y: (e.clientY - rect.top - rect.height / 2) / 20,
    });
  };

  const handleMouseLeave = () => setMouse({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 48 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      animate={{ x: mouse.x, y: mouse.y }}
      onClick={() => onSelect?.(service)}
      className="group cursor-pointer rounded-[16px] bg-white overflow-hidden shadow-[0_2px_20px_rgba(44,34,32,0.04)] hover:shadow-[0_12px_40px_rgba(44,34,32,0.1)] transition-shadow duration-500 flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-parchment">
        {!loaded && <div className="absolute inset-0 bg-parchment animate-pulse" />}
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/30 transition-colors duration-500 flex items-end p-5">
          <span className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 text-ivory text-sm font-label font-semibold flex items-center gap-1.5">
            Book Now <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-[18px] font-semibold text-espresso leading-snug">{service.name}</h3>
          <span className="font-display text-[16px] font-semibold text-plum shrink-0">{formatPrice(service.price)}</span>
        </div>
        <p className="mt-2 text-[13px] text-espresso/45 leading-relaxed flex-1">{service.description}</p>
        <div className="mt-3 pt-3 border-t border-espresso/5">
          <span className="text-[11px] font-label uppercase tracking-[0.15em] text-espresso/35 font-semibold">
            {formatDuration(service.duration)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
