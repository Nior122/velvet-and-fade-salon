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
      <div className="relative bg-white rounded-[20px] shadow-[0_20px_60px_rgba(44,34,32,0.1)] overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-espresso via-plum to-espresso" />

        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 p-7 sm:p-8">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-xl bg-plum/10 flex items-center justify-center">
                <Scissors className="h-4 w-4 text-plum" />
              </div>
              <span className="font-display text-[20px] font-semibold text-espresso tracking-[-0.01em]">
                {salon.name}
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <span className="text-[10px] font-label uppercase tracking-[0.2em] text-espresso/35 font-semibold">Service</span>
                <p className="font-semibold text-espresso mt-1 text-[15px]">{service.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-label uppercase tracking-[0.2em] text-espresso/35 font-semibold">Date</span>
                  <p className="font-semibold text-espresso mt-1 text-[15px]">{date}</p>
                </div>
                <div>
                  <span className="text-[10px] font-label uppercase tracking-[0.2em] text-espresso/35 font-semibold">Time</span>
                  <p className="font-semibold text-espresso mt-1 text-[15px]">{time}</p>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-label uppercase tracking-[0.2em] text-espresso/35 font-semibold">Guest</span>
                <p className="font-semibold text-espresso mt-1 text-[15px]">{customerName}</p>
              </div>
            </div>
          </div>

          <div className="hidden sm:block relative w-px">
            <div className="absolute inset-y-0 -left-px border-l-2 border-dashed border-espresso/8" />
            <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-ivory" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-ivory" />
          </div>
          <div className="sm:hidden relative h-px mx-7">
            <div className="absolute inset-x-0 top-0 border-t-2 border-dashed border-espresso/8" />
            <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-ivory" />
            <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-ivory" />
          </div>

          <div className="sm:w-36 flex flex-row sm:flex-col items-center justify-center gap-3 p-6 sm:p-5">
            <div className="relative">
              <Stamp className="h-8 w-8 text-plum/15 rotate-[-15deg]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[7px] font-label font-extrabold text-plum/35 tracking-wider">VF</span>
              </div>
            </div>
            <div className="text-center">
              <p className="font-label text-[9px] uppercase tracking-[0.25em] text-espresso/25 font-semibold">Ref</p>
              <p className="font-mono text-[13px] font-bold text-espresso mt-0.5">{bookingId}</p>
            </div>
            <p className="text-[9px] text-espresso/25 text-center italic hidden sm:block leading-tight mt-1">
              {salon.tagline}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
