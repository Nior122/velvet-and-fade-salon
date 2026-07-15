import { motion } from "framer-motion";
import { Scissors, Stamp } from "lucide-react";
import { salon } from "../data/salonConfig";

export default function ConfirmationTicket({ service, date, time, customerName, bookingId }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="relative bg-white rounded-2xl shadow-[0_16px_48px_rgba(46,36,32,0.1)] overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-rose via-rose-deep to-sage" />

        <div className="flex flex-col sm:flex-row">
          {/* Main details */}
          <div className="flex-1 p-7 sm:p-8">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-xl bg-rose/10 flex items-center justify-center">
                <Scissors className="h-4 w-4 text-rose-deep" />
              </div>
              <span className="font-display text-[19px] text-brown">{salon.name}</span>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-brown/30 font-bold">Service</span>
                <p className="font-semibold text-brown mt-1 text-[15px]">{service.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brown/30 font-bold">Date</span>
                  <p className="font-semibold text-brown mt-1 text-[14px]">{date}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brown/30 font-bold">Time</span>
                  <p className="font-semibold text-brown mt-1 text-[14px]">{time}</p>
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-brown/30 font-bold">Guest</span>
                <p className="font-semibold text-brown mt-1 text-[14px]">{customerName}</p>
              </div>
            </div>
          </div>

          {/* Perforated edge */}
          <div className="hidden sm:block relative w-px">
            <div className="absolute inset-y-0 -left-px border-l-2 border-dashed border-brown/10" />
            <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-ivory" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-ivory" />
          </div>
          <div className="sm:hidden relative h-px mx-7">
            <div className="absolute inset-x-0 top-0 border-t-2 border-dashed border-brown/10" />
            <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-ivory" />
            <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-ivory" />
          </div>

          {/* Stub */}
          <div className="sm:w-36 flex flex-row sm:flex-col items-center justify-center gap-3 p-6 sm:p-5 bg-blush/50">
            <div className="relative">
              <Stamp className="h-8 w-8 text-rose/20 rotate-[-15deg]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[8px] font-bold text-rose/35 tracking-wider">VF</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[9px] uppercase tracking-[0.2em] text-brown/25 font-bold">Ref</p>
              <p className="font-mono text-[12px] font-bold text-brown mt-0.5">{bookingId}</p>
            </div>
            <p className="text-[9px] text-brown/25 text-center hidden sm:block leading-tight mt-1 italic">
              {salon.tagline}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
