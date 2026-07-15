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
      <div className="mb-12">
        <div className="relative h-[3px] bg-blush rounded-full overflow-hidden">
          <motion.div className="absolute inset-y-0 left-0 bg-copper rounded-full" initial={false} animate={{ width: `${pct}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
        </div>
        <div className="flex justify-between mt-4">
          {labels.map((label, i) => (
            <span key={label} className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors ${i < currentStep ? "text-espresso" : i === currentStep ? "text-copper" : "text-charcoal/15"}`}>{label}</span>
          ))}
        </div>
      </div>
    );
  };

  if (confirmed) {
    return (
      <main className="pt-[76px] pb-24 bg-ivory min-h-screen">
        <div className="mx-auto max-w-2xl px-6 text-center pt-14 sm:pt-20">
          <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 16 }} className="mx-auto mb-8 w-[72px] h-[72px] rounded-full bg-success/15 flex items-center justify-center">
            <Check className="h-8 w-8 text-success" />
          </motion.div>
          <h1 className="font-display text-[32px] sm:text-[40px] text-espresso tracking-[-0.02em] font-light">Booking Confirmed!</h1>
          <p className="mt-3 text-charcoal/40 text-[16px] font-light">Your appointment is locked in.</p>
          <div className="mt-10"><ConfirmationTicket service={service} date={fmtDate} time={fmtTime} customerName={name} bookingId={bookingId} /></div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-[13px] font-semibold hover:bg-[#20BD5B] transition-all rounded-full shadow-[0_4px_16px_rgba(37,211,102,0.25)]">
              <MessageSquare className="h-4 w-4" /> Send via WhatsApp
            </a>
            <button onClick={copyDetails} className="inline-flex items-center gap-2 px-5 py-3 border border-charcoal/10 text-espresso text-[13px] font-semibold hover:bg-blush transition-all rounded-full">
              <Copy className="h-4 w-4" /> Copy Details
            </button>
            <a href={smsUrl} className="inline-flex items-center gap-2 px-5 py-3 border border-charcoal/10 text-espresso text-[13px] font-semibold hover:bg-blush transition-all rounded-full">
              <Phone className="h-4 w-4" /> SMS
            </a>
          </div>
          <button onClick={reset} className="mt-10 text-[13px] text-copper hover:text-copper/80 font-semibold transition-colors">Book Another</button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-[76px] pb-24 bg-ivory min-h-screen">
      <div className="mx-auto max-w-3xl px-6 pt-12 sm:pt-16">
        <ProgressBar />
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <h2 className="font-display text-[28px] sm:text-[32px] text-espresso tracking-[-0.02em] mb-8 font-light">Choose a Service</h2>
              <div className="space-y-3">
                {allServices.map((svc) => (
                  <button key={svc.id} onClick={() => pickService(svc)} className="w-full flex items-center gap-4 p-4 rounded-[20px] bg-white border border-charcoal/5 hover:border-copper/20 hover:shadow-[0_4px_24px_rgba(184,107,75,0.06)] transition-all duration-300 text-left group">
                    <img src={svc.image} alt={svc.name} loading="lazy" className="w-14 h-14 rounded-[16px] object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-[16px] text-espresso group-hover:text-copper transition-colors font-medium">{svc.name}</p>
                      <p className="text-[12px] text-charcoal/30 mt-0.5 truncate font-light">{svc.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[14px] font-semibold text-copper">{formatPrice(svc.price)}</p>
                      <p className="text-[11px] text-charcoal/20 mt-0.5">{formatDuration(svc.duration)}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-charcoal/10 group-hover:text-copper transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <button onClick={goBack} className="flex items-center gap-1.5 text-[12px] text-charcoal/30 hover:text-espresso font-semibold transition-colors mb-6">
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              {service && (
                <div className="flex items-center gap-3 p-4 rounded-[20px] bg-white border border-charcoal/5 mb-7">
                  <Sparkles className="h-4 w-4 text-champagne shrink-0" />
                  <span className="text-[14px] font-semibold text-espresso">{service.name}</span>
                  <span className="text-[12px] text-charcoal/30 ml-auto font-light">{formatPrice(service.price)} · {formatDuration(service.duration)}</span>
                </div>
              )}
              <h2 className="font-display text-[28px] sm:text-[32px] text-espresso tracking-[-0.02em] mb-8 font-light">Pick a Date</h2>
              <CalendarPicker value={date} onChange={(d) => { setDate(d); setTime(null); }} closedDays={salon.closedDays} />
              {date && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
                  <h3 className="font-display text-[20px] text-espresso mb-5 font-medium">Available Times</h3>
                  <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
                    {timeSlots.map((slot) => {
                      const available = isSlotAvailable(slot, date, mockBookedSlots);
                      const selected = time === slot;
                      return (
                        <button key={slot} disabled={!available} onClick={() => available && setTime(slot)} className={`relative shrink-0 px-5 py-2.5 rounded-full text-[12px] font-semibold transition-all duration-300 ${!available ? "bg-blush/60 text-charcoal/15 cursor-not-allowed line-through" : selected ? "bg-copper text-ivory shadow-[0_4px_16px_rgba(184,107,75,0.3)]" : "bg-white border border-charcoal/8 text-espresso hover:border-copper/20 hover:shadow-sm"}`}>
                          {selected && <motion.span layoutId="time-sel" className="absolute inset-0 bg-copper rounded-full" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                          <span className="relative z-10">{formatSlotTime(slot)}</span>
                        </button>
                      );
                    })}
                  </div>
                  {time && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 flex justify-end">
                      <button onClick={goNext} className="inline-flex items-center gap-2 px-7 py-3 bg-espresso text-ivory text-[13px] font-semibold hover:bg-espresso/90 transition-all rounded-full shadow-[0_4px_16px_rgba(42,30,27,0.15)]">
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
              <button onClick={goBack} className="flex items-center gap-1.5 text-[12px] text-charcoal/30 hover:text-espresso font-semibold transition-colors mb-6">
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              <h2 className="font-display text-[28px] sm:text-[32px] text-espresso tracking-[-0.02em] mb-8 font-light">Your Details</h2>
              <div className="p-5 rounded-[20px] bg-white border border-charcoal/5 mb-7 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-champagne/10 flex items-center justify-center shrink-0"><Sparkles className="h-5 w-5 text-champagne" /></div>
                <div>
                  <p className="font-display text-[16px] text-espresso font-medium">{service?.name}</p>
                  <p className="text-[13px] text-charcoal/35 mt-0.5 font-light">{fmtDate} at {fmtTime}</p>
                </div>
              </div>
              <div className="space-y-5">
                <Field label="Full Name" required value={name} onChange={setName} placeholder="e.g. Adaeze Okonkwo" error={errors.name} />
                <Field label="Phone Number" required type="tel" value={phone} onChange={setPhone} placeholder="e.g. 08123456789" error={errors.phone} />
                <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="e.g. adaeze@email.com" />
              </div>
              <div className="mt-10 flex justify-end">
                <button onClick={handleConfirm} className="inline-flex items-center gap-2 px-9 py-4 bg-copper text-ivory text-[14px] font-semibold hover:bg-copper/90 transition-all rounded-full shadow-[0_4px_20px_rgba(184,107,75,0.35)]">
                  <Check className="h-4 w-4" /> Confirm Booking
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
      <label className="block text-[10px] uppercase tracking-[0.2em] text-charcoal/30 font-bold mb-2.5">
        {label} {required && <span className="text-copper">*</span>}
      </label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className={`w-full px-5 py-4 rounded-[16px] border-2 bg-white text-[14px] text-espresso placeholder:text-charcoal/20 focus:outline-none focus:ring-2 focus:ring-copper/10 focus:border-copper/25 transition-all font-light ${error ? "border-red-400" : "border-charcoal/6"}`} />
      {error && <p className="text-[12px] text-red-500 mt-2">{error}</p>}
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
    <div className="bg-white rounded-[24px] border border-charcoal/5 p-6 sm:p-8 shadow-[0_2px_20px_rgba(42,30,27,0.03)]">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setViewDate((d) => subMonths(d, 1))} className="w-10 h-10 rounded-full hover:bg-blush flex items-center justify-center transition-colors" aria-label="Previous month">
          <ChevronLeft className="h-4 w-4 text-espresso" />
        </button>
        <p className="font-display text-[19px] text-espresso tracking-[-0.01em] font-medium">{format(viewDate, "MMMM yyyy")}</p>
        <button onClick={() => setViewDate((d) => addMonths(d, 1))} className="w-10 h-10 rounded-full hover:bg-blush flex items-center justify-center transition-colors" aria-label="Next month">
          <ChevronRight className="h-4 w-4 text-espresso" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center text-[10px] uppercase tracking-[0.15em] text-charcoal/20 font-bold py-2">{d}</div>
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
              className={`relative aspect-square rounded-full flex items-center justify-center text-[13px] font-medium transition-all duration-300 ${disabled ? "text-charcoal/10 cursor-not-allowed" : selected ? "bg-copper text-ivory shadow-[0_2px_12px_rgba(184,107,75,0.25)]" : "text-espresso hover:bg-blush"}`}>
              {format(day, "d")}
              {todayMark && !selected && <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-copper" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
