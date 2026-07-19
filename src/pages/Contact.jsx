import { salon } from "../data/salonConfig";
import { buildWhatsAppLink } from "../hooks/useBooking";
import SectionReveal from "../components/SectionReveal";
import PageHero from "../components/PageHero";
import BookButton from "../components/BookButton";
import { MapPin, Phone, Mail, Clock, MessageSquare, Navigation, ArrowRight } from "lucide-react";

const hoursList = [
  ["Monday", salon.hours.mon],
  ["Tuesday", salon.hours.tue],
  ["Wednesday", salon.hours.wed],
  ["Thursday", salon.hours.thu],
  ["Friday", salon.hours.fri],
  ["Saturday", salon.hours.sat],
  ["Sunday", salon.hours.sun],
];

export default function Contact() {
  const whatsappUrl = buildWhatsAppLink(salon.whatsappPhone, {
    salonName: salon.name,
    serviceName: "an appointment",
    date: "",
    time: "",
    customerName: "",
  });

  return (
    <main className="bg-surf-1 min-h-screen pb-28 sm:pb-32">
      <PageHero
        eyebrow="Ready for Your Next Look?"
        title="Get in"
        emphasis="Touch"
        subtitle="For bookings, enquiries, or simply to say hello — we'd love to hear from you."
        image="https://images.unsplash.com/photo-1633681926035-ec1ac984418a?w=1400&q=80"
      />

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24">
          {/* Details */}
          <SectionReveal>
            <div className="space-y-2">
              <span className="kicker">Visit · Call · Message</span>
              <h2 className="display-lg text-t-prime text-[clamp(28px,4vw,44px)] mt-3">
                {salon.name}
              </h2>
              <p className="text-[15px] text-t-sub font-light pt-2">{salon.address}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              <a href={`tel:${salon.phone}`} className="flex items-center gap-4 p-5 border border-border rounded-[4px] hover:border-accent/50 hover:bg-surf-2/40 transition-colors group">
                <Phone className="h-5 w-5 text-accent-d shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-t-sub font-semibold">Call</p>
                  <p className="text-[14px] text-t-prime font-medium group-hover:text-accent transition-colors">{salon.phone}</p>
                </div>
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 border border-border rounded-[4px] hover:border-accent/50 hover:bg-surf-2/40 transition-colors group">
                <MessageSquare className="h-5 w-5 text-accent-d shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-t-sub font-semibold">WhatsApp</p>
                  <p className="text-[14px] text-t-prime font-medium group-hover:text-accent transition-colors">Message us</p>
                </div>
              </a>
              <a href={`mailto:${salon.email}`} className="flex items-center gap-4 p-5 border border-border rounded-[4px] hover:border-accent/50 hover:bg-surf-2/40 transition-colors group">
                <Mail className="h-5 w-5 text-accent-d shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-t-sub font-semibold">Email</p>
                  <p className="text-[14px] text-t-prime font-medium group-hover:text-accent transition-colors break-all">{salon.email}</p>
                </div>
              </a>
              <a href={salon.directionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 border border-border rounded-[4px] hover:border-accent/50 hover:bg-surf-2/40 transition-colors group">
                <Navigation className="h-5 w-5 text-accent-d shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-t-sub font-semibold">Directions</p>
                  <p className="text-[14px] text-t-prime font-medium group-hover:text-accent transition-colors">Open in Maps</p>
                </div>
              </a>
            </div>

            {/* Hours */}
            <div className="mt-12">
              <h3 className="flex items-center gap-2 kicker text-t-sub mb-5">
                <Clock className="h-3.5 w-3.5" /> Opening Hours
              </h3>
              <div className="divide-y divide-border max-w-md">
                {hoursList.map(([day, hours]) => (
                  <div key={day} className="flex justify-between py-3">
                    <span className="text-[14px] text-t-prime font-medium">{day}</span>
                    <span className="text-[13.5px] text-t-sub font-light">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <BookButton className="group inline-flex items-center gap-3 mt-10 pl-8 pr-6 py-4 bg-accent text-surf-0 text-[12.5px] font-semibold uppercase tracking-[0.18em] rounded-full hover:opacity-90 transition-opacity">
              Book Your Appointment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </BookButton>
          </SectionReveal>

          {/* Map */}
          <SectionReveal delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[6px] aspect-[4/5] shadow-[0_30px_80px_rgba(0,0,0,0.25)] border border-border">
                <iframe
                  src={salon.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.4) contrast(1.05)" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Velvet & Fade location on Google Maps"
                />
              </div>
              <div className="mt-5 flex items-start gap-3">
                <MapPin className="h-4 w-4 text-accent-d mt-0.5 shrink-0" />
                <p className="text-[14px] text-t-sub font-light leading-relaxed">{salon.address}</p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </main>
  );
}