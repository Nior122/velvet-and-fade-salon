import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { salon } from "../data/salonConfig";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/team", label: "Our Team" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ivory/70 backdrop-blur-2xl shadow-[0_1px_0_0_rgba(42,30,27,0.05)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="flex h-[76px] items-center justify-between">
            <Link to="/" className="flex items-baseline gap-1.5" onClick={() => setOpen(false)}>
              <span className={`font-display text-[24px] tracking-[-0.01em] transition-colors duration-500 ${scrolled ? "text-espresso" : "text-ivory"}`}>
                {salon.name.split(" ")[0]}
              </span>
              <span className={`font-display text-[24px] italic transition-colors duration-500 ${scrolled ? "text-champagne" : "text-champagne"}`}>&</span>
              <span className={`font-display text-[24px] tracking-[-0.01em] transition-colors duration-500 ${scrolled ? "text-espresso" : "text-ivory"}`}>
                {salon.name.split(" & ")[1]}
              </span>
            </Link>

            <nav className="hidden items-center gap-0.5 xl:flex">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3.5 py-2 text-[12.5px] font-medium tracking-wide transition-all duration-300 rounded-full ${
                      isActive
                        ? scrolled ? "text-copper bg-copper/5" : "text-champagne bg-ivory/10"
                        : scrolled ? "text-charcoal/50 hover:text-charcoal hover:bg-charcoal/5" : "text-ivory/60 hover:text-ivory hover:bg-ivory/10"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/booking"
                className="ml-3 px-6 py-2.5 bg-copper text-ivory text-[12px] font-semibold uppercase tracking-wider rounded-full hover:bg-copper/90 transition-all duration-300 shadow-[0_2px_12px_rgba(184,107,75,0.3)]"
              >
                Book Now
              </NavLink>
            </nav>

            <button
              onClick={() => setOpen(!open)}
              className={`xl:hidden w-11 h-11 flex items-center justify-center transition-all rounded-full ${scrolled ? "text-espresso hover:bg-espresso/5" : "text-ivory hover:bg-ivory/10"}`}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-espresso/95 backdrop-blur-3xl flex flex-col justify-between py-32 px-8 sm:px-14"
          >
            <nav className="flex flex-col mt-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.04, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block font-display text-[48px] sm:text-[64px] leading-[1.1] border-b border-ivory/8 pb-3 mb-3 transition-colors ${
                        isActive ? "text-champagne" : "text-ivory/50 hover:text-ivory"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.45 }}
              >
                <Link
                  to="/booking"
                  onClick={() => setOpen(false)}
                  className="inline-block mt-6 px-10 py-4 bg-copper text-ivory text-[13px] font-semibold uppercase tracking-wider rounded-full hover:bg-copper/90 transition-all shadow-[0_4px_20px_rgba(184,107,75,0.3)]"
                >
                  Book Now
                </Link>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-ivory/20 text-[12px] tracking-wider"
            >
              <p>{salon.address}</p>
              <p className="mt-1">{salon.phone}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
