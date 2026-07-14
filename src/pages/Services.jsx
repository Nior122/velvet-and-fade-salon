import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { serviceCategories } from "../data/salonConfig";
import CategorySection from "../components/CategorySection";
import SectionReveal from "../components/SectionReveal";

const mensCategories = Object.entries(serviceCategories).filter(
  ([, cat]) => cat.gender === "men"
);
const womensCategories = Object.entries(serviceCategories).filter(
  ([, cat]) => cat.gender === "women"
);
const everyoneCategories = Object.entries(serviceCategories).filter(
  ([, cat]) => cat.gender === "everyone"
);

function GenderHeading({ label, sub }) {
  return (
    <SectionReveal>
      <div className="mb-8 mt-4 first:mt-0">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-px flex-1 bg-stone/20" />
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-copper font-semibold shrink-0">
            {label}
          </span>
          <div className="h-px flex-1 bg-stone/20" />
        </div>
        {sub && (
          <p className="text-center text-sm text-stone mt-1">{sub}</p>
        )}
      </div>
    </SectionReveal>
  );
}

export default function Services() {
  const navigate = useNavigate();

  const handleServiceSelect = (service) => {
    navigate("/booking", { state: { selectedService: service } });
  };

  return (
    <main className="pt-24 sm:pt-28 pb-16 sm:pb-24 bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <SectionReveal>
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="font-label text-[11px] uppercase tracking-[0.25em] text-copper"
            >
              Our Menu
            </motion.span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mt-2">
              Services
            </h1>
            <p className="mt-3 text-stone max-w-lg mx-auto text-sm sm:text-base">
              Everything you need, from a quick trim to a full day of pampering.
              Select any service to jump straight into booking.
            </p>
          </div>
        </SectionReveal>

        {/* Men's Services */}
        <GenderHeading label="Men's Services" sub="Haircuts, grooming, and more" />
        {mensCategories.map(([key, cat]) => (
          <CategorySection
            key={key}
            category={cat}
            categoryKey={key}
            onServiceSelect={handleServiceSelect}
          />
        ))}

        {/* Women's Services */}
        <GenderHeading label="Women's Services" sub="Cuts, colour, braiding & nails" />
        {womensCategories.map(([key, cat]) => (
          <CategorySection
            key={key}
            category={cat}
            categoryKey={key}
            onServiceSelect={handleServiceSelect}
          />
        ))}

        {/* Everyone */}
        {everyoneCategories.length > 0 && (
          <>
            <GenderHeading label="Services for Everyone" sub="Spa, nails, and relaxation" />
            {everyoneCategories.map(([key, cat]) => (
              <CategorySection
                key={key}
                category={cat}
                categoryKey={key}
                onServiceSelect={handleServiceSelect}
              />
            ))}
          </>
        )}
      </div>
    </main>
  );
}
