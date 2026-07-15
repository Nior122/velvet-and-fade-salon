import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Camera, Globe, AtSign } from "lucide-react";
import { salon } from "../data/salonConfig";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/booking", label: "Book" },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-offwhite/95 backdrop-blur-xl border-b border-black/8"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="flex h-[64px] items-center justify-between">
            <Link to="/" className="flex items-baseline gap-1 group" onClick={() => setOpen(false)}>
              <span className={`font-display text-[20px] font-extrabold uppercase tracking-[-0.03em] transition-colors ${isLight ? "text-white" : "text-black"}`}>
                {salon.name.split(" ")[0]}
              </span>
              <span className="font-display text-[20px] font-extrabold uppercase tracking-[-0.03em] text-lime">
                &
              </span>
              <span className={`font-display text-[20px] font-extrabold uppercase tracking-[-0.03em] transition-colors ${isLight ? "text-white" : "text-black"}`}>
                {salon.name.split(" & ")[1]}
              </span>
            </Link>

            <nav className="hidden items-center gap-0 lg:flex">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2 font-label text-[12px] font-bold uppercase tracking-[0.15em] transition-all duration-200 ${
                      isActive
                        ? "bg-lime text-black"
                        : isLight
                          ? "text-white/60 hover:text-white hover:bg-white/10"
                          : "text-black/40 hover:text-black hover:bg-black/5"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <button
              onClick={() => setOpen(!open)}
              className={`lg:hidden w-10 h-10 flex items-center justify-center transition-colors ${isLight ? "text-white" : "text-black"}`}
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
            initial={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-black flex flex-col justify-between py-24 px-8 sm:px-12"
          >
            <nav className="flex flex-col gap-0 mt-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block font-display text-[48px] sm:text-[64px] font-extrabold uppercase tracking-[-0.04em] leading-[1.05] transition-colors border-b border-white/10 pb-3 mb-3 ${
                        isActive ? "text-lime" : "text-white hover:text-lime"
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
              transition={{ delay: 0.5 }}
              className="flex gap-4"
            >
              {[Camera, Globe, AtSign].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/30 hover:text-lime hover:border-lime/40 transition-all">
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
