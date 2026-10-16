/**
 * Reveal safety net.
 *
 * A single rAF-throttled scroll check, shared by every <Reveal>. If an
 * element's entrance never fired — because the user teleported past it
 * (anchor jump, End key, restored scroll position) so IntersectionObserver
 * never saw it cross the viewport — and it is now scrolled above the
 * viewport, it is revealed immediately.
 *
 * Without this, content could stay at opacity 0 indefinitely. With it, the
 * worst case is an element appearing at full opacity while off-screen.
 *
 * One listener for the whole page; entries are pruned once revealed.
 */
type Entry = { el: HTMLElement; reveal: () => void };

const pending = new Set<Entry>();
let scheduled = false;

function sweep() {
  scheduled = false;
  const vh = window.innerHeight;
  for (const entry of [...pending]) {
    if (!entry.el.isConnected) {
      pending.delete(entry);
      continue;
    }
    const rect = entry.el.getBoundingClientRect();
    // Scrolled past: nothing to animate any more, so show it.
    if (rect.bottom < 0) {
      pending.delete(entry);
      entry.reveal();
    } else if (rect.top < vh) {
      // Partially in view and still not triggered — the observer will fire.
      // Leave it registered.
      continue;
    }
  }
}

function schedule() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(sweep);
}

export function registerPending(el: HTMLElement, reveal: () => void) {
  pending.add({ el, reveal });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
}

export function unregisterPending(el: HTMLElement) {
  for (const entry of [...pending]) if (entry.el === el) pending.delete(entry);
}

export function pendingCount() {
  return pending.size;
}