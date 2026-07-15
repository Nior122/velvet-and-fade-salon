import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { serviceCategories } from "../data/salonConfig";
import CategorySection from "../components/CategorySection";
import SectionReveal from "../components/SectionReveal";

const tabs = [
  { key: "men", label: "For Him", filter: (cat) => cat.gender === "men" },
  { key: "women", label: "For Her", filter: (cat) => cat.gender === "women" },
  { key: "all", label: "Everyone", filter: (cat) => cat.gender === "everyone" },
];

const filtered = (fn) => Object.entries(serviceCategories).filter(([, cat]) => fn(cat));

export default function Services() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("men");

  const handleServiceSelect = (service) => {
    navigate("/booking", { state: { selectedService: service } });
  };

  const currentCategories = filtered(tabs.find((t) => t.key === activeTab).filter);

  return (
    <main className="pt-[72px] sm:pt-[80px] pb-20 sm:pb-32 bg-ivory min-h-screen">
      <div className="bg-espresso relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "20px 20px" }} />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
          <SectionReveal>
            <span className="font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne">Our Menu</span>
            <h1 className="font-display text-[38px] sm:text-[50px] lg:text-[58px] font-semibold text-ivory mt-3 tracking-[-0.03em] leading-[0.95]">Services</h1>
            <p className="mt-4 text-ivory/45 max-w-md text-[15px] leading-relaxed">From a quick trim to a full day of pampering — select any service to book instantly.</p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="flex gap-2 mt-10">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative px-5 py-2.5 rounded-full font-label text-[12px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                    activeTab === tab.key ? "text-espresso" : "text-ivory/35 hover:text-ivory/60"
                  }`}
                >
                  {activeTab === tab.key && (
                    <motion.span
                      layoutId="service-tab"
                      className="absolute inset-0 bg-champagne rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
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
