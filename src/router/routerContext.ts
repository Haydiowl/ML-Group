import { createContext, useCallback, useContext } from 'react';
import type { MouseEvent } from 'react';
import type { Route } from './paths';

/** Context and hooks only — components live in Router.tsx. */

export type RouterValue = {
  route: Route;
  navigate: (to: string, opts?: { replace?: boolean }) => void;
};

export const RouterContext = createContext<RouterValue | null>(null);

export function useRouter(): RouterValue {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used inside <Router>');
  return ctx;
}

/**
 * Smooth-scroll override. The page uses Lenis, which drives window.scrollTo;
 * route changes need to land at the top instantly rather than animate a long
 * scroll, so the smooth-scroll hook registers a reset function here.
 */
let scrollReset: (() => void) | null = null;

export function setScrollReset(fn: (() => void) | null) {
  scrollReset = fn;
}

export function runScrollReset() {
  scrollReset?.();
}

/**
 * Click handler for in-app links rendered as motion elements (e.g. a product
 * card animated by <Reveal as="a">), so those cards navigate identically to
 * <Link> while keeping a real href.
 */
export function useInternalLink() {
  const { navigate } = useRouter();
  return useCallback(
    (to: string) => (e: MouseEvent<HTMLElement>) => {
      // Let the browser handle modified clicks and non-primary buttons.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      navigate(to);
    },
    [navigate],
  );
}
