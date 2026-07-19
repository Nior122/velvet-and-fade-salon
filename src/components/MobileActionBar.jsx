import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, CalendarCheck } from "lucide-react";
import { salon } from "../data/salonConfig";
import BookButton from "./BookButton";

/**
 * Sticky bottom action bar on mobile only. Gives instant access to the two
 * highest-intent actions — Book and Call — without obstructing content.
 */
export default function MobileActionBar() {
  const { pathname } = useLocation();
  if (pathname === "/booking") return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="xl:hidden fixed bottom-0 inset-x-0 z-40 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-surf-0/95 via-surf-0/85 to-transparent"
    >
      <div className="flex items-center gap-3">
        <a
          href={`tel:${salon.phone}`}
          aria-label="Call the salon"
          className="shrink-0 w-[52px] h-[52px] rounded-full bg-surf-2/40 border border-border backdrop-blur-md flex items-center justify-center text-t-prime"
        >
          <Phone className="h-5 w-5" />
        </a>
        <BookButton className="flex-1 inline-flex items-center justify-center gap-2 h-[52px] rounded-full bg-accent text-surf-0 text-[13px] font-semibold uppercase tracking-[0.18em] shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
          <CalendarCheck className="h-4 w-4" />
          Book Now
        </BookButton>
      </div>
    </motion.div>
  );
}
