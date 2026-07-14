import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isBefore, startOfDay, getDay, isToday, addDays, parseISO, isAfter } from "date-fns";

export function generateTimeSlots(openHour, closeHour, serviceDuration) {
  const slots = [];
  const durationMin = serviceDuration || 30;
  for (let h = openHour; h < closeHour; h++) {
    for (let m = 0; m < 60; m += 30) {
      const slotEnd = h * 60 + m + durationMin;
      if (slotEnd <= closeHour * 60) {
        slots.push(
          `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
        );
      }
    }
  }
  return slots;
}

export function isSlotAvailable(slot, date, bookedSlots) {
  const dateKey = format(date, "yyyy-MM-dd");
  const booked = bookedSlots[dateKey];
  if (booked && booked instanceof Set && booked.has(slot)) return false;
  if (booked && Array.isArray(booked) && booked.includes(slot)) return false;
  return true;
}

export function formatPrice(price) {
  return `\u20A6${price.toLocaleString("en-NG")}`;
}

export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes}min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}min` : `${h}h`;
}

export function formatSlotTime(slot) {
  const [h, m] = slot.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
}

export function generateBookingId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "VF-";
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export function buildWhatsAppLink(phone, { salonName, serviceName, date, time, customerName }) {
  const message = `Hi ${salonName}! I'd like to confirm my booking:\n\n` +
    `Service: ${serviceName}\n` +
    `Date: ${date}\n` +
    `Time: ${time}\n` +
    `Name: ${customerName}\n\n` +
    `Thank you!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildSmsLink(phone, message) {
  return `sms:${phone}?body=${encodeURIComponent(message)}`;
}

export { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isBefore, startOfDay, getDay, isToday, addDays, parseISO, isAfter };
