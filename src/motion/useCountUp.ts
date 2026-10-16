import { useEffect, useRef } from 'react';
import { animate, useReducedMotion } from 'motion/react';

/**
 * Count-up numerals for the About stats.
 *
 * The reference counts from 0 to the final value once, when the About
 * section enters view, and does NOT reset when scrolling back up.
 * Thousands separators are preserved ("9,000+").
 */
export function useCountUp(value: string, start: boolean) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const done = useRef(false);

  const numeric = Number(value.replace(/[^0-9.]/g, ''));
  // Everything after the digits, ignoring thousands separators: "9,000+" -> "+".
  // Slicing by String(numeric).length would yield "00+" and render "1,00000+".
  const suffix = value.replace(/[\d,.]/g, '');
  const grouped = value.includes(',');

  useEffect(() => {
    if (!start || done.current) return;
    if (reduced || !Number.isFinite(numeric) || numeric === 0) {
      if (ref.current) ref.current.textContent = value;
      done.current = true;
      return;
    }
    done.current = true;
    const controls = animate(0, numeric, {
      duration: 0.3, // measured ≈ 250–350 ms on the reference
      ease: 'easeOut',
      onUpdate: (v) => {
        if (!ref.current) return;
        const n = Math.round(v);
        ref.current.textContent = (grouped ? n.toLocaleString('en-US') : String(n)) + suffix;
      },
      onComplete: () => {
        if (ref.current) ref.current.textContent = value;
      },
    });
    return () => controls.stop();
  }, [start, reduced, numeric, grouped, suffix, value]);

  return ref;
}