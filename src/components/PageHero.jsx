import { motion } from "framer-motion";

/**
 * Shared editorial page header — deep espresso band with oversized serif title.
 */
export default function PageHero({ eyebrow, title, emphasis, subtitle, image }) {
  return (
    <header className="relative bg-surf-0 grain overflow-hidden">
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" aria-hidden="true" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-surf-0 via-surf-0/80 to-surf-0/60" />
        </div>
      )}
      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 pt-36 pb-16 sm:pt-44 sm:pb-24">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="kicker text-accent inline-flex items-center gap-3"
        >
          <span className="w-8 h-px bg-accent/70" />
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="display-lg text-t-prime mt-5"
        >
          {title} {emphasis && <span className="italic text-accent">{emphasis}</span>}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-t-sub max-w-lg text-[16px] leading-relaxed font-light"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </header>
  );
}
