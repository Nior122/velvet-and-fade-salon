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

/* ───────────── flat list of every service ───────────── */
const allServices = Object.values(serviceCategories).flatMap(
  (cat) => cat.services
);

/* ───────────── slide variants ───────────── */
const slide = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
};

/* ═══════════════════════════════════════════════════════
   BOOKING PAGE
   ═══════════════════════════════════════════════════════ */
export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const preselected = location.state?.selectedService || null;

  const [step, setStep] = useState(preselected ? 2 : 1);
  const [direction, setDirection] = useState(1);
  const [service, setService] = useState(preselected);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId] = useState(generateBookingId);

  const goNext = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };
  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  /* ── step 1: pick service ── */
  const pickService = (svc) => {
    setService(svc);
    goNext();
  };

  /* ── step 2: pick date/time ── */
  const timeSlots = useMemo(() => {
    if (!service || !date) return [];
    const dow = getDay(date);
    const open = dow === 0 ? salon.openHour : salon.openHour;
    const close = dow === 0 ? 18 : salon.closeHour;
    return generateTimeSlots(open, close, service.duration);
  }, [service, date]);

  const pickTime = (slot) => {
    setTime(slot);
    goNext();
  };

  /* ── step 3: validate & confirm ── */
  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!phone.trim()) {
      e.phone = "Phone number is required";
    } else if (!/^\+?234\d{10}$/.test(phone.replace(/\s/g, "")) && !/^0\d{10}$/.test(phone.replace(/\s/g, ""))) {
      e.phone = "Enter a valid Nigerian phone number";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirm = () => {
    if (!validate()) return;
    setConfirmed(true);
  };

  const formattedDate = date ? format(date, "EEEE, d MMMM yyyy") : "";
  const formattedTime = time ? formatSlotTime(time) : "";

  const whatsappUrl = confirmed
    ? buildWhatsAppLink(salon.whatsappPhone, {
        salonName: salon.name,
        serviceName: service.name,
        date: formattedDate,
        time: formattedTime,
        customerName: name,
      })
    : "";

  const copyDetails = () => {
    const text = `${salon.name} Booking\nService: ${service.name}\nDate: ${formattedDate}\nTime: ${formattedTime}\nName: ${name}\nRef: ${bookingId}`;
    navigator.clipboard.writeText(text).catch(() => {});
  };

  const smsUrl = `sms:${salon.phone}?body=${encodeURIComponent(
    `Booking at ${salon.name}: ${service?.name}, ${formattedDate} at ${formattedTime}. Name: ${name}`
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
    setDirection(1);
  };

  /* ── Step indicator ── */
  const StepIndicator = () => {
    const steps = ["Service", "Date & Time", "Details"];
    const current = confirmed ? 3 : step - 1;
    return (
      <div className="flex items-center justify-center gap-2 mb-10">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i < current
                  ? "bg-copper text-charcoal"
                  : i === current
                  ? "bg-charcoal text-cream"
                  : "bg-stone/20 text-stone"
              }`}
            >
              {i < current ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span
              className={`hidden sm:block text-xs font-label uppercase tracking-wider ${
                i <= current ? "text-charcoal" : "text-stone"
              }`}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <div
                className={`w-8 sm:w-12 h-px ${
                  i < current ? "bg-copper" : "bg-stone/20"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  /* ─── Confirmed success state ─── */
  if (confirmed) {
    return (
      <main className="pt-28 sm:pt-32 pb-20 bg-cream min-h-screen">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="mx-auto mb-6 w-16 h-16 rounded-full bg-emerald/10 flex items-center justify-center"
          >
            <Check className="h-8 w-8 text-emerald" />
          </motion.div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-charcoal">
            Booking Confirmed!
          </h1>
          <p className="mt-2 text-stone text-sm">
            Your appointment is locked in. Send us a quick WhatsApp to confirm.
          </p>

          <div className="mt-8">
            <ConfirmationTicket
              service={service}
              date={formattedDate}
              time={formattedTime}
              customerName={name}
              bookingId={bookingId}
            />
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald text-cream font-semibold text-sm hover:bg-emerald/90 transition-colors shadow-lg"
            >
              <MessageSquare className="h-4 w-4" />
              Send via WhatsApp
            </a>
            <button
              onClick={copyDetails}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-charcoal/20 text-charcoal text-sm font-medium hover:bg-charcoal/5 transition-colors"
            >
              <Copy className="h-4 w-4" />
              Copy Details
            </button>
            <a
              href={smsUrl}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-charcoal/20 text-charcoal text-sm font-medium hover:bg-charcoal/5 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Send via SMS
            </a>
          </div>

          <button
            onClick={reset}
            className="mt-8 text-sm text-copper hover:text-charcoal font-semibold transition-colors"
          >
            Book Another Appointment
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 sm:pt-32 pb-20 bg-cream min-h-screen">
      <div className="mx-auto max-w-3xl px-4">
        <StepIndicator />

        <AnimatePresence mode="wait" custom={direction}>
          {/* ─── STEP 1: Service ─── */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
                Choose a Service
              </h2>
              <div className="space-y-3">
                {allServices.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => pickService(svc)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white border border-stone/10 hover:border-copper/40 hover:shadow-md transition-all text-left group"
                  >
                    <img
                      src={svc.image}
                      alt={svc.name}
                      loading="lazy"
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-charcoal group-hover:text-copper transition-colors">
                        {svc.name}
                      </p>
                      <p className="text-xs text-stone mt-0.5 truncate">
                        {svc.description}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-copper">
                        {formatPrice(svc.price)}
                      </p>
                      <p className="text-[11px] text-stone mt-0.5">
                        {formatDuration(svc.duration)}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-stone/40 group-hover:text-copper transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── STEP 2: Date & Time ─── */}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <button
                onClick={goBack}
                className="flex items-center gap-1 text-sm text-stone hover:text-charcoal transition-colors mb-4"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>

              {/* Selected service badge */}
              {service && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-stone/10 mb-6">
                  <Sparkles className="h-4 w-4 text-copper shrink-0" />
                  <span className="text-sm font-medium text-charcoal">
                    {service.name}
                  </span>
                  <span className="text-xs text-stone ml-auto">
                    {formatPrice(service.price)} &middot; {formatDuration(service.duration)}
                  </span>
                </div>
              )}

              <h2 className="font-display text-2xl font-bold text-charcoal mb-6 flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-copper" />
                Pick a Date
              </h2>

              {/* Calendar */}
              <CalendarPicker
                value={date}
                onChange={(d) => {
                  setDate(d);
                  setTime(null);
                }}
                closedDays={salon.closedDays}
              />

              {/* Time slots */}
              {date && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8"
                >
                  <h3 className="font-display text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-copper" />
                    Available Times
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((slot) => {
                      const available = isSlotAvailable(slot, date, mockBookedSlots);
                      const selected = time === slot;
                      return (
                        <button
                          key={slot}
                          disabled={!available}
                          onClick={() => available && setTime(slot)}
                          className={`py-2.5 px-2 rounded-lg text-sm font-medium transition-all ${
                            !available
                              ? "bg-stone/10 text-stone/40 cursor-not-allowed line-through"
                              : selected
                              ? "bg-copper text-charcoal ring-2 ring-copper ring-offset-2"
                              : "bg-white border border-stone/15 hover:border-copper/40 hover:shadow-sm text-charcoal"
                          }`}
                        >
                          {formatSlotTime(slot)}
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
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-copper text-charcoal font-semibold text-sm hover:bg-copper/90 transition-colors shadow-lg shadow-copper/20"
                      >
                        Continue <ArrowRight className="h-4 w-4" />
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ─── STEP 3: Customer Details ─── */}
          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <button
                onClick={goBack}
                className="flex items-center gap-1 text-sm text-stone hover:text-charcoal transition-colors mb-4"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>

              <h2 className="font-display text-2xl font-bold text-charcoal mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-copper" />
                Your Details
              </h2>

              {/* Summary card */}
              <div className="p-4 rounded-xl bg-white border border-stone/10 mb-6">
                <p className="text-sm font-semibold text-charcoal">{service?.name}</p>
                <p className="text-sm text-stone mt-1">
                  {formattedDate} at {formattedTime}
                </p>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-stone mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Adaeze Okonkwo"
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-charcoal placeholder:text-stone/50 focus:outline-none focus:ring-2 focus:ring-copper/40 transition ${
                      errors.name ? "border-red-400" : "border-stone/20"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-stone mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 08123456789"
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-charcoal placeholder:text-stone/50 focus:outline-none focus:ring-2 focus:ring-copper/40 transition ${
                      errors.phone ? "border-red-400" : "border-stone/20"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-stone mb-1.5">
                    Email <span className="text-stone/50">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. adaeze@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-stone/20 bg-white text-sm text-charcoal placeholder:text-stone/50 focus:outline-none focus:ring-2 focus:ring-copper/40 transition"
                  />
                </div>
              </div>

              {/* Confirm */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleConfirm}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-copper text-charcoal font-semibold text-sm hover:bg-copper/90 transition-colors shadow-lg shadow-copper/20"
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
   CALENDAR PICKER (inline, no library)
   ═══════════════════════════════════════════════════════ */
function CalendarPicker({ value, onChange, closedDays = [] }) {
  const [viewDate, setViewDate] = useState(new Date());

  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDow = getDay(monthStart); // 0=Sun

  const today = startOfDay(new Date());

  return (
    <div className="bg-white rounded-2xl border border-stone/10 p-4 sm:p-6 shadow-sm">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setViewDate((d) => subMonths(d, 1))}
          className="p-2 rounded-lg hover:bg-stone/10 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4 text-charcoal" />
        </button>
        <p className="font-display text-base font-bold text-charcoal">
          {format(viewDate, "MMMM yyyy")}
        </p>
        <button
          onClick={() => setViewDate((d) => addMonths(d, 1))}
          className="p-2 rounded-lg hover:bg-stone/10 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4 text-charcoal" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-label uppercase tracking-wider text-stone py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Leading blanks */}
        {Array.from({ length: startDow }).map((_, i) => (
          <div key={`blank-${i}`} />
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
              className={`relative aspect-square rounded-lg flex items-center justify-center text-sm transition-all ${
                disabled
                  ? "text-stone/30 cursor-not-allowed"
                  : selected
                  ? "bg-copper text-charcoal font-bold ring-2 ring-copper ring-offset-2"
                  : "text-charcoal hover:bg-copper/10"
              }`}
            >
              {format(day, "d")}
              {todayMark && !selected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-copper" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
