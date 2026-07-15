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
    <main className="pt-[68px] pb-20 sm:pb-28 bg-ivory min-h-screen">
      {/* Page header */}
      <div className="bg-brown relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
          <SectionReveal>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-rose">Our Menu</span>
            <h1 className="font-display text-[36px] sm:text-[48px] lg:text-[56px] text-ivory mt-3 tracking-[-0.02em] leading-[0.95]">Services</h1>
            <p className="mt-4 text-ivory/45 max-w-md text-[15px] leading-relaxed">Select any service to book instantly.</p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="flex gap-0 mt-10 border border-ivory/15 inline-flex rounded-lg overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.15em] transition-all duration-200 ${
                    activeTab === tab.key ? "bg-rose text-ivory" : "text-ivory/40 hover:text-ivory hover:bg-ivory/5"
                  }`}
                >
                  {tab.label}
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
