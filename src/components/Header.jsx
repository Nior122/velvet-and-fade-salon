import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { salon } from "../data/salonConfig";
import { useDarkMode } from "../context/DarkModeProvider";
import BookButton from "./BookButton";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/team", label: "Our Team" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const { dark, toggle } = useDarkMode();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const radix = scrolled ? (dark ? "bg-surf-1/85" : "bg-surf-1/85") : "bg-transparent";
  const borderRadix = scrolled ? "border-b border-border/30" : "";

  const navLinkCls = ({ isActive }) =>
    `relative px-3.5 py-2 text-[12.5px] tracking-wide transition-colors duration-300 ${
      isActive
        ? "text-t-prime"
        : "text-t-sub hover:text-t-prime"
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-xl ${radix} ${borderRadix}`}
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="flex h-[74px] items-center justify-between">
            <Link to="/" aria-label="Velvet & Fade — home" onClick={() => setOpen(false)}>
              <span className="flex items-baseline gap-1.5 leading-none">
                <span className="font-display text-[23px] tracking-[-0.01em] text-t-prime transition-colors duration-500">
                  Velvet
                </span>
                <span className="font-display text-[23px] italic text-accent transition-colors duration-500">&amp;</span>
                <span className="font-display text-[23px] tracking-[-0.01em] text-t-prime transition-colors duration-500">
                  Fade
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.to === "/"} className={navLinkCls}>
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute left-3.5 right-3.5 -bottom-0.5 h-px bg-accent"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
              <BookButton className="ml-4 inline-flex items-center gap-1.5 px-6 py-2.5 bg-accent-d text-t-prime text-[12px] font-medium uppercase tracking-[0.15em] rounded-full hover:opacity-90 transition-colors duration-300">
                Book Now
              </BookButton>
            </nav>

            <div className="flex items-center gap-2">
              {/* Dark / Light toggle */}
              <button
                onClick={toggle}
                className="w-11 h-11 flex items-center justify-center rounded-full text-t-sub hover:text-t-prime hover:bg-surf-2/60 xl:hover:bg-surf-3/40 transition-colors"
                aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {dark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setOpen(!open)}
                className="w-11 h-11 xl:hidden flex items-center justify-center rounded-full text-t-sub hover:text-t-prime hover:bg-surf-2/60 transition-colors"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] bg-surf-0 grain overflow-y-auto flex flex-col justify-between py-24 px-8 sm:px-14"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-baseline gap-1.5 leading-none">
                <span className="font-display text-[23px] tracking-[-0.01em] text-t-prime">Velvet</span>
                <span className="font-display text-[23px] italic text-accent">&amp;</span>
                <span className="font-display text-[23px] tracking-[-0.01em] text-t-prime">Fade</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="w-11 h-11 flex items-center justify-center text-t-sub hover:text-t-prime rounded-full hover:bg-surf-2/60"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col" aria-label="Mobile">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.045, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block font-display text-[42px] sm:text-[56px] leading-[1.15] border-b border-border py-3 transition-colors ${
                        isActive ? "text-accent italic" : "text-t-sub hover:text-t-prime"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <BookButton
                  onClick={() => setOpen(false)}
                  className="mt-8 inline-flex items-center gap-2 px-9 py-4 bg-accent text-surf-0 text-[13px] font-semibold uppercase tracking-[0.15em] rounded-full hover:opacity-90 transition-colors"
                >
                  Book Your Appointment
                  <ArrowUpRight className="h-4 w-4" />
                </BookButton>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-t-sub text-[12.5px] tracking-wide font-light space-y-1"
            >
              <p>{salon.address}</p>
              <a href={`tel:${salon.phone}`} className="hover:text-accent transition-colors">{salon.phone}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}