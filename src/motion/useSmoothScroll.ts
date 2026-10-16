import Lenis from 'lenis';
import { useEffect } from 'react';
import { SCROLL_DURATION } from './tokens';
import { setScrollReset } from '../router/routerContext';

/**
 * Smooth scrolling.
 *
 * The reference uses Lenis with `duration: (intensity || 10) / 10` and the
 * default intensity, i.e. a 1.0 s settle (confirmed by measurement: a 600 px
 * wheel tick resolves in ~1.0 s with a long asymptotic tail).
 *
 * One instance for the whole page — a single rAF loop, no extra scroll
 * listeners. Anchor links and the native scrollbar keep working because
 * Lenis drives the real window scroll.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: SCROLL_DURATION,
      // Let the browser handle touch natively — matches the reference and
      // avoids fighting iOS momentum scrolling.
      syncTouch: false,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Expose for the scroll-linked drift so both share one scroll source.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Route changes must land at the top immediately. Lenis would otherwise
    // animate the jump; resize instead forces an instant reset.
    setScrollReset(() => {
      lenis.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      setScrollReset(null);
    };
  }, []);
}