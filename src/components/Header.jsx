import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Camera, Globe, AtSign } from "lucide-react";
import { salon } from "../data/salonConfig";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/booking", label: "Book Now" },
  { to: "/about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isLight = !scrolled && !open;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ivory/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(45,74,62,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="flex h-[72px] items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
              <span
                className={`font-display text-[22px] font-[800] tracking-[-0.03em] transition-colors duration-300 ${
                  isLight ? "text-ivory" : "text-ink"
                }`}
              >
                {salon.name.split(" ")[0]}
              </span>
              <span
                className={`font-display text-[22px] font-[800] tracking-[-0.03em] transition-colors duration-300 ${
                  isLight ? "text-gold" : "text-forest"
                }`}
              >
                {salon.name.split(" & ")[1]}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-4 py-2 font-label text-[13px] font-[600] uppercase tracking-[0.15em] transition-colors duration-300 ${
                      isActive
                        ? isLight ? "text-gold" : "text-forest"
                        : isLight
                          ? "text-ivory/70 hover:text-ivory"
                          : "text-ink/50 hover:text-ink"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className={`absolute bottom-0 left-4 right-4 h-[2px] ${
                            isLight ? "bg-gold" : "bg-forest"
                          }`}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className={`lg:hidden p-2 -mr-2 rounded-xl transition-colors duration-300 ${
                isLight ? "text-ivory hover:bg-ivory/10" : "text-ink hover:bg-ink/5"
              }`}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 36px)" }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[60] bg-ink flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block font-display text-[42px] sm:text-[56px] font-[800] tracking-[-0.03em] transition-colors ${
                        isActive ? "text-gold" : "text-ivory/80 hover:text-ivory"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute bottom-10 flex gap-5"
            >
              {[Camera, Globe, AtSign].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/50 hover:text-gold hover:border-gold/50 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
