import { motion } from "framer-motion";
import { salon } from "../data/salonConfig";
import { Scissors, Stamp } from "lucide-react";

export default function ConfirmationTicket({ service, date, time, customerName, bookingId }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="relative bg-white rounded-[28px] shadow-[0_20px_80px_rgba(42,30,27,0.1)] overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-champagne via-copper to-rose" />

        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 p-8 sm:p-9">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-champagne/10 flex items-center justify-center">
                <Scissors className="h-4 w-4 text-champagne" />
              </div>
              <span className="font-display text-[20px] text-espresso font-medium">{salon.name}</span>
            </div>

            <div className="space-y-5 text-sm">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/25 font-bold">Service</span>
                <p className="font-semibold text-espresso mt-1.5 text-[15px]">{service.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/25 font-bold">Date</span>
                  <p className="font-semibold text-espresso mt-1.5 text-[14px]">{date}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/25 font-bold">Time</span>
                  <p className="font-semibold text-espresso mt-1.5 text-[14px]">{time}</p>
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/25 font-bold">Guest</span>
                <p className="font-semibold text-espresso mt-1.5 text-[14px]">{customerName}</p>
              </div>
            </div>
          </div>

          <div className="hidden sm:block relative w-px">
            <div className="absolute inset-y-0 -left-px border-l-2 border-dashed border-charcoal/8" />
            <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-ivory" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-ivory" />
          </div>
          <div className="sm:hidden relative h-px mx-8">
            <div className="absolute inset-x-0 top-0 border-t-2 border-dashed border-charcoal/8" />
            <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-ivory" />
            <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-ivory" />
          </div>

          <div className="sm:w-40 flex flex-row sm:flex-col items-center justify-center gap-3 p-6 sm:p-6 bg-blush/50">
            <div className="relative">
              <Stamp className="h-9 w-9 text-champagne/20 rotate-[-15deg]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[9px] font-bold text-champagne/40 tracking-wider">VF</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[9px] uppercase tracking-[0.2em] text-charcoal/20 font-bold">Ref</p>
              <p className="font-mono text-[13px] font-bold text-espresso mt-0.5">{bookingId}</p>
            </div>
            <p className="text-[9px] text-charcoal/20 text-center hidden sm:block leading-tight mt-1 italic font-light">
              {salon.tagline}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
