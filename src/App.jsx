import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileActionBar from "./components/MobileActionBar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PageTransition({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/booking" element={<PageTransition><Booking /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function AppLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const steps = [20, 45, 70, 100];
    let i = 0;
    const timer = setInterval(() => {
      if (i < steps.length) { setProgress(steps[i]); i++; }
      else { clearInterval(timer); setTimeout(onComplete, 200); }
    }, 150);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="fixed inset-0 z-[100] bg-surf-0 grain flex flex-col items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
        <span className="font-display text-[40px] text-t-prime tracking-[-0.02em] font-light">
          Velvet <span className="italic text-accent">&amp;</span> Fade
        </span>
        <p className="mt-3 text-[10px] uppercase tracking-[0.4em] text-t-sub">Lekki · Lagos</p>
      </motion.div>
      <div className="mt-10 w-36 h-px bg-border overflow-hidden">
        <motion.div className="h-full bg-accent" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3, ease: "easeOut" }} />
      </div>
    </motion.div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  return (
    <BrowserRouter>
      <AnimatePresence>{loading && <AppLoader onComplete={() => setLoading(false)} />}</AnimatePresence>
      <div className="flex flex-col min-h-screen">
        <Header />
        <ScrollToTop />
        <div className="flex-1"><AnimatedRoutes /></div>
        <Footer />
        <MobileActionBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
