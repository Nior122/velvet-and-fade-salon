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
      className="group cursor-pointer bg-white border border-black/8 overflow-hidden hover:border-lime transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-light">
        {!loaded && <div className="absolute inset-0 bg-gray-light animate-pulse" />}
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end p-4">
          <span className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-lime text-black text-[11px] font-label font-bold uppercase tracking-[0.1em] px-3 py-1.5 flex items-center gap-1">
            Book <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-[16px] font-bold uppercase tracking-[-0.02em] text-black leading-tight">{service.name}</h3>
          <span className="font-body text-[14px] font-bold text-black shrink-0">{formatPrice(service.price)}</span>
        </div>
        <p className="mt-2 text-[12px] text-gray leading-relaxed flex-1">{service.description}</p>
        <div className="mt-3 pt-3 border-t border-black/5">
          <span className="text-[10px] font-label uppercase tracking-[0.2em] text-black/30 font-bold">
            {formatDuration(service.duration)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
