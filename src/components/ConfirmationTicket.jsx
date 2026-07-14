import { motion } from "framer-motion";
import { Scissors, Ticket } from "lucide-react";
import { salon } from "../data/salonConfig";

export default function ConfirmationTicket({ service, date, time, customerName, bookingId }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-stone/10">
        {/* Top accent bar */}
        <div className="h-2 bg-gradient-to-r from-copper via-copper to-emerald" />

        {/* Ticket content */}
        <div className="flex flex-col sm:flex-row">
          {/* Left: Main details */}
          <div className="flex-1 p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="h-5 w-5 text-copper" />
              <span className="font-display text-lg font-bold text-charcoal">
                {salon.name}
              </span>
            </div>

            <div className="space-y-2.5 text-sm">
              <div>
                <span className="text-stone text-xs uppercase tracking-widest font-label">Service</span>
                <p className="font-medium text-charcoal mt-0.5">{service.name}</p>
              </div>
              <div>
                <span className="text-stone text-xs uppercase tracking-widest font-label">Date & Time</span>
                <p className="font-medium text-charcoal mt-0.5">{date} at {time}</p>
              </div>
              <div>
                <span className="text-stone text-xs uppercase tracking-widest font-label">Booked by</span>
                <p className="font-medium text-charcoal mt-0.5">{customerName}</p>
              </div>
            </div>
          </div>

          {/* Perforated edge */}
          <div className="hidden sm:block relative w-px">
            <div className="absolute inset-y-0 -left-px border-l-2 border-dashed border-stone/30" />
            {/* Notch circles */}
            <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-cream" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-cream" />
          </div>

          {/* Horizontal perforation on mobile */}
          <div className="sm:hidden relative h-px mx-6">
            <div className="absolute inset-x-0 top-0 border-t-2 border-dashed border-stone/30" />
            <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-cream" />
            <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-cream" />
          </div>

          {/* Right: Stub */}
          <div className="sm:w-36 flex flex-row sm:flex-col items-center justify-center p-5 sm:p-4 bg-cream/50 gap-3 sm:gap-2">
            <Ticket className="h-5 w-5 text-copper rotate-45" />
            <div className="text-center">
              <p className="font-label text-[10px] uppercase tracking-[0.2em] text-stone">Serial</p>
              <p className="font-mono text-sm font-bold text-charcoal mt-0.5">{bookingId}</p>
            </div>
            <p className="text-[10px] text-stone text-center italic hidden sm:block">
              {salon.tagline}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
