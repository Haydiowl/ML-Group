import { useEffect } from 'react';
import { useReducedMotion } from 'motion/react';
import { MARQUEE_SPEED } from './tokens';

/**
 * Promo-bar marquee.
 *
 * The reference translates the track leftward at a constant −30 px/s,
 * independent of scroll velocity (verified: identical rate when idle and
 * when scrolling), wrapping once per item advance.
 *
 * The wrap distance is measured from the DOM rather than hard-coded: the
 * promo copy is data-driven, so a fixed loop constant would drift out of sync
 * (and visually tear) whenever the string length changes.
 *
 * Implemented as a single rAF loop writing one transform — no listeners,
 * no layout reads per frame, no overflow.
 */
export function useMarquee(trackRef: React.RefObject<HTMLElement | null>, enabled = true) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !enabled || reduced) return;

    // One item's advance = item width + the flex gap, read once.
    const item = el.firstElementChild as HTMLElement | null;
    if (!item) return;
    const styles = getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
    const loop = item.getBoundingClientRect().width + gap;
    if (!loop) return;

    let raf = 0;
    let last = performance.now();
    let offset = 0;

    const step = (now: number) => {
      // Clamp dt so a background tab or a long task cannot jump the track.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      offset = (offset + MARQUEE_SPEED * dt) % loop;
      if (offset > 0) offset -= loop;
      el.style.transform = `translate3d(${offset.toFixed(2)}px,0,0)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => cancelAnimationFrame(raf);
  }, [trackRef, enabled, reduced]);
}