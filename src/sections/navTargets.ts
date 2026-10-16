import { useRouter } from '../router/routerContext';
import type { MouseEvent } from 'react';

/**
 * Nav destinations and navigation.
 *
 * "Categories" has a real route; the other labels are homepage sections, so
 * they navigate to "/" and then scroll to that section. Done through the
 * router rather than raw href="#..." so the History API stays the single
 * source of truth and the Back button keeps working.
 */
const NAV_TARGETS: Record<string, string> = {
  Categories: '/categories/personal-fragrance',
  Products: '/#products',
  'Scent Guides': '/#blogs',
  Newsletter: '/#newsletter',
};

/** Offset applied when scrolling to a section so the fixed chrome clears it. */
const SCROLL_OFFSET = 150;

export function useNavTargets() {
  const { navigate } = useRouter();

  const href = (label: string) => NAV_TARGETS[label] ?? '/';

  const go = (label: string) => {
    const [path, hash] = (NAV_TARGETS[label] ?? '/').split('#');
    navigate(path || '/');
    if (!hash) return;
    // Wait for the route to render before measuring the target.
    requestAnimationFrame(() => scrollToSection(hash));
  };

  const click = (label: string, after?: () => void) => (e: MouseEvent<HTMLAnchorElement>) => {
    after?.();
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    go(label);
  };

  return { href, click };
}

/**
 * Scroll to a homepage section. When the click crossed from another route the
 * target does not exist on the first frame, so retry briefly until it renders.
 */
function scrollToSection(id: string, attempt = 0) {
  const el = document.getElementById(id);
  if (!el) {
    if (attempt < 30) requestAnimationFrame(() => scrollToSection(id, attempt + 1));
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  const lenis = (
    window as unknown as {
      __lenis?: { scrollTo: (t: number, o?: unknown) => void; resize: () => void };
    }
  ).__lenis;
  if (lenis) {
    // The page content was swapped between routes, so Lenis can still hold the
    // previous document height — without this it clamps the scroll to a stale
    // ceiling and lands in the wrong place. A navigation jump is also better as
    // an instant move than a long animated scroll from the top.
    lenis.resize();
    lenis.scrollTo(top, { immediate: true, force: true });
  } else {
    window.scrollTo({ top, behavior: 'auto' });
  }
}
