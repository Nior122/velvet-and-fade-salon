import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Phone, Copy, MessageSquare, Sparkles, ArrowRight } from "lucide-react";
import { salon, serviceCategories, mockBookedSlots } from "../data/salonConfig";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isBefore, startOfDay, getDay, isToday, generateTimeSlots, isSlotAvailable, formatPrice, formatDuration, formatSlotTime, generateBookingId, buildWhatsAppLink } from "../hooks/useBooking";
import ConfirmationTicket from "../components/ConfirmationTicket";

const allServices = Object.values(serviceCategories).flatMap((c) => c.services);

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const preselected = location.state?.selectedService || null;

  const [step, setStep] = useState(preselected ? 2 : 1);
  const [service, setService] = useState(preselected);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId] = useState(generateBookingId);

  const currentStep = confirmed ? 3 : step;
  const goNext = () => setStep((s) => Math.min(s + 1, 3));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));
  const pickService = (svc) => { setService(svc); goNext(); };

  const timeSlots = useMemo(() => {
    if (!service || !date) return [];
    const dow = getDay(date);
    const close = dow === 0 ? 18 : salon.closeHour;
    return generateTimeSlots(salon.openHour, close, service.duration);
  }, [service, date]);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!phone.trim()) e.phone = "Phone number is required";
    else if (!/^\+?234\d{10}$/.test(phone.replace(/\s/g, "")) && !/^0\d{10}$/.test(phone.replace(/\s/g, ""))) e.phone = "Enter a valid Nigerian phone number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirm = () => { if (validate()) setConfirmed(true); };
  const fmtDate = date ? format(date, "EEEE, d MMMM yyyy") : "";
  const fmtTime = time ? formatSlotTime(time) : "";
  const whatsappUrl = confirmed ? buildWhatsAppLink(salon.whatsappPhone, { salonName: salon.name, serviceName: service.name, date: fmtDate, time: fmtTime, customerName: name }) : "";
  const copyDetails = () => { navigator.clipboard.writeText(`${salon.name} Booking\nService: ${service.name}\nDate: ${fmtDate}\nTime: ${fmtTime}\nName: ${name}\nRef: ${bookingId}`).catch(() => {}); };
  const smsUrl = `sms:${salon.phone}?body=${encodeURIComponent(`Booking at ${salon.name}: ${service?.name}, ${fmtDate} at ${fmtTime}. Name: ${name}`)}`;
  const reset = () => { setStep(1); setService(null); setDate(null); setTime(null); setName(""); setPhone(""); setEmail(""); setErrors({}); setConfirmed(false); };

  const ProgressBar = () => {
    const pct = confirmed ? 100 : ((currentStep - 1) / 2) * 100;
    const labels = ["Service", "Date & Time", "Details"];
    return (
      <div className="mb-10">
        <div className="relative h-[3px] bg-gray-light border border-black/5 overflow-hidden">
          <motion.div className="absolute inset-y-0 left-0 bg-lime" initial={false} animate={{ width: `${pct}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
        </div>
        <div className="flex justify-between mt-3">
          {labels.map((label, i) => (
            <span key={label} className={`font-label text-[10px] uppercase tracking-[0.2em] font-bold transition-colors ${i < currentStep ? "text-black" : i === currentStep ? "text-lime" : "text-black/20"}`}>{label}</span>
          ))}
        </div>
      </div>
    );
  };

  if (confirmed) {
    return (
      <main className="pt-[64px] sm:pt-[72px] pb-20 bg-offwhite min-h-screen">
        <div className="mx-auto max-w-2xl px-5 text-center pt-12 sm:pt-16">
          <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 16 }} className="mx-auto mb-6 w-16 h-16 bg-lime flex items-center justify-center">
            <Check className="h-7 w-7 text-black" />
          </motion.div>
          <h1 className="font-display text-[28px] sm:text-[36px] font-extrabold uppercase text-black tracking-[-0.03em]">Booking Confirmed!</h1>
          <p className="mt-2 text-gray text-[14px]">Your appointment is locked in.</p>
          <div className="mt-8">
            <ConfirmationTicket service={service} date={fmtDate} time={fmtTime} customerName={name} bookingId={bookingId} />
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-label font-bold text-[12px] uppercase tracking-[0.05em] hover:bg-[#20BD5B] transition-all">
              <MessageSquare className="h-4 w-4" /> WhatsApp
            </a>
            <button onClick={copyDetails} className="inline-flex items-center gap-2 px-5 py-3 border-2 border-black text-black text-[12px] font-label font-bold uppercase tracking-[0.05em] hover:bg-black hover:text-white transition-all">
              <Copy className="h-4 w-4" /> Copy
            </button>
            <a href={smsUrl} className="inline-flex items-center gap-2 px-5 py-3 border-2 border-black text-black text-[12px] font-label font-bold uppercase tracking-[0.05em] hover:bg-black hover:text-white transition-all">
              <Phone className="h-4 w-4" /> SMS
            </a>
          </div>
          <button onClick={reset} className="mt-8 text-[12px] text-black/40 hover:text-lime font-label font-bold uppercase tracking-[0.1em] transition-colors">Book Another</button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-[64px] sm:pt-[72px] pb-20 bg-offwhite min-h-screen">
      <div className="mx-auto max-w-3xl px-5 pt-10 sm:pt-14">
        <ProgressBar />
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <h2 className="font-display text-[24px] sm:text-[28px] font-extrabold uppercase text-black tracking-[-0.03em] mb-6">Choose a Service</h2>
              <div className="space-y-2">
                {allServices.map((svc) => (
                  <button key={svc.id} onClick={() => pickService(svc)} className="w-full flex items-center gap-4 p-4 bg-white border border-black/8 hover:border-lime transition-all duration-200 text-left group">
                    <img src={svc.image} alt={svc.name} loading="lazy" className="w-12 h-12 object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-black group-hover:text-lime transition-colors text-[14px] uppercase tracking-[-0.01em]">{svc.name}</p>
                      <p className="text-[11px] text-gray mt-0.5 truncate">{svc.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[13px] font-bold text-black">{formatPrice(svc.price)}</p>
                      <p className="text-[10px] text-black/25 mt-0.5 font-label uppercase">{formatDuration(svc.duration)}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-black/10 group-hover:text-lime transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <button onClick={goBack} className="flex items-center gap-1.5 text-[12px] text-black/30 hover:text-black font-label font-bold uppercase tracking-[0.1em] transition-colors mb-5">
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              {service && (
                <div className="flex items-center gap-3 p-4 bg-white border border-black/8 mb-6">
                  <Sparkles className="h-4 w-4 text-lime shrink-0" />
                  <span className="text-[13px] font-bold text-black uppercase">{service.name}</span>
                  <span className="text-[11px] text-black/30 ml-auto font-label">{formatPrice(service.price)} · {formatDuration(service.duration)}</span>
                </div>
              )}
              <h2 className="font-display text-[24px] sm:text-[28px] font-extrabold uppercase text-black tracking-[-0.03em] mb-6">Pick a Date</h2>
              <CalendarPicker value={date} onChange={(d) => { setDate(d); setTime(null); }} closedDays={salon.closedDays} />
              {date && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                  <h3 className="font-display text-[18px] font-bold uppercase text-black mb-4">Available Times</h3>
                  <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
                    {timeSlots.map((slot) => {
                      const available = isSlotAvailable(slot, date, mockBookedSlots);
                      const selected = time === slot;
                      return (
                        <button key={slot} disabled={!available} onClick={() => available && setTime(slot)} className={`relative shrink-0 px-5 py-2.5 text-[12px] font-label font-bold uppercase tracking-[0.05em] transition-all duration-200 ${!available ? "bg-gray-light text-black/15 cursor-not-allowed line-through" : selected ? "bg-lime text-black" : "bg-white border border-black/8 text-black hover:border-lime"}`}>
                          {selected && <motion.span layoutId="time-sel" className="absolute inset-0 bg-lime" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                          <span className="relative z-10">{formatSlotTime(slot)}</span>
                        </button>
                      );
                    })}
                  </div>
                  {time && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex justify-end">
                      <button onClick={goNext} className="inline-flex items-center gap-2 px-7 py-3 bg-lime text-black font-label font-bold text-[12px] uppercase tracking-[0.05em] hover:bg-lime/90 transition-all">
                        Continue <ArrowRight className="h-4 w-4" />
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <button onClick={goBack} className="flex items-center gap-1.5 text-[12px] text-black/30 hover:text-black font-label font-bold uppercase tracking-[0.1em] transition-colors mb-5">
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              <h2 className="font-display text-[24px] sm:text-[28px] font-extrabold uppercase text-black tracking-[-0.03em] mb-6">Your Details</h2>
              <div className="p-5 bg-white border border-black/8 mb-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-lime flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4 text-black" />
                </div>
                <div>
                  <p className="font-display font-bold text-black text-[14px] uppercase">{service?.name}</p>
                  <p className="text-[12px] text-gray mt-0.5">{fmtDate} at {fmtTime}</p>
                </div>
              </div>
              <div className="space-y-4">
                <Field label="Full Name" required value={name} onChange={setName} placeholder="e.g. Adaeze Okonkwo" error={errors.name} />
                <Field label="Phone Number" required type="tel" value={phone} onChange={setPhone} placeholder="e.g. 08123456789" error={errors.phone} />
                <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="e.g. adaeze@email.com" />
              </div>
              <div className="mt-8 flex justify-end">
                <button onClick={handleConfirm} className="inline-flex items-center gap-2 px-8 py-3.5 bg-lime text-black font-label font-bold text-[13px] uppercase tracking-[0.05em] hover:bg-lime/90 transition-all">
                  <Check className="h-4 w-4" /> Confirm
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function Field({ label, required, type = "text", value, onChange, placeholder, error }) {
  return (
    <div>
      <label className="block text-[10px] font-label uppercase tracking-[0.25em] text-black/30 font-bold mb-2">
        {label} {required && <span className="text-lime">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 bg-white text-[13px] text-black placeholder:text-black/15 focus:outline-none focus:border-lime transition-all ${error ? "border-red-500" : "border-black/8"}`}
      />
      {error && <p className="text-[11px] text-red-500 mt-1 font-label font-bold">{error}</p>}
    </div>
  );
}

function CalendarPicker({ value, onChange, closedDays = [] }) {
  const [viewDate, setViewDate] = useState(new Date());
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDow = getDay(monthStart);
  const today = startOfDay(new Date());

  return (
    <div className="bg-white border border-black/8 p-5 sm:p-7">
      <div className="flex items-center justify-between mb-5">
        <button onClick={() => setViewDate((d) => subMonths(d, 1))} className="w-8 h-8 border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors" aria-label="Previous month">
          <ChevronLeft className="h-4 w-4 text-black" />
        </button>
        <p className="font-display text-[16px] font-extrabold uppercase tracking-[-0.02em] text-black">{format(viewDate, "MMMM yyyy")}</p>
        <button onClick={() => setViewDate((d) => addMonths(d, 1))} className="w-8 h-8 border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors" aria-label="Next month">
          <ChevronRight className="h-4 w-4 text-black" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center text-[9px] font-label uppercase tracking-[0.2em] text-black/25 font-bold py-1.5">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startDow }).map((_, i) => <div key={`b-${i}`} />)}
        {days.map((day) => {
          const past = isBefore(day, today);
          const closed = closedDays.includes(getDay(day));
          const disabled = past || closed;
          const selected = value && isSameDay(day, value);
          const todayMark = isToday(day);
          return (
            <button key={day.toISOString()} disabled={disabled} onClick={() => !disabled && onChange(day)}
              className={`aspect-square flex items-center justify-center text-[13px] font-bold transition-all duration-150 ${disabled ? "text-black/10 cursor-not-allowed" : selected ? "bg-lime text-black" : "text-black hover:bg-black/5"}`}>
              {format(day, "d")}
              {todayMark && !selected && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-lime" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
