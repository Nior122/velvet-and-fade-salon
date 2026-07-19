import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { serviceCategories } from "../data/salonConfig";
import CategorySection from "../components/CategorySection";
import PageHero from "../components/PageHero";

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
    <main className="bg-surf-1 min-h-screen pb-28 sm:pb-32">
      <PageHero
        eyebrow="Our Menu"
        title="Services"
        subtitle="Every treatment crafted with precision and finished to a standard we're proud to put our name to. Select any service to begin your booking."
        image="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1400&q=80"
      />

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="flex justify-center -mt-6 relative z-10 mb-14 sm:mb-20">
          <div className="inline-flex rounded-full overflow-hidden border border-border bg-surf-1 shadow-[0_10px_40px_rgba(16,11,8,0.25)]">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-6 sm:px-8 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                  activeTab === tab.key ? "text-t-prime" : "text-t-sub hover:text-t-prime"
                }`}
              >
                {activeTab === tab.key && (
                  <motion.span layoutId="svc-tab" className="absolute inset-0 bg-surf-0 rounded-full" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {currentCategories.map(([key, cat]) => (
              <CategorySection key={key} category={cat} onServiceSelect={handleServiceSelect} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}