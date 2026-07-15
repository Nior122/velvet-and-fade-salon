import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function TestimonialCarousel({ testimonials }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  const t = testimonials[current];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative min-h-[280px] sm:min-h-[240px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center"
          >
            <Quote className="h-10 w-10 text-champagne/20 mx-auto mb-8" />
            <p className="font-display text-[24px] sm:text-[30px] lg:text-[34px] text-ivory/90 leading-[1.5] font-light italic">
              "{t.text}"
            </p>
            <div className="mt-8 flex items-center justify-center gap-1">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-champagne text-champagne" />
              ))}
            </div>
            <p className="mt-4 text-[14px] text-ivory/70 font-medium">{t.name}</p>
            <p className="text-[12px] text-ivory/30 mt-1">{t.service}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-ivory/15 flex items-center justify-center text-ivory/40 hover:text-ivory hover:border-ivory/30 transition-all"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-8 h-2 bg-champagne"
                  : "w-2 h-2 bg-ivory/15 hover:bg-ivory/30"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-ivory/15 flex items-center justify-center text-ivory/40 hover:text-ivory hover:border-ivory/30 transition-all"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
