import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { serviceCategories } from "../data/salonConfig";
import CategorySection from "../components/CategorySection";
import SectionReveal from "../components/SectionReveal";

const tabs = [
  { key: "men", label: "For Him" },
  { key: "women", label: "For Her" },
  { key: "all", label: "Everyone" },
];

const filtered = (fn) => Object.entries(serviceCategories).filter(([, cat]) => fn(cat));
const tabFilter = (key) => {
  if (key === "men") return (cat) => cat.gender === "men";
  if (key === "women") return (cat) => cat.gender === "women";
  return (cat) => cat.gender === "everyone";
};

export default function Services() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("men");

  const handleServiceSelect = (service) => {
    navigate("/booking", { state: { selectedService: service } });
  };

  const currentCategories = filtered(tabFilter(activeTab));

  return (
    <main className="pt-[76px] pb-24 sm:pb-32 bg-ivory min-h-screen">
      <div className="bg-espresso relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-espresso via-espresso to-espresso/90" />
        <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
          <SectionReveal>
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-champagne">Our Menu</span>
            <h1 className="font-display text-[42px] sm:text-[56px] lg:text-[64px] text-ivory mt-3 tracking-[-0.02em] leading-[0.92] font-light">
              Services
            </h1>
            <p className="mt-5 text-ivory/40 max-w-md text-[16px] leading-relaxed font-light">
              Select any service to book instantly. Every treatment is crafted with precision.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="flex gap-0 mt-12 inline-flex rounded-full overflow-hidden border border-ivory/10">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 rounded-full ${
                    activeTab === tab.key
                      ? "bg-copper text-ivory shadow-[0_2px_12px_rgba(184,107,75,0.3)]"
                      : "text-ivory/35 hover:text-ivory hover:bg-ivory/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 pt-14 sm:pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {currentCategories.map(([key, cat]) => (
              <CategorySection key={key} category={cat} categoryKey={key} onServiceSelect={handleServiceSelect} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
