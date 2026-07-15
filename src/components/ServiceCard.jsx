import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
      initial={{ opacity: 0, y: 40 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      animate={{ x: mouse.x, y: mouse.y }}
      onClick={() => onSelect?.(service)}
      className="group cursor-pointer rounded-2xl bg-white overflow-hidden shadow-[0_2px_16px_rgba(46,36,32,0.05)] hover:shadow-[0_10px_40px_rgba(46,36,32,0.1)] transition-shadow duration-500 flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-blush">
        {!loaded && <div className="absolute inset-0 bg-blush animate-pulse" />}
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brown/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4">
          <span className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-ivory text-[12px] font-semibold uppercase tracking-wider flex items-center gap-1.5">
            Book Now <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-[17px] text-brown leading-snug">{service.name}</h3>
          <span className="text-[15px] font-bold text-rose-deep shrink-0">{formatPrice(service.price)}</span>
        </div>
        <p className="mt-2 text-[13px] text-brown/45 leading-relaxed flex-1">{service.description}</p>
        <div className="mt-3 pt-3 border-t border-brown/5">
          <span className="text-[11px] uppercase tracking-[0.15em] text-brown/30 font-semibold">{formatDuration(service.duration)}</span>
        </div>
      </div>
    </motion.div>
  );
}
