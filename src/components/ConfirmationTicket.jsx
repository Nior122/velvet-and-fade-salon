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
      <div className="relative bg-white border-2 border-black overflow-hidden">
        <div className="h-1.5 bg-lime" />

        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 p-7 sm:p-8">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-lime flex items-center justify-center">
                <Scissors className="h-4 w-4 text-black" />
              </div>
              <span className="font-display text-[18px] font-extrabold uppercase tracking-[-0.02em] text-black">
                {salon.name}
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <span className="text-[9px] font-label uppercase tracking-[0.25em] text-black/30 font-bold">Service</span>
                <p className="font-bold text-black mt-1 text-[15px] uppercase">{service.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] font-label uppercase tracking-[0.25em] text-black/30 font-bold">Date</span>
                  <p className="font-bold text-black mt-1 text-[14px]">{date}</p>
                </div>
                <div>
                  <span className="text-[9px] font-label uppercase tracking-[0.25em] text-black/30 font-bold">Time</span>
                  <p className="font-bold text-black mt-1 text-[14px]">{time}</p>
                </div>
              </div>
              <div>
                <span className="text-[9px] font-label uppercase tracking-[0.25em] text-black/30 font-bold">Guest</span>
                <p className="font-bold text-black mt-1 text-[14px]">{customerName}</p>
              </div>
            </div>
          </div>

          <div className="hidden sm:block relative w-px">
            <div className="absolute inset-y-0 -left-px border-l-2 border-dashed border-black/10" />
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-offwhite" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-offwhite" />
          </div>
          <div className="sm:hidden relative h-px mx-7">
            <div className="absolute inset-x-0 top-0 border-t-2 border-dashed border-black/10" />
            <div className="absolute -left-3 -top-3 w-6 h-6 bg-offwhite" />
            <div className="absolute -right-3 -top-3 w-6 h-6 bg-offwhite" />
          </div>

          <div className="sm:w-36 flex flex-row sm:flex-col items-center justify-center gap-3 p-6 sm:p-5 bg-offwhite">
            <div className="relative">
              <Stamp className="h-8 w-8 text-black/10 rotate-[-15deg]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[8px] font-display font-extrabold text-black/25 tracking-widest uppercase">VF</span>
              </div>
            </div>
            <div className="text-center">
              <p className="font-label text-[8px] uppercase tracking-[0.3em] text-black/25 font-bold">Ref</p>
              <p className="font-mono text-[12px] font-bold text-black mt-0.5">{bookingId}</p>
            </div>
            <p className="text-[8px] text-black/20 text-center hidden sm:block leading-tight mt-1 uppercase tracking-wider font-bold">
              {salon.tagline}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
