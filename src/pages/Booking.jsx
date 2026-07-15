import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Phone,
  Copy,
  MessageSquare,
  CalendarDays,
  Clock,
  User,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  salon,
  serviceCategories,
  mockBookedSlots,
} from "../data/salonConfig";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isBefore,
  startOfDay,
  getDay,
  isToday,
  generateTimeSlots,
  isSlotAvailable,
  formatPrice,
  formatDuration,
  formatSlotTime,
  generateBookingId,
  buildWhatsAppLink,
} from "../hooks/useBooking";
import ConfirmationTicket from "../components/ConfirmationTicket";

const allServices = Object.values(serviceCategories).flatMap((c) => c.services);

/* ═══════════════════════════════════════════════════════
   BOOKING PAGE
   ═══════════════════════════════════════════════════════ */
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

  const pickTime = (slot) => { setTime(slot); goNext(); };

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!phone.trim()) {
      e.phone = "Phone number is required";
    } else if (
      !/^\+?234\d{10}$/.test(phone.replace(/\s/g, "")) &&
      !/^0\d{10}$/.test(phone.replace(/\s/g, ""))
    ) {
      e.phone = "Enter a valid Nigerian phone number";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirm = () => {
    if (!validate()) return;
    setConfirmed(true);
  };

  const fmtDate = date ? format(date, "EEEE, d MMMM yyyy") : "";
  const fmtTime = time ? formatSlotTime(time) : "";

  const whatsappUrl = confirmed
    ? buildWhatsAppLink(salon.whatsappPhone, {
        salonName: salon.name,
        serviceName: service.name,
        date: fmtDate,
        time: fmtTime,
        customerName: name,
      })
    : "";

  const copyDetails = () => {
    const text = `${salon.name} Booking\nService: ${service.name}\nDate: ${fmtDate}\nTime: ${fmtTime}\nName: ${name}\nRef: ${bookingId}`;
    navigator.clipboard.writeText(text).catch(() => {});
  };

  const smsUrl = `sms:${salon.phone}?body=${encodeURIComponent(
    `Booking at ${salon.name}: ${service?.name}, ${fmtDate} at ${fmtTime}. Name: ${name}`
  )}`;

  const reset = () => {
    setStep(1);
    setService(null);
    setDate(null);
    setTime(null);
    setName("");
    setPhone("");
    setEmail("");
    setErrors({});
    setConfirmed(false);
  };

  /* ── Progress bar ── */
  const ProgressBar = () => {
    const pct = confirmed ? 100 : ((currentStep - 1) / 2) * 100;
    const labels = ["Service", "Date & Time", "Details"];
    return (
      <div className="mb-10">
        {/* Bar */}
        <div className="relative h-[3px] bg-sand rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-forest rounded-full"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
        {/* Labels */}
        <div className="flex justify-between mt-3">
          {labels.map((label, i) => (
            <span
              key={label}
              className={`font-label text-[10px] uppercase tracking-[0.2em] font-600 transition-colors duration-300 ${
                i < currentStep ? "text-forest" : i === currentStep ? "text-ink" : "text-ink/25"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    );
  };

  /* ─── Confirmed ─── */
  if (confirmed) {
    return (
      <main className="pt-[72px] sm:pt-[80px] pb-20 bg-ivory min-h-screen">
        <div className="mx-auto max-w-2xl px-5 text-center pt-12 sm:pt-16">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-forest/10 flex items-center justify-center"
          >
            <Check className="h-7 w-7 text-forest" />
          </motion.div>

          <h1 className="font-display text-[28px] sm:text-[36px] font-800 text-ink tracking-[-0.03em]">
            Booking Confirmed!
          </h1>
          <p className="mt-2 text-ink/50 text-[15px]">
            Your appointment is locked in. Send us a quick message to confirm.
          </p>

          <div className="mt-8">
            <ConfirmationTicket
              service={service}
              date={fmtDate}
              time={fmtTime}
              customerName={name}
              bookingId={bookingId}
            />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-display font-700 text-[13px] hover:bg-[#20BD5B] transition-all duration-300 shadow-[0_4px_20px_rgba(37,211,102,0.3)]"
            >
              <MessageSquare className="h-4 w-4" />
              Send via WhatsApp
            </a>
            <button
              onClick={copyDetails}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-ink/12 text-ink text-[13px] font-label font-600 hover:bg-ink/5 transition-all duration-300"
            >
              <Copy className="h-4 w-4" />
              Copy Details
            </button>
            <a
              href={smsUrl}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-ink/12 text-ink text-[13px] font-label font-600 hover:bg-ink/5 transition-all duration-300"
            >
              <Phone className="h-4 w-4" />
              SMS
            </a>
          </div>

          <button
            onClick={reset}
            className="mt-8 text-[13px] text-forest hover:text-gold font-label font-600 transition-colors duration-300"
          >
            Book Another
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-[72px] sm:pt-[80px] pb-20 bg-ivory min-h-screen">
      <div className="mx-auto max-w-3xl px-5 pt-10 sm:pt-14">
        <ProgressBar />

        <AnimatePresence mode="wait">
          {/* ─── STEP 1: Service ─── */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h2 className="font-display text-[24px] sm:text-[28px] font-800 text-ink tracking-[-0.03em] mb-6">
                Choose a Service
              </h2>
              <div className="space-y-2.5">
                {allServices.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => pickService(svc)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white border border-ink/5 hover:border-forest/30 hover:shadow-[0_4px_24px_rgba(45,74,62,0.08)] transition-all duration-300 text-left group"
                  >
                    <img
                      src={svc.image}
                      alt={svc.name}
                      loading="lazy"
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-700 text-ink group-hover:text-forest transition-colors duration-300 text-[15px]">
                        {svc.name}
                      </p>
                      <p className="text-[12px] text-ink/40 mt-0.5 truncate">{svc.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[14px] font-display font-700 text-forest">{formatPrice(svc.price)}</p>
                      <p className="text-[11px] text-ink/35 mt-0.5 font-label">{formatDuration(svc.duration)}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-ink/15 group-hover:text-forest transition-colors duration-300 shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── STEP 2: Date & Time ─── */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 text-[13px] text-ink/40 hover:text-ink font-label font-600 transition-colors duration-300 mb-5"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>

              {service && (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-ink/5 mb-6">
                  <Sparkles className="h-4 w-4 text-gold shrink-0" />
                  <span className="text-[14px] font-600 text-ink">{service.name}</span>
                  <span className="text-[12px] text-ink/35 ml-auto font-label">
                    {formatPrice(service.price)} · {formatDuration(service.duration)}
                  </span>
                </div>
              )}

              <h2 className="font-display text-[24px] sm:text-[28px] font-800 text-ink tracking-[-0.03em] mb-6">
                Pick a Date
              </h2>

              <CalendarPicker
                value={date}
                onChange={(d) => { setDate(d); setTime(null); }}
                closedDays={salon.closedDays}
              />

              {date && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="mt-8"
                >
                  <h3 className="font-display text-[18px] font-700 text-ink mb-4 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gold" />
                    Available Times
                  </h3>

                  {/* Horizontal scrollable strip */}
                  <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
                    {timeSlots.map((slot) => {
                      const available = isSlotAvailable(slot, date, mockBookedSlots);
                      const selected = time === slot;
                      return (
                        <button
                          key={slot}
                          disabled={!available}
                          onClick={() => available && setTime(slot)}
                          className={`relative shrink-0 px-5 py-3 rounded-xl text-[13px] font-label font-600 transition-all duration-300 ${
                            !available
                              ? "bg-sand/50 text-ink/20 cursor-not-allowed line-through"
                              : selected
                              ? "bg-forest text-ivory shadow-[0_4px_16px_rgba(45,74,62,0.25)]"
                              : "bg-white border border-ink/8 text-ink hover:border-forest/30 hover:shadow-sm"
                          }`}
                        >
                          {selected && (
                            <motion.span
                              layoutId="time-selected"
                              className="absolute inset-0 bg-forest rounded-xl"
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                          )}
                          <span className="relative z-10">{formatSlotTime(slot)}</span>
                        </button>
                      );
                    })}
                  </div>

                  {time && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 flex justify-end"
                    >
                      <button
                        onClick={goNext}
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-forest text-ivory font-display font-700 text-[13px] hover:bg-forest/90 transition-all duration-300 shadow-[0_4px_20px_rgba(45,74,62,0.25)]"
                      >
                        Continue <ArrowRight className="h-4 w-4" />
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ─── STEP 3: Details ─── */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 text-[13px] text-ink/40 hover:text-ink font-label font-600 transition-colors duration-300 mb-5"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>

              <h2 className="font-display text-[24px] sm:text-[28px] font-800 text-ink tracking-[-0.03em] mb-6">
                Your Details
              </h2>

              {/* Summary */}
              <div className="p-5 rounded-2xl bg-white border border-ink/5 mb-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-forest/8 flex items-center justify-center shrink-0">
                  <Sparkles className="h-5 w-5 text-forest" />
                </div>
                <div>
                  <p className="font-display font-700 text-ink text-[15px]">{service?.name}</p>
                  <p className="text-[13px] text-ink/40 mt-0.5">{fmtDate} at {fmtTime}</p>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <Field
                  label="Full Name"
                  required
                  value={name}
                  onChange={setName}
                  placeholder="e.g. Adaeze Okonkwo"
                  error={errors.name}
                />
                <Field
                  label="Phone Number"
                  required
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                  placeholder="e.g. 08123456789"
                  error={errors.phone}
                />
                <Field
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="e.g. adaeze@email.com"
                />
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleConfirm}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-forest text-ivory font-display font-700 text-[14px] hover:bg-forest/90 transition-all duration-300 shadow-[0_4px_24px_rgba(45,74,62,0.25)]"
                >
                  <Check className="h-4 w-4" />
                  Confirm Booking
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

/* ═══════════════════════════════════════════════════════
   FIELD — reusable form input
   ═══════════════════════════════════════════════════════ */
function Field({ label, required, type = "text", value, onChange, placeholder, error }) {
  return (
    <div>
      <label className="block text-[10px] font-label uppercase tracking-[0.2em] text-ink/35 font-600 mb-2">
        {label} {required && <span className="text-forest">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3.5 rounded-xl border bg-white text-[14px] text-ink placeholder:text-ink/25 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/30 transition-all duration-300 ${
          error ? "border-red-400" : "border-ink/8"
        }`}
      />
      {error && <p className="text-[12px] text-red-500 mt-1.5 font-label">{error}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CALENDAR PICKER
   ═══════════════════════════════════════════════════════ */
function CalendarPicker({ value, onChange, closedDays = [] }) {
  const [viewDate, setViewDate] = useState(new Date());
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDow = getDay(monthStart);
  const today = startOfDay(new Date());

  return (
    <div className="bg-white rounded-[20px] border border-ink/5 p-5 sm:p-7 shadow-[0_2px_16px_rgba(26,31,22,0.03)]">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => setViewDate((d) => subMonths(d, 1))}
          className="w-9 h-9 rounded-xl hover:bg-sand/60 flex items-center justify-center transition-colors duration-300"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4 text-ink" />
        </button>
        <p className="font-display text-[17px] font-700 text-ink tracking-[-0.01em]">
          {format(viewDate, "MMMM yyyy")}
        </p>
        <button
          onClick={() => setViewDate((d) => addMonths(d, 1))}
          className="w-9 h-9 rounded-xl hover:bg-sand/60 flex items-center justify-center transition-colors duration-300"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4 text-ink" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center text-[10px] font-label uppercase tracking-[0.15em] text-ink/30 font-600 py-1.5">
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startDow }).map((_, i) => (
          <div key={`b-${i}`} />
        ))}
        {days.map((day) => {
          const past = isBefore(day, today);
          const closed = closedDays.includes(getDay(day));
          const disabled = past || closed;
          const selected = value && isSameDay(day, value);
          const todayMark = isToday(day);

          return (
            <button
              key={day.toISOString()}
              disabled={disabled}
              onClick={() => !disabled && onChange(day)}
              className={`relative aspect-square rounded-xl flex items-center justify-center text-[14px] font-600 transition-all duration-200 ${
                disabled
                  ? "text-ink/15 cursor-not-allowed"
                  : selected
                  ? "bg-forest text-ivory shadow-[0_2px_12px_rgba(45,74,62,0.2)]"
                  : "text-ink hover:bg-sand/60"
              }`}
            >
              {format(day, "d")}
              {todayMark && !selected && (
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
