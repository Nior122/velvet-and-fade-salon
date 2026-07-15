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
    const onScroll = () => setScrolled(window.scrollY > 20);
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
      {/* Solid header — always readable */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-ivory/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(46,36,32,0.06)]"
            : "bg-ivory"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="flex h-[68px] items-center justify-between">
            {/* Brand */}
            <Link to="/" className="flex items-baseline gap-1.5" onClick={() => setOpen(false)}>
              <span className="font-display text-[22px] text-brown tracking-[-0.01em]">
                {salon.name.split(" ")[0]}
              </span>
              <span className="font-display text-[22px] text-rose italic">&</span>
              <span className="font-display text-[22px] text-brown tracking-[-0.01em]">
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
                    `relative px-4 py-2 text-[13px] font-semibold tracking-wide transition-colors duration-200 ${
                      isActive
                        ? "text-rose"
                        : "text-brown/50 hover:text-brown"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rose"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
              <NavLink
                to="/booking"
                className="ml-3 px-5 py-2 bg-brown text-ivory text-[12px] font-semibold uppercase tracking-wider hover:bg-brown-soft transition-colors duration-200"
              >
                Book
              </NavLink>
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-brown hover:bg-blush/50 transition-colors rounded-lg"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — full screen, solid brown background */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-brown flex flex-col justify-between py-28 px-8 sm:px-12"
          >
            <nav className="flex flex-col mt-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.4 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block font-display text-[42px] sm:text-[56px] leading-[1.15] border-b border-ivory/10 pb-3 mb-3 transition-colors ${
                        isActive ? "text-rose" : "text-ivory/70 hover:text-ivory"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                <NavLink
                  to="/booking"
                  onClick={() => setOpen(false)}
                  className="inline-block mt-4 px-8 py-3 bg-rose text-ivory text-[13px] font-semibold uppercase tracking-wider hover:bg-rose-deep transition-colors"
                >
                  Book Now
                </NavLink>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex gap-4"
            >
              {[Camera, Globe, AtSign].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-10 h-10 border border-ivory/15 flex items-center justify-center text-ivory/30 hover:text-gold hover:border-gold/40 transition-all">
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
