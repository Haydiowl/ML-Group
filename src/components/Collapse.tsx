import { useState, type ReactNode } from 'react';

/**
 * Collapsible section used across the product description page.
 *
 * Built from the existing surface / hairline tokens so it reads as part of
 * the current design rather than a new component style. Uses a real button so
 * it is keyboard operable, and aria-expanded/aria-controls for assistive tech.
 */
export function Collapse({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `collapse-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <section className={`collapse${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="collapse-head"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="t-card-title">{title}</span>
        <span className="collapse-icon" aria-hidden>
          <ChevronIcon />
        </span>
      </button>

      {/* Kept mounted so the content is reachable/copyable and the grid
          height stays predictable; visually collapsed when closed. */}
      <div id={panelId} className="collapse-body" hidden={!open}>
        <div className="collapse-inner">{children}</div>
      </div>
    </section>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M3.5 5.5 7 9l3.5-3.5" />
      </g>
    </svg>
  );
}